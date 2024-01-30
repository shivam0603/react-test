import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const useMoviesStore = create(
  devtools(
    persist(
      (set) => ({
        moviesCount: 0,
        loadedMovies: [],

        setMovies: async () => {
          try {
            // Simulating an asynchronous API call to fetch movies
            const response = await fetch(
              "https://api.tvmaze.com/search/shows?q=all"
            );
            const data = await response.json();

            // Update the store with the loaded movies
            set({
              moviesCount: data.length,
              loadedMovies: data,
            });
          } catch (error) {
            console.error("Error loading movies:", error);
          }
        },
      }),
      { name: "moviesData" }
    )
  )
);

export default useMoviesStore;
