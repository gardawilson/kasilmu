import { useEffect, useState } from 'react'
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button,
  TextField, MenuItem, Alert, Autocomplete,
} from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { useCreateSiswa, useUpdateSiswa } from './useSiswa'
import { useKelas } from '../kelas/useKelas'
import { useSekolah, useCreateSekolah } from '../sekolah/useSekolah'
import { usePaketList, useHargaPaket } from '../paket/usePaket'
import { useJenjang } from '../pendidikan/usePendidikan'
import type { Siswa } from '../../types'

interface Props {
  open: boolean
  onClose: () => void
  editData?: Siswa | null
}

type SiswaFormData = Partial<Siswa> & {
  jenjang_id?: number
  kelas_id?: number
  paket_id?: number
  tgl_mulai_paket?: string
}

function todayLocal() {
  const now = new Date()
  const pad = (value: number) => String(value).padStart(2, '0')
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`
}

function addMonthNoOverflow(value?: string) {
  if (!value) return ''
  const [year, month, day] = value.split('-').map(Number)
  const lastDayTargetMonth = new Date(year, month + 1, 0).getDate()
  const result = new Date(year, month, Math.min(day, lastDayTargetMonth))
  const pad = (part: number) => String(part).padStart(2, '0')
  return `${result.getFullYear()}-${pad(result.getMonth() + 1)}-${pad(result.getDate())}`
}

function formatDate(value: string) {
  return new Date(`${value}T00:00:00`).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default function SiswaForm({ open, onClose, editData }: Props) {
  const { control, register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<SiswaFormData>()
  const create = useCreateSiswa()
  const update = useUpdateSiswa(editData?.id || 0)
  const createSekolah = useCreateSekolah()
  const [submitError, setSubmitError] = useState('')
  const [sekolahNama, setSekolahNama] = useState('')

  const selectedJenjangId = watch('jenjang_id')
  const selectedTingkatId = watch('tingkat_id')
  const selectedKelasId = watch('kelas_id')
  const selectedPaketId = watch('paket_id')
  const selectedTanggalMulai = watch('tgl_mulai_paket')

  const { data: kelasList } = useKelas({ status: editData ? undefined : 'aktif', per_page: 100 })
  const { data: jenjangList } = useJenjang(!!editData)
  const { data: sekolahList } = useSekolah()
  const { data: paketList } = usePaketList({ per_page: 100 })
  const { data: hargaPaketList } = useHargaPaket(Number(selectedKelasId) || 0)
  const selectedKelas = kelasList?.data?.find((k) => k.id === Number(selectedKelasId))
  const selectedHargaPaket = hargaPaketList?.data?.find((h) => h.paket_id === Number(selectedPaketId))
  const selectedJenjang = jenjangList?.data?.find((j) => j.id === Number(selectedJenjangId))
  const editPaketAktif = editData?.siswa_pakets?.[0]
  const editKelasAktif = editData?.kelas?.find((kelas) => kelas.id === editPaketAktif?.kelas_id)
    ?? editData?.kelas?.[0]
  const selectedTanggalSelesai = editData
    ? editPaketAktif?.tgl_selesai
    : addMonthNoOverflow(selectedTanggalMulai)

  useEffect(() => {
    if (open) {
      setSubmitError('')
      if (editData) {
        reset({
          ...editData,
          jenjang_id: editData.tingkat?.jenjang_id,
          kelas_id: editPaketAktif?.kelas_id ?? editKelasAktif?.id,
          paket_id: editPaketAktif?.paket_id,
          tgl_mulai_paket: editPaketAktif?.tgl_mulai,
        })
        setSekolahNama(editData.sekolah?.nama || '')
      } else {
        reset({
          status: 'aktif',
          nama: '',
          email: '',
          no_telp: '',
          tgl_lahir: '',
          alamat: '',
          kelas_asal: '',
          jenjang_id: undefined,
          tingkat_id: undefined,
          nama_ortu: '',
          no_telp_ortu: '',
          kelas_id: undefined,
          tgl_mulai_paket: todayLocal(),
        })
        setSekolahNama('')
      }
    }
  }, [open, editData, editKelasAktif?.id, editPaketAktif, reset])

  useEffect(() => {
    if (!selectedJenjang || !selectedTingkatId) return

    const tersedia = selectedJenjang?.tingkats?.some((tingkat) => tingkat.id === Number(selectedTingkatId))
    if (!tersedia) setValue('tingkat_id', undefined)
  }, [selectedJenjang, selectedTingkatId, setValue])

  const onSubmit = async (data: SiswaFormData) => {
    setSubmitError('')
    try {
      const nama = sekolahNama.trim()
      if (nama) {
        const existing = sekolahList?.data?.find((s) => s.nama.toLowerCase() === nama.toLowerCase())
        data.sekolah_id = existing ? existing.id : (await createSekolah.mutateAsync(nama)).data.data.id
      } else {
        data.sekolah_id = null
      }

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
          {editData && (
            <TextField label="NIS" fullWidth margin="dense" value={editData.nis} disabled />
          )}
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
          <Autocomplete
            freeSolo
            options={sekolahList?.data?.map((s) => s.nama) ?? []}
            inputValue={sekolahNama}
            onInputChange={(_, value) => setSekolahNama(value)}
            renderInput={(params) => (
              <TextField {...params} label="Sekolah" fullWidth margin="dense"
                helperText="Pilih dari daftar atau ketik nama sekolah baru" />
            )}
          />
          <Controller
            name="jenjang_id"
            control={control}
            rules={{ required: 'Jenjang wajib dipilih' }}
            render={({ field }) => (
              <TextField label="Jenjang" fullWidth margin="dense" select required
                {...field}
                value={field.value ?? ''}
                onChange={(event) => field.onChange(Number(event.target.value))}
                error={!!errors.jenjang_id} helperText={errors.jenjang_id?.message}
                slotProps={{ select: { displayEmpty: true }, inputLabel: { shrink: true } }}>
                <MenuItem value="" disabled>-- Pilih Jenjang --</MenuItem>
                {jenjangList?.data?.map((jenjang) => (
                  <MenuItem key={jenjang.id} value={jenjang.id}>
                    {jenjang.kode} — {jenjang.nama}{jenjang.is_active ? '' : ' (Nonaktif)'}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
          <Controller
            name="tingkat_id"
            control={control}
            rules={{ required: 'Tingkat wajib dipilih' }}
            render={({ field }) => (
              <TextField label="Tingkat" fullWidth margin="dense" select required
                {...field}
                value={field.value ?? ''}
                onChange={(event) => field.onChange(Number(event.target.value))}
                disabled={!selectedJenjangId}
                error={!!errors.tingkat_id} helperText={errors.tingkat_id?.message}
                slotProps={{ select: { displayEmpty: true }, inputLabel: { shrink: true } }}>
                <MenuItem value="" disabled>-- Pilih Tingkat --</MenuItem>
                {(selectedJenjang?.tingkats ?? []).map((tingkat) => (
                  <MenuItem key={tingkat.id} value={tingkat.id}>
                    {tingkat.nama}{tingkat.is_active ? '' : ' (Nonaktif)'}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
          <TextField label="Keterangan Tambahan (opsional, misal: 6A / Jurusan IPA)" fullWidth margin="dense"
            {...register('kelas_asal')} />
          <TextField label="Nama Orang Tua" fullWidth margin="dense"
            {...register('nama_ortu')} />
          <TextField label="No. Telepon Orang Tua" fullWidth margin="dense"
            {...register('no_telp_ortu')} />
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <TextField label="Status" fullWidth margin="dense" select
                {...field} value={field.value ?? 'aktif'}>
                <MenuItem value="aktif">Aktif</MenuItem>
                <MenuItem value="nonaktif">Nonaktif</MenuItem>
                <MenuItem value="lulus">Lulus</MenuItem>
              </TextField>
            )}
          />
          <Controller
            name="kelas_id"
            control={control}
            rules={editData ? undefined : { required: 'Kelas wajib dipilih' }}
            render={({ field }) => (
              <TextField label="Pilih Kelas" fullWidth margin="dense" select required={!editData}
                {...field}
                value={field.value ?? ''}
                onChange={(event) => field.onChange(Number(event.target.value))}
                disabled={!!editData}
                error={!!errors.kelas_id}
                helperText={editData
                  ? 'Kelas aktif ditampilkan sebagai informasi dan dikelola melalui menu Kelas → Atur Siswa'
                  : errors.kelas_id?.message}
                slotProps={{ select: { displayEmpty: true }, inputLabel: { shrink: true } }}>
                <MenuItem value="" disabled>-- Pilih Kelas --</MenuItem>
                {kelasList?.data?.map((k) => {
                  const penuh = (k.siswa_count ?? 0) >= k.kapasitas
                  return (
                    <MenuItem key={k.id} value={k.id} disabled={!editData && penuh}>
                      {k.nama} — {k.mata_pelajaran} ({k.siswa_count ?? 0}/{k.kapasitas}{penuh ? ' - Penuh' : ''})
                    </MenuItem>
                  )
                })}
              </TextField>
            )}
          />
          {selectedKelas && (
            <Alert severity="info" sx={{ mt: 1, mb: 1 }}>
              Kelas "{selectedKelas.nama}" — <strong>{selectedKelas.mata_pelajaran}</strong>
            </Alert>
          )}
          <Controller
            name="paket_id"
            control={control}
            rules={editData ? undefined : { required: 'Paket wajib dipilih' }}
            render={({ field }) => (
              <TextField label="Pilih Paket" fullWidth margin="dense" select required={!editData}
                {...field}
                value={field.value ?? ''}
                onChange={(event) => field.onChange(Number(event.target.value))}
                disabled={!!editData}
                error={!!errors.paket_id}
                helperText={editData
                  ? 'Paket aktif ditampilkan sebagai informasi agar tagihan dan riwayat kuota tidak berubah'
                  : errors.paket_id?.message}
                slotProps={{ select: { displayEmpty: true }, inputLabel: { shrink: true } }}>
                <MenuItem value="" disabled>-- Pilih Paket --</MenuItem>
                {paketList?.data?.map((p) => (
                  <MenuItem key={p.id} value={p.id}>{p.nama} ({p.jumlah_pertemuan}x pertemuan)</MenuItem>
                ))}
              </TextField>
            )}
          />
          <TextField label="Tanggal Mulai Paket" type="date" fullWidth margin="dense" required={!editData}
            disabled={!!editData}
            slotProps={{ inputLabel: { shrink: true } }}
            {...register('tgl_mulai_paket', editData ? {} : { required: 'Tanggal mulai paket wajib diisi' })}
            error={!!errors.tgl_mulai_paket}
            helperText={editData
              ? 'Tanggal periode paket aktif'
              : errors.tgl_mulai_paket?.message || 'Isi sesuai tanggal siswa mulai mengambil paket, bukan tanggal input data'} />
          {selectedTanggalMulai && selectedTanggalSelesai && (
            <Alert severity="info" sx={{ mt: 1 }}>
              {editData ? 'Periode paket aktif' : 'Periode paket'}: <strong>{formatDate(selectedTanggalMulai)}</strong>
              {' sampai '}
              <strong>{formatDate(selectedTanggalSelesai)}</strong>.
              Presensi hadir dalam periode ini akan mengurangi kuota.
            </Alert>
          )}
          {!editData && selectedKelasId && selectedPaketId && (
            selectedHargaPaket ? (
              <Alert severity="success" sx={{ mt: 1 }}>
                Tagihan yang akan dibuat: <strong>Rp {Number(selectedHargaPaket.harga).toLocaleString('id-ID')}</strong>
              </Alert>
            ) : (
              <Alert severity="warning" sx={{ mt: 1 }}>
                Harga untuk kombinasi kelas dan paket ini belum diatur. Atur dulu lewat "Atur Paket" pada halaman Kelas.
              </Alert>
            )
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Batal</Button>
          <Button type="submit" variant="contained"
            disabled={create.isPending || update.isPending || (!editData && !!selectedPaketId && !selectedHargaPaket)}>
            {editData ? 'Update' : 'Simpan'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
