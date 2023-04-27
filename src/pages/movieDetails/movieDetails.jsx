import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFromatDate from "../../hooks/useDateFormater";
import useFetch from "../../hooks/useFetch";
import GetImageColor from "../../utils/getImageColor";
import styles from "./movieDetail.module.scss";
import arrowLeftCircle from "react-useanimations/lib/arrowLeftCircle";
import UseAnimations from "react-useanimations";

export function Movie() {
  const { id } = useParams();

  //states
  const [movie, setMovie] = useState("");
  const [color, setColor] = useState("");

  // hooks
  const { data, error } = useFetch(`movie/${id}`, undefined, "videos,credits");
  const { formatedDate, year } = useFromatDate(movie.release_date);
  const navigate = useNavigate();

  console.log(data);

  useEffect(() => {
    setMovie(data ? data : "");
  }, [data]);

  const detectedColor = (color) => {
    setColor(color);
  };

  function handleGoBack() {
    navigate(-1);
  }

  const backdropUri = "https://image.tmdb.org/t/p/original";
  const castImageUri = "https://image.tmdb.org/t/p/original";

  /* console.log(movie);

  console.log(
    movie.credits && movie.credits.cast.filter((el) => el.profile_path)
  ); */

  const text = movie && movie.overview.slice(0, 270);

  return (
    <div className={styles.details_wrapper}>
      <div className={styles.arrow_icon}>
        <UseAnimations
          animation={arrowLeftCircle}
          size={40}
          strokeColor={"white"}
          onClick={handleGoBack}
          wrapperStyle={{ cursor: "pointer" }}
        />
      </div>
      <div className={styles.header}>
        <img
          className={styles.header_img}
          src={`${backdropUri}${movie.backdrop_path}`}
          alt={movie.original_title}
        />
        <div
          className={styles.header_content}
          style={{
            "--accentColor": color,
          }}
        >
          <div className={styles.title_wrapper}>
            <h3 className={styles.title}>
              {movie.original_title} <span>({year})</span>
            </h3>
            <p className={styles.tagline}>{movie.tagline}</p>
            <div className={styles.genre}>
              <ul className={styles.genre_list}>
                {movie.genres &&
                  movie.genres.map((el) => {
                    return (
                      <li
                        key={el.id}
                        style={{
                          "--accentColor": color,
                        }}
                      >
                        {el.name}
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
          <div className={styles.overview_wrapper}>
            <h3 className={styles.overview_title}>Overview</h3>
            <p className={styles.overview}>{text}...</p>
          </div>
          <div className={styles.status_wrapper}>
            <p className={styles.status}>
              Status: <span>{movie.status}</span>
            </p>
            <p className={styles.date}>
              Release Date: <span>{formatedDate}</span>
            </p>
          </div>
          <div className={styles.director_wrapper}>
            <p className={styles.director}>
              Director(s):
              {movie.credits &&
                movie.credits.crew
                  .filter((member) => member.job === "Director")
                  .map((member) => {
                    return <span key={member.id}>{member.original_name}</span>;
                  })}
            </p>
          </div>
          <div className={styles.writers_wrapper}>
            <p className={styles.writers}>
              Writer(s):
              {movie.credits &&
                movie.credits.crew
                  .filter((member) => member.department === "Writing")
                  .splice(0, 2)
                  .map((member) => {
                    return <span key={member.id}>{member.original_name},</span>;
                  })}
            </p>
          </div>
        </div>
      </div>
      <div className={styles.cast_wrapper}>
        <h3>Top Casts</h3>
        <div className={styles.casts}>
          {movie.credits &&
            movie.credits.cast.map((cast) => {
              return (
                <div key={cast.id} className={styles.cast_card}>
                  <div className={styles.cast_image}>
                    <img
                      src={`${castImageUri}${cast.profile_path}`}
                      alt={cast.name}
                    />
                  </div>
                  <p>{cast.name}</p>
                  <p>{cast.character}</p>
                </div>
              );
            })}
        </div>
      </div>
      <GetImageColor
        detectedColor={detectedColor}
        url={`${backdropUri}${movie.backdrop_path}`}
      />
    </div>
  );
}
