import axios from "axios";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import upcomingMovies from "../pages/upcomingMovies/upcomingMovies";
import { createMovieSlice } from "./slices/moviesSlice";
import { createTrendingSlice } from "./slices/trendingSlice";
import { createWatchListSlice } from "./slices/watchListSlice";

export const useStore = create(
  persist(
    (...a) => ({
      ...createMovieSlice(...a),
      ...createTrendingSlice(...a),
      ...createWatchListSlice(...a),
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
