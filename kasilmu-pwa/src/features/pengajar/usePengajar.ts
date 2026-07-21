import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../../lib/api'
import type { Pengajar, ApiResponse } from '../../types'

export function usePengajar(params: { search?: string; page?: number; per_page?: number }) {
  return useQuery({
    queryKey: ['pengajar', params],
    queryFn: async () => {
      const res = await api.get<ApiResponse<Pengajar[]>>('/tutor', { params })
      return res.data
    },
  })
}

export function useCreatePengajar() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: Partial<Pengajar>) => api.post('/tutor', data),
    onMutate: async (newData) => {
      await qc.cancelQueries({ queryKey: ['pengajar'] })
      const snapshot = qc.getQueriesData({ queryKey: ['pengajar'] })
      qc.setQueriesData({ queryKey: ['pengajar'], type: 'active' }, (old: ApiResponse<Pengajar[]> | undefined) => {
        if (!old) return old
        return {
          ...old,
          data: [{ ...newData, id: Date.now(), is_active: true, foto: null } as Pengajar, ...old.data],
          meta: old.meta ? { ...old.meta, total: (old.meta.total || 0) + 1 } : old.meta,
        }
      })
      return { snapshot }
    },
    onError: (_err, _newData, context) => {
      context?.snapshot.forEach(([key, data]) => qc.setQueryData(key, data))
    },
    onSettled: () => qc.invalidateQueries({ queryKey: ['pengajar'] }),
  })
}

export function useUpdatePengajar(id: number) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: Partial<Pengajar>) => api.put(`/tutor/${id}`, data),
    onMutate: async (newData) => {
      await qc.cancelQueries({ queryKey: ['pengajar'] })
      const snapshot = qc.getQueriesData({ queryKey: ['pengajar'] })
      qc.setQueriesData({ queryKey: ['pengajar'], type: 'active' }, (old: ApiResponse<Pengajar[]> | undefined) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.map((item) => (item.id === id ? { ...item, ...newData } : item)),
        }
      })
      return { snapshot }
    },
    onError: (_err, _newData, context) => {
      context?.snapshot.forEach(([key, data]) => qc.setQueryData(key, data))
    },
    onSettled: () => qc.invalidateQueries({ queryKey: ['pengajar'] }),
  })
}

export function useDeletePengajar() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => api.delete(`/tutor/${id}`),
    onMutate: async (deleteId) => {
      await qc.cancelQueries({ queryKey: ['pengajar'] })
      const snapshot = qc.getQueriesData({ queryKey: ['pengajar'] })
      qc.setQueriesData({ queryKey: ['pengajar'], type: 'active' }, (old: ApiResponse<Pengajar[]> | undefined) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => item.id !== deleteId),
          meta: old.meta ? { ...old.meta, total: (old.meta.total || 0) - 1 } : old.meta,
        }
      })
      return { snapshot }
    },
    onError: (_err, _deleteId, context) => {
      context?.snapshot.forEach(([key, data]) => qc.setQueryData(key, data))
    },
    onSettled: () => qc.invalidateQueries({ queryKey: ['pengajar'] }),
  })
}
