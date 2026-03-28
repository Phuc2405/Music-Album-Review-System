import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';

import Home from './pages/Home';
import SearchAlbumResults from './pages/SearchAlbumResults';
import { AuthProvider } from './context/AuthContext';
import AlbumDetails from './pages/AlbumDetails';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/search" element={<SearchAlbumResults />} />
          <Route path="/album/:id" element={<AlbumDetails />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
