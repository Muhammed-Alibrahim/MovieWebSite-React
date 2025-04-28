import React, { useState, useEffect } from "react";

export default function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);

  // Fetch watchlist from localStorage on component mount
  useEffect(() => {
    const storedWatchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    setWatchlist(storedWatchlist);
  }, []);

  // Remove a movie from the watchlist
  const removeFromWatchlist = (movieId) => {
    const updatedWatchlist = watchlist.filter((movie) => movie.id !== movieId);
    setWatchlist(updatedWatchlist);
    localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
  };

  return (
    <div className="container py-4">
      <h2 className="text-center text-capitalize mb-4">Your Watchlist</h2>
      {watchlist.length > 0 ? (
        <div className="row">
          {watchlist.map((movie) => (
            <div key={movie.id} className="col-md-3 my-3">
              <div className="card bg-dark text-white">
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : "https://via.placeholder.com/300x450?text=No+Image"
                  }
                  className="card-img-top"
                  alt={movie.title || movie.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{movie.title || movie.name}</h5>
                  <button
                    className="btn btn-danger mt-2"
                    onClick={() => removeFromWatchlist(movie.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray fs-5">Your watchlist is empty.</p>
      )}
    </div>
  );
}