import { useState } from 'react'
import {
  Box, Typography, Table, TableHead, TableRow, TableCell, TableBody,
  Button, TextField, MenuItem, Avatar, Skeleton,
} from '@mui/material'
import { Add, Edit, Delete, Inbox } from '@mui/icons-material'
import { useNilai, useDeleteNilai } from './useNilai'
import { useKelas } from '../kelas/useKelas'
import { useSiswa } from '../siswa/useSiswa'
import NilaiForm from './NilaiForm'
import DeleteDialog from '../../components/ui/DeleteDialog'
import RowActions from '../../components/ui/RowActions'
import PageHeader from '../../components/ui/PageHeader'
import FilterBar, { filterFieldSx, filterFieldSlotProps } from '../../components/ui/FilterBar'
import DataTableCard from '../../components/ui/DataTableCard'
import StatusChip, { type StatusTone } from '../../components/ui/StatusChip'
import type { Nilai } from '../../types'

const JENIS_TONE: Record<string, StatusTone> = {
  tugas: 'blue',
  uts: 'orange',
  uas: 'purple',
}

function NilaiBadge({ nilai }: { nilai: number }) {
  const n = Number(nilai)
  const sx = n >= 80
    ? { bgcolor: 'rgba(0,182,155,0.2)', color: '#00b69b' }
    : n >= 60
    ? { bgcolor: 'rgba(255,167,86,0.2)', color: '#d98b3f' }
    : { bgcolor: 'rgba(239,56,38,0.16)', color: '#ef3826' }
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
  const [perPage] = useState(10)
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

  const filterActive = kelasFilter !== '' || jenisFilter !== '' || siswaFilter !== ''

  return (
    <Box>
      <PageHeader
        title="Nilai Siswa"
        subtitle="Rekap nilai tugas, UTS, dan UAS per siswa"
        action={
          <Button variant="contained" startIcon={<Add />} onClick={() => { setEditData(null); setOpen(true) }}>
            Tambah Nilai
          </Button>
        }
      />

      <FilterBar
        onReset={() => { setKelasFilter(''); setJenisFilter(''); setSiswaFilter(''); setPage(1) }}
        resetDisabled={!filterActive}
      >
        <TextField
          select variant="standard" value={kelasFilter}
          onChange={(e) => { setKelasFilter(e.target.value); setPage(1) }}
          slotProps={filterFieldSlotProps}
          sx={{ ...filterFieldSx, minWidth: 160 }}
        >
          <MenuItem value="">Semua Kelas</MenuItem>
          {kelas?.data?.map((k) => (
            <MenuItem key={k.id} value={k.id}>{k.nama}</MenuItem>
          ))}
        </TextField>
        <TextField
          select variant="standard" value={siswaFilter}
          onChange={(e) => { setSiswaFilter(e.target.value); setPage(1) }}
          slotProps={filterFieldSlotProps}
          sx={{ ...filterFieldSx, minWidth: 180 }}
        >
          <MenuItem value="">Semua Siswa</MenuItem>
          {siswa?.data?.map((s) => (
            <MenuItem key={s.id} value={s.id}>{s.nama}</MenuItem>
          ))}
        </TextField>
        <TextField
          select variant="standard" value={jenisFilter}
          onChange={(e) => { setJenisFilter(e.target.value); setPage(1) }}
          slotProps={filterFieldSlotProps}
          sx={filterFieldSx}
        >
          <MenuItem value="">Semua Jenis</MenuItem>
          <MenuItem value="tugas">Tugas</MenuItem>
          <MenuItem value="uts">UTS</MenuItem>
          <MenuItem value="uas">UAS</MenuItem>
        </TextField>
      </FilterBar>

      <DataTableCard
        page={page}
        lastPage={data?.meta?.last_page ?? 1}
        total={data?.meta?.total ?? 0}
        perPage={perPage}
        onPageChange={setPage}
      >
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
                      <Avatar sx={{ width: 32, height: 32, fontSize: 12, fontWeight: 700, bgcolor: 'rgba(72,128,255,0.12)', color: '#4880ff' }}>
                        {(n.siswa?.nama ?? '?').charAt(0).toUpperCase()}
                      </Avatar>
                      <Typography sx={{ fontWeight: 700, fontSize: 14, color: 'rgba(32,34,36,0.9)' }}>{n.siswa?.nama ?? '—'}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{n.kelas?.nama ?? '—'}</TableCell>
                  <TableCell>
                    <StatusChip
                      label={n.jenis_nilai.toUpperCase()}
                      tone={JENIS_TONE[n.jenis_nilai] ?? 'grey'}
                      sx={{ letterSpacing: '0.04em', textTransform: 'none' }}
                    />
                  </TableCell>
                  <TableCell><NilaiBadge nilai={n.nilai} /></TableCell>
                  <TableCell sx={{ fontSize: 13 }}>{n.keterangan || '—'}</TableCell>
                  <TableCell align="right" sx={{ pr: 2 }}>
                    <RowActions
                      actions={[
                        { icon: <Edit />, tooltip: 'Edit', onClick: () => { setEditData(n); setOpen(true) } },
                        { icon: <Delete />, tooltip: 'Hapus', tone: 'error', onClick: () => setDeleteId(n.id) },
                      ]}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </DataTableCard>

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
