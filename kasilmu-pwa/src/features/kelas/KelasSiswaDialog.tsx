import { useState } from 'react'
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button,
  Table, TableHead, TableRow, TableCell, TableBody, IconButton,
  TextField, MenuItem, Box, Typography, Alert,
} from '@mui/material'
import { Delete, Add } from '@mui/icons-material'
import { useKelasDetail, useAddSiswaKelas, useRemoveSiswaKelas } from './useKelas'
import { useSiswa } from '../siswa/useSiswa'

interface Props {
  open: boolean
  onClose: () => void
  kelasId: number | null
}

export default function KelasSiswaDialog({ open, onClose, kelasId }: Props) {
  const { data: detail, isLoading } = useKelasDetail(kelasId ?? 0)
  const { data: allSiswa } = useSiswa({ per_page: 100 })
  const add = useAddSiswaKelas(kelasId ?? 0)
  const remove = useRemoveSiswaKelas(kelasId ?? 0)
  const [selectedSiswa, setSelectedSiswa] = useState('')

  const handleAdd = async () => {
    if (!selectedSiswa) return
    await add.mutateAsync(Number(selectedSiswa))
    setSelectedSiswa('')
  }

  const siswaTerdaftar = detail?.data?.siswa ?? []
  const kapasitas = detail?.data?.kapasitas ?? Infinity
  const isFull = siswaTerdaftar.length >= kapasitas

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {detail?.data?.nama ?? 'Kelas'} — Daftar Siswa
      </DialogTitle>
      <DialogContent>
        {isLoading ? (
          <Typography>Memuat...</Typography>
        ) : (
          <>
            {isFull && (
              <Alert severity="warning" sx={{ mb: 2 }}>
                Kelas sudah penuh ({siswaTerdaftar.length}/{kapasitas})
              </Alert>
            )}
            <Box sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'center' }}>
              <TextField select size="small" sx={{ minWidth: 250 }}
                label="Tambah Siswa" value={selectedSiswa} disabled={isFull}
                onChange={(e) => setSelectedSiswa(e.target.value)}
                slotProps={{ select: { displayEmpty: true } }}>
                <MenuItem value="" disabled>-- Pilih Siswa --</MenuItem>
                {allSiswa?.data
                  ?.filter((s) => !siswaTerdaftar.some((ts: any) => ts.id === s.id))
                  .map((s) => (
                    <MenuItem key={s.id} value={s.id}>{s.nama} ({s.nis})</MenuItem>
                  ))}
              </TextField>
              <Button variant="contained" size="small" startIcon={<Add />}
                onClick={handleAdd} disabled={isFull || !selectedSiswa || add.isPending}>
                Tambah
              </Button>
            </Box>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>NIS</TableCell>
                  <TableCell>Nama</TableCell>
                  <TableCell>Sekolah</TableCell>
                  <TableCell align="center">Aksi</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {siswaTerdaftar.length === 0 ? (
                  <TableRow><TableCell colSpan={4} align="center">Belum ada siswa</TableCell></TableRow>
                ) : (
                  siswaTerdaftar.map((siswa: any) => (
                    <TableRow key={siswa.id}>
                      <TableCell>{siswa.nis}</TableCell>
                      <TableCell>{siswa.nama}</TableCell>
                      <TableCell>{siswa.sekolah?.nama || '-'}</TableCell>
                      <TableCell align="center">
                        <IconButton size="small" color="error"
                          onClick={() => remove.mutateAsync(siswa.id)} disabled={remove.isPending}>
                          <Delete fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Tutup</Button>
      </DialogActions>
    </Dialog>
  )
}
