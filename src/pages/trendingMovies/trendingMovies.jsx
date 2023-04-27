import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSlice } from "../../store/store";
import Content from "../../component/pageContent/pageContent";
import styles from "./trendingMovies.module.scss";

function TrendingMovies() {
  const movies = useSlice((state) => state.trendingMovies);
  const loading = useSlice((state) => state.loading);
  const fetch = useSlice((state) => state.fetchData);
  const update = useSlice((state) => state.movieUpdate);
  const mo = useSlice((state) => state.watchList);

  console.log(mo);

  const currentPage = React.useRef(1);
  const totalPage = 22;

  useEffect(() => {
    fetch("movie/day", "trending", currentPage.current);
  }, []);

  const location = useLocation().pathname;

  const handleLoad = async () => {
    if (currentPage.current < totalPage) {
      currentPage.current++;
    }
    await fetch("movie/day", "trending", currentPage.current);
    await update(movies && movies, "trendingMovies");
  };

  return (
    <div>
      <div className="inner page">
        <Content movies={movies} location={location} />
        <button onClick={handleLoad}>Load more</button>
      </div>
    </div>
  );
}

export default TrendingMovies;
