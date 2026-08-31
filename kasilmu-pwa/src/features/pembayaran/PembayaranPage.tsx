import { useState } from 'react'
import {
  Box, Typography, Table, TableHead, TableRow, TableCell, TableBody,
  Button, TextField, MenuItem, Avatar, Tooltip, Skeleton,
} from '@mui/material'
import { Add, Edit, Delete, Payments, Inbox } from '@mui/icons-material'
import { useTagihan, useDeleteTagihan } from './usePembayaran'
import { useSiswa } from '../siswa/useSiswa'
import TagihanForm from './TagihanForm'
import PembayaranForm from './PembayaranForm'
import DeleteDialog from '../../components/ui/DeleteDialog'
import RowActions from '../../components/ui/RowActions'
import PageHeader from '../../components/ui/PageHeader'
import FilterBar, { filterFieldSx, filterFieldSlotProps } from '../../components/ui/FilterBar'
import DataTableCard from '../../components/ui/DataTableCard'
import StatusChip, { type StatusTone } from '../../components/ui/StatusChip'
import type { Tagihan } from '../../types'

const STATUS_TONE: Record<string, StatusTone> = {
  pending: 'orange',
  lunas: 'green',
  kadaluarsa: 'red',
}

const STATUS_LABEL: Record<string, string> = {
  pending: 'Menunggu', lunas: 'Lunas', kadaluarsa: 'Kadaluarsa',
}

export default function PembayaranPage() {
  const [page, setPage] = useState(1)
  const [perPage] = useState(10)
  const [status, setStatus] = useState('')
  const [siswaFilter, setSiswaFilter] = useState('')
  const [openTagihan, setOpenTagihan] = useState(false)
  const [editData, setEditData] = useState<Tagihan | null>(null)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [bayarTagihanId, setBayarTagihanId] = useState<number | null>(null)

  const { data: siswa } = useSiswa({ per_page: 100 })
  const { data, isLoading } = useTagihan({ status, siswa_id: siswaFilter, page, per_page: perPage })
  const del = useDeleteTagihan()

  const filterActive = status !== '' || siswaFilter !== ''

  return (
    <Box>
      <PageHeader
        title="Pembayaran"
        subtitle="Kelola tagihan dan riwayat pembayaran siswa"
        action={
          <Button variant="contained" startIcon={<Add />} onClick={() => { setEditData(null); setOpenTagihan(true) }}>
            Buat Tagihan
          </Button>
        }
      />

      <FilterBar
        onReset={() => { setStatus(''); setSiswaFilter(''); setPage(1) }}
        resetDisabled={!filterActive}
      >
        <TextField
          select variant="standard" value={status}
          onChange={(e) => { setStatus(e.target.value); setPage(1) }}
          slotProps={filterFieldSlotProps}
          sx={{ ...filterFieldSx, minWidth: 150 }}
        >
          <MenuItem value="">Semua Status</MenuItem>
          <MenuItem value="pending">Menunggu</MenuItem>
          <MenuItem value="lunas">Lunas</MenuItem>
          <MenuItem value="kadaluarsa">Kadaluarsa</MenuItem>
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
                      <Avatar sx={{ width: 32, height: 32, fontSize: 12, fontWeight: 700, bgcolor: 'rgba(72,128,255,0.12)', color: '#4880ff' }}>
                        {(t.siswa?.nama ?? '?').charAt(0).toUpperCase()}
                      </Avatar>
                      <Typography sx={{ fontWeight: 700, fontSize: 14, color: 'rgba(32,34,36,0.9)' }}>{t.siswa?.nama ?? '—'}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <StatusChip
                      label={t.jenis === 'daftar' ? 'Pendaftaran' : 'SPP'}
                      tone={t.jenis === 'daftar' ? 'purple' : 'blue'}
                    />
                  </TableCell>
                  <TableCell sx={{ fontWeight: 800 }}>
                    Rp {Number(t.jumlah).toLocaleString('id-ID')}
                  </TableCell>
                  <TableCell>
                    {t.tenggat
                      ? new Date(t.tenggat).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
                      : '—'}
                  </TableCell>
                  <TableCell>
                    <StatusChip
                      label={STATUS_LABEL[t.status] ?? t.status}
                      tone={STATUS_TONE[t.status] ?? 'grey'}
                    />
                  </TableCell>
                  <TableCell align="center">
                    {t.status !== 'lunas' && (
                      <Tooltip title="Input Pembayaran">
                        <Button size="small" variant="outlined" startIcon={<Payments sx={{ fontSize: 14 }} />}
                          onClick={() => setBayarTagihanId(t.id)}
                          sx={{ borderColor: '#e2e8f0', color: '#606060', fontSize: 12, py: 0.5,
                            '&:hover': { borderColor: '#00b69b', color: '#00b69b', bgcolor: 'rgba(0,182,155,0.06)' } }}>
                          Bayar
                        </Button>
                      </Tooltip>
                    )}
                  </TableCell>
                  <TableCell align="right" sx={{ pr: 2 }}>
                    <RowActions
                      actions={[
                        { icon: <Edit />, tooltip: 'Edit', onClick: () => { setEditData(t); setOpenTagihan(true) } },
                        { icon: <Delete />, tooltip: 'Hapus', tone: 'error', onClick: () => setDeleteId(t.id) },
                      ]}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </DataTableCard>

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
