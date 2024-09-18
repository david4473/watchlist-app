import React from "react";
import Content from "../../component/pageContent/pageContent";
import { useStore } from "../../store/store";
import styles from "./watchList.module.scss";

function WatchList() {
  const movies = useStore((state) => state.watchList);
  const loading = useStore((state) => state.loading);

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
