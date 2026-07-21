import { useEffect } from 'react'
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { useCreatePembayaran } from './usePembayaran'
import type { Pembayaran } from '../../types'

interface Props {
  open: boolean
  onClose: () => void
  tagihanId: number | null
}

export default function PembayaranForm({ open, onClose, tagihanId }: Props) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Partial<Pembayaran>>()
  const create = useCreatePembayaran()

  useEffect(() => {
    if (open) {
      reset({
        tagihan_id: tagihanId ?? 0,
        jumlah: 0,
        metode: 'tunai',
        tgl_bayar: new Date().toISOString().split('T')[0],
        keterangan: '',
      })
    }
  }, [open, tagihanId, reset])

  const onSubmit = async (data: Partial<Pembayaran>) => {
    try {
      await create.mutateAsync(data as any)
      onClose()
    } catch { /* handled */ }
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Catat Pembayaran</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <TextField label="Jumlah (Rp)" fullWidth margin="dense" required type="number"
            {...register('jumlah', { required: 'Jumlah wajib diisi', min: { value: 0, message: 'Minimal 0' } })}
            error={!!errors.jumlah} helperText={errors.jumlah?.message} />
          <TextField label="Metode" fullWidth margin="dense" select required
            {...register('metode', { required: 'Metode wajib dipilih' })}
            error={!!errors.metode}>
            <MenuItem value="tunai">Tunai</MenuItem>
            <MenuItem value="transfer">Transfer</MenuItem>
          </TextField>
          <TextField label="Tanggal Bayar" type="date" fullWidth margin="dense" required
            {...register('tgl_bayar', { required: 'Tanggal bayar wajib diisi' })}
            error={!!errors.tgl_bayar}
            slotProps={{ inputLabel: { shrink: true } }} />
          <TextField label="Keterangan" fullWidth margin="dense" multiline rows={2}
            {...register('keterangan')} />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Batal</Button>
          <Button type="submit" variant="contained" disabled={create.isPending}>
            Simpan
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
