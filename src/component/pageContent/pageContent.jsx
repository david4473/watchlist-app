import React from "react";
import Cards from "../cards";
import styles from "./pageContent.module.scss";
import { useSlice } from "../../store/store";
import heart from "react-useanimations/lib/heart";
import UseAnimations from "react-useanimations";
import { useState } from "react";
import { useEffect } from "react";

// Define Pagination component
const Content = ({ movies, location }) => {
  const [checked, setChecked] = useState(false);
  const remove = useSlice((state) => state.deleteFromWatchlist);
  const favorite = useSlice((state) => state.addToWatchlist);
  const watchlist = useSlice((state) => state.watchList);

  console.log(checked);

  return (
    <>
      {/* Render the movie cards for the current page */}
      <div className="page">
        {movies &&
          movies.map((m, i) => (
            <div key={m.id}>
              <Cards
                image={`https://image.tmdb.org/t/p/w500${m.poster_path}`}
                title={m.original_title}
                link={`${location}/${m.id}`}
              />
              <UseAnimations
                animation={heart}
                size={20}
                checked={true}
                onClick={() => {
                  setChecked(!checked);
                  watchlist.find((movie) => movie.id === m.id)
                    ? remove(m.id)
                    : favorite(m);
                }}
                strokeColor={"white"}
                fillColor={"red"}
                wrapperStyle={{ cursor: "pointer" }}
              />
            </div>
          ))}
      </div>
    </>
  );
};

export default Content;
