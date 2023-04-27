import React from "react";
import Content from "../../component/pageContent/pageContent";
import { useLocation } from "react-router-dom";
import { useSlice } from "../../store/store";
import styles from "./watchList.module.scss";

function WatchList() {
  const movies = useSlice((state) => state.watchList);

  console.log(movies);

  const location = useLocation().pathname;

  return (
    <div>
      <h3>Watch list</h3>
      <Content movies={movies} location={location} />
    </div>
  );
}

export default WatchList;
