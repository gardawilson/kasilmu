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

**As of 2026-08-10, production migrated from `kasilmu.my.id` (cPanel user `kasg7412`, no SSH) to `kasilmu.com` (cPanel user `kasn4685`, SSH-enabled).** The old host's manual File Manager zip-upload procedure is retired — deploys are now automated via GitHub Actions over SSH. If you find references to `kasilmu.my.id`/`kasg7412` elsewhere (old commit messages, chat history), treat them as historical, not current.

**Server details:**
- Domain: `kasilmu.com`, cPanel user `kasn4685`, home dir `/home/kasn4685`.
- SSH: host `103.247.10.150`, **port `2223`** (non-standard — the provider's shared-hosting plans put SSH on this port; confirmed via their support chat, not discoverable from cPanel UI). Server name `masiwang`, cPanel 136.
- Default `php` CLI on the server is **PHP 7.4** — always invoke Laravel's `artisan` via the explicit PHP 8.3 binary: **`/usr/local/bin/ea-php83`** (same pattern as the old host; the app requires PHP `^8.3` per `composer.json`).
- No `composer` or `rsync` installed on the server — deploys build everything (including `vendor/`) on the GitHub Actions runner and ship the finished artifact over `scp`/`tar`, never build on the server itself.

**Layout on the server** (same shape as the old host):
- `public_html/` (domain root) — built frontend (`kasilmu-pwa/dist/*` contents).
- `public_html/api.kasilmu.com/` (subdomain document root) — entire Laravel app flat (not just `public/`).
- `public_html/api.kasilmu.com/.env` — production env (`DB_CONNECTION=mysql`). **Never overwrite this file during a deploy** — the CI workflow explicitly excludes it from the upload tarball.
- No separate `public_html/icons/` folder was found on this new host (unlike the old one) — if PWA icon PNGs turn out to be missing here, that's a gap to fix, not an existing folder to protect.

### CI/CD (GitHub Actions) — current deploy mechanism

Two workflows in `.github/workflows/`, both triggered on push to `master` (path-filtered) or manually via `workflow_dispatch`:

- **`deploy-api.yml`**: checkout → `composer install --no-dev` on the runner (PHP 8.3 via `shivammathur/setup-php`) → `tar` the app (excluding `.env`, `.git`, `tests/`, `database/database.sqlite`) → `scp` to the server → SSH in, extract into `public_html/api.kasilmu.com/`, then run `artisan migrate --force` + cache-clear commands. **Migrations run automatically on every backend deploy** — there's no manual gate, so a destructive migration merged to `master` will apply itself immediately. Review migrations carefully in PR before merging; take a DB backup via phpMyAdmin (Export → Quick → Go) before merging anything that alters/drops columns.
- **`deploy-pwa.yml`**: checkout → `npm install` (not `npm ci` — see note below) → build with `VITE_API_URL=https://api.kasilmu.com/api` baked in via `.env.production` → `tar` the `dist/` contents → `scp` + SSH-extract into `public_html/`. Extraction only adds/overwrites files present in the tarball, never deletes, so it can't accidentally wipe unrelated folders already on the server.

Both workflows authenticate over SSH using a **dedicated passphrase-less deploy key** (`gh-actions-ci-deploy`, ed25519) stored as the `SSH_PRIVATE_KEY` GitHub Actions secret — deliberately separate from any personal SSH key, since a passphrase-protected key can't be used non-interactively in CI. Repo secrets required (Settings → Secrets and variables → Actions): `SSH_HOST`, `SSH_PORT`, `SSH_USER`, `SSH_PRIVATE_KEY`.

**Why `npm install` instead of `npm ci` in `deploy-pwa.yml`:** `package-lock.json` generated on Windows doesn't reliably include the Linux-target optional native dependencies some packages pin per-platform (hit this with `@emnapi/*`), so `npm ci`'s strict lockfile-match check fails on the Ubuntu runner even right after running `npm install` locally. `npm install` tolerates the mismatch. If this gets fixed upstream (or the lockfile is ever regenerated on Linux/CI), switching back to `npm ci` would be safer.

The repo has two nested `.git` directories (`kasilmu-api/.git`, `kasilmu-pwa/.git`) left over from when each app was developed separately, but they're **not** what's pushed anywhere — the actual tracked, pushed repo is the root `.git` at the project root (a monorepo containing both app folders as regular tracked directories), pushed to `github.com/gardawilson/kasilmu`. Don't rely on the nested `.git`s for anything; they're vestigial.

### Setting up SSH access on a new machine

To administer the server (run one-off `artisan` commands, inspect logs, etc.) from a machine other than the one that originally set this up:

1. Get a copy of a private key already authorized on the server — either copy `github-actions-deploy` (personal, passphrase-protected) or `gh-actions-ci-deploy` (automation, no passphrase) from the original machine, **or** generate a fresh keypair locally (`ssh-keygen -t ed25519 -f <path> [-N ""]`) and add its `.pub` contents as a new line in `~/.ssh/authorized_keys` on the server (append via an existing SSH session, or cPanel → SSH Access → Import Key).
2. **Windows-specific gotcha**: OpenSSH refuses private keys with loose file permissions ("Bad permissions" / "Permission denied" errors) and standard `icacls /grant "DOMAIN\user:R"` can fail silently (empty ACL entry, e.g. `garda\:(R)`) if the machine's domain trust is broken ("The trust relationship between this workstation and the primary domain failed"). The reliable fix that bypasses name resolution entirely:
   ```powershell
   $path = "C:\path\to\private_key"
   $sid = ([System.Security.Principal.WindowsIdentity]::GetCurrent()).User
   $acl = New-Object System.Security.AccessControl.FileSecurity
   $acl.SetOwner($sid)
   $acl.SetAccessRuleProtection($true, $false)
   $acl.AddAccessRule((New-Object System.Security.AccessControl.FileSystemAccessRule($sid, "Read", "Allow")))
   Set-Acl -Path $path -AclObject $acl
   ```
3. Connect: `ssh -i <path-to-private-key> -p 2223 kasn4685@103.247.10.150`.
4. **If the connection times out** (not "connection refused") on port 22/2222/21098/etc., that's very likely the provider's non-default SSH port, not a config issue on your end — ask their support directly rather than guessing further ports (repeated failed attempts risk the CSF/`lfd` firewall temporarily banning your IP). This host's port turned out to be **2223**, confirmed only via their live chat support — not discoverable from any cPanel page.
5. Repeated failed **password** prompts (as opposed to key auth) also risk an `lfd` ban — if a connection unexpectedly falls through to a password prompt instead of accepting the key, Ctrl+C immediately rather than guessing at the account password.

**Running one-off artisan commands** (now that SSH works, this replaces the old host's cron-job workaround):
```
ssh -i <key> -p 2223 kasn4685@103.247.10.150
cd ~/public_html/api.kasilmu.com
/usr/local/bin/ea-php83 artisan <command>
```
As before, back up via phpMyAdmin (Export → Quick → Go) before anything destructive.

### PWA update mechanism — don't regress this

`kasilmu-pwa/src/main.tsx` wires up `virtual:pwa-register`'s `registerSW()` with `onNeedRefresh` → `updateSW(true)` (auto-activate + reload, no user prompt) and a hourly `registration.update()` poll. This exists because the plugin's default auto-injected `registerSW.js` only registers the service worker once and never checks for or applies updates — every future deploy would otherwise get silently stuck on stale cached assets for anyone who already has the old service worker installed, recoverable only via manual DevTools → Application → Service Workers → Unregister. Keep this wiring (and `"vite-plugin-pwa/client"` in `tsconfig.json`'s `types`) intact in any future changes to `main.tsx` or the PWA config.

### Diagnosing "site unreachable" reports

If a user reports `ERR_CONNECTION_TIMED_OUT` (or similar) after a deploy, that's a network-layer failure, not a caching or app bug — caching issues serve stale-but-successful responses, never connection timeouts. Ask them to check from a second device/network first: if it works there, the server/deploy is fine and the issue is local to that device (DNS cache, a VPN/proxy — Cloudflare WARP is a common one, identifiable via `nslookup` showing a resolver like `connectivity-check.warp-svc`/`127.0.2.2` — or a firewall). Only suspect the deploy itself if the failure reproduces from an independent network too.
