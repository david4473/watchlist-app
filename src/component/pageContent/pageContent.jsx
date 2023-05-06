import React from "react";
import Cards from "../cards/cards";
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

  return (
    <>
      {/* Render the movie cards for the current page */}
      <div className={styles.content_wrapper}>
        {movies &&
          movies.map((m, i) => (
            <div key={m.id} className={styles.content}>
              <Cards
                image={`https://image.tmdb.org/t/p/w500${m.poster_path}`}
                title={m.original_title}
                link={`${location}/${m.id}`}
              />
              <div className={styles.fave_icon}>
                <UseAnimations
                  animation={heart}
                  size={20}
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
            </div>
          ))}
      </div>
    </>
  );
};

export default Content;
