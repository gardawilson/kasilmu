import { useState } from 'react'
import {
  Box, Typography, Paper, Tabs, Tab, Table, TableHead, TableRow, TableCell, TableBody,
  TextField, MenuItem, Avatar, Skeleton,
} from '@mui/material'
import {
  useLaporanKeuangan, useLaporanSiswa, useLaporanKehadiran, useLaporanGaji,
  useLaporanKehadiranPengajar,
} from './useLaporan'
import { Search } from '@mui/icons-material'
import { useKelas } from '../kelas/useKelas'
import { usePengajar } from '../pengajar/usePengajar'
import PageHeader from '../../components/ui/PageHeader'
import StatusChip, { type StatusTone } from '../../components/ui/StatusChip'
import FilterBar, { filterFieldSx, filterFieldSlotProps } from '../../components/ui/FilterBar'
import DataTableCard from '../../components/ui/DataTableCard'
import KehadiranDetailDialog from './KehadiranDetailDialog'
import KehadiranPengajarDetailDialog from './KehadiranPengajarDetailDialog'

const cardSx = { overflow: 'hidden', border: '1px solid #ededf1', borderRadius: '14px' }

const summaryBoxSx = {
  px: 3, py: 1.5, borderRadius: 2,
  bgcolor: 'rgba(0,182,155,0.12)', border: '1px solid rgba(0,182,155,0.3)',
}

const PER_PAGE = 20

/** Satu segmen filter berlabel di dalam FilterBar (label muted + kontrol). */
function Seg({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
      <Typography sx={{ fontSize: 13, fontWeight: 600, color: '#7a7a7a' }}>{label}</Typography>
      {children}
    </Box>
  )
}

function SiswaCell({ nama, nis }: { nama?: string | null; nis?: string | null }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
      <Avatar sx={{ width: 30, height: 30, fontSize: 12, fontWeight: 700, bgcolor: 'rgba(72,128,255,0.12)', color: '#4880ff' }}>
        {(nama ?? '?').charAt(0).toUpperCase()}
      </Avatar>
      <Box>
        <Typography sx={{ fontWeight: 700, fontSize: 14, color: 'rgba(32,34,36,0.9)' }}>{nama ?? '—'}</Typography>
        <Typography sx={{ fontSize: 12, color: '#94a3b8' }}>{nis ?? ''}</Typography>
      </Box>
    </Box>
  )
}

function TabPanel({ value, index, children }: { value: number; index: number; children: React.ReactNode }) {
  return value === index ? <Box>{children}</Box> : null
}

