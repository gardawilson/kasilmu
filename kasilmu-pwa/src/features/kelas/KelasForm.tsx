import { useEffect } from 'react'
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem,
  Box, Divider,
} from '@mui/material'
import { Assignment, People } from '@mui/icons-material'
import { useForm } from 'react-hook-form'
import { useCreateKelas, useUpdateKelas } from './useKelas'
import type { Kelas } from '../../types'

interface Props {
  open: boolean
  onClose: () => void
  editData?: Kelas | null
  onDelete?: () => void
  onKelolaPaket?: () => void
  onAturSiswa?: () => void
}

export default function KelasForm({
  open, onClose, editData, onDelete, onKelolaPaket, onAturSiswa,
}: Props) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Partial<Kelas>>()
  const create = useCreateKelas()
  const update = useUpdateKelas(editData?.id || 0)

  useEffect(() => {
    if (open) {
      reset(editData ?? {
        nama: '', mata_pelajaran: '', deskripsi: '',
        kapasitas: 20, tarif_per_pertemuan: 0, ruang: '', status: 'aktif',
      })
    }
  }, [open, editData, reset])

  const onSubmit = async (data: Partial<Kelas>) => {
    try {
      if (editData) await update.mutateAsync(data)
      else await create.mutateAsync(data)
      onClose()
    } catch { /* handled */ }
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{editData ? `Kelas — ${editData.nama}` : 'Tambah Kelas'}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          {editData && (onKelolaPaket || onAturSiswa) && (
            <Box sx={{ display: 'flex', gap: 1, mb: 1.5, flexWrap: 'wrap' }}>
              {onKelolaPaket && (
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<Assignment sx={{ fontSize: 18 }} />}
                  onClick={onKelolaPaket}
                  sx={{ borderColor: '#e2e2e6', color: '#4880ff' }}
                >
                  Kelola Paket
                </Button>
              )}
              {onAturSiswa && (
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<People sx={{ fontSize: 18 }} />}
                  onClick={onAturSiswa}
                  sx={{ borderColor: '#e2e2e6', color: '#4880ff' }}
                >
                  Atur Siswa
                </Button>
              )}
            </Box>
          )}
          {editData && (onKelolaPaket || onAturSiswa) && <Divider sx={{ mb: 1 }} />}

          <TextField label="Nama Kelas" fullWidth margin="dense" required
            {...register('nama', { required: 'Nama kelas wajib diisi' })}
            error={!!errors.nama} helperText={errors.nama?.message} />
          <TextField label="Mata Pelajaran" fullWidth margin="dense" required
            {...register('mata_pelajaran', { required: 'Mata pelajaran wajib diisi' })}
            error={!!errors.mata_pelajaran} helperText={errors.mata_pelajaran?.message} />
          <TextField label="Deskripsi" fullWidth margin="dense" multiline rows={3}
            {...register('deskripsi')} />
          <TextField label="Kapasitas" fullWidth margin="dense" required type="number"
            {...register('kapasitas', { required: 'Kapasitas wajib diisi', min: { value: 1, message: 'Minimal 1' } })}
            error={!!errors.kapasitas} helperText={errors.kapasitas?.message} />
          <TextField label="Tarif Per Pertemuan (Rp)" fullWidth margin="dense" required type="number"
            {...register('tarif_per_pertemuan', { required: 'Tarif wajib diisi', min: { value: 0, message: 'Minimal 0' } })}
            error={!!errors.tarif_per_pertemuan} helperText={errors.tarif_per_pertemuan?.message} />
          <TextField label="Ruang" fullWidth margin="dense"
            {...register('ruang')} />
          <TextField label="Status" fullWidth margin="dense" select
            {...register('status')} defaultValue="aktif">
            <MenuItem value="aktif">Aktif</MenuItem>
            <MenuItem value="selesai">Selesai</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          {editData && onDelete && (
            <Button color="error" onClick={onDelete} sx={{ mr: 'auto' }}>
              Hapus
            </Button>
          )}
          <Button onClick={onClose}>Batal</Button>
          <Button type="submit" variant="contained" disabled={create.isPending || update.isPending}>
            {editData ? 'Update' : 'Simpan'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
