import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../axiosConfig";

const AlbumDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();

  // Data States
  const [album, setAlbum] = useState(null);
  const [myReview, setMyReview] = useState(null);
  const [allReviews, setAllReviews] = useState([]); // State cho Community Reviews
  const [loading, setLoading] = useState(true);

  // UI States
  const [showModal, setShowModal] = useState(false);
  const [isWriting, setIsWriting] = useState(false);
  const [formData, setFormData] = useState({ rating: 0, text: "" });

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        // 1. Fetch Album Details
        const albRes = await axiosInstance.get(`/api/albums/${id}`);
        setAlbum(albRes.data);

        // 2. Fetch All Reviews for this album (Community)
        const allRevRes = await axiosInstance.get(`/api/reviews/album/${id}`);
        setAllReviews(allRevRes.data);

        // 3. Fetch My Review if logged in
        if (user) {
          const revRes = await axiosInstance.get("/api/reviews/my-reviews", {
            headers: { Authorization: `Bearer ${user.token}` },
          });
          const found = revRes.data.find(
            (r) => (r.albumID?._id || r.albumID) === id,
          );
          if (found) setMyReview(found);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id, user]);

  const handleAction = () => {
    if (!user) return setShowModal(true);
    setIsWriting(true);
    setFormData({
      rating: myReview ? myReview.reviewRate : 0,
      text: myReview ? myReview.reviewContent : "",
    });
  };

  const saveReview = async () => {
    if (!formData.rating || !formData.text.trim())
      return alert("Please fill all fields");
    try {
      const payload = {
        reviewRate: formData.rating,
        reviewContent: formData.text,
      };
      const config = { headers: { Authorization: `Bearer ${user.token}` } };

      const res = myReview
        ? await axiosInstance.put(
            `/api/reviews/${myReview._id}`,
            payload,
            config,
          )
        : await axiosInstance.post(
            `/api/reviews`,
            { ...payload, albumID: id },
            config,
          );

      setMyReview(res.data);
      setIsWriting(false);
      // Reload community reviews to show updated data
      const allRevRes = await axiosInstance.get(`/api/reviews/album/${id}`);
      setAllReviews(allRevRes.data);
    } catch (err) {
      alert("Error saving review");
    }
  };

  const deleteReview = async () => {
    if (!window.confirm("Delete this review?")) return;
    try {
      await axiosInstance.delete(`/api/reviews/${myReview._id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setMyReview(null);
      // Update community list
      setAllReviews(allReviews.filter((r) => r._id !== myReview._id));
    } catch (err) {
      alert("Error deleting");
    }
  };

  if (loading)
    return (
      <div className="text-white p-10 font-bold animate-pulse text-center">
        Loading Album...
      </div>
    );
  if (!album)
    return <div className="text-white p-10 text-center">Album not found.</div>;

  return (
    <div className="bg-black min-h-screen text-white p-8 font-sans">
      {/* 1. GUEST POPUP */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1a1a1a] p-8 rounded-2xl max-w-sm w-full border border-gray-800 text-center">
            <h2 className="text-2xl font-bold mb-4">Login Required</h2>
            <p className="text-gray-400 mb-6">
              Join the Felix Music community to share your thoughts.
            </p>
            <div className="flex flex-col gap-3">
              <Link
                to="/login"
                className="bg-orange-500 py-3 rounded-xl font-bold hover:bg-orange-600 transition-colors"
              >
                Login
              </Link>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 text-sm hover:text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 mb-20">
          {/* ALBUM INFO */}
          <div className="md:w-1/3 text-center md:text-left">
            <img
              src={album.coverImageUrl}
              className="w-full rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] mb-6 border border-white/5"
              alt={album.title}
            />
            <h1 className="text-4xl font-black text-orange-500 uppercase tracking-tighter mb-1">
              {album.title}
            </h1>
            <p className="text-xl text-gray-400 font-medium">
              {album.artist} • {album.releaseYear}
            </p>
          </div>

          {/* PERSONAL REVIEW AREA */}
          <div className="md:w-2/3">
            <h2 className="text-xl font-bold mb-6 border-b border-white/10 pb-2 uppercase tracking-widest text-gray-400">
              Your Rating
            </h2>

            {isWriting ? (
              <div className="bg-[#0f0f0f] p-8 rounded-2xl border border-orange-500/50 shadow-lg shadow-orange-500/10">
                <div className="flex gap-2 mb-6">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      onClick={() => setFormData({ ...formData, rating: s })}
                      className={`text-3xl transition-transform active:scale-90 ${s <= formData.rating ? "text-orange-500" : "text-gray-800"}`}
                    >
                      ★
                    </button>
                  ))}
                </div>
                <textarea
                  value={formData.text}
                  onChange={(e) =>
                    setFormData({ ...formData, text: e.target.value })
                  }
                  className="w-full h-40 bg-black border border-white/10 p-4 rounded-xl mb-6 focus:border-orange-500 outline-none transition-colors resize-none"
                  placeholder="What are your thoughts on this album?"
                />
                <div className="flex gap-4 items-center">
                  <button
                    onClick={saveReview}
                    className="bg-orange-500 px-10 py-3 rounded-xl font-bold hover:scale-105 transition-transform shadow-lg shadow-orange-500/20"
                  >
                    Save Review
                  </button>
                  <button
                    onClick={() => setIsWriting(false)}
                    className="text-gray-500 hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : myReview ? (
              <div className="bg-[#0f0f0f] p-8 rounded-2xl border border-white/5 shadow-xl">
                <div className="text-orange-500 text-2xl mb-4">
                  {"★".repeat(myReview.reviewRate)}
                </div>
                {/* FIX LỖI TEXT TRÀN TẠI ĐÂY: break-words */}
                <p className="text-gray-300 italic mb-8 text-lg leading-relaxed break-words">
                  "{myReview.reviewContent}"
                </p>
                <div className="flex gap-6 items-center border-t border-white/5 pt-6">
                  <button
                    onClick={handleAction}
                    className="bg-white text-black px-6 py-2 rounded-lg font-bold text-sm hover:bg-gray-200 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={deleteReview}
                    className="text-red-500 text-sm font-semibold hover:text-red-400"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={handleAction}
                className="w-full py-6 bg-gradient-to-r from-orange-600 to-orange-500 rounded-2xl font-black text-xl hover:scale-[1.02] transition-transform shadow-xl shadow-orange-500/20 uppercase tracking-widest"
              >
                + Write a Review
              </button>
            )}
          </div>
        </div>

        {/* COMMUNITY REVIEWS SECTION */}
        <div className="mt-20">
          <h2 className="text-2xl font-black mb-10 border-b border-white/10 pb-4 uppercase tracking-widest text-gray-400 flex items-center gap-4">
            Community Reviews{" "}
            <span className="text-sm bg-white/10 px-3 py-1 rounded-full text-white font-medium">
              {allReviews.length}
            </span>
          </h2>

          <div className="grid grid-cols-1 gap-6">
            {allReviews.length > 0 ? (
              allReviews.map((rev) => (
                <div
                  key={rev._id}
                  className="bg-[#0f0f0f] p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-colors"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-orange-500/20 rounded-full flex items-center justify-center text-orange-500 font-bold">
                        {(rev.userID?.nickname || "U")[0].toUpperCase()}
                      </div>
                      <div>
                        <p className="font-bold text-white">
                          {rev.userID?.nickname || "Anonymous"}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(rev.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-orange-500 font-bold text-lg">
                      {"★".repeat(rev.reviewRate)}
                    </div>
                  </div>
                  <p className="text-gray-400 leading-relaxed break-words">
                    {rev.reviewContent}
                  </p>
                </div>
              ))
            ) : (
              <div className="text-center py-20 bg-[#0f0f0f] rounded-3xl border border-dashed border-white/5">
                <p className="text-gray-600 italic">
                  No reviews yet. Be the first to rate this album!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlbumDetails;
