import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Trending from "../../component/trending";
import InTheaters from "../../component/inTheaters";
import Popular from "../../component/popular";

const Discover = () => {
  return (
    <div>
      <h1>Discover</h1>
      <div className="items">
        <div>
          <h3>Trending</h3>
          <Link to={"/Trendingmovies"}>Show more</Link>
          <Trending />
        </div>
        <div className="slide">{/* placeholder */}</div>
      </div>
      <div className="items">
        <div>
          <h3>Popular</h3>
          <Link to={"/Popularmovies"}>Show more</Link>
          <Popular />
        </div>
        <div className="slide">{/* placeholder */}</div>
      </div>
      <div className="items">
        <div>
          <h3>Upcoming movies</h3>
          <Link to={"/UpcomingMovies"}>Show more</Link>
        </div>
        <div className="slide">{/* placeholder */}</div>
      </div>
    </div>
  );
};

export default Discover;