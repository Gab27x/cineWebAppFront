import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  MenuItem,
  Select,
  InputLabel,
  FormControl
} from '@mui/material';
import api from '../api'; // Asegúrate de que api.js está configurado correctamente
import NavBar from './NavBar';  // Importa el componente NavBar

export default function ProjectionSchedules() {
  const paperStyle = { padding: '20px', width: '100%', maxWidth: 800, margin: "20px auto" };
  const [startTime, setStartTime] = useState('');
  const [cinemaRooms, setCinemaRooms] = useState([]);
  const [movies, setMovies] = useState([]);
  const [selectedCinemaRoom, setSelectedCinemaRoom] = useState('');
  const [selectedMovie, setSelectedMovie] = useState('');
  const [schedules, setSchedules] = useState([]);

  // Fetch cinema rooms and movies from the API when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [roomsResponse, moviesResponse, schedulesResponse] = await Promise.all([
          api.get('/cinemarooms/getAll'),
          api.get('/movies/getAll'),
          api.get('/projectionschedules/getAll')
        ]);
        setCinemaRooms(roomsResponse.data);
        setMovies(moviesResponse.data);
        setSchedules(schedulesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Handle the form submission to add a new projection schedule
  const handleClick = async (e) => {
    e.preventDefault();
    const newSchedule = {
      startTime,
      cinemaRoom: { id: selectedCinemaRoom },
      movie: { id: selectedMovie }
    };

    try {
      await api.post('/projectionschedules/add', newSchedule);
      setSchedules([...schedules, newSchedule]); // Update the list with the new schedule
      setStartTime('');
      setSelectedCinemaRoom('');
      setSelectedMovie('');
    } catch (error) {
      console.error('Error adding projection schedule:', error);
    }
  };

  return (
    <Container>
      <NavBar /> {/* Añade el componente NavBar aquí */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        {/* Form Section */}
        <Paper style={paperStyle}>
          <Typography variant="h4" gutterBottom>
            Add Projection Schedule
          </Typography>
          <form onSubmit={handleClick}>
            <TextField
              label="Start Time"
              type="datetime-local"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              fullWidth
              required
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel id="cinema-room-select-label">Cinema Room</InputLabel>
              <Select
                labelId="cinema-room-select-label"
                value={selectedCinemaRoom}
                onChange={(e) => setSelectedCinemaRoom(e.target.value)}
                required
              >
                {cinemaRooms.map((room) => (
                  <MenuItem key={room.id} value={room.id}>
                    {room.roomNumber}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel id="movie-select-label">Movie</InputLabel>
              <Select
                labelId="movie-select-label"
                value={selectedMovie}
                onChange={(e) => setSelectedMovie(e.target.value)}
                required
              >
                {movies.map((movie) => (
                  <MenuItem key={movie.id} value={movie.id}>
                    {movie.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginTop: '20px', display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
            >
              Add Schedule
            </Button>
          </form>
        </Paper>

        {/* Table Section */}
        <Paper style={{ padding: '20px', width: '100%', maxWidth: 800, margin: "20px" }}>
          <Typography variant="h6" gutterBottom>
            Projection Schedule List
          </Typography>
          <TableContainer>
            <Table aria-label="projection schedules table">
              <TableHead>
                <TableRow>
                  <TableCell><strong>Start Time</strong></TableCell>
                  <TableCell><strong>Movie</strong></TableCell>
                  <TableCell><strong>Cinema Room</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {schedules.map((schedule) => (
                  <TableRow key={schedule.id}>
                    <TableCell>{new Date(schedule.startTime).toLocaleString()}</TableCell>
                    <TableCell>{schedule.movie.title}</TableCell>
                    <TableCell>{schedule.cinemaRoom.roomNumber}</TableCell>
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
