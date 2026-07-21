import { Box, Typography, Paper, Grid, Skeleton } from '@mui/material'
import {
  People, School, Group, TrendingUp, Today, CalendarMonth,
} from '@mui/icons-material'
import { useDashboard } from './useDashboard'

const BULAN = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']

function StatCard({ icon, label, value, color, sub }: {
  icon: React.ReactNode; label: string; value: string | number; color: string; sub?: string
}) {
  return (
    <Paper sx={{ p: 3, position: 'relative', overflow: 'hidden' }}>
      <Box sx={{
        position: 'absolute', right: -16, top: -16,
        width: 88, height: 88, borderRadius: '50%',
        bgcolor: `${color}0d`,
      }} />
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
        <Box sx={{
          width: 48, height: 48, borderRadius: 2, flexShrink: 0,
          background: `linear-gradient(135deg, ${color}22 0%, ${color}44 100%)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color,
        }}>
          {icon}
        </Box>
        <Box>
          <Typography sx={{ fontSize: 13, color: '#64748b', fontWeight: 500, mb: 0.5 }}>
            {label}
          </Typography>
          <Typography sx={{ fontSize: 26, fontWeight: 800, color: '#0f172a', lineHeight: 1 }}>
            {value}
          </Typography>
          {sub && (
            <Typography sx={{ fontSize: 11, color: '#94a3b8', mt: 0.5 }}>{sub}</Typography>
          )}
        </Box>
      </Box>
    </Paper>
  )
}

export default function DashboardPage() {
  const { data, isLoading } = useDashboard()

  const maxPendapatan = Math.max(
    ...(data?.pendapatan_per_bulan?.map((p) => Number(p.total)) || [0]), 1
  )

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5">Dashboard</Typography>
        <Typography variant="body2" sx={{ color: '#64748b', mt: 0.5 }}>
          Ringkasan data bimbingan belajar
        </Typography>
      </Box>

      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        {isLoading ? (
          [...Array(6)].map((_, i) => (
            <Grid key={i} size={{ xs: 12, sm: 6, md: 4 }}>
              <Paper sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Skeleton variant="rounded" width={48} height={48} />
                  <Box sx={{ flex: 1 }}>
                    <Skeleton variant="text" width="60%" height={18} />
                    <Skeleton variant="text" width="40%" height={32} sx={{ mt: 0.5 }} />
                  </Box>
                </Box>
              </Paper>
            </Grid>
          ))
        ) : (
          <>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <StatCard icon={<People />} label="Total Siswa" value={data?.total_siswa ?? 0} color="#3b82f6" />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <StatCard icon={<Group />} label="Siswa Aktif" value={data?.total_siswa_aktif ?? 0} color="#10b981"
                sub={`dari ${data?.total_siswa ?? 0} siswa`} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <StatCard icon={<School />} label="Pengajar" value={data?.total_tutor ?? 0} color="#8b5cf6" />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <StatCard icon={<Group />} label="Kelas Aktif" value={data?.total_kelas_aktif ?? 0} color="#0d9488" />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <StatCard icon={<Today />} label="Pendapatan Hari Ini"
                value={`Rp ${Number(data?.pendapatan_hari_ini ?? 0).toLocaleString('id-ID')}`}
                color="#f59e0b" />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <StatCard icon={<CalendarMonth />} label="Pendapatan Bulan Ini"
                value={`Rp ${Number(data?.pendapatan_bulan_ini ?? 0).toLocaleString('id-ID')}`}
                color="#f97316" />
            </Grid>
          </>
        )}
      </Grid>

      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
          <TrendingUp sx={{ color: '#0d9488' }} />
          <Typography variant="h6">Pendapatan Per Bulan</Typography>
        </Box>

        {isLoading ? (
          <Skeleton variant="rounded" height={160} />
        ) : !data?.pendapatan_per_bulan?.length ? (
          <Box sx={{ py: 6, textAlign: 'center' }}>
            <Typography color="text.secondary">Belum ada data pendapatan</Typography>
          </Box>
        ) : (
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 1, height: 180, px: 1 }}>
              {data.pendapatan_per_bulan.map((p) => {
                const height = Math.max((Number(p.total) / maxPendapatan) * 150, 6)
                return (
                  <Box key={p.bulan} sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
                    <Typography sx={{ fontSize: 10, color: '#94a3b8', whiteSpace: 'nowrap' }}>
                      {Number(p.total) >= 1_000_000
                        ? `${(Number(p.total) / 1_000_000).toFixed(1)}jt`
                        : `${Math.round(Number(p.total) / 1000)}rb`}
                    </Typography>
                    <Box sx={{
                      width: '100%', maxWidth: 40, borderRadius: '6px 6px 0 0',
                      height: `${height}px`,
                      background: 'linear-gradient(180deg, #0d9488 0%, #0f766e 100%)',
                      transition: 'height 0.4s ease',
                      cursor: 'default',
                      '&:hover': { opacity: 0.85 },
                    }} />
                  </Box>
                )
              })}
            </Box>
            <Box sx={{ display: 'flex', gap: 1, px: 1, borderTop: '1px solid #f1f5f9', pt: 1, mt: 0 }}>
              {data.pendapatan_per_bulan.map((p) => (
                <Box key={p.bulan} sx={{ flex: 1, textAlign: 'center' }}>
                  <Typography sx={{ fontSize: 11, color: '#94a3b8', fontWeight: 500 }}>
                    {BULAN[p.bulan]}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        )}
      </Paper>
    </Box>
  )
}
