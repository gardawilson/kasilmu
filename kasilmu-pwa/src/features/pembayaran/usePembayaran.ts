import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../../lib/api'
import type { Tagihan, Pembayaran, ApiResponse } from '../../types'

export function useTagihan(params: { siswa_id?: string; status?: string; page?: number; per_page?: number }) {
  return useQuery({
    queryKey: ['tagihan', params],
    queryFn: async () => {
      const res = await api.get<ApiResponse<Tagihan[]>>('/tagihan', { params })
      return res.data
    },
  })
}

export function useTagihanDetail(id: number) {
  return useQuery({
    queryKey: ['tagihan', id],
    queryFn: async () => {
      const res = await api.get<ApiResponse<Tagihan>>(`/tagihan/${id}`)
      return res.data
    },
    enabled: !!id,
  })
}

export function useCreateTagihan() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: Partial<Tagihan>) => api.post('/tagihan', data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['tagihan'] }),
  })
}

export function useUpdateTagihan(id: number) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: Partial<Tagihan>) => api.put(`/tagihan/${id}`, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['tagihan'] }),
  })
}

export function useDeleteTagihan() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => api.delete(`/tagihan/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['tagihan'] }),
  })
}

export function usePembayaran(params: { tagihan_id?: string; page?: number; per_page?: number }) {
  return useQuery({
    queryKey: ['pembayaran', params],
    queryFn: async () => {
      const res = await api.get<ApiResponse<Pembayaran[]>>('/pembayaran', { params })
      return res.data
    },
  })
}

export function useCreatePembayaran() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: Partial<Pembayaran>) => api.post('/pembayaran', data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['tagihan'] }),
  })
}

export function useDeletePembayaran() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => api.delete(`/pembayaran/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['tagihan'] }),
  })
}
