import { useEffect, useState } from 'react'
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button,
  Table, TableHead, TableRow, TableCell, TableBody, IconButton,
  TextField, MenuItem, Box, Typography, Alert, Chip, Tooltip,
} from '@mui/material'
import { Delete, PersonRemove, Add, SwapHoriz } from '@mui/icons-material'
import { useKelasDetail, useAddSiswaKelas, useRemoveSiswaKelas } from './useKelas'
import { useSiswa } from '../siswa/useSiswa'
import {
  useCreateSiswaPaket, useHargaPaket, useGantiPaket, useDeleteSiswaPaket, useSiswaPaketAktif,
} from '../paket/usePaket'
import DeleteDialog from '../../components/ui/DeleteDialog'
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

interface Props {
  open: boolean
  onClose: () => void
  kelasId: number | null
}

export default function KelasSiswaDialog({ open, onClose, kelasId }: Props) {
  const { data: detail, isLoading } = useKelasDetail(kelasId ?? 0)
  const { data: allSiswa } = useSiswa({ per_page: 100, belum_berkelas: true })
  const { data: hargaPaketList } = useHargaPaket(kelasId ?? 0)
  const add = useAddSiswaKelas(kelasId ?? 0)
  const remove = useRemoveSiswaKelas(kelasId ?? 0)
  const [selectedSiswa, setSelectedSiswa] = useState('')
  const [addError, setAddError] = useState('')

  const hargaPakets = hargaPaketList?.data ?? []

  const handleAdd = async () => {
    if (!selectedSiswa) return
    setAddError('')
    try {
      await add.mutateAsync(Number(selectedSiswa))
      setSelectedSiswa('')
    } catch (err: unknown) {
      const msg = (err as any)?.response?.data?.message || 'Gagal menambahkan siswa'
      setAddError(msg)
    }
  }

  const siswaTerdaftar = detail?.data?.siswa ?? []
  const kapasitas = detail?.data?.kapasitas ?? Infinity
  const isFull = siswaTerdaftar.length >= kapasitas

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {detail?.data?.nama ?? 'Kelas'} — Daftar Siswa
      </DialogTitle>
      <DialogContent>
        {isLoading ? (
          <Typography>Memuat...</Typography>
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
            {addError && <Alert severity="error" sx={{ mb: 2 }}>{addError}</Alert>}
            <Box sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'center' }}>
              <TextField select size="small" sx={{ minWidth: 250 }}
                label="Tambah Siswa" value={selectedSiswa} disabled={isFull}
                onChange={(e) => setSelectedSiswa(e.target.value)}
                slotProps={{ select: { displayEmpty: true }, inputLabel: { shrink: true } }}>
                <MenuItem value="" disabled>-- Pilih Siswa --</MenuItem>
                {allSiswa?.data?.map((s) => (
                  <MenuItem key={s.id} value={s.id}>{s.nama} ({s.nis})</MenuItem>
                ))}
              </TextField>
              <Button variant="contained" size="small" startIcon={<Add />}
                onClick={handleAdd} disabled={isFull || !selectedSiswa || add.isPending}>
                Tambah
              </Button>
            </Box>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>NIS</TableCell>
                  <TableCell>Nama</TableCell>
                  <TableCell>Sekolah</TableCell>
                  <TableCell>Paket</TableCell>
                  <TableCell align="center">Aksi</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {siswaTerdaftar.length === 0 ? (
                  <TableRow><TableCell colSpan={5} align="center">Belum ada siswa</TableCell></TableRow>
                ) : (
                  siswaTerdaftar.map((siswa) => (
                    <SiswaRow
                      key={siswa.id}
                      siswa={siswa}
                      kelasId={kelasId ?? 0}
                      hargaPakets={hargaPakets}
                      onRemove={() => remove.mutateAsync(siswa.id)}
                      removing={remove.isPending}
                    />
                  ))
                )}
              </TableBody>
            </Table>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Tutup</Button>
      </DialogActions>
    </Dialog>
  )
}

function SiswaRow({
  siswa, kelasId, hargaPakets, onRemove, removing,
}: {
  siswa: Siswa
  kelasId: number
  hargaPakets: HargaPaket[]
  onRemove: () => void
  removing: boolean
}) {
  const { data: aktifPaket } = useSiswaPaketAktif(siswa.id)
  const deletePaket = useDeleteSiswaPaket()
  const [inputOpen, setInputOpen] = useState(false)
  const [gantiOpen, setGantiOpen] = useState(false)
  const [hapusPaketOpen, setHapusPaketOpen] = useState(false)
  const [hapusPaketError, setHapusPaketError] = useState('')

  const active = aktifPaket?.data

  const handleHapusPaket = async () => {
    if (!active) return
    setHapusPaketError('')
    try {
      await deletePaket.mutateAsync(active.id)
      setHapusPaketOpen(false)
    } catch (err: unknown) {
      setHapusPaketError((err as any)?.response?.data?.message || 'Gagal menghapus paket')
    }
  }

  return (
    <TableRow>
      <TableCell>{siswa.nis}</TableCell>
      <TableCell>{siswa.nama}</TableCell>
      <TableCell>{siswa.sekolah?.nama || '-'}</TableCell>
      <TableCell>
        {active ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0.5 }}>
            <Chip label={`${active.paket?.nama ?? '-'} (sisa ${active.sisa_pertemuan ?? '?'})`} size="small"
              sx={{ bgcolor: '#dcfce7', color: '#15803d', fontWeight: 600 }} />
            <Typography variant="caption" color="text.secondary">
              {new Date(active.tgl_mulai).toLocaleDateString('id-ID')}–{new Date(active.tgl_selesai).toLocaleDateString('id-ID')}
            </Typography>
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              <Button size="small" variant="outlined" startIcon={<SwapHoriz />}
                onClick={() => setGantiOpen(true)}>
                Ganti Paket
              </Button>
              <Tooltip title="Hapus Paket">
                <IconButton size="small" color="error" onClick={() => setHapusPaketOpen(true)}>
                  <Delete fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
            <GantiPaketDialog
              open={gantiOpen}
              onClose={() => setGantiOpen(false)}
              active={active}
              hargaPakets={hargaPakets}
            />
            <DeleteDialog
              open={hapusPaketOpen}
              title="Hapus Paket"
              description={hapusPaketError || `Paket "${active.paket?.nama}" milik ${siswa.nama} akan dihapus beserta tagihannya. Tindakan ini tidak dapat dibatalkan.`}
              loading={deletePaket.isPending}
              onClose={() => { setHapusPaketOpen(false); setHapusPaketError('') }}
              onConfirm={handleHapusPaket}
            />
          </Box>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
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
      </TableCell>
      <TableCell align="center">
        <Tooltip title="Keluarkan dari Kelas">
          <IconButton size="small" color="error" onClick={onRemove} disabled={removing}>
            <PersonRemove fontSize="small" />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  )
}

function InputPaketDialog({
  open, onClose, siswa, kelasId, hargaPakets,
}: {
  open: boolean
  onClose: () => void
  siswa: Siswa
  kelasId: number
  hargaPakets: HargaPaket[]
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
      <DialogTitle>Input Paket — {siswa.nama}</DialogTitle>
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
          {createSiswaPaket.isPending ? 'Menyimpan...' : 'Simpan'}
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
