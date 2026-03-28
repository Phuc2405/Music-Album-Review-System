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
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center font-sans text-white relative overflow-hidden">
      
      {/* Decorative Background Glow (Optional, adds a premium feel) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-3xl px-6 mt-[-10vh] z-10">
        
        {/* Title & Description */}
        <div className="text-center mb-10">
          <h1 className="text-6xl sm:text-7xl font-black mb-6 tracking-tight text-white drop-shadow-lg">
            FELIX <span className="text-orange-500">MUSIC</span>
          </h1>
          <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Find and share album reviews. Rate your favorite music, discover new artists, and join our vibrant community. Your perspective matters.
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="w-full max-w-2xl relative group">
          <div className="relative flex items-center w-full h-16 rounded-full bg-[#1a1a1a] border border-gray-800 focus-within:border-orange-500 focus-within:bg-[#222] transition-all shadow-2xl overflow-hidden">
            
            {/* Search Icon */}
            <div className="pl-6 pr-3 text-gray-500 group-focus-within:text-orange-500 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </div>
            
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 bg-transparent text-white outline-none text-lg pr-5 placeholder:text-gray-600"
              placeholder="Search album by title, artist..."
            />

            {/* Attached Search Button */}
            <button 
              type="submit" 
              className="h-full px-8 bg-orange-500 hover:bg-orange-400 text-white font-bold text-lg transition-colors"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      {/* Modern Call to Action Footer */}
      <div className="w-full max-w-4xl px-6 pb-12 z-10">
        <div className="bg-[#121212] border border-gray-800 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between shadow-2xl gap-8">
          
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-white mb-2">Want to write a review?</h3>
            <p className="text-gray-500 text-lg">
              Join the community <span className="text-orange-500 font-semibold">now</span> and share your thoughts.
            </p>
          </div>
          
          <div className="flex gap-4 w-full md:w-auto">
            <Link 
              to="/login" 
              className="flex-1 md:flex-none bg-orange-500 hover:bg-orange-400 text-white px-8 py-3.5 rounded-xl font-bold transition-all text-center text-lg active:scale-95 shadow-[0_0_15px_rgba(249,115,22,0.15)]"
            >
              Login
            </Link>
            <Link 
              to="/register" 
              className="flex-1 md:flex-none bg-[#333] hover:bg-[#444] text-white px-8 py-3.5 rounded-xl font-bold transition-all text-center text-lg active:scale-95"
            >
              Sign Up
            </Link>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Home;