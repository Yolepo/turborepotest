import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { globalTheme } from '@repo/theme';
import { AbilityContext, defineAbilityFor } from '@repo/permissions';
import { RCForm } from './RCForm';

// Création d'un utilisateur fictif avec les droits nécessaires pour le développement
const mockUser = {
  id: 'dev-user',
  name: 'Dev User',
  email: 'dev@example.com',
  roles: ['admin', 'portal'],
  activeRole: 'admin'
} as any;

const ability = defineAbilityFor(mockUser);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AbilityContext.Provider value={ability}>
      <ThemeProvider theme={globalTheme}>
        <CssBaseline />
        <RCForm />
      </ThemeProvider>
    </AbilityContext.Provider>
  </React.StrictMode>
);
