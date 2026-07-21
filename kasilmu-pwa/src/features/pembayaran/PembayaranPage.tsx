import { useState } from 'react'
import {
  Box, Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody,
  Button, TextField, IconButton, TablePagination, Chip, MenuItem,
  Avatar, Tooltip, Skeleton,
} from '@mui/material'
import { Add, Edit, Delete, Payments, Inbox } from '@mui/icons-material'
import { useTagihan, useDeleteTagihan } from './usePembayaran'
import { useSiswa } from '../siswa/useSiswa'
import TagihanForm from './TagihanForm'
import PembayaranForm from './PembayaranForm'
import DeleteDialog from '../../components/ui/DeleteDialog'
import type { Tagihan } from '../../types'

const STATUS_SX: Record<string, object> = {
  pending:    { bgcolor: '#fef3c7', color: '#b45309' },
  lunas:      { bgcolor: '#dcfce7', color: '#15803d' },
  kadaluarsa: { bgcolor: '#fee2e2', color: '#dc2626' },
}

const STATUS_LABEL: Record<string, string> = {
  pending: 'Menunggu', lunas: 'Lunas', kadaluarsa: 'Kadaluarsa',
}

export default function PembayaranPage() {
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [status, setStatus] = useState('')
  const [siswaFilter, setSiswaFilter] = useState('')
  const [openTagihan, setOpenTagihan] = useState(false)
  const [editData, setEditData] = useState<Tagihan | null>(null)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [bayarTagihanId, setBayarTagihanId] = useState<number | null>(null)

  const { data: siswa } = useSiswa({ per_page: 100 })
  const { data, isLoading } = useTagihan({ status, siswa_id: siswaFilter, page, per_page: perPage })
  const del = useDeleteTagihan()

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
        <Box>
          <Typography variant="h5">Pembayaran</Typography>
          <Typography variant="body2" sx={{ color: '#64748b', mt: 0.5 }}>
            Kelola tagihan dan riwayat pembayaran siswa
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<Add />} onClick={() => { setEditData(null); setOpenTagihan(true) }}>
          Buat Tagihan
        </Button>
      </Box>

      <Paper sx={{ overflow: 'hidden' }}>
        <Box sx={{ p: 2, borderBottom: '1px solid #f1f5f9', display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <TextField select label="Status" value={status}
            onChange={(e) => { setStatus(e.target.value); setPage(1) }} sx={{ minWidth: 160 }}>
            <MenuItem value="">Semua Status</MenuItem>
            <MenuItem value="pending">Menunggu</MenuItem>
            <MenuItem value="lunas">Lunas</MenuItem>
            <MenuItem value="kadaluarsa">Kadaluarsa</MenuItem>
          </TextField>
          <TextField select label="Siswa" value={siswaFilter}
            onChange={(e) => { setSiswaFilter(e.target.value); setPage(1) }} sx={{ minWidth: 200 }}>
            <MenuItem value="">Semua Siswa</MenuItem>
            {siswa?.data?.map((s) => (
              <MenuItem key={s.id} value={s.id}>{s.nama}</MenuItem>
            ))}
          </TextField>
        </Box>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Siswa</TableCell>
              <TableCell>Jenis</TableCell>
              <TableCell>Jumlah</TableCell>
              <TableCell>Tenggat</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="center">Bayar</TableCell>
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
                    <Typography color="text.secondary" sx={{ fontWeight: 500 }}>Belum ada tagihan</Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              data.data.map((t: Tagihan) => (
                <TableRow key={t.id} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Avatar sx={{ width: 32, height: 32, fontSize: 12, fontWeight: 700, bgcolor: '#3b82f615', color: '#3b82f6' }}>
                        {(t.siswa?.nama ?? '?').charAt(0).toUpperCase()}
                      </Avatar>
                      <Typography sx={{ fontWeight: 600, fontSize: 14 }}>{t.siswa?.nama ?? '—'}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={t.jenis === 'daftar' ? 'Pendaftaran' : 'SPP'}
                      size="small"
                      sx={{ fontWeight: 600,
                        ...(t.jenis === 'daftar'
                          ? { bgcolor: '#ede9fe', color: '#6d28d9' }
                          : { bgcolor: '#dbeafe', color: '#1d4ed8' }) }}
                    />
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700, color: '#0f172a' }}>
                    Rp {Number(t.jumlah).toLocaleString('id-ID')}
                  </TableCell>
                  <TableCell sx={{ color: '#475569' }}>
                    {t.tenggat
                      ? new Date(t.tenggat).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
                      : '—'}
                  </TableCell>
                  <TableCell>
                    <Chip label={STATUS_LABEL[t.status] ?? t.status} size="small"
                      sx={{ fontWeight: 600, ...STATUS_SX[t.status] }} />
                  </TableCell>
                  <TableCell align="center">
                    {t.status !== 'lunas' && (
                      <Tooltip title="Input Pembayaran">
                        <Button size="small" variant="outlined" startIcon={<Payments sx={{ fontSize: 14 }} />}
                          onClick={() => setBayarTagihanId(t.id)}
                          sx={{ borderColor: '#e2e8f0', color: '#475569', fontSize: 12, py: 0.5,
                            '&:hover': { borderColor: '#10b981', color: '#10b981', bgcolor: '#10b9810a' } }}>
                          Bayar
                        </Button>
                      </Tooltip>
                    )}
                  </TableCell>
                  <TableCell align="right" sx={{ pr: 1 }}>
                    <Tooltip title="Edit">
                      <IconButton size="small" onClick={() => { setEditData(t); setOpenTagihan(true) }}
                        sx={{ color: '#94a3b8', '&:hover': { color: 'primary.main', bgcolor: '#0d94880f' } }}>
                        <Edit fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Hapus">
                      <IconButton size="small" onClick={() => setDeleteId(t.id)}
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

      {openTagihan && <TagihanForm open={openTagihan} onClose={() => { setOpenTagihan(false); setEditData(null) }} editData={editData} />}
      {!!bayarTagihanId && <PembayaranForm open={!!bayarTagihanId} onClose={() => setBayarTagihanId(null)} tagihanId={bayarTagihanId} />}

      <DeleteDialog
        open={!!deleteId} title="Hapus Tagihan"
        description="Tagihan ini akan dihapus permanen beserta riwayat pembayarannya. Lanjutkan?"
        loading={del.isPending}
        onClose={() => setDeleteId(null)}
        onConfirm={async () => { await del.mutateAsync(deleteId!); setDeleteId(null) }}
      />
    </Box>
  )
}
