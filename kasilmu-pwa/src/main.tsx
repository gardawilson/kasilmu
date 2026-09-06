import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { registerSW } from 'virtual:pwa-register'
import theme from './lib/theme'
import { AuthProvider } from './features/auth/useAuth'
import App from './App'

let refreshing = false
const forceReload = () => {
  if (refreshing) return
  refreshing = true
  window.location.reload()
}

registerSW({
  // Mode autoUpdate: hook ini dipanggil saat service worker baru telah
  // take-control. Reload otomatis supaya client langsung dapat bundle terbaru
  // tanpa perlu refresh manual / hapus cache Chrome.
  onNeedReload() {
    forceReload()
  },
  onOfflineReady() {},
  onRegisteredSW(_url, registration) {
    if (!registration) return
    const check = () => { registration.update().catch(() => {}) }
    // Cek update sesegera mungkin, lalu berkala + saat app kembali dibuka/
    // di-fokus, supaya client yang tidak dibuka tidak nyangkut di app shell basi.
    check()
    const interval = setInterval(check, 30 * 60 * 1000)
    const onVisible = () => {
      if (document.visibilityState === 'visible') check()
    }
    const onWake = () => check()
    document.addEventListener('visibilitychange', onVisible)
    window.addEventListener('pageshow', onWake)
    window.addEventListener('online', onWake)
    window.addEventListener('beforeunload', () => {
      clearInterval(interval)
      document.removeEventListener('visibilitychange', onVisible)
      window.removeEventListener('pageshow', onWake)
      window.removeEventListener('online', onWake)
    })
  },
})

// Fallback keamanan: kalau browser mengganti service worker tanpa memicu
// onNeedReload (edge case Android/Chrome), tetap paksa reload supaya client
// tidak terus menjalankan app shell lama.
if ('serviceWorker' in navigator) {
  let hadController = !!navigator.serviceWorker.controller
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (!hadController) {
      // Kontrol pertama = instalasi awal, bukan update — jangan reload.
      hadController = true
      return
    }
    forceReload()
  })
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 menit
      refetchOnWindowFocus: false,
      // Jangan retry error 4xx (mis. 403 role, 422 validasi) — hanya bikin
      // banjir request & gampang men-trigger firewall hosting.
      retry: (failureCount, error: unknown) => {
        const status = (error as { response?: { status?: number } })?.response?.status
        if (status && status >= 400 && status < 500) return false
        return failureCount < 2
      },
    },
  },
})

ReactDOM.createRoot(document.getElementById('app')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <AuthProvider>
            <App />
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
