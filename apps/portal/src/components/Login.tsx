import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import { login } from '@repo/auth';
import { User } from '@repo/types';

interface LoginProps {
  onLogin: (user: User) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = login(username, password);
    if (user) {
      onLogin(user);
    } else {
      setError('Identifiants incorrects.');
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: 'background.default' }}>
      <Paper sx={{ p: 4, width: 400 }}>
        <Typography variant="h5" gutterBottom textAlign="center">Connexion</Typography>
        <form onSubmit={handleSubmit}>
          <TextField 
            label="Nom d'utilisateur" 
            fullWidth 
            margin="normal" 
            value={username} 
            onChange={e => setUsername(e.target.value)} 
          />
          <TextField 
            label="Mot de passe" 
            type="password" 
            fullWidth 
            margin="normal" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
          />
          {error && <Typography color="error" variant="body2">{error}</Typography>}
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
            Se connecter
          </Button>
        </form>
      </Paper>
    </Box>
  );
};
