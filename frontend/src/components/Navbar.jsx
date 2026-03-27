import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); 

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Checking user in homepage, login, signup
  const hiddenSearchPaths = ['/', '/login', '/register'];
  const shouldHideSearch = hiddenSearchPaths.includes(location.pathname);

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center gap-4 shadow-md">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-3">
        <img 
          src="https://via.placeholder.com/40" 
          alt="Company Logo" 
          className="w-10 h-10 rounded-full object-cover bg-white"
        />
        <span className="text-xl font-bold hidden sm:block">Felix Music</span>
      </Link>

      {/* Search Bar */}
      <div className="flex-1 max-w-lg">
        {!shouldHideSearch && (
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 text-gray-900 bg-blue-50 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300 focus:bg-white transition-all duration-300"
              onKeyDown={(e) => {
                // Navigate to the search results page when the Enter key is pressed
                if (e.key === 'Enter' && e.target.value.trim() !== '') {
                  navigate(`/search?q=${e.target.value}`);
                }
              }}
            />
          </div>
        )}
      </div>

      {/* User Authentication */}
      <div className="flex items-center gap-4">
        {user ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 px-5 py-2 rounded-full font-medium hover:bg-red-600 transition-colors shadow-sm"
          >
            Logout
          </button>
        ) : (
          <>
            <Link 
              to="/login" 
              className="hover:text-blue-200 font-medium transition-colors"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-green-500 text-white px-5 py-2 rounded-full font-medium hover:bg-green-600 transition-colors shadow-sm"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;