import React from "react";
import { useNavigate } from "react-router-dom";

export default function MediaItem({ item, mediaType = "movie" }) {
  const navigate = useNavigate();

  const navigateToDetails = () => {
    navigate(`/details/${mediaType}/${item.id}`);
  };

  return (
    <div className="col-md-3 my-3">
      <div
        className="card bg-dark text-white"
        style={{ cursor: "pointer" }}
        onClick={navigateToDetails}
      >
        <img
          src={
            item.poster_path
              ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
              : "https://via.placeholder.com/300x450?text=No+Image"
          }
          className="card-img-top"
          alt={item.title || item.name}
        />
        <div className="card-body">
          <h5 className="card-title">{item.title || item.name}</h5>
        </div>
      </div>
    </div>
  );
}