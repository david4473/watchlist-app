import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useStore } from "../../store/store";
import styles from "./index.module.scss";
import axios from "axios";

const TOKEN = import.meta.env.VITE_TOKEN;

function Search() {
  const [data, setData] = useState("");
  const [dropdown, setDropdown] = useState("movie");

  const handleChange = async (e) => {
    try {
      const req = await axios.get(
        `https://api.themoviedb.org/3/search/${dropdown}?query=${e.target.value}&api_key=8214e027d9b81733c5b4760ea86276b9`
      );
      const res = await req.data;
      setData(res && res.results);
    } catch (error) {
      console.log(error);
    }
    console.log(data);
  };

  const handleDropdown = (e) => {
    setDropdown(e.target.value);
  };

  console.log("dropdown state: " + dropdown);

  return (
    <div className={styles.search_wrapper}>
      <div className={styles.search_input}>
        <input
          className={styles.search}
          type="text"
          placeholder="Search Movies"
          onChange={(e) => handleChange(e)}
        />
        <select onChange={handleDropdown} name="search_option" id="">
          <option value="movie">Movie</option>
          <option value="tv">TV</option>
        </select>
        <div className={styles.search_result}>
          {!data ? (
            <div>search for a movie or show</div>
          ) : (
            <div>
              {data &&
                data.map((item) => (
                  <div className={styles.list_item} key={item.id}>
                    <p>{item.title || item.name}</p>
                  </div>
                ))}
              data available
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Search;
