import { NavLink, Outlet } from "react-router-dom";
import styles from "./rootLayout.module.scss";

const RootLayout = () => {
  return (
    <div className={styles.root_layout}>
      <header>
        <nav>
          <h3>Watcher</h3>
          <NavLink to="/">Watchlist</NavLink>
          <NavLink to="discover">Discover</NavLink>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
