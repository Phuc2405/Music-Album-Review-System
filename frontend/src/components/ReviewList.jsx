import { useAuth } from "../context/AuthContext";
import axiosInstance from "../axiosConfig";

const ReviewList = ({ reviews, setReviews, setEditingReview }) => {
  const { user } = useAuth();

  const handleDelete = async (reviewId) => {
    try {
      await axiosInstance.delete(`/api/reviews/${reviewId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setReviews(reviews.filter((review) => review._id !== reviewId));
    } catch (error) {
      alert("Failed to delete review.");
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto">
      {reviews.length === 0 ? (
        <p className="text-gray-500 italic text-center py-10">
          No reviews found.
        </p>
      ) : (
        reviews.map((review) => (
          <div
            key={review._id}
            className="bg-[#121212] p-5 rounded-2xl border border-gray-800 flex flex-col sm:flex-row gap-5 shadow-md"
          >
            <div className="flex-shrink-0">
              <img
                src={review.albumID.coverImageUrl}
                className="w-24 h-24 rounded-lg object-cover"
                alt="Album Cover"
              />
            </div>

            <div className="flex flex-col flex-1 min-w-0">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-bold text-lg text-orange-500 truncate">
                    {review.albumID.title}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {review.albumID.artist}
                  </p>
                </div>
                <span className="text-xs text-gray-600 uppercase font-bold tracking-widest whitespace-nowrap ml-4">
                  {new Date(
                    review.reviewDate || review.createdAt,
                  ).toLocaleDateString()}
                </span>
              </div>

              <div className="text-orange-500 text-sm mb-3">
                {"★".repeat(review.reviewRate)}
                {"☆".repeat(5 - review.reviewRate)}
              </div>

              <p className="text-gray-300 leading-relaxed italic mb-4 flex-1 overflow-hidden text-ellipsis whitespace-pre-wrap max-h-24" style={{ overflowWrap: 'break-word',display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                "{review.reviewContent}"
              </p>
              <div className="flex gap-4 justify-end mt-auto border-t border-gray-800/50 pt-4">
                <button
                  onClick={() => setEditingReview(review)}
                  className="bg-[#1a1a1a] text-gray-300 text-sm font-bold px-5 py-2 rounded-lg hover:bg-orange-500 hover:text-white transition-all"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(review._id)}
                  className="text-red-500 text-sm font-bold px-5 py-2 rounded-lg border border-red-500/20 hover:bg-red-500/10 transition-all"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ReviewList;
