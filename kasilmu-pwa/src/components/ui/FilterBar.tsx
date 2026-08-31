import { Children, isValidElement } from 'react'
import { Box, Paper, Typography, Button } from '@mui/material'
import { FilterAltOutlined, Replay } from '@mui/icons-material'

/** Style untuk field inline di dalam FilterBar (pakai `variant="standard"`). */
export const filterFieldSx = {
  minWidth: 130,
  '& input': { fontSize: 14, fontWeight: 700, py: 0.5, color: '#202224' },
  '& .MuiSelect-select': { fontSize: 14, fontWeight: 700, py: 0.5, color: '#202224' },
  '& .MuiSvgIcon-root': { color: '#7a7a7a' },
}
export const filterFieldSlotProps = { input: { disableUnderline: true } } as const

function Divider() {
  return <Box sx={{ width: '1px', height: 26, bgcolor: '#e6e6ea', flexShrink: 0 }} />
}

/**
 * Bilah filter gaya DashStack (node 0:17911): kotak #f9f9fb, border 0.6px #d5d5d5,
 * sudut 14px — ikon corong, "Filter By", tiap segmen dipisah garis vertikal,
 * diakhiri "Reset Filter" merah.
 */
export default function FilterBar({
  children,
  onReset,
  resetDisabled,
}: {
  children: React.ReactNode
  onReset?: () => void
  resetDisabled?: boolean
}) {
  const segments = Children.toArray(children).filter(isValidElement)

  return (
    <Paper
      elevation={0}
      sx={{
        bgcolor: '#f9f9fb',
        border: '1px solid #e6e6ea',
        borderRadius: '14px',
        boxShadow: 'none',
        px: 2.5,
        py: 1,
        mb: 2.5,
        // Lebar mengikuti isi filter, bukan selebar layar (sesuai DashStack).
        width: 'fit-content',
        maxWidth: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        flexWrap: 'wrap',
        rowGap: 1,
      }}
    >
      <FilterAltOutlined sx={{ fontSize: 22, color: '#202224', flexShrink: 0 }} />
      <Divider />
      <Typography sx={{ fontWeight: 700, fontSize: 14, color: '#202224', flexShrink: 0 }}>
        Filter By
      </Typography>

      {segments.map((seg, i) => (
        <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Divider />
          {seg}
        </Box>
      ))}

      {onReset && (
        <>
          <Divider />
          <Button
            startIcon={<Replay sx={{ fontSize: 18 }} />}
            onClick={onReset}
            disabled={resetDisabled}
            sx={{
              color: '#ea0234',
              fontWeight: 600,
              fontSize: 14,
              flexShrink: 0,
              '&.Mui-disabled': { color: '#c9a9b0' },
            }}
          >
            Reset Filter
          </Button>
        </>
      )}
    </Paper>
  )
}
