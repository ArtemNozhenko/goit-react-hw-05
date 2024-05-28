import { useState, useEffect } from "react";
import { fetchTrendingMovies } from "../movies-api";
import MovieList from "../components/MovieList/MovieList";
import Loader from "../components/Loader/Loader";

export default function HomePage() {
  const [trendMovies, setTrendMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getTrendMovies = async () => {
      try {
        setIsLoading(true);
        const data = await fetchTrendingMovies();
        setTrendMovies(data.results);
      } catch {
        console.log("error!");
      } finally {
        setIsLoading(false);
      }
    };
    getTrendMovies();
  }, []);

  return (
    <>
      <h2>Trending today</h2>
      {isLoading && <Loader />}
      <MovieList movies={trendMovies} />
    </>
  );
}
