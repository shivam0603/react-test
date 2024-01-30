import { useEffect } from "react";
import useMoviesStore from "../hooks/useMovies";
import MovieCard from "../components/movieCard";

const HomePage = () => {
  const { moviesCount, loadedMovies, setMovies } = useMoviesStore();

  useEffect(() => {
    setMovies();
  }, []);

  if (moviesCount === 0) {
    return <div className="container mx-auto p-4 text-center">No Movies Found</div>;
  }

  return (
    <main className="container mx-auto p-4">
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center">
        {loadedMovies.map((movie) => (
          <MovieCard key={movie.show.id} movie={movie} />
        ))}
      </ul>
    </main>
  );
};

export default HomePage;
