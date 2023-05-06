import styles from "./loader.module.scss";

const CardLoader = () => {
  return (
    <div>
      <div className={styles.card}>
        <div className={styles.card_items}></div>
        <div className={styles.card_items}></div>
        <div className={styles.card_items}></div>
      </div>
    </div>
  );
};

export default CardLoader;
