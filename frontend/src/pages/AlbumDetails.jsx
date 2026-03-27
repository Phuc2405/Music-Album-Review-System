import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const albumDatabase = [
  { 
    id: 1, 
    title: 'Eternal Sunshine', 
    artist: 'Ariana Grande', 
    year: 2024,
    singles: [
      'intro (end of the world)', 
      'bye', 
      'don\'t wanna break up again', 
      'supernatural', 
      'true story', 
      'the boy is mine', 
      'yes, and?',
      'we can\'t be friends (wait for your love)',
      'i wish i hated you',
      'imperfect for you',
      'eternal sunshine',
      'ordinary things',
      'ordinary things (feat. Nonna)'
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
    // Added longer reviews here to test the Read More and Load More features
    communityReviews: [
      {
        user: 'Tracy',
        date: '16/03/2026 09:41 AM',
        rating: 5,
        text: "Thank U, Next is an absolute triumph. Dropping just six months after she look into Ariana's diary during Sweetener, one of the most turbulent periods of her life. An instant pop classic that will be remembered for decades. The production, the vocals, the vulnerability—everything is just perfection! Literally no skips."
      },
      {
        user: 'User A',
        date: '16/03/2026 09:42 AM',
        rating: 4,
        text: "Loved it! Great vibes all around."
      },
      {
        user: 'User B',
        date: '16/03/2026 09:29 AM',
        rating: 5,
        text: "A classic! Ariana never misses."
      },
      {
        user: 'Chris.W',
        date: '15/03/2026 10:15 AM',
        rating: 4,
        text: "Really cohesive album. I just wish there were a few more upbeat tracks to balance out the emotional ballads. The transition from track 3 to 4 is mind-blowing though. I've had this on repeat since it dropped. Still a solid 8.5/10."
      },
      {
        user: 'Sammy_G',
        date: '14/03/2026 08:20 PM',
        rating: 5,
        text: "From the intro to the outro, it flows perfectly. You can really hear the growth in her artistry. This album helped me through a tough time and I resonate so much with 'we can't be friends'. Definitely my album of the year."
      }
    ]
  }
];

// Helper component for Static Star Ratings
const StarRating = ({ rating, className = "w-5 h-5" }) => {
  return (
    <div className="flex text-orange-500 gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg 
          key={star} 
          className={`${className} ${star <= rating ? 'fill-current' : 'text-[#333] fill-current'}`} 
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

// NEW COMPONENT: Handles individual reviews for the "Read More" toggle
const ReviewItem = ({ review }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Only allow clamping and show the "Read More" button if the text is longer than 120 characters
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


const AlbumDetails = () => {
  const { id } = useParams(); 
  
  // States
  const [hasReviewed, setHasReviewed] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3); // Initially show 3 reviews

  const album = albumDatabase.find(item => item.id === parseInt(id || 1));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!album) return <div className="text-white p-10">Album not found.</div>;

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white font-sans pb-20">
      
      {/* TEST TOGGLE - Remove in production */}
      <div className="bg-blue-600/20 text-blue-300 p-3 text-center border-b border-blue-600/30 text-sm flex justify-center items-center gap-4">
        <span>Current State: <strong>{hasReviewed ? "Logged In & Reviewed" : "No Review Written"}</strong></span>
        <button 
          onClick={() => setHasReviewed(!hasReviewed)}
          className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-1.5 rounded-full font-bold transition-colors"
        >
          Toggle UI State
        </button>
      </div>

      <div className="max-w-6xl mx-auto p-8 md:p-12">
        
        <h1 className="text-3xl font-bold mb-10">
          Album Detail: <span className="text-orange-500">{album.title}</span>
        </h1>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          
          {/* ================= LEFT COLUMN ================= */}
          <div className="w-full lg:w-[35%] flex flex-col gap-6">
            <div className="w-full rounded-xl overflow-hidden shadow-2xl bg-gray-800 border border-gray-800 aspect-square">
              <img src={album.image} alt={album.title} className="w-full h-full object-cover" />
            </div>
            
            <div className="bg-[#121212] rounded-xl p-5 border border-gray-800/50 flex flex-col gap-2">
              <p className="text-gray-300 text-lg"><span className="font-bold text-white">Artist:</span> {album.artist}</p>
              <p className="text-gray-300 text-lg"><span className="font-bold text-white">Year:</span> {album.year}</p>
              <p className="text-gray-300 text-lg"><span className="font-bold text-white">Tracks:</span> {album.singles.length} tracks</p>
            </div>

            <div className="mt-4">
              <h3 className="text-2xl font-bold text-white mb-4">Tracklist</h3>
              <ol className="list-decimal list-inside flex flex-col gap-2.5 text-lg text-gray-300">
                {album.singles.map((track, index) => (
                  <li key={index} className="hover:text-white transition-colors cursor-default">{track}</li>
                ))}
              </ol>
            </div>
          </div>

          {/* ================= RIGHT COLUMN ================= */}
          <div className="w-full lg:w-[65%] flex flex-col">

            {/* Ratings block */}
            <div className="flex flex-col md:flex-row gap-10 mb-10 border-b border-gray-800/50 pb-10">
              <div className="flex flex-col items-center bg-transparent min-w-[200px]">
                <h3 className="text-xl font-bold text-white mb-4">Community Rating</h3>
                <StarRating rating={4.5} className="w-10 h-10 mb-2" />
                <p className="text-gray-400 mt-1">{album.totalRatings} ratings</p>
              </div>

              <div className="flex-1 flex flex-col gap-4 w-full">
                <h3 className="text-xl font-bold text-white mb-3">Rating Details</h3>
                {album.ratingBreakdown.map((row, idx) => (
                  <div key={idx} className="flex items-center gap-4 text-sm">
                    <div className="shrink-0 flex justify-end">
                      <StarRating rating={row.stars} className="w-4 h-4" />
                    </div>
                    <div className="flex-1 h-2.5 bg-[#2a2a2a] rounded-full overflow-hidden">
                      <div className="h-full bg-orange-500 rounded-full" style={{ width: `${row.percentage}%` }}></div>
                    </div>
                    <span className="w-10 text-right text-gray-400 text-base font-medium">{row.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Dynamic Review Area */}
            <div className="mb-12">
              {!hasReviewed ? (
                <button className="w-full py-3 rounded-full border border-white text-white font-bold text-lg hover:bg-white hover:text-black transition-colors">
                  Write a Review
                </button>
              ) : (
                <div className="flex flex-col items-center">
                  <h3 className="text-xl font-bold text-white mb-2">My Review</h3>
                  <div className="mb-4"><StarRating rating={5} className="w-7 h-7" /></div>
                  <div className="bg-[#121212] border border-gray-800 p-6 rounded-xl w-full text-gray-300 leading-relaxed text-base shadow-lg mb-4">
                    A masterpiece of modern pop and R&B! The production is incredibly cohesive, and the blend of vulnerability and unapologetic confidence makes every track instantly replayable. It has this perfect, infectious mid-tempo groove that keeps you hooked from start to finish. Easily a 5-star album and a definitive pop culture moment.
                  </div>
                  <div className="flex gap-4 w-full">
                    <button className="flex-1 py-3 bg-[#f5a623] hover:bg-[#d48c1a] text-white font-bold rounded-lg transition-colors">Edit Review</button>
                    <button className="flex-1 py-3 bg-[#6b665c] hover:bg-[#524e46] text-white font-bold rounded-lg transition-colors">Delete Review</button>
                  </div>
                </div>
              )}
            </div>

            {/* Community Reviews List with Load More */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Community Reviews</h2>
              <div className="flex flex-col gap-6">
                
                {/* Use slice to only render the number of reviews equal to visibleCount */}
                {album.communityReviews.slice(0, visibleCount).map((review, idx) => (
                  <ReviewItem key={idx} review={review} />
                ))}

              </div>

              {/* Only show "Load More" if there are still hidden reviews */}
              {visibleCount < album.communityReviews.length && (
                <button 
                  onClick={() => setVisibleCount(prev => prev + 3)}
                  className="w-full py-3 mt-6 border border-gray-700 hover:border-gray-500 text-gray-400 hover:text-white font-bold rounded-xl transition-colors"
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