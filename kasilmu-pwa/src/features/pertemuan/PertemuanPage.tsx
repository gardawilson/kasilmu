import { useState } from 'react'
import {
  Box, Typography, Table, TableHead, TableRow, TableCell, TableBody,
  Button, TextField, MenuItem, Tooltip, Skeleton,
  Dialog, DialogTitle, DialogContent, DialogActions, Alert,
} from '@mui/material'
import { Add, HowToReg, Inbox, PlayArrow } from '@mui/icons-material'
import { usePertemuan, useDeletePertemuan, useMulaiPertemuan } from './usePertemuan'
import { useKelas } from '../kelas/useKelas'
import { usePengajar } from '../pengajar/usePengajar'
import { useAuth } from '../auth/useAuth'
import PertemuanForm from './PertemuanForm'
import PresensiDialog from './PresensiDialog'
import DeleteDialog from '../../components/ui/DeleteDialog'
import PageHeader from '../../components/ui/PageHeader'
import FilterBar, { filterFieldSx, filterFieldSlotProps } from '../../components/ui/FilterBar'
import DataTableCard from '../../components/ui/DataTableCard'
import StatusChip from '../../components/ui/StatusChip'
import type { Pertemuan } from '../../types'

function today() {
  return new Date().toISOString().slice(0, 10)
}

