import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

const albumDatabase = [
  { 
    id: 1, 
    title: 'Eternal Sunshine', 
    artist: 'Ariana Grande', 
    year: 2024,
    singles: ['intro (end of the world)', 'bye', 'don\'t wanna break up again', 'supernatural', 'true story', 'the boy is mine', 'yes, and?'],
    image: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300&q=80' 
  },
  { 
    id: 2, 
    title: 'Eternal Atake', 
    artist: 'Lil Uzi Vert', 
    year: 2020,
    singles: ['Baby Pluto', 'Lo Mein', 'Silly Watch', 'POP', 'You Better Move', 'Homecoming'],
    image: 'https://images.unsplash.com/photo-1493225457124-a1a2a5f56468?w=150&q=80' 
  },
  { 
    id: 3, 
    title: 'The Eternal', 
    artist: 'Sonic Youth', 
    year: 2009,
    singles: ['Sacred Trickster', 'Anti-Orgasm'],
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=150&q=80' 
  },
  { 
    id: 4, 
    title: 'Eternal Blue', 
    artist: 'Spiritbox', 
    year: 2021,
    singles: ['Sun Killer', 'Hurt You', 'Yellowjacket', 'The Summit', 'Secret Garden'],
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=150&q=80' 
  },
  { 
    id: 5, 
    title: 'Eternal Nightcap', 
    artist: 'Lil Uzi Vert', 
    year: 2020,
    singles: ['Myron', 'Lotus', 'Bean (Kobe)'],
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=150&q=80' 
  },
  { 
    id: 6, 
    title: 'Eternal', 
    artist: 'Stratovarius', 
    year: 2015,
    singles: ['My Eternal Dream', 'Shine in the Dark'],
    image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=150&q=80' 
  },
];

const SearchAlbumResults = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate(); 
  const query = searchParams.get('q') || 'Eter'; 
  
  const [results, setResults] = useState([]);
  // NEW: Add a searching state to handle the transition smoothly
  const [isSearching, setIsSearching] = useState(true);

  useEffect(() => {
    // 1. Immediately set to searching when query changes
    setIsSearching(true);

    if (query.trim() === '') {
      setResults([]);
      setIsSearching(false);
      return;
    }

    // 2. Simulate a slight network delay (prevents the jarring glitch and looks professional)
    const timer = setTimeout(() => {
      const filteredData = albumDatabase.filter((album) =>
        album.title.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filteredData);
      setIsSearching(false); // Stop loading after data is ready
    }, 400); // 400ms delay

    // Cleanup the timer if the user types quickly
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="bg-[#0a0a0a] text-white font-sans p-8 flex justify-center min-h-screen">
      <div className="w-full max-w-5xl mt-4">
        
        {/* Search Header */}
        <div className="mb-8 border-b border-gray-800 pb-4">
          {isSearching ? (
            <h2 className="text-3xl font-bold tracking-tight text-gray-500 animate-pulse">
              Searching...
            </h2>
          ) : query ? (
            <h2 className="text-3xl font-bold tracking-tight text-white">
              {results.length} results for "{query}"
            </h2>
          ) : (
            <h2 className="text-3xl font-bold tracking-tight text-gray-500">
              Please enter a search query
            </h2>
          )}
        </div>

        {/* Unified Results Area */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* STATE 1: LOADING */}
          {isSearching ? (
            <div className="col-span-full flex flex-col items-center justify-center py-20">
              <div className="w-10 h-10 border-4 border-gray-800 border-t-orange-500 rounded-full animate-spin mb-4"></div>
              <p className="text-gray-400 text-lg animate-pulse">Finding albums...</p>
            </div>
          ) 
          
          /* STATE 2: HAS RESULTS */
          : results.length > 0 ? (
            results.map((item) => (
              <div 
                key={item.id} 
                onClick={() => navigate(`/album/${item.id}`)}
                className="group flex gap-5 p-5 bg-gray-900/50 rounded-xl cursor-pointer hover:bg-gray-800 transition-all duration-300 border border-transparent hover:border-gray-700"
              >
                {/* Album Art */}
                <div className="relative w-32 h-32 flex-shrink-0 overflow-hidden rounded-lg shadow-md bg-gray-800">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Album Info & Tracklist */}
                <div className="flex flex-col flex-1 min-w-0">
                  <h3 className="text-orange-500 font-bold text-xl truncate group-hover:text-orange-400 transition-colors">
                    {item.title}
                  </h3>
                  
                  <p className="text-slate-300 font-medium text-sm mt-1 truncate tracking-wide group-hover:text-white transition-colors">
                    {item.artist}
                  </p>
                  
                  <div className="flex items-center gap-2 mt-2 mb-3 text-xs text-gray-400 font-medium">
                    <span>{item.year}</span>
                    <span>•</span>
                    <span>{item.singles.length} tracks</span>
                  </div>

                  {/* Bullet Points for Tracks */}
                  <ul className="text-sm text-gray-400 list-disc list-inside marker:text-gray-600 space-y-1">
                    {item.singles.slice(0, 3).map((track, idx) => (
                      <li key={idx} className="truncate group-hover:text-gray-300 transition-colors">
                        {track}
                      </li>
                    ))}
                    {item.singles.length > 3 && (
                      <li className="list-none text-xs text-gray-500 mt-2 italic">
                        + {item.singles.length - 3} more tracks
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            ))
          ) 
          
          /* STATE 3: NO RESULTS */
          : (
            query && (
              <div className="col-span-full text-center py-16 bg-gray-900/30 rounded-xl border border-gray-800">
                <p className="text-gray-400 text-lg">
                  Sorry, we couldn't find any albums matching <span className="text-white font-bold">"{query}"</span>.
                </p>
              </div>
            )
          )}
        </div>
        
      </div>
    </div>
  );
};

export default SearchAlbumResults;