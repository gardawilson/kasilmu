import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../../lib/api'
import type { Pertemuan, Presensi, ApiResponse } from '../../types'

export function usePertemuan(params: { kelas_id?: string; page?: number; per_page?: number }) {
  return useQuery({
    queryKey: ['pertemuan', params],
    queryFn: async () => {
      const res = await api.get<ApiResponse<Pertemuan[]>>('/pertemuan', { params })
      return res.data
    },
  })
}

export function usePertemuanDetail(id: number) {
  return useQuery({
    queryKey: ['pertemuan', id],
    queryFn: async () => {
      const res = await api.get<ApiResponse<Pertemuan>>(`/pertemuan/${id}`)
      return res.data
    },
    enabled: !!id,
  })
}

export function useCreatePertemuan() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: Partial<Pertemuan>) => api.post('/pertemuan', data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['pertemuan'] }),
  })
}

export function useUpdatePertemuan(id: number) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: Partial<Pertemuan>) => api.put(`/pertemuan/${id}`, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['pertemuan'] }),
  })
}

export function useDeletePertemuan() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => api.delete(`/pertemuan/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['pertemuan'] }),
  })
}

export function usePresensi(pertemuanId: number) {
  return useQuery({
    queryKey: ['presensi', pertemuanId],
    queryFn: async () => {
      const res = await api.get<ApiResponse<Presensi[]>>(`/pertemuan/${pertemuanId}/presensi`)
      return res.data
    },
    enabled: !!pertemuanId,
  })
}

export function useStorePresensi(pertemuanId: number) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (presensi: { siswa_id: number; status: string; keterangan?: string }[]) =>
      api.post(`/pertemuan/${pertemuanId}/presensi`, { presensi }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['presensi'] }),
  })
}
