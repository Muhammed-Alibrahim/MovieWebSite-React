import axios from 'axios';
import React , {useState ,useEffect } from 'react'
import { useParams } from 'react-router-dom';
// No changes needed in the placeholder as the route parameters `id` and `mediaType` are already being used correctly.
export default function MovieDetails() {
  let {id , mediaType } = useParams();
  const [details , setDetails ] = useState({});
  const addToWatchlist = (movie) => {
    const storedWatchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    const isAlreadyInWatchlist = storedWatchlist.some(
      (watchlistItem) => watchlistItem.id === movie.id
    );

    if (!isAlreadyInWatchlist) {
      const updatedWatchlist = [...storedWatchlist, movie];
      localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
      alert(`${movie.title || movie.name} has been added to your watchlist!`);
    } else {
      alert(`${movie.title || movie.name} is already in your watchlist.`);
    }
  };
  async function getApiTrending(mediaType, id) {
    
    let {data} = await axios.get(`https://api.themoviedb.org/3/${mediaType}/${id}?api_key=09b639ab0b2b1b51b00568871d53f9fe&language=en-US`)
    setDetails(data);
  }
  useEffect(()=>{
    getApiTrending(mediaType , id)
  },[])
  const [videoKey, setVideoKey] = useState("");

  async function getVideoKey(id) {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=09b639ab0b2b1b51b00568871d53f9fe`
      );
      const trailer = data.results.find(
        (video) => video.type === "Trailer" && video.site === "YouTube"
      );
      if (trailer) {
        setVideoKey(trailer.key);
      }
    } catch (error) {
      console.error("Error fetching video key:", error);
    }
  }

  useEffect(() => {
    getVideoKey(id);
  }, [id]);

  return (
    <>
      <div className="row">
        <div className="col-md-4">
          {details.poster_path ? (
            <img
              src={"https://image.tmdb.org/t/p/w500" + details.poster_path}
              className="w-100"
              alt="poster path"
            />
          ) : (
            <img
              src={"https://image.tmdb.org/t/p/w500" + details.profile_path}
              className="w-100"
              alt="poster path"
            />
          )}
        </div>
        <div className="col-md-8 d-flex justify-content-center align-items-center">
          <div>
            <h2>
              {details.name} {details.title}
            </h2>
            {details.overview ? (
              <p> {details.overview} </p>
            ) : (
              <p> {details.biography} </p>
            )}
            {details.vote_average}
            <div>
              <button className="d-inline-block btn btn-info me-4 my-3">
                Play Now
              </button>
              <button
                className="d-inline-block btn btn-info me-4 my-3"
                onClick={() => {
                  addToWatchlist(details);
                }}
              >
                Add to Watchlist
              </button>
              {videoKey && (
                <a
                  href={`https://www.youtube.com/watch?v=${videoKey}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="d-inline-block btn btn-info me-4 my-3"
                >
                  Watch Trailer
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
