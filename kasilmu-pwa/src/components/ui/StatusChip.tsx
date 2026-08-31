import { Chip } from '@mui/material'
import type { SxProps, Theme } from '@mui/material'

/** Warna label dari UI kit DashStack (Label / Completed, Processing, dst.). */
const TONE: Record<string, string> = {
  green: '#00b69b', // Completed
  purple: '#6226ef', // Processing
  red: '#ef3826', // Rejected
  orange: '#ffa756', // On Hold
  violet: '#ba29ff', // In Transit
  blue: '#4880ff',
  grey: '#8a8a8a',
}

export type StatusTone = keyof typeof TONE

/** Label status gaya DashStack: latar warna 20% + teks warna solid, sudut 4.5px. */
export default function StatusChip({
  label,
  tone = 'grey',
  sx,
}: {
  label: React.ReactNode
  tone?: StatusTone
  sx?: SxProps<Theme>
}) {
  const c = TONE[tone] ?? TONE.grey
  return (
    <Chip
      size="small"
      label={label}
      sx={{
        bgcolor: `${c}33`,
        color: c,
        fontWeight: 700,
        fontSize: 12,
        borderRadius: '4.5px',
        textTransform: 'capitalize',
        ...sx,
      }}
    />
  )
}
