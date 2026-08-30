import { useState } from 'react'
import {
  Box, Typography, Table, TableHead, TableRow, TableCell, TableBody,
  Button, TextField, MenuItem, Skeleton,
} from '@mui/material'
import { Add, Search, Inbox } from '@mui/icons-material'
import { useKelas, useDeleteKelas } from './useKelas'
import KelasForm from './KelasForm'
import KelasSiswaDialog from './KelasSiswaDialog'
import SiswaPaketDialog from '../paket/SiswaPaketDialog'
import DeleteDialog from '../../components/ui/DeleteDialog'
import PageHeader from '../../components/ui/PageHeader'
import FilterBar, { filterFieldSx, filterFieldSlotProps } from '../../components/ui/FilterBar'
import DataTableCard from '../../components/ui/DataTableCard'
import StatusChip from '../../components/ui/StatusChip'
import { useAuth } from '../auth/useAuth'
import type { Kelas } from '../../types'

export default function KelasPage() {
  const { user } = useAuth()
  const isAdmin = !!user?.roles?.some((r) => r.name === 'admin')
  const [page, setPage] = useState(1)
  const [perPage] = useState(10)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')
  const [open, setOpen] = useState(false)
  const [editData, setEditData] = useState<Kelas | null>(null)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [siswaDialog, setSiswaDialog] = useState<number | null>(null)
  const [paketDialog, setPaketDialog] = useState<number | null>(null)

  const { data, isLoading } = useKelas({ search, status, page, per_page: perPage })
  const del = useDeleteKelas()

  const filterActive = search !== '' || status !== ''

  return (
    <Box>
      <PageHeader
        title="Data Kelas"
        subtitle="Kelola kelas, pengajar, dan daftar siswa"
        action={
          isAdmin && (
            <Button variant="contained" startIcon={<Add />} onClick={() => { setEditData(null); setOpen(true) }}>
              Tambah Kelas
            </Button>
          )
        }
      />

      <FilterBar
        onReset={() => { setSearch(''); setStatus(''); setPage(1) }}
        resetDisabled={!filterActive}
      >
        <TextField
          variant="standard"
          placeholder="Cari nama kelas..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1) }}
          slotProps={{
            input: {
              disableUnderline: true,
              startAdornment: <Search sx={{ mr: 1, color: '#94a3b8', fontSize: 18 }} />,
            },
          }}
          sx={{ ...filterFieldSx, minWidth: 220 }}
        />
        <TextField
          select
          variant="standard"
          value={status}
          onChange={(e) => { setStatus(e.target.value); setPage(1) }}
          slotProps={filterFieldSlotProps}
          sx={filterFieldSx}
        >
          <MenuItem value="">Semua Status</MenuItem>
          <MenuItem value="aktif">Aktif</MenuItem>
          <MenuItem value="selesai">Selesai</MenuItem>
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
              <TableCell>Nama Kelas</TableCell>
              <TableCell>Mata Pelajaran</TableCell>
              <TableCell>Kapasitas</TableCell>
              <TableCell>Tarif / Pertemuan</TableCell>
              <TableCell>Pertemuan</TableCell>
              <TableCell>Status</TableCell>
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
                    <Typography color="text.secondary" sx={{ fontWeight: 500 }}>Belum ada data kelas</Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              data.data.map((kelas: Kelas) => (
                <TableRow
                  key={kelas.id}
                  hover
                  onClick={isAdmin ? () => { setEditData(kelas); setOpen(true) } : undefined}
                  sx={{ cursor: isAdmin ? 'pointer' : 'default' }}
                >
                  <TableCell>{kelas.nama}</TableCell>
                  <TableCell>{kelas.mata_pelajaran}</TableCell>
                  <TableCell>{kelas.kapasitas} siswa</TableCell>
                  <TableCell>Rp {Number(kelas.tarif_per_pertemuan).toLocaleString('id-ID')}</TableCell>
                  <TableCell>{kelas.pertemuans_count ?? 0}x</TableCell>
                  <TableCell>
                    <StatusChip
                      label={kelas.status}
                      tone={kelas.status === 'aktif' ? 'green' : 'grey'}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </DataTableCard>

      {open && (
        <KelasForm
          open={open}
          onClose={() => { setOpen(false); setEditData(null) }}
          editData={editData}
          onDelete={editData ? () => { const id = editData.id; setOpen(false); setDeleteId(id) } : undefined}
          onKelolaPaket={editData ? () => { const id = editData.id; setOpen(false); setPaketDialog(id) } : undefined}
          onAturSiswa={editData ? () => { const id = editData.id; setOpen(false); setSiswaDialog(id) } : undefined}
        />
      )}
      {!!siswaDialog && <KelasSiswaDialog open={!!siswaDialog} onClose={() => setSiswaDialog(null)} kelasId={siswaDialog} />}
      {!!paketDialog && <SiswaPaketDialog open={!!paketDialog} onClose={() => setPaketDialog(null)} kelasId={paketDialog} />}

      <DeleteDialog
        open={!!deleteId} title="Hapus Kelas"
        description="Kelas ini akan dihapus permanen beserta semua pertemuannya. Lanjutkan?"
        loading={del.isPending}
        onClose={() => setDeleteId(null)}
        onConfirm={async () => { await del.mutateAsync(deleteId!); setDeleteId(null) }}
      />
    </Box>
  )
}
