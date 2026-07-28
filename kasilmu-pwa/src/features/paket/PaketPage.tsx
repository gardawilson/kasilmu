import { useState } from 'react'
import {
  Box, Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody,
  Button, IconButton, TablePagination, Tooltip, Skeleton,
} from '@mui/material'
import { Add, Edit, Delete, Inbox } from '@mui/icons-material'
import { usePaketList, useDeletePaket } from './usePaket'
import PaketForm from './PaketForm'
import DeleteDialog from '../../components/ui/DeleteDialog'
import type { Paket } from '../../types'

export default function PaketPage() {
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [open, setOpen] = useState(false)
  const [editData, setEditData] = useState<Paket | null>(null)
  const [deleteId, setDeleteId] = useState<number | null>(null)

  const { data, isLoading } = usePaketList({ page, per_page: perPage })
  const del = useDeletePaket()

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
        <Box>
          <Typography variant="h5">Data Paket</Typography>
          <Typography variant="body2" sx={{ color: '#64748b', mt: 0.5 }}>
            Kelola paket pertemuan yang bisa dipilih siswa
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<Add />} onClick={() => { setEditData(null); setOpen(true) }}>
          Tambah Paket
        </Button>
      </Box>

      <Paper sx={{ overflow: 'hidden' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nama Paket</TableCell>
              <TableCell>Jumlah Pertemuan</TableCell>
              <TableCell>Deskripsi</TableCell>
              <TableCell align="right" sx={{ pr: 2 }}>Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              [...Array(3)].map((_, i) => (
                <TableRow key={i}>
                  {[...Array(4)].map((_, j) => (
                    <TableCell key={j}><Skeleton variant="rounded" height={20} /></TableCell>
                  ))}
                </TableRow>
              ))
            ) : !data?.data?.length ? (
              <TableRow>
                <TableCell colSpan={4}>
                  <Box sx={{ py: 8, textAlign: 'center' }}>
                    <Inbox sx={{ fontSize: 40, color: '#cbd5e1', mb: 1 }} />
                    <Typography color="text.secondary" sx={{ fontWeight: 500 }}>Belum ada data paket</Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              data.data.map((paket: Paket) => (
                <TableRow key={paket.id} hover>
                  <TableCell sx={{ fontWeight: 600 }}>{paket.nama}</TableCell>
                  <TableCell sx={{ color: '#475569' }}>{paket.jumlah_pertemuan}x</TableCell>
                  <TableCell sx={{ color: '#475569' }}>{paket.deskripsi || '-'}</TableCell>
                  <TableCell align="right" sx={{ pr: 1 }}>
                    <Tooltip title="Edit">
                      <IconButton size="small" onClick={() => { setEditData(paket); setOpen(true) }}
                        sx={{ color: '#94a3b8', '&:hover': { color: 'primary.main', bgcolor: '#0d94880f' } }}>
                        <Edit fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Hapus">
                      <IconButton size="small" onClick={() => setDeleteId(paket.id)}
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

      {open && <PaketForm open={open} onClose={() => { setOpen(false); setEditData(null) }} editData={editData} />}

      <DeleteDialog
        open={!!deleteId} title="Hapus Paket"
        description="Paket ini akan dihapus permanen. Lanjutkan?"
        loading={del.isPending}
        onClose={() => setDeleteId(null)}
        onConfirm={async () => { await del.mutateAsync(deleteId!); setDeleteId(null) }}
      />
    </Box>
  )
}
