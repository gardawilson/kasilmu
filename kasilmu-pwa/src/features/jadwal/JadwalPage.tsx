import { useState } from 'react'
import {
  Box, Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody,
  Button, TextField, IconButton, MenuItem, Chip, Tooltip, Skeleton,
} from '@mui/material'
import { Add, Edit, Delete, Inbox, AccessTime } from '@mui/icons-material'
import { useJadwal, useDeleteJadwal } from './useJadwal'
import { useKelas } from '../kelas/useKelas'
import JadwalForm from './JadwalForm'
import DeleteDialog from '../../components/ui/DeleteDialog'
import type { Jadwal } from '../../types'

const HARI = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu']
const HARI_SX: Record<string, object> = {
  Senin:  { bgcolor: '#dbeafe', color: '#1d4ed8' },
  Selasa: { bgcolor: '#dcfce7', color: '#15803d' },
  Rabu:   { bgcolor: '#fef3c7', color: '#b45309' },
  Kamis:  { bgcolor: '#ede9fe', color: '#6d28d9' },
  Jumat:  { bgcolor: '#fee2e2', color: '#dc2626' },
  Sabtu:  { bgcolor: '#ccfbf1', color: '#0f766e' },
  Minggu: { bgcolor: '#f1f5f9', color: '#475569' },
}

export default function JadwalPage() {
  const [hari, setHari] = useState('')
  const [kelasFilter, setKelasFilter] = useState('')
  const [open, setOpen] = useState(false)
  const [editData, setEditData] = useState<Jadwal | null>(null)
  const [deleteId, setDeleteId] = useState<number | null>(null)

  const { data: kelas } = useKelas({ per_page: 100 })
  const { data, isLoading } = useJadwal({ hari, kelas_id: kelasFilter, per_page: 50 })
  const del = useDeleteJadwal()

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
        <Box>
          <Typography variant="h5">Penjadwalan</Typography>
          <Typography variant="body2" sx={{ color: '#64748b', mt: 0.5 }}>
            Atur jadwal pertemuan tiap kelas
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<Add />} onClick={() => { setEditData(null); setOpen(true) }}>
          Tambah Jadwal
        </Button>
      </Box>

      <Paper sx={{ overflow: 'hidden' }}>
        <Box sx={{ p: 2, borderBottom: '1px solid #f1f5f9', display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <TextField select label="Hari" value={hari}
            onChange={(e) => setHari(e.target.value)} sx={{ minWidth: 140 }}>
            <MenuItem value="">Semua Hari</MenuItem>
            {HARI.map((h) => <MenuItem key={h} value={h}>{h}</MenuItem>)}
          </TextField>
          <TextField select label="Kelas" value={kelasFilter}
            onChange={(e) => setKelasFilter(e.target.value)} sx={{ minWidth: 200 }}>
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
              <TableCell>Hari</TableCell>
              <TableCell>Waktu</TableCell>
              <TableCell>Ruang</TableCell>
              <TableCell align="right" sx={{ pr: 2 }}>Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              [...Array(5)].map((_, i) => (
                <TableRow key={i}>
                  {[...Array(5)].map((_, j) => (
                    <TableCell key={j}><Skeleton variant="rounded" height={20} /></TableCell>
                  ))}
                </TableRow>
              ))
            ) : !data?.data?.length ? (
              <TableRow>
                <TableCell colSpan={5}>
                  <Box sx={{ py: 8, textAlign: 'center' }}>
                    <Inbox sx={{ fontSize: 40, color: '#cbd5e1', mb: 1 }} />
                    <Typography color="text.secondary" sx={{ fontWeight: 500 }}>Belum ada jadwal</Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              data.data.map((j: Jadwal) => (
                <TableRow key={j.id} hover>
                  <TableCell sx={{ fontWeight: 600 }}>{j.kelas?.nama ?? `Kelas #${j.kelas_id}`}</TableCell>
                  <TableCell>
                    <Chip label={j.hari} size="small" sx={{ fontWeight: 600, ...HARI_SX[j.hari] }} />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, color: '#475569' }}>
                      <AccessTime sx={{ fontSize: 14, color: '#94a3b8' }} />
                      <Typography sx={{ fontSize: 14, fontWeight: 500 }}>
                        {j.jam_mulai.substring(0, 5)} – {j.jam_selesai.substring(0, 5)}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ color: '#475569' }}>{j.ruang || '—'}</TableCell>
                  <TableCell align="right" sx={{ pr: 1 }}>
                    <Tooltip title="Edit">
                      <IconButton size="small" onClick={() => { setEditData(j); setOpen(true) }}
                        sx={{ color: '#94a3b8', '&:hover': { color: 'primary.main', bgcolor: '#0d94880f' } }}>
                        <Edit fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Hapus">
                      <IconButton size="small" onClick={() => setDeleteId(j.id)}
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

      {open && <JadwalForm open={open} onClose={() => { setOpen(false); setEditData(null) }} editData={editData} />}

      <DeleteDialog
        open={!!deleteId} title="Hapus Jadwal"
        loading={del.isPending}
        onClose={() => setDeleteId(null)}
        onConfirm={async () => { await del.mutateAsync(deleteId!); setDeleteId(null) }}
      />
    </Box>
  )
}
