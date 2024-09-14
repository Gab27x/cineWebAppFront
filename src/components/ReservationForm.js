import React, { useState, useEffect } from 'react';
import {
  Container,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography
} from '@mui/material';
import api from '../api'; // Asegúrate de que api.js está configurado correctamente
import NavBar from './NavBarClient';  // Importa el componente NavBar
export default function ReservationForm() {
  const [clientName, setClientName] = useState('');
  const [email, setEmail] = useState('');
  const [reservedSeats, setReservedSeats] = useState('');
  const [selectedProjectionSchedule, setSelectedProjectionSchedule] = useState('');

  const [projectionSchedules, setProjectionSchedules] = useState([]);

  // Fetch projection schedules from the API
  const fetchProjectionSchedules = async () => {
    try {
      const response = await api.get('/projectionschedules/getAll');
      setProjectionSchedules(response.data);
    } catch (error) {
      console.error('Error fetching projection schedules:', error);
    }
  };

  useEffect(() => {
    fetchProjectionSchedules();
  }, []);

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const reservationData = {
      clientName,
      clientEmail: email,
      reservedSeats: parseInt(reservedSeats, 10),
      projectionSchedule: { id: selectedProjectionSchedule }
    };
    try {
      await api.post('/reservations/add', reservationData);
      alert('Reservation created successfully!');
      setClientName('');
      setEmail('');
      setReservedSeats('');
      setSelectedProjectionSchedule('');
    } catch (error) {
      console.error('Error creating reservation:', error);
      alert('Failed to create reservation.');
    }
  };

  return (
    
    <Container maxWidth="sm" style={{ marginTop: '50px' }}>
                 <NavBar /> {/* Añade el componente NavBar aquí */}
      <Typography variant="h4" align="center" gutterBottom>
        Create Reservation
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Client Name"
          fullWidth
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          required
          margin="normal"
        />

        <TextField
          label="Email"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          margin="normal"
        />

        <TextField
          label="Number of Reserved Seats"
          type="number"
          fullWidth
          value={reservedSeats}
          onChange={(e) => setReservedSeats(e.target.value)}
          required
          margin="normal"
        />

        <FormControl fullWidth margin="normal" required>
          <InputLabel>Projection Schedule</InputLabel>
          <Select
            value={selectedProjectionSchedule}
            onChange={(e) => setSelectedProjectionSchedule(e.target.value)}
          >
            {projectionSchedules.map((schedule) => (
              <MenuItem key={schedule.id} value={schedule.id}>
                {`${schedule.movie.title} - ${new Date(schedule.startTime).toLocaleString()}`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: '20px' }}
        >
          Create Reservation
        </Button>
      </form>
    </Container>
  );
}
