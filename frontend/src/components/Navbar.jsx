import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Checking user in homepage, login, signup
  const hiddenSearchPaths = ["/", "/login", "/register"];
  const shouldHideSearch = hiddenSearchPaths.includes(location.pathname);

  return (
    <nav className="bg-[#0a0a0a] text-white p-4 flex justify-between items-center gap-4 border-b border-gray-800 sticky top-0 z-50">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-3 group">
        <img
          src="https://via.placeholder.com/40"
          alt="Company Logo"
          className="w-10 h-10 rounded-full object-cover bg-white group-hover:opacity-80 transition-opacity"
        />
        <span className="text-xl font-bold hidden sm:block tracking-wide group-hover:text-orange-500 transition-colors">
          Felix Music
        </span>
      </Link>

      {/* Search Bar */}
      <div className="flex-1 max-w-xl mx-auto">
        {!shouldHideSearch && (
          <div className="relative group">
            {/* Search Icon */}
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500 group-focus-within:text-orange-500 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search album by title, artist..."
              className="w-full pl-11 pr-4 py-2.5 text-white bg-[#1a1a1a] border border-gray-800 rounded-full focus:outline-none focus:border-orange-500 focus:bg-[#222] transition-all duration-300 placeholder:text-gray-500"
              onKeyDown={(e) => {
                // Navigate to the search results page when the Enter key is pressed
                if (e.key === "Enter" && e.target.value.trim() !== "") {
                  navigate(`/search?q=${e.target.value}`);
                }
              }}
            />
          </div>
        )}
      </div>

      {/* User Authentication */}
      <div className="flex items-center gap-3">
        {user ? (
          <>
            {/* NEW: Review History Button (Only shows if logged in) */}
            <Link
              to="/review-history"
              className="bg-[#333] hover:bg-[#444] text-white px-6 py-2.5 rounded-xl font-bold transition-all active:scale-95 text-center hidden sm:block"
            >
              Review History
            </Link>

            <button
              onClick={handleLogout}
              className="bg-red-500/10 text-red-500 border border-red-500/20 px-6 py-2.5 rounded-xl font-bold hover:bg-red-500 hover:text-white transition-all active:scale-95"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="bg-orange-500 hover:bg-orange-400 text-white px-6 py-2.5 rounded-xl font-bold transition-all active:scale-95 text-center shadow-[0_0_15px_rgba(249,115,22,0.15)]"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-[#333] hover:bg-[#444] text-white px-6 py-2.5 rounded-xl font-bold transition-all active:scale-95 text-center hidden sm:block"
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
