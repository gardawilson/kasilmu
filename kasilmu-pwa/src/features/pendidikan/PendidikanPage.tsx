import { useEffect, useState } from 'react'
import {
  Alert, Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle,
  FormControlLabel, Paper, Switch, Table, TableBody, TableCell,
  TableHead, TableRow, TextField, Typography,
} from '@mui/material'
import { Add, Delete, Edit, School } from '@mui/icons-material'
import { useForm } from 'react-hook-form'
import DeleteDialog from '../../components/ui/DeleteDialog'
import RowActions from '../../components/ui/RowActions'
import PageHeader from '../../components/ui/PageHeader'
import StatusChip from '../../components/ui/StatusChip'
import type { Jenjang, Tingkat } from '../../types'
import {
  useCreateJenjang, useCreateTingkat, useDeleteJenjang, useDeleteTingkat,
  useJenjang, useUpdateJenjang, useUpdateTingkat,
} from './usePendidikan'

type DeleteTarget = { type: 'jenjang' | 'tingkat'; id: number; nama: string }

export default function PendidikanPage() {
  const { data, isLoading } = useJenjang(true)
  const deleteJenjang = useDeleteJenjang()
  const deleteTingkat = useDeleteTingkat()
  const [jenjangForm, setJenjangForm] = useState<Jenjang | null | undefined>(undefined)
  const [tingkatForm, setTingkatForm] = useState<{ jenjangId: number; data?: Tingkat } | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<DeleteTarget | null>(null)
  const [deleteError, setDeleteError] = useState('')

  const handleDelete = async () => {
    if (!deleteTarget) return
    setDeleteError('')

    try {
      if (deleteTarget.type === 'jenjang') await deleteJenjang.mutateAsync(deleteTarget.id)
      else await deleteTingkat.mutateAsync(deleteTarget.id)
      setDeleteTarget(null)
    } catch (error: unknown) {
      setDeleteError((error as any)?.response?.data?.message || 'Data gagal dihapus')
      setDeleteTarget(null)
    }
  }

  return (
    <Box>
      <PageHeader
        title="Jenjang & Tingkat"
        subtitle="Kelola pilihan pendidikan yang digunakan pada data siswa"
        action={
          <Button variant="contained" startIcon={<Add />} onClick={() => setJenjangForm(null)}>
            Tambah Jenjang
          </Button>
        }
      />

      {deleteError && <Alert severity="error" sx={{ mb: 2 }}>{deleteError}</Alert>}

      {isLoading ? (
        <Typography color="text.secondary">Memuat master pendidikan...</Typography>
      ) : !data?.data?.length ? (
        <Paper sx={{ py: 8, textAlign: 'center' }}>
          <School sx={{ fontSize: 42, color: '#cbd5e1', mb: 1 }} />
          <Typography color="text.secondary">Belum ada master jenjang</Typography>
        </Paper>
      ) : (
        <Box sx={{ display: 'grid', gap: 2 }}>
          {data.data.map((jenjang) => (
            <Paper key={jenjang.id} sx={{ overflow: 'hidden', border: '0.3px solid #b9b9b9', borderRadius: '14px' }}>
              <Box sx={{
                px: 2, py: 1.5, display: 'flex', alignItems: 'center', gap: 1.5,
                bgcolor: '#fcfdfd', borderBottom: '0.6px solid #d5d5d5',
              }}>
                <Chip label={jenjang.kode} color="primary" size="small" sx={{ fontWeight: 700 }} />
                <Box sx={{ flex: 1 }}>
                  <Typography sx={{ fontWeight: 700 }}>{jenjang.nama}</Typography>
                  <Typography variant="caption" color="text.secondary">Urutan {jenjang.urutan}</Typography>
                </Box>
                <StatusChip
                  label={jenjang.is_active ? 'Aktif' : 'Nonaktif'}
                  tone={jenjang.is_active ? 'green' : 'orange'}
                />
                <Button
                  size="small"
                  startIcon={<Add />}
                  onClick={() => setTingkatForm({ jenjangId: jenjang.id })}
                >
                  Tambah Tingkat
                </Button>
                <RowActions
                  actions={[
                    { icon: <Edit />, tooltip: 'Edit jenjang', onClick: () => setJenjangForm(jenjang) },
                    {
                      icon: <Delete />,
                      tooltip: 'Hapus jenjang',
                      tone: 'error',
                      onClick: () => setDeleteTarget({ type: 'jenjang', id: jenjang.id, nama: jenjang.nama }),
                    },
                  ]}
                />
              </Box>

              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Nama Tingkat</TableCell>
                    <TableCell>Urutan</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell align="right">Aksi</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {!jenjang.tingkats?.length ? (
                    <TableRow>
                      <TableCell colSpan={4} align="center" sx={{ color: '#94a3b8', py: 3 }}>
                        Belum ada tingkat
                      </TableCell>
                    </TableRow>
                  ) : jenjang.tingkats.map((tingkat) => (
                    <TableRow key={tingkat.id}>
                      <TableCell sx={{ fontWeight: 600 }}>{tingkat.nama}</TableCell>
                      <TableCell>{tingkat.urutan}</TableCell>
                      <TableCell>
                        <StatusChip
                          label={tingkat.is_active ? 'Aktif' : 'Nonaktif'}
                          tone={tingkat.is_active ? 'green' : 'orange'}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <RowActions
                          actions={[
                            {
                              icon: <Edit />,
                              tooltip: 'Edit tingkat',
                              onClick: () => setTingkatForm({ jenjangId: jenjang.id, data: tingkat }),
                            },
                            {
                              icon: <Delete />,
                              tooltip: 'Hapus tingkat',
                              tone: 'error',
                              onClick: () => setDeleteTarget({ type: 'tingkat', id: tingkat.id, nama: tingkat.nama }),
                            },
                          ]}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          ))}
        </Box>
      )}

      {jenjangForm !== undefined && (
        <JenjangForm
          open
          editData={jenjangForm}
          onClose={() => setJenjangForm(undefined)}
        />
      )}

      {!!tingkatForm && (
        <TingkatForm
          open
          jenjangId={tingkatForm.jenjangId}
          editData={tingkatForm.data}
          jenjangs={data?.data ?? []}
          onClose={() => setTingkatForm(null)}
        />
      )}

      <DeleteDialog
        open={!!deleteTarget}
        title={`Hapus ${deleteTarget?.type === 'jenjang' ? 'Jenjang' : 'Tingkat'}`}
        description={`"${deleteTarget?.nama ?? ''}" akan dihapus. Data yang masih dipakai siswa tidak dapat dihapus.`}
        loading={deleteJenjang.isPending || deleteTingkat.isPending}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
      />
    </Box>
  )
}

function JenjangForm({ open, onClose, editData }: {
  open: boolean
  onClose: () => void
  editData: Jenjang | null
}) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Partial<Jenjang>>()
  const create = useCreateJenjang()
  const update = useUpdateJenjang(editData?.id ?? 0)
  const [submitError, setSubmitError] = useState('')

  useEffect(() => {
    reset(editData ?? { kode: '', nama: '', urutan: 0, is_active: true })
  }, [editData, reset])

  const onSubmit = async (form: Partial<Jenjang>) => {
    setSubmitError('')
    try {
      if (editData) await update.mutateAsync(form)
      else await create.mutateAsync(form)
      onClose()
    } catch (error: unknown) {
      setSubmitError((error as any)?.response?.data?.message || 'Jenjang gagal disimpan')
    }
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{editData ? 'Edit Jenjang' : 'Tambah Jenjang'}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          {submitError && <Alert severity="error" sx={{ mb: 2 }}>{submitError}</Alert>}
          <TextField
            label="Kode"
            fullWidth
            margin="dense"
            required
            placeholder="Contoh: SD"
            {...register('kode', { required: 'Kode wajib diisi' })}
            error={!!errors.kode}
            helperText={errors.kode?.message}
          />
          <TextField
            label="Nama Jenjang"
            fullWidth
            margin="dense"
            required
            {...register('nama', { required: 'Nama wajib diisi' })}
            error={!!errors.nama}
            helperText={errors.nama?.message}
          />
          <TextField
            label="Urutan"
            type="number"
            fullWidth
            margin="dense"
            required
            {...register('urutan', { required: 'Urutan wajib diisi', min: 0, valueAsNumber: true })}
            error={!!errors.urutan}
            helperText={errors.urutan?.message}
          />
          <FormControlLabel
            control={<Switch {...register('is_active')} defaultChecked={editData?.is_active ?? true} />}
            label="Aktif"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Batal</Button>
          <Button type="submit" variant="contained" disabled={create.isPending || update.isPending}>
            Simpan
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

function TingkatForm({ open, onClose, editData, jenjangId, jenjangs }: {
  open: boolean
  onClose: () => void
  editData?: Tingkat
  jenjangId: number
  jenjangs: Jenjang[]
}) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Partial<Tingkat>>()
  const create = useCreateTingkat()
  const update = useUpdateTingkat(editData?.id ?? 0)
  const [submitError, setSubmitError] = useState('')

  useEffect(() => {
    reset(editData ?? { jenjang_id: jenjangId, nama: '', urutan: 0, is_active: true })
  }, [editData, jenjangId, reset])

  const onSubmit = async (form: Partial<Tingkat>) => {
    setSubmitError('')
    try {
      if (editData) await update.mutateAsync(form)
      else await create.mutateAsync(form)
      onClose()
    } catch (error: unknown) {
      setSubmitError((error as any)?.response?.data?.message || 'Tingkat gagal disimpan')
    }
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{editData ? 'Edit Tingkat' : 'Tambah Tingkat'}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          {submitError && <Alert severity="error" sx={{ mb: 2 }}>{submitError}</Alert>}
          <TextField
            label="Jenjang"
            select
            fullWidth
            margin="dense"
            required
            slotProps={{ select: { native: true } }}
            {...register('jenjang_id', { required: true, valueAsNumber: true })}
          >
            {jenjangs.map((jenjang) => (
              <option key={jenjang.id} value={jenjang.id}>{jenjang.kode} — {jenjang.nama}</option>
            ))}
          </TextField>
          <TextField
            label="Nama Tingkat"
            fullWidth
            margin="dense"
            required
            placeholder="Contoh: Tingkat 1"
            {...register('nama', { required: 'Nama tingkat wajib diisi' })}
            error={!!errors.nama}
            helperText={errors.nama?.message}
          />
          <TextField
            label="Urutan"
            type="number"
            fullWidth
            margin="dense"
            required
            {...register('urutan', { required: 'Urutan wajib diisi', min: 0, valueAsNumber: true })}
            error={!!errors.urutan}
            helperText={errors.urutan?.message}
          />
          <FormControlLabel
            control={<Switch {...register('is_active')} defaultChecked={editData?.is_active ?? true} />}
            label="Aktif"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Batal</Button>
          <Button type="submit" variant="contained" disabled={create.isPending || update.isPending}>
            Simpan
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
