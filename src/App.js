
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Movies from './components/Movies'; 
import CinemaRooms from './components/CinemaRooms';
import ProjectionsSchedule from './components/ProjectionSchedule';
import Home from './components/Home';
import ReservationForm from './components/ReservationForm';

// Asegúrate de que la ruta sea correcta
//import Home from './components/Home'; // O cualquier otro componente de inicio

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/cinema-rooms" element={<CinemaRooms />} />
        <Route path="/projection-schedule" element={<ProjectionsSchedule />} />
        <Route path="/reservation-form" element={<ReservationForm />} />
      </Routes>
    </Router>
  );
}
// <Route path="/" element={<Home />} />
export default App;

