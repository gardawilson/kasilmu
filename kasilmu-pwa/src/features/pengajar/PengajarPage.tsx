import { useState } from 'react'
import {
  Box, Typography, Paper, Button, TextField, IconButton, Avatar, Skeleton,
} from '@mui/material'
import { Add, Search, Inbox, ChevronLeft, ChevronRight } from '@mui/icons-material'
import { usePengajar, useDeletePengajar } from './usePengajar'
import PengajarForm from './PengajarForm'
import DeleteDialog from '../../components/ui/DeleteDialog'
import PageHeader from '../../components/ui/PageHeader'
import FilterBar, { filterFieldSx } from '../../components/ui/FilterBar'
import StatusChip from '../../components/ui/StatusChip'
import { useAuth } from '../auth/useAuth'
import type { Pengajar } from '../../types'

const groupLabelSx = {
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: '0.06em',
  color: '#a0aec0',
  textTransform: 'uppercase' as const,
}

const valueSx = { fontSize: 14, fontWeight: 600, color: 'rgba(32,34,36,0.8)', mt: 0.25 }

function PengajarCard({ pengajar, isAdmin, onOpen }: {
  pengajar: Pengajar
  isAdmin: boolean
  onOpen: () => void
}) {
  return (
    <Paper
      onClick={isAdmin ? onOpen : undefined}
      sx={{
        p: 3.5,
        borderRadius: '20px',
        textAlign: 'center',
        border: '0.3px solid #ececec',
        ...(isAdmin && {
          cursor: 'pointer',
          transition: 'box-shadow .2s ease',
          '&:hover': { boxShadow: '0 10px 34px rgb(0 0 0 / 0.09)' },
        }),
      }}
    >
      <Avatar
        src={pengajar.foto ?? undefined}
        sx={{
          width: 110, height: 110, mx: 'auto', mb: 2,
          fontSize: 34, fontWeight: 700,
          bgcolor: 'rgba(98,38,239,0.12)', color: '#6226ef',
        }}
      >
        {pengajar.nama.charAt(0).toUpperCase()}
      </Avatar>

      <Typography sx={{ fontWeight: 700, fontSize: 16, color: '#202224' }}>
        {pengajar.nama}
      </Typography>
      <Typography sx={{ fontSize: 13, color: '#94a3b8', mt: 0.25 }}>
        {pengajar.nip}
      </Typography>

      <Box sx={{ mt: 1.5, display: 'flex', justifyContent: 'center' }}>
        <StatusChip
          label={pengajar.is_active ? 'Aktif' : 'Nonaktif'}
          tone={pengajar.is_active ? 'green' : 'orange'}
        />
      </Box>

      <Box sx={{ mt: 2.5, textAlign: 'left' }}>
        <Typography sx={groupLabelSx}>Bidang Ajar</Typography>
        <Typography sx={valueSx}>{pengajar.bidang_ajar || '—'}</Typography>

        <Typography sx={{ ...groupLabelSx, mt: 1.5 }}>Pendidikan Terakhir</Typography>
        <Typography sx={valueSx}>{pengajar.pendidikan_terakhir || '—'}</Typography>

        <Typography sx={{ ...groupLabelSx, mt: 1.5 }}>Akun Login</Typography>
        <Typography sx={{ ...valueSx, color: pengajar.user ? 'rgba(32,34,36,0.8)' : '#ef3826' }}>
          {pengajar.user?.username || 'Belum ada akun'}
        </Typography>
      </Box>
    </Paper>
  )
}

const gridSx = {
  display: 'grid',
  gap: 2.5,
  gridTemplateColumns: {
    xs: '1fr',
    sm: 'repeat(2, 1fr)',
    md: 'repeat(3, 1fr)',
    lg: 'repeat(4, 1fr)',
  },
}

