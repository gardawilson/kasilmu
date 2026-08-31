import { useState } from 'react'
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button,
  Table, TableHead, TableRow, TableCell, TableBody, Typography, Box,
} from '@mui/material'
import { Add, Edit, Delete } from '@mui/icons-material'
import { useKelasPaket, useDeletePaket } from './usePaket'
import { useKelasDetail } from '../kelas/useKelas'
import PaketForm from './PaketForm'
import DeleteDialog from '../../components/ui/DeleteDialog'
import RowActions from '../../components/ui/RowActions'
import type { Paket } from '../../types'

interface Props {
  open: boolean
  onClose: () => void
  kelasId: number | null
}

export default function SiswaPaketDialog({ open, onClose, kelasId }: Props) {
  const { data: kelasDetail } = useKelasDetail(kelasId ?? 0)
  const { data: paketList, isLoading } = useKelasPaket(kelasId ?? 0)
  const del = useDeletePaket()

  const [formOpen, setFormOpen] = useState(false)
  const [editData, setEditData] = useState<Paket | null>(null)
  const [deleteId, setDeleteId] = useState<number | null>(null)

  const pakets = paketList?.data ?? []

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle>Kelola Paket — {kelasDetail?.data?.nama ?? ''}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, gap: 2 }}>
            <Typography variant="body2" sx={{ color: '#606060' }}>
              Paket pertemuan khusus kelas ini. Harga di sini yang dipakai saat siswa mengambil paket
              (pendaftaran siswa baru maupun "Atur Siswa").
            </Typography>
            <Button
              variant="contained"
              size="small"
              startIcon={<Add />}
              onClick={() => { setEditData(null); setFormOpen(true) }}
              sx={{ flexShrink: 0 }}
            >
              Tambah Paket
            </Button>
          </Box>

          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Nama Paket</TableCell>
                <TableCell>Jumlah Pertemuan</TableCell>
                <TableCell>Harga</TableCell>
                <TableCell align="right">Aksi</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <TableRow><TableCell colSpan={4} align="center" sx={{ py: 4, color: '#94a3b8' }}>Memuat…</TableCell></TableRow>
              ) : !pakets.length ? (
                <TableRow><TableCell colSpan={4} align="center" sx={{ py: 4, color: '#94a3b8' }}>Belum ada paket untuk kelas ini</TableCell></TableRow>
              ) : (
                pakets.map((p) => (
                  <TableRow key={p.id} hover>
                    <TableCell sx={{ fontWeight: 700 }}>{p.nama}</TableCell>
                    <TableCell>{p.jumlah_pertemuan}x</TableCell>
                    <TableCell>Rp {Number(p.harga).toLocaleString('id-ID')}</TableCell>
                    <TableCell align="right">
                      <RowActions
                        actions={[
                          { icon: <Edit />, tooltip: 'Edit', onClick: () => { setEditData(p); setFormOpen(true) } },
                          { icon: <Delete />, tooltip: 'Hapus', tone: 'error', onClick: () => setDeleteId(p.id) },
                        ]}
                      />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Tutup</Button>
        </DialogActions>
      </Dialog>

      {formOpen && (
        <PaketForm
          open={formOpen}
          onClose={() => { setFormOpen(false); setEditData(null) }}
          editData={editData}
          kelasId={kelasId ?? undefined}
        />
      )}

      <DeleteDialog
        open={!!deleteId}
        title="Hapus Paket"
        description="Paket ini akan dihapus permanen. Paket yang masih dipakai siswa tidak bisa dihapus."
        loading={del.isPending}
        onClose={() => setDeleteId(null)}
        onConfirm={async () => { await del.mutateAsync(deleteId!); setDeleteId(null) }}
      />
    </>
  )
}
