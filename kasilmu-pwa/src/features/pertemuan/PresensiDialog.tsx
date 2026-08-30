import { useState, useEffect } from 'react'
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button,
  Table, TableHead, TableRow, TableCell, TableBody, ToggleButtonGroup,
  ToggleButton, TextField, Typography, Chip, Alert,
} from '@mui/material'
import { CheckCircle, Cancel, Warning } from '@mui/icons-material'
import { usePertemuanDetail, usePresensi, useStorePresensi, useSelesaiPertemuan } from './usePertemuan'
import { useKelasDetail } from '../kelas/useKelas'
import { useAuth } from '../auth/useAuth'

const STATUS_KEHADIRAN = [
  { value: 'hadir', icon: <CheckCircle fontSize="small" /> },
  { value: 'tidak_hadir', icon: <Cancel fontSize="small" /> },
]

/**
 * - `absensi`   : dipakai tepat setelah "Mulai Mengajar" — hanya kehadiran, tanpa catatan performa.
 * - `catatan`   : dipakai lewat tombol "Selesaikan" — isi catatan performa, lalu tandai pertemuan selesai.
 * - `full`      : lihat / ubah semuanya (pertemuan yang sudah selesai).
 */
type PresensiMode = 'absensi' | 'catatan' | 'full'

interface Props {
  open: boolean
  onClose: () => void
  pertemuanId: number | null
  mode?: PresensiMode
}

interface PresensiState {
  [siswaId: number]: { status: string; keterangan: string; catatan: string }
}

export default function PresensiDialog({ open, onClose, pertemuanId, mode = 'full' }: Props) {
  const { user } = useAuth()
  const isAdmin = !!user?.roles?.some((r) => r.name === 'admin')
  const isTutor = !!user?.roles?.some((r) => r.name === 'tutor')
  const { data: pertemuan } = usePertemuanDetail(pertemuanId ?? 0)
  const { data: presensi } = usePresensi(pertemuanId ?? 0)
  const { data: kelasDetail } = useKelasDetail(pertemuan?.data?.kelas_id ?? 0)
  const save = useStorePresensi(pertemuanId ?? 0)
  const selesai = useSelesaiPertemuan()

  const pertemuanTutorId = pertemuan?.data?.tutor_id
  const isReadOnly = isTutor && !isAdmin && pertemuanTutorId !== null && pertemuanTutorId !== undefined
    && pertemuanTutorId !== user?.tutor?.id

  const showKehadiran = mode !== 'catatan'
  const showCatatan = mode !== 'absensi'
  const editKehadiran = mode !== 'catatan' && !isReadOnly

  const [dataSiswa, setDataSiswa] = useState<PresensiState>({})

  const siswaListRaw = kelasDetail?.data?.siswa
  const presensiListRaw = presensi?.data
  const siswaList = siswaListRaw ?? []
  const presensiList = presensiListRaw ?? []

  useEffect(() => {
    if (open) {
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
      catatan: val.status === 'hadir' ? (val.catatan || undefined) : undefined,
    }))
    await save.mutateAsync(payload)
    if (mode === 'catatan' && pertemuanId) {
      await selesai.mutateAsync(pertemuanId)
    }
    onClose()
  }

  const title = mode === 'absensi'
    ? 'Absensi Siswa'
    : mode === 'catatan'
      ? 'Catatan Performa'
      : 'Presensi'
  const saveLabel = mode === 'catatan' ? 'Selesaikan' : mode === 'absensi' ? 'Simpan Absensi' : 'Simpan Presensi'
  const busy = save.isPending || selesai.isPending

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>
        {title} — {pertemuan?.data?.kelas?.nama ?? ''} (Pertemuan #{pertemuan?.data?.pertemuan_ke})
        <Typography variant="caption" sx={{ display: 'block' }} color="text.secondary">
          Pengajar: {pertemuan?.data?.tutor?.nama ?? '—'} · {pertemuan?.data?.tgl}
        </Typography>
      </DialogTitle>
      <DialogContent>
        {isReadOnly && (
          <Alert severity="info" sx={{ mb: 2 }}>
            Ini pertemuan milik pengajar lain — Anda hanya bisa melihat.
          </Alert>
        )}
        {mode === 'absensi' && !isReadOnly && (
          <Alert severity="info" sx={{ mb: 2 }}>
            Tandai kehadiran tiap siswa lalu simpan. Catatan performa diisi nanti lewat tombol "Selesaikan".
          </Alert>
        )}
        {mode === 'catatan' && !isReadOnly && (
          <Alert severity="info" sx={{ mb: 2 }}>
            Isi catatan performa tiap siswa, lalu klik "Selesaikan" untuk menandai pertemuan selesai.
          </Alert>
        )}

        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>NIS</TableCell>
              <TableCell>Nama</TableCell>
              {showKehadiran && <TableCell>Kehadiran</TableCell>}
              {showKehadiran && <TableCell>Keterangan</TableCell>}
              {mode === 'catatan' && <TableCell>Kehadiran</TableCell>}
              <TableCell>Sisa Kuota</TableCell>
              {showCatatan && <TableCell>Catatan Performa Hari Ini</TableCell>}
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
                const row = dataSiswa[siswa.id]

                return (
                  <TableRow key={siswa.id}>
                    <TableCell>{siswa.nis}</TableCell>
                    <TableCell>{siswa.nama}</TableCell>

                    {showKehadiran && (
                      <TableCell>
                        <ToggleButtonGroup
                          size="small" color="primary" exclusive
                          disabled={!editKehadiran}
                          value={row?.status || 'hadir'}
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
                    )}
                    {showKehadiran && (
                      <TableCell>
                        {row?.status !== 'hadir' && (
                          <TextField size="small" placeholder="Misal: izin, sakit, alpha"
                            disabled={isReadOnly}
                            value={row?.keterangan || ''}
                            onChange={(e) => setDataSiswa((prev) => ({
                              ...prev,
                              [siswa.id]: { ...prev[siswa.id], keterangan: e.target.value },
                            }))}
                            sx={{ minWidth: 140 }} />
                        )}
                      </TableCell>
                    )}

                    {mode === 'catatan' && (
                      <TableCell>
                        <Chip
                          size="small"
                          label={row?.status === 'hadir' ? 'Hadir' : `Tidak Hadir${row?.keterangan ? ` · ${row.keterangan}` : ''}`}
                          sx={{
                            fontWeight: 700, borderRadius: '4.5px',
                            ...(row?.status === 'hadir'
                              ? { bgcolor: 'rgba(0,182,155,0.2)', color: '#00b69b' }
                              : { bgcolor: 'rgba(239,56,38,0.16)', color: '#ef3826' }),
                          }}
                        />
                      </TableCell>
                    )}

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

                    {showCatatan && (
                      <TableCell>
                        <TextField size="small"
                          placeholder={row?.status === 'hadir'
                            ? 'Misal: sudah paham perkalian, perlu latihan soal cerita'
                            : 'Siswa tidak hadir'}
                          multiline maxRows={3} fullWidth
                          disabled={isReadOnly || row?.status !== 'hadir'}
                          value={row?.status === 'hadir' ? (row?.catatan || '') : ''}
                          onChange={(e) => setDataSiswa((prev) => ({
                            ...prev,
                            [siswa.id]: { ...prev[siswa.id], catatan: e.target.value },
                          }))}
                          sx={{ minWidth: 260 }} />
                      </TableCell>
                    )}
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
          <Button onClick={handleSave} variant="contained" disabled={busy || siswaList.length === 0}>
            {busy ? 'Menyimpan...' : saveLabel}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  )
}
