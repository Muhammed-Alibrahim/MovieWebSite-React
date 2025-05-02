

import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // State for search query

  // Fetch movies from the TMDB API
  async function fetchMovies() {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=09b639ab0b2b1b51b00568871d53f9fe&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=1`
      );
      setMovies(data.results);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  }

  useEffect(() => {
    fetchMovies();
  }, []);

  // Filter movies based on the search query
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container">
      <h1 className="text-center text-white my-4">Movies</h1>

      {/* Search Input */}
      <div className="my-4">
        <input
          type="text"
          className="form-control w-50 m-auto"
          placeholder="Search for movies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
 
        <div className="row">
          {filteredMovies.length > 0 ? (
            filteredMovies.map((movie, index) => (
          <div key={index} className="col-md-3 my-3">
            <div
          className="card bg-dark text-white"
          style={{ cursor: "pointer" }}
          onClick={() => window.location.href = `/details/movie/${movie.id}`}
            >
          <img
            src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : 'https://via.placeholder.com/300x450?text=No+Image'
            }
            className="card-img-top"
            alt={movie.title}
          />
          <div className="card-body">
            <h5 className="card-title">{movie.title}</h5>
          </div>
            </div>
          </div>
            ))
          ) : (
            <p className="text-center text-white">No movies found.</p>
          )}
        </div>


    </div>
  );
}