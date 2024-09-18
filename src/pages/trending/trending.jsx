import React, { useEffect, useState } from "react";
import styles from "./trending.module.scss";
import TrendingMovies from "../../component/trending/trendingMovies";
import TrendingShows from "../../component/trending/trendingShows";

function Trending() {
  const [toggle, setToggle] = useState("movie");

  console.log(toggle);

  return (
    <div>
      <h1>Trending {toggle}</h1>
      <div>
        <p onClick={() => setToggle("movie")}>Movies</p>|
        <p onClick={() => setToggle("tv")}>Tv</p>
      </div>
      <div>{toggle === "movie" ? <TrendingMovies /> : <TrendingShows />}</div>
    </div>
  );
}

export default Trending;
