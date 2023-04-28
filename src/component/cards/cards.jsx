import React from "react";
import { Link } from "react-router-dom";
import styles from "./cards.module.scss";

function Cards({ title, image, link }) {
  return (
    <div className={styles.cards}>
      <Link to={link}>
        <img src={image} alt={title} className={styles.img} />
      </Link>
      <div>
        <Link to={link}>
          <p className={styles.title}>{title.slice(0, 20)}</p>
        </Link>
      </div>
    </div>
  );
}

export default Cards;
