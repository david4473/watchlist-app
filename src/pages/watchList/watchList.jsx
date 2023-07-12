import React from "react";
import Content from "../../component/pageContent/pageContent";
import { useLocation } from "react-router-dom";
import { useSlice } from "../../store/store";
import styles from "./watchList.module.scss";

function WatchList() {
  const movies = useSlice((state) => state.watchList);
  const loading = useSlice((state) => state.loading);
  console.log(loading);

  return (
    <>
      <div>
        <h3>Watch list</h3>
        {movies < 1 && <p>There are no movies in your watchlist. Add some </p>}
        <Content movies={movies} location={"/watchlist"} />
      </div>
    </>
  );
}

export default WatchList;
