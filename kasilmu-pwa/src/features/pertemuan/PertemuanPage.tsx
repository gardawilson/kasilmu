import { useState } from 'react'
import {
  Box, Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody,
  Button, TextField, IconButton, MenuItem, Chip, Tooltip, Skeleton,
  Dialog, DialogTitle, DialogContent, DialogActions,
} from '@mui/material'
import { Add, Edit, Delete, HowToReg, Inbox, PlayArrow } from '@mui/icons-material'
import { usePertemuan, useDeletePertemuan, useMulaiPertemuan } from './usePertemuan'
import { useKelas } from '../kelas/useKelas'
import PertemuanForm from './PertemuanForm'
import PresensiDialog from './PresensiDialog'
import DeleteDialog from '../../components/ui/DeleteDialog'
import type { Pertemuan } from '../../types'

function today() {
  return new Date().toISOString().slice(0, 10)
}

function MulaiMengajarDialog({ open, onClose, onStarted }: {
  open: boolean
  onClose: () => void
  onStarted: (pertemuanId: number) => void
}) {
  const { data: kelas } = useKelas({ status: 'aktif', per_page: 100 })
  const mulai = useMulaiPertemuan()
  const [kelasId, setKelasId] = useState('')
  const [tgl, setTgl] = useState(today())

  const handleClose = () => {
    setKelasId('')
    setTgl(today())
    onClose()
  }

  const handleSubmit = async () => {
    const res = await mulai.mutateAsync({ kelas_id: Number(kelasId), tgl })
    handleClose()
    onStarted(res.data.data.id)
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Mulai Mengajar</DialogTitle>
      <DialogContent>
        <TextField label="Kelas" fullWidth margin="dense" select required
          value={kelasId} onChange={(e) => setKelasId(e.target.value)}
          slotProps={{ select: { displayEmpty: true } }}>
          <MenuItem value="" disabled>-- Pilih Kelas --</MenuItem>
          {kelas?.data?.map((k) => (
            <MenuItem key={k.id} value={k.id}>{k.nama}</MenuItem>
          ))}
        </TextField>
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
  const [tglFilter, setTglFilter] = useState(today())
  const [kelasFilter, setKelasFilter] = useState('')
  const [mulaiOpen, setMulaiOpen] = useState(false)
  const [open, setOpen] = useState(false)
  const [editData, setEditData] = useState<Pertemuan | null>(null)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [presensiId, setPresensiId] = useState<number | null>(null)

  const { data: kelas } = useKelas({ per_page: 100 })
  const { data, isLoading } = usePertemuan({ kelas_id: kelasFilter, tgl: tglFilter })
  const del = useDeletePertemuan()

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
        <Box>
          <Typography variant="h5">Presensi</Typography>
          <Typography variant="body2" sx={{ color: '#64748b', mt: 0.5 }}>
            Input kelas yang Anda ajar untuk mulai mengisi presensi
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button variant="contained" startIcon={<PlayArrow />} onClick={() => setMulaiOpen(true)}>
            Mulai Mengajar
          </Button>
          <Button variant="outlined" startIcon={<Add />} onClick={() => { setEditData(null); setOpen(true) }}>
            Tambah Pertemuan
          </Button>
        </Box>
      </Box>

      <Paper sx={{ overflow: 'hidden' }}>
        <Box sx={{ p: 2, borderBottom: '1px solid #f1f5f9', display: 'flex', gap: 2 }}>
          <TextField label="Tanggal" type="date" value={tglFilter}
            onChange={(e) => setTglFilter(e.target.value)}
            slotProps={{ inputLabel: { shrink: true } }} sx={{ minWidth: 180 }} />
          <TextField select label="Filter Kelas" value={kelasFilter}
            onChange={(e) => setKelasFilter(e.target.value)} sx={{ minWidth: 220 }}>
            <MenuItem value="">Semua Kelas</MenuItem>
            {kelas?.data?.map((k) => (
              <MenuItem key={k.id} value={k.id}>{k.nama}</MenuItem>
            ))}
          </TextField>
          {tglFilter && (
            <Button onClick={() => setTglFilter('')} sx={{ alignSelf: 'center' }}>Lihat Semua Tanggal</Button>
          )}
        </Box>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Kelas</TableCell>
              <TableCell>Pengajar</TableCell>
              <TableCell>Pertemuan</TableCell>
              <TableCell>Tanggal</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="center">Presensi</TableCell>
              <TableCell align="right" sx={{ pr: 2 }}>Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              [...Array(5)].map((_, i) => (
                <TableRow key={i}>
                  {[...Array(7)].map((_, j) => (
                    <TableCell key={j}><Skeleton variant="rounded" height={20} /></TableCell>
                  ))}
                </TableRow>
              ))
            ) : !data?.data?.length ? (
              <TableRow>
                <TableCell colSpan={7}>
                  <Box sx={{ py: 8, textAlign: 'center' }}>
                    <Inbox sx={{ fontSize: 40, color: '#cbd5e1', mb: 1 }} />
                    <Typography color="text.secondary" sx={{ fontWeight: 500 }}>
                      {tglFilter ? 'Belum ada kelas yang diajar pada tanggal ini' : 'Belum ada data pertemuan'}
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              data.data.map((p: Pertemuan) => (
                <TableRow key={p.id} hover>
                  <TableCell sx={{ fontWeight: 600 }}>{p.kelas?.nama ?? '—'}</TableCell>
                  <TableCell sx={{ color: '#475569' }}>{p.tutor?.nama ?? '—'}</TableCell>
                  <TableCell>
                    <Box sx={{
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      width: 28, height: 28, borderRadius: '50%',
                      bgcolor: '#06b6d412', color: '#0891b2', fontWeight: 700, fontSize: 13,
                    }}>
                      {p.pertemuan_ke}
                    </Box>
                  </TableCell>
                  <TableCell sx={{ color: '#475569', fontWeight: 500 }}>
                    {new Date(p.tgl).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </TableCell>
                  <TableCell>
                    <Chip label={p.status} size="small" sx={{
                      fontWeight: 600,
                      ...(p.status === 'terlaksana'
                        ? { bgcolor: '#dcfce7', color: '#15803d' }
                        : { bgcolor: '#f1f5f9', color: '#475569' }),
                    }} />
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="Input Presensi">
                      <Button size="small" variant="outlined" startIcon={<HowToReg sx={{ fontSize: 14 }} />}
                        onClick={() => setPresensiId(p.id)}
                        sx={{ borderColor: '#e2e8f0', color: '#475569', fontSize: 12, py: 0.5,
                          '&:hover': { borderColor: '#0d9488', color: '#0d9488', bgcolor: '#0d94880a' } }}>
                        Presensi
                      </Button>
                    </Tooltip>
                  </TableCell>
                  <TableCell align="right" sx={{ pr: 1 }}>
                    <Tooltip title="Edit">
                      <IconButton size="small" onClick={() => { setEditData(p); setOpen(true) }}
                        sx={{ color: '#94a3b8', '&:hover': { color: 'primary.main', bgcolor: '#0d94880f' } }}>
                        <Edit fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Hapus">
                      <IconButton size="small" onClick={() => setDeleteId(p.id)}
                        sx={{ color: '#94a3b8', '&:hover': { color: 'error.main', bgcolor: '#ef44440f' } }}>
                        <Delete fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Paper>

      <MulaiMengajarDialog
        open={mulaiOpen}
        onClose={() => setMulaiOpen(false)}
        onStarted={(id) => setPresensiId(id)}
      />

      {open && <PertemuanForm open={open} onClose={() => { setOpen(false); setEditData(null) }} editData={editData} />}
      <PresensiDialog open={!!presensiId} onClose={() => setPresensiId(null)} pertemuanId={presensiId} />

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
