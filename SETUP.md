# Setup Project Kasilmu

Panduan untuk menjalankan project di lingkungan baru.

## Prasyarat

- PHP 8.3+
- Composer
- Node.js 18+
- MySQL 8+ (atau SQLite untuk lokal)
- Git

## Clone & Setup Awal

```bash
git clone https://github.com/gardawilson/kasilmu.git
cd kasilmu
```

## 1. Backend (`kasilmu-api`)

```bash
cd kasilmu-api

# Install dependency PHP
composer install

# Buat .env (copy dari example)
copy .env.example .env

# Generate APP_KEY
php artisan key:generate
```

### Setup Database

Edit `.env` — pilih salah satu:

**Opsi A — SQLite (mudah, tanpa install DB server):**
```
DB_CONNECTION=sqlite
# DB_HOST=127.0.0.1
# DB_PORT=3306
# DB_DATABASE=
# DB_USERNAME=root
# DB_PASSWORD=
```
Lalu buat file database:
```bash
New-Item database\database.sqlite -ItemType File
```

**Opsi B — MySQL (seperti PC utama):**
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=kasilmu
DB_USERNAME=root
DB_PASSWORD=
```
Pastikan MySQL sudah running dan database `kasilmu` sudah dibuat:
```bash
mysql -u root -p -e "CREATE DATABASE kasilmu"
```

### Migrate & Seed

```bash
# Buat tabel + isi data awal
php artisan migrate --seed
```

Perintah di atas akan:
- Membuat semua tabel dari migration
- Mengisi seeder: role, permission, user admin, data dummy

### Jalankan Backend

```bash
php artisan serve
```

Backend berjalan di `http://localhost:8000`.

> **Akun login:** `admin@kasilmu.com` / `password`
>
> Akun lain: `tutor@kasilmu.com` / `password`, `siswa@kasilmu.com` / `password`

## 2. Frontend (`kasilmu-pwa`)

Buka terminal baru:

```bash
cd kasilmu-pwa

# Buat .env
echo "VITE_API_URL=http://localhost:8000/api" > .env

# Install dependency
npm install

# Jalankan dev server
npm run dev
```

Frontend berjalan di `http://localhost:5173`.

## 3. Akses Aplikasi

| URL | Keterangan |
|-----|------------|
| `http://localhost:5173` | Frontend |
| `http://localhost:5173/login` | Halaman login |
| `http://localhost:8000/api` | Backend API |

## Catatan Penting

- Backend & frontend harus jalan **bersamaan** di 2 terminal berbeda
- Untuk ganti DB dari MySQL ke SQLite, cukup ubah `DB_CONNECTION` di `.env` backend
- Jangan commit `.env` — sudah di-ignore oleh `.gitignore`
- Jika ada error saat `migrate --seed`, pastikan koneksi database sudah benar di `.env`
