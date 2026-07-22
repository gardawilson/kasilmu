import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  Box, AppBar, Toolbar, Typography, Drawer, List, ListItemButton,
  ListItemIcon, ListItemText, IconButton, Avatar, Menu, MenuItem, Divider,
} from '@mui/material'
import {
  Menu as MenuIcon, Dashboard, People, School, CalendarMonth,
  Receipt, Logout, Group, Assessment, HowToReg, Grade,
  ChevronLeft, AccountCircle, AccountBalance,
} from '@mui/icons-material'
import { useAuth } from '../../features/auth/useAuth'

const drawerWidth = 256
const drawerCollapsed = 72

const menu = [
  { label: 'Dashboard', icon: <Dashboard fontSize="small" />, path: '/', color: '#3b82f6' },
  { label: 'Siswa', icon: <People fontSize="small" />, path: '/siswa', color: '#10b981' },
  { label: 'Pengajar', icon: <Group fontSize="small" />, path: '/pengajar', color: '#8b5cf6' },
  { label: 'Kelas', icon: <School fontSize="small" />, path: '/kelas', color: '#0d9488' },
  { label: 'Sekolah', icon: <AccountBalance fontSize="small" />, path: '/sekolah', color: '#0284c7' },
  { label: 'Jadwal', icon: <CalendarMonth fontSize="small" />, path: '/jadwal', color: '#6366f1' },
  { label: 'Presensi', icon: <HowToReg fontSize="small" />, path: '/presensi', color: '#06b6d4' },
  { label: 'Pembayaran', icon: <Receipt fontSize="small" />, path: '/pembayaran', color: '#f97316' },
  { label: 'Nilai', icon: <Grade fontSize="small" />, path: '/nilai', color: '#ef4444' },
  { label: 'Laporan', icon: <Assessment fontSize="small" />, path: '/laporan', color: '#64748b' },
]

