export const createWatchListSlice = (set, get) => ({
  watchList: [],

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
});
