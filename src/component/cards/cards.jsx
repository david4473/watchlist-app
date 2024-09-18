import React, { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import CardLoader from "../loaders/cardloader";
import styles from "./cards.module.scss";
import { useStore } from "../../store/store";
import { IconCheckbox } from "../iconCheckbox";
import { FcLike, FcDislike } from "react-icons/fc";

function Cards({ title, image, link, movie }) {
  // References and state
  const imgEl = useRef();
  const [loaded, setLoaded] = useState(false);
  const watchlist = useStore((state) => state.watchList);
  const removeFromWatchlist = useStore((state) => state.deleteFromWatchlist);
  const addToWatchlist = useStore((state) => state.addToWatchlist);

  // Set initial checked state based on watchlist
  const [checked, setChecked] = useState(
    !watchlist.some((item) => item.id === movie.id)
  );

  // Toggle movie in watchlist and update checked state
  const handleClick = useCallback(() => {
    const isInWatchlist = watchlist.some((item) => item.id === movie.id);
    isInWatchlist ? removeFromWatchlist(movie.id) : addToWatchlist(movie);
    setChecked(!checked);
  }, [watchlist, movie, checked, removeFromWatchlist, addToWatchlist]);

  // Set the loaded state when image is loaded
  const onImageLoad = useCallback(() => setLoaded(true), []);

  useEffect(() => {
    const imgCurrent = imgEl.current;
    if (imgCurrent) {
      imgCurrent.addEventListener("load", onImageLoad);
      return () => {
        imgCurrent.removeEventListener("load", onImageLoad);
      };
    }
  }, [onImageLoad]);

  // Shortens movie title if necessary
  const truncatedTitle = title.length > 16 ? `${title.slice(0, 16)}...` : title;

  return (
    <div className={styles.card_wrapper}>
      {/* Display loader until image is fully loaded */}
      {!loaded && <CardLoader />}
      <div className={styles.cards}>
        <div className={styles.fave_icon}>
          <IconCheckbox
            checked={checked}
            checkedIcon={<FcLike />}
            uncheckedIcon={<FcDislike />}
            onClick={handleClick}
          />
        </div>
        <Link to={link}>
          <img ref={imgEl} src={image} alt={title} className={styles.img} />
        </Link>
      </div>
      <Link to={link}>
        <p className={styles.title}>{truncatedTitle}</p>
      </Link>
    </div>
  );
}

export default Cards;
