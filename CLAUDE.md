# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Kasilmu is a school/tutoring-center (bimbel) management system: a Laravel 13 JSON API (`kasilmu-api/`) and a React 19 + TypeScript PWA (`kasilmu-pwa/`). They are two independently versioned apps (each has its own `.git`) living in one working tree, talking over HTTP/JSON with token auth (Sanctum).

## Commands

### Backend (`kasilmu-api/`)

```bash
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed        # DB_CONNECTION defaults to sqlite
composer run dev                  # runs `php artisan serve` + `npm run dev` concurrently
composer run dev:queue            # queue worker, separate terminal
composer run dev:logs             # php artisan pail, separate terminal
composer test                     # = php artisan config:clear && php artisan test
php artisan test --filter=test_create_siswa   # single test
php artisan test tests/Feature/Api/SiswaTest.php
vendor/bin/pint                   # code style (PSR-12), run before committing PHP changes
```

Feature tests use `RefreshDatabase` against an in-memory sqlite DB (`phpunit.xml`) and typically seed `RolePermissionSeeder` + `AdminUserSeeder` in `setUp()` before hitting protected routes.

### Frontend (`kasilmu-pwa/`)

```bash
npm install
npm run dev        # vite dev server on :5173
npm run build      # tsc typecheck, then vite build (this IS the typecheck step — no separate lint/typecheck script)
npm run preview
```

There is no test runner or lint script configured in `package.json` currently.

Frontend needs `VITE_API_URL` in `kasilmu-pwa/.env` (e.g. `http://localhost:8000/api`) pointing at the backend.

## Architecture

### Backend: thin controllers, no Requests/Resources layer

Despite `app/Http/Requests` and `app/Http/Resources` existing as directories, they are **empty** — this codebase does not use Form Request classes or API Resource transformers. Controllers under `app/Http/Controllers/Api/` validate inline with `$request->validate([...])` and return models/collections directly. Every controller uses the `ApiResponse` trait (`app/Http/Controllers/Api/ApiResponse.php`) for consistent envelopes:

- `$this->success($data, $message, $code, $meta)`
- `$this->error($message, $code, $errors)`
- `$this->paginated($paginator, $message)` — wraps Laravel paginator into `data` + `meta` (current_page/last_page/per_page/total)

Follow this pattern (inline validation + trait methods) for new endpoints rather than introducing Requests/Resources.

### Route → role middleware structure (`routes/api.php`)

All routes except `/auth/login` sit behind `auth:sanctum`. Within that, routes are grouped by Spatie role middleware, not per-route — e.g. `role:admin` wraps all of Siswa/Tutor/Program/Kelas-mutations/Jadwal-mutations/Tagihan/Pembayaran/Laporan/Dashboard; `role:admin|tutor` wraps Pertemuan/Presensi/Nilai mutations; `role:admin|tutor|siswa|orang_tua` wraps the shared read (`index`/`show`) routes. When adding an endpoint, decide which role group it belongs to and add it to the matching `Route::middleware('role:...')->group()` block — don't scatter ad hoc middleware on individual routes.

Role middleware aliases (`role`, `permission`, `role_or_permission`) are registered in `bootstrap/app.php`.

### Naming mismatch: "Kela" model and "tutor"/"pengajar"

- The `kelas` table's Eloquent model is named `Kela` (`app/Models/Kela.php`), not `Kelas` — Laravel's auto-singularization of "kelas" produces "kela". Route model binding uses `{kela}` (see `routes/api.php`). Don't rename this without updating every route/controller reference.
- The backend concept/table/route is `tutor` (`TutorController`, `/api/tutor`), but the frontend feature folder and hook are named `pengajar` (`src/features/pengajar/usePengajar.ts`) which calls the `/tutor` endpoints. This is intentional naming drift between layers, not a bug.
- Similarly the frontend attendance/meeting feature lives in `src/features/pertemuan/` (calls `/pertemuan` and `/pertemuan/{id}/presensi`), while the README's original plan called this "presensi" — the route path `/presensi` in the frontend router points at `PertemuanPage`.

