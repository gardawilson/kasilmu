import { useEffect, useState } from 'react'
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button,
  Table, TableHead, TableRow, TableCell, TableBody, IconButton,
  TextField, MenuItem, Box, Typography, Alert, Chip,
} from '@mui/material'
import { Delete, Add, SwapHoriz } from '@mui/icons-material'
import { useKelasDetail, useAddSiswaKelas, useRemoveSiswaKelas } from './useKelas'
import { useSiswa } from '../siswa/useSiswa'
import {
  useCreateSiswaPaket, useHargaPaket, useJadwalkanGantiPaket, useSiswaPaketAktif,
} from '../paket/usePaket'
import type { HargaPaket, SiswaPaket } from '../../types'

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
  const { data: allSiswa } = useSiswa({ per_page: 100 })
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
                slotProps={{ select: { displayEmpty: true } }}>
                <MenuItem value="" disabled>-- Pilih Siswa --</MenuItem>
                {allSiswa?.data
                  ?.filter((s) => !siswaTerdaftar.some((ts: any) => ts.id === s.id))
                  .filter((s) => !(s.kelas as any[] | undefined)?.some((k) => k.pivot?.status === 'aktif'))
                  .map((s) => (
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
                  siswaTerdaftar.map((siswa: any) => (
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
  siswa: any
  kelasId: number
  hargaPakets: HargaPaket[]
  onRemove: () => void
  removing: boolean
}) {
  const { data: aktifPaket } = useSiswaPaketAktif(siswa.id)
  const createSiswaPaket = useCreateSiswaPaket()
  const [selectedPaket, setSelectedPaket] = useState('')
  const [tglMulai, setTglMulai] = useState(todayLocal())
  const [gantiOpen, setGantiOpen] = useState(false)

  const active = aktifPaket?.data

  const handleAssign = async () => {
    if (!selectedPaket) return
    await createSiswaPaket.mutateAsync({
      siswa_id: siswa.id,
      kelas_id: kelasId,
      paket_id: Number(selectedPaket),
      tgl_mulai: tglMulai,
    })
    setSelectedPaket('')
    setTglMulai(todayLocal())
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
            {active.paket_berikutnya ? (
              <Alert severity="info" sx={{ py: 0, px: 1, '& .MuiAlert-message': { py: 0.5 } }}>
                Berikutnya: <strong>{active.paket_berikutnya.paket?.nama}</strong>
                {' mulai '}{formatDate(active.paket_berikutnya.tgl_mulai)}
              </Alert>
            ) : null}
            <Button size="small" variant="outlined" startIcon={<SwapHoriz />}
              onClick={() => setGantiOpen(true)}>
              {active.paket_berikutnya ? 'Ubah Paket Berikutnya' : 'Ganti Paket'}
            </Button>
            <GantiPaketDialog
              open={gantiOpen}
              onClose={() => setGantiOpen(false)}
              active={active}
              hargaPakets={hargaPakets}
            />
          </Box>
        ) : (
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <TextField select size="small" value={selectedPaket}
              onChange={(e) => setSelectedPaket(e.target.value)}
              sx={{ minWidth: 160 }}
              slotProps={{ select: { displayEmpty: true } }}>
              <MenuItem value="" disabled>Pilih Paket</MenuItem>
              {hargaPakets.map((h) => (
                <MenuItem key={h.paket_id} value={h.paket_id}>
                  {h.paket?.nama} — Rp {Number(h.harga).toLocaleString('id-ID')}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Mulai Paket"
              type="date"
              size="small"
              value={tglMulai}
              onChange={(e) => setTglMulai(e.target.value)}
              slotProps={{ inputLabel: { shrink: true } }}
              sx={{ minWidth: 145 }}
            />
            <Button size="small" variant="contained" disabled={!selectedPaket || !tglMulai || createSiswaPaket.isPending}
              onClick={handleAssign}>
              Simpan
            </Button>
          </Box>
        )}
      </TableCell>
      <TableCell align="center">
        <IconButton size="small" color="error" onClick={onRemove} disabled={removing}>
          <Delete fontSize="small" />
        </IconButton>
      </TableCell>
    </TableRow>
  )
}

function GantiPaketDialog({ open, onClose, active, hargaPakets }: {
  open: boolean
  onClose: () => void
  active: SiswaPaket
  hargaPakets: HargaPaket[]
}) {
  const jadwalkan = useJadwalkanGantiPaket(active.id)
  const [paketId, setPaketId] = useState('')
  const [error, setError] = useState('')
  const paketBerikutnya = active.paket_berikutnya
  const mulaiBerikutnya = active.tgl_selesai.slice(0, 10)
  const selesaiBerikutnya = addMonthNoOverflow(mulaiBerikutnya)
  const hargaTerpilih = hargaPakets.find((harga) => harga.paket_id === Number(paketId))

  useEffect(() => {
    if (!open) return
    setPaketId(paketBerikutnya ? String(paketBerikutnya.paket_id) : '')
    setError('')
  }, [open, paketBerikutnya])

  const handleSave = async () => {
    if (!paketId) return
    setError('')

    try {
      await jadwalkan.mutateAsync(Number(paketId))
      onClose()
    } catch (err: unknown) {
      setError((err as any)?.response?.data?.message || 'Gagal menjadwalkan pergantian paket')
    }
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{paketBerikutnya ? 'Ubah Paket Berikutnya' : 'Ganti Paket Periode Berikutnya'}</DialogTitle>
      <DialogContent>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <Alert severity="info" sx={{ mb: 2 }}>
          Paket aktif <strong>{active.paket?.nama}</strong> tetap berlaku sampai
          {' '}<strong>{formatDate(active.tgl_selesai)}</strong>. Riwayat presensi dan sisa kuotanya tidak berubah.
        </Alert>
        <TextField
          label="Paket Berikutnya"
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
        {hargaTerpilih && (
          <Alert severity="success" sx={{ mt: 2 }}>
            Periode baru: <strong>{formatDate(mulaiBerikutnya)}</strong> sampai
            {' '}<strong>{formatDate(selesaiBerikutnya)}</strong><br />
            Kuota: <strong>{hargaTerpilih.paket?.jumlah_pertemuan} pertemuan</strong><br />
            Tagihan baru: <strong>Rp {Number(hargaTerpilih.harga).toLocaleString('id-ID')}</strong>
          </Alert>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Batal</Button>
        <Button variant="contained" onClick={handleSave} disabled={!paketId || jadwalkan.isPending}>
          {jadwalkan.isPending ? 'Menjadwalkan...' : 'Jadwalkan Pergantian'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
