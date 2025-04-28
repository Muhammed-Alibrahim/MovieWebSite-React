// // import axios from 'axios';
// // import React ,{useState ,useEffect } from 'react'
// // // import MediaItem from '../MediaItem/MediaItem';
// // import { Link } from 'react-router-dom';
// // let mediaType = 'movie'
// // export default function Movies() {
// //   const [movies , setmovies ] = useState([]);
// //   let numbers = new Array(10).fill(1).map((el , index)=> index+1 )

// //   async function getApiTrending(page){
// //     let {data} = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=09b639ab0b2b1b51b00568871d53f9fe&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=${page}`)
// //     setmovies(data.results);
// //   }
// //   useEffect(()=>{
// //     getApiTrending(1)
// //   },[])
// //   return <>
// //     <input type="text" className='form-control w-50 m-auto' placeholder='Enter the movie you want to search'/>
// //     <div className='row'>
// //         {movies.map((item , index)=>
// //             <div key={index} className='col-md-3 my-3'>
// //                 <Link className='text-decoration-none' to={`/moviedetails/${item.id}/${mediaType}`}>
// //                     {item.poster_path? <img src={'https://image.tmdb.org/t/p/w500'+item.poster_path} className='w-100' alt="poster path" />
// //                     :<img src={'https://image.tmdb.org/t/p/w500'+item.profile_path} className='w-100' alt="poster path" />
// //                     }        
// //                     <h3 className='text-center text-white h5 mt-1'>{item.title} {item.name}</h3>
// //                 </Link>
// //             </div>
// //         )}
// //     </div>
// //     <nav aria-label="Page navigation example" className='d-flex justify-content-center'>
// //         <ul className="pagination">
// //             {numbers.map((page)=><li key={page} className="page-item" onClick={()=>{getApiTrending(page)}}><Link className="page-link">{page}</Link></li>)}
                
// //         </ul>
// //     </nav>
// //   </>
// // }
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// export default function Movies() {
//   const [movies, setMovies] = useState([]);

//   // Fetch movies from your backend API
//   async function fetchMovies() {
//     try {
//       const { data } = await axios.get('https://your-backend-api.com/api/movies'); // Replace with your backend API URL
//       setMovies(data);
//     } catch (error) {
//       console.error('Error fetching movies:', error);
//     }
//   }

//   useEffect(() => {
//     fetchMovies();
//   }, []);

//   return (
//     <div className="container">
//       <h1 className="text-center text-white my-4">Uploaded Movies</h1>
//       <div className="row">
//         {movies.length > 0 ? (
//           movies.map((movie, index) => (
//             <div key={index} className="col-md-3 my-3">
//               <div className="card bg-dark text-white">
//                 <img
//                   src={movie.posterUrl} // Replace with the correct field from your API
//                   className="card-img-top"
//                   alt={movie.title}
//                 />
//                 <div className="card-body">
//                   <h5 className="card-title">{movie.title}</h5>
//                   <p className="card-text">{movie.description}</p>
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="text-center text-white">No movies uploaded yet.</p>
//         )}
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1); // To handle pagination

  // Fetch movies from the TMDB API
  async function fetchMovies(page) {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=09b639ab0b2b1b51b00568871d53f9fe&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=${page}`
      );
      setMovies(data.results);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  }

  useEffect(() => {
    fetchMovies(page);
  }, [page]);

  return (
    <div className="container">
      <h1 className="text-center text-white my-4">Popular Movies</h1>
      <div className="row">
        {movies.length > 0 ? (
          movies.map((movie, index) => (
            <div key={index} className="col-md-3 my-3">
              <div className="card bg-dark text-white">
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
                  <p className="card-text">
                    {movie.overview
                      ? movie.overview.substring(0, 100) + '...'
                      : 'No description available.'}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-white">No movies available.</p>
        )}
      </div>

      {/* Pagination */}
      <nav aria-label="Page navigation example" className="d-flex justify-content-center mt-4">
        <ul className="pagination">
          <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => setPage(page - 1)}>
              Previous
            </button>
          </li>
          <li className="page-item">
            <button className="page-link" onClick={() => setPage(page + 1)}>
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}