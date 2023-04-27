import React, { useEffect, memo } from "react";
import { useLocation } from "react-router-dom";
import { useSlice } from "../../store/store";
import Content from "../../component/pageContent/pageContent";
import styles from "./popularMovies.module.scss";

function PopularMovies() {
  const movies = useSlice((state) => state.popularMovies);
  const loading = useSlice((state) => state.loading);
  const fetch = useSlice((state) => state.fetchData);
  const update = useSlice((state) => state.movieUpdate);

  const currentPage = React.useRef(1);
  const totalPage = 22;

  useEffect(() => {
    fetch("popular", "movie", currentPage.current);
  }, [fetch]);

  const location = useLocation().pathname;

  const handleLoad = async () => {
    if (currentPage.current < totalPage) {
      currentPage.current++;
    }

    await fetch("popular", "movie", currentPage.current);
    await update(movies && movies, "popularMovies");
  };

  return (
    <div>
      <h3>Popular New Releasese</h3>
      <div className="inner page">
        <Content movies={movies} location={location} />
        <button onClick={handleLoad}>Load more</button>
      </div>
    </div>
  );
}

export default memo(PopularMovies);
