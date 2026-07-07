import React from 'react';
import { Box, Paper, Typography, TextField, Button } from '@mui/material';
import ComputerIcon from '@mui/icons-material/Computer';
import { useAbility } from '@casl/react';
import { AbilityContext } from '@repo/permissions';

export const RCForm: React.FC = () => {
  const ability = useAbility(AbilityContext);

  return (
    <Box sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
      <Paper sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <ComputerIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
          <Typography variant="h5">Configuration d'un Ordinateur (RC)</Typography>
        </Box>
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField label="Nom de la machine" variant="outlined" fullWidth />
          <TextField label="Adresse IP" variant="outlined" fullWidth />
          <TextField label="Système d'exploitation" variant="outlined" fullWidth />
          <Button variant="contained" color="primary" size="large" disabled={ability.cannot('write', 'ModuleRC')}>
            Enregistrer (Fictif)
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};