function LaporanKeuanganTab() {
  const [dari, setDari] = useState('')
  const [sampai, setSampai] = useState('')
  const [page, setPage] = useState(1)
  const { data } = useLaporanKeuangan({ dari: dari || undefined, sampai: sampai || undefined, page, per_page: PER_PAGE })
  const total = Number(data?.total_pendapatan ?? 0)

  const detail = (data as any)?.detail
  const rows = detail?.data ?? []
  const totalRows = detail?.meta?.total ?? 0
  const lastPage = detail?.meta?.last_page ?? Math.max(1, Math.ceil(totalRows / PER_PAGE))

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Box sx={summaryBoxSx}>
          <Typography sx={{ fontSize: 12, color: '#00947f', fontWeight: 600, mb: 0.25 }}>Total Pendapatan</Typography>
          <Typography sx={{ fontSize: 20, fontWeight: 800, color: '#00947f' }}>
            Rp {total.toLocaleString('id-ID')}
          </Typography>
        </Box>
      </Box>

      <FilterBar
        onReset={() => { setDari(''); setSampai(''); setPage(1) }}
        resetDisabled={!dari && !sampai}
      >
        <Seg label="Dari">
          <TextField type="date" variant="standard" value={dari}
            onChange={(e) => { setDari(e.target.value); setPage(1) }}
            slotProps={{ ...filterFieldSlotProps, inputLabel: { shrink: true } }}
            sx={{ ...filterFieldSx, minWidth: 130 }} />
        </Seg>
        <Seg label="Sampai">
          <TextField type="date" variant="standard" value={sampai}
            onChange={(e) => { setSampai(e.target.value); setPage(1) }}
            slotProps={{ ...filterFieldSlotProps, inputLabel: { shrink: true } }}
            sx={{ ...filterFieldSx, minWidth: 130 }} />
        </Seg>
      </FilterBar>

      <DataTableCard
        minWidth={760}
        page={page}
        lastPage={lastPage}
        total={totalRows}
        perPage={PER_PAGE}
        onPageChange={setPage}
      >
        <Table>
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
            {!rows.length ? (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 6, color: '#94a3b8' }}>Tidak ada data</TableCell>
              </TableRow>
            ) : (
              rows.map((p: any) => (
                <TableRow key={p.id} hover>
                  <TableCell>
                    {new Date(p.tgl_bayar).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </TableCell>
                  <TableCell>{p.tagihan?.siswa?.nama ?? '—'}</TableCell>
                  <TableCell>
                    <StatusChip label={p.metode} tone={p.metode === 'tunai' ? 'green' : 'blue'} />
                  </TableCell>
                  <TableCell>Rp {Number(p.jumlah).toLocaleString('id-ID')}</TableCell>
                  <TableCell>{p.keterangan || '—'}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </DataTableCard>
    </Box>
  )
}

function LaporanSiswaTab() {
  const [status, setStatus] = useState('')
  const [page, setPage] = useState(1)
  const { data, isLoading } = useLaporanSiswa({ status: status || undefined, page, per_page: PER_PAGE })

  const STATUS_TONE: Record<string, StatusTone> = {
    aktif: 'green',
    nonaktif: 'orange',
    lulus: 'blue',
  }

  return (
    <Box>
      <FilterBar onReset={() => { setStatus(''); setPage(1) }} resetDisabled={status === ''}>
        <Seg label="Status">
          <TextField select variant="standard" value={status}
            onChange={(e) => { setStatus(e.target.value); setPage(1) }}
            slotProps={filterFieldSlotProps} sx={{ ...filterFieldSx, minWidth: 120 }}>
            <MenuItem value="">Semua Status</MenuItem>
            <MenuItem value="aktif">Aktif</MenuItem>
            <MenuItem value="nonaktif">Nonaktif</MenuItem>
            <MenuItem value="lulus">Lulus</MenuItem>
          </TextField>
        </Seg>
      </FilterBar>

      <DataTableCard
        minWidth={640}
        page={page}
        lastPage={data?.meta?.last_page ?? 1}
        total={data?.meta?.total ?? 0}
        perPage={PER_PAGE}
        onPageChange={setPage}
      >
        <Table>
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
                    <TableCell key={j}><Skeleton variant="rounded" height={20} /></TableCell>
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
                  <TableCell><SiswaCell nama={s.nama} nis={s.nis} /></TableCell>
                  <TableCell>
                    <StatusChip label={s.status} tone={STATUS_TONE[s.status] ?? 'grey'} />
                  </TableCell>
                  <TableCell align="center">{s.tagihans_count}</TableCell>
                  <TableCell align="center">{s.nilais_count}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </DataTableCard>
    </Box>
  )
}

function LaporanKehadiranTab() {
  const [search, setSearch] = useState('')
  const [kelasFilter, setKelasFilter] = useState('')
  const [tglMulai, setTglMulai] = useState('')
  const [tglSelesai, setTglSelesai] = useState('')
  const [page, setPage] = useState(1)
  const [detailSiswa, setDetailSiswa] = useState<{ id: number; nama: string; nis?: string } | null>(null)
  const { data: kelas } = useKelas({ per_page: 100 })
  const { data, isLoading } = useLaporanKehadiran({
    search: search || undefined,
    kelas_id: kelasFilter || undefined,
    tgl_mulai: tglMulai || undefined,
    tgl_selesai: tglSelesai || undefined,
    page, per_page: PER_PAGE,
  })

  return (
    <Box>
      <FilterBar
        onReset={() => { setSearch(''); setKelasFilter(''); setTglMulai(''); setTglSelesai(''); setPage(1) }}
        resetDisabled={!search && !kelasFilter && !tglMulai && !tglSelesai}
      >
        <Seg label="Siswa">
          <TextField variant="standard" placeholder="Cari nama atau NIS..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1) }}
            slotProps={{
              input: {
                disableUnderline: true,
                startAdornment: <Search sx={{ mr: 1, color: '#94a3b8', fontSize: 18 }} />,
              },
            }}
            sx={{ ...filterFieldSx, minWidth: 200 }} />
        </Seg>
        <Seg label="Kelas">
          <TextField select variant="standard" value={kelasFilter}
            onChange={(e) => { setKelasFilter(e.target.value); setPage(1) }}
            slotProps={filterFieldSlotProps} sx={{ ...filterFieldSx, minWidth: 150 }}>
            <MenuItem value="">Semua Kelas</MenuItem>
            {kelas?.data?.map((k) => (
              <MenuItem key={k.id} value={k.id}>{k.nama}</MenuItem>
            ))}
          </TextField>
        </Seg>
        <Seg label="Dari">
          <TextField type="date" variant="standard" value={tglMulai}
            onChange={(e) => { setTglMulai(e.target.value); setPage(1) }}
            slotProps={{ ...filterFieldSlotProps, inputLabel: { shrink: true } }}
            sx={{ ...filterFieldSx, minWidth: 130 }} />
        </Seg>
        <Seg label="Sampai">
          <TextField type="date" variant="standard" value={tglSelesai}
            onChange={(e) => { setTglSelesai(e.target.value); setPage(1) }}
            slotProps={{ ...filterFieldSlotProps, inputLabel: { shrink: true } }}
            sx={{ ...filterFieldSx, minWidth: 130 }} />
        </Seg>
      </FilterBar>

      <DataTableCard
        minWidth={920}
        page={page}
        lastPage={data?.meta?.last_page ?? 1}
        total={data?.meta?.total ?? 0}
        perPage={PER_PAGE}
        onPageChange={setPage}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Siswa</TableCell>
              <TableCell align="center">Total</TableCell>
              <TableCell align="center">Hadir</TableCell>
              <TableCell align="center">Tidak Hadir</TableCell>
              <TableCell align="center">% Hadir</TableCell>
              <TableCell align="center">Paket</TableCell>
              <TableCell align="center">Sisa</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              [...Array(5)].map((_, i) => (
                <TableRow key={i}>
                  {[...Array(7)].map((_, j) => (
                    <TableCell key={j}><Skeleton variant="rounded" height={20} /></TableCell>
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
                  <TableRow
                    key={k.siswa_id}
                    hover
                    onClick={() => setDetailSiswa({ id: k.siswa_id, nama: k.siswa?.nama ?? '', nis: k.siswa?.nis })}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell><SiswaCell nama={k.siswa?.nama} nis={k.siswa?.nis} /></TableCell>
                    <TableCell align="center">{k.total_pertemuan}</TableCell>
                    <TableCell align="center">{k.hadir}</TableCell>
                    <TableCell align="center">{k.tidak_hadir}</TableCell>
                    <TableCell align="center">
                      <StatusChip
                        label={`${persen}%`}
                        tone={persen >= 80 ? 'green' : persen >= 60 ? 'orange' : 'red'}
                      />
                    </TableCell>
                    <TableCell align="center">
                      {k.paket ? (
                        <StatusChip label={k.paket} tone="purple" sx={{ textTransform: 'none' }} />
                      ) : (
                        <Typography variant="caption" sx={{ color: '#94a3b8' }}>—</Typography>
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {k.kuota !== undefined ? (
                        <StatusChip
                          label={`${k.sisa ?? 0}/${k.kuota}`}
                          tone={(k.sisa ?? 0) <= 0 ? 'red' : (k.sisa ?? 0) <= 2 ? 'orange' : 'green'}
                        />
                      ) : (
                        <Typography variant="caption" sx={{ color: '#94a3b8' }}>—</Typography>
                      )}
                    </TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </DataTableCard>

      <KehadiranDetailDialog
        open={!!detailSiswa}
        onClose={() => setDetailSiswa(null)}
        siswa={detailSiswa}
        kelasId={kelasFilter}
      />
    </Box>
  )
}

function LaporanGajiTab() {
  const [tutorFilter, setTutorFilter] = useState('')
  const [tglMulai, setTglMulai] = useState('')
  const [tglSelesai, setTglSelesai] = useState('')
  const { data: pengajar } = usePengajar({ per_page: 100 })
  const { data, isLoading } = useLaporanGaji({
    tutor_id: tutorFilter || undefined,
    tgl_mulai: tglMulai || undefined,
    tgl_selesai: tglSelesai || undefined,
  })
  const total = Number(data?.total_gaji ?? 0)

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Box sx={summaryBoxSx}>
          <Typography sx={{ fontSize: 12, color: '#00947f', fontWeight: 600, mb: 0.25 }}>Total Gaji</Typography>
          <Typography sx={{ fontSize: 20, fontWeight: 800, color: '#00947f' }}>
            Rp {total.toLocaleString('id-ID')}
          </Typography>
        </Box>
      </Box>

      <FilterBar
        onReset={() => { setTutorFilter(''); setTglMulai(''); setTglSelesai('') }}
        resetDisabled={!tutorFilter && !tglMulai && !tglSelesai}
      >
        <Seg label="Pengajar">
          <TextField select variant="standard" value={tutorFilter}
            onChange={(e) => setTutorFilter(e.target.value)}
            slotProps={filterFieldSlotProps} sx={{ ...filterFieldSx, minWidth: 150 }}>
            <MenuItem value="">Semua Pengajar</MenuItem>
            {pengajar?.data?.map((p) => (
              <MenuItem key={p.id} value={p.id}>{p.nama}</MenuItem>
            ))}
          </TextField>
        </Seg>
        <Seg label="Dari">
          <TextField type="date" variant="standard" value={tglMulai}
            onChange={(e) => setTglMulai(e.target.value)}
            slotProps={{ ...filterFieldSlotProps, inputLabel: { shrink: true } }}
            sx={{ ...filterFieldSx, minWidth: 130 }} />
        </Seg>
        <Seg label="Sampai">
          <TextField type="date" variant="standard" value={tglSelesai}
            onChange={(e) => setTglSelesai(e.target.value)}
            slotProps={{ ...filterFieldSlotProps, inputLabel: { shrink: true } }}
            sx={{ ...filterFieldSx, minWidth: 130 }} />
        </Seg>
      </FilterBar>

      <DataTableCard minWidth={760}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Pengajar</TableCell>
              <TableCell>Kelas</TableCell>
              <TableCell align="center">Jumlah Pertemuan</TableCell>
              <TableCell>Tarif / Pertemuan</TableCell>
              <TableCell>Subtotal</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              [...Array(5)].map((_, i) => (
                <TableRow key={i}>
                  {[...Array(5)].map((_, j) => (
                    <TableCell key={j}><Skeleton variant="rounded" height={20} /></TableCell>
                  ))}
                </TableRow>
              ))
            ) : !data?.detail?.length ? (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 6, color: '#94a3b8' }}>Tidak ada data</TableCell>
              </TableRow>
            ) : (
              data.detail.flatMap((tutor) => (
                tutor.kelas.map((k, idx) => (
                  <TableRow key={`${tutor.tutor_id}-${k.kelas_id}-${idx}`} hover>
                    {idx === 0 && (
                      <TableCell rowSpan={tutor.kelas.length} sx={{ verticalAlign: 'top' }}>
                        {tutor.tutor}
                      </TableCell>
                    )}
                    <TableCell>{k.kelas}</TableCell>
                    <TableCell align="center">{k.jumlah_pertemuan}</TableCell>
                    <TableCell>Rp {Number(k.tarif_per_pertemuan).toLocaleString('id-ID')}</TableCell>
                    <TableCell>Rp {Number(k.subtotal).toLocaleString('id-ID')}</TableCell>
                  </TableRow>
                ))
              ))
            )}
          </TableBody>
        </Table>
      </DataTableCard>
    </Box>
  )
}

function LaporanKehadiranPengajarTab() {
  const [tutorFilter, setTutorFilter] = useState('')
  const [kelasFilter, setKelasFilter] = useState('')
  const [tglMulai, setTglMulai] = useState('')
  const [tglSelesai, setTglSelesai] = useState('')
  const [page, setPage] = useState(1)
  const [detailTutor, setDetailTutor] = useState<{ id: number; nama: string; nip?: string } | null>(null)
  const { data: pengajar } = usePengajar({ per_page: 100 })
  const { data: kelas } = useKelas({ per_page: 100 })
  const { data, isLoading } = useLaporanKehadiranPengajar({
    tutor_id: tutorFilter || undefined,
    kelas_id: kelasFilter || undefined,
    tgl_mulai: tglMulai || undefined,
    tgl_selesai: tglSelesai || undefined,
    page, per_page: PER_PAGE,
  })

  return (
    <Box>
      <FilterBar
        onReset={() => { setTutorFilter(''); setKelasFilter(''); setTglMulai(''); setTglSelesai(''); setPage(1) }}
        resetDisabled={!tutorFilter && !kelasFilter && !tglMulai && !tglSelesai}
      >
        <Seg label="Pengajar">
          <TextField select variant="standard" value={tutorFilter}
            onChange={(e) => { setTutorFilter(e.target.value); setPage(1) }}
            slotProps={filterFieldSlotProps} sx={{ ...filterFieldSx, minWidth: 150 }}>
            <MenuItem value="">Semua Pengajar</MenuItem>
            {pengajar?.data?.map((p) => (
              <MenuItem key={p.id} value={p.id}>{p.nama}</MenuItem>
            ))}
          </TextField>
        </Seg>
        <Seg label="Kelas">
          <TextField select variant="standard" value={kelasFilter}
            onChange={(e) => { setKelasFilter(e.target.value); setPage(1) }}
            slotProps={filterFieldSlotProps} sx={{ ...filterFieldSx, minWidth: 150 }}>
            <MenuItem value="">Semua Kelas</MenuItem>
            {kelas?.data?.map((k) => (
              <MenuItem key={k.id} value={k.id}>{k.nama}</MenuItem>
            ))}
          </TextField>
        </Seg>
        <Seg label="Dari">
          <TextField type="date" variant="standard" value={tglMulai}
            onChange={(e) => { setTglMulai(e.target.value); setPage(1) }}
            slotProps={{ ...filterFieldSlotProps, inputLabel: { shrink: true } }}
            sx={{ ...filterFieldSx, minWidth: 130 }} />
        </Seg>
        <Seg label="Sampai">
          <TextField type="date" variant="standard" value={tglSelesai}
            onChange={(e) => { setTglSelesai(e.target.value); setPage(1) }}
            slotProps={{ ...filterFieldSlotProps, inputLabel: { shrink: true } }}
            sx={{ ...filterFieldSx, minWidth: 130 }} />
        </Seg>
      </FilterBar>

      <DataTableCard
        minWidth={720}
        page={page}
        lastPage={data?.meta?.last_page ?? 1}
        total={data?.meta?.total ?? 0}
        perPage={PER_PAGE}
        onPageChange={setPage}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Pengajar</TableCell>
              <TableCell align="center">Hari Mengajar</TableCell>
              <TableCell align="center">Total Sesi</TableCell>
              <TableCell align="center">Kelas Diampu</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              [...Array(5)].map((_, i) => (
                <TableRow key={i}>
                  {[...Array(4)].map((_, j) => (
                    <TableCell key={j}><Skeleton variant="rounded" height={20} /></TableCell>
                  ))}
                </TableRow>
              ))
            ) : !data?.data?.length ? (
              <TableRow>
                <TableCell colSpan={4} align="center" sx={{ py: 6, color: '#94a3b8' }}>Tidak ada data</TableCell>
              </TableRow>
            ) : (
              data.data.map((t) => (
                <TableRow
                  key={t.tutor_id}
                  hover
                  onClick={() => setDetailTutor({ id: t.tutor_id, nama: t.tutor?.nama ?? '', nip: t.tutor?.nip })}
                  sx={{ cursor: 'pointer' }}
                >
                  <TableCell><SiswaCell nama={t.tutor?.nama} nis={t.tutor?.nip} /></TableCell>
                  <TableCell align="center">{t.total_hari}</TableCell>
                  <TableCell align="center">{t.total_sesi}</TableCell>
                  <TableCell align="center">{t.total_kelas}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </DataTableCard>

      <KehadiranPengajarDetailDialog
        open={!!detailTutor}
        onClose={() => setDetailTutor(null)}
        tutor={detailTutor}
        kelasId={kelasFilter}
      />
    </Box>
  )
}

export default function LaporanPage() {
  const [tab, setTab] = useState(0)

  return (
    <Box>
      <PageHeader title="Laporan" subtitle="Rekap keuangan, data siswa, dan kehadiran" />

      <Paper sx={cardSx}>
        <Tabs value={tab} onChange={(_, v) => setTab(v)}
          sx={{
            px: 2, borderBottom: '1px solid #ededf1',
            '& .MuiTab-root': { fontSize: 14, fontWeight: 500, textTransform: 'none', minHeight: 48 },
            '& .Mui-selected': { fontWeight: 700, color: 'primary.main' },
          }}>
          <Tab label="Keuangan" />
          <Tab label="Data Siswa" />
          <Tab label="Kehadiran Siswa" />
          <Tab label="Kehadiran Pengajar" />
          <Tab label="Gaji Pengajar" />
        </Tabs>
        <Box sx={{ p: 3 }}>
          <TabPanel value={tab} index={0}><LaporanKeuanganTab /></TabPanel>
          <TabPanel value={tab} index={1}><LaporanSiswaTab /></TabPanel>
          <TabPanel value={tab} index={2}><LaporanKehadiranTab /></TabPanel>
          <TabPanel value={tab} index={3}><LaporanKehadiranPengajarTab /></TabPanel>
          <TabPanel value={tab} index={4}><LaporanGajiTab /></TabPanel>
        </Box>
      </Paper>
    </Box>
  )
}
