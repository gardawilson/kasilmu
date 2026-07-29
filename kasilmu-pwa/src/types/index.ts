export interface User {
  id: number
  name: string
  username: string
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

export interface Jenjang {
  id: number
  kode: string
  nama: string
  urutan: number
  is_active: boolean
  tingkats?: Tingkat[]
}

export interface Tingkat {
  id: number
  jenjang_id: number
  nama: string
  urutan: number
  is_active: boolean
  jenjang?: Jenjang
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
  tingkat_id: number | null
  tingkat?: Tingkat | null
  nama_ortu: string | null
  no_telp_ortu: string | null
  foto: string | null
  status: 'aktif' | 'nonaktif' | 'lulus'
  kelas?: Kelas[]
  siswa_pakets?: SiswaPaket[]
}

export interface Pengajar {
  id: number
  user_id: number | null
  nip: string
  nama: string
  email: string
  no_telp: string | null
  bidang_ajar: string
  tarif_per_pertemuan: number
  pendidikan_terakhir: string | null
  foto: string | null
  is_active: boolean
  user?: { id: number; username: string; email: string; is_active: boolean } | null
}

export interface Kelas {
  id: number
  nama: string
  mata_pelajaran: string
  deskripsi: string | null
  kapasitas: number
  ruang: string | null
  status: 'aktif' | 'selesai'
  siswa?: Siswa[]
  siswa_count?: number
  pertemuans_count?: number
}

export interface Pertemuan {
  id: number
  kelas_id: number
  tutor_id: number | null
  pertemuan_ke: number
  tgl: string
  materi: string | null
  status: 'terlaksana' | 'libur'
  kelas?: Kelas
  tutor?: Pengajar
  presensis?: Presensi[]
}

export interface Presensi {
  id: number
  pertemuan_id: number
  siswa_id: number
  status: 'hadir' | 'tidak_hadir'
  keterangan: string | null
  catatan: string | null
  siswa?: Siswa
  sisa_pertemuan?: number
  kuota?: number
}

export interface Tagihan {
  id: number
  siswa_id: number
  siswa_paket_id?: number | null
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

export interface Paket {
  id: number
  nama: string
  jumlah_pertemuan: number
  deskripsi: string | null
}

export interface HargaPaket {
  id: number
  kelas_id: number
  paket_id: number
  harga: number
  paket?: Paket
}

export interface SiswaPaket {
  id: number
  siswa_id: number
  kelas_id: number
  paket_id: number
  tgl_mulai: string
  tgl_selesai: string
  status: 'aktif' | 'terjadwal' | 'selesai'
  siswa?: Siswa
  kelas?: Kelas
  paket?: Paket
  sisa_pertemuan?: number
  hadir_count?: number
  tagihan?: Tagihan
  paket_berikutnya?: SiswaPaket | null
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
