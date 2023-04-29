import React from "react";
import { Link } from "react-router-dom";
import styles from "./cards.module.scss";

function Cards({ title, image, link }) {
  const newTitle =
    title.length > title.slice(0, 16).length
      ? `${title.slice(0, 16)}...`
      : title;

  return (
    <div className={styles.cards}>
      <Link to={link}>
        <img src={image} alt={title} className={styles.img} />
      </Link>
      <Link to={link}>
        <p className={styles.title}>{newTitle}</p>
      </Link>
    </div>
  );
}

export default Cards;
