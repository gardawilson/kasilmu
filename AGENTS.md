# AGENTS.md

Two independently versioned apps (each has its own `.git`) in one working tree, talking over HTTP/JSON with Sanctum token auth.

## Backend (`kasilmu-api/`)

- **Laravel 13** + PHP 8.3. Routes grouped by Spatie role middleware in `routes/api.php` — do NOT scatter per-route middleware. Role aliases registered in `bootstrap/app.php`.
- No Form Request / API Resource classes (the `app/Http/Requests` and `app/Http/Resources` dirs exist but are empty). Validate inline with `$request->validate([...])`.
- Every controller uses the `ApiResponse` trait: `$this->success()`, `$this->error()`, `$this->paginated()`.
- Model `Kela` maps to `kelas` table (Laravel auto-singularization). Route binding: `{kela}`.
- `SiswaController::store` checks `Kela::isFull()` inside a `DB::transaction`, throws `RuntimeException` (→422) if full.
- Commands:
  - `composer test` → `php artisan config:clear && php artisan test`
  - `php artisan test --filter=test_create_siswa`
  - `vendor/bin/pint` (PSR-12)
- Tests use `RefreshDatabase` + sqlite `:memory:`. Seed `RolePermissionSeeder` + `AdminUserSeeder` in `setUp()`. Login test account: `admin@kasilmu.com`.
- Default DB is sqlite (configured in `.env.example`); `.env` currently points at MySQL.

## Frontend (`kasilmu-pwa/`)

- **React 19**, TypeScript 6, MUI 9, React Router 7, TanStack Query 5, React Hook Form + Zod.
- Commands:
  - `npm run dev` (Vite :5173)
  - `npm run build` = `tsc && vite build` (both typecheck and production build)
  - No test/lint scripts configured.
- Feature-folder pattern in `src/features/<name>/`: `use<Name>.ts` hook → `<Name>Page.tsx` + `<Name>Form.tsx`. Mutations invalidate list query key on success.
- Single Axios instance (`src/lib/api.ts`): token from `localStorage`, 401 → clear token → `window.location.href = '/login'`.
- API envelope: `ApiResponse<T>` in `src/types/index.ts` (matches backend `success`/`message`/`data`/`meta`).
- Requires `VITE_API_URL` in `.env` pointing at backend (e.g. `http://localhost:8000/api`).
- No role-based route gating on frontend; enforcement is backend-only via `role:` middleware.

### Naming drift (intentional)

| Frontend path/feature | Backend endpoint |
|---|---|
| `src/features/pengajar/` | `GET/POST /api/tutor` |
| `src/features/pertemuan/` | `GET/POST /api/pertemuan` |
| Route `/presensi` | Renders `PertemuanPage` (from `src/features/pertemuan/`) |
