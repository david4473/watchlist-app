import styles from "./loader.module.scss";

const DetailsLoader = () => {
  return (
    <div className={styles.details_wrapper}>
      <div className={styles.backdrop_skeleton}>
        <div className={styles.backdrop_texts}>
          <div className={styles.textitems}></div>
          <div className={styles.textitems}></div>
          <div className={styles.textitems}></div>
        </div>
        <div className={styles.backdrop_content}></div>
      </div>
      <div className={styles.cast_loader}>
        <div className={styles.cast_skeleton}>
          <div className={styles.cast_image_skeleton}></div>
        </div>
        <div className={styles.cast_skeleton}>
          <div className={styles.cast_image_skeleton}></div>
        </div>
        <div className={styles.cast_skeleton}>
          <div className={styles.cast_image_skeleton}></div>
        </div>
        <div className={styles.cast_skeleton}>
          <div className={styles.cast_image_skeleton}></div>
        </div>
        <div className={styles.cast_skeleton}>
          <div className={styles.cast_image_skeleton}></div>
        </div>
        <div className={styles.cast_skeleton}>
          <div className={styles.cast_image_skeleton}></div>
        </div>
      </div>
    </div>
  );
};

export default DetailsLoader;
