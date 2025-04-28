import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import MediaItem from '../MediaItem/MediaItem';

export default function Home() {
  const { user } = useContext(AuthContext); // Access user state
  const [movie, setMovie] = useState([]);
  const [tv, setTv] = useState([]);
  const [people, setPeople] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);

  // Fetch trending data
  async function getApiTrending(mediaType, callback) {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/${mediaType}/week?api_key=09b639ab0b2b1b51b00568871d53f9fe`
    );
    callback(data.results);
  }

  // Fetch upcoming movies
  async function getUpcomingMovies() {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=09b639ab0b2b1b51b00568871d53f9fe&language=en-US&page=1`
    );
    setUpcomingMovies(data.results);
  }

  // Fetch top-rated movies
  async function getTopRatedMovies() {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=09b639ab0b2b1b51b00568871d53f9fe&language=en-US&page=1`
    );
    setTopRatedMovies(data.results);
  }

  // Fetch trending movies
  async function getTrendingMovies() {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=09b639ab0b2b1b51b00568871d53f9fe`
    );
    setTrendingMovies(data.results);
  }

  useEffect(() => {
    getApiTrending('movie', setMovie);
    getApiTrending('tv', setTv);
    getApiTrending('person', setPeople);
    getUpcomingMovies();
    getTopRatedMovies();
    getTrendingMovies();
  }, []);

  return (
    <>
      {user ? (
        <hidden></hidden>
      ) : (
        <p className="text-danger">You are not logged in.</p>
      )}

      {/* Trending Movies Section */}
      <div className="row py-3">
        <div className="col-md-4 d-flex align-items-center">
          <div>
            <div className="brdr w-25 mb-3"></div>
            <h2 className="text-capitalize">trending <br /> movies <br /> right now</h2>
            <p className="text-capitalize text-gray fs-5">top trending movie by week</p>
            <div className="brdr w-100 mt-3"></div>
          </div>
        </div>
        {movie.slice(0, 10).map((item, index) => (
          <MediaItem key={index} item={item} />
        ))}
      </div>

      {/* Upcoming Movies Section */}
      <div className="row py-3">
        <div className="col-md-4 d-flex align-items-center">
          <div>
            <div className="brdr w-25 mb-3"></div>
            <h2 className="text-capitalize">upcoming <br /> movies</h2>
            <p className="text-capitalize text-gray fs-5">movies coming soon</p>
            <div className="brdr w-100 mt-3"></div>
          </div>
        </div>
        {upcomingMovies.slice(0, 10).map((item, index) => (
          <MediaItem key={index} item={item} />
        ))}
      </div>

      {/* Top-Rated Movies Section */}
      <div className="row py-3">
        <div className="col-md-4 d-flex align-items-center">
          <div>
            <div className="brdr w-25 mb-3"></div>
            <h2 className="text-capitalize">top-rated <br /> movies</h2>
            <p className="text-capitalize text-gray fs-5">highest-rated movies</p>
            <div className="brdr w-100 mt-3"></div>
          </div>
        </div>
        {topRatedMovies.slice(0, 10).map((item, index) => (
          <MediaItem key={index} item={item} />
        ))}
      </div>

      {/* Highlight Trending Movies Section */}
      <div className="row py-3">
        <div className="col-md-4 d-flex align-items-center">
          <div>
            <div className="brdr w-25 mb-3"></div>
            <h2 className="text-capitalize">highlight <br /> trending <br /> movies</h2>
            <p className="text-capitalize text-gray fs-5">movies trending this week</p>
            <div className="brdr w-100 mt-3"></div>
          </div>
        </div>
        {trendingMovies.slice(0, 10).map((item, index) => (
          <MediaItem key={index} item={item} />
        ))}
      </div>
    </>
  );
}