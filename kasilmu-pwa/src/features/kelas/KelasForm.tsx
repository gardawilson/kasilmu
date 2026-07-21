import { useEffect } from 'react'
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { useCreateKelas, useUpdateKelas } from './useKelas'
import { usePengajar } from '../pengajar/usePengajar'
import type { Kelas } from '../../types'

interface Props {
  open: boolean
  onClose: () => void
  editData?: Kelas | null
}

export default function KelasForm({ open, onClose, editData }: Props) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Partial<Kelas>>()
  const create = useCreateKelas()
  const update = useUpdateKelas(editData?.id || 0)
  const { data: pengajars } = usePengajar({ per_page: 100 })

  useEffect(() => {
    if (open) {
      reset(editData ?? {
        nama: '', mata_pelajaran: '', deskripsi: '', durasi_bulan: 1, tutor_id: 0,
        harga: 0, kapasitas: 20, ruang: '', status: 'aktif',
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
      <DialogTitle>{editData ? 'Edit Kelas' : 'Tambah Kelas'}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <TextField label="Nama Kelas" fullWidth margin="dense" required
            {...register('nama', { required: 'Nama kelas wajib diisi' })}
            error={!!errors.nama} helperText={errors.nama?.message} />
          <TextField label="Mata Pelajaran" fullWidth margin="dense" required
            {...register('mata_pelajaran', { required: 'Mata pelajaran wajib diisi' })}
            error={!!errors.mata_pelajaran} helperText={errors.mata_pelajaran?.message} />
          <TextField label="Deskripsi" fullWidth margin="dense" multiline rows={3}
            {...register('deskripsi')} />
          <TextField label="Durasi (Bulan)" fullWidth margin="dense" required
            type="number"
            {...register('durasi_bulan', { required: 'Durasi wajib diisi', min: { value: 1, message: 'Minimal 1 bulan' } })}
            error={!!errors.durasi_bulan} helperText={errors.durasi_bulan?.message} />
          <TextField label="Pengajar" fullWidth margin="dense" select required
            {...register('tutor_id', { required: 'Pengajar wajib dipilih' })}
            error={!!errors.tutor_id}
            slotProps={{ select: { displayEmpty: true } }}>
            <MenuItem value="" disabled>-- Pilih Pengajar --</MenuItem>
            {pengajars?.data?.map((p) => (
              <MenuItem key={p.id} value={p.id}>{p.nama}</MenuItem>
            ))}
          </TextField>
          <TextField label="Harga (Rp)" fullWidth margin="dense" required type="number"
            {...register('harga', { required: 'Harga wajib diisi', min: { value: 0, message: 'Minimal Rp 0' } })}
            error={!!errors.harga} helperText={errors.harga?.message} />
          <TextField label="Kapasitas" fullWidth margin="dense" required type="number"
            {...register('kapasitas', { required: 'Kapasitas wajib diisi', min: { value: 1, message: 'Minimal 1' } })}
            error={!!errors.kapasitas} helperText={errors.kapasitas?.message} />
          <TextField label="Ruang" fullWidth margin="dense"
            {...register('ruang')} />
          <TextField label="Status" fullWidth margin="dense" select
            {...register('status')} defaultValue="aktif">
            <MenuItem value="aktif">Aktif</MenuItem>
            <MenuItem value="selesai">Selesai</MenuItem>
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
