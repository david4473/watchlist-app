import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import CardLoader from "../loaders/cardloader";
import styles from "./cards.module.scss";
import { useSlice } from "../../store/store";

function Cards({ title, image, link }) {
  const imgEl = useRef();
  const [loaded, setLoaded] = useState(false);

  const onImageLoad = () => setLoaded(true);

  useEffect(() => {
    const imgCurrent = imgEl.current;

    if (imgCurrent) {
      imgCurrent.addEventListener("load", onImageLoad);
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
    <div className={styles.card_wrapper}>
      {!loaded && <CardLoader />}
      <div className={styles.cards}>
        <Link to={link}>
          <img ref={imgEl} src={image} alt={title} className={styles.img} />
        </Link>
        <Link to={link}>
          <p className={styles.title}>{newTitle}</p>
        </Link>
      </div>
    </div>
  );
}

export default Cards;
