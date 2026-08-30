import { Box, IconButton, Tooltip } from '@mui/material'

const TONE = {
  default: '#5c5c5c',
  primary: '#4880ff',
  success: '#00b69b',
  error: '#ef3826',
} as const

export interface RowAction {
  icon: React.ReactNode
  tooltip: string
  onClick: () => void
  tone?: keyof typeof TONE
  disabled?: boolean
  hidden?: boolean
}

/**
 * Kolom aksi baris gaya DashStack (node 0:16714): tombol ikon digabung dalam
 * satu kotak ber-border, dipisah garis tipis. Aksi hapus biasanya `tone="error"`.
 */
export default function RowActions({ actions }: { actions: RowAction[] }) {
  const items = actions.filter((a) => !a.hidden)
  if (!items.length) {
    return <Box component="span" sx={{ color: '#cbd5e1' }}>—</Box>
  }

  return (
    <Box
      sx={{
        display: 'inline-flex',
        border: '0.6px solid #d5d5d5',
        borderRadius: '6px',
        overflow: 'hidden',
        bgcolor: '#fff',
        '& > span:not(:first-of-type)': { borderLeft: '0.6px solid #e6e6e6' },
      }}
    >
      {items.map((a, i) => (
        <Tooltip key={i} title={a.tooltip}>
          <Box component="span" sx={{ display: 'inline-flex' }}>
            <IconButton
              size="small"
              disabled={a.disabled}
              onClick={a.onClick}
              sx={{
                borderRadius: 0,
                width: 34,
                height: 30,
                color: TONE[a.tone ?? 'default'],
                '&:hover': { bgcolor: '#f5f6fa' },
                '& svg': { fontSize: 17 },
              }}
            >
              {a.icon}
            </IconButton>
          </Box>
        </Tooltip>
      ))}
    </Box>
  )
}
