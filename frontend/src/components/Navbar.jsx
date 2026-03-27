import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center gap-4 shadow-md">
      {/*Company Logo */}
      <Link to="/" className="text-2xl font-bold">Your apps name</Link>
      {/*Searchbar*/}
      <div className="flex-1 max-w-lg">
        <div className="relative">
          <input
            type="text"
            placeholder="Search album by title..."
            className="w-full px-4 py-2 text-gray-900 bg-blue-50 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300 focus:bg-white transition-all duration-300"
          />
          </div>
      </div>
      {/*User Authentication*/}
      <div className="flex items-center gap-4">
        {user ? (
          // If user is logged in, then just show log out
          <button
            onClick={handleLogout}
            className="bg-red-500 px-5 py-2 rounded-full font-medium hover:bg-red-600 transition-colors shadow-sm"
          >
            Logout
          </button>
        ) : (
          // If the user is not logged in, then show signup and login
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
