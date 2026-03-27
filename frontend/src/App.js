import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Tasks from './pages/Tasks';
import Home from './pages/Home';
import SearchAlbumResults from './components/SearchAlbumResults';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/tasks" element={<Tasks />} />
          
          {/* ADDED: Route for the search results page */}
          <Route path="/search" element={<SearchAlbumResults />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
