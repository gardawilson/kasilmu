import { useState } from 'react'
import {
  Box, Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody,
  Button, TextField, IconButton, Tooltip, Skeleton,
} from '@mui/material'
import { Add, Edit, Delete, Search, Inbox } from '@mui/icons-material'
import { useSekolah, useDeleteSekolah } from './useSekolah'
import SekolahForm from './SekolahForm'
import DeleteDialog from '../../components/ui/DeleteDialog'
import type { Sekolah } from '../../types'

export default function SekolahPage() {
  const [search, setSearch] = useState('')
  const [open, setOpen] = useState(false)
  const [editData, setEditData] = useState<Sekolah | null>(null)
  const [deleteId, setDeleteId] = useState<number | null>(null)

  const { data, isLoading } = useSekolah({ search })
  const del = useDeleteSekolah()

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
        <Box>
          <Typography variant="h5">Data Sekolah</Typography>
          <Typography variant="body2" sx={{ color: '#64748b', mt: 0.5 }}>
            Kelola daftar master nama sekolah asal siswa
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<Add />} onClick={() => { setEditData(null); setOpen(true) }}>
          Tambah Sekolah
        </Button>
      </Box>

      <Paper sx={{ overflow: 'hidden' }}>
        <Box sx={{ p: 2, borderBottom: '1px solid #f1f5f9' }}>
          <TextField
            placeholder="Cari nama sekolah..." value={search}
            onChange={(e) => setSearch(e.target.value)}
            slotProps={{ input: { startAdornment: <Search sx={{ mr: 1, color: '#94a3b8', fontSize: 20 }} /> } }}
            sx={{ minWidth: 260 }}
          />
        </Box>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nama Sekolah</TableCell>
              <TableCell align="right" sx={{ pr: 2 }}>Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              [...Array(5)].map((_, i) => (
                <TableRow key={i}>
                  {[...Array(2)].map((_, j) => (
                    <TableCell key={j}><Skeleton variant="rounded" height={20} /></TableCell>
                  ))}
                </TableRow>
              ))
            ) : !data?.data?.length ? (
              <TableRow>
                <TableCell colSpan={2}>
                  <Box sx={{ py: 8, textAlign: 'center' }}>
                    <Inbox sx={{ fontSize: 40, color: '#cbd5e1', mb: 1 }} />
                    <Typography color="text.secondary" sx={{ fontWeight: 500 }}>Belum ada data sekolah</Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              data.data.map((sekolah: Sekolah) => (
                <TableRow key={sekolah.id} hover>
                  <TableCell sx={{ fontWeight: 500 }}>{sekolah.nama}</TableCell>
                  <TableCell align="right" sx={{ pr: 1 }}>
                    <Tooltip title="Edit">
                      <IconButton size="small" onClick={() => { setEditData(sekolah); setOpen(true) }}
                        sx={{ color: '#94a3b8', '&:hover': { color: 'primary.main', bgcolor: '#0d94880f' } }}>
                        <Edit fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Hapus">
                      <IconButton size="small" onClick={() => setDeleteId(sekolah.id)}
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

      {open && <SekolahForm open={open} onClose={() => { setOpen(false); setEditData(null) }} editData={editData} />}

      <DeleteDialog
        open={!!deleteId} title="Hapus Sekolah"
        description="Data sekolah ini akan dihapus permanen. Siswa yang terkait akan kehilangan referensi sekolahnya. Lanjutkan?"
        loading={del.isPending}
        onClose={() => setDeleteId(null)}
        onConfirm={async () => { await del.mutateAsync(deleteId!); setDeleteId(null) }}
      />
    </Box>
  )
}
