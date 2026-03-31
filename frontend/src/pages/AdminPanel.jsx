import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../axiosConfig";

function AdminPanel() {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReviews = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.get("/api/admin/reviews", {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      setReviews(response.data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Cannot fetch reviews. Please try again later.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (reviewID) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;

    try {
      await axiosInstance.delete(`/api/admin/reviews/${reviewID}`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      setReviews((prev) => prev.filter((r) => r._id !== reviewID));
    } catch (err) {
      alert(
        err.response?.data?.message || err.message || "Failed to delete review",
      );
    }
  };

  useEffect(() => {
    fetchReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

if (loading) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-gray-800 border-t-orange-400 rounded-full animate-spin"></div>
        <p className="text-gray-400 font-medium animate-pulse">
          Loading data...
        </p>
      </div>
    </div>
  );
}

  if (error)
    return (
      <div className="p-4 text-red-300 bg-[#330000] rounded-lg">
        <h2 className="font-bold text-lg">Error</h2>
        <p>{error}</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white py-10 px-4">
      <div className="mx-auto max-w-6xl rounded-2xl bg-[#121212] border border-gray-800 shadow-xl shadow-black/50 p-6">
        <h1 className="text-4xl font-bold text-orange-400 mb-4">
          Admin – Manage Reviews
        </h1>
        <p className="text-gray-400 mb-6">
          Only admins can access this page. See all reviews and manage them.
        </p>
        <div className="overflow-x-auto rounded-lg border border-gray-800 bg-[#090909]">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-gray-300 border-b border-gray-800">
                <th className="p-2">Album</th>
                <th className="p-2">User</th>
                <th className="p-2">Rate</th>
                <th className="p-2">Content</th>
                <th className="p-2">Date</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((r) => (
                <tr key={r._id} className="border-b border-gray-800">
                  <td className="p-2">{r.albumID?.title}</td>
                  <td className="p-2">{r.userID?.nickname}</td>
                  <td className="p-2">{r.reviewRate}</td>
                  <td className="p-2 whitespace-normal max-w-[22rem] truncate">
                    {r.reviewContent}
                  </td>
                  <td className="p-2">
                    {new Date(r.reviewDate || r.createdAt).toLocaleString()}
                  </td>
                  <td className="p-2">
                    <button
                      onClick={() => handleDelete(r._id)}
                      className="bg-red-600 text-white rounded-lg px-3 py-1 hover:bg-red-500"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