### Frontend: feature-folder + React Query pattern

Each domain under `src/features/<name>/` follows the same shape: a `use<Name>.ts` file exporting one React Query hook per operation (`use<Name>` for list, `use<Name>Detail`, `useCreate<Name>`, `useUpdate<Name>`, `useDelete<Name>`), plus `<Name>Page.tsx` and `<Name>Form.tsx` components. Mutations invalidate the list query key on success. Reuse this shape for new features rather than inventing a new data-fetching pattern.

- `src/lib/api.ts` is the single Axios instance: attaches `Authorization: Bearer <token>` from `localStorage`, and on any `401` response clears the token and hard-redirects to `/login`.
- `src/features/auth/useAuth.tsx` provides `AuthProvider`/`useAuth` (token in `localStorage`, user fetched via `/auth/me` on mount).
- Routing (`src/App.tsx`) is a flat `<Routes>` list; every authenticated page is wrapped in a local `ProtectedRoute` component (redirects to `/login` if no user) which itself wraps children in `Layout`. There's no role-based route gating on the frontend — that enforcement lives entirely in the backend's `role:` middleware groups, so the UI should not assume a role can't reach a route.
- API response envelope on the frontend is typed via `ApiResponse<T>` in `src/types/index.ts`, matching the backend's `success`/`message`/`data`/`meta` shape.

### Data model

Core entity relationships: `users` 1:1 `siswas`/`tutors` → `siswas` M:N `kelas` (via `kelas_siswa` pivot with `tgl_masuk`/`tgl_keluar`/status) → `kelas` belongs to `programs` and `tutors` → `kelas` has many `jadwals` (recurring schedule slots) and `pertemuans` (individual sessions) → `pertemuans` has many `presensis` (attendance) → `siswas` has many `tagihans` (bills) → `tagihans` has many `pembayarans` (payments) → `siswas` has many `nilais` (grades, scoped per `kelas`). A newer addition, `program_tingkat`, maps which grade levels (`tingkat`, 1-12 + `jenjang` SD/SMP/SMA) are eligible for a given program — `SiswaController::store` checks this eligibility (`Kela::program.tingkats`) plus class capacity (`Kela::isFull()`) inside a DB transaction when assigning a student to a class at creation time, throwing `RuntimeException` (mapped to a 422) on either failure.

Roles (via Spatie Permission): `admin`, `tutor`, `siswa`, `orang_tua`. Permission matrix and full field lists are documented in the top-level `README.md` (in Indonesian) — treat it as the source of truth for feature scope, but verify against actual code since the README describes the original plan and some things (e.g. Requests/Resources, exact frontend feature names) diverged during implementation.

## Deployment (production hosting)

Production is a **shared cPanel host with no SSH/terminal access** — File Manager/FTP and cPanel's UI tools (Cron Jobs, MySQL Databases, phpMyAdmin) are the only available mechanisms. There is no CI/CD and no cPanel Git Version Control repo configured (checked and confirmed empty) — every deploy is a manual file upload from a machine that has this repo checked out.

**Layout on the server** (cPanel user `kasg7412`, domain `kasilmu.my.id`):

- `public_html/` (domain root) — the built frontend (`kasilmu-pwa/dist/*` contents), served directly as static files.
- `public_html/api.kasilmu.my.id/` (subdomain document root) — the **entire** Laravel app uploaded flat (not just `public/`): `app/`, `bootstrap/`, `config/`, `database/`, `public/`, `resources/`, `routes/`, `storage/`, `vendor/`, `.env`, `artisan`, etc. all live directly in this folder. This is not the "put only `public/` on the web" best practice, but it's the existing working setup — don't restructure it without the user's explicit sign-off, since it's a live site.
- `public_html/api.kasilmu.my.id/.env` — production env: `DB_CONNECTION=mysql`, database `kasg7412_kasilmu`, `APP_URL=https://api.kasilmu.my.id`. **Never overwrite this file during a deploy** — it's not part of any upload package.
- `public_html/icons/` — PWA icon PNGs (`icon-192x192.png` etc., referenced by the manifest) that exist **only on the server**, not in the `kasilmu-pwa` repo's `public/` folder (which only has `favicon.svg`/`icons.svg`). Never delete/overwrite this folder when redeploying the frontend.

