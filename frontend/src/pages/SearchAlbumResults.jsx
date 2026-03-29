import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axiosInstance from "../axiosConfig";

const SearchAlbumResults = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get("q") || "";

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return setResults([]);

      setLoading(true); // Loading state
      try {
        const { data } = await axiosInstance.get(
          `/api/albums/search?q=${query}`,
        );
        setResults(data);
      } catch (err) {
        setResults([]);
      }
      setLoading(false); // Stop loading
    };

    fetchResults();
  }, [query]);

  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen p-8 flex justify-center">
      <div className="w-full max-w-5xl">
        {/* Header Section */}
        <div className="mb-8 border-b border-gray-800 pb-4">
          <h2
            className={`text-3xl font-bold ${loading ? "text-gray-500 animate-pulse" : ""}`}
          >
            {loading
              ? "Searching..."
              : `${results.length} results for "${query}"`}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* LOADING STATE */}
          {loading ? (
            <div className="col-span-full flex flex-col items-center py-20">
              <div className="w-10 h-10 border-4 border-gray-800 border-t-orange-500 rounded-full animate-spin mb-4" />
              <p className="text-gray-400">Finding albums...</p>
            </div>
          ) : results.length > 0 ? (
            /* RESULTS LIST */
            results.map((item) => (
              <div
                key={item._id}
                onClick={() => navigate(`/album/${item._id}`)}
                className="group flex gap-5 p-5 bg-zinc-900/50 rounded-xl cursor-pointer hover:bg-zinc-800 border border-transparent hover:border-zinc-700 transition-all"
              >
                <img
                  src={item.coverImageUrl}
                  alt={item.title}
                  className="w-32 h-32 object-cover rounded-lg group-hover:scale-105 transition-transform"
                />
                <div className="flex flex-col flex-1 min-w-0">
                  <h3 className="text-orange-500 font-bold text-xl truncate">
                    {item.title}
                  </h3>
                  <p className="text-zinc-400 text-sm">{item.artist}</p>
                  <p className="text-zinc-500 text-xs mt-2">
                    {item.releaseYear} • {item.tracks?.length || 0} tracks
                  </p>

                  <ul className="text-xs text-zinc-500 mt-3 list-disc list-inside">
                    {item.tracks?.slice(0, 2).map((t, i) => (
                      <li key={i} className="truncate">
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))
          ) : (
            /* EMPTY STATE */
            query && (
              <p className="col-span-full text-center text-zinc-500 py-20 text-lg">
                No albums found matching "{query}"
              </p>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchAlbumResults;