function MulaiMengajarDialog({ open, onClose, onStarted }: {
  open: boolean
  onClose: () => void
  onStarted: (pertemuanId: number) => void
}) {
  const { user } = useAuth()
  const isAdmin = !!user?.roles?.some((r) => r.name === 'admin')
  const { data: kelas } = useKelas({ status: 'aktif', per_page: 100 })
  const { data: pengajar } = usePengajar({ per_page: 100, enabled: isAdmin })
  const mulai = useMulaiPertemuan()
  const [kelasId, setKelasId] = useState('')
  const [tutorId, setTutorId] = useState('')
  const [tgl, setTgl] = useState(today())
  const [error, setError] = useState('')

  const handleClose = () => {
    setKelasId('')
    setTutorId('')
    setTgl(today())
    setError('')
    onClose()
  }

  const handleSubmit = async () => {
    setError('')
    try {
      const res = await mulai.mutateAsync({
        kelas_id: Number(kelasId), tgl,
        ...(isAdmin && tutorId ? { tutor_id: Number(tutorId) } : {}),
      })
      handleClose()
      onStarted(res.data.data.id)
    } catch (err: unknown) {
      const msg = (err as any)?.response?.data?.message || 'Gagal memulai sesi'
      setError(msg)
    }
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Mulai Mengajar</DialogTitle>
      <DialogContent>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <TextField label="Kelas" fullWidth margin="dense" select required
          value={kelasId} onChange={(e) => setKelasId(e.target.value)}
          slotProps={{ select: { displayEmpty: true } }}>
          <MenuItem value="" disabled>-- Pilih Kelas --</MenuItem>
          {kelas?.data?.map((k) => (
            <MenuItem key={k.id} value={k.id}>{k.nama}</MenuItem>
          ))}
        </TextField>
        {isAdmin && (
          <TextField label="Pengajar" fullWidth margin="dense" select
            value={tutorId} onChange={(e) => setTutorId(e.target.value)}
            slotProps={{ select: { displayEmpty: true } }}>
            <MenuItem value="">-- Belum Ditentukan --</MenuItem>
            {pengajar?.data?.map((p) => (
              <MenuItem key={p.id} value={p.id}>{p.nama}</MenuItem>
            ))}
          </TextField>
        )}
        <TextField label="Tanggal" type="date" fullWidth margin="dense" required
          value={tgl} onChange={(e) => setTgl(e.target.value)}
          slotProps={{ inputLabel: { shrink: true } }} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Batal</Button>
        <Button variant="contained" startIcon={<PlayArrow />}
          disabled={!kelasId || !tgl || mulai.isPending}
          onClick={handleSubmit}>
          {mulai.isPending ? 'Memulai...' : 'Mulai'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default function PertemuanPage() {
  const { user } = useAuth()
  const isAdmin = !!user?.roles?.some((r) => r.name === 'admin')
  const isTutor = !!user?.roles?.some((r) => r.name === 'tutor')
  const isOwnPertemuan = (p: Pertemuan) => isAdmin || !isTutor || p.tutor_id === null || p.tutor_id === user?.tutor?.id
  const [tglFilter, setTglFilter] = useState(today())
  const [kelasFilter, setKelasFilter] = useState('')
  const [mulaiOpen, setMulaiOpen] = useState(false)
  const [open, setOpen] = useState(false)
  const [editData, setEditData] = useState<Pertemuan | null>(null)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [presensiId, setPresensiId] = useState<number | null>(null)
  const [presensiMode, setPresensiMode] = useState<'absensi' | 'catatan' | 'full'>('full')

  const { data: kelas } = useKelas({ per_page: 100 })
  const { data, isLoading } = usePertemuan({ kelas_id: kelasFilter, tgl: tglFilter })
  const del = useDeletePertemuan()

  const filterActive = kelasFilter !== '' || tglFilter !== today()

  return (
    <Box>
      <PageHeader
        title="Presensi"
        subtitle="Input kelas yang Anda ajar untuk mulai mengisi presensi"
        action={
          <Box sx={{ display: 'flex', gap: 1 }}>
            {!isAdmin && (
              <Button variant="contained" startIcon={<PlayArrow />} onClick={() => setMulaiOpen(true)}>
                Mulai Mengajar
              </Button>
            )}
            {isAdmin && (
              <Button variant="outlined" startIcon={<Add />} onClick={() => { setEditData(null); setOpen(true) }}>
                Tambah Pertemuan
              </Button>
            )}
          </Box>
        }
      />

      <FilterBar
        onReset={() => { setTglFilter(today()); setKelasFilter('') }}
        resetDisabled={!filterActive}
      >
        <TextField
          type="date" variant="standard" value={tglFilter}
          onChange={(e) => setTglFilter(e.target.value)}
          slotProps={{ ...filterFieldSlotProps, inputLabel: { shrink: true } }}
          sx={{ ...filterFieldSx, minWidth: 150 }}
        />
        <TextField
          select variant="standard" value={kelasFilter}
          onChange={(e) => setKelasFilter(e.target.value)}
          slotProps={filterFieldSlotProps}
          sx={{ ...filterFieldSx, minWidth: 180 }}
        >
          <MenuItem value="">Semua Kelas</MenuItem>
          {kelas?.data?.map((k) => (
            <MenuItem key={k.id} value={k.id}>{k.nama}</MenuItem>
          ))}
        </TextField>
        {tglFilter && (
          <Button onClick={() => setTglFilter('')} sx={{ fontSize: 14, fontWeight: 600 }}>
            Lihat Semua Tanggal
          </Button>
        )}
      </FilterBar>

      <DataTableCard>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Kelas</TableCell>
              <TableCell>Pengajar</TableCell>
              <TableCell>Pertemuan</TableCell>
              <TableCell>Tanggal</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="center">Presensi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              [...Array(5)].map((_, i) => (
                <TableRow key={i}>
                  {[...Array(6)].map((_, j) => (
                    <TableCell key={j}><Skeleton variant="rounded" height={20} /></TableCell>
                  ))}
                </TableRow>
              ))
            ) : !data?.data?.length ? (
              <TableRow>
                <TableCell colSpan={6}>
                  <Box sx={{ py: 8, textAlign: 'center' }}>
                    <Inbox sx={{ fontSize: 40, color: '#cbd5e1', mb: 1 }} />
                    <Typography color="text.secondary" sx={{ fontWeight: 500 }}>
                      {tglFilter ? 'Belum ada kelas yang diajar pada tanggal ini' : 'Belum ada data pertemuan'}
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              data.data.map((p: Pertemuan) => {
                const canEdit = isOwnPertemuan(p)
                return (
                <TableRow
                  key={p.id}
                  hover
                  onClick={canEdit ? () => { setEditData(p); setOpen(true) } : undefined}
                  sx={{ cursor: canEdit ? 'pointer' : 'default' }}
                >
                  <TableCell>{p.kelas?.nama ?? '—'}</TableCell>
                  <TableCell>{p.tutor?.nama ?? '—'}</TableCell>
                  <TableCell>
                    <Box sx={{
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      width: 28, height: 28, borderRadius: '50%',
                      bgcolor: 'rgba(72,128,255,0.14)', color: '#4880ff', fontWeight: 700, fontSize: 13,
                    }}>
                      {p.pertemuan_ke}
                    </Box>
                  </TableCell>
                  <TableCell>
                    {new Date(p.tgl).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </TableCell>
                  <TableCell>
                    <StatusChip
                      label={p.status}
                      tone={p.status === 'selesai' ? 'green' : p.status === 'berlangsung' ? 'orange' : 'grey'}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title={p.status === 'berlangsung' ? 'Isi catatan performa & tandai selesai' : 'Lihat / edit presensi & catatan'}>
                      <Button size="small" variant={p.status === 'berlangsung' ? 'contained' : 'outlined'}
                        startIcon={<HowToReg sx={{ fontSize: 14 }} />}
                        onClick={(e) => {
                          e.stopPropagation()
                          setPresensiMode(p.status === 'berlangsung' ? 'catatan' : 'full')
                          setPresensiId(p.id)
                        }}
                        sx={p.status === 'berlangsung' ? { fontSize: 12, py: 0.5 } : {
                          borderColor: '#e2e8f0', color: '#606060', fontSize: 12, py: 0.5,
                          '&:hover': { borderColor: 'primary.main', color: 'primary.main', bgcolor: 'rgba(72,128,255,0.06)' },
                        }}>
                        {p.status === 'berlangsung' ? 'Selesaikan' : 'Presensi'}
                      </Button>
                    </Tooltip>
                  </TableCell>
                </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </DataTableCard>

      <MulaiMengajarDialog
        open={mulaiOpen}
        onClose={() => setMulaiOpen(false)}
        onStarted={(id) => { setPresensiMode('absensi'); setPresensiId(id) }}
      />

      {open && (
        <PertemuanForm
          open={open}
          onClose={() => { setOpen(false); setEditData(null) }}
          editData={editData}
          onDelete={editData ? () => { const id = editData.id; setOpen(false); setDeleteId(id) } : undefined}
        />
      )}
      <PresensiDialog
        open={!!presensiId}
        onClose={() => setPresensiId(null)}
        pertemuanId={presensiId}
        mode={presensiMode}
      />

      <DeleteDialog
        open={!!deleteId} title="Hapus Pertemuan"
        description="Data pertemuan dan presensinya akan dihapus permanen. Lanjutkan?"
        loading={del.isPending}
        onClose={() => setDeleteId(null)}
        onConfirm={async () => { await del.mutateAsync(deleteId!); setDeleteId(null) }}
      />
    </Box>
  )
}
