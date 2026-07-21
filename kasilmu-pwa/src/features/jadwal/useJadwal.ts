import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../../lib/api'
import type { Jadwal, ApiResponse } from '../../types'

export function useJadwal(params: { kelas_id?: string; hari?: string; page?: number; per_page?: number }) {
  return useQuery({
    queryKey: ['jadwal', params],
    queryFn: async () => {
      const res = await api.get<ApiResponse<Jadwal[]>>('/jadwal', { params })
      return res.data
    },
  })
}

export function useCreateJadwal() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: Partial<Jadwal>) => api.post('/jadwal', data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['jadwal'] }),
  })
}

export function useUpdateJadwal(id: number) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: Partial<Jadwal>) => api.put(`/jadwal/${id}`, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['jadwal'] }),
  })
}

export function useDeleteJadwal() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => api.delete(`/jadwal/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['jadwal'] }),
  })
}
