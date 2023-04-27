import React from "react";
import { Link } from "react-router-dom";

function Cards({ title, image, link }) {
  return (
    <div className="cards">
      <Link to={link}>
        <img src={image} alt={title} className="img" />
      </Link>
      <div>
        <Link to={link}>
          <p>{title}</p>
        </Link>
      </div>
    </div>
  );
}

export default Cards;
