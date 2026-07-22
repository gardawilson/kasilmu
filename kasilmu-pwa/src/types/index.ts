export interface User {
  id: number
  name: string
  email: string
  no_telp: string | null
  foto: string | null
  is_active: boolean
  roles: { id: number; name: string }[]
  tutor?: { id: number; nama: string } | null
}

export interface Sekolah {
  id: number
  nama: string
}

export interface Siswa {
  id: number
  nis: string
  nama: string
  email: string | null
  no_telp: string | null
  tgl_lahir: string
  alamat: string | null
  sekolah_id: number | null
  sekolah?: Sekolah | null
  kelas_asal: string | null
  tingkat: number | null
  jenjang: 'SD' | 'SMP' | 'SMA' | null
  nama_ortu: string | null
  no_telp_ortu: string | null
  foto: string | null
  status: 'aktif' | 'nonaktif' | 'lulus'
}

export interface Pengajar {
  id: number
  nip: string
  nama: string
  email: string | null
  no_telp: string | null
  bidang_ajar: string
  tarif_per_pertemuan: number
  pendidikan_terakhir: string | null
  foto: string | null
  is_active: boolean
}

export interface Kelas {
  id: number
  nama: string
  mata_pelajaran: string
  deskripsi: string | null
  durasi_bulan: number
  tutor_id: number
  harga: number
  kapasitas: number
  ruang: string | null
  status: 'aktif' | 'selesai'
  tutor?: Pengajar
  siswa?: Siswa[]
  siswa_count?: number
  pertemuans_count?: number
}

export interface Jadwal {
  id: number
  kelas_id: number
  hari: string
  jam_mulai: string
  jam_selesai: string
  ruang: string | null
  kelas?: Kelas
}

export interface Pertemuan {
  id: number
  kelas_id: number
  pertemuan_ke: number
  tgl: string
  materi: string | null
  status: 'terlaksana' | 'libur'
  kelas?: Kelas
  presensis?: Presensi[]
}

export interface Presensi {
  id: number
  pertemuan_id: number
  siswa_id: number
  status: 'hadir' | 'izin' | 'sakit' | 'alpha'
  keterangan: string | null
  siswa?: Siswa
}

export interface Tagihan {
  id: number
  siswa_id: number
  jenis: 'daftar' | 'spp'
  jumlah: number
  tenggat: string | null
  status: 'pending' | 'lunas' | 'kadaluarsa'
  siswa?: Siswa
  pembayarans?: Pembayaran[]
}

export interface Pembayaran {
  id: number
  tagihan_id: number
  jumlah: number
  metode: 'tunai' | 'transfer'
  tgl_bayar: string
  keterangan: string | null
  tagihan?: Tagihan
}

export interface Nilai {
  id: number
  siswa_id: number
  kelas_id: number
  jenis_nilai: 'tugas' | 'uts' | 'uas'
  nilai: number
  keterangan: string | null
  siswa?: Siswa
  kelas?: Kelas
}

export interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
  meta?: {
    current_page: number
    last_page: number
    per_page: number
    total: number
  }
}
