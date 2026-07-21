import { useState } from 'react'
import {
  Box, Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody,
  Button, TextField, IconButton, MenuItem, Chip, Tooltip, Skeleton,
} from '@mui/material'
import { Add, Edit, Delete, HowToReg, Inbox } from '@mui/icons-material'
import { usePertemuan, useDeletePertemuan } from './usePertemuan'
import { useKelas } from '../kelas/useKelas'
import PertemuanForm from './PertemuanForm'
import PresensiDialog from './PresensiDialog'
import DeleteDialog from '../../components/ui/DeleteDialog'
import type { Pertemuan } from '../../types'

export default function PertemuanPage() {
  const [kelasFilter, setKelasFilter] = useState('')
  const [open, setOpen] = useState(false)
  const [editData, setEditData] = useState<Pertemuan | null>(null)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [presensiId, setPresensiId] = useState<number | null>(null)

  const { data: kelas } = useKelas({ per_page: 100 })
  const { data, isLoading } = usePertemuan({ kelas_id: kelasFilter })
  const del = useDeletePertemuan()

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
        <Box>
          <Typography variant="h5">Presensi & Pertemuan</Typography>
          <Typography variant="body2" sx={{ color: '#64748b', mt: 0.5 }}>
            Catat sesi pertemuan dan kehadiran siswa
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<Add />} onClick={() => { setEditData(null); setOpen(true) }}>
          Tambah Pertemuan
        </Button>
      </Box>

      <Paper sx={{ overflow: 'hidden' }}>
        <Box sx={{ p: 2, borderBottom: '1px solid #f1f5f9' }}>
          <TextField select label="Filter Kelas" value={kelasFilter}
            onChange={(e) => setKelasFilter(e.target.value)} sx={{ minWidth: 220 }}>
            <MenuItem value="">Semua Kelas</MenuItem>
            {kelas?.data?.map((k) => (
              <MenuItem key={k.id} value={k.id}>{k.nama}</MenuItem>
            ))}
          </TextField>
        </Box>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Kelas</TableCell>
              <TableCell>Pertemuan</TableCell>
              <TableCell>Tanggal</TableCell>
              <TableCell>Materi</TableCell>
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
                    <Typography color="text.secondary" sx={{ fontWeight: 500 }}>Belum ada data pertemuan</Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              data.data.map((p: Pertemuan) => (
                <TableRow key={p.id} hover>
                  <TableCell sx={{ fontWeight: 600 }}>{p.kelas?.nama ?? '—'}</TableCell>
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
                  <TableCell sx={{ color: '#475569', maxWidth: 200 }}>
                    <Typography sx={{ fontSize: 13, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {p.materi || '—'}
                    </Typography>
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
