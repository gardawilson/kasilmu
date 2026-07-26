import { useState, useEffect } from 'react'
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button,
  Table, TableHead, TableRow, TableCell, TableBody,
  TextField, MenuItem, Chip, Box, Typography, Avatar,
} from '@mui/material'
import { usePaketList, useSiswaPaketAktif, useCreateSiswaPaket } from './usePaket'
import { useKelasDetail } from '../kelas/useKelas'

interface Props {
  open: boolean
  onClose: () => void
  kelasId: number | null
}

export default function SiswaPaketDialog({ open, onClose, kelasId }: Props) {
  const { data: kelasDetail } = useKelasDetail(kelasId ?? 0)
  const { data: paketList } = usePaketList({ per_page: 100 })
  const create = useCreateSiswaPaket()

  const siswaList = kelasDetail?.data?.siswa ?? []
  const pakets = paketList?.data ?? []

  const [assignments, setAssignments] = useState<Record<number, number>>({})

  useEffect(() => {
    if (open) {
      setAssignments({})
    }
  }, [open])

  const handleAssign = async (siswaId: number) => {
    const paketId = assignments[siswaId]
    if (!paketId || !kelasId) return

    await create.mutateAsync({
      siswa_id: siswaId,
      kelas_id: kelasId,
      paket_id: paketId,
      tgl_mulai: new Date().toISOString().slice(0, 10),
    })

    setAssignments((prev) => {
      const next = { ...prev }
      delete next[siswaId]
      return next
    })
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        Atur Paket Siswa — {kelasDetail?.data?.nama ?? ''}
      </DialogTitle>
      <DialogContent>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Siswa</TableCell>
              <TableCell>Paket Aktif</TableCell>
              <TableCell>Atur Paket</TableCell>
              <TableCell>Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {siswaList.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center" sx={{ py: 4, color: '#94a3b8' }}>
                  Belum ada siswa di kelas ini
                </TableCell>
              </TableRow>
            ) : (
              siswaList.map((siswa: any) => (
                <SiswaPaketRow
                  key={siswa.id}
                  siswa={siswa}
                  pakets={pakets}
                  selectedPaket={assignments[siswa.id] ?? null}
                  onSelectPaket={(paketId) =>
                    setAssignments((prev) => ({ ...prev, [siswa.id]: paketId }))
                  }
                  onAssign={() => handleAssign(siswa.id)}
                  isSaving={create.isPending}
                />
              ))
            )}
          </TableBody>
        </Table>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Tutup</Button>
      </DialogActions>
    </Dialog>
  )
}

function SiswaPaketRow({
  siswa, pakets, selectedPaket, onSelectPaket, onAssign, isSaving,
}: {
  siswa: any
  pakets: any[]
  selectedPaket: number | null
  onSelectPaket: (id: number) => void
  onAssign: () => void
  isSaving: boolean
}) {
  const { data: aktifPaket } = useSiswaPaketAktif(siswa.id)

  const active = aktifPaket?.data

  return (
    <TableRow hover>
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Avatar sx={{ width: 28, height: 28, fontSize: 11, fontWeight: 700, bgcolor: '#3b82f615', color: '#3b82f6' }}>
            {siswa.nama.charAt(0).toUpperCase()}
          </Avatar>
          <Box>
            <Typography sx={{ fontWeight: 600, fontSize: 13 }}>{siswa.nama}</Typography>
            <Typography sx={{ fontSize: 11, color: '#94a3b8' }}>{siswa.nis}</Typography>
          </Box>
        </Box>
      </TableCell>
      <TableCell>
        {active ? (
          <Box>
            <Chip label={active.paket?.nama ?? '-'} size="small"
              sx={{ bgcolor: '#dcfce7', color: '#15803d', fontWeight: 600, mb: 0.5 }} />
            <Typography variant="caption" sx={{ display: 'block', color: '#64748b' }}>
              Sisa: {active.sisa_pertemuan ?? '?'}/{active.paket?.jumlah_pertemuan ?? '?'}
            </Typography>
          </Box>
        ) : (
          <Typography variant="body2" sx={{ color: '#94a3b8' }}>—</Typography>
        )}
      </TableCell>
      <TableCell>
        {active ? (
          <Typography variant="caption" sx={{ color: '#94a3b8' }}>
            Sudah memiliki paket aktif
          </Typography>
        ) : (
          <TextField select size="small" value={selectedPaket ?? ''}
            onChange={(e) => onSelectPaket(Number(e.target.value))}
            sx={{ minWidth: 160 }}
            slotProps={{ select: { displayEmpty: true } }}>
            <MenuItem value="" disabled>Pilih Paket</MenuItem>
            {pakets.map((p) => (
              <MenuItem key={p.id} value={p.id}>{p.nama}</MenuItem>
            ))}
          </TextField>
        )}
      </TableCell>
      <TableCell>
        {!active && (
          <Button size="small" variant="contained" disabled={!selectedPaket || isSaving}
            onClick={onAssign}>
            {isSaving ? '...' : 'Simpan'}
          </Button>
        )}
      </TableCell>
    </TableRow>
  )
}
