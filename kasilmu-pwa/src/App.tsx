import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './features/auth/useAuth'
import LoginPage from './features/auth/LoginPage'
import DashboardPage from './features/dashboard/DashboardPage'
import SiswaPage from './features/siswa/SiswaPage'
import PengajarPage from './features/pengajar/PengajarPage'
import KelasPage from './features/kelas/KelasPage'
import AkunPage from './features/akun/AkunPage'
import SekolahPage from './features/sekolah/SekolahPage'
import PendidikanPage from './features/pendidikan/PendidikanPage'
import PertemuanPage from './features/pertemuan/PertemuanPage'
import PembayaranPage from './features/pembayaran/PembayaranPage'
import NilaiPage from './features/nilai/NilaiPage'
import LaporanPage from './features/laporan/LaporanPage'
import Layout from './components/Layout/Layout'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()

  if (loading) return null
  if (!user) return <Navigate to="/login" replace />

  return <Layout>{children}</Layout>
}

// Dashboard hanya untuk admin. Role lain (tutor dsb.) diarahkan ke halaman
// presensi supaya tidak menembak endpoint admin-only dan memicu 403.
function HomeRoute() {
  const { user } = useAuth()
  const isAdmin = !!user?.roles?.some((r) => r.name === 'admin')
  if (!isAdmin) return <Navigate to="/presensi" replace />
  return <DashboardPage />
}

export default function App() {
  const { user, loading } = useAuth()

  if (loading) return null

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/" replace /> : <LoginPage />} />
      <Route path="/" element={<ProtectedRoute><HomeRoute /></ProtectedRoute>} />
      <Route path="/siswa" element={<ProtectedRoute><SiswaPage /></ProtectedRoute>} />
      <Route path="/pengajar" element={<ProtectedRoute><PengajarPage /></ProtectedRoute>} />
      <Route path="/kelas" element={<ProtectedRoute><KelasPage /></ProtectedRoute>} />
      <Route path="/sekolah" element={<ProtectedRoute><SekolahPage /></ProtectedRoute>} />
      <Route path="/pendidikan" element={<ProtectedRoute><PendidikanPage /></ProtectedRoute>} />
      <Route path="/presensi" element={<ProtectedRoute><PertemuanPage /></ProtectedRoute>} />
      <Route path="/pembayaran" element={<ProtectedRoute><PembayaranPage /></ProtectedRoute>} />
      <Route path="/nilai" element={<ProtectedRoute><NilaiPage /></ProtectedRoute>} />
      <Route path="/laporan" element={<ProtectedRoute><LaporanPage /></ProtectedRoute>} />
      <Route path="/akun" element={<ProtectedRoute><AkunPage /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
