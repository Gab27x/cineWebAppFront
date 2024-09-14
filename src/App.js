
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Movies from './components/Movies'; // Asegúrate de que la ruta sea correcta
//import Home from './components/Home'; // O cualquier otro componente de inicio

function App() {
  return (
    <Router>
      <Routes>
      
        <Route path="/movies" element={<Movies />} />
      </Routes>
    </Router>
  );
}
// <Route path="/" element={<Home />} />
export default App;

