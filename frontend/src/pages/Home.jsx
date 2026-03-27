import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Redirect when user press search
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <div className="min-h-[calc(100vh-76px)] bg-[#202124] flex flex-col items-center justify-between font-sans text-white">
      
      <div className="flex-1"></div>

      {/* Felix music, small description and Searchbar*/}
      <div className="flex flex-col items-center w-full max-w-2xl px-6">
        
        <h1 className="text-5xl sm:text-7xl font-bold mb-6 tracking-wider text-center text-[#e8eaed]">
          FELIX MUSIC
        </h1>
        
        <p className="text-gray-400 text-center mb-8 text-sm sm:text-base px-4">
          Welcome to Felix Music. Find and share album reviews. Rate your favorite music, 
          discover new artists, and join our vibrant community. Your perspective matters.
        </p>

       <form onSubmit={handleSearch} className="w-full">
          <div className="relative flex items-center w-full h-14 rounded-full focus-within:bg-[#303134] bg-[#4d5156] border border-transparent hover:bg-[#303134] hover:border-gray-500 focus-within:border-gray-500 transition-all shadow-md">
            {/* Icon Search */}
            <div className="pl-5 pr-3 text-gray-400">
              <svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
              </svg>
            </div>
            
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 bg-transparent text-white outline-none text-base pr-5"
              placeholder="Search album by title, artist..."
            />
          </div>

          <div className="flex justify-center mt-8">
            <button 
              type="submit" 
              className="bg-[#303134] text-[#e8eaed] text-sm px-6 py-2.5 rounded border border-transparent hover:border-gray-500 transition-colors"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      <div className="flex-1"></div>

      {/* Footer encourage signup/login */}
      <div className="w-full max-w-3xl mb-12 px-6">
        <div className="bg-gradient-to-r from-yellow-600 to-yellow-500 rounded-2xl p-6 sm:p-8 flex flex-col items-center text-center shadow-lg border border-yellow-400/30">
          <p className="text-white text-lg font-medium mb-1">
            Want to write a review?
          </p>
          <p className="text-yellow-100 text-sm mb-6">
            Join the community <span className="font-bold text-white">now</span>
          </p>
          
          <div className="flex gap-4 w-full sm:w-auto justify-center">
            <Link 
              to="/register" 
              className="flex-1 sm:flex-none bg-gray-100 text-gray-900 px-8 py-2.5 rounded-lg font-semibold hover:bg-white transition-colors text-center"
            >
              Signup
            </Link>
            <Link 
              to="/login" 
              className="flex-1 sm:flex-none bg-yellow-400 text-gray-900 px-8 py-2.5 rounded-lg font-semibold hover:bg-yellow-300 transition-colors text-center shadow-sm"
            >
              Login
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Home;