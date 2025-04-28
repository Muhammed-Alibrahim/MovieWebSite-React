import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function People() {
  const [people, setPeople] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // State for search query

  // Fetch people from the TMDB API
  async function fetchPeople() {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/trending/person/week?api_key=09b639ab0b2b1b51b00568871d53f9fe`
      );
      setPeople(data.results);
    } catch (error) {
      console.error('Error fetching people:', error);
    }
  }

  useEffect(() => {
    fetchPeople();
  }, []);

  // Filter people based on the search query
  const filteredPeople = people.filter((person) =>
    person.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container">
      <h1 className="text-center text-white my-4">People</h1>

      {/* Search Input */}
      <div className="my-4">
        <input
          type="text"
          className="form-control w-50 m-auto"
          placeholder="Search for people..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Display Filtered People */}
      <div className="row">
        {filteredPeople.length > 0 ? (
          filteredPeople.map((person, index) => (
            <div key={index} className="col-md-3 my-3">
              <div className="card bg-dark text-white">
                <img
                  src={
                    person.profile_path
                      ? `https://image.tmdb.org/t/p/w500${person.profile_path}`
                      : 'https://via.placeholder.com/300x450?text=No+Image'
                  }
                  className="card-img-top"
                  alt={person.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{person.name}</h5>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-white">No people found.</p>
        )}
      </div>
    </div>
  );
}