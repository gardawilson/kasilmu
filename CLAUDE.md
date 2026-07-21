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
