import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import api from '../api'; // Asegúrate de que api.js está configurado correctamente
import NavBar from './NavBar';  // Importa el componente NavBar
export default function CinemaRooms() {
  const paperStyle = { padding: '20px', width: '100%', maxWidth: 800, margin: '20px auto' };
  const [roomNumber, setRoomNumber] = useState('');
  const [capacity, setCapacity] = useState('');
  const [rooms, setRooms] = useState([]);

  // Fetch cinema rooms from the API when the component mounts
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await api.get('/cinemarooms/getAll');
        setRooms(response.data);
      } catch (error) {
        console.error('Error fetching cinema rooms:', error);
      }
    };

    fetchRooms();
  }, []);

  // Handle the form submission to add a new cinema room
  const handleClick = async (e) => {
    e.preventDefault();
    const newRoom = {
      roomNumber,
      capacity: parseInt(capacity, 10),
    };

    try {
      await api.post('/cinemarooms/add', newRoom);
      setRooms([...rooms, newRoom]); // Update the list with the new room
      setRoomNumber('');
      setCapacity('');
    } catch (error) {
      console.error('Error adding cinema room:', error);
    }
  };

  return (
    <Container>
                 <NavBar /> {/* Añade el componente NavBar aquí */}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Form Section */}
        <Paper style={paperStyle}>
          <Typography variant="h4" gutterBottom>
            Add Cinema Room
          </Typography>
          <form onSubmit={handleClick}>
            <TextField
              label="Room Number"
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Capacity"
              type="number"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              fullWidth
              required
              margin="normal"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginTop: '20px', display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
            >
              Add Room
            </Button>
          </form>
        </Paper>

        {/* Table Section */}
        <Paper style={{ padding: '20px', width: '100%', maxWidth: 800, margin: '20px' }}>
          <Typography variant="h6" gutterBottom>
            Cinema Room List
          </Typography>
          <TableContainer>
            <Table aria-label="cinema rooms table">
              <TableHead>
                <TableRow>
                  <TableCell><strong>Room Number</strong></TableCell>
                  <TableCell align="right"><strong>Capacity</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rooms.map((room) => (
                  <TableRow key={room.id}>
                    <TableCell component="th" scope="row">
                      {room.roomNumber}
                    </TableCell>
                    <TableCell align="right">{room.capacity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
    </Container>
  );
}
