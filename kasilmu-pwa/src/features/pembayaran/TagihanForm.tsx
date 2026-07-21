import { useEffect } from 'react'
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { useCreateTagihan, useUpdateTagihan } from './usePembayaran'
import { useSiswa } from '../siswa/useSiswa'
import type { Tagihan } from '../../types'

interface Props {
  open: boolean
  onClose: () => void
  editData?: Tagihan | null
}

export default function TagihanForm({ open, onClose, editData }: Props) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Partial<Tagihan>>()
  const create = useCreateTagihan()
  const update = useUpdateTagihan(editData?.id || 0)
  const { data: siswa } = useSiswa({ per_page: 100 })

  useEffect(() => {
    if (open) {
      reset(editData ?? { siswa_id: 0, jenis: 'spp', jumlah: 0, tenggat: '' })
    }
  }, [open, editData, reset])

  const onSubmit = async (data: Partial<Tagihan>) => {
    try {
      if (editData) await update.mutateAsync(data as any)
      else await create.mutateAsync(data as any)
      onClose()
    } catch { /* handled */ }
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{editData ? 'Edit Tagihan' : 'Buat Tagihan'}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <TextField label="Siswa" fullWidth margin="dense" select required
            {...register('siswa_id', { required: 'Siswa wajib dipilih' })}
            error={!!errors.siswa_id}
            slotProps={{ select: { displayEmpty: true } }}>
            <MenuItem value="" disabled>-- Pilih Siswa --</MenuItem>
            {siswa?.data?.map((s) => (
              <MenuItem key={s.id} value={s.id}>{s.nama} ({s.nis})</MenuItem>
            ))}
          </TextField>
          <TextField label="Jenis" fullWidth margin="dense" select required
            {...register('jenis', { required: 'Jenis wajib dipilih' })}
            error={!!errors.jenis}>
            <MenuItem value="daftar">Pendaftaran</MenuItem>
            <MenuItem value="spp">SPP</MenuItem>
          </TextField>
          {editData && (
            <TextField label="Status" fullWidth margin="dense" select
              {...register('status')}>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="lunas">Lunas</MenuItem>
              <MenuItem value="kadaluarsa">Kadaluarsa</MenuItem>
            </TextField>
          )}
          <TextField label="Jumlah (Rp)" fullWidth margin="dense" required type="number"
            {...register('jumlah', { required: 'Jumlah wajib diisi', min: { value: 0, message: 'Minimal 0' } })}
            error={!!errors.jumlah} helperText={errors.jumlah?.message} />
          <TextField label="Tenggat" type="date" fullWidth margin="dense"
            {...register('tenggat')}
            slotProps={{ inputLabel: { shrink: true } }} />
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
