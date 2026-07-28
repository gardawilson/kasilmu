import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../../lib/api'
import type { Kelas, ApiResponse } from '../../types'

export function useKelas(params: { search?: string; status?: string; page?: number; per_page?: number }) {
  return useQuery({
    queryKey: ['kelas', params],
    queryFn: async () => {
      const res = await api.get<ApiResponse<Kelas[]>>('/kelas', { params })
      return res.data
    },
  })
}

export function useKelasDetail(id: number) {
  return useQuery({
    queryKey: ['kelas', id],
    queryFn: async () => {
      const res = await api.get<ApiResponse<Kelas>>(`/kelas/${id}`)
      return res.data
    },
    enabled: !!id,
  })
}

export function useCreateKelas() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: Partial<Kelas>) => api.post('/kelas', data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['kelas'] }),
  })
}

export function useUpdateKelas(id: number) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: Partial<Kelas>) => api.put(`/kelas/${id}`, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['kelas'] }),
  })
}

export function useDeleteKelas() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => api.delete(`/kelas/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['kelas'] }),
  })
}

export function useAddSiswaKelas(kelasId: number) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (siswa_id: number) => api.post(`/kelas/${kelasId}/siswa`, { siswa_id }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['kelas'] }),
  })
}

export function useRemoveSiswaKelas(kelasId: number) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (siswa_id: number) => api.delete(`/kelas/${kelasId}/siswa/${siswa_id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['kelas'] }),
  })
}
