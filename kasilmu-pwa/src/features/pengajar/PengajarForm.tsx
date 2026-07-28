import { useEffect, useState } from 'react'
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Alert,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { useCreatePengajar, useUpdatePengajar } from './usePengajar'
import type { Pengajar } from '../../types'

interface Props {
  open: boolean
  onClose: () => void
  editData?: Pengajar | null
}

type PengajarFormData = Partial<Pengajar> & { username?: string }

export default function PengajarForm({ open, onClose, editData }: Props) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<PengajarFormData>()
  const create = useCreatePengajar()
  const update = useUpdatePengajar(editData?.id || 0)
  const [submitError, setSubmitError] = useState('')

  useEffect(() => {
    if (open) {
      setSubmitError('')
      reset(editData ? { ...editData, username: editData.user?.username ?? '' } : {
        nama: '', username: '', email: '', no_telp: '',
        bidang_ajar: '', tarif_per_pertemuan: 0,
        pendidikan_terakhir: '',
      })
    }
  }, [open, editData, reset])

  const onSubmit = async (data: PengajarFormData) => {
    setSubmitError('')
    try {
      if (editData) await update.mutateAsync(data)
      else await create.mutateAsync(data)
      onClose()
    } catch (err: unknown) {
      const msg = (err as any)?.response?.data?.message || 'Gagal menyimpan data pengajar'
      setSubmitError(msg)
    }
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{editData ? 'Edit Pengajar' : 'Tambah Pengajar'}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          {submitError && <Alert severity="error" sx={{ mb: 2 }}>{submitError}</Alert>}
          {editData && (
            <TextField label="NIP" fullWidth margin="dense" value={editData.nip} disabled />
          )}
          <TextField label="Nama Lengkap" fullWidth margin="dense" required
            {...register('nama', { required: 'Nama wajib diisi' })}
            error={!!errors.nama} helperText={errors.nama?.message} />
          <TextField label="Username (untuk login)" fullWidth margin="dense" required
            {...register('username', { required: 'Username wajib diisi' })}
            error={!!errors.username} helperText={errors.username?.message} />
          <TextField label="Email" type="email" fullWidth margin="dense" required
            {...register('email', { required: 'Email wajib diisi' })}
            error={!!errors.email} helperText={errors.email?.message} />
          {!editData && (
            <Alert severity="info" sx={{ mt: 1, mb: 1 }}>
              Password akun otomatis "Kasilmu1234".
            </Alert>
          )}
          <TextField label="No. Telepon" fullWidth margin="dense"
            {...register('no_telp')} />
          <TextField label="Bidang Ajar" fullWidth margin="dense" required
            {...register('bidang_ajar', { required: 'Bidang ajar wajib diisi' })}
            error={!!errors.bidang_ajar} helperText={errors.bidang_ajar?.message} />
          <TextField label="Tarif Per Pertemuan (Rp)" fullWidth margin="dense" required
            type="number"
            {...register('tarif_per_pertemuan', {
              required: 'Tarif wajib diisi',
              min: { value: 0, message: 'Minimal 0' },
            })}
            error={!!errors.tarif_per_pertemuan}
            helperText={errors.tarif_per_pertemuan?.message} />
          <TextField label="Pendidikan Terakhir" fullWidth margin="dense"
            {...register('pendidikan_terakhir')} />
          <TextField label="Aktif" fullWidth margin="dense" select
            {...register('is_active' as any)} defaultValue="1">
            <option value="1">Aktif</option>
            <option value="0">Nonaktif</option>
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
