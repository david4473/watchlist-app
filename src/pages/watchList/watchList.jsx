import React from "react";
import Content from "../../component/pageContent/pageContent";
import { useLocation } from "react-router-dom";
import { useSlice } from "../../store/store";
import styles from "./watchList.module.scss";
import GridLoader from "../../component/loaders/gridLoader";

function WatchList() {
  const movies = useSlice((state) => state.watchList);
  const loading = useSlice((state) => state.loading);
  console.log(loading);

  return (
    <>
      {loading ? (
        <GridLoader />
      ) : (
        <div>
          <h3>Watch list</h3>
          <Content movies={movies} location={"/watchlist"} />
        </div>
      )}
    </>
  );
}

export default WatchList;
