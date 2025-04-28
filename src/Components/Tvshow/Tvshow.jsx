import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Tvshow() {
  const [tvShows, setTvShows] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // State for search query

  // Fetch TV shows from the TMDB API
  async function fetchTvShows() {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/discover/tv?api_key=09b639ab0b2b1b51b00568871d53f9fe&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=1`
      );
      setTvShows(data.results);
    } catch (error) {
      console.error('Error fetching TV shows:', error);
    }
  }

  useEffect(() => {
    fetchTvShows();
  }, []);

  // Filter TV shows based on the search query
  const filteredTvShows = tvShows.filter((tvShow) =>
    tvShow.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container">
      <h1 className="text-center text-white my-4">TV Shows</h1>

      {/* Search Input */}
      <div className="my-4">
        <input
          type="text"
          className="form-control w-50 m-auto"
          placeholder="Search for TV shows..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="row">
        {filteredTvShows.length > 0 ? (
          filteredTvShows.map((tvShow, index) => (
        <div key={index} className="col-md-3 my-3">
          <div
            className="card bg-dark text-white"
            style={{ cursor: "pointer" }}
            onClick={() => window.location.href = `/details/tv/${tvShow.id}`}
          >
            <img
          src={
            tvShow.poster_path
              ? `https://image.tmdb.org/t/p/w500${tvShow.poster_path}`
              : 'https://via.placeholder.com/300x450?text=No+Image'
          }
          className="card-img-top"
          alt={tvShow.name}
            />
            <div className="card-body">
          <h5 className="card-title">{tvShow.name}</h5>
            </div>
          </div>
        </div>
          ))
        ) : (
          <p className="text-center text-white">No TV shows found.</p>
        )}
      </div>


    </div>
  );
}