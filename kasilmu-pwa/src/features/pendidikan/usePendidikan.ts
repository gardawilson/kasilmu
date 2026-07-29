import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import api from '../../lib/api'
import type { ApiResponse, Jenjang, Tingkat } from '../../types'

export function useJenjang(semua = false) {
  return useQuery({
    queryKey: ['jenjang', { semua }],
    queryFn: async () => {
      const res = await api.get<ApiResponse<Jenjang[]>>('/jenjang', {
        params: semua ? { semua: 1 } : undefined,
      })
      return res.data
    },
  })
}

export function useCreateJenjang() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: Partial<Jenjang>) => api.post('/jenjang', data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['jenjang'] }),
  })
}

export function useUpdateJenjang(id: number) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: Partial<Jenjang>) => api.put(`/jenjang/${id}`, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['jenjang'] }),
  })
}

export function useDeleteJenjang() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => api.delete(`/jenjang/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['jenjang'] }),
  })
}

export function useCreateTingkat() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: Partial<Tingkat>) => api.post('/tingkat', data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['jenjang'] }),
  })
}

export function useUpdateTingkat(id: number) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: Partial<Tingkat>) => api.put(`/tingkat/${id}`, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['jenjang'] }),
  })
}

export function useDeleteTingkat() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => api.delete(`/tingkat/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['jenjang'] }),
  })
}
