import { useState, useEffect } from "react";
import { fetchTrendingMovies } from "../movies-api";
import MovieList from "../components/MovieList/MovieList";

export default function HomePage() {
  const [trendMovies, setTrendMovies] = useState([]);

  useEffect(() => {
    const getTrendMovies = async () => {
      try {
        const data = await fetchTrendingMovies();
        setTrendMovies(data.results);
      } catch {
        console.log("error!");
      }
    };
    getTrendMovies();
  }, []);

  return (
    <>
      <h2>Trending today</h2>
      <MovieList movies={trendMovies} />
    </>
  );
}
