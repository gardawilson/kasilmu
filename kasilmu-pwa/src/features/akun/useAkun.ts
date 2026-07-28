import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../../lib/api'
import type { User, ApiResponse } from '../../types'

export function useAkun(params: { search?: string; role?: string; page?: number; per_page?: number }) {
  return useQuery({
    queryKey: ['user', params],
    queryFn: async () => {
      const res = await api.get<ApiResponse<User[]>>('/user', { params })
      return res.data
    },
  })
}

export function useCreateAkun() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: { name: string; username: string; email: string; password?: string; no_telp?: string; role: string }) =>
      api.post('/user', data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['user'] }),
  })
}

export function useUpdateAkun(id: number) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: { name: string; username: string; email: string; password?: string; no_telp?: string; is_active?: boolean }) =>
      api.put(`/user/${id}`, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['user'] }),
  })
}

export function useDeleteAkun() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => api.delete(`/user/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['user'] }),
  })
}
