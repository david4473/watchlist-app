import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFormatDate from "../../hooks/useDateFormater";
import useFetch from "../../hooks/useFetch";
import GetImageColor from "../../utils/getImageColor";
import styles from "./movieDetail.module.scss";
import arrowLeftCircle from "react-useanimations/lib/arrowLeftCircle";
import UseAnimations from "react-useanimations";
import DetailsLoader from "../../component/loaders/detailsLoader";
import { RiLiveFill } from "react-icons/ri";
import { useSpring, animated, useSpringRef, useTransition } from "react-spring";
import PlayButton from "../../component/play-button";

export function Movie() {
  const { id } = useParams();

  // States
  const [movie, setMovie] = useState(null);
  const [color, setColor] = useState("");
  const [videoId, setVideoId] = useState("");
  const playerRef = useRef(null);
  const iframeRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  // Transition effect for visibility
  const transition = useTransition(isVisible, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  // Fetch movie data
  const { data, error, loading } = useFetch(
    `movie/${id}`,
    undefined,
    "videos,credits"
  );

  const { formatedDate, year } = useFormatDate(movie?.release_date);

  // YouTube API and player setup
  const initializePlayer = () => {
    const player = new window.YT.Player(iframeRef.current, {
      events: {
        onReady: (event) => {
          playerRef.current = event.target;
        },
      },
    });

    console.log("YouTube Player Initialized", player);
  };

  useEffect(() => {
    if (data) setMovie(data);

    // Check if the YouTube API is already loaded
    if (window.YT && window.YT.Player) {
      // If loaded, initialize the player directly
      initializePlayer();
    } else {
      // Otherwise, inject the YouTube API script and set up the onYouTubeIframeAPIReady callback
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      // Set up the YouTube API ready callback
      window.onYouTubeIframeAPIReady = () => {
        initializePlayer();
      };
    }

    // Get and save video Id in state
    const video = movie?.videos?.results[movie?.videos?.results.length - 1];
    setVideoId(video && video?.key);
  }, [data, movie]);

  // Button click handler for toggling visibility and playing video
  const handlePlay = useCallback(() => {
    setIsVisible((prev) => !prev);
    playerRef.current?.playVideo();
  }, []);

  // Button click handler for toggling visibility and pausing video
  const handleGoBack = useCallback(() => {
    setIsVisible((prev) => !prev);
    playerRef.current?.pauseVideo();
  }, []);

  // Callback to set detected color
  const detectedColor = (color) => setColor(color);

  // Memoized values for URLs
  const backdropUri = useMemo(() => "https://image.tmdb.org/t/p/original", []);
  const castImageUri = useMemo(() => "https://image.tmdb.org/t/p/w185", []);

  // Shorten overview text
  const overviewText = useMemo(
    () => (movie?.overview ? movie.overview.slice(0, 270) : ""),
    [movie]
  );

  // Render top billed cast
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

  // Render crew
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
      <div className={styles.header_wrapper}>
        <div className={styles.video}>
          <iframe
            ref={iframeRef}
            style={{ border: "none" }}
            width="1525"
            height="551"
            src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1`}
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe>
          <div className={styles.arrow_icon}>
            <UseAnimations
              animation={arrowLeftCircle}
              size={40}
              strokeColor={"white"}
              onClick={handleGoBack}
              wrapperStyle={{ cursor: "pointer" }}
            />
          </div>
        </div>
        {transition(
          (style, item) =>
            item && (
              <animated.div style={style} className={styles.header}>
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
                    </div>
                    <div className={styles.play_wrapper}>
                      <PlayButton
                        color={color}
                        handleButtonclick={handlePlay}
                      />
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
                    <p className={styles.writers}>
                      Writer(s): {renderCrew("Writing")}
                    </p>
                  </div>
                </div>
              </animated.div>
            )
        )}
      </div>
      <div className={styles.cast_wrapper}>
        <h3>Top Casts</h3>

        <div className={styles.casts}>{renderCast()}</div>
      </div>
      <GetImageColor
        detectedColor={detectedColor}
        url={`${backdropUri}${movie?.backdrop_path}`}
      />
    </div>
  );
}
