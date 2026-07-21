import { useQuery } from '@tanstack/react-query'
import api from '../../lib/api'
import type { ApiResponse } from '../../types'

export interface DashboardData {
  total_siswa: number
  total_siswa_aktif: number
  total_tutor: number
  total_kelas_aktif: number
  pendapatan_bulan_ini: number
  pendapatan_hari_ini: number
  pendapatan_per_bulan: { bulan: number; tahun: number; total: number }[]
}

export function useDashboard() {
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: async () => {
      const res = await api.get<ApiResponse<DashboardData>>('/dashboard')
      return res.data.data
    },
  })
}
