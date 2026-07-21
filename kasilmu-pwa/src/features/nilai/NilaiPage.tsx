import { useState } from 'react'
import {
  Box, Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody,
  Button, TextField, IconButton, TablePagination, Chip, MenuItem,
  Avatar, Tooltip, Skeleton,
} from '@mui/material'
import { Add, Edit, Delete, Inbox } from '@mui/icons-material'
import { useNilai, useDeleteNilai } from './useNilai'
import { useKelas } from '../kelas/useKelas'
import { useSiswa } from '../siswa/useSiswa'
import NilaiForm from './NilaiForm'
import DeleteDialog from '../../components/ui/DeleteDialog'
import type { Nilai } from '../../types'

const JENIS_SX: Record<string, object> = {
  tugas: { bgcolor: '#dbeafe', color: '#1d4ed8' },
  uts:   { bgcolor: '#fef3c7', color: '#b45309' },
  uas:   { bgcolor: '#ede9fe', color: '#6d28d9' },
}

function NilaiBadge({ nilai }: { nilai: number }) {
  const n = Number(nilai)
  const sx = n >= 80
    ? { bgcolor: '#dcfce7', color: '#15803d' }
    : n >= 60
    ? { bgcolor: '#fef3c7', color: '#b45309' }
    : { bgcolor: '#fee2e2', color: '#dc2626' }
  return (
    <Box sx={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      width: 44, height: 36, borderRadius: 1.5, fontWeight: 800, fontSize: 15, ...sx,
    }}>
      {n % 1 === 0 ? n : n.toFixed(1)}
    </Box>
  )
}

export default function NilaiPage() {
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [kelasFilter, setKelasFilter] = useState('')
  const [jenisFilter, setJenisFilter] = useState('')
  const [siswaFilter, setSiswaFilter] = useState('')
  const [open, setOpen] = useState(false)
  const [editData, setEditData] = useState<Nilai | null>(null)
  const [deleteId, setDeleteId] = useState<number | null>(null)

  const { data: kelas } = useKelas({ per_page: 100 })
  const { data: siswa } = useSiswa({ per_page: 100 })
  const { data, isLoading } = useNilai({
    kelas_id: kelasFilter, jenis_nilai: jenisFilter,
    siswa_id: siswaFilter, page, per_page: perPage,
  })
  const del = useDeleteNilai()

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
        <Box>
          <Typography variant="h5">Nilai Siswa</Typography>
          <Typography variant="body2" sx={{ color: '#64748b', mt: 0.5 }}>
            Rekap nilai tugas, UTS, dan UAS per siswa
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<Add />} onClick={() => { setEditData(null); setOpen(true) }}>
          Tambah Nilai
        </Button>
      </Box>

      <Paper sx={{ overflow: 'hidden' }}>
        <Box sx={{ p: 2, borderBottom: '1px solid #f1f5f9', display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <TextField select label="Kelas" value={kelasFilter}
            onChange={(e) => { setKelasFilter(e.target.value); setPage(1) }} sx={{ minWidth: 180 }}>
            <MenuItem value="">Semua Kelas</MenuItem>
            {kelas?.data?.map((k) => (
              <MenuItem key={k.id} value={k.id}>{k.nama}</MenuItem>
            ))}
          </TextField>
          <TextField select label="Siswa" value={siswaFilter}
            onChange={(e) => { setSiswaFilter(e.target.value); setPage(1) }} sx={{ minWidth: 200 }}>
            <MenuItem value="">Semua Siswa</MenuItem>
            {siswa?.data?.map((s) => (
              <MenuItem key={s.id} value={s.id}>{s.nama}</MenuItem>
            ))}
          </TextField>
          <TextField select label="Jenis Nilai" value={jenisFilter}
            onChange={(e) => { setJenisFilter(e.target.value); setPage(1) }} sx={{ minWidth: 140 }}>
            <MenuItem value="">Semua Jenis</MenuItem>
            <MenuItem value="tugas">Tugas</MenuItem>
            <MenuItem value="uts">UTS</MenuItem>
            <MenuItem value="uas">UAS</MenuItem>
          </TextField>
        </Box>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Siswa</TableCell>
              <TableCell>Kelas</TableCell>
              <TableCell>Jenis</TableCell>
              <TableCell>Nilai</TableCell>
              <TableCell>Keterangan</TableCell>
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
                    <Typography color="text.secondary" sx={{ fontWeight: 500 }}>Belum ada data nilai</Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              data.data.map((n: Nilai) => (
                <TableRow key={n.id} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Avatar sx={{ width: 32, height: 32, fontSize: 12, fontWeight: 700, bgcolor: '#ef444415', color: '#ef4444' }}>
                        {(n.siswa?.nama ?? '?').charAt(0).toUpperCase()}
                      </Avatar>
                      <Typography sx={{ fontWeight: 600, fontSize: 14 }}>{n.siswa?.nama ?? '—'}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ color: '#475569' }}>{n.kelas?.nama ?? '—'}</TableCell>
                  <TableCell>
                    <Chip label={n.jenis_nilai.toUpperCase()} size="small"
                      sx={{ fontWeight: 700, letterSpacing: '0.04em', ...JENIS_SX[n.jenis_nilai] }} />
                  </TableCell>
                  <TableCell><NilaiBadge nilai={n.nilai} /></TableCell>
                  <TableCell sx={{ color: '#475569', fontSize: 13 }}>{n.keterangan || '—'}</TableCell>
                  <TableCell align="right" sx={{ pr: 1 }}>
                    <Tooltip title="Edit">
                      <IconButton size="small" onClick={() => { setEditData(n); setOpen(true) }}
                        sx={{ color: '#94a3b8', '&:hover': { color: 'primary.main', bgcolor: '#0d94880f' } }}>
                        <Edit fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Hapus">
                      <IconButton size="small" onClick={() => setDeleteId(n.id)}
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

      {open && <NilaiForm open={open} onClose={() => { setOpen(false); setEditData(null) }} editData={editData} />}

      <DeleteDialog
        open={!!deleteId} title="Hapus Nilai"
        loading={del.isPending}
        onClose={() => setDeleteId(null)}
        onConfirm={async () => { await del.mutateAsync(deleteId!); setDeleteId(null) }}
      />
    </Box>
  )
}
