import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Paper, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, styled } from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';
import api from '../api';  // Asegúrate de que api.js está configurado correctamente

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export default function Movies() {
    const paperStyle = { padding: '50px 20px', margin: "20px auto", maxWidth: 600, display: 'flex', flexDirection: 'column', alignItems: 'center' };
    const [title, setTitle] = useState('');
    const [director, setDirector] = useState('');
    const [duration, setDuration] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [movies, setMovies] = useState([]);

    // Fetch movies from the API when the component mounts
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await api.get('/movies/getAll');
                setMovies(response.data);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        fetchMovies();
    }, []);

    // Handle the form submission to add a new movie
    const handleClick = async (e) => {
        e.preventDefault();
        const newMovie = {
            title,
            director,
            duration: parseInt(duration, 10),
            releaseDate
        };

        try {
            await api.post('/movies/add', newMovie);
            setMovies([...movies, newMovie]); // Update the list with the new movie
            setTitle('');
            setDirector('');
            setDuration('');
            setReleaseDate('');
        } catch (error) {
            console.error('Error adding movie:', error);
        }
    };

    return (
        <Container maxWidth="lg" style={{ display: 'flex', justifyContent: 'center' }}> {/* Center the container */}
            <Grid container spacing={3}>
                {/* Column for the add movie form */}
                <Grid item xs={12} md={4}>
                    <Paper style={paperStyle}>
                        <Typography variant="h4" gutterBottom>
                            Add Movie
                        </Typography>
                        <form onSubmit={handleClick} style={{ width: '100%' }}>
                            <TextField
                                label="Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                fullWidth
                                required
                                margin="normal"
                            />
                            <TextField
                                label="Director"
                                value={director}
                                onChange={(e) => setDirector(e.target.value)}
                                fullWidth
                                required
                                margin="normal"
                            />
                            <TextField
                                label="Duration (minutes)"
                                type="number"
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                                fullWidth
                                required
                                margin="normal"
                            />
                            <TextField
                                label="Release Date"
                                type="date"
                                value={releaseDate}
                                onChange={(e) => setReleaseDate(e.target.value)}
                                fullWidth
                                required
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true, // Ensures that the label stays above the input
                                }}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                style={{ marginTop: '20px', display: 'block', marginLeft: 'auto', marginRight: 'auto' }} // Center the button
                            >
                                Add Movie
                            </Button>
                        </form>
                    </Paper>
                </Grid>
                {/* Column for the list of movies */}
                <Grid item xs={12} md={8}>
                    <Paper style={{ padding: '20px', width: '100%' }}>
                        <Typography variant="h6" gutterBottom>
                            Movie List
                        </Typography>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>Title</StyledTableCell>
                                        <StyledTableCell align="right">Director</StyledTableCell>
                                        <StyledTableCell align="right">Duration (minutes)</StyledTableCell>
                                        <StyledTableCell align="right">Release Date</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {movies.map((movie) => (
                                        <StyledTableRow key={movie.id}>
                                            <StyledTableCell component="th" scope="row">
                                                {movie.title}
                                            </StyledTableCell>
                                            <StyledTableCell align="right">{movie.director}</StyledTableCell>
                                            <StyledTableCell align="right">{movie.duration}</StyledTableCell>
                                            <StyledTableCell align="right">{new Date(movie.releaseDate).toLocaleDateString()}</StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}
