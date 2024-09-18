import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useStore } from "../../store/store";
import Cards from "../../component/cards/cards";
import Content from "../../component/pageContent/pageContent";
import styles from "./popularShows.module.scss";
import LoadButton from "../../component/Button/loadButton";

function PopularShows() {
  const movies = useStore((state) => state.popularShows);
  const loading = useStore((state) => state.loading);
  const fetch = useStore((state) => state.fetchData);
  const update = useStore((state) => state.movieUpdate);

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
      </div>
      <LoadButton func={handleLoad} />
    </div>
  );
}

export default PopularShows;
