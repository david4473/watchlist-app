import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import CardLoader from "../loaders/cardloader";
import styles from "./cards.module.scss";
import { useSlice } from "../../store/store";

function Cards({ title, image, link }) {
  const imgEl = useRef();
  const [loaded, setLoaded] = useState(false);

  const loading = useSlice((state) => state.loading);

  const onImageLoad = () => setLoaded(true);

  useEffect(() => {
    const imgCurrent = imgEl.current;

    if (imgCurrent) {
      imgCurrent.addEventListener("load", onImageLoad);
      console.log("loaded");
      return () => {
        removeEventListener("load", onImageLoad);
      };
    }
  }, [imgEl.current]);

  const newTitle =
    title.length > title.slice(0, 16).length
      ? `${title.slice(0, 16)}...`
      : title;

  return (
    <>
      {!loading ? (
        <div className={styles.cards}>
          <Link to={link}>
            <img ref={imgEl} src={image} alt={title} className={styles.img} />
          </Link>
          <Link to={link}>
            <p className={styles.title}>{newTitle}</p>
          </Link>
        </div>
      ) : (
        <CardLoader />
      )}
    </>
  );
}

export default Cards;
