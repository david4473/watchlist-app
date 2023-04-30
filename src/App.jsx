import { useState, useEffect } from "react";
import Cards from "./component/cards/cards";
import "./App.scss";
import { Link } from "react-router-dom";
import Trending from "./component/discover components/trending";
import InTheaters from "./component/discover components/inTheaters";
import Popular from "./component/discover components/popular";
import Discover from "./pages/discover/discover";

function App() {
  const [toggle, setToggle] = useState(false);

  return (
    <div className="App">
      <nav>
        <Link to={"/"}>
          <h3>Watcher</h3>
        </Link>
      </nav>
      <Discover />
    </div>
  );
}

export default App;
