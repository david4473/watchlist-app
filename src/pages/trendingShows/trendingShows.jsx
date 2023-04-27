import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSlice } from "../../store/store";
import Content from "../../component/pageContent/pageContent";
import styles from "./trendingShows.module.scss";

function TrendingShows() {
  const movies = useSlice((state) => state.trendingShows);
  const loading = useSlice((state) => state.loading);
  const fetch = useSlice((state) => state.fetchData);
  const update = useSlice((state) => state.movieUpdate);

  const currentPage = React.useRef(1);
  const totalPage = 22;

  useEffect(() => {
    fetch("tv/day", "trending", currentPage.current);
  }, []);

  const location = useLocation().pathname;

  const handleLoad = async () => {
    if (currentPage.current < totalPage) {
      currentPage.current++;
    }
    await fetch("tv/day", "trending", currentPage.current);
    await update(movies && movies, "trendingShows");
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

export default TrendingShows;
