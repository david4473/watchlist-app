import axios from "axios";
import { useCallback, useEffect, useState } from "react";

const useFetch = (media, page = "", append) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const BASE_URL = "https://api.themoviedb.org/3/";
  const APPEND_URL = "&append_to_response=";
  const TOKEN = import.meta.env.VITE_TOKEN;

  /*   console.log(
    `${BASE_URL}${media}${TOKEN}&language=en-US${page}${APPEND_URL}${append}`
  ); */

  const fetchDataFromApi = useCallback(async () => {
    try {
      const req = await axios.get(
        `${BASE_URL}${media}${TOKEN}&language=en-US${page}${APPEND_URL}${append}`
      );
      const res = req.data;
      setLoading(false);
      setData(res);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  }, [media, page, append]);

  useEffect(() => {
    setData(null);
    setLoading(true);
    setError(null);

    fetchDataFromApi();
  }, [fetchDataFromApi]);

  return { data, loading, error };
};

export default useFetch;
