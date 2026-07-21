import { useState } from 'react'
import {
  Box, Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody,
  Button, TextField, IconButton, TablePagination, Chip, Avatar, Tooltip, Skeleton,
} from '@mui/material'
import { Add, Edit, Delete, Search, Inbox } from '@mui/icons-material'
import { usePengajar, useDeletePengajar } from './usePengajar'
import PengajarForm from './PengajarForm'
import DeleteDialog from '../../components/ui/DeleteDialog'
import type { Pengajar } from '../../types'

export default function PengajarPage() {
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [search, setSearch] = useState('')
  const [open, setOpen] = useState(false)
  const [editData, setEditData] = useState<Pengajar | null>(null)
  const [deleteId, setDeleteId] = useState<number | null>(null)

  const { data, isLoading } = usePengajar({ search, page, per_page: perPage })
  const del = useDeletePengajar()

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
        <Box>
          <Typography variant="h5">Data Pengajar</Typography>
          <Typography variant="body2" sx={{ color: '#64748b', mt: 0.5 }}>
            Kelola data pengajar dan tarif honorarium
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<Add />} onClick={() => { setEditData(null); setOpen(true) }}>
          Tambah Pengajar
        </Button>
      </Box>

      <Paper sx={{ overflow: 'hidden' }}>
        <Box sx={{ p: 2, borderBottom: '1px solid #f1f5f9' }}>
          <TextField
            placeholder="Cari nama, NIP, atau bidang ajar..." value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1) }}
            slotProps={{ input: { startAdornment: <Search sx={{ mr: 1, color: '#94a3b8', fontSize: 20 }} /> } }}
            sx={{ minWidth: 300 }}
          />
        </Box>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Pengajar</TableCell>
              <TableCell>Bidang Ajar</TableCell>
              <TableCell>Tarif / Pertemuan</TableCell>
              <TableCell>Pendidikan</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right" sx={{ pr: 2 }}>Aksi</TableCell>
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
                    <Typography color="text.secondary" sx={{ fontWeight: 500 }}>Belum ada data pengajar</Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              data.data.map((pengajar: Pengajar) => (
                <TableRow key={pengajar.id} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Avatar sx={{ width: 34, height: 34, fontSize: 13, fontWeight: 700, bgcolor: '#8b5cf615', color: '#8b5cf6' }}>
                        {pengajar.nama.charAt(0).toUpperCase()}
                      </Avatar>
                      <Box>
                        <Typography sx={{ fontWeight: 600, fontSize: 14, lineHeight: 1.3 }}>{pengajar.nama}</Typography>
                        <Typography sx={{ fontSize: 12, color: '#94a3b8' }}>{pengajar.nip}</Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ color: '#475569' }}>{pengajar.bidang_ajar}</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#0f172a' }}>
                    Rp {Number(pengajar.tarif_per_pertemuan).toLocaleString('id-ID')}
                  </TableCell>
                  <TableCell sx={{ color: '#475569' }}>{pengajar.pendidikan_terakhir || '-'}</TableCell>
                  <TableCell>
                    <Chip label={pengajar.is_active ? 'Aktif' : 'Nonaktif'} size="small" sx={{
                      fontWeight: 600,
                      ...(pengajar.is_active
                        ? { bgcolor: '#dcfce7', color: '#15803d' }
                        : { bgcolor: '#f1f5f9', color: '#475569' }),
                    }} />
                  </TableCell>
                  <TableCell align="right" sx={{ pr: 1 }}>
                    <Tooltip title="Edit">
                      <IconButton size="small" onClick={() => { setEditData(pengajar); setOpen(true) }}
                        sx={{ color: '#94a3b8', '&:hover': { color: 'primary.main', bgcolor: '#0d94880f' } }}>
                        <Edit fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Hapus">
                      <IconButton size="small" onClick={() => setDeleteId(pengajar.id)}
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

      {open && <PengajarForm open={open} onClose={() => { setOpen(false); setEditData(null) }} editData={editData} />}

      <DeleteDialog
        open={!!deleteId} title="Hapus Pengajar"
        description="Data pengajar ini akan dihapus permanen. Lanjutkan?"
        loading={del.isPending}
        onClose={() => setDeleteId(null)}
        onConfirm={async () => { await del.mutateAsync(deleteId!); setDeleteId(null) }}
      />
    </Box>
  )
}
