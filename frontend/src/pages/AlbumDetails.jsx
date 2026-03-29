import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
// MOCK DATABASE
const albumDatabase = [
  { 
    id: 1, 
    title: 'Eternal Sunshine', 
    artist: 'Ariana Grande', 
    year: 2024,
    singles: [
      'intro (end of the world)', 'bye', 'don\'t wanna break up again', 
      'supernatural', 'true story', 'the boy is mine', 'yes, and?',
      'we can\'t be friends (wait for your love)', 'i wish i hated you',
      'imperfect for you', 'eternal sunshine', 'ordinary things', 'ordinary things (feat. Nonna)'
    ],
    image: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=600&q=80',
    totalRatings: '100,245',
    ratingBreakdown: [
      { stars: 5, percentage: 67 },
      { stars: 4, percentage: 25 },
      { stars: 3, percentage: 6 },
      { stars: 2, percentage: 1 },
      { stars: 1, percentage: 1 },
    ],
    communityReviews: [
      {
        user: 'Tracy',
        date: '16/03/2026 09:41 AM',
        rating: 5,
        text: "Thank U, Next is an absolute triumph. An instant pop classic that will be remembered for decades. The production, the vocals, the vulnerability—everything is just perfection! Literally no skips."
      },
      {
        user: 'Chris.W',
        date: '15/03/2026 10:15 AM',
        rating: 4,
        text: "Really cohesive album. I just wish there were a few more upbeat tracks to balance out the emotional ballads. The transition from track 3 to 4 is mind-blowing though."
      }
    ]
  }
];

