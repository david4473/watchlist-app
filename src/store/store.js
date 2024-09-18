import axios from "axios";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import upcomingMovies from "../pages/upcomingMovies/upcomingMovies";
import { createMovieSlice } from "./slices/moviesSlice";
import { createTrendingSlice } from "./slices/trendingSlice";
import { createWatchListSlice } from "./slices/watchListSlice";

const stateMapping = {
  "popular/movie": "popularMovies",
  "tv/day/trending": "trendingShows",
  "movie/day/trending": "trendingMovies",
  "upcoming/movie": "upcomingMovies",
  "popular/tv": "popularShows",
};

const getApiUrl = (endpoint, type, page) =>
  `https://api.themoviedb.org/3/${type}/${endpoint}?api_key=8214e027d9b81733c5b4760ea86276b9&language=en-US&page=${page}`;

export const useStore = create(
  persist(
    (...a) => ({
      ...createMovieSlice(...a),
      ...createTrendingSlice(...a),
      ...createWatchListSlice(...a),
      /*       trendingShows: [],
      trendingMovies: [],
      popularMovies: [],
      popularShows: [],
      upcomingMovies: [],
      watchList: [],
      loading: true,
      error: false,

      fetchData: async (endpoint, type, page) => {
        set(() => ({ loading: true }));
        try {
          const res = await axios.get(getApiUrl(endpoint, type, page));
          const stateKey = (await stateMapping[`${endpoint}/${type}`]) || null;

          console.log(getApiUrl(endpoint, type, page));

          if (stateKey) {
            set(() => ({ [stateKey]: res.data.results, loading: false }));
          }
        } catch (err) {
          set(() => ({ error: true, loading: false }));
        }
      },

      // Add movies to existing array in state
      movieUpdate: (prevMovies, arrayToUpdate) => {
        set((state) => ({
          [arrayToUpdate]: [...prevMovies, ...state[arrayToUpdate]],
        }));
      },

      // Add movie to watchlist
      addToWatchlist: (movie) => {
        set((state) => ({
          watchList: [...state.watchList, movie],
        }));
      },

      // Remove movie from watchlist
      deleteFromWatchlist: (id) => {
        const filtered = get().watchList.filter((movie) => movie.id !== id);
        set(() => ({
          watchList: filtered,
        }));
      },

      searchMovies: () => {}, */
    }),
    {
      name: "watchlist-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        watchList: state.watchList,
      }),
    }
  )
);
