import { useState, useEffect } from "react";
import { fetchSearchMovies } from "../../movies-api";
import { useSearchParams } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import SearchMovies from "../../components/SearchMovies/SearchMovies";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import css from "./MoviesPage.module.css";

export default function MoviesPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [queryMovie, setQueryMovie] = useState([]);
  const [isError, setIsError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  useEffect(() => {
    if (!query) return;

    const getSearchMovies = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const data = await fetchSearchMovies(query);
        setQueryMovie(data.results);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getSearchMovies();
  }, [query]);

  const handleSearch = (topic) => {
    setSearchParams({ query: topic });
  };

  return (
    <section className={css.container}>
      <SearchMovies onSearch={handleSearch} />
      <Toaster />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      <MovieList movies={queryMovie} />
    </section>
  );
}
