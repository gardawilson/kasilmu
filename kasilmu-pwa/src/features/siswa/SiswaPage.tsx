import { useState } from 'react'
import {
  Box, Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody,
  Button, TextField, IconButton, TablePagination, Chip, MenuItem,
  Avatar, Tooltip, Skeleton,
} from '@mui/material'
import { Add, Edit, Delete, Search, Inbox } from '@mui/icons-material'
import { useSiswa, useDeleteSiswa } from './useSiswa'
import SiswaForm from './SiswaForm'
import DeleteDialog from '../../components/ui/DeleteDialog'
import { useAuth } from '../auth/useAuth'
import type { Siswa } from '../../types'

const STATUS_SX: Record<string, object> = {
  aktif: { bgcolor: '#dcfce7', color: '#15803d' },
  nonaktif: { bgcolor: '#f1f5f9', color: '#475569' },
  lulus: { bgcolor: '#dbeafe', color: '#1d4ed8' },
}

export default function SiswaPage() {
  const { user } = useAuth()
  const isAdmin = !!user?.roles?.some((r) => r.name === 'admin')
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')
  const [open, setOpen] = useState(false)
  const [editData, setEditData] = useState<Siswa | null>(null)
  const [deleteId, setDeleteId] = useState<number | null>(null)

  const { data, isLoading } = useSiswa({ search, status, page, per_page: perPage })
  const del = useDeleteSiswa()

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
        <Box>
          <Typography variant="h5">Data Siswa</Typography>
          <Typography variant="body2" sx={{ color: '#64748b', mt: 0.5 }}>
            Kelola data siswa bimbingan belajar
          </Typography>
        </Box>
        {isAdmin && (
          <Button variant="contained" startIcon={<Add />} onClick={() => { setEditData(null); setOpen(true) }}>
            Tambah Siswa
          </Button>
        )}
      </Box>

      <Paper sx={{ overflow: 'hidden' }}>
        <Box sx={{ p: 2, borderBottom: '1px solid #f1f5f9', display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <TextField
            placeholder="Cari nama atau NIS..." value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1) }}
            slotProps={{ input: { startAdornment: <Search sx={{ mr: 1, color: '#94a3b8', fontSize: 20 }} /> } }}
            sx={{ minWidth: 260 }}
          />
          <TextField select label="Status" value={status}
            onChange={(e) => { setStatus(e.target.value); setPage(1) }} sx={{ minWidth: 140 }}>
            <MenuItem value="">Semua Status</MenuItem>
            <MenuItem value="aktif">Aktif</MenuItem>
            <MenuItem value="nonaktif">Nonaktif</MenuItem>
            <MenuItem value="lulus">Lulus</MenuItem>
          </TextField>
        </Box>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Siswa</TableCell>
              <TableCell>Sekolah</TableCell>
              <TableCell>Tingkat</TableCell>
              <TableCell>Kelas</TableCell>
              <TableCell>Paket</TableCell>
              <TableCell>Sisa Kuota</TableCell>
              <TableCell>No. Telp Ortu</TableCell>
              <TableCell>Status</TableCell>
              {isAdmin && <TableCell align="right" sx={{ pr: 2 }}>Aksi</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              [...Array(5)].map((_, i) => (
                <TableRow key={i}>
                  {[...Array(isAdmin ? 9 : 8)].map((_, j) => (
                    <TableCell key={j}><Skeleton variant="rounded" height={20} /></TableCell>
                  ))}
                </TableRow>
              ))
            ) : !data?.data?.length ? (
              <TableRow>
                <TableCell colSpan={isAdmin ? 9 : 8}>
                  <Box sx={{ py: 8, textAlign: 'center' }}>
                    <Inbox sx={{ fontSize: 40, color: '#cbd5e1', mb: 1 }} />
                    <Typography color="text.secondary" sx={{ fontWeight: 500 }}>Belum ada data siswa</Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              data.data.map((siswa: Siswa) => (
                <TableRow key={siswa.id} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Avatar sx={{ width: 34, height: 34, fontSize: 13, fontWeight: 700, bgcolor: '#3b82f615', color: '#3b82f6' }}>
                        {siswa.nama.charAt(0).toUpperCase()}
                      </Avatar>
                      <Box>
                        <Typography sx={{ fontWeight: 600, fontSize: 14, lineHeight: 1.3 }}>{siswa.nama}</Typography>
                        <Typography sx={{ fontSize: 12, color: '#94a3b8' }}>{siswa.nis}</Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ color: '#475569' }}>{siswa.sekolah?.nama || '-'}</TableCell>
                  <TableCell sx={{ color: '#475569' }}>
                    {siswa.tingkat ? `${siswa.jenjang} - Tingkat ${siswa.tingkat}` : (siswa.kelas_asal || '-')}
                  </TableCell>
                  <TableCell>
                    {!siswa.kelas?.length ? (
                      <Typography variant="body2" sx={{ color: '#94a3b8' }}>-</Typography>
                    ) : (
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                        {siswa.kelas.map((k) => (
                          <Chip key={k.id} size="small" label={k.nama}
                            sx={{ bgcolor: '#e0f2fe', color: '#0369a1', fontWeight: 600 }} />
                        ))}
                      </Box>
                    )}
                  </TableCell>
                  <TableCell>
                    {!siswa.siswa_pakets?.length ? (
                      <Typography variant="body2" sx={{ color: '#94a3b8' }}>-</Typography>
                    ) : (
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                        {siswa.siswa_pakets.map((sp) => (
                          <Tooltip key={sp.id} title={sp.kelas?.nama ?? ''}>
                            <Chip size="small" label={sp.paket?.nama ?? '-'}
                              sx={{ bgcolor: '#ede9fe', color: '#7c3aed', fontWeight: 600 }} />
                          </Tooltip>
                        ))}
                      </Box>
                    )}
                  </TableCell>
                  <TableCell>
                    {!siswa.siswa_pakets?.length ? (
                      <Typography variant="body2" sx={{ color: '#94a3b8' }}>-</Typography>
                    ) : (
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                        {siswa.siswa_pakets.map((sp) => (
                          <Tooltip key={sp.id}
                            title={`${sp.kelas?.nama ?? ''} — berlaku s.d. ${new Date(sp.tgl_selesai).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}`}>
                            <Chip size="small"
                              label={`${sp.sisa_pertemuan ?? '?'}/${sp.paket?.jumlah_pertemuan ?? '?'} · s.d. ${new Date(sp.tgl_selesai).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}`}
                              sx={{
                                fontWeight: 600,
                                ...((sp.sisa_pertemuan ?? 0) <= 0
                                  ? { bgcolor: '#fee2e2', color: '#dc2626' }
                                  : (sp.sisa_pertemuan ?? 0) <= 2
                                  ? { bgcolor: '#fef3c7', color: '#b45309' }
                                  : { bgcolor: '#dcfce7', color: '#15803d' }),
                              }} />
                          </Tooltip>
                        ))}
                      </Box>
                    )}
                  </TableCell>
                  <TableCell sx={{ color: '#475569' }}>{siswa.no_telp_ortu || '-'}</TableCell>
                  <TableCell>
                    <Chip label={siswa.status} size="small"
                      sx={{ fontWeight: 600, ...STATUS_SX[siswa.status] }} />
                  </TableCell>
                  {isAdmin && (
                    <TableCell align="right" sx={{ pr: 1 }}>
                      <Tooltip title="Edit">
                        <IconButton size="small" onClick={() => { setEditData(siswa); setOpen(true) }}
                          sx={{ color: '#94a3b8', '&:hover': { color: 'primary.main', bgcolor: '#0d94880f' } }}>
                          <Edit fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Hapus">
                        <IconButton size="small" onClick={() => setDeleteId(siswa.id)}
                          sx={{ color: '#94a3b8', '&:hover': { color: 'error.main', bgcolor: '#ef44440f' } }}>
                          <Delete fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  )}
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

      {open && <SiswaForm open={open} onClose={() => setOpen(false)} editData={editData} />}

      <DeleteDialog
        open={!!deleteId} title="Hapus Siswa"
        description="Data siswa ini akan dihapus permanen. Lanjutkan?"
        loading={del.isPending}
        onClose={() => setDeleteId(null)}
        onConfirm={async () => { await del.mutateAsync(deleteId!); setDeleteId(null) }}
      />
    </Box>
  )
}
