import React from 'react';
import { Container, Button, Typography, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate(); // Hook para la navegación

  // Handlers para los botones
  const handleAdminClick = () => {
    navigate('/movies'); // Redirige a la página de Movies
  };

  const handleClientClick = () => {
    navigate('/reservation-form'); // Redirige a la página de Reserva
  };

  return (
    <Container 
      component="main" 
      maxWidth="xs" 
      style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100vh' }}
    >
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Welcome to My Cinema
        <br />
        Select your user
      </Typography>
      <Grid container spacing={4} style={{ marginTop: '40px' }}>
        <Grid item xs={6} container justifyContent="flex-start">
          <Button 
            variant="contained" 
            color="primary" 
            size="large" 
            style={{ 
              width: '300px', 
              height: '150px', 
              fontSize: '2rem',
              borderRadius: '12px' 
            }} 
            onClick={handleAdminClick}
          >
            Admin
          </Button>
        </Grid>
        <Grid item xs={6} container justifyContent="flex-end">
          <Button 
            variant="contained" 
            color="secondary" 
            size="large" 
            style={{ 
              width: '300px', 
              height: '150px', 
              fontSize: '2rem',
              borderRadius: '12px' 
            }} 
            onClick={handleClientClick}
          >
            Client
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
