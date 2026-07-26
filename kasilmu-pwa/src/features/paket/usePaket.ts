import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../../lib/api'
import type { Paket, SiswaPaket, ApiResponse } from '../../types'

export function usePaketList(params: { per_page?: number } = {}) {
  return useQuery({
    queryKey: ['paket', params],
    queryFn: async () => {
      const res = await api.get<ApiResponse<Paket[]>>('/paket', { params })
      return res.data
    },
  })
}

export function useSiswaPaket(params: { siswa_id?: string; kelas_id?: string; status?: string; page?: number; per_page?: number }) {
  return useQuery({
    queryKey: ['siswa-paket', params],
    queryFn: async () => {
      const res = await api.get<ApiResponse<SiswaPaket[]>>('/siswa-paket', { params })
      return res.data
    },
  })
}

export function useSiswaPaketAktif(siswaId: number) {
  return useQuery({
    queryKey: ['siswa-paket', 'aktif', siswaId],
    queryFn: async () => {
      const res = await api.get<ApiResponse<SiswaPaket | null>>(`/siswa/${siswaId}/paket`)
      return res.data
    },
    enabled: !!siswaId,
  })
}

export function useCreateSiswaPaket() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: { siswa_id: number; kelas_id: number; paket_id: number; tgl_mulai: string }) =>
      api.post(`/siswa/${data.siswa_id}/paket`, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['siswa-paket'] }),
  })
}

export function useUpdateSiswaPaket(id: number) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: Partial<SiswaPaket>) => api.put(`/siswa-paket/${id}`, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['siswa-paket'] }),
  })
}

export function useDeleteSiswaPaket() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => api.delete(`/siswa-paket/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['siswa-paket'] }),
  })
}
