import React from "react";
import { Link } from "react-router-dom";

const MovieCard = (props) => {
  const { movie } = props;
  const { show } = movie;
  const { id } = show;
  return (
    <li key={show.id} className="border rounded-lg p-2 w-60">
      <Link to={`/movie/${id}`} className="space-y-4">
        {show.image?.medium ? (
          <div className="relative">
            <img
              src={show.image.medium}
              alt="Movie Poster"
              className="rounded-md hover:scale-105 transition-all duration-200 ease-linear mx-auto w-full h-auto"
              height={295}
              width={210}
            />
            {show?.rating?.average && (
              <h5 className="absolute top-4 right-4 w-fit px-2 py-1 text-md font-medium text-amber-300 flex items-center bg-green-800 rounded-md">
                {show?.rating?.average}
                <img
                  src="/star.png"
                  alt="Star Icon"
                  height={22}
                  width={22}
                  className="ml-2"
                />
              </h5>
            )}
          </div>
        ) : (
          <div className="w-full h-[312px] flex items-center justify-center border rounded-md">
            <span className="text-muted-foreground">Image not Available</span>
          </div>
        )}
        <h2 className="mx-auto w-full text-xl font-semibold text-primary">
          {show.name}
        </h2>
        <div className="w-full flex flex-wrap justify-center items-center">
          {show.genres.map((genre) => (
            <span
              key={genre}
              className="px-2 py-1 rounded-sm bg-secondary text-primary m-2 text-sm"
            >
              {genre}
            </span>
          ))}
        </div>
      </Link>
    </li>
  );
};

export default MovieCard;
