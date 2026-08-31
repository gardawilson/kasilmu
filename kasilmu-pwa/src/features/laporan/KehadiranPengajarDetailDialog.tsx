import { useMemo, useState } from 'react'
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button,
  Box, Typography, IconButton, Chip,
} from '@mui/material'
import { ChevronLeft, ChevronRight } from '@mui/icons-material'
import { useLaporanKehadiranPengajarDetail, type PengajarDetailItem } from './useLaporan'

interface Props {
  open: boolean
  onClose: () => void
  tutor: { id: number; nama: string; nip?: string } | null
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

export default function KehadiranPengajarDetailDialog({ open, onClose, tutor, kelasId }: Props) {
  const { data, isLoading } = useLaporanKehadiranPengajarDetail(open ? tutor?.id ?? null : null, {
    kelas_id: kelasId || undefined,
  })

  const sesi = data?.pertemuan ?? []

  const byDate = useMemo(() => {
    const m = new Map<string, PengajarDetailItem[]>()
    for (const p of sesi) {
      const key = p.tgl.slice(0, 10)
      if (!m.has(key)) m.set(key, [])
      m.get(key)!.push(p)
    }
    return m
  }, [sesi])

  const monthsWithData = useMemo(() => {
    const s = new Set<string>()
    for (const p of sesi) s.add(p.tgl.slice(0, 7))
    return [...s].sort()
  }, [sesi])

  const [cursor, setCursor] = useState<Date | null>(null)
  const month = cursor ?? (monthsWithData.length
    ? new Date(`${monthsWithData[monthsWithData.length - 1]}-01T00:00:00`)
    : new Date(new Date().getFullYear(), new Date().getMonth(), 1))

  const firstDay = new Date(month.getFullYear(), month.getMonth(), 1)
  const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate()
  const leadBlanks = firstDay.getDay()

  const monthSesi = sesi.filter((p) => p.tgl.slice(0, 7) === ymKey(month))
  const hariMengajar = new Set(monthSesi.map((p) => p.tgl.slice(0, 10))).size

  const shift = (delta: number) =>
    setCursor(new Date(month.getFullYear(), month.getMonth() + delta, 1))

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        Kehadiran Mengajar — {tutor?.nama ?? ''}
        {tutor?.nip && (
          <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary' }}>
            {tutor.nip}
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
          <Chip size="small" label={`${monthSesi.length} sesi`}
            sx={{ fontWeight: 700, borderRadius: '4.5px', bgcolor: 'rgba(72,128,255,0.16)', color: '#4880ff' }} />
          <Chip size="small" label={`${hariMengajar} hari mengajar`}
            sx={{ fontWeight: 700, borderRadius: '4.5px', bgcolor: 'rgba(0,182,155,0.2)', color: '#00b69b' }} />
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
            const count = entries.length

            const titleParts = entries.map((e, idx) =>
              `Sesi ${idx + 1}${e.kelas ? ` — ${e.kelas}` : ''} (pertemuan ke-${e.pertemuan_ke})`)

            return (
              <Box
                key={key}
                title={titleParts.join('\n')}
                sx={{
                  aspectRatio: '1 / 1',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  position: 'relative',
                }}
              >
                <Box sx={{
                  width: 34, height: 34, borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 13, fontWeight: 600,
                  ...(count
                    ? { bgcolor: '#4880ff', color: '#fff' }
                    : { color: '#334155' }),
                }}>
                  {day}
                </Box>
                {count > 1 && (
                  <Box sx={{
                    position: 'absolute', top: 0, right: 2,
                    minWidth: 16, height: 16, px: '3px',
                    borderRadius: '999px',
                    bgcolor: '#00b69b', color: '#fff',
                    fontSize: 10, fontWeight: 800,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: '1.5px solid #fff',
                  }}>
                    {count}×
                  </Box>
                )}
              </Box>
            )
          })}
        </Box>

        {!isLoading && sesi.length === 0 && (
          <Typography sx={{ mt: 2, textAlign: 'center', color: '#94a3b8', fontSize: 14 }}>
            Belum ada sesi mengajar untuk pengajar ini
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Tutup</Button>
      </DialogActions>
    </Dialog>
  )
}
