import React, { useEffect, memo } from "react";
import { useLocation } from "react-router-dom";
import { useStore } from "../../store/store";
import Content from "../../component/pageContent/pageContent";
import styles from "./popularMovies.module.scss";
import LoadButton from "../../component/Button/loadButton";

function PopularMovies() {
  const movies = useStore((state) => state.popularMovies);
  const loading = useStore((state) => state.loading);
  const fetch = useStore((state) => state.fetchMovies);
  const update = useStore((state) => state.updateMovies);

  const currentPage = React.useRef(1);
  const totalPage = 22;

  useEffect(() => {
    if (movies.length === 0 && currentPage.current === 1) {
      fetch("popular", currentPage.current);
    }
  }, []);

  const location = useLocation().pathname;

  const handleLoad = async () => {
    if (currentPage.current < totalPage) {
    }

    currentPage.current++;

    await fetch("popular", currentPage.current);
    await update(movies && movies, "popularMovies");
  };

  return (
    <div>
      <h3>Popular New Releases</h3>
      <div className="page_wrapper">
        <Content movies={movies} location={location} />
      </div>
      <LoadButton func={handleLoad} />
    </div>
  );
}

export default memo(PopularMovies);
