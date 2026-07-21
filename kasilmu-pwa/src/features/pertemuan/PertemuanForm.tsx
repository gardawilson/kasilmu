import { useEffect } from 'react'
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { useCreatePertemuan, useUpdatePertemuan } from './usePertemuan'
import { useKelas } from '../kelas/useKelas'
import type { Pertemuan } from '../../types'

interface Props {
  open: boolean
  onClose: () => void
  editData?: Pertemuan | null
}

export default function PertemuanForm({ open, onClose, editData }: Props) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Partial<Pertemuan>>()
  const create = useCreatePertemuan()
  const update = useUpdatePertemuan(editData?.id || 0)
  const { data: kelas } = useKelas({ per_page: 100 })

  useEffect(() => {
    if (open) {
      reset(editData ?? { kelas_id: 0, pertemuan_ke: 1, tgl: '', materi: '', status: 'terlaksana' })
    }
  }, [open, editData, reset])

  const onSubmit = async (data: Partial<Pertemuan>) => {
    try {
      if (editData) await update.mutateAsync(data as any)
      else await create.mutateAsync(data as any)
      onClose()
    } catch { /* handled */ }
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{editData ? 'Edit Pertemuan' : 'Tambah Pertemuan'}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <TextField label="Kelas" fullWidth margin="dense" select required
            {...register('kelas_id', { required: 'Kelas wajib dipilih' })}
            error={!!errors.kelas_id}
            slotProps={{ select: { displayEmpty: true } }}>
            <MenuItem value="" disabled>-- Pilih Kelas --</MenuItem>
            {kelas?.data?.map((k) => (
              <MenuItem key={k.id} value={k.id}>{k.nama}</MenuItem>
            ))}
          </TextField>
          <TextField label="Pertemuan Ke-" fullWidth margin="dense" required type="number"
            {...register('pertemuan_ke', { required: 'Nomor pertemuan wajib diisi', min: { value: 1, message: 'Minimal 1' } })}
            error={!!errors.pertemuan_ke} helperText={errors.pertemuan_ke?.message} />
          <TextField label="Tanggal" type="date" fullWidth margin="dense" required
            {...register('tgl', { required: 'Tanggal wajib diisi' })}
            error={!!errors.tgl}
            slotProps={{ inputLabel: { shrink: true } }} />
          <TextField label="Materi" fullWidth margin="dense" multiline rows={3}
            {...register('materi')} />
          <TextField label="Status" fullWidth margin="dense" select
            {...register('status')} defaultValue="terlaksana">
            <MenuItem value="terlaksana">Terlaksana</MenuItem>
            <MenuItem value="libur">Libur</MenuItem>
          </TextField>
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