// SUB-COMPONENT: STATIC STAR RATING
const StarRating = ({ rating, className = "w-5 h-5" }) => {
  return (
    <div className="flex text-orange-500 gap-1.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg 
          key={star} 
          className={`${className} ${star <= rating ? 'fill-current' : 'text-[#333] fill-current'} shrink-0`} 
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

// SUB-COMPONENT: COMMUNITY REVIEW ITEM
const ReviewItem = ({ review }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const needsClamp = review.text.length > 120;

  return (
    <div className="border-b border-gray-800 pb-6 last:border-b-0">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h4 className="font-bold text-white text-lg">{review.user}</h4>
          <p className="text-gray-500 text-sm mt-0.5">{review.date}</p>
        </div>
        <StarRating rating={review.rating} className="w-4 h-4" />
      </div>
      <div className="mt-3">
        <p className={`text-gray-300 leading-relaxed ${!isExpanded && needsClamp ? 'line-clamp-2' : ''}`}>
          {review.text}
        </p>
        {needsClamp && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-orange-500 hover:text-orange-400 text-sm font-semibold mt-2 focus:outline-none transition-colors"
          >
            {isExpanded ? 'Show Less' : 'Read More'}
          </button>
        )}
      </div>
    </div>
  );
};

// ================= MAIN COMPONENT =================
const AlbumDetails = () => {
  const { id } = useParams();
  
  // States
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);
  
  // User's private review data
  const [myReview, setMyReview] = useState({
    rating: 5,
    date: '27/03/2026 10:30 PM',
    text: "A masterpiece of modern pop and R&B! The production is incredibly cohesive, and the blend of vulnerability and unapologetic confidence makes every track instantly replayable. 'Eternal Sunshine' is a skip-less experience."
  });

  const album = albumDatabase.find(item => item.id === parseInt(id || 1));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handler for Write Review button
  const handleWriteReviewClick = () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
    } else {
      console.log("Navigating to Review Editor...");
    }
  };

  if (!album) return <div className="text-white p-10 font-sans">Album not found.</div>;

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white font-sans pb-20 relative">
      
      {/* DEV TOOLS: Toggle States */}
      <div className="bg-blue-600/20 text-blue-300 p-3 text-center border-b border-blue-600/30 text-xs flex justify-center items-center gap-4 sticky top-0 z-40 backdrop-blur-md">
        <span>Session: <strong>{isLoggedIn ? "Logged In" : "Guest"}</strong></span>
        <button onClick={() => setIsLoggedIn(!isLoggedIn)} className="bg-blue-600 px-3 py-1 rounded font-bold hover:bg-blue-500 transition-all active:scale-95">Toggle Login</button>
      </div>

      {/* LOGIN/SIGNUP MODAL (Click outside to close) */}
      {showLoginModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setShowLoginModal(false)}
        >
          <div 
            className="bg-[#1a1a1a] border border-gray-800 w-full max-w-sm rounded-2xl p-8 shadow-2xl animate-in fade-in zoom-in duration-200 cursor-default"
            onClick={(e) => e.stopPropagation()} 
          >
            <h2 className="text-2xl font-bold text-center mb-3">Login/Sign up required</h2>
            <p className="text-gray-400 text-center mb-8 leading-relaxed">
              To perform this function, please <span className="text-white font-semibold">Sign up for a new account</span> or <span className="text-white font-semibold">Login</span> to your existing one.
            </p>
            
            <div className="flex flex-col gap-3">
              <Link 
                to="/login"
                onClick={() => setShowLoginModal(false)} 
                className="block text-center w-full py-3.5 bg-orange-500 hover:bg-orange-400 text-white font-bold rounded-xl transition-all text-lg"
              >
                Login
              </Link>
              
              <Link 
                to="/register" 
                onClick={() => setShowLoginModal(false)} 
                className="block text-center w-full py-3.5 bg-[#333] hover:bg-[#444] text-white font-bold rounded-xl transition-all text-lg"
              >
                Sign Up
              </Link>
              
              <button 
                onClick={() => setShowLoginModal(false)} 
                className="mt-3 text-gray-500 hover:text-white transition-colors text-sm font-medium mx-auto"
              >
                Maybe later
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto p-8 md:p-12">
        <h1 className="text-3xl font-bold mb-10">
          Album Detail: <span className="text-orange-500">{album.title}</span>
        </h1>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          
          {/* ================= LEFT COLUMN (Info & Tracklist) ================= */}
          <div className="w-full lg:w-[35%] flex flex-col gap-8">
            <div className="w-full rounded-2xl overflow-hidden shadow-2xl bg-gray-900 border border-gray-800 aspect-square group">
              <img src={album.image} alt={album.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            
            <div className="bg-[#121212] rounded-2xl p-6 border border-gray-800/50 flex flex-col gap-4 text-lg">
              <p><span className="text-gray-500 font-bold uppercase text-[10px] tracking-[0.2em] block mb-1">Artist</span> {album.artist}</p>
              <p><span className="text-gray-500 font-bold uppercase text-[10px] tracking-[0.2em] block mb-1">Release Year</span> {album.year}</p>
              <p><span className="text-gray-500 font-bold uppercase text-[10px] tracking-[0.2em] block mb-1">Total Tracks</span> {album.singles.length} songs</p>
            </div>

            <div className="mt-2">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                Tracklist <span className="h-[1px] flex-1 bg-gray-800"></span>
              </h3>
              <ol className="list-decimal list-inside flex flex-col gap-3 text-lg text-gray-400">
                {album.singles.map((track, index) => (
                  <li key={index} className="hover:text-orange-400 transition-colors cursor-default py-1 border-b border-white/5 last:border-0">{track}</li>
                ))}
              </ol>
            </div>
          </div>

          {/* ================= RIGHT COLUMN (Ratings & Feed) ================= */}
          <div className="w-full lg:w-[65%] flex flex-col">
            
            {/* Ratings Overview Section */}
            <div className="flex flex-col md:flex-row gap-10 mb-10 border-b border-gray-800/50 pb-12">
               
               <div className="min-w-[220px] text-center md:text-left flex flex-col items-center md:items-start">
                
                 <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-6">Community Rating</h3>
                 <div className="flex mb-3"><StarRating rating={4.5} className="w-10 h-10" /></div>
                 <p className="text-gray-400 font-medium text-lg">{album.totalRatings} <span className="text-sm font-normal text-gray-600 block">total reviews</span></p>
               </div>

               <div className="flex-1 flex flex-col gap-5 w-full">
                
                 <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-6">Rating Distribution</h3>
                 {album.ratingBreakdown.map((row, idx) => (
                   <div key={idx} className="flex items-center gap-5 text-sm group">
                     
                     <div className="w-[140px] shrink-0 flex justify-end">
                       <StarRating rating={row.stars} className="w-5 h-5 sm:w-6 sm:h-6" />
                     </div>
                     
                     <div className="flex-1 h-2.5 bg-[#1a1a1a] rounded-full overflow-hidden">
                       <div className="h-full bg-orange-500 transition-all duration-1000 group-hover:bg-orange-400" style={{ width: `${row.percentage}%` }}></div>
                     </div>
                     <span className="w-10 text-right text-gray-500 font-bold text-base">{row.percentage}%</span>
                   </div>
                 ))}
               </div>
            </div>

            {/* DYNAMIC REVIEW AREA */}
            <div className="mb-16">
              {!(isLoggedIn && myReview) ? (
                <button 
                  onClick={handleWriteReviewClick}
                  className="w-full py-4 rounded-full bg-orange-500 text-white font-bold text-xl hover:bg-orange-400 transition-all shadow-[0_0_20px_rgba(249,115,22,0.15)] active:scale-[0.98] flex items-center justify-center gap-3"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                  Write a Review
                </button>
              ) : (
                <div className="bg-[#121212] border border-orange-500/30 p-8 rounded-3xl shadow-2xl relative overflow-hidden group">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-2xl font-black text-white mb-1">My Review</h3>
                      <p className="text-gray-500 text-sm">{myReview.date}</p>
                    </div>
                    <StarRating rating={myReview.rating} className="w-6 h-6" />
                  </div>

                  <div className="bg-black/40 p-6 rounded-2xl mb-8 border border-white/5">
                    <p className="text-gray-200 text-lg leading-relaxed italic">
                      "{myReview.text}"
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <button className="flex-1 py-3 bg-white text-black font-bold rounded-xl hover:bg-orange-500 hover:text-white transition-all active:scale-95">Edit Review</button>
                    <button onClick={() => setMyReview(null)} className="px-6 py-3 border border-gray-800 text-gray-500 font-bold rounded-xl hover:border-red-500 hover:text-red-500 transition-all">Delete</button>
                  </div>
                </div>
              )}
            </div>

            {/* Community Feed Section */}
            <div>
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-4">
                User Feed <span className="h-px flex-1 bg-gray-800"></span>
              </h2>
              <div className="flex flex-col gap-8">
                {album.communityReviews.slice(0, visibleCount).map((review, idx) => (
                  <ReviewItem key={idx} review={review} />
                ))}
              </div>

              {visibleCount < album.communityReviews.length && (
                <button 
                  onClick={() => setVisibleCount(prev => prev + 3)}
                  className="w-full py-4 mt-10 border border-gray-800 text-gray-400 hover:text-white hover:border-gray-400 font-bold rounded-2xl transition-all"
                >
                  Load More Reviews
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlbumDetails;