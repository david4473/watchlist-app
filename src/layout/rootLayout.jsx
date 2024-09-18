import { NavLink, Outlet } from "react-router-dom";
import styles from "./rootLayout.module.scss";

const RootLayout = () => {
  return (
    <div className={styles.root_layout}>
      <header>
        <nav className={styles.nav}>
          <div className={styles.logo}>
            <h3>Watcher</h3>
          </div>
          <div className={styles.navigation}>
            <div className={styles.search_wrapper}>
              <input
                className={styles.search}
                type="text"
                placeholder="Search watchlist"
              />
            </div>
            <div className={styles.nav_list}>
              <NavLink className={styles.nav_link} to="/">
                Watchlist
              </NavLink>
              <NavLink className={styles.nav_link} to="discover">
                Discover
              </NavLink>
            </div>
          </div>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
