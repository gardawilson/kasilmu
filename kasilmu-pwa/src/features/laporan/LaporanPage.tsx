import { useState } from 'react'
import {
  Box, Typography, Paper, Tabs, Tab, Table, TableHead, TableRow, TableCell, TableBody,
  TextField, MenuItem, TablePagination, Chip, Avatar, Skeleton,
} from '@mui/material'
import {
  useLaporanKeuangan, useLaporanSiswa, useLaporanKehadiran,
} from './useLaporan'
import { useSiswa } from '../siswa/useSiswa'

function TabPanel({ value, index, children }: { value: number; index: number; children: React.ReactNode }) {
  return value === index ? <Box>{children}</Box> : null
}

function LaporanKeuanganTab() {
  const [dari, setDari] = useState('')
  const [sampai, setSampai] = useState('')
  const [page, setPage] = useState(1)
  const { data } = useLaporanKeuangan({ dari: dari || undefined, sampai: sampai || undefined, page, per_page: 20 })
  const total = Number(data?.total_pendapatan ?? 0)

  return (
    <Box>
      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap', alignItems: 'center' }}>
        <TextField label="Dari" type="date" value={dari}
          onChange={(e) => { setDari(e.target.value); setPage(1) }}
          slotProps={{ inputLabel: { shrink: true } }} sx={{ minWidth: 160 }} />
        <TextField label="Sampai" type="date" value={sampai}
          onChange={(e) => { setSampai(e.target.value); setPage(1) }}
          slotProps={{ inputLabel: { shrink: true } }} sx={{ minWidth: 160 }} />
        <Box sx={{ ml: 'auto', px: 3, py: 1.5, borderRadius: 2, bgcolor: '#dcfce7', border: '1px solid #bbf7d0' }}>
          <Typography sx={{ fontSize: 12, color: '#15803d', fontWeight: 500, mb: 0.25 }}>Total Pendapatan</Typography>
          <Typography sx={{ fontSize: 20, fontWeight: 800, color: '#15803d' }}>
            Rp {total.toLocaleString('id-ID')}
          </Typography>
        </Box>
      </Box>

      <Paper sx={{ overflow: 'hidden' }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Tanggal</TableCell>
              <TableCell>Siswa</TableCell>
              <TableCell>Metode</TableCell>
              <TableCell>Jumlah</TableCell>
              <TableCell>Keterangan</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!(data as any)?.detail?.data?.length ? (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 6, color: '#94a3b8' }}>
                  Tidak ada data
                </TableCell>
              </TableRow>
            ) : (
              (data as any).detail.data.map((p: any) => (
                <TableRow key={p.id} hover>
                  <TableCell sx={{ color: '#475569' }}>
                    {new Date(p.tgl_bayar).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>{p.tagihan?.siswa?.nama ?? '—'}</TableCell>
                  <TableCell>
                    <Chip label={p.metode} size="small" sx={{
                      fontWeight: 600,
                      ...(p.metode === 'tunai'
                        ? { bgcolor: '#dcfce7', color: '#15803d' }
                        : { bgcolor: '#dbeafe', color: '#1d4ed8' }),
                    }} />
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>
                    Rp {Number(p.jumlah).toLocaleString('id-ID')}
                  </TableCell>
                  <TableCell sx={{ color: '#475569', fontSize: 13 }}>{p.keterangan || '—'}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        {(data as any)?.detail?.meta && (
          <TablePagination
            component="div"
            count={(data as any).detail.meta.total || 0}
            page={page - 1}
            rowsPerPage={20}
            onPageChange={(_, p) => setPage(p + 1)}
            rowsPerPageOptions={[20]}
            sx={{ borderTop: '1px solid #f1f5f9' }}
          />
        )}
      </Paper>
    </Box>
  )
}

function LaporanSiswaTab() {
  const [status, setStatus] = useState('')
  const [page, setPage] = useState(1)
  const { data, isLoading } = useLaporanSiswa({ status: status || undefined, page, per_page: 20 })

  const STATUS_SX: Record<string, object> = {
    aktif:    { bgcolor: '#dcfce7', color: '#15803d' },
    nonaktif: { bgcolor: '#f1f5f9', color: '#475569' },
    lulus:    { bgcolor: '#dbeafe', color: '#1d4ed8' },
  }

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <TextField select label="Status" value={status}
          onChange={(e) => { setStatus(e.target.value); setPage(1) }} sx={{ minWidth: 160 }}>
          <MenuItem value="">Semua Status</MenuItem>
          <MenuItem value="aktif">Aktif</MenuItem>
          <MenuItem value="nonaktif">Nonaktif</MenuItem>
          <MenuItem value="lulus">Lulus</MenuItem>
        </TextField>
      </Box>

      <Paper sx={{ overflow: 'hidden' }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Siswa</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="center">Tagihan</TableCell>
              <TableCell align="center">Nilai</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              [...Array(5)].map((_, i) => (
                <TableRow key={i}>
                  {[...Array(4)].map((_, j) => (
                    <TableCell key={j}><Skeleton variant="rounded" height={18} /></TableCell>
                  ))}
                </TableRow>
              ))
            ) : !data?.data?.length ? (
              <TableRow>
                <TableCell colSpan={4} align="center" sx={{ py: 6, color: '#94a3b8' }}>Tidak ada data</TableCell>
              </TableRow>
            ) : (
              data.data.map((s) => (
                <TableRow key={s.id} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Avatar sx={{ width: 28, height: 28, fontSize: 11, fontWeight: 700, bgcolor: '#3b82f615', color: '#3b82f6' }}>
                        {s.nama.charAt(0).toUpperCase()}
                      </Avatar>
                      <Box>
                        <Typography sx={{ fontWeight: 600, fontSize: 13 }}>{s.nama}</Typography>
                        <Typography sx={{ fontSize: 11, color: '#94a3b8' }}>{s.nis}</Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip label={s.status} size="small"
                      sx={{ fontWeight: 600, ...STATUS_SX[s.status] }} />
                  </TableCell>
                  <TableCell align="center">
                    <Box sx={{
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      minWidth: 28, height: 24, px: 1, borderRadius: 1,
                      bgcolor: '#f1f5f9', color: '#475569', fontWeight: 600, fontSize: 13,
                    }}>
                      {s.tagihans_count}
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <Box sx={{
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      minWidth: 28, height: 24, px: 1, borderRadius: 1,
                      bgcolor: '#f1f5f9', color: '#475569', fontWeight: 600, fontSize: 13,
                    }}>
                      {s.nilais_count}
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        <TablePagination
          component="div" count={data?.meta?.total || 0} page={page - 1}
          rowsPerPage={20} onPageChange={(_, p) => setPage(p + 1)}
          rowsPerPageOptions={[20]}
          sx={{ borderTop: '1px solid #f1f5f9' }}
        />
      </Paper>
    </Box>
  )
}

function LaporanKehadiranTab() {
  const [siswaFilter, setSiswaFilter] = useState('')
  const [page, setPage] = useState(1)
  const { data: siswa } = useSiswa({ per_page: 100 })
  const { data, isLoading } = useLaporanKehadiran({ siswa_id: siswaFilter || undefined, page, per_page: 20 })

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <TextField select label="Filter Siswa" value={siswaFilter}
          onChange={(e) => { setSiswaFilter(e.target.value); setPage(1) }} sx={{ minWidth: 220 }}>
          <MenuItem value="">Semua Siswa</MenuItem>
          {siswa?.data?.map((s) => (
            <MenuItem key={s.id} value={s.id}>{s.nama}</MenuItem>
          ))}
        </TextField>
      </Box>

      <Paper sx={{ overflow: 'hidden' }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Siswa</TableCell>
              <TableCell align="center">Total</TableCell>
              <TableCell align="center" sx={{ color: '#15803d' }}>Hadir</TableCell>
              <TableCell align="center" sx={{ color: '#1d4ed8' }}>Izin</TableCell>
              <TableCell align="center" sx={{ color: '#b45309' }}>Sakit</TableCell>
              <TableCell align="center" sx={{ color: '#dc2626' }}>Alpha</TableCell>
              <TableCell align="center">% Hadir</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              [...Array(5)].map((_, i) => (
                <TableRow key={i}>
                  {[...Array(7)].map((_, j) => (
                    <TableCell key={j}><Skeleton variant="rounded" height={18} /></TableCell>
                  ))}
                </TableRow>
              ))
            ) : !data?.data?.length ? (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 6, color: '#94a3b8' }}>Tidak ada data</TableCell>
              </TableRow>
            ) : (
              data.data.map((k) => {
                const persen = k.total_pertemuan > 0
                  ? Math.round((k.hadir / k.total_pertemuan) * 100)
                  : 0
                return (
                  <TableRow key={k.siswa_id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Avatar sx={{ width: 28, height: 28, fontSize: 11, fontWeight: 700, bgcolor: '#3b82f615', color: '#3b82f6' }}>
                          {(k.siswa?.nama ?? '?').charAt(0).toUpperCase()}
                        </Avatar>
                        <Box>
                          <Typography sx={{ fontWeight: 600, fontSize: 13 }}>{k.siswa?.nama}</Typography>
                          <Typography sx={{ fontSize: 11, color: '#94a3b8' }}>{k.siswa?.nis}</Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: 600 }}>{k.total_pertemuan}</TableCell>
                    <TableCell align="center" sx={{ color: '#15803d', fontWeight: 600 }}>{k.hadir}</TableCell>
                    <TableCell align="center" sx={{ color: '#1d4ed8', fontWeight: 600 }}>{k.izin}</TableCell>
                    <TableCell align="center" sx={{ color: '#b45309', fontWeight: 600 }}>{k.sakit}</TableCell>
                    <TableCell align="center" sx={{ color: '#dc2626', fontWeight: 600 }}>{k.alpha}</TableCell>
                    <TableCell align="center">
                      <Chip label={`${persen}%`} size="small" sx={{
                        fontWeight: 700,
                        ...(persen >= 80
                          ? { bgcolor: '#dcfce7', color: '#15803d' }
                          : persen >= 60
                          ? { bgcolor: '#fef3c7', color: '#b45309' }
                          : { bgcolor: '#fee2e2', color: '#dc2626' }),
                      }} />
                    </TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
        <TablePagination
          component="div" count={data?.meta?.total || 0} page={page - 1}
          rowsPerPage={20} onPageChange={(_, p) => setPage(p + 1)}
          rowsPerPageOptions={[20]}
          sx={{ borderTop: '1px solid #f1f5f9' }}
        />
      </Paper>
    </Box>
  )
}

export default function LaporanPage() {
  const [tab, setTab] = useState(0)

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5">Laporan</Typography>
        <Typography variant="body2" sx={{ color: '#64748b', mt: 0.5 }}>
          Rekap keuangan, data siswa, dan kehadiran
        </Typography>
      </Box>

      <Paper sx={{ overflow: 'hidden' }}>
        <Tabs value={tab} onChange={(_, v) => setTab(v)}
          sx={{
            px: 2, borderBottom: '1px solid #f1f5f9',
            '& .MuiTab-root': { fontSize: 14, fontWeight: 500, textTransform: 'none', minHeight: 48 },
            '& .Mui-selected': { fontWeight: 700, color: 'primary.main' },
          }}>
          <Tab label="Keuangan" />
          <Tab label="Data Siswa" />
          <Tab label="Kehadiran" />
        </Tabs>
        <Box sx={{ p: 3 }}>
          <TabPanel value={tab} index={0}><LaporanKeuanganTab /></TabPanel>
          <TabPanel value={tab} index={1}><LaporanSiswaTab /></TabPanel>
          <TabPanel value={tab} index={2}><LaporanKehadiranTab /></TabPanel>
        </Box>
      </Paper>
    </Box>
  )
}
