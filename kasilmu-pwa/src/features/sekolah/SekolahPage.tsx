import { useState } from 'react'
import {
  Box, Typography, Table, TableHead, TableRow, TableCell, TableBody,
  Button, TextField, Skeleton,
} from '@mui/material'
import { Add, Edit, Delete, Search, Inbox } from '@mui/icons-material'
import { useSekolah, useDeleteSekolah } from './useSekolah'
import SekolahForm from './SekolahForm'
import DeleteDialog from '../../components/ui/DeleteDialog'
import RowActions from '../../components/ui/RowActions'
import PageHeader from '../../components/ui/PageHeader'
import FilterBar, { filterFieldSx } from '../../components/ui/FilterBar'
import DataTableCard from '../../components/ui/DataTableCard'
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
      <PageHeader
        title="Data Sekolah"
        subtitle="Kelola daftar master nama sekolah asal siswa"
        action={
          <Button variant="contained" startIcon={<Add />} onClick={() => { setEditData(null); setOpen(true) }}>
            Tambah Sekolah
          </Button>
        }
      />

      <FilterBar onReset={() => setSearch('')} resetDisabled={search === ''}>
        <TextField
          variant="standard"
          placeholder="Cari nama sekolah..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          slotProps={{
            input: {
              disableUnderline: true,
              startAdornment: <Search sx={{ mr: 1, color: '#94a3b8', fontSize: 18 }} />,
            },
          }}
          sx={{ ...filterFieldSx, minWidth: 240 }}
        />
      </FilterBar>

      <DataTableCard minWidth={480}>
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
                  <TableCell>{sekolah.nama}</TableCell>
                  <TableCell align="right" sx={{ pr: 2 }}>
                    <RowActions
                      actions={[
                        { icon: <Edit />, tooltip: 'Edit', onClick: () => { setEditData(sekolah); setOpen(true) } },
                        { icon: <Delete />, tooltip: 'Hapus', tone: 'error', onClick: () => setDeleteId(sekolah.id) },
                      ]}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </DataTableCard>

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
