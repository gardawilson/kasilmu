import { useState, useEffect } from 'react'
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button,
  Table, TableHead, TableRow, TableCell, TableBody, ToggleButtonGroup,
  ToggleButton, TextField, Box, Typography,
} from '@mui/material'
import { CheckCircle, Cancel, MedicalServices, HelpOutlined } from '@mui/icons-material'
import { usePertemuanDetail, usePresensi, useStorePresensi } from './usePertemuan'
import { useKelasDetail } from '../kelas/useKelas'

const STATUS_KEHADIRAN = [
  { value: 'hadir', label: 'Hadir', icon: <CheckCircle fontSize="small" />, color: 'success' },
  { value: 'izin', label: 'Izin', icon: <MedicalServices fontSize="small" />, color: 'info' },
  { value: 'sakit', label: 'Sakit', icon: <HelpOutlined fontSize="small" />, color: 'warning' },
  { value: 'alpha', label: 'Alpha', icon: <Cancel fontSize="small" />, color: 'error' },
]

interface Props {
  open: boolean
  onClose: () => void
  pertemuanId: number | null
}

interface PresensiState {
  [siswaId: number]: { status: string; keterangan: string }
}

export default function PresensiDialog({ open, onClose, pertemuanId }: Props) {
  const { data: pertemuan } = usePertemuanDetail(pertemuanId ?? 0)
  const { data: presensi } = usePresensi(pertemuanId ?? 0)
  const { data: kelasDetail } = useKelasDetail(pertemuan?.data?.kelas_id ?? 0)
  const save = useStorePresensi(pertemuanId ?? 0)

  const [dataSiswa, setDataSiswa] = useState<PresensiState>({})
  const [saved, setSaved] = useState(false)

  const siswaList = kelasDetail?.data?.siswa ?? []
  const presensiList = presensi?.data ?? []

  useEffect(() => {
    if (open) {
      setSaved(false)
      const initial: PresensiState = {}
      for (const s of siswaList) {
        const existing = (presensiList as any[]).find((p) => p.siswa_id === s.id)
        initial[s.id] = {
          status: existing?.status || 'hadir',
          keterangan: existing?.keterangan || '',
        }
      }
      setDataSiswa(initial)
    }
  }, [open, siswaList, presensiList])

  const handleSave = async () => {
    const payload = Object.entries(dataSiswa).map(([siswaId, val]) => ({
      siswa_id: Number(siswaId),
      status: val.status,
      keterangan: val.keterangan || undefined,
    }))
    await save.mutateAsync(payload)
    setSaved(true)
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        Presensi — {pertemuan?.data?.kelas?.nama ?? ''} (Pertemuan #{pertemuan?.data?.pertemuan_ke})
        <Typography variant="caption" sx={{ display: 'block' }} color="text.secondary">
          {pertemuan?.data?.tgl} — {pertemuan?.data?.materi}
        </Typography>
      </DialogTitle>
      <DialogContent>
        {saved && (
          <Box sx={{ mb: 2, p: 1.5, bgcolor: 'success.light', borderRadius: 1, color: 'success.contrastText' }}>
            Presensi berhasil disimpan!
          </Box>
        )}
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>NIS</TableCell>
              <TableCell>Nama</TableCell>
              <TableCell>Kehadiran</TableCell>
              <TableCell>Keterangan</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {siswaList.length === 0 ? (
              <TableRow><TableCell colSpan={4} align="center">Belum ada siswa di kelas ini</TableCell></TableRow>
            ) : (
              siswaList.map((siswa: any) => (
                <TableRow key={siswa.id}>
                  <TableCell>{siswa.nis}</TableCell>
                  <TableCell>{siswa.nama}</TableCell>
                  <TableCell>
                    <ToggleButtonGroup
                      size="small" color="primary" exclusive
                      value={dataSiswa[siswa.id]?.status || 'hadir'}
                      onChange={(_, val) => {
                        if (val) setDataSiswa((prev) => ({
                          ...prev,
                          [siswa.id]: { ...prev[siswa.id], status: val },
                        }))
                      }}
                    >
                      {STATUS_KEHADIRAN.map((sk) => (
                        <ToggleButton key={sk.value} value={sk.value} sx={{ px: 1.5 }}>
                          {sk.icon}
                        </ToggleButton>
                      ))}
                    </ToggleButtonGroup>
                  </TableCell>
                  <TableCell>
                    <TextField size="small" placeholder="Keterangan"
                      value={dataSiswa[siswa.id]?.keterangan || ''}
                      onChange={(e) => setDataSiswa((prev) => ({
                        ...prev,
                        [siswa.id]: { ...prev[siswa.id], keterangan: e.target.value },
                      }))}
                      sx={{ minWidth: 140 }} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Tutup</Button>
        <Button onClick={handleSave} variant="contained" disabled={save.isPending || siswaList.length === 0}>
          {save.isPending ? 'Menyimpan...' : 'Simpan Presensi'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
