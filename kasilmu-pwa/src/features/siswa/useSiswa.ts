import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../../lib/api'
import type { Siswa, ApiResponse } from '../../types'

export function useSiswa(params: { search?: string; status?: string; page?: number; per_page?: number }) {
  return useQuery({
    queryKey: ['siswa', params],
    queryFn: async () => {
      const res = await api.get<ApiResponse<Siswa[]>>('/siswa', { params })
      return res.data
    },
  })
}

export function useSiswaDetail(id: number) {
  return useQuery({
    queryKey: ['siswa', id],
    queryFn: async () => {
      const res = await api.get<ApiResponse<Siswa>>(`/siswa/${id}`)
      return res.data
    },
    enabled: !!id,
  })
}

export function useCreateSiswa() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: Partial<Siswa>) => api.post('/siswa', data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['siswa'] }),
  })
}

export function useUpdateSiswa(id: number) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: Partial<Siswa>) => api.put(`/siswa/${id}`, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['siswa'] }),
  })
}

export function useDeleteSiswa() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => api.delete(`/siswa/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['siswa'] }),
  })
}
