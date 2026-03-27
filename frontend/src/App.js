import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';

import Home from './pages/Home';
import SearchAlbumResults from './pages/SearchAlbumResults';
import { AuthProvider } from './context/AuthContext';
function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          
          {/* ADDED: Route for the search results page */}
          <Route path="/search" element={<SearchAlbumResults />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
console.log({
  Navbar,
  Home,
  Login,
  Register,
  SearchAlbumResults
});

