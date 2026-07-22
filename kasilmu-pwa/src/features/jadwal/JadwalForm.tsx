import { useEffect } from 'react'
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { useCreateJadwal, useUpdateJadwal } from './useJadwal'
import { useKelas } from '../kelas/useKelas'
import { useAuth } from '../auth/useAuth'
import type { Jadwal } from '../../types'

const HARI = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu']

interface Props {
  open: boolean
  onClose: () => void
  editData?: Jadwal | null
}

export default function JadwalForm({ open, onClose, editData }: Props) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Partial<Jadwal>>()
  const create = useCreateJadwal()
  const update = useUpdateJadwal(editData?.id || 0)
  const { user } = useAuth()
  const { data: kelas } = useKelas({ per_page: 100 })
  const isTutor = user?.roles?.some((r) => r.name === 'tutor')
  const kelasList = isTutor ? kelas?.data?.filter((k) => k.tutor_id === user?.tutor?.id) : kelas?.data

  useEffect(() => {
    if (open) {
      reset(editData ?? {
        kelas_id: 0, hari: 'Senin', jam_mulai: '08:00',
        jam_selesai: '10:00', ruang: '',
      })
    }
  }, [open, editData, reset])

  const onSubmit = async (data: Partial<Jadwal>) => {
    try {
      if (editData) await update.mutateAsync(data as any)
      else await create.mutateAsync(data as any)
      onClose()
    } catch { /* handled */ }
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{editData ? 'Edit Jadwal' : 'Tambah Jadwal'}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <TextField label="Kelas" fullWidth margin="dense" select required
            {...register('kelas_id', { required: 'Kelas wajib dipilih' })}
            error={!!errors.kelas_id}
            slotProps={{ select: { displayEmpty: true } }}>
            <MenuItem value="" disabled>-- Pilih Kelas --</MenuItem>
            {kelasList?.map((k) => (
              <MenuItem key={k.id} value={k.id}>{k.nama}</MenuItem>
            ))}
          </TextField>
          <TextField label="Hari" fullWidth margin="dense" select required
            {...register('hari', { required: 'Hari wajib diisi' })}
            error={!!errors.hari}>
            {HARI.map((h) => (
              <MenuItem key={h} value={h}>{h}</MenuItem>
            ))}
          </TextField>
          <TextField label="Jam Mulai" type="time" fullWidth margin="dense" required
            {...register('jam_mulai', { required: 'Jam mulai wajib diisi' })}
            error={!!errors.jam_mulai}
            slotProps={{ inputLabel: { shrink: true } }} />
          <TextField label="Jam Selesai" type="time" fullWidth margin="dense" required
            {...register('jam_selesai', { required: 'Jam selesai wajib diisi' })}
            error={!!errors.jam_selesai}
            slotProps={{ inputLabel: { shrink: true } }} />
          <TextField label="Ruang" fullWidth margin="dense"
            {...register('ruang')} />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Batal</Button>
          <Button type="submit" variant="contained" disabled={create.isPending || update.isPending}>
            {editData ? 'Update' : 'Simpan'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
