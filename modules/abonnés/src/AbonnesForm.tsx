import React from 'react';
import { Box, Paper, Typography, TextField, Button } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

export const AbonnesForm: React.FC = () => {
  return (
    <Box sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
      <Paper sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <PersonIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
          <Typography variant="h5">Création d'un Abonné</Typography>
        </Box>
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField label="Nom" variant="outlined" fullWidth />
          <TextField label="Prénom" variant="outlined" fullWidth />
          <TextField label="Adresse Email" variant="outlined" fullWidth type="email" />
          <Button variant="contained" color="primary" size="large">Enregistrer (Fictif)</Button>
        </Box>
      </Paper>
    </Box>
  );
};
