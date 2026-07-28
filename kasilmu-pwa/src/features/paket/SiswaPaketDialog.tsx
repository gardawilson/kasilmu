import { useState, useEffect } from 'react'
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button,
  Table, TableHead, TableRow, TableCell, TableBody,
  TextField, Typography,
} from '@mui/material'
import { usePaketList, useHargaPaket, useSetHargaPaket } from './usePaket'
import { useKelasDetail } from '../kelas/useKelas'

interface Props {
  open: boolean
  onClose: () => void
  kelasId: number | null
}

export default function SiswaPaketDialog({ open, onClose, kelasId }: Props) {
  const { data: kelasDetail } = useKelasDetail(kelasId ?? 0)
  const { data: paketList } = usePaketList({ per_page: 100 })
  const { data: hargaPaketList } = useHargaPaket(kelasId ?? 0)
  const setHarga = useSetHargaPaket()

  const pakets = paketList?.data ?? []
  const hargaPakets = hargaPaketList?.data ?? []

  const [hargaEdits, setHargaEdits] = useState<Record<number, string>>({})

  useEffect(() => {
    if (open) {
      setHargaEdits({})
    }
  }, [open])

  const handleSaveHarga = async (paketId: number) => {
    if (!kelasId) return
    const value = hargaEdits[paketId]
    if (value === undefined || value === '') return

    await setHarga.mutateAsync({ kelas_id: kelasId, paket_id: paketId, harga: Number(value) })
    setHargaEdits((prev) => {
      const next = { ...prev }
      delete next[paketId]
      return next
    })
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        Atur Harga Paket — {kelasDetail?.data?.nama ?? ''}
      </DialogTitle>
      <DialogContent>
        <Typography variant="body2" sx={{ color: '#64748b', mb: 2 }}>
          Tentukan harga tiap paket pertemuan untuk kelas ini. Harga ini yang dipakai saat siswa mengambil paket, baik lewat pendaftaran siswa baru maupun "Atur Siswa".
        </Typography>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Paket</TableCell>
              <TableCell>Harga Saat Ini</TableCell>
              <TableCell>Ubah Harga</TableCell>
              <TableCell align="center">Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pakets.map((p) => {
              const current = hargaPakets.find((h) => h.paket_id === p.id)
              return (
                <TableRow key={p.id}>
                  <TableCell>{p.nama} ({p.jumlah_pertemuan}x)</TableCell>
                  <TableCell>
                    {current ? `Rp ${Number(current.harga).toLocaleString('id-ID')}` : (
                      <Typography variant="body2" sx={{ color: '#94a3b8' }}>Belum diatur</Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <TextField size="small" type="number" placeholder="Rp"
                      value={hargaEdits[p.id] ?? ''}
                      onChange={(e) => setHargaEdits((prev) => ({ ...prev, [p.id]: e.target.value }))}
                      sx={{ minWidth: 140 }} />
                  </TableCell>
                  <TableCell align="center">
                    <Button size="small" variant="contained"
                      disabled={!hargaEdits[p.id] || setHarga.isPending}
                      onClick={() => handleSaveHarga(p.id)}>
                      Simpan
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Tutup</Button>
      </DialogActions>
    </Dialog>
  )
}
