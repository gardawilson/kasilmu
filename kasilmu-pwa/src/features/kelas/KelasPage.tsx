import { useState } from 'react'
import {
  Box, Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody,
  Button, TextField, IconButton, TablePagination, Chip, MenuItem,
  Tooltip, Skeleton,
} from '@mui/material'
import { Add, Edit, Delete, Search, People, Inbox } from '@mui/icons-material'
import { useKelas, useDeleteKelas } from './useKelas'
import KelasForm from './KelasForm'
import KelasSiswaDialog from './KelasSiswaDialog'
import DeleteDialog from '../../components/ui/DeleteDialog'
import type { Kelas } from '../../types'

export default function KelasPage() {
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')
  const [open, setOpen] = useState(false)
  const [editData, setEditData] = useState<Kelas | null>(null)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [siswaDialog, setSiswaDialog] = useState<number | null>(null)

  const { data, isLoading } = useKelas({ search, status, page, per_page: perPage })
  const del = useDeleteKelas()

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
        <Box>
          <Typography variant="h5">Data Kelas</Typography>
          <Typography variant="body2" sx={{ color: '#64748b', mt: 0.5 }}>
            Kelola kelas, pengajar, dan daftar siswa
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<Add />} onClick={() => { setEditData(null); setOpen(true) }}>
          Tambah Kelas
        </Button>
      </Box>

      <Paper sx={{ overflow: 'hidden' }}>
        <Box sx={{ p: 2, borderBottom: '1px solid #f1f5f9', display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <TextField
            placeholder="Cari nama kelas..." value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1) }}
            slotProps={{ input: { startAdornment: <Search sx={{ mr: 1, color: '#94a3b8', fontSize: 20 }} /> } }}
            sx={{ minWidth: 240 }}
          />
          <TextField select label="Status" value={status}
            onChange={(e) => { setStatus(e.target.value); setPage(1) }} sx={{ minWidth: 140 }}>
            <MenuItem value="">Semua Status</MenuItem>
            <MenuItem value="aktif">Aktif</MenuItem>
            <MenuItem value="selesai">Selesai</MenuItem>
          </TextField>
        </Box>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nama Kelas</TableCell>
              <TableCell>Mata Pelajaran</TableCell>
              <TableCell>Pengajar</TableCell>
              <TableCell>Harga</TableCell>
              <TableCell>Kapasitas</TableCell>
              <TableCell>Pertemuan</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right" sx={{ pr: 2 }}>Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              [...Array(5)].map((_, i) => (
                <TableRow key={i}>
                  {[...Array(8)].map((_, j) => (
                    <TableCell key={j}><Skeleton variant="rounded" height={20} /></TableCell>
                  ))}
                </TableRow>
              ))
            ) : !data?.data?.length ? (
              <TableRow>
                <TableCell colSpan={8}>
                  <Box sx={{ py: 8, textAlign: 'center' }}>
                    <Inbox sx={{ fontSize: 40, color: '#cbd5e1', mb: 1 }} />
                    <Typography color="text.secondary" sx={{ fontWeight: 500 }}>Belum ada data kelas</Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              data.data.map((kelas: Kelas) => (
                <TableRow key={kelas.id} hover>
                  <TableCell sx={{ fontWeight: 600 }}>{kelas.nama}</TableCell>
                  <TableCell>
                    <Chip label={kelas.mata_pelajaran} size="small"
                      sx={{ bgcolor: '#f59e0b12', color: '#b45309', fontWeight: 600 }} />
                  </TableCell>
                  <TableCell sx={{ color: '#475569' }}>{kelas.tutor?.nama ?? '-'}</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Rp {Number(kelas.harga).toLocaleString('id-ID')}</TableCell>
                  <TableCell sx={{ color: '#475569' }}>{kelas.kapasitas} siswa</TableCell>
                  <TableCell sx={{ color: '#475569' }}>{kelas.pertemuans_count ?? 0}x</TableCell>
                  <TableCell>
                    <Chip label={kelas.status} size="small" sx={{
                      fontWeight: 600,
                      ...(kelas.status === 'aktif'
                        ? { bgcolor: '#dcfce7', color: '#15803d' }
                        : { bgcolor: '#f1f5f9', color: '#475569' }),
                    }} />
                  </TableCell>
                  <TableCell align="right" sx={{ pr: 1 }}>
                    <Tooltip title="Atur Siswa">
                      <IconButton size="small" onClick={() => setSiswaDialog(kelas.id)}
                        sx={{ color: '#94a3b8', '&:hover': { color: '#0d9488', bgcolor: '#0d94880f' } }}>
                        <People fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit">
                      <IconButton size="small" onClick={() => { setEditData(kelas); setOpen(true) }}
                        sx={{ color: '#94a3b8', '&:hover': { color: 'primary.main', bgcolor: '#0d94880f' } }}>
                        <Edit fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Hapus">
                      <IconButton size="small" onClick={() => setDeleteId(kelas.id)}
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
        <TablePagination
          component="div" count={data?.meta?.total || 0} page={page - 1}
          rowsPerPage={perPage} onPageChange={(_, p) => setPage(p + 1)}
          onRowsPerPageChange={(e) => { setPerPage(parseInt(e.target.value)); setPage(1) }}
          rowsPerPageOptions={[5, 10, 25, 50]}
          sx={{ borderTop: '1px solid #f1f5f9' }}
        />
      </Paper>

      {open && <KelasForm open={open} onClose={() => { setOpen(false); setEditData(null) }} editData={editData} />}
      {!!siswaDialog && <KelasSiswaDialog open={!!siswaDialog} onClose={() => setSiswaDialog(null)} kelasId={siswaDialog} />}

      <DeleteDialog
        open={!!deleteId} title="Hapus Kelas"
        description="Kelas ini akan dihapus permanen beserta semua jadwal dan pertemuannya. Lanjutkan?"
        loading={del.isPending}
        onClose={() => setDeleteId(null)}
        onConfirm={async () => { await del.mutateAsync(deleteId!); setDeleteId(null) }}
      />
    </Box>
  )
}
