import { useEffect, useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Alert } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useCreateSekolah, useUpdateSekolah } from './useSekolah'
import type { Sekolah } from '../../types'

interface Props {
  open: boolean
  onClose: () => void
  editData?: Sekolah | null
}

export default function SekolahForm({ open, onClose, editData }: Props) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<{ nama: string }>()
  const create = useCreateSekolah()
  const update = useUpdateSekolah(editData?.id || 0)
  const [submitError, setSubmitError] = useState('')

  useEffect(() => {
    if (open) {
      setSubmitError('')
      reset({ nama: editData?.nama || '' })
    }
  }, [open, editData, reset])

  const onSubmit = async (data: { nama: string }) => {
    setSubmitError('')
    try {
      if (editData) {
        await update.mutateAsync(data.nama)
      } else {
        await create.mutateAsync(data.nama)
      }
      onClose()
    } catch (err: unknown) {
      const msg = (err as any)?.response?.data?.message || 'Gagal menyimpan data sekolah'
      setSubmitError(msg)
    }
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>{editData ? 'Edit Sekolah' : 'Tambah Sekolah'}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          {submitError && <Alert severity="error" sx={{ mb: 2 }}>{submitError}</Alert>}
          <TextField label="Nama Sekolah" fullWidth margin="dense" required autoFocus
            {...register('nama', { required: 'Nama sekolah wajib diisi' })}
            error={!!errors.nama} helperText={errors.nama?.message} />
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
