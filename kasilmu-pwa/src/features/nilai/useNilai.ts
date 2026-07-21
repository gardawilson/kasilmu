import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../../lib/api'
import type { Nilai, ApiResponse } from '../../types'

export function useNilai(params: { siswa_id?: string; kelas_id?: string; jenis_nilai?: string; page?: number; per_page?: number }) {
  return useQuery({
    queryKey: ['nilai', params],
    queryFn: async () => {
      const res = await api.get<ApiResponse<Nilai[]>>('/nilai', { params })
      return res.data
    },
  })
}

export function useCreateNilai() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: Partial<Nilai>) => api.post('/nilai', data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['nilai'] }),
  })
}

export function useUpdateNilai(id: number) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: Partial<Nilai>) => api.put(`/nilai/${id}`, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['nilai'] }),
  })
}

export function useDeleteNilai() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => api.delete(`/nilai/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['nilai'] }),
  })
}
