import { Box, Paper, Typography, IconButton } from '@mui/material'
import { ChevronLeft, ChevronRight } from '@mui/icons-material'

const pagerBtnSx = {
  border: '1px solid #e2e2e6',
  borderRadius: '6px',
  color: '#202224',
}

/**
 * Kartu tabel gaya DashStack: border tipis + sudut 14px + scroll horizontal,
 * dengan footer opsional "Menampilkan X–Y dari Z" + navigasi halaman.
 */
export default function DataTableCard({
  children,
  minWidth = 900,
  page,
  lastPage = 1,
  total = 0,
  perPage = 10,
  onPageChange,
}: {
  children: React.ReactNode
  minWidth?: number
  page?: number
  lastPage?: number
  total?: number
  perPage?: number
  onPageChange?: (page: number) => void
}) {
  const showFooter = page != null && !!onPageChange
  const cur = page ?? 1
  const from = total === 0 ? 0 : (cur - 1) * perPage + 1
  const to = Math.min(cur * perPage, total)

  return (
    <Paper sx={{ border: '1px solid #ededf1', borderRadius: '14px', overflow: 'hidden' }}>
      <Box sx={{ overflowX: 'auto' }}>
        <Box sx={{ minWidth }}>{children}</Box>
      </Box>

      {showFooter && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            px: 2.5,
            py: 1.75,
            borderTop: '1px solid #ededf1',
          }}
        >
          <Typography sx={{ fontSize: 14, fontWeight: 600, color: 'rgba(32,34,36,0.6)' }}>
            Menampilkan {from}–{to} dari {total}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton
              size="small"
              disabled={cur <= 1}
              onClick={() => onPageChange!(Math.max(1, cur - 1))}
              sx={pagerBtnSx}
            >
              <ChevronLeft fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              disabled={cur >= lastPage}
              onClick={() => onPageChange!(Math.min(lastPage, cur + 1))}
              sx={pagerBtnSx}
            >
              <ChevronRight fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      )}
    </Paper>
  )
}
