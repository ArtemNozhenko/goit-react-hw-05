import { useState, useEffect } from "react";
import { fetchTrendingMovies } from "../../movies-api";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import css from "./HomePage.module.css";

export default function HomePage() {
  const [trendMovies, setTrendMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getTrendMovies = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const data = await fetchTrendingMovies();
        setTrendMovies(data.results);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getTrendMovies();
  }, []);

  return (
    <section className={css.container}>
      <h2 className={css.title}>Trending today</h2>
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      <MovieList movies={trendMovies} />
    </section>
  );
}
