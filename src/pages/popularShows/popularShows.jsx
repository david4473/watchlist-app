import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSlice } from "../../store/store";
import Cards from "../../component/cards/cards";
import Content from "../../component/pageContent/pageContent";
import styles from "./popularShows.module.scss";

function PopularShows() {
  const movies = useSlice((state) => state.popularShows);
  const loading = useSlice((state) => state.loading);
  const fetch = useSlice((state) => state.fetchData);
  const update = useSlice((state) => state.movieUpdate);

  const currentPage = React.useRef(1);
  const totalPage = 22;

  useEffect(() => {
    fetch("popular", "tv", currentPage.current);
  }, [fetch]);

  const location = useLocation();

  const handleLoad = async () => {
    if (currentPage.current < totalPage) {
      currentPage.current++;
    }
    await fetch("popular", "tv", currentPage.current);
    await update(movies && movies, "popularShows");
  };

  return (
    <div>
      <h3>Popular Shows</h3>
      <div className="page_wrapper">
        <Content movies={movies} location={location} />
        <button onClick={handleLoad}>Load more</button>
      </div>
    </div>
  );
}

export default PopularShows;