export default function PengajarPage() {
  const { user } = useAuth()
  const isAdmin = !!user?.roles?.some((r) => r.name === 'admin')
  const [page, setPage] = useState(1)
  const [perPage] = useState(12)
  const [search, setSearch] = useState('')
  const [open, setOpen] = useState(false)
  const [editData, setEditData] = useState<Pengajar | null>(null)
  const [deleteId, setDeleteId] = useState<number | null>(null)

  const { data, isLoading } = usePengajar({ search, page, per_page: perPage })
  const del = useDeletePengajar()

  const total = data?.meta?.total ?? 0
  const lastPage = data?.meta?.last_page ?? 1
  const from = total === 0 ? 0 : (page - 1) * perPage + 1
  const to = Math.min(page * perPage, total)

  return (
    <Box>
      <PageHeader
        title="Data Pengajar"
        subtitle="Kelola data pengajar"
        action={
          isAdmin && (
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => { setEditData(null); setOpen(true) }}
            >
              Tambah Pengajar
            </Button>
          )
        }
      />

      <FilterBar onReset={() => { setSearch(''); setPage(1) }} resetDisabled={search === ''}>
        <TextField
          variant="standard"
          placeholder="Cari nama, NIP, atau bidang ajar..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1) }}
          slotProps={{
            input: {
              disableUnderline: true,
              startAdornment: <Search sx={{ mr: 1, color: '#94a3b8', fontSize: 18 }} />,
            },
          }}
          sx={{ ...filterFieldSx, minWidth: 280 }}
        />
      </FilterBar>

      {isLoading ? (
        <Box sx={gridSx}>
          {[...Array(8)].map((_, i) => (
            <Paper key={i} sx={{ p: 3.5, borderRadius: '20px', textAlign: 'center' }}>
              <Skeleton variant="circular" width={110} height={110} sx={{ mx: 'auto', mb: 2 }} />
              <Skeleton variant="text" width="60%" sx={{ mx: 'auto' }} />
              <Skeleton variant="text" width="40%" sx={{ mx: 'auto' }} />
              <Skeleton variant="text" width="70%" sx={{ mx: 'auto', mt: 1 }} />
            </Paper>
          ))}
        </Box>
      ) : !data?.data?.length ? (
        <Paper sx={{ py: 10, textAlign: 'center', borderRadius: '20px' }}>
          <Inbox sx={{ fontSize: 40, color: '#cbd5e1', mb: 1 }} />
          <Typography color="text.secondary" sx={{ fontWeight: 500 }}>
            Belum ada data pengajar
          </Typography>
        </Paper>
      ) : (
        <>
          <Box sx={gridSx}>
            {data.data.map((pengajar: Pengajar) => (
              <PengajarCard
                key={pengajar.id}
                pengajar={pengajar}
                isAdmin={isAdmin}
                onOpen={() => { setEditData(pengajar); setOpen(true) }}
              />
            ))}
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3 }}>
            <Typography sx={{ fontSize: 14, fontWeight: 600, color: 'rgba(32,34,36,0.6)' }}>
              Menampilkan {from}–{to} dari {total}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton
                size="small"
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                sx={{ border: '0.6px solid #d5d5d5', borderRadius: '6px', color: '#202224' }}
              >
                <ChevronLeft fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                disabled={page >= lastPage}
                onClick={() => setPage((p) => Math.min(lastPage, p + 1))}
                sx={{ border: '0.6px solid #d5d5d5', borderRadius: '6px', color: '#202224' }}
              >
                <ChevronRight fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        </>
      )}

      {open && (
        <PengajarForm
          open={open}
          onClose={() => { setOpen(false); setEditData(null) }}
          editData={editData}
          onDelete={
            editData
              ? () => {
                  const id = editData.id
                  setOpen(false)
                  setDeleteId(id)
                }
              : undefined
          }
        />
      )}

      <DeleteDialog
        open={!!deleteId}
        title="Hapus Pengajar"
        description="Data pengajar ini akan dihapus permanen. Lanjutkan?"
        loading={del.isPending}
        onClose={() => setDeleteId(null)}
        onConfirm={async () => { await del.mutateAsync(deleteId!); setDeleteId(null) }}
      />
    </Box>
  )
}
