import { useEffect, useState } from "react";
import useMoviesStore from "./useMovies"; // Adjust the import based on your actual file name

const useMovieById = (movieId) => {
  const { loadedMovies } = useMoviesStore();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const foundMovie = loadedMovies.find(
      (item) => item.show.id.toString() === movieId
    );
    setMovie(foundMovie || null);
  }, [movieId, loadedMovies]);

  return movie;
};

export default useMovieById;
