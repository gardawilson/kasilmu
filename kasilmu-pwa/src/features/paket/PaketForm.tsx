import { useEffect } from 'react'
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { useCreatePaket, useUpdatePaket } from './usePaket'
import type { Paket } from '../../types'

interface Props {
  open: boolean
  onClose: () => void
  editData?: Paket | null
}

export default function PaketForm({ open, onClose, editData }: Props) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Partial<Paket>>()
  const create = useCreatePaket()
  const update = useUpdatePaket(editData?.id || 0)

  useEffect(() => {
    if (open) {
      reset(editData ?? { nama: '', jumlah_pertemuan: 12, deskripsi: '' })
    }
  }, [open, editData, reset])

  const onSubmit = async (data: Partial<Paket>) => {
    try {
      if (editData) await update.mutateAsync(data)
      else await create.mutateAsync(data)
      onClose()
    } catch { /* handled */ }
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{editData ? 'Edit Paket' : 'Tambah Paket'}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <TextField label="Nama Paket" fullWidth margin="dense" required
            {...register('nama', { required: 'Nama paket wajib diisi' })}
            error={!!errors.nama} helperText={errors.nama?.message} />
          <TextField label="Jumlah Pertemuan" fullWidth margin="dense" required type="number"
            {...register('jumlah_pertemuan', { required: 'Jumlah pertemuan wajib diisi', min: { value: 1, message: 'Minimal 1' }, valueAsNumber: true })}
            error={!!errors.jumlah_pertemuan} helperText={errors.jumlah_pertemuan?.message} />
          <TextField label="Deskripsi" fullWidth margin="dense" multiline rows={2}
            {...register('deskripsi')} />
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
