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
  izin: number
  sakit: number
  alpha: number
  siswa: { id: number; nama: string; nis: string }
}

export function useLaporanKehadiran(params: { siswa_id?: string; page?: number; per_page?: number }) {
  return useQuery({
    queryKey: ['laporan', 'kehadiran', params],
    queryFn: async () => {
      const res = await api.get<ApiResponse<LaporanKehadiran[]>>('/laporan/kehadiran', { params })
      return res.data
    },
  })
}