function SidebarContent({ collapsed, onNavigate }: { collapsed: boolean; onNavigate: () => void }) {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{
        background: 'linear-gradient(135deg, #0d9488 0%, #0f766e 100%)',
        p: collapsed ? 1.5 : 2,
        display: 'flex', alignItems: 'center', gap: 1.5,
        minHeight: 64,
      }}>
        <Box sx={{
          width: 36, height: 36, borderRadius: 2,
          bgcolor: 'rgba(255,255,255,0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <Typography sx={{ color: 'white', fontWeight: 800, fontSize: 18, lineHeight: 1 }}>K</Typography>
        </Box>
        {!collapsed && (
          <Box>
            <Typography sx={{ color: 'white', fontWeight: 700, fontSize: 15, lineHeight: 1.2 }}>
              Kasilmu
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.65)', fontSize: 11 }}>
              Manajemen Bimbel
            </Typography>
          </Box>
        )}
      </Box>

      <Box sx={{ overflowY: 'auto', flex: 1, py: 1.5, px: collapsed ? 0.75 : 1.25 }}>
        <List disablePadding>
          {menu.map((item) => {
            const isActive = location.pathname === item.path
            return (
              <ListItemButton
                key={item.path}
                onClick={() => { navigate(item.path); onNavigate() }}
                sx={{
                  borderRadius: 2,
                  mb: 0.5,
                  px: collapsed ? 1 : 1.5,
                  py: 1,
                  justifyContent: collapsed ? 'center' : 'flex-start',
                  minHeight: 44,
                  bgcolor: isActive ? 'primary.main' : 'transparent',
                  '&:hover': {
                    bgcolor: isActive ? 'primary.dark' : 'rgba(13, 148, 136, 0.06)',
                  },
                  transition: 'background-color 0.15s ease',
                }}
              >
                <ListItemIcon sx={{
                  minWidth: collapsed ? 0 : 36,
                  justifyContent: 'center',
                }}>
                  <Box sx={{
                    width: 30, height: 30, borderRadius: 1.5,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    bgcolor: isActive ? 'rgba(255,255,255,0.2)' : `${item.color}18`,
                    color: isActive ? 'white' : item.color,
                    transition: 'all 0.15s ease',
                  }}>
                    {item.icon}
                  </Box>
                </ListItemIcon>
                {!collapsed && (
                  <ListItemText
                    primary={item.label}
                    sx={{
                      '& .MuiListItemText-primary': {
                        fontSize: 14,
                        fontWeight: isActive ? 600 : 500,
                        color: isActive ? 'white' : '#334155',
                      }
                    }}
                  />
                )}
              </ListItemButton>
            )
          })}
        </List>
      </Box>

      <Divider />
      <Box sx={{ p: collapsed ? 0.75 : 1.25, pb: 2 }}>
        <Box sx={{
          display: 'flex', alignItems: 'center', gap: 1.5,
          px: collapsed ? 1 : 1.5, py: 1,
          borderRadius: 2,
          bgcolor: '#f8fafc',
        }}>
          <Box sx={{
            width: 30, height: 30, borderRadius: '50%',
            bgcolor: '#0d9488',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <AccountCircle sx={{ color: 'white', fontSize: 20 }} />
          </Box>
          {!collapsed && (
            <Typography sx={{ fontSize: 12, fontWeight: 500, color: '#64748b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              Kasilmu Admin
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [desktopCollapsed, setDesktopCollapsed] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const currentPage = menu.find((m) => m.path === location.pathname)

  const handleLogout = async () => {
    setAnchorEl(null)
    await logout()
    navigate('/login')
  }

  return (
    <Box sx={{ display: 'flex', bgcolor: 'background.default', minHeight: '100vh' }}>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: 'white',
          borderBottom: '1px solid #e2e8f0',
          zIndex: (t) => t.zIndex.drawer + 1,
          ml: { md: desktopCollapsed ? `${drawerCollapsed}px` : `${drawerWidth}px` },
          width: { md: `calc(100% - ${desktopCollapsed ? drawerCollapsed : drawerWidth}px)` },
          transition: 'margin-left 0.2s ease, width 0.2s ease',
        }}
      >
        <Toolbar sx={{ gap: 1 }}>
          <IconButton
            onClick={() => {
              if (window.innerWidth >= 900) setDesktopCollapsed(!desktopCollapsed)
              else setMobileOpen(!mobileOpen)
            }}
            sx={{ color: '#64748b' }}
          >
            {desktopCollapsed ? <MenuIcon /> : <ChevronLeft />}
          </IconButton>

          <Box sx={{ flex: 1 }}>
            {currentPage && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{
                  width: 24, height: 24, borderRadius: 1,
                  bgcolor: `${currentPage.color}18`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: currentPage.color,
                }}>
                  {currentPage.icon}
                </Box>
                <Typography variant="body1" sx={{ fontWeight: 600, color: '#0f172a', fontSize: 15 }}>
                  {currentPage.label}
                </Typography>
              </Box>
            )}
          </Box>

          <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} sx={{ p: 0.5 }}>
            <Avatar sx={{ width: 34, height: 34, bgcolor: '#0d9488', fontSize: 14, fontWeight: 700 }}>
              {user?.name?.charAt(0)?.toUpperCase()}
            </Avatar>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            slotProps={{
              paper: {
                sx: { mt: 1, minWidth: 180, borderRadius: 2, border: '1px solid #e2e8f0' }
              }
            }}
          >
            <Box sx={{ px: 2, py: 1.5, borderBottom: '1px solid #f1f5f9' }}>
              <Typography sx={{ fontWeight: 600, fontSize: 14, color: '#0f172a' }}>{user?.name}</Typography>
              <Typography sx={{ fontSize: 12, color: '#64748b' }}>{user?.email}</Typography>
            </Box>
            <MenuItem onClick={handleLogout} sx={{ mt: 0.5, color: '#ef4444', fontSize: 14 }}>
              <Logout sx={{ mr: 1, fontSize: 16 }} /> Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          width: desktopCollapsed ? drawerCollapsed : drawerWidth,
          flexShrink: 0,
          transition: 'width 0.2s ease',
          '& .MuiDrawer-paper': {
            width: desktopCollapsed ? drawerCollapsed : drawerWidth,
            boxSizing: 'border-box',
            border: 'none',
            borderRight: '1px solid #e2e8f0',
            transition: 'width 0.2s ease',
            overflowX: 'hidden',
          },
        }}
      >
        <SidebarContent collapsed={desktopCollapsed} onNavigate={() => {}} />
      </Drawer>

      <Drawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { width: drawerWidth, border: 'none' },
        }}
      >
        <SidebarContent collapsed={false} onNavigate={() => setMobileOpen(false)} />
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${desktopCollapsed ? drawerCollapsed : drawerWidth}px)` },
          transition: 'width 0.2s ease',
          minHeight: '100vh',
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  )
}
