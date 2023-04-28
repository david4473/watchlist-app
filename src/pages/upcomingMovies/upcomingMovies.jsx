import React, { useEffect, memo, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSlice } from "../../store/store";
import Content from "../../component/pageContent/pageContent";
import styles from "./upcomingMovies.module.scss";
import useScrollFunc from "../../hooks/useScrollFunc";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

function UpcomingMovies() {
  const movies = useSlice((state) => state.upcomingMovies);
  const loading = useSlice((state) => state.loading);
  const fetch = useSlice((state) => state.fetchData);
  const update = useSlice((state) => state.movieUpdate);
  const [page, setPage] = useState([]);
  const [data, setData] = useState(null);

  /*   const { data } = useFetch("movie/upcoming", `&page=${page}`); */

  const { scroll, scrollFunc } = useScrollFunc();

  const currentPage = React.useRef(1);
  const totalPage = 22;

  useEffect(() => {
    fetch("upcoming", "movie", currentPage.current);
  }, [fetch]);

  const location = useLocation().pathname;

  const handleLoad = async () => {
    currentPage.current++;
    await fetch("upcoming", "movie", currentPage.current);
    await update(movies && movies, "upcomingMovies");
  };

  return (
    <div>
      <h3>Upcoming Movies</h3>
      <div className="page_wrapper">
        <Content movies={movies} location={location} />
        <button onClick={handleLoad}>Load more</button>
      </div>
    </div>
  );
}

export default memo(UpcomingMovies);
