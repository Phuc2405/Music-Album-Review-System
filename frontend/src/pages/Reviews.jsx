import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../axiosConfig";
import ReviewForm from "../components/ReviewForm";
import ReviewList from "../components/ReviewList";

const Reviews = () => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [editingReview, setEditingReview] = useState(null);
  const [isWritingNew, setIsWritingNew] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch user's own reviews
  useEffect(() => {
    if (!user?.token) return;

    let isMounted = true;

    const fetchReviews = async () => {
      try {
        const response = await axiosInstance.get("/api/reviews", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        if (isMounted) {
          setReviews(response.data || []);
        }
      } catch (error) {
        if (isMounted) {
          console.error("Failed to fetch user reviews:", error);
          setReviews([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchReviews();

    return () => {
      isMounted = false;
    };
  }, [user?.token]);

  const handleCancelEdit = () => {
    setEditingReview(null);
    setIsWritingNew(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white py-12 px-4">
      <div className="w-full max-w-5xl mx-auto">
        {/* Page Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-400">
            Music Reviews
          </h1>
          <p className="text-gray-400">
            Share your thoughts on your favorite albums
          </p>
        </div>

        {/* Write New Review Button */}
        {user && !isWritingNew && !editingReview && (
          <div className="mb-8 flex justify-center">
            <button
              onClick={() => setIsWritingNew(true)}
              className="bg-orange-500 hover:bg-orange-400 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg shadow-orange-500/20 active:scale-95"
            >
              + Write a Review
            </button>
          </div>
        )}

        {/* Review Form Section */}
        {(isWritingNew || editingReview) && (
          <div className="mb-12">
            <ReviewForm
              reviews={reviews}
              setReviews={setReviews}
              editingReview={editingReview}
              setEditingReview={setEditingReview}
              onFormClose={handleCancelEdit}
            />
          </div>
        )}

        {/* Reviews List Section */}
        <div>
          <h2 className="text-2xl font-bold text-orange-500 mb-6 border-b border-gray-800 pb-4">
            {loading ? "Loading Reviews..." : `All Reviews (${reviews.length})`}
          </h2>
          {loading ? (
            <p className="text-gray-500 text-center py-8">Loading...</p>
          ) : (
            <ReviewList
              reviews={reviews}
              setReviews={setReviews}
              setEditingReview={(review) => {
                setEditingReview(review);
                setIsWritingNew(false);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
