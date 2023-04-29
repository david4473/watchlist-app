import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import App from "./App";
import { Movie } from "./pages/movieDetails/movieDetails";
import PopularMovies from "./pages/popularMovies/popularMovies";
import PopularShows from "./pages/popularShows/popularShows";
import UpcomingMovies from "./pages/upcomingMovies/upcomingMovies";
import TrendingMovies from "./pages/trendingMovies/trendingMovies";
import TrendingShows from "./pages/trendingShows/trendingShows";
import "./index.scss";
import WatchList from "./pages/watchList/watchList";
import RootLayout from "./layout/rootLayout";
import Discover from "./pages/discover/discover";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<WatchList />} />
      <Route path="/discover" element={<Discover />} />
      <Route path="/trendingmovies" element={<TrendingMovies />} />
      <Route path="/trendingshow" element={<TrendingShows />} />
      <Route path="/popularMovies" element={<PopularMovies />} />
      <Route path="/popularshows" element={<PopularShows />} />
      <Route path="/upcomingmovies" element={<UpcomingMovies />} />
      //Route parameters
      <Route path="/:customPath/:id" element={<Movie />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
