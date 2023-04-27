export const movieSlice = (set) => ({
  movies: [],
  loading: false,
  error: false,
  fetchData: async () => {
    set(() => ({ loading: true }));
    try {
      const res = await axios.get(
        "https://api.themoviedb.org/3/movie/now_playing?api_key=8214e027d9b81733c5b4760ea86276b9&language=en-US"
      );
      set(() => ({ movies: res.data, loading: false }));
    } catch (err) {
      set(() => ({ error: true, loading: false }));
    }
  },
});
