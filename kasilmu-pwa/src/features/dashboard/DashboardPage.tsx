import { Box, Typography, Paper, Grid, Skeleton } from '@mui/material'
import {
  People, School, Group, Today, CalendarMonth, TrendingUp,
} from '@mui/icons-material'
import { useDashboard } from './useDashboard'

const BULAN = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']

function StatCard({ icon, label, value, color, sub }: {
  icon: React.ReactNode; label: string; value: string | number; color: string; sub?: string
}) {
  return (
    <Paper sx={{ p: 3, height: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <Box>
          <Typography sx={{ fontSize: 16, fontWeight: 600, color: 'text.primary', opacity: 0.7 }}>
            {label}
          </Typography>
          <Typography sx={{ fontSize: 28, fontWeight: 800, color: 'text.primary', mt: 1.25, letterSpacing: '0.5px', lineHeight: 1.1 }}>
            {value}
          </Typography>
        </Box>
        <Box sx={{
          width: 48, height: 48, borderRadius: 3, flexShrink: 0,
          bgcolor: `${color}29`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color,
        }}>
          {icon}
        </Box>
      </Box>
      {sub && (
        <Typography sx={{ fontSize: 14, color: 'text.secondary', mt: 2 }}>{sub}</Typography>
      )}
    </Paper>
  )
}

function AreaChart({ data }: { data: { bulan: number; total: number }[] }) {
  const W = 640
  const H = 240
  const PAD_L = 44
  const PAD_R = 12
  const PAD_T = 12
  const PAD_B = 28
  const innerW = W - PAD_L - PAD_R
  const innerH = H - PAD_T - PAD_B

  const max = Math.max(...data.map((d) => Number(d.total)), 1)
  const stepX = data.length > 1 ? innerW / (data.length - 1) : 0

  const pts = data.map((d, i) => {
    const x = PAD_L + i * stepX
    const y = PAD_T + innerH - (Number(d.total) / max) * innerH
    return [x, y] as const
  })

  const line = pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ')
  const area = `${line} L${pts[pts.length - 1][0].toFixed(1)} ${(PAD_T + innerH).toFixed(1)} L${pts[0][0].toFixed(1)} ${(PAD_T + innerH).toFixed(1)} Z`

  const yTicks = [0, 20, 40, 60, 80, 100]

  return (
    <Box sx={{ width: '100%', overflowX: 'auto' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ minWidth: 480, display: 'block' }}>
        <defs>
          <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4880ff" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#4880ff" stopOpacity="0" />
          </linearGradient>
        </defs>

        {yTicks.map((t) => {
          const y = PAD_T + innerH - (t / 100) * innerH
          return (
            <g key={t}>
              <line x1={PAD_L} y1={y} x2={W - PAD_R} y2={y} stroke="#eef0f4" strokeWidth={1} />
              <text x={PAD_L - 10} y={y + 4} textAnchor="end" fontSize={11} fill="rgba(43,48,52,0.4)">
                {t}%
              </text>
            </g>
          )
        })}

        <path d={area} fill="url(#areaFill)" />
        <path d={line} fill="none" stroke="#4880ff" strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round" />

        {pts.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={3.5} fill="#fff" stroke="#4880ff" strokeWidth={2} />
        ))}

        {data.map((d, i) => (
          <text
            key={i}
            x={PAD_L + i * stepX}
            y={H - 8}
            textAnchor="middle"
            fontSize={11}
            fill="rgba(43,48,52,0.4)"
          >
            {BULAN[d.bulan]}
          </text>
        ))}
      </svg>
    </Box>
  )
}

export default function DashboardPage() {
  const { data, isLoading } = useDashboard()

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 0.5 }}>Dashboard</Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
        Ringkasan data bimbingan belajar
      </Typography>

      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        {isLoading ? (
          [...Array(6)].map((_, i) => (
            <Grid key={i} size={{ xs: 12, sm: 6, md: 4 }}>
              <Paper sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Box sx={{ flex: 1 }}>
                    <Skeleton variant="text" width="60%" height={20} />
                    <Skeleton variant="text" width="45%" height={36} sx={{ mt: 1 }} />
                  </Box>
                  <Skeleton variant="rounded" width={48} height={48} />
                </Box>
              </Paper>
            </Grid>
          ))
        ) : (
          <>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <StatCard icon={<People />} label="Total Siswa" value={Number(data?.total_siswa ?? 0).toLocaleString('id-ID')} color="#8280ff" />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <StatCard icon={<Group />} label="Siswa Aktif" value={Number(data?.total_siswa_aktif ?? 0).toLocaleString('id-ID')} color="#4ad991"
                sub={`dari ${data?.total_siswa ?? 0} siswa`} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <StatCard icon={<School />} label="Pengajar" value={Number(data?.total_tutor ?? 0).toLocaleString('id-ID')} color="#fec53d" />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <StatCard icon={<Group />} label="Kelas Aktif" value={Number(data?.total_kelas_aktif ?? 0).toLocaleString('id-ID')} color="#4880ff" />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <StatCard icon={<Today />} label="Pendapatan Hari Ini"
                value={`Rp ${Number(data?.pendapatan_hari_ini ?? 0).toLocaleString('id-ID')}`}
                color="#ff9066" />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <StatCard icon={<CalendarMonth />} label="Pendapatan Bulan Ini"
                value={`Rp ${Number(data?.pendapatan_bulan_ini ?? 0).toLocaleString('id-ID')}`}
                color="#00b69b" />
            </Grid>
          </>
        )}
      </Grid>

      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
          <TrendingUp sx={{ color: 'primary.main' }} />
          <Typography variant="h6">Pendapatan Per Bulan</Typography>
        </Box>

        {isLoading ? (
          <Skeleton variant="rounded" height={240} />
        ) : !data?.pendapatan_per_bulan?.length ? (
          <Box sx={{ py: 6, textAlign: 'center' }}>
            <Typography color="text.secondary">Belum ada data pendapatan</Typography>
          </Box>
        ) : (
          <AreaChart data={data.pendapatan_per_bulan} />
        )}
      </Paper>
    </Box>
  )
}
