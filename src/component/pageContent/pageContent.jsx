import React from "react";
import Cards from "../cards/cards";
import styles from "./pageContent.module.scss";
import { useStore } from "../../store/store";
import heart from "react-useanimations/lib/heart";
import UseAnimations from "react-useanimations";
import { useState, useEffect } from "react";

const Content = ({ movies, location }) => {
  return (
    <>
      {/* Render the movie cards for the current page */}
      <div className={styles.content_wrapper}>
        {movies &&
          movies.map((m, i) => (
            <div key={m.id} className={styles.content}>
              <Cards
                image={`https://image.tmdb.org/t/p/w500${m.poster_path}`}
                title={m.original_title || m.name}
                link={`${location}/${m.id}`}
                movie={m}
              />
            </div>
          ))}
      </div>
    </>
  );
};

export default Content;
