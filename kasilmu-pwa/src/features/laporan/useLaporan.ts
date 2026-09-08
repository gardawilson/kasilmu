import { useQuery } from '@tanstack/react-query'
import api from '../../lib/api'
import type { ApiResponse, Pembayaran, Siswa } from '../../types'

export interface LaporanKeuangan {
  total_pendapatan: number
  detail: Pembayaran[]
  meta?: { current_page: number; last_page: number; per_page: number; total: number }
}

export function useLaporanKeuangan(params: { dari?: string; sampai?: string; page?: number; per_page?: number }) {
  return useQuery({
    queryKey: ['laporan', 'keuangan', params],
    queryFn: async () => {
      const res = await api.get<{ success: boolean; message: string; data: LaporanKeuangan }>('/laporan/keuangan', { params })
      return res.data.data
    },
  })
}

export interface LaporanSiswaItem extends Siswa {
  tagihans_count: number
  nilais_count: number
}

export function useLaporanSiswa(params: { status?: string; page?: number; per_page?: number }) {
  return useQuery({
    queryKey: ['laporan', 'siswa', params],
    queryFn: async () => {
      const res = await api.get<ApiResponse<LaporanSiswaItem[]>>('/laporan/siswa', { params })
      return res.data
    },
  })
}

export interface LaporanKehadiran {
  siswa_id: number
  total_pertemuan: number
  hadir: number
  tidak_hadir: number
  siswa: { id: number; nama: string; nis: string }
  paket?: string
  kuota?: number
  sisa?: number
}

export function useLaporanKehadiran(params: { search?: string; siswa_id?: string; kelas_id?: string; tgl_mulai?: string; tgl_selesai?: string; page?: number; per_page?: number }) {
  return useQuery({
    queryKey: ['laporan', 'kehadiran', params],
    queryFn: async () => {
      const res = await api.get<ApiResponse<LaporanKehadiran[]>>('/laporan/kehadiran', { params })
      return res.data
    },
  })
}

export interface KehadiranDetailItem {
  tgl: string
  pertemuan_ke: number
  status: 'hadir' | 'tidak_hadir'
  keterangan: string | null
  kelas: string | null
}

export interface KehadiranDetail {
  siswa: { id: number; nama: string; nis: string }
  presensi: KehadiranDetailItem[]
}

export function useLaporanKehadiranDetail(
  siswaId: number | null,
  params: { kelas_id?: string; tgl_mulai?: string; tgl_selesai?: string } = {},
) {
  return useQuery({
    queryKey: ['laporan', 'kehadiran', 'detail', siswaId, params],
    queryFn: async () => {
      const res = await api.get<{ success: boolean; message: string; data: KehadiranDetail }>(
        `/laporan/kehadiran/${siswaId}/detail`,
        { params },
      )
      return res.data.data
    },
    enabled: !!siswaId,
  })
}

export interface LaporanKehadiranPengajar {
  tutor_id: number
  total_sesi: number
  total_hari: number
  total_kelas: number
  tutor: { id: number; nama: string; nip: string }
}

export function useLaporanKehadiranPengajar(params: { tutor_id?: string; kelas_id?: string; tgl_mulai?: string; tgl_selesai?: string; page?: number; per_page?: number }) {
  return useQuery({
    queryKey: ['laporan', 'kehadiran-pengajar', params],
    queryFn: async () => {
      const res = await api.get<ApiResponse<LaporanKehadiranPengajar[]>>('/laporan/kehadiran-pengajar', { params })
      return res.data
    },
  })
}

export interface PengajarDetailItem {
  tgl: string
  pertemuan_ke: number
  status: string
  kelas: string | null
}

export interface PengajarDetail {
  tutor: { id: number; nama: string; nip: string }
  pertemuan: PengajarDetailItem[]
}

export function useLaporanKehadiranPengajarDetail(
  tutorId: number | null,
  params: { kelas_id?: string; tgl_mulai?: string; tgl_selesai?: string } = {},
) {
  return useQuery({
    queryKey: ['laporan', 'kehadiran-pengajar', 'detail', tutorId, params],
    queryFn: async () => {
      const res = await api.get<{ success: boolean; message: string; data: PengajarDetail }>(
        `/laporan/kehadiran-pengajar/${tutorId}/detail`,
        { params },
      )
      return res.data.data
    },
    enabled: !!tutorId,
  })
}

export interface LaporanGajiKelas {
  kelas_id: number
  kelas: string
  jumlah_pertemuan: number
  tarif_per_pertemuan: number
  subtotal: number
}

export interface LaporanGajiItem {
  tutor_id: number
  tutor: string
  kelas: LaporanGajiKelas[]
  total_pertemuan: number
  total_gaji: number
}

export interface LaporanGaji {
  total_gaji: number
  detail: LaporanGajiItem[]
}

export function useLaporanGaji(params: { tutor_id?: string; tgl_mulai?: string; tgl_selesai?: string }) {
  return useQuery({
    queryKey: ['laporan', 'gaji', params],
    queryFn: async () => {
      const res = await api.get<{ success: boolean; message: string; data: LaporanGaji }>('/laporan/gaji', { params })
      return res.data.data
    },
  })
}
