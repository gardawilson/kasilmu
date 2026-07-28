import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import {
  Box, Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody,
  Button, TextField, IconButton, TablePagination, Chip, Tooltip, Skeleton, MenuItem,
} from '@mui/material'
import { Add, Edit, Delete, Search, Inbox } from '@mui/icons-material'
import { useAkun, useDeleteAkun } from './useAkun'
import AkunForm from './AkunForm'
import DeleteDialog from '../../components/ui/DeleteDialog'
import { useAuth } from '../auth/useAuth'
import type { User } from '../../types'

const ROLE_LABEL: Record<string, string> = {
  admin: 'Admin', tutor: 'Pengajar', siswa: 'Siswa', orang_tua: 'Orang Tua',
}

const ROLE_COLOR: Record<string, { bg: string; color: string }> = {
  admin: { bg: '#dbeafe', color: '#1d4ed8' },
  tutor: { bg: '#ede9fe', color: '#7c3aed' },
  siswa: { bg: '#dcfce7', color: '#15803d' },
  orang_tua: { bg: '#fef3c7', color: '#b45309' },
}

export default function AkunPage() {
  const { user } = useAuth()
  const isAdmin = !!user?.roles?.some((r) => r.name === 'admin')
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [search, setSearch] = useState('')
  const [role, setRole] = useState('')
  const [open, setOpen] = useState(false)
  const [editData, setEditData] = useState<User | null>(null)
  const [deleteId, setDeleteId] = useState<number | null>(null)

  const { data, isLoading } = useAkun({ search, role, page, per_page: perPage })
  const del = useDeleteAkun()

  if (!isAdmin) return <Navigate to="/" replace />

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
        <Box>
          <Typography variant="h5">Manajemen Akun</Typography>
          <Typography variant="body2" sx={{ color: '#64748b', mt: 0.5 }}>
            Kelola akun login untuk semua role — admin, pengajar, siswa, dan orang tua
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<Add />} onClick={() => { setEditData(null); setOpen(true) }}>
          Tambah Akun
        </Button>
      </Box>

      <Paper sx={{ overflow: 'hidden' }}>
        <Box sx={{ p: 2, borderBottom: '1px solid #f1f5f9', display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <TextField
            placeholder="Cari nama atau email..." value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1) }}
            slotProps={{ input: { startAdornment: <Search sx={{ mr: 1, color: '#94a3b8', fontSize: 20 }} /> } }}
            sx={{ minWidth: 260 }}
          />
          <TextField select label="Role" value={role}
            onChange={(e) => { setRole(e.target.value); setPage(1) }} sx={{ minWidth: 160 }}>
            <MenuItem value="">Semua Role</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="tutor">Pengajar</MenuItem>
            <MenuItem value="siswa">Siswa</MenuItem>
            <MenuItem value="orang_tua">Orang Tua</MenuItem>
          </TextField>
        </Box>

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
                    <TableCell sx={{ fontWeight: 600 }}>{user.name}</TableCell>
                    <TableCell sx={{ color: '#475569' }}>{user.username}</TableCell>
                    <TableCell sx={{ color: '#475569' }}>{user.email}</TableCell>
                    <TableCell>
                      <Chip label={ROLE_LABEL[roleName] ?? roleName} size="small"
                        sx={{ fontWeight: 600, ...(ROLE_COLOR[roleName] ?? {}) }} />
                    </TableCell>
                    <TableCell>
                      <Chip label={user.is_active ? 'Aktif' : 'Nonaktif'} size="small" sx={{
                        fontWeight: 600,
                        ...(user.is_active
                          ? { bgcolor: '#dcfce7', color: '#15803d' }
                          : { bgcolor: '#f1f5f9', color: '#475569' }),
                      }} />
                    </TableCell>
                    <TableCell align="right" sx={{ pr: 1 }}>
                      <Tooltip title={isTutor ? 'Kelola dari menu Pengajar' : 'Edit'}>
                        <span>
                          <IconButton size="small" disabled={isTutor}
                            onClick={() => { setEditData(user); setOpen(true) }}
                            sx={{ color: '#94a3b8', '&:hover': { color: 'primary.main', bgcolor: '#0d94880f' } }}>
                            <Edit fontSize="small" />
                          </IconButton>
                        </span>
                      </Tooltip>
                      <Tooltip title={isTutor ? 'Kelola dari menu Pengajar' : 'Hapus'}>
                        <span>
                          <IconButton size="small" disabled={isTutor}
                            onClick={() => setDeleteId(user.id)}
                            sx={{ color: '#94a3b8', '&:hover': { color: 'error.main', bgcolor: '#ef44440f' } }}>
                            <Delete fontSize="small" />
                          </IconButton>
                        </span>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                )
              })
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
