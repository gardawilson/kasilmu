import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  Box, AppBar, Toolbar, Typography, Drawer, List, ListItemButton,
  ListItemIcon, ListItemText, IconButton, Avatar, Menu, MenuItem,
  InputBase,
} from '@mui/material'
import {
  Menu as MenuIcon, Dashboard, People, School,
  Receipt, Logout, Group, Assessment, HowToReg, Grade,
  ChevronLeft, AccountBalance,
  ManageAccounts,
  AccountTree,
  Search,
  NotificationsNone,
  KeyboardArrowDown,
  Add,
} from '@mui/icons-material'
import { useAuth } from '../../features/auth/useAuth'

const drawerWidth = 264
const drawerCollapsed = 76

const menu = [
  { label: 'Dashboard', icon: <Dashboard fontSize="small" />, path: '/', section: 'MENU' },
  { label: 'Siswa', icon: <People fontSize="small" />, path: '/siswa', section: 'AKADEMIK' },
  { label: 'Pengajar', icon: <Group fontSize="small" />, path: '/pengajar', section: 'AKADEMIK', hideForTutor: true },
  { label: 'Kelas', icon: <School fontSize="small" />, path: '/kelas', section: 'AKADEMIK' },
  { label: 'Sekolah', icon: <AccountBalance fontSize="small" />, path: '/sekolah', section: 'AKADEMIK', hideForTutor: true },
  { label: 'Jenjang & Tingkat', icon: <AccountTree fontSize="small" />, path: '/pendidikan', section: 'AKADEMIK', adminOnly: true },
  { label: 'Presensi', icon: <HowToReg fontSize="small" />, path: '/presensi', section: 'AKADEMIK' },
  { label: 'Nilai', icon: <Grade fontSize="small" />, path: '/nilai', section: 'AKADEMIK' },
  { label: 'Pembayaran', icon: <Receipt fontSize="small" />, path: '/pembayaran', section: 'KEUANGAN', hideForTutor: true },
  { label: 'Laporan', icon: <Assessment fontSize="small" />, path: '/laporan', section: 'KEUANGAN', hideForTutor: true },
  { label: 'Manajemen Akun', icon: <ManageAccounts fontSize="small" />, path: '/akun', section: 'SISTEM', adminOnly: true },
]

function SidebarContent({ collapsed, onNavigate }: { collapsed: boolean; onNavigate: () => void }) {
  const location = useLocation()
  const navigate = useNavigate()
  const { user } = useAuth()
  const isAdmin = !!user?.roles?.some((r) => r.name === 'admin')
  const isTutor = !!user?.roles?.some((r) => r.name === 'tutor')
  const visibleMenu = menu.filter((item) => (!item.adminOnly || isAdmin) && (!item.hideForTutor || !isTutor))
  const sections = [...new Set(visibleMenu.map((item) => item.section))]

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'white' }}>
      <Box sx={{
        p: collapsed ? 1.5 : 2.5,
        display: 'flex', alignItems: 'center', gap: 1.5,
        minHeight: 64,
      }}>
        <Box sx={{
          width: 34, height: 34, borderRadius: 2,
          bgcolor: 'primary.main',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <Typography sx={{ color: 'white', fontWeight: 800, fontSize: 17, lineHeight: 1 }}>K</Typography>
        </Box>
        {!collapsed && (
          <Typography sx={{ color: '#202224', fontWeight: 800, fontSize: 17, lineHeight: 1.2 }}>
            Kasilmu
          </Typography>
        )}
      </Box>

      <Box sx={{ overflowY: 'auto', flex: 1, py: 1, px: collapsed ? 1 : 2 }}>
        {sections.map((section) => (
          <Box key={section} sx={{ mb: 0.5 }}>
            {!collapsed && (
              <Typography sx={{ fontSize: 11, fontWeight: 600, color: '#94a3b8', letterSpacing: '0.06em', px: 1.5, mb: 1, mt: 2 }}>
                {section}
              </Typography>
            )}
            <List disablePadding>
              {visibleMenu.filter((item) => item.section === section).map((item) => {
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
                      minHeight: 42,
                      position: 'relative',
                      bgcolor: isActive ? 'rgba(72,128,255,0.08)' : 'transparent',
                      '&:hover': {
                        bgcolor: isActive ? 'rgba(72,128,255,0.08)' : '#f5f6fa',
                      },
                      '&::before': isActive ? {
                        content: '""',
                        position: 'absolute',
                        left: collapsed ? -9 : -17, top: 6, bottom: 6, width: 4,
                        borderRadius: '0 4px 4px 0',
                        bgcolor: 'primary.main',
                      } : undefined,
                      transition: 'background-color 0.15s ease',
                    }}
                  >
                    <ListItemIcon sx={{
                      minWidth: collapsed ? 0 : 36,
                      justifyContent: 'center',
                      color: isActive ? 'primary.main' : '#a0aec0',
                    }}>
                      {item.icon}
                    </ListItemIcon>
                    {!collapsed && (
                      <ListItemText
                        primary={item.label}
                        sx={{
                          '& .MuiListItemText-primary': {
                            fontSize: 14,
                            fontWeight: isActive ? 600 : 500,
                            color: isActive ? 'primary.main' : '#334155',
                          }
                        }}
                      />
                    )}
                  </ListItemButton>
                )
              })}
            </List>
          </Box>
        ))}
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
        <Toolbar sx={{ gap: 1.5 }}>
          <IconButton
            onClick={() => {
              if (window.innerWidth >= 900) setDesktopCollapsed(!desktopCollapsed)
              else setMobileOpen(!mobileOpen)
            }}
            sx={{ color: '#64748b' }}
          >
            {desktopCollapsed ? <MenuIcon /> : <ChevronLeft />}
          </IconButton>

          <Box sx={{
            display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 1,
            bgcolor: '#f5f6fa', border: '1px solid #e6e9f0', borderRadius: 999, px: 2, py: 0.9,
            width: 320, maxWidth: '40vw',
          }}>
            <Search sx={{ fontSize: 18, color: '#a0aec0' }} />
            <InputBase placeholder="Cari..." sx={{ fontSize: 14, flex: 1, color: '#202224' }} />
          </Box>

          <Box sx={{ flex: 1 }}>
            {currentPage && (
              <Typography sx={{ display: { xs: 'block', sm: 'none' }, fontWeight: 600, color: '#202224', fontSize: 15 }}>
                {currentPage.label}
              </Typography>
            )}
          </Box>

          <IconButton sx={{ color: '#94a3b8', display: { xs: 'none', sm: 'inline-flex' } }}>
            <Add sx={{ fontSize: 22 }} />
          </IconButton>

          <IconButton sx={{ color: '#94a3b8' }}>
            <NotificationsNone sx={{ fontSize: 22 }} />
          </IconButton>

          <Box
            onClick={(e) => setAnchorEl(e.currentTarget)}
            sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer', pl: 0.5 }}
          >
            <Avatar sx={{ width: 34, height: 34, bgcolor: 'primary.main', fontSize: 14, fontWeight: 700 }}>
              {user?.name?.charAt(0)?.toUpperCase()}
            </Avatar>
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
              <Typography sx={{ fontSize: 13, fontWeight: 600, color: '#202224', lineHeight: 1.2 }}>
                {user?.name}
              </Typography>
            </Box>
            <KeyboardArrowDown sx={{ fontSize: 18, color: '#94a3b8', display: { xs: 'none', md: 'block' } }} />
          </Box>
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
              <Typography sx={{ fontWeight: 600, fontSize: 14, color: '#202224' }}>{user?.name}</Typography>
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
