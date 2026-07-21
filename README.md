# Kasilmu - Sistem Informasi Manajemen Bimbel

Aplikasi administrasi untuk bimbel Kasilmu berbasis web (PWA) dengan backend Laravel dan frontend React.

---

## Daftar Isi

- [Teknologi](#teknologi)
- [Struktur Project](#struktur-project)
- [Tahap Pengembangan](#tahap-pengembangan)
- [Fitur Lengkap](#fitur-lengkap)
- [Flow Aplikasi](#flow-aplikasi)
- [Database Design](#database-design)
- [API Endpoints](#api-endpoints)
- [Role & Permission](#role--permission)
- [Cara Installasi](#cara-installasi)
- [Deployment](#deployment)

---

## Teknologi

| Lapisan | Teknologi |
|---------|-----------|
| **Frontend** | React 18 + TypeScript |
| **Build Tools** | Vite |
| **UI Library** | MUI (Material UI) v6 |
| **State / API** | TanStack React Query |
| **Form** | React Hook Form + Zod |
| **Routing** | React Router v6 |
| **PWA** | vite-plugin-pwa |
| **Backend** | Laravel 11 |
| **Database** | MySQL 8 |
| **Auth API** | Laravel Sanctum |
| **Role** | Spatie Laravel Permission |

---

## Struktur Project

```
kasilmu-pwa/
├── kasilmu-api/          # Backend Laravel
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/Api/   # API Controllers
│   │   │   ├── Requests/          # Form Request Validation
│   │   │   └── Resources/         # API Resources (JSON transform)
│   │   ├── Models/                # Eloquent Models
│   │   ├── Enums/                 # Enum classes
│   │   └── Services/              # Business logic
│   ├── database/
│   │   ├── migrations/            # Table schemas
│   │   └── seeders/               # Data dummy
│   ├── routes/
│   │   └── api.php                # API routes
│   └── .env                       # Database config
│
├── kasilmu-pwa/          # Frontend React
│   ├── src/
│   │   ├── components/            # Reusable components
│   │   │   ├── Layout/            # Sidebar, Navbar, etc.
│   │   │   └── ui/                # Buttons, inputs, modals
│   │   ├── features/              # Feature-based modules
│   │   │   ├── auth/              # Login, Register
│   │   │   ├── siswa/             # CRUD Siswa
│   │   │   ├── tutor/             # CRUD Tutor
│   │   │   ├── kelas/             # Program & Kelas
│   │   │   ├── jadwal/            # Penjadwalan
│   │   │   ├── presensi/          # Presensi
│   │   │   ├── pembayaran/        # Pembayaran
│   │   │   ├── nilai/             # Nilai Akademik
│   │   │   └── laporan/           # Laporan & Dashboard
│   │   ├── hooks/                 # Custom React hooks
│   │   ├── lib/                   # Axios instance, helpers
│   │   ├── routes/                # Route definitions
│   │   └── types/                 # TypeScript types
│   ├── public/
│   │   ├── icons/                 # PWA icons
│   │   └── manifest.json
│   └── index.html
│
└── README.md
```

---

## Tahap Pengembangan

### Fase 1 — Foundation Backend

- [x] Install Laravel + Sanctum
- [x] Setup database MySQL
- [x] Buat migrations & model
- [x] Buat CRUD API per modul
- [x] Setup Spatie Role & Permission
- [x] Seeder data dummy

### Fase 2 — Foundation Frontend

- [x] Setup React + Vite + PWA
- [x] Setup MUI theme, Router, Axios
- [x] Layout utama (sidebar + navbar)
- [x] Halaman Login + Register
- [x] Protected route per role

### Fase 3 — Modul CRUD

- [x] Manajemen Siswa
- [x] Manajemen Tutor
- [x] Manajemen Program & Kelas
- [x] Manajemen Penjadwalan
- [x] Manajemen Presensi
- [x] Manajemen Pembayaran
- [x] Manajemen Nilai Akademik

### Fase 4 — Laporan & Finalisasi

- [x] Dashboard (grafik & statistik)
- [x] Laporan keuangan
- [x] Laporan akademik
- [x] Export Excel / PDF
- [x] Testing & bug fixing
- [x] Build PWA + deploy

---

## Fitur Lengkap

### 👤 Autentikasi & User
- Login dengan email & password
- Multi role: Admin, Tutor, Siswa, Orang Tua
- Logout
- Ganti password
- Edit profil

### 👨‍🎓 Manajemen Siswa
- Tambah siswa baru
- Edit data siswa
- Hapus (soft delete)
- Lihat daftar siswa (tabel + search + filter)
- Detail siswa (riwayat kelas, pembayaran, nilai)
- Upload foto siswa
- Status: Aktif / Nonaktif / Lulus

**Fields:** nis, nama, email, no_telp, tgl_lahir, alamat, sekolah, kelas_asal, nama_ortu, no_telp_ortu, foto, status

### 👨‍🏫 Manajemen Tutor
- Tambah / Edit / Hapus tutor
- Data tutor lengkap
- Upload foto

**Fields:** nip, nama, email, no_telp, bidang_ajar, tarif_per_pertemuan, pendidikan_terakhir, foto, status

### 📚 Manajemen Program & Kelas
- Program: Reguler, Intensif, Privat
- CRUD kelas
- Mapping siswa ke kelas
- Kapasitas kelas
- Status: Aktif / Selesai

**Fields Program:** nama, deskripsi, durasi_bulan
**Fields Kelas:** nama, program_id, tutor_id, hari, jam_mulai, jam_selesai, ruang, harga, kapasitas, status

### 📅 Penjadwalan
- Jadwal per kelas (hari, jam, ruang)
- Konflik checker (tutor & ruang)
- Lihat jadwal berdasarkan: kelas, tutor, hari

**Fields:** kelas_id, hari, jam_mulai, jam_selesai, ruang

### ✅ Presensi
- Ambil presensi per pertemuan
- Status: Hadir, Izin, Sakit, Alpha
- Rekap kehadiran per siswa
- Persentase kehadiran

**Fields:** pertemuan_id, siswa_id, status, keterangan

### 💰 Manajemen Pembayaran
- Tagihan otomatis (biaya pendaftaran + SPP)
- Pembayaran cicilan
- Histori pembayaran
- Tunggakan / piutang
- Laporan keuangan
- Cetak kwitansi (opsional export PDF)

**Fields Tagihan:** jenis (daftar/spp), jumlah, tenggat, status
**Fields Pembayaran:** tagihan_id, jumlah, metode (tunai/transfer), tgl_bayar, keterangan

### 📊 Nilai Akademik
- Input nilai per siswa per kelas
- Jenis: Tugas, UTS, UAS
- Rata-rata nilai
- Laporan perkembangan (raport sederhana)

**Fields:** siswa_id, kelas_id, jenis_nilai, nilai

### 📈 Dashboard & Laporan
- Card total: siswa, tutor, kelas, pendapatan
- Grafik pendapatan (line chart)
- Grafik kehadiran (bar chart)
- Tabel tunggakan
- Export laporan (Excel/CSV)

---

## Flow Aplikasi

### Flow Login
```
[Login Page]
    │
    ├─ Masukkan email & password
    │
    ├─ Valid? ──Ya──> Dashboard (redirect sesuai role)
    │
    └─ Tidak ──> Tampilkan error
```

### Flow CRUD (contoh: Siswa)
```
[Sidebar] → Klik "Siswa"
    │
    └─ [Halaman Daftar Siswa]
         ├── Tabel: NIS, Nama, Kelas, Status, Aksi
         ├── Search bar + Filter
         │
         ├─ [Tambah] → Form → Simpan → Refresh tabel
         ├─ [Edit]   → Form terisi → Update → Refresh
         ├─ [Hapus]  → Konfirmasi → Delete (soft) → Refresh
         └─ [Detail] → Modal detail siswa
```

### Flow Pembayaran
```
[Menu Pembayaran]
    │
    ├─ Pilih Siswa (search/select)
    │
    ├─ [Buat Tagihan] → Pilih jenis (daftar/spp) → Input jumlah → Simpan
    │
    ├─ [Bayar] → Pilih tagihan → Input nominal → Pilih metode → Simpan
    │
    └─ [Riwayat] → Tabel histori pembayaran siswa
```

### Flow Role Access
```
Admin ──────> Semua fitur + laporan + pengaturan
Tutor ──────> Kelas (yang diajar), Presensi, Nilai
Siswa ──────> Lihat jadwal, lihat nilai, lihat pembayaran
Orang Tua ──> Lihat progres anak, lihat tagihan
```

---

## Database Design

### Entity Relationship

```
users ──> siswas (1-to-1)
users ──> tutors (1-to-1)
siswas ─> pembayarans (1-to-many)
siswas ─> tagihans (1-to-many)
siswas ─> presensis (1-to-many)
siswas ─> nilais (1-to-many)
siswas ─> kelas_siswa (1-to-many)
kelas ──> kelas_siswa (1-to-many)
tutors ─> kelas (1-to-many)
programs ─> kelas (1-to-many)
kelas ──> jadwals (1-to-many)
kelas ──> pertemuans (1-to-many)
pertemuans ─> presensis (1-to-many)
```

### Table Structure

#### users
| Column | Type | Notes |
|--------|------|-------|
| id | bigint, PK | |
| name | string(255) | |
| email | string(255) | unique |
| password | string(255) | bcrypt |
| no_telp | string(20) | nullable |
| foto | string(255) | nullable, path |
| is_active | boolean | default true |
| timestamps | | |

#### siswas
| Column | Type | Notes |
|--------|------|-------|
| id | bigint, PK | |
| nis | string(20) | unique, student ID |
| user_id | bigint, FK | nullable |
| tgl_lahir | date | |
| alamat | text | nullable |
| sekolah | string(255) | nullable |
| kelas_asal | string(50) | nullable |
| nama_ortu | string(255) | nullable |
| no_telp_ortu | string(20) | nullable |
| status | enum | aktif, nonaktif, lulus |
| timestamps | | |

#### tutors
| Column | Type | Notes |
|--------|------|-------|
| id | bigint, PK | |
| nip | string(20) | unique |
| user_id | bigint, FK | nullable |
| bidang_ajar | string(255) | |
| tarif_per_pertemuan | decimal(12,2) | |
| pendidikan_terakhir | string(100) | nullable |
| timestamps | | |

#### programs
| Column | Type | Notes |
|--------|------|-------|
| id | bigint, PK | |
| nama | string(255) | Reguler/Intensif/Privat |
| deskripsi | text | nullable |
| durasi_bulan | integer | |
| timestamps | | |

#### kelas
| Column | Type | Notes |
|--------|------|-------|
| id | bigint, PK | |
| nama | string(255) | |
| program_id | bigint, FK | |
| tutor_id | bigint, FK | |
| harga | decimal(12,2) | |
| kapasitas | integer | |
| ruang | string(50) | nullable |
| status | enum | aktif, selesai |
| timestamps | | |

#### kelas_siswa
| Column | Type | Notes |
|--------|------|-------|
| id | bigint, PK | |
| kelas_id | bigint, FK | |
| siswa_id | bigint, FK | |
| tgl_masuk | date | |
| tgl_keluar | date | nullable |
| status | enum | aktif, pindah, lulus |
| timestamps | | |

#### jadwals
| Column | Type | Notes |
|--------|------|-------|
| id | bigint, PK | |
| kelas_id | bigint, FK | |
| hari | enum | Senin-Minggu |
| jam_mulai | time | |
| jam_selesai | time | |
| ruang | string(50) | nullable |
| timestamps | | |

#### pertemuans
| Column | Type | Notes |
|--------|------|-------|
| id | bigint, PK | |
| kelas_id | bigint, FK | |
| pertemuan_ke | integer | |
| tgl | date | |
| materi | text | nullable |
| status | enum | terlaksana, libur |
| timestamps | | |

#### presensis
| Column | Type | Notes |
|--------|------|-------|
| id | bigint, PK | |
| pertemuan_id | bigint, FK | |
| siswa_id | bigint, FK | |
| status | enum | hadir, izin, sakit, alpha |
| keterangan | text | nullable |
| timestamps | | |

#### tagihans
| Column | Type | Notes |
|--------|------|-------|
| id | bigint, PK | |
| siswa_id | bigint, FK | |
| jenis | enum | daftar, spp |
| jumlah | decimal(12,2) | |
| tenggat | date | nullable |
| status | enum | pending, lunas, kadaluarsa |
| timestamps | | |

#### pembayarans
| Column | Type | Notes |
|--------|------|-------|
| id | bigint, PK | |
| tagihan_id | bigint, FK | |
| jumlah | decimal(12,2) | |
| metode | enum | tunai, transfer |
| tgl_bayar | date | |
| keterangan | text | nullable |
| timestamps | | |

#### nilais
| Column | Type | Notes |
|--------|------|-------|
| id | bigint, PK | |
| siswa_id | bigint, FK | |
| kelas_id | bigint, FK | |
| jenis_nilai | enum | tugas, uts, uas |
| nilai | decimal(5,2) | |
| keterangan | text | nullable |
| timestamps | | |

---

## API Endpoints

Base URL: `/api`

### Auth
| Method | Endpoint | Auth | Keterangan |
|--------|----------|------|------------|
| POST | `/auth/login` | No | Login |
| POST | `/auth/logout` | Yes | Logout |
| GET | `/auth/me` | Yes | Profile user |
| PUT | `/auth/profile` | Yes | Update profil |

### Siswa
| Method | Endpoint | Auth | Keterangan |
|--------|----------|------|------------|
| GET | `/siswa` | Yes | List siswa (paginated) |
| POST | `/siswa` | Yes | Tambah siswa |
| GET | `/siswa/{id}` | Yes | Detail siswa |
| PUT | `/siswa/{id}` | Yes | Edit siswa |
| DELETE | `/siswa/{id}` | Yes | Hapus siswa (soft) |

### Tutor
| Method | Endpoint | Auth | Keterangan |
|--------|----------|------|------------|
| GET | `/tutor` | Yes | List tutor |
| POST | `/tutor` | Yes | Tambah tutor |
| GET | `/tutor/{id}` | Yes | Detail tutor |
| PUT | `/tutor/{id}` | Yes | Edit tutor |
| DELETE | `/tutor/{id}` | Yes | Hapus tutor |

### Program & Kelas
| Method | Endpoint | Auth | Keterangan |
|--------|----------|------|------------|
| GET | `/program` | Yes | List program |
| POST | `/program` | Yes | Tambah program |
| PUT | `/program/{id}` | Yes | Edit program |
| DELETE | `/program/{id}` | Yes | Hapus program |
| GET | `/kelas` | Yes | List kelas |
| POST | `/kelas` | Yes | Tambah kelas |
| PUT | `/kelas/{id}` | Yes | Edit kelas |
| DELETE | `/kelas/{id}` | Yes | Hapus kelas |
| POST | `/kelas/{id}/siswa` | Yes | Tambah siswa ke kelas |
| DELETE | `/kelas/{id}/siswa/{siswaId}` | Yes | Keluarkan siswa |

### Penjadwalan
| Method | Endpoint | Auth | Keterangan |
|--------|----------|------|------------|
| GET | `/jadwal` | Yes | List jadwal |
| POST | `/jadwal` | Yes | Tambah jadwal |
| PUT | `/jadwal/{id}` | Yes | Edit jadwal |
| DELETE | `/jadwal/{id}` | Yes | Hapus jadwal |

### Presensi
| Method | Endpoint | Auth | Keterangan |
|--------|----------|------|------------|
| GET | `/pertemuan` | Yes | List pertemuan |
| POST | `/pertemuan` | Yes | Buat pertemuan |
| GET | `/pertemuan/{id}/presensi` | Yes | List presensi per pertemuan |
| POST | `/pertemuan/{id}/presensi` | Yes | Simpan presensi |

### Pembayaran
| Method | Endpoint | Auth | Keterangan |
|--------|----------|------|------------|
| GET | `/tagihan` | Yes | List tagihan |
| POST | `/tagihan` | Yes | Buat tagihan |
| GET | `/pembayaran` | Yes | List pembayaran |
| POST | `/pembayaran` | Yes | Input pembayaran |

### Nilai
| Method | Endpoint | Auth | Keterangan |
|--------|----------|------|------------|
| GET | `/nilai` | Yes | List nilai |
| POST | `/nilai` | Yes | Input nilai |
| PUT | `/nilai/{id}` | Yes | Edit nilai |

### Laporan
| Method | Endpoint | Auth | Keterangan |
|--------|----------|------|------------|
| GET | `/laporan/keuangan` | Yes | Laporan keuangan per periode |
| GET | `/laporan/siswa` | Yes | Laporan data siswa |
| GET | `/laporan/kehadiran` | Yes | Laporan kehadiran |
| GET | `/dashboard` | Yes | Data dashboard |

---

## Role & Permission

### Roles
| Role | Deskripsi |
|------|-----------|
| **admin** | Akses penuh ke semua fitur |
| **tutor** | Akses kelas yang diajar, presensi, nilai |
| **siswa** | Lihat jadwal, nilai, tagihan sendiri |
| **orang_tua** | Lihat data anak, tagihan, nilai |

### Permission Matrix
| Fitur | Admin | Tutor | Siswa | Orang Tua |
|-------|-------|-------|-------|-----------|
| Manajemen siswa | ✅ | ❌ | ❌ | ❌ |
| Manajemen tutor | ✅ | ❌ | ❌ | ❌ |
| Manajemen kelas | ✅ | ❌ | ❌ | ❌ |
| Penjadwalan | ✅ | ✅ (view) | ✅ (view) | ✅ (view) |
| Presensi | ✅ | ✅ | ❌ | ❌ |
| Input nilai | ✅ | ✅ | ❌ | ❌ |
| Lihat nilai | ✅ | ✅ | ✅ | ✅ (anak) |
| Pembayaran | ✅ | ❌ | ✅ (self) | ✅ (anak) |
| Laporan | ✅ | ❌ | ❌ | ❌ |

---

## Cara Menjalankan Project

### Prasyarat
- PHP 8.2+
- Composer
- Node.js 18+
- MySQL 8.0+
- Git

### Prasyarat
- PHP 8.3+
- Composer
- Node.js 18+
- MySQL 8.0+
- Git

### 1. Jalankan Backend

Masuk ke folder backend lalu jalankan:
```bash
cd kasilmu-api

composer install
npm install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan db:seed
composer run dev
```

Perintah `composer run dev` akan menjalankan Laravel server dan Vite sekaligus.

Jika perlu queue atau log viewer, jalankan di terminal terpisah:
```bash
composer run dev:queue
composer run dev:logs
```

### 2. Jalankan Frontend

Buka terminal baru lalu jalankan:
```bash
cd kasilmu-pwa

npm install
npm run dev
npm run build
npm run preview
```

Isi file `.env` frontend dengan:
```env
VITE_API_URL=http://localhost:8000/api
```

### 3. Akses Aplikasi

| URL | Keterangan |
|-----|------------|
| `http://localhost:8000` | Backend API |
| `http://localhost:5173` | Frontend development |
| `http://localhost:5173/login` | Halaman login |

### Opsi Cepat

Kalau ingin menjalankan semuanya secara manual, urutannya adalah:
1. Start backend di `kasilmu-api` dengan `composer run dev`
2. Start frontend di `kasilmu-pwa` dengan `npm run dev`
3. Pastikan database MySQL sudah aktif dan `.env` backend sudah sesuai

---

## Deployment

### Shared Hosting (PHP)
1. Upload folder `kasilmu-api` ke server
2. Set `public/` sebagai document root
3. Import database SQL
4. Update `.env` (DB & APP_URL)

### Frontend (Vercel / Netlify / Hosting static)
1. Build project: `npm run build`
2. Upload folder `dist/` ke hosting
3. Pastikan PWA service worker tercache

### Environment Variables (.env)
```
# Backend
APP_URL=https://kasilmu-api.domain.com
DB_DATABASE=kasilmu
DB_USERNAME=root
DB_PASSWORD=yourpassword
SANCTUM_STATEFUL_DOMAINS=localhost,127.0.0.1,*
SESSION_DRIVER=cookie

# Frontend
VITE_API_URL=https://kasilmu-api.domain.com/api
```

---

## Catatan Development

### Convention Code
- Backend: PSR-12, Resource Controller, Form Request
- Frontend: Feature-based folder structure, Custom hooks, TypeScript strict
- API: JSON response, HTTP status codes, Pagination

### Response API Format
```json
{
  "success": true,
  "message": "Data berhasil disimpan",
  "data": { ... },
  "meta": {
    "current_page": 1,
    "last_page": 5,
    "per_page": 10,
    "total": 50
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "email": ["Email sudah terdaftar"]
  }
}
```

---

**Dibuat oleh:** [Developer Name]
**Client:** Kasilmu
**Versi:** 1.0.0
**Terakhir diperbarui:** Juni 2026
