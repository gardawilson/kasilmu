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

const updateSW = registerSW({
  onNeedRefresh() {
    updateSW(true)
  },
  onRegisteredSW(_url, registration) {
    if (!registration) return
    setInterval(() => registration.update(), 60 * 60 * 1000)
  },
})

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 menit
      refetchOnWindowFocus: false,
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
