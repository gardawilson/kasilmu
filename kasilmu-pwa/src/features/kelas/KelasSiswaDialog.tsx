import { useEffect, useState, type ReactNode } from 'react'
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button,
  Avatar, Divider, Paper, Skeleton,
  TextField, MenuItem, Box, Typography, Alert, Chip,
} from '@mui/material'
import {
  PersonRemove, PersonAdd, Add, SwapHoriz, Inbox, Search, ArrowUpward, ArrowDownward,
} from '@mui/icons-material'
import StatusChip, { type StatusTone } from '../../components/ui/StatusChip'
import DeleteDialog from '../../components/ui/DeleteDialog'
import { useKelasDetail, useAddSiswaKelas, useRemoveSiswaKelas } from './useKelas'
import { useSiswa } from '../siswa/useSiswa'
import {
  useCreateSiswaPaket, useKelasPaket, useGantiPaket, useSiswaPaketAktif,
} from '../paket/usePaket'
import type { HargaPaket, Siswa, SiswaPaket } from '../../types'

function todayLocal() {
  const now = new Date()
  const pad = (value: number) => String(value).padStart(2, '0')
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`
}

function addMonthNoOverflow(value: string) {
  const [year, month, day] = value.slice(0, 10).split('-').map(Number)
  const lastDayTargetMonth = new Date(year, month + 1, 0).getDate()
  const result = new Date(year, month, Math.min(day, lastDayTargetMonth))
  const pad = (part: number) => String(part).padStart(2, '0')
  return `${result.getFullYear()}-${pad(result.getMonth() + 1)}-${pad(result.getDate())}`
}

function formatDate(value: string) {
  return new Date(`${value.slice(0, 10)}T00:00:00`).toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
}

const STATUS_TONE: Record<string, StatusTone> = {
  aktif: 'green',
  nonaktif: 'orange',
  lulus: 'blue',
}

const groupLabelSx = {
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: '0.06em',
  color: '#a0aec0',
  textTransform: 'uppercase' as const,
}

const cardGridSx = {
  display: 'grid',
  gap: 1.5,
  gridTemplateColumns: {
    xs: 'repeat(auto-fill, minmax(180px, 1fr))',
    sm: 'repeat(auto-fill, minmax(210px, 1fr))',
  },
}

type SortOrder = 'asc' | 'desc'

/** Filter berdasar nama/NIS lalu urutkan nama sesuai arah. */
function filterSortSiswa(list: Siswa[], query: string, order: SortOrder = 'asc'): Siswa[] {
  const q = query.trim().toLowerCase()
  const dir = order === 'desc' ? -1 : 1
  return list
    .filter((s) => !q || s.nama.toLowerCase().includes(q) || s.nis.toLowerCase().includes(q))
    .slice()
    .sort((a, b) => dir * a.nama.localeCompare(b.nama, 'id', { sensitivity: 'base' }))
}

function SearchField({ value, onChange, order, onToggleOrder }: {
  value: string
  onChange: (v: string) => void
  order: SortOrder
  onToggleOrder: () => void
}) {
  return (
    <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
      <TextField
        fullWidth
        size="small"
        placeholder="Cari nama atau NIS..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        slotProps={{
          input: {
            startAdornment: <Search sx={{ mr: 1, color: '#94a3b8', fontSize: 20 }} />,
          },
        }}
      />
      <Button
        size="small"
        variant="outlined"
        onClick={onToggleOrder}
        startIcon={order === 'asc'
          ? <ArrowUpward sx={{ fontSize: 16 }} />
          : <ArrowDownward sx={{ fontSize: 16 }} />}
        sx={{ flexShrink: 0, whiteSpace: 'nowrap' }}
      >
        {order === 'asc' ? 'A–Z' : 'Z–A'}
      </Button>
    </Box>
  )
}

function SiswaCardSkeleton() {
  return (
    <Paper sx={{ p: 2, borderRadius: '16px', border: '0.3px solid #ececec' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Skeleton variant="circular" width={56} height={56} sx={{ mb: 1 }} />
        <Skeleton variant="text" width="70%" />
        <Skeleton variant="text" width="45%" />
        <Skeleton variant="rounded" width={64} height={20} sx={{ mt: 1 }} />
      </Box>
      <Divider sx={{ my: 1.5 }} />
      <Skeleton variant="text" width="40%" />
      <Skeleton variant="text" width="85%" />
      <Skeleton variant="rounded" height={30} sx={{ mt: 1.5 }} />
      <Skeleton variant="rounded" height={30} sx={{ mt: 1 }} />
    </Paper>
  )
}

function SiswaCardSkeletonGrid() {
  return (
    <Box sx={cardGridSx}>
      {Array.from({ length: 4 }).map((_, i) => (
        <SiswaCardSkeleton key={i} />
      ))}
    </Box>
  )
}

interface Props {
  open: boolean
  onClose: () => void
  kelasId: number | null
}

export default function KelasSiswaDialog({ open, onClose, kelasId }: Props) {
  const { data: detail, isLoading } = useKelasDetail(kelasId ?? 0)
  const { data: allSiswa } = useSiswa({ per_page: 100, belum_berkelas: true })
  const { data: kelasPaketList } = useKelasPaket(kelasId ?? 0)
  const remove = useRemoveSiswaKelas(kelasId ?? 0)
  const [addOpen, setAddOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [order, setOrder] = useState<SortOrder>('asc')

  useEffect(() => {
    if (!open) { setSearch(''); setOrder('asc') }
  }, [open])

  const hargaPakets: HargaPaket[] = (kelasPaketList?.data ?? []).map((p) => ({
    paket_id: p.id,
    harga: p.harga,
    paket: p,
  }))

  const siswaTerdaftar = detail?.data?.siswa ?? []
  const siswaTerdaftarView = filterSortSiswa(siswaTerdaftar, search, order)
  const kapasitas = detail?.data?.kapasitas ?? Infinity
  const isFull = siswaTerdaftar.length >= kapasitas

  return (
    <>
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {detail?.data?.nama ?? 'Kelas'} — Daftar Siswa
      </DialogTitle>
      <DialogContent>
        {isLoading ? (
          <SiswaCardSkeletonGrid />
        ) : (
          <>
            {isFull && (
              <Alert severity="warning" sx={{ mb: 2 }}>
                Kelas sudah penuh ({siswaTerdaftar.length}/{kapasitas})
              </Alert>
            )}
            {hargaPakets.length === 0 && (
              <Alert severity="info" sx={{ mb: 2 }}>
                Harga paket untuk kelas ini belum diatur. Atur dulu lewat menu Kelas → "Atur Paket" agar siswa bisa diberi paket.
              </Alert>
            )}
            <Box sx={{ mb: 2 }}>
              <Button variant="contained" size="small" startIcon={<Add />}
                onClick={() => setAddOpen(true)} disabled={isFull}>
                Tambah Siswa
              </Button>
            </Box>
            {siswaTerdaftar.length > 0 && (
              <SearchField
                value={search}
                onChange={setSearch}
                order={order}
                onToggleOrder={() => setOrder((o) => (o === 'asc' ? 'desc' : 'asc'))}
              />
            )}
            {siswaTerdaftar.length === 0 ? (
              <Box sx={{ py: 6, textAlign: 'center' }}>
                <Inbox sx={{ fontSize: 36, color: '#cbd5e1', mb: 1 }} />
                <Typography color="text.secondary" sx={{ fontWeight: 500 }}>
                  Belum ada siswa
                </Typography>
              </Box>
            ) : siswaTerdaftarView.length === 0 ? (
              <Box sx={{ py: 6, textAlign: 'center' }}>
                <Typography color="text.secondary" sx={{ fontWeight: 500 }}>
                  Tidak ada siswa cocok dengan "{search}"
                </Typography>
              </Box>
            ) : (
              <Box sx={cardGridSx}>
                {siswaTerdaftarView.map((siswa) => (
                  <SiswaCard
                    key={siswa.id}
                    siswa={siswa}
                    kelasId={kelasId ?? 0}
                    hargaPakets={hargaPakets}
                    onRemove={() => remove.mutateAsync(siswa.id)}
                    removing={remove.isPending}
                  />
                ))}
              </Box>
            )}
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Tutup</Button>
      </DialogActions>
    </Dialog>

    <TambahSiswaDialog
      open={addOpen}
      onClose={() => setAddOpen(false)}
      kelasId={kelasId ?? 0}
      namaKelas={detail?.data?.nama ?? 'Kelas'}
      siswaList={allSiswa?.data ?? []}
      isFull={isFull}
      hargaPakets={hargaPakets}
    />
    </>
  )
}

/** Kartu siswa dasar (avatar, nama, NIS, status, asal sekolah). Bagian aksi
 *  di bawah divariasikan lewat children — dipakai daftar siswa & dialog tambah. */
function SiswaCardShell({ siswa, children }: { siswa: Siswa; children: ReactNode }) {
  return (
    <Paper
      sx={{
        p: 2,
        borderRadius: '16px',
        border: '0.3px solid #ececec',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ textAlign: 'center' }}>
        <Avatar
          src={siswa.foto ?? undefined}
          sx={{
            width: 56, height: 56, mx: 'auto', mb: 1,
            fontSize: 20, fontWeight: 700,
            bgcolor: 'rgba(72,128,255,0.12)', color: '#4880ff',
          }}
        >
          {siswa.nama.charAt(0).toUpperCase()}
        </Avatar>
        <Typography sx={{ fontWeight: 700, fontSize: 14.5, color: '#202224', lineHeight: 1.3 }}>
          {siswa.nama}
        </Typography>
        <Typography sx={{ fontSize: 12, color: '#94a3b8', mt: 0.25 }}>
          {siswa.nis}
        </Typography>
        <Box sx={{ mt: 1.25, display: 'flex', justifyContent: 'center' }}>
          <StatusChip label={siswa.status} tone={STATUS_TONE[siswa.status] ?? 'grey'} />
        </Box>
      </Box>

      <Divider sx={{ my: 1.5 }} />

      <Typography sx={groupLabelSx}>Asal Sekolah</Typography>
      <Typography sx={{ fontSize: 14, fontWeight: 600, color: 'rgba(32,34,36,0.8)', mt: 0.25 }}>
        {siswa.sekolah?.nama || '—'}
      </Typography>

      {children}
    </Paper>
  )
}

function TambahSiswaDialog({
  open, onClose, kelasId, namaKelas, siswaList, isFull, hargaPakets,
}: {
  open: boolean
  onClose: () => void
  kelasId: number
  namaKelas: string
  siswaList: Siswa[]
  isFull: boolean
  hargaPakets: HargaPaket[]
}) {
  const add = useAddSiswaKelas(kelasId)
  const [paketFor, setPaketFor] = useState<Siswa | null>(null)
  const [search, setSearch] = useState('')
  const [order, setOrder] = useState<SortOrder>('asc')
  const noPaket = hargaPakets.length === 0
  const siswaView = filterSortSiswa(siswaList, search, order)

  useEffect(() => {
    if (!open) { setPaketFor(null); setSearch(''); setOrder('asc') }
  }, [open])

  return (
    <>
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Masukkan Siswa — {namaKelas}</DialogTitle>
      <DialogContent>
        {isFull && (
          <Alert severity="warning" sx={{ mb: 2 }}>
            Kelas sudah penuh. Keluarkan siswa lain dulu sebelum menambah.
          </Alert>
        )}
        {noPaket && (
          <Alert severity="info" sx={{ mb: 2 }}>
            Harga paket untuk kelas ini belum diatur. Atur dulu lewat menu Kelas → "Atur Paket" — siswa wajib memilih paket saat masuk kelas.
          </Alert>
        )}
        {siswaList.length > 0 && (
          <SearchField
            value={search}
            onChange={setSearch}
            order={order}
            onToggleOrder={() => setOrder((o) => (o === 'asc' ? 'desc' : 'asc'))}
          />
        )}
        {siswaList.length === 0 ? (
          <Box sx={{ py: 6, textAlign: 'center' }}>
            <Inbox sx={{ fontSize: 36, color: '#cbd5e1', mb: 1 }} />
            <Typography color="text.secondary" sx={{ fontWeight: 500 }}>
              Tidak ada siswa yang tersedia
            </Typography>
          </Box>
        ) : siswaView.length === 0 ? (
          <Box sx={{ py: 6, textAlign: 'center' }}>
            <Typography color="text.secondary" sx={{ fontWeight: 500 }}>
              Tidak ada siswa cocok dengan "{search}"
            </Typography>
          </Box>
        ) : (
          <Box sx={cardGridSx}>
            {siswaView.map((siswa) => (
              <SiswaCardShell key={siswa.id} siswa={siswa}>
                <Box sx={{ flexGrow: 1 }} />
                <Button
                  fullWidth
                  size="small"
                  variant="contained"
                  startIcon={<PersonAdd />}
                  onClick={() => setPaketFor(siswa)}
                  disabled={isFull || noPaket}
                  sx={{ mt: 2 }}
                >
                  Masukkan Siswa
                </Button>
              </SiswaCardShell>
            ))}
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Tutup</Button>
      </DialogActions>
    </Dialog>

    {paketFor && (
      <InputPaketDialog
        open
        onClose={() => setPaketFor(null)}
        siswa={paketFor}
        kelasId={kelasId}
        hargaPakets={hargaPakets}
        title={`Masukkan Siswa — ${paketFor.nama}`}
        submitLabel="Masukkan ke Kelas"
        onBeforeCreate={async () => {
          try {
            await add.mutateAsync(paketFor.id)
          } catch (err: unknown) {
            const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message ?? ''
            // Kalau siswa sudah terdaftar (mis. retry setelah langkah paket gagal),
            // lewati; error lain (penuh / aktif di kelas lain) tetap dilempar.
            if (!/sudah terdaftar/i.test(msg)) throw err
          }
        }}
      />
    )}
    </>
  )
}

function SiswaCard({
  siswa, kelasId, hargaPakets, onRemove, removing,
}: {
  siswa: Siswa
  kelasId: number
  hargaPakets: HargaPaket[]
  onRemove: () => Promise<unknown> | void
  removing: boolean
}) {
  const { data: aktifPaket } = useSiswaPaketAktif(siswa.id)
  const [inputOpen, setInputOpen] = useState(false)
  const [gantiOpen, setGantiOpen] = useState(false)
  const [keluarOpen, setKeluarOpen] = useState(false)

  const active = aktifPaket?.data

  return (
    <SiswaCardShell siswa={siswa}>
      <Typography sx={{ ...groupLabelSx, mt: 1.75 }}>Paket</Typography>
      <Box sx={{ mt: 0.75 }}>
        {active ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', gap: 0.75 }}>
            <Chip label={`${active.paket?.nama ?? '-'} (sisa ${active.sisa_pertemuan ?? '?'})`} size="small"
              sx={{ bgcolor: '#dcfce7', color: '#15803d', fontWeight: 600, alignSelf: 'flex-start' }} />
            <Typography variant="caption" color="text.secondary">
              {formatDate(active.tgl_mulai)} – {formatDate(active.tgl_selesai)}
            </Typography>
            <Button
              fullWidth
              size="small"
              variant="outlined"
              startIcon={<SwapHoriz />}
              onClick={() => setGantiOpen(true)}
              sx={{ mt: 0.5 }}
            >
              Ganti Paket
            </Button>
            <GantiPaketDialog
              open={gantiOpen}
              onClose={() => setGantiOpen(false)}
              active={active}
              hargaPakets={hargaPakets}
            />
          </Box>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
            <Chip label="Belum ada paket" size="small"
              sx={{ bgcolor: '#f1f5f9', color: '#64748b', fontWeight: 600 }} />
            <Button size="small" variant="outlined" startIcon={<Add />}
              onClick={() => setInputOpen(true)} disabled={hargaPakets.length === 0}>
              Input Paket
            </Button>
            <InputPaketDialog
              open={inputOpen}
              onClose={() => setInputOpen(false)}
              siswa={siswa}
              kelasId={kelasId}
              hargaPakets={hargaPakets}
            />
          </Box>
        )}
      </Box>

      <Box sx={{ flexGrow: 1 }} />

      <Button
        fullWidth
        size="small"
        variant="outlined"
        color="error"
        startIcon={<PersonRemove />}
        onClick={() => setKeluarOpen(true)}
        disabled={removing}
        sx={{ mt: 2 }}
      >
        Keluarkan dari Kelas
      </Button>

      <DeleteDialog
        open={keluarOpen}
        title="Keluarkan dari Kelas"
        description={`Siswa "${siswa.nama}" akan dikeluarkan dari kelas ini. Paket di kelas ini beserta tagihan yang belum ada pembayaran akan ikut dihapus (tagihan yang sudah dibayar sebagian/penuh tetap disimpan). Riwayat presensi tidak terpengaruh.`}
        loading={removing}
        confirmLabel="Keluarkan"
        loadingLabel="Mengeluarkan..."
        onClose={() => setKeluarOpen(false)}
        onConfirm={async () => {
          await onRemove()
          setKeluarOpen(false)
        }}
      />
    </SiswaCardShell>
  )
}

function InputPaketDialog({
  open, onClose, siswa, kelasId, hargaPakets, title, submitLabel, onBeforeCreate,
}: {
  open: boolean
  onClose: () => void
  siswa: Siswa
  kelasId: number
  hargaPakets: HargaPaket[]
  title?: string
  submitLabel?: string
  /** Dijalankan sebelum paket dibuat — mis. memasukkan siswa ke kelas dulu. */
  onBeforeCreate?: () => Promise<void>
}) {
  const createSiswaPaket = useCreateSiswaPaket()
  const [paketId, setPaketId] = useState('')
  const [tglMulai, setTglMulai] = useState(todayLocal())
  const [error, setError] = useState('')
  const hargaTerpilih = hargaPakets.find((harga) => harga.paket_id === Number(paketId))
  const selesaiBaru = tglMulai ? addMonthNoOverflow(tglMulai) : ''

  useEffect(() => {
    if (!open) return
    setPaketId('')
    setTglMulai(todayLocal())
    setError('')
  }, [open])

  const handleSave = async () => {
    if (!paketId || !tglMulai) return
    setError('')

    try {
      if (onBeforeCreate) await onBeforeCreate()
      await createSiswaPaket.mutateAsync({
        siswa_id: siswa.id,
        kelas_id: kelasId,
        paket_id: Number(paketId),
        tgl_mulai: tglMulai,
      })
      onClose()
    } catch (err: unknown) {
      setError((err as any)?.response?.data?.message || 'Gagal menambahkan paket')
    }
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{title ?? `Input Paket — ${siswa.nama}`}</DialogTitle>
      <DialogContent>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <TextField
          label="Paket"
          select
          fullWidth
          required
          margin="dense"
          value={paketId}
          onChange={(event) => setPaketId(event.target.value)}
          slotProps={{ select: { displayEmpty: true }, inputLabel: { shrink: true } }}
        >
          <MenuItem value="" disabled>-- Pilih Paket --</MenuItem>
          {hargaPakets.map((harga) => (
            <MenuItem key={harga.paket_id} value={harga.paket_id}>
              {harga.paket?.nama} ({harga.paket?.jumlah_pertemuan}x) — Rp {Number(harga.harga).toLocaleString('id-ID')}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Tanggal Mulai Paket"
          type="date"
          fullWidth
          required
          margin="dense"
          value={tglMulai}
          onChange={(event) => setTglMulai(event.target.value)}
          slotProps={{ inputLabel: { shrink: true } }}
        />
        {hargaTerpilih && selesaiBaru && (
          <Alert severity="success" sx={{ mt: 2 }}>
            Periode: <strong>{formatDate(tglMulai)}</strong> sampai
            {' '}<strong>{formatDate(selesaiBaru)}</strong><br />
            Kuota: <strong>{hargaTerpilih.paket?.jumlah_pertemuan} pertemuan</strong><br />
            Tagihan: <strong>Rp {Number(hargaTerpilih.harga).toLocaleString('id-ID')}</strong>
          </Alert>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Batal</Button>
        <Button variant="contained" onClick={handleSave}
          disabled={!paketId || !tglMulai || createSiswaPaket.isPending}>
          {createSiswaPaket.isPending ? 'Menyimpan...' : (submitLabel ?? 'Simpan')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

function GantiPaketDialog({ open, onClose, active, hargaPakets }: {
  open: boolean
  onClose: () => void
  active: SiswaPaket
  hargaPakets: HargaPaket[]
}) {
  const ganti = useGantiPaket(active.id)
  const [paketId, setPaketId] = useState('')
  const [tglMulai, setTglMulai] = useState(todayLocal())
  const [error, setError] = useState('')
  const minTglMulai = active.tgl_mulai.slice(0, 10)
  const selesaiBaru = tglMulai ? addMonthNoOverflow(tglMulai) : ''
  const hargaTerpilih = hargaPakets.find((harga) => harga.paket_id === Number(paketId))

  useEffect(() => {
    if (!open) return
    setPaketId('')
    setTglMulai(todayLocal())
    setError('')
  }, [open])

  const handleSave = async () => {
    if (!paketId || !tglMulai) return
    setError('')

    try {
      await ganti.mutateAsync({ paket_id: Number(paketId), tgl_mulai: tglMulai })
      onClose()
    } catch (err: unknown) {
      setError((err as any)?.response?.data?.message || 'Gagal mengganti paket')
    }
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Ganti Paket</DialogTitle>
      <DialogContent>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <Alert severity="warning" sx={{ mb: 2 }}>
          Paket <strong>{active.paket?.nama}</strong> akan langsung dihentikan pada tanggal yang dipilih dan sisa kuota
          {' '}(<strong>{active.sisa_pertemuan ?? '?'} pertemuan</strong>) akan hangus tanpa pengembalian. Pastikan ini disengaja.
        </Alert>
        <TextField
          label="Paket Baru"
          select
          fullWidth
          required
          value={paketId}
          onChange={(event) => setPaketId(event.target.value)}
          slotProps={{ select: { displayEmpty: true }, inputLabel: { shrink: true } }}
        >
          <MenuItem value="" disabled>-- Pilih Paket Baru --</MenuItem>
          {hargaPakets
            .filter((harga) => harga.paket_id !== active.paket_id)
            .map((harga) => (
              <MenuItem key={harga.paket_id} value={harga.paket_id}>
                {harga.paket?.nama} ({harga.paket?.jumlah_pertemuan}x) — Rp {Number(harga.harga).toLocaleString('id-ID')}
              </MenuItem>
            ))}
        </TextField>
        <TextField
          label="Tanggal Mulai Paket Baru"
          type="date"
          fullWidth
          required
          margin="dense"
          value={tglMulai}
          onChange={(event) => setTglMulai(event.target.value)}
          slotProps={{ inputLabel: { shrink: true }, htmlInput: { min: minTglMulai, max: todayLocal() } }}
          helperText="Untuk input backdate (misal siswa sebenarnya sudah pindah paket beberapa hari lalu), pilih tanggal di masa lalu — tidak boleh sebelum tanggal mulai paket aktif saat ini atau melebihi hari ini"
        />
        {hargaTerpilih && selesaiBaru && (
          <Alert severity="success" sx={{ mt: 2 }}>
            Periode baru: <strong>{formatDate(tglMulai)}</strong> sampai
            {' '}<strong>{formatDate(selesaiBaru)}</strong><br />
            Kuota: <strong>{hargaTerpilih.paket?.jumlah_pertemuan} pertemuan</strong><br />
            Tagihan baru: <strong>Rp {Number(hargaTerpilih.harga).toLocaleString('id-ID')}</strong>
          </Alert>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Batal</Button>
        <Button variant="contained" color="warning" onClick={handleSave} disabled={!paketId || !tglMulai || ganti.isPending}>
          {ganti.isPending ? 'Mengganti...' : 'Ganti Sekarang'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
