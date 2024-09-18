import axios from "axios";

export const createTrendingSlice = (set) => ({
  trendingMovies: [],
  trendingShows: [],
  trendingAll: [],
  loading: true,

  fetchTrending: async (type, page) => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/trending/${type}?api_key=8214e027d9b81733c5b4760ea86276b9&language=en-US&page=${page}`
      );

      console.log(res.data.results);

      const stateKey = {
        "movie/day": "trendingMovies",
        "tv/day": "trendingShows",
        "all/day": "trendingAll",
      }[type];

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
