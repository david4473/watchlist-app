import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFormatDate from "../../hooks/useDateFormater";
import useFetch from "../../hooks/useFetch";
import GetImageColor from "../../utils/getImageColor";
import styles from "./movieDetail.module.scss";
import arrowLeftCircle from "react-useanimations/lib/arrowLeftCircle";
import UseAnimations from "react-useanimations";
import DetailsLoader from "../../component/loaders/detailsLoader";
import { RiLiveFill } from "react-icons/ri";

export function Movie() {
  const { id } = useParams();
  const navigate = useNavigate();

  // States
  const [movie, setMovie] = useState(null);
  const [color, setColor] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [yturl, setYturl] = useState("");

  // Fetch movie data
  const { data, error, loading } = useFetch(
    `movie/${id}`,
    undefined,
    "videos,credits"
  );

  const { formatedDate, year } = useFormatDate(movie?.release_date);

  useEffect(() => {
    if (data) setMovie(data);
  }, [data]);

  const watchVideo = useCallback(async () => {
    try {
      setOpenModal(!openModal);
      const video = movie?.videos?.results[movie?.videos?.results.length - 1];
      setYturl(video.key);
    } catch (error) {
      console.log(error);
    }
  });

  const backdropUri = useMemo(() => "https://image.tmdb.org/t/p/original", []);
  const castImageUri = useMemo(() => "https://image.tmdb.org/t/p/w185", []);

  const handleGoBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const detectedColor = useCallback((color) => {
    setColor(color);
  }, []);

  const overviewText = useMemo(
    () => (movie?.overview ? movie.overview.slice(0, 270) : ""),
    [movie]
  );

  const renderCast = useCallback(() => {
    return (
      movie?.credits?.cast.map((cast) => (
        <div key={cast.id} className={styles.cast_card}>
          <div className={styles.cast_image}>
            <img src={`${castImageUri}${cast.profile_path}`} alt={cast.name} />
          </div>
          <p>{cast.name}</p>
          <p>{cast.character}</p>
        </div>
      )) || []
    );
  }, [movie, castImageUri]);

  const renderCrew = useCallback(
    (department) => {
      return movie?.credits?.crew
        .filter((member) => member.department === department)
        .slice(0, 2)
        .map((member) => <span key={member.id}>{member.original_name}</span>);
    },
    [movie]
  );

  if (loading) {
    return <DetailsLoader />;
  }

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
        <div></div>
        <img
          className={styles.header_img}
          src={`${backdropUri}${movie?.backdrop_path}`}
          alt={movie?.original_title}
        />
        <div
          className={styles.header_content}
          style={{ "--accentColor": color }}
        >
          <div className={styles.title_wrapper}>
            <h3 className={styles.title}>
              {movie?.original_title} <span>({year})</span>
            </h3>
            <p className={styles.tagline}>{movie?.tagline}</p>
            <div className={styles.genre}>
              <ul className={styles.genre_list}>
                {movie?.genres?.map((el) => (
                  <li key={el.id} style={{ "--accentColor": color }}>
                    {el.name}
                  </li>
                ))}
              </ul>
              <RiLiveFill onClick={watchVideo} />
            </div>
          </div>
          <div className={styles.overview_wrapper}>
            <h3 className={styles.overview_title}>Overview</h3>
            <p className={styles.overview}>{overviewText}...</p>
          </div>
          <div className={styles.status_wrapper}>
            <p className={styles.status}>
              Status: <span>{movie?.status}</span>
            </p>
            <p className={styles.date}>
              Release Date: <span>{formatedDate}</span>
            </p>
          </div>
          <div className={styles.director_wrapper}>
            <p className={styles.director}>
              Director(s): {renderCrew("Directing")}
            </p>
          </div>
          <div className={styles.writers_wrapper}>
            <p className={styles.writers}>Writer(s): {renderCrew("Writing")}</p>
          </div>
        </div>
      </div>
      <div className={styles.cast_wrapper}>
        <h3>Top Casts</h3>
        <div className={styles.casts}>{renderCast()}</div>
      </div>
      <div>
        <iframe
          width="1500"
          height="315"
          src={`https://www.youtube.com/embed/${yturl}`}
        ></iframe>
      </div>
      <GetImageColor
        detectedColor={detectedColor}
        url={`${backdropUri}${movie?.backdrop_path}`}
      />
    </div>
  );
}
