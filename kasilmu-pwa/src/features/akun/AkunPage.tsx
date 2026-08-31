import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import {
  Box, Typography, Table, TableHead, TableRow, TableCell, TableBody,
  Button, TextField, Skeleton, MenuItem,
} from '@mui/material'
import { Add, Edit, Delete, Search, Inbox } from '@mui/icons-material'
import { useAkun, useDeleteAkun } from './useAkun'
import AkunForm from './AkunForm'
import DeleteDialog from '../../components/ui/DeleteDialog'
import RowActions from '../../components/ui/RowActions'
import PageHeader from '../../components/ui/PageHeader'
import FilterBar, { filterFieldSx, filterFieldSlotProps } from '../../components/ui/FilterBar'
import DataTableCard from '../../components/ui/DataTableCard'
import StatusChip, { type StatusTone } from '../../components/ui/StatusChip'
import { useAuth } from '../auth/useAuth'
import type { User } from '../../types'

const ROLE_LABEL: Record<string, string> = {
  admin: 'Admin', tutor: 'Pengajar', siswa: 'Siswa', orang_tua: 'Orang Tua',
}

const ROLE_TONE: Record<string, StatusTone> = {
  admin: 'blue',
  tutor: 'purple',
  siswa: 'green',
  orang_tua: 'orange',
}

export default function AkunPage() {
  const { user } = useAuth()
  const isAdmin = !!user?.roles?.some((r) => r.name === 'admin')
  const [page, setPage] = useState(1)
  const [perPage] = useState(10)
  const [search, setSearch] = useState('')
  const [role, setRole] = useState('')
  const [open, setOpen] = useState(false)
  const [editData, setEditData] = useState<User | null>(null)
  const [deleteId, setDeleteId] = useState<number | null>(null)

  const { data, isLoading } = useAkun({ search, role, page, per_page: perPage })
  const del = useDeleteAkun()

  if (!isAdmin) return <Navigate to="/" replace />

  const filterActive = search !== '' || role !== ''

  return (
    <Box>
      <PageHeader
        title="Manajemen Akun"
        subtitle="Kelola akun login untuk semua role — admin, pengajar, siswa, dan orang tua"
        action={
          <Button variant="contained" startIcon={<Add />} onClick={() => { setEditData(null); setOpen(true) }}>
            Tambah Akun
          </Button>
        }
      />

      <FilterBar
        onReset={() => { setSearch(''); setRole(''); setPage(1) }}
        resetDisabled={!filterActive}
      >
        <TextField
          variant="standard"
          placeholder="Cari nama atau email..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1) }}
          slotProps={{
            input: {
              disableUnderline: true,
              startAdornment: <Search sx={{ mr: 1, color: '#94a3b8', fontSize: 18 }} />,
            },
          }}
          sx={{ ...filterFieldSx, minWidth: 240 }}
        />
        <TextField
          select variant="standard" value={role}
          onChange={(e) => { setRole(e.target.value); setPage(1) }}
          slotProps={filterFieldSlotProps}
          sx={{ ...filterFieldSx, minWidth: 150 }}
        >
          <MenuItem value="">Semua Role</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="tutor">Pengajar</MenuItem>
          <MenuItem value="siswa">Siswa</MenuItem>
          <MenuItem value="orang_tua">Orang Tua</MenuItem>
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
              <TableCell>Nama</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
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
                    <Typography color="text.secondary" sx={{ fontWeight: 500 }}>Belum ada akun</Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              data.data.map((user: User) => {
                const roleName = user.roles?.[0]?.name ?? ''
                const isTutor = roleName === 'tutor'
                return (
                  <TableRow key={user.id} hover>
                    <TableCell sx={{ fontWeight: 700 }}>{user.name}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <StatusChip
                        label={ROLE_LABEL[roleName] ?? roleName}
                        tone={ROLE_TONE[roleName] ?? 'grey'}
                      />
                    </TableCell>
                    <TableCell>
                      <StatusChip
                        label={user.is_active ? 'Aktif' : 'Nonaktif'}
                        tone={user.is_active ? 'green' : 'orange'}
                      />
                    </TableCell>
                    <TableCell align="right" sx={{ pr: 2 }}>
                      <RowActions
                        actions={[
                          {
                            icon: <Edit />,
                            tooltip: isTutor ? 'Kelola dari menu Pengajar' : 'Edit',
                            disabled: isTutor,
                            onClick: () => { setEditData(user); setOpen(true) },
                          },
                          {
                            icon: <Delete />,
                            tooltip: isTutor ? 'Kelola dari menu Pengajar' : 'Hapus',
                            tone: 'error',
                            disabled: isTutor,
                            onClick: () => setDeleteId(user.id),
                          },
                        ]}
                      />
                    </TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </DataTableCard>

      {open && <AkunForm open={open} onClose={() => { setOpen(false); setEditData(null) }} editData={editData} />}

      <DeleteDialog
        open={!!deleteId} title="Hapus Akun"
        description="Akun ini akan dihapus permanen. Lanjutkan?"
        loading={del.isPending}
        onClose={() => setDeleteId(null)}
        onConfirm={async () => { await del.mutateAsync(deleteId!); setDeleteId(null) }}
      />
    </Box>
  )
}
