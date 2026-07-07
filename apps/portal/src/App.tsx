import React, { useState, useMemo, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import { 
  AppBar, Toolbar, Typography, Button, Box, Select, MenuItem, SelectChangeEvent, 
  Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, CssBaseline,
  CircularProgress
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import ComputerIcon from '@mui/icons-material/Computer';
import { useTranslation } from 'react-i18next';
import { User } from '@repo/types';
import { defineAbilityFor, AbilityContext, Can } from '@repo/permissions';
import { Login } from './components/Login';

// Lazy loading des applications et modules
const AdminApp = lazy(() => import('admin-app').then(module => ({ default: module.AdminApp })));
const DocsApp = lazy(() => import('docs-app').then(module => ({ default: module.DocsApp })));
const AbonnesForm = lazy(() => import('@repo/module-abonnes').then(module => ({ default: module.AbonnesForm })));
const RCForm = lazy(() => import('@repo/module-rc').then(module => ({ default: module.RCForm })));

const drawerWidth = 240;

const Home = () => {
  const { t } = useTranslation();
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4">{t('welcome')}</Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        Utilisez le menu latéral pour naviguer vers les différents modules (Abonnés, RC).
      </Typography>
    </Box>
  );
};

const AccessDenied = () => (
  <Box sx={{ p: 4 }}>
    <Typography variant="h4" color="error">Accès Refusé</Typography>
    <Typography variant="body1">Vous n'avez pas la permission d'accéder à cette page.</Typography>
  </Box>
);

const FallbackLoader = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', p: 4 }}>
    <CircularProgress />
  </Box>
);

export const App = () => {
  const { t, i18n } = useTranslation();
  const [user, setUser] = useState<User | null>(null);

  const ability = useMemo(() => {
    return user ? defineAbilityFor(user) : defineAbilityFor({ id: '', name: '', email: '', roles: ['portal'], activeRole: 'portal' } as any);
  }, [user]);

  const handleLanguageChange = (event: SelectChangeEvent<string>) => {
    i18n.changeLanguage(event.target.value);
  };

  const handleRoleChange = (event: SelectChangeEvent<string>) => {
    if (user) {
      setUser({ ...user, activeRole: event.target.value as any });
    }
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  return (
    <AbilityContext.Provider value={ability}>
      <BrowserRouter>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          
          <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Portal - Connecté en tant que {user.name} ({user.activeRole})
              </Typography>
              <Button color="inherit" component={Link} to="/">{t('home')}</Button>
              
              <Can I="read" a="AdminApp">
                <Button color="inherit" component={Link} to="/admin">{t('admin')}</Button>
              </Can>
              
              <Can I="read" a="DocsApp">
                <Button color="inherit" component={Link} to="/docs">{t('docs')}</Button>
              </Can>
              
              {user.roles.length > 1 && (
                <Select
                  value={user.activeRole}
                  onChange={handleRoleChange}
                  sx={{ ml: 2, color: 'white', '.MuiOutlinedInput-notchedOutline': { borderColor: 'white' }, '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'white' }, '.MuiSvgIcon-root ': { fill: "white !important" } }}
                  size="small"
                >
                  {user.roles.map(role => (
                    <MenuItem key={role} value={role}>{role}</MenuItem>
                  ))}
                </Select>
              )}

              <Select
                value={i18n.language}
                onChange={handleLanguageChange}
                sx={{ ml: 2, color: 'white', '.MuiOutlinedInput-notchedOutline': { borderColor: 'white' }, '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'white' }, '.MuiSvgIcon-root ': { fill: "white !important" } }}
                size="small"
              >
                <MenuItem value="fr">FR</MenuItem>
                <MenuItem value="en">EN</MenuItem>
              </Select>
              <Button color="inherit" onClick={handleLogout} sx={{ ml: 2 }}>Déconnexion</Button>
            </Toolbar>
          </AppBar>

          <Drawer
            variant="permanent"
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
            }}
          >
            <Toolbar />
            <Box sx={{ overflow: 'auto' }}>
              <List>
                <Can I="read" a="ModuleAbonnes">
                  <ListItem disablePadding>
                    <ListItemButton component={Link} to="/abonnes">
                      <ListItemIcon>
                        <PersonIcon />
                      </ListItemIcon>
                      <ListItemText primary="Abonnés" />
                    </ListItemButton>
                  </ListItem>
                </Can>

                <Can I="read" a="ModuleRC">
                  <ListItem disablePadding>
                    <ListItemButton component={Link} to="/rc">
                      <ListItemIcon>
                        <ComputerIcon />
                      </ListItemIcon>
                      <ListItemText primary="RC" />
                    </ListItemButton>
                  </ListItem>
                </Can>
              </List>
            </Box>
          </Drawer>

          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Toolbar />
            <Suspense fallback={<FallbackLoader />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/admin" element={ability.can('read', 'AdminApp') ? <AdminApp /> : <AccessDenied />} />
                <Route path="/docs" element={ability.can('read', 'DocsApp') ? <DocsApp /> : <AccessDenied />} />
                <Route path="/abonnes" element={ability.can('read', 'ModuleAbonnes') ? <AbonnesForm /> : <AccessDenied />} />
                <Route path="/rc" element={ability.can('read', 'ModuleRC') ? <RCForm /> : <AccessDenied />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </Suspense>
          </Box>
        </Box>
      </BrowserRouter>
    </AbilityContext.Provider>
  );
};

