import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useStore } from "../../store/store";
import Content from "../pageContent/pageContent";
import LoadButton from "../Button/loadButton";

function TrendingMovies() {
  const movies = useStore((state) => state.trendingMovies);
  const loading = useStore((state) => state.loading);
  const fetch = useStore((state) => state.fetchTrending);
  const update = useStore((state) => state.updateMovies);

  const currentPage = React.useRef(1);
  const totalPage = 22;

  localStorage.setItem("page", currentPage.current);
  const page = localStorage.getItem("page");

  useEffect(() => {
    if (movies.length === 0 && currentPage.current)
      fetch("movie/day", currentPage.current);
  }, []);

  const location = useLocation().pathname;

  const handleLoad = async () => {
    if (currentPage.current < totalPage) {
      currentPage.current++;
    }
    await fetch("movie/day", currentPage.current);
    await update(movies && movies, "trendingMovies");
  };

  return (
    <div>
      <div className="page_wrapper">
        <Content movies={movies} location={location} />
      </div>
      <LoadButton func={handleLoad} load={loading} />
    </div>
  );
}

export default TrendingMovies;
