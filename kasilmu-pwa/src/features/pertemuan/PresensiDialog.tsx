import { useState, useEffect } from 'react'
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button,
  Table, TableHead, TableRow, TableCell, TableBody, ToggleButtonGroup,
  ToggleButton, TextField, Box, Typography, Chip, Alert,
} from '@mui/material'
import { CheckCircle, Cancel, Warning } from '@mui/icons-material'
import { usePertemuanDetail, usePresensi, useStorePresensi, useSelesaiPertemuan } from './usePertemuan'
import { useKelasDetail } from '../kelas/useKelas'
import { useAuth } from '../auth/useAuth'

const STATUS_KEHADIRAN = [
  { value: 'hadir', label: 'Hadir', icon: <CheckCircle fontSize="small" />, color: 'success' },
  { value: 'tidak_hadir', label: 'Tidak Hadir', icon: <Cancel fontSize="small" />, color: 'error' },
]

interface Props {
  open: boolean
  onClose: () => void
  pertemuanId: number | null
}

interface PresensiState {
  [siswaId: number]: { status: string; keterangan: string; catatan: string }
}

export default function PresensiDialog({ open, onClose, pertemuanId }: Props) {
  const { user } = useAuth()
  const isAdmin = !!user?.roles?.some((r) => r.name === 'admin')
  const isTutor = !!user?.roles?.some((r) => r.name === 'tutor')
  const { data: pertemuan } = usePertemuanDetail(pertemuanId ?? 0)
  const { data: presensi } = usePresensi(pertemuanId ?? 0)
  const { data: kelasDetail } = useKelasDetail(pertemuan?.data?.kelas_id ?? 0)
  const save = useStorePresensi(pertemuanId ?? 0)
  const selesai = useSelesaiPertemuan()

  const isBerlangsung = pertemuan?.data?.status === 'berlangsung'
  const pertemuanTutorId = pertemuan?.data?.tutor_id
  const isReadOnly = isTutor && !isAdmin && pertemuanTutorId !== null && pertemuanTutorId !== undefined
    && pertemuanTutorId !== user?.tutor?.id

  const [dataSiswa, setDataSiswa] = useState<PresensiState>({})
  const [saved, setSaved] = useState(false)

  const siswaListRaw = kelasDetail?.data?.siswa
  const presensiListRaw = presensi?.data
  const siswaList = siswaListRaw ?? []
  const presensiList = presensiListRaw ?? []

  useEffect(() => {
    if (open) {
      setSaved(false)
      const initial: PresensiState = {}
      for (const s of siswaList) {
        const existing = (presensiList as any[]).find((p) => p.siswa_id === s.id)
        initial[s.id] = {
          status: existing?.status || 'hadir',
          keterangan: existing?.keterangan || '',
          catatan: existing?.catatan || '',
        }
      }
      setDataSiswa(initial)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, siswaListRaw, presensiListRaw])

  const handleSave = async () => {
    const payload = Object.entries(dataSiswa).map(([siswaId, val]) => ({
      siswa_id: Number(siswaId),
      status: val.status,
      keterangan: val.keterangan || undefined,
      catatan: val.catatan || undefined,
    }))
    await save.mutateAsync(payload)
    if (isBerlangsung && pertemuanId) {
      await selesai.mutateAsync(pertemuanId)
    }
    setSaved(true)
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>
        Presensi — {pertemuan?.data?.kelas?.nama ?? ''} (Pertemuan #{pertemuan?.data?.pertemuan_ke})
        <Typography variant="caption" sx={{ display: 'block' }} color="text.secondary">
          Pengajar: {pertemuan?.data?.tutor?.nama ?? '—'} · {pertemuan?.data?.tgl} — {pertemuan?.data?.materi}
        </Typography>
      </DialogTitle>
      <DialogContent>
        {isReadOnly && (
          <Alert severity="info" sx={{ mb: 2 }}>
            Ini pertemuan milik pengajar lain — Anda hanya bisa melihat, tidak bisa mengubah presensinya.
          </Alert>
        )}
        {isBerlangsung && !saved && (
          <Alert severity="info" sx={{ mb: 2 }}>
            Sesi ini masih berlangsung. Isi kehadiran &amp; catatan performa, lalu simpan untuk menandai sesi selesai.
          </Alert>
        )}
        {saved && (
          <Box sx={{ mb: 2, p: 1.5, bgcolor: 'success.light', borderRadius: 1, color: 'success.contrastText' }}>
            {isBerlangsung ? 'Presensi disimpan & pertemuan ditandai selesai!' : 'Presensi berhasil disimpan!'}
          </Box>
        )}
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>NIS</TableCell>
              <TableCell>Nama</TableCell>
              <TableCell>Kehadiran</TableCell>
              <TableCell>Keterangan</TableCell>
              <TableCell>Sisa Kuota</TableCell>
              <TableCell>Catatan Performa Hari Ini</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {siswaList.length === 0 ? (
              <TableRow><TableCell colSpan={6} align="center">Belum ada siswa di kelas ini</TableCell></TableRow>
            ) : (
              siswaList.map((siswa: any) => {
                const presensiData = (presensiList as any[]).find((p) => p.siswa_id === siswa.id)
                const sisa = presensiData?.sisa_pertemuan
                const kuota = presensiData?.kuota

                return (
                <TableRow key={siswa.id}>
                  <TableCell>{siswa.nis}</TableCell>
                  <TableCell>{siswa.nama}</TableCell>
                  <TableCell>
                    <ToggleButtonGroup
                      size="small" color="primary" exclusive
                      disabled={isReadOnly}
                      value={dataSiswa[siswa.id]?.status || 'hadir'}
                      onChange={(_, val) => {
                        if (val) setDataSiswa((prev) => ({
                          ...prev,
                          [siswa.id]: {
                            ...prev[siswa.id],
                            status: val,
                            keterangan: val === 'hadir' ? '' : prev[siswa.id]?.keterangan,
                          },
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
                    {dataSiswa[siswa.id]?.status !== 'hadir' && (
                      <TextField size="small" placeholder="Misal: izin, sakit, alpha"
                        disabled={isReadOnly}
                        value={dataSiswa[siswa.id]?.keterangan || ''}
                        onChange={(e) => setDataSiswa((prev) => ({
                          ...prev,
                          [siswa.id]: { ...prev[siswa.id], keterangan: e.target.value },
                        }))}
                        sx={{ minWidth: 140 }} />
                    )}
                  </TableCell>
                  <TableCell>
                    {sisa !== undefined && kuota !== undefined ? (
                      <Chip
                        icon={sisa <= 2 ? <Warning sx={{ fontSize: 14 }} /> : undefined}
                        label={`${sisa}/${kuota}`}
                        size="small"
                        sx={{
                          fontWeight: 700,
                          ...(sisa <= 0
                            ? { bgcolor: '#fee2e2', color: '#dc2626' }
                            : sisa <= 2
                            ? { bgcolor: '#fef3c7', color: '#b45309' }
                            : { bgcolor: '#dcfce7', color: '#15803d' }),
                        }}
                      />
                    ) : (
                      <Typography variant="caption" sx={{ color: '#94a3b8' }}>—</Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <TextField size="small" placeholder="Misal: sudah paham perkalian, perlu latihan soal cerita"
                      multiline maxRows={2}
                      disabled={isReadOnly}
                      value={dataSiswa[siswa.id]?.catatan || ''}
                      onChange={(e) => setDataSiswa((prev) => ({
                        ...prev,
                        [siswa.id]: { ...prev[siswa.id], catatan: e.target.value },
                      }))}
                      sx={{ minWidth: 260 }} />
                  </TableCell>
                </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Tutup</Button>
        {!isReadOnly && (
          <Button onClick={handleSave} variant="contained" disabled={save.isPending || selesai.isPending || siswaList.length === 0}>
            {save.isPending || selesai.isPending
              ? 'Menyimpan...'
              : isBerlangsung ? 'Simpan & Tandai Selesai' : 'Simpan Presensi'}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  )
}
