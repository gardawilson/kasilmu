import { useEffect } from 'react'
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { useCreateNilai, useUpdateNilai } from './useNilai'
import { useSiswa } from '../siswa/useSiswa'
import { useKelas } from '../kelas/useKelas'
import type { Nilai } from '../../types'

interface Props {
  open: boolean
  onClose: () => void
  editData?: Nilai | null
}

export default function NilaiForm({ open, onClose, editData }: Props) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Partial<Nilai>>()
  const create = useCreateNilai()
  const update = useUpdateNilai(editData?.id || 0)
  const { data: siswa } = useSiswa({ per_page: 100 })
  const { data: kelas } = useKelas({ per_page: 100 })

  useEffect(() => {
    if (open) {
      reset(editData ?? { siswa_id: 0, kelas_id: 0, jenis_nilai: 'tugas', nilai: 0, keterangan: '' })
    }
  }, [open, editData, reset])

  const onSubmit = async (data: Partial<Nilai>) => {
    try {
      if (editData) await update.mutateAsync(data as any)
      else await create.mutateAsync(data as any)
      onClose()
    } catch { /* handled */ }
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{editData ? 'Edit Nilai' : 'Tambah Nilai'}</DialogTitle>
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
          <TextField label="Kelas" fullWidth margin="dense" select required
            {...register('kelas_id', { required: 'Kelas wajib dipilih' })}
            error={!!errors.kelas_id}
            slotProps={{ select: { displayEmpty: true } }}>
            <MenuItem value="" disabled>-- Pilih Kelas --</MenuItem>
            {kelas?.data?.map((k) => (
              <MenuItem key={k.id} value={k.id}>{k.nama}</MenuItem>
            ))}
          </TextField>
          <TextField label="Jenis Nilai" fullWidth margin="dense" select required
            {...register('jenis_nilai', { required: 'Jenis nilai wajib dipilih' })}
            error={!!errors.jenis_nilai}>
            <MenuItem value="tugas">Tugas</MenuItem>
            <MenuItem value="uts">UTS</MenuItem>
            <MenuItem value="uas">UAS</MenuItem>
          </TextField>
          <TextField label="Nilai" fullWidth margin="dense" required type="number"
            {...register('nilai', {
              required: 'Nilai wajib diisi',
              min: { value: 0, message: 'Minimal 0' },
              max: { value: 100, message: 'Maksimal 100' },
            })}
            error={!!errors.nilai} helperText={errors.nilai?.message}
            slotProps={{ htmlInput: { step: 0.01 } }} />
          <TextField label="Keterangan" fullWidth margin="dense" multiline rows={2}
            {...register('keterangan')} />
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
