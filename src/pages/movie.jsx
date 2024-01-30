import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useMovieById from "../hooks/useMovieById";

const MoviePage = () => {
  const { movieId } = useParams();
  const movie = useMovieById(movieId);
  const navigate = useNavigate();

  function handleNavigateToBookPage() {
    navigate(`/tickets/${movieId}`);
  }
  if (!movie)
    return <main className="container mx-auto p-4">Movie not found</main>;


  return (
    <main className="container mx-auto p-4 grid md:grid-cols-2 gap-2 justify-center">
      {/* movie poster */}
      {movie.show?.image?.original ? (
        <div className="w-full flex justify-center md:justify-normal">
          <img
            src={movie.show.image.original}
            alt="Movie Poster"
            loading="lazy"
            className="rounded-lg"
            width={300}
            height={500}
          />
        </div>
      ) : null}
      {/* movie details */}
      <div className="flex flex-col items-center justify-center space-y-4">
        <ShowSummary summary={movie.show.summary} />
        <button
          onClick={handleNavigateToBookPage}
          className="px-4 py-2 bg-primary/80 rounded-lg hover:bg-primary transition-colors ease-linear"
        >
          Book Tickets
        </button>
      </div>
    </main>
  );
};

export default MoviePage;

const ShowSummary = ({ summary }) => {
  if (!summary) return null;
  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold text-green-600 mb-4 underline">
        Summary:
      </h3>
      <div
        dangerouslySetInnerHTML={{ __html: summary }}
        className="text-base leading-relaxed text-justify"
      />
    </div>
  );
};
