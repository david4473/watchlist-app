import React, { useEffect, memo, useState } from "react";
import { useLocation } from "react-router-dom";
import { useStore } from "../../store/store";
import Content from "../../component/pageContent/pageContent";
import styles from "./upcomingMovies.module.scss";
import useScrollFunc from "../../hooks/useScrollFunc";
import LoadButton from "../../component/Button/loadButton";

function UpcomingMovies() {
  const movies = useStore((state) => state.upcomingMovies);
  const loading = useStore((state) => state.loading);
  const fetch = useStore((state) => state.fetchMovies);
  const update = useStore((state) => state.updateMovies);

  /*   const { data } = useFetch("movie/upcoming", `&page=${page}`); */

  const { scroll, scrollFunc } = useScrollFunc();

  const currentPage = React.useRef(1);
  const totalPage = 22;

  useEffect(() => {
    if (movies.length === 0 && currentPage.current === 1) {
      fetch("upcoming", currentPage.current);
      console.log("ran: " + currentPage.current);
    }
  }, []);

  const location = useLocation().pathname;

  const handleLoad = async () => {
    currentPage.current++;
    await fetch("upcoming", currentPage.current);
    await update(movies && movies, "upcomingMovies");
  };

  return (
    <div>
      <h3>Upcoming Movies</h3>
      <div className="page_wrapper">
        <Content movies={movies} location={location} />
      </div>
      <LoadButton func={handleLoad} />
    </div>
  );
}

export default memo(UpcomingMovies);
