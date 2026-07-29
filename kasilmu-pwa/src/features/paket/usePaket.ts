import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../../lib/api'
import type { Paket, SiswaPaket, HargaPaket, ApiResponse } from '../../types'

export function usePaketList(params: { page?: number; per_page?: number } = {}) {
  return useQuery({
    queryKey: ['paket', params],
    queryFn: async () => {
      const res = await api.get<ApiResponse<Paket[]>>('/paket', { params })
      return res.data
    },
  })
}

export function useCreatePaket() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: Partial<Paket>) => api.post('/paket', data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['paket'] }),
  })
}

export function useUpdatePaket(id: number) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: Partial<Paket>) => api.put(`/paket/${id}`, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['paket'] }),
  })
}

export function useDeletePaket() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => api.delete(`/paket/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['paket'] }),
  })
}

export function useSiswaPaket(params: { siswa_id?: string; kelas_id?: string; status?: string; page?: number; per_page?: number }) {
  return useQuery({
    queryKey: ['siswa-paket', params],
    queryFn: async () => {
      const res = await api.get<ApiResponse<SiswaPaket[]>>('/siswa-paket', { params })
      return res.data
    },
  })
}

export function useSiswaPaketAktif(siswaId: number) {
  return useQuery({
    queryKey: ['siswa-paket', 'aktif', siswaId],
    queryFn: async () => {
      const res = await api.get<ApiResponse<SiswaPaket | null>>(`/siswa/${siswaId}/paket`)
      return res.data
    },
    enabled: !!siswaId,
  })
}

export function useCreateSiswaPaket() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: { siswa_id: number; kelas_id: number; paket_id: number; tgl_mulai: string }) =>
      api.post(`/siswa/${data.siswa_id}/paket`, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['siswa-paket'] }),
  })
}

export function useJadwalkanGantiPaket(siswaPaketId: number) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (paket_id: number) => api.post(`/siswa-paket/${siswaPaketId}/ganti`, { paket_id }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['siswa-paket'] })
      qc.invalidateQueries({ queryKey: ['tagihan'] })
    },
  })
}

export function useUpdateSiswaPaket(id: number) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: Partial<SiswaPaket>) => api.put(`/siswa-paket/${id}`, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['siswa-paket'] }),
  })
}

export function useDeleteSiswaPaket() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => api.delete(`/siswa-paket/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['siswa-paket'] }),
  })
}

export function useHargaPaket(kelasId: number) {
  return useQuery({
    queryKey: ['harga-paket', kelasId],
    queryFn: async () => {
      const res = await api.get<ApiResponse<HargaPaket[]>>('/harga-paket', { params: { kelas_id: kelasId } })
      return res.data
    },
    enabled: !!kelasId,
  })
}

export function useSetHargaPaket() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: { kelas_id: number; paket_id: number; harga: number }) =>
      api.post('/harga-paket', data),
    onSuccess: (_, variables) => qc.invalidateQueries({ queryKey: ['harga-paket', variables.kelas_id] }),
  })
}