### Deploy procedure

**Backend (`kasilmu-api`)**

1. Locally: `composer install --no-dev --optimize-autoloader` in a throwaway copy of the repo (don't run this in the working dev checkout — it strips dev dependencies needed for local testing).
2. Zip that copy, excluding: `.env`, `.git`, `tests/`, `database/database.sqlite`, and pre-existing contents of `storage/logs`, `storage/framework/{cache,sessions,views}`.
3. Upload the zip into `public_html/api.kasilmu.my.id/` via File Manager, then use File Manager's **Extract** (overwrites code files in place; `.env` and `storage/app` are untouched since they weren't in the zip).
4. Delete the uploaded zip afterward.

**Frontend (`kasilmu-pwa`)**

1. Locally: create/update `kasilmu-pwa/.env.production` with `VITE_API_URL=https://api.kasilmu.my.id/api`, then `npm run build`. Vite merges `.env.production` over `.env` in build mode, so the dev `.env` (pointing at `localhost:8000`) is untouched.
2. Zip the contents of `dist/` (not the folder itself — its _contents_), upload to `public_html/` root, Extract there. This overwrites `index.html`/`assets/`/`sw.js`/etc. but never includes `icons/`, so that folder survives untouched.

**Running artisan commands without a terminal** — use a one-shot cron job:

1. cPanel → **Cron Jobs** → create a job with schedule `* * * * *` (any schedule works if you're deleting it right after) and command:
   ```
   /usr/local/bin/ea-php83 /home/kasg7412/public_html/api.kasilmu.my.id/artisan migrate --force >> /home/kasg7412/migrate.log 2>&1
   ```
   (`/usr/local/bin/ea-php83` is the confirmed-working PHP 8.3 CLI binary path on this host — the app requires PHP `^8.3` per `composer.json`.)
2. Wait ~1–2 minutes, check `/home/kasg7412/migrate.log` in File Manager for the result.
3. **Delete the cron job immediately after confirming success** — don't leave it running every minute. Reuse the same pattern (edit the command, save, wait, check log, delete) for any other one-off artisan command (`storage:link`, `db:seed`, etc.). Note: cPanel's cron "Edit" form requires clicking the actual **"Save Crontab"/"Edit Line"** button at the bottom — just navigating away does not persist the change.
4. Before running migrations that could be destructive (column drops, etc.), export a quick DB backup first via phpMyAdmin (Export → Quick → Go) — cheap insurance even when the data is only test data.

### PWA update mechanism — don't regress this

`kasilmu-pwa/src/main.tsx` wires up `virtual:pwa-register`'s `registerSW()` with `onNeedRefresh` → `updateSW(true)` (auto-activate + reload, no user prompt) and a hourly `registration.update()` poll. This exists because the plugin's default auto-injected `registerSW.js` only registers the service worker once and never checks for or applies updates — every future deploy would otherwise get silently stuck on stale cached assets for anyone who already has the old service worker installed, recoverable only via manual DevTools → Application → Service Workers → Unregister. Keep this wiring (and `"vite-plugin-pwa/client"` in `tsconfig.json`'s `types`) intact in any future changes to `main.tsx` or the PWA config.

### Diagnosing "site unreachable" reports

If a user reports `ERR_CONNECTION_TIMED_OUT` (or similar) after a deploy, that's a network-layer failure, not a caching or app bug — caching issues serve stale-but-successful responses, never connection timeouts. Ask them to check from a second device/network first: if it works there, the server/deploy is fine and the issue is local to that device (DNS cache, a VPN/proxy — Cloudflare WARP is a common one, identifiable via `nslookup` showing a resolver like `connectivity-check.warp-svc`/`127.0.2.2` — or a firewall). Only suspect the deploy itself if the failure reproduces from an independent network too.
