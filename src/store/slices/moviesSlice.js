import axios from "axios";

export const createMovieSlice = (set) => ({
  upcomingMovies: [],
  popularMovies: [],
  loading: true,

  fetchMovies: async (endpoint, page) => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${endpoint}?api_key=8214e027d9b81733c5b4760ea86276b9&language=en-US&page=${page}`
      );

      const stateKey = {
        popular: "popularMovies",
        upcoming: "upcomingMovies",
        "movie/day": "trendingMovies",
      }[endpoint];

      if (stateKey) {
        set(() => ({ [stateKey]: res.data.results, loading: false }));
      }
    } catch (err) {
      console.log("Error: " + err);
    }
  },

  updateMovies: (prevMovies, arrayToUpdate) => {
    set((state) => ({
      [arrayToUpdate]: [...prevMovies, ...state[arrayToUpdate]],
    }));
  },
});
