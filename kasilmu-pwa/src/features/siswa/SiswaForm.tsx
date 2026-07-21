import { useEffect, useState } from 'react'
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button,
  TextField, MenuItem, Alert,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { useCreateSiswa, useUpdateSiswa } from './useSiswa'
import { useKelas } from '../kelas/useKelas'
import type { Siswa } from '../../types'

interface Props {
  open: boolean
  onClose: () => void
  editData?: Siswa | null
}

type SiswaFormData = Partial<Siswa> & { kelas_id?: number }

const TINGKAT_BY_JENJANG: Record<'SD' | 'SMP' | 'SMA', number[]> = {
  SD: [1, 2, 3, 4, 5, 6],
  SMP: [7, 8, 9],
  SMA: [10, 11, 12],
}

export default function SiswaForm({ open, onClose, editData }: Props) {
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<SiswaFormData>()
  const create = useCreateSiswa()
  const update = useUpdateSiswa(editData?.id || 0)
  const [submitError, setSubmitError] = useState('')

  const selectedJenjang = watch('jenjang')
  const selectedKelasId = watch('kelas_id')

  const { data: kelasList } = useKelas({ status: 'aktif', per_page: 100 })
  const selectedKelas = kelasList?.data?.find((k) => k.id === Number(selectedKelasId))

  useEffect(() => {
    if (open) {
      setSubmitError('')
      if (editData) {
        reset(editData)
      } else {
        reset({
          status: 'aktif',
          nis: '',
          nama: '',
          email: '',
          no_telp: '',
          tgl_lahir: '',
          alamat: '',
          sekolah: '',
          kelas_asal: '',
          jenjang: undefined,
          tingkat: undefined,
          nama_ortu: '',
          no_telp_ortu: '',
          kelas_id: undefined,
        })
      }
    }
  }, [open, editData, reset])

  const onSubmit = async (data: SiswaFormData) => {
    setSubmitError('')
    try {
      if (editData) {
        await update.mutateAsync(data)
      } else {
        await create.mutateAsync(data)
      }
      onClose()
    } catch (err: unknown) {
      const msg = (err as any)?.response?.data?.message || 'Gagal menyimpan data siswa'
      setSubmitError(msg)
    }
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{editData ? 'Edit Siswa' : 'Tambah Siswa'}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          {submitError && <Alert severity="error" sx={{ mb: 2 }}>{submitError}</Alert>}
          <TextField label="NIS" fullWidth margin="dense" required
            {...register('nis', { required: 'NIS wajib diisi' })}
            error={!!errors.nis} helperText={errors.nis?.message} />
          <TextField label="Nama Lengkap" fullWidth margin="dense" required
            {...register('nama', { required: 'Nama wajib diisi' })}
            error={!!errors.nama} helperText={errors.nama?.message} />
          <TextField label="Email" type="email" fullWidth margin="dense"
            {...register('email')} />
          <TextField label="No. Telepon" fullWidth margin="dense"
            {...register('no_telp')} />
          <TextField label="Tanggal Lahir" type="date" fullWidth margin="dense" required
            slotProps={{ inputLabel: { shrink: true } }}
            {...register('tgl_lahir', { required: 'Tanggal lahir wajib diisi' })}
            error={!!errors.tgl_lahir} helperText={errors.tgl_lahir?.message} />
          <TextField label="Alamat" fullWidth margin="dense" multiline rows={2}
            {...register('alamat')} />
          <TextField label="Sekolah" fullWidth margin="dense"
            {...register('sekolah')} />
          <TextField label="Jenjang" fullWidth margin="dense" select required
            {...register('jenjang', { required: 'Jenjang wajib dipilih' })}
            error={!!errors.jenjang} helperText={errors.jenjang?.message}
            slotProps={{ select: { displayEmpty: true }, inputLabel: { shrink: true } }} defaultValue="">
            <MenuItem value="" disabled>-- Pilih Jenjang --</MenuItem>
            <MenuItem value="SD">SD</MenuItem>
            <MenuItem value="SMP">SMP</MenuItem>
            <MenuItem value="SMA">SMA</MenuItem>
          </TextField>
          <TextField label="Tingkat" fullWidth margin="dense" select required
            disabled={!selectedJenjang}
            {...register('tingkat', { required: 'Tingkat wajib dipilih', valueAsNumber: true })}
            error={!!errors.tingkat} helperText={errors.tingkat?.message}
            slotProps={{ select: { displayEmpty: true }, inputLabel: { shrink: true } }} defaultValue="">
            <MenuItem value="" disabled>-- Pilih Tingkat --</MenuItem>
            {(TINGKAT_BY_JENJANG[selectedJenjang as 'SD' | 'SMP' | 'SMA'] ?? []).map((t) => (
              <MenuItem key={t} value={t}>Tingkat {t}</MenuItem>
            ))}
          </TextField>
          <TextField label="Keterangan Tambahan (opsional, misal: 6A / Jurusan IPA)" fullWidth margin="dense"
            {...register('kelas_asal')} />
          <TextField label="Nama Orang Tua" fullWidth margin="dense"
            {...register('nama_ortu')} />
          <TextField label="No. Telepon Orang Tua" fullWidth margin="dense"
            {...register('no_telp_ortu')} />
          <TextField label="Status" fullWidth margin="dense" select
            {...register('status')} defaultValue="aktif">
            <MenuItem value="aktif">Aktif</MenuItem>
            <MenuItem value="nonaktif">Nonaktif</MenuItem>
            <MenuItem value="lulus">Lulus</MenuItem>
          </TextField>
          {!editData && (
            <TextField label="Pilih Kelas" fullWidth margin="dense" select required
              {...register('kelas_id', { required: 'Kelas wajib dipilih', valueAsNumber: true })}
              error={!!errors.kelas_id} helperText={errors.kelas_id?.message}
              slotProps={{ select: { displayEmpty: true }, inputLabel: { shrink: true } }} defaultValue="">
              <MenuItem value="" disabled>-- Pilih Kelas --</MenuItem>
              {kelasList?.data?.map((k) => {
                const penuh = (k.siswa_count ?? 0) >= k.kapasitas
                return (
                  <MenuItem key={k.id} value={k.id} disabled={penuh}>
                    {k.nama} — {k.mata_pelajaran} ({k.siswa_count ?? 0}/{k.kapasitas}{penuh ? ' - Penuh' : ''})
                  </MenuItem>
                )
              })}
            </TextField>
          )}
          {!editData && selectedKelas && (
            <Alert severity="info" sx={{ mt: 1 }}>
              Kelas "{selectedKelas.nama}" — <strong>{selectedKelas.mata_pelajaran}</strong> — Rp {Number(selectedKelas.harga).toLocaleString('id-ID')} — {selectedKelas.pertemuans_count ?? 0}x pertemuan
            </Alert>
          )}
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
