import { useMemo, useState } from 'react'
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button,
  Box, Typography, IconButton, Chip,
} from '@mui/material'
import { ChevronLeft, ChevronRight } from '@mui/icons-material'
import { useLaporanKehadiranDetail, type KehadiranDetailItem } from './useLaporan'

interface Props {
  open: boolean
  onClose: () => void
  siswa: { id: number; nama: string; nis?: string } | null
  kelasId?: string
}

const HARI = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab']
const BULAN = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
]

function ymKey(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
}

export default function KehadiranDetailDialog({ open, onClose, siswa, kelasId }: Props) {
  const { data, isLoading } = useLaporanKehadiranDetail(open ? siswa?.id ?? null : null, {
    kelas_id: kelasId || undefined,
  })

  const presensi = data?.presensi ?? []

  // Map "YYYY-MM-DD" -> entri presensi pada tanggal itu.
  const byDate = useMemo(() => {
    const m = new Map<string, KehadiranDetailItem[]>()
    for (const p of presensi) {
      const key = p.tgl.slice(0, 10)
      if (!m.has(key)) m.set(key, [])
      m.get(key)!.push(p)
    }
    return m
  }, [presensi])

  const monthsWithData = useMemo(() => {
    const s = new Set<string>()
    for (const p of presensi) s.add(p.tgl.slice(0, 7))
    return [...s].sort()
  }, [presensi])

  const [cursor, setCursor] = useState<Date | null>(null)
  const month = cursor ?? (monthsWithData.length
    ? new Date(`${monthsWithData[monthsWithData.length - 1]}-01T00:00:00`)
    : new Date(new Date().getFullYear(), new Date().getMonth(), 1))

  const firstDay = new Date(month.getFullYear(), month.getMonth(), 1)
  const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate()
  const leadBlanks = firstDay.getDay()

  const monthStats = presensi.filter((p) => p.tgl.slice(0, 7) === ymKey(month))
  const hadirCount = monthStats.filter((p) => p.status === 'hadir').length
  const tidakCount = monthStats.filter((p) => p.status === 'tidak_hadir').length

  const shift = (delta: number) =>
    setCursor(new Date(month.getFullYear(), month.getMonth() + delta, 1))

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        Kehadiran — {siswa?.nama ?? ''}
        {siswa?.nis && (
          <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary' }}>
            {siswa.nis}
          </Typography>
        )}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <IconButton size="small" onClick={() => shift(-1)}
            sx={{ border: '1px solid #e2e2e6', borderRadius: '6px' }}>
            <ChevronLeft fontSize="small" />
          </IconButton>
          <Typography sx={{ fontWeight: 700, fontSize: 16 }}>
            {BULAN[month.getMonth()]} {month.getFullYear()}
          </Typography>
          <IconButton size="small" onClick={() => shift(1)}
            sx={{ border: '1px solid #e2e2e6', borderRadius: '6px' }}>
            <ChevronRight fontSize="small" />
          </IconButton>
        </Box>

        <Box sx={{ display: 'flex', gap: 1, mb: 1.5 }}>
          <Chip size="small" label={`Hadir ${hadirCount}`}
            sx={{ fontWeight: 700, borderRadius: '4.5px', bgcolor: 'rgba(0,182,155,0.2)', color: '#00b69b' }} />
          <Chip size="small" label={`Tidak hadir ${tidakCount}`}
            sx={{ fontWeight: 700, borderRadius: '4.5px', bgcolor: 'rgba(239,56,38,0.16)', color: '#ef3826' }} />
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 0.75 }}>
          {HARI.map((h) => (
            <Typography key={h} sx={{ textAlign: 'center', fontSize: 11, fontWeight: 700, color: '#94a3b8', py: 0.5 }}>
              {h}
            </Typography>
          ))}
          {Array.from({ length: leadBlanks }).map((_, i) => <Box key={`b${i}`} />)}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1
            const key = `${ymKey(month)}-${String(day).padStart(2, '0')}`
            const entries = byDate.get(key) ?? []
            const hasHadir = entries.some((e) => e.status === 'hadir')
            const hasTidak = entries.some((e) => e.status === 'tidak_hadir')
            const tone = hasHadir && !hasTidak
              ? { bgcolor: '#00b69b', color: '#fff' }
              : hasTidak && !hasHadir
                ? { bgcolor: '#ef3826', color: '#fff' }
                : entries.length
                  ? { bgcolor: '#ffa756', color: '#fff' }
                  : { bgcolor: 'transparent', color: '#334155' }

            const titleParts = entries.map((e) =>
              `${e.status === 'hadir' ? 'Hadir' : 'Tidak hadir'}${e.keterangan ? ` (${e.keterangan})` : ''}`
              + `${e.kelas ? ` — ${e.kelas}` : ''}`)

            return (
              <Box
                key={key}
                title={titleParts.join('\n')}
                sx={{
                  aspectRatio: '1 / 1',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <Box sx={{
                  width: 34, height: 34, borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 13, fontWeight: 600,
                  ...tone,
                }}>
                  {day}
                </Box>
              </Box>
            )
          })}
        </Box>

        {!isLoading && presensi.length === 0 && (
          <Typography sx={{ mt: 2, textAlign: 'center', color: '#94a3b8', fontSize: 14 }}>
            Belum ada data presensi untuk siswa ini
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Tutup</Button>
      </DialogActions>
    </Dialog>
  )
}
