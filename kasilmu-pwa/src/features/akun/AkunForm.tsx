import { useEffect, useState } from 'react'
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button,
  TextField, MenuItem, Alert,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { useQueryClient } from '@tanstack/react-query'
import { useCreateAkun, useUpdateAkun } from './useAkun'
import { useCreatePengajar } from '../pengajar/usePengajar'
import type { User } from '../../types'

interface Props {
  open: boolean
  onClose: () => void
  editData?: User | null
}

const ROLE_OPTIONS = [
  { value: 'admin', label: 'Admin' },
  { value: 'tutor', label: 'Pengajar' },
  { value: 'siswa', label: 'Siswa' },
  { value: 'orang_tua', label: 'Orang Tua' },
]

type FormData = {
  role: string
  name?: string
  username?: string
  email?: string
  no_telp?: string
  bidang_ajar?: string
  pendidikan_terakhir?: string
}

export default function AkunForm({ open, onClose, editData }: Props) {
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<FormData>()
  const createAkun = useCreateAkun()
  const updateAkun = useUpdateAkun(editData?.id || 0)
  const createPengajar = useCreatePengajar()
  const qc = useQueryClient()
  const [submitError, setSubmitError] = useState('')

  const selectedRole = watch('role')

  useEffect(() => {
    if (open) {
      setSubmitError('')
      if (editData) {
        reset({
          role: editData.roles?.[0]?.name ?? '',
          name: editData.name, username: editData.username, email: editData.email, no_telp: editData.no_telp ?? '',
        })
      } else {
        reset({ role: '', name: '', username: '', email: '', no_telp: '' })
      }
    }
  }, [open, editData, reset])

  const isPending = createAkun.isPending || updateAkun.isPending || createPengajar.isPending

  const onSubmit = async (data: FormData) => {
    setSubmitError('')
    try {
      if (editData) {
        await updateAkun.mutateAsync({
          name: data.name!, username: data.username!, email: data.email!, no_telp: data.no_telp,
        })
      } else if (data.role === 'tutor') {
        await createPengajar.mutateAsync({
          nama: data.name, username: data.username, email: data.email,
          no_telp: data.no_telp, bidang_ajar: data.bidang_ajar,
          pendidikan_terakhir: data.pendidikan_terakhir,
        } as any)
        qc.invalidateQueries({ queryKey: ['user'] })
      } else {
        await createAkun.mutateAsync({
          name: data.name!, username: data.username!, email: data.email!,
          no_telp: data.no_telp, role: data.role,
        })
      }
      onClose()
    } catch (err: unknown) {
      const msg = (err as any)?.response?.data?.message || 'Gagal menyimpan akun'
      setSubmitError(msg)
    }
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{editData ? 'Edit Akun' : 'Tambah Akun'}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          {submitError && <Alert severity="error" sx={{ mb: 2 }}>{submitError}</Alert>}
          <TextField label="Role" fullWidth margin="dense" select required
            disabled={!!editData}
            {...register('role', { required: 'Role wajib dipilih' })}
            error={!!errors.role} helperText={errors.role?.message}
            slotProps={{ select: { displayEmpty: true } }} defaultValue="">
            <MenuItem value="" disabled>-- Pilih Role --</MenuItem>
            {ROLE_OPTIONS.map((r) => (
              <MenuItem key={r.value} value={r.value}>{r.label}</MenuItem>
            ))}
          </TextField>

          <TextField label="Nama Lengkap" fullWidth margin="dense" required
            {...register('name', { required: 'Nama wajib diisi' })}
            error={!!errors.name} helperText={errors.name?.message} />
          <TextField label="Username (untuk login)" fullWidth margin="dense" required
            {...register('username', { required: 'Username wajib diisi' })}
            error={!!errors.username} helperText={errors.username?.message} />
          <TextField label="Email"
            type="email" fullWidth margin="dense" required
            {...register('email', { required: 'Email wajib diisi' })}
            error={!!errors.email} helperText={errors.email?.message} />
          {!editData && (
            <Alert severity="info" sx={{ mt: 1, mb: 1 }}>
              Password akun otomatis "Kasilmu1234".
            </Alert>
          )}
          <TextField label="No. Telepon" fullWidth margin="dense"
            {...register('no_telp')} />

          {selectedRole === 'tutor' && !editData && (
            <>
              <TextField label="Bidang Ajar" fullWidth margin="dense" required
                {...register('bidang_ajar', { required: 'Bidang ajar wajib diisi' })}
                error={!!errors.bidang_ajar} helperText={errors.bidang_ajar?.message} />
              <TextField label="Pendidikan Terakhir" fullWidth margin="dense"
                {...register('pendidikan_terakhir')} />
            </>
          )}

          {selectedRole === 'siswa' && !editData && (
            <Alert severity="info" sx={{ mt: 1 }}>
              Ini hanya membuat akun login. Untuk data siswa lengkap (kelas, paket, dll), lanjutkan pendaftaran lewat menu Siswa.
            </Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Batal</Button>
          <Button type="submit" variant="contained" disabled={isPending}>
            {editData ? 'Update' : 'Simpan'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
