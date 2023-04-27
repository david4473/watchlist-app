import axios from "axios";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useSlice = create(
  persist(
    (set, get) => ({
      trendingShows: [],
      trendingMovies: [],
      popularMovies: [],
      popularShows: [],
      upcomingMovies: [],
      watchList: [],
      loading: false,
      error: false,
      fetchData: async (endpoint, type, page) => {
        set(() => ({ loading: true }));
        try {
          const res = await axios.get(
            `https://api.themoviedb.org/3/${type}/${endpoint}?api_key=8214e027d9b81733c5b4760ea86276b9&language=en-US&page=${page}`
          );
          if (endpoint === "popular" && type === "movie") {
            set(() => ({ popularMovies: res.data.results, loading: false }));
          } else if (endpoint === "tv/day") {
            set(() => ({ trendingShows: res.data.results, loading: false }));
          } else if (endpoint === "movie/day") {
            set(() => ({ trendingMovies: res.data.results, loading: false }));
          } else if (endpoint === "upcoming") {
            set(() => ({ upcomingMovies: res.data.results, loading: false }));
          } else if (endpoint === "popular" && type === "tv") {
            set(() => ({ popularShows: res.data.results, loading: false }));
          }
          set(() => ({ movies: res.data.results, loading: false }));
        } catch (err) {
          set(() => ({ error: true, loading: false }));
        }
      },
      movieUpdate: (movies, arrayToUpdate) => {
        set((state) => ({
          [arrayToUpdate]: [...movies, ...state[arrayToUpdate]],
        }));
      },
      addToWatchlist: (movie) => {
        set((state) => ({
          watchList: [...state.watchList, movie],
        }));
      },
      deleteFromWatchlist: (id) => {
        const filtered = get().watchList.filter((movie) => movie.id !== id);
        set(() => ({
          watchList: filtered,
        }));
      },
    }),
    {
      name: "watchlist-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ watchList: state.watchList }),
    }
  )
);
