import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../../lib/api'
import type { Sekolah, ApiResponse } from '../../types'

export function useSekolah(params: { search?: string } = {}) {
  return useQuery({
    queryKey: ['sekolah', params],
    queryFn: async () => {
      const res = await api.get<ApiResponse<Sekolah[]>>('/sekolah', { params })
      return res.data
    },
  })
}

export function useCreateSekolah() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (nama: string) => api.post<ApiResponse<Sekolah>>('/sekolah', { nama }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['sekolah'] }),
  })
}

export function useUpdateSekolah(id: number) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (nama: string) => api.put(`/sekolah/${id}`, { nama }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['sekolah'] }),
  })
}

export function useDeleteSekolah() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => api.delete(`/sekolah/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['sekolah'] }),
  })
}
