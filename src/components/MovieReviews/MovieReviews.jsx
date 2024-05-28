import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMoviesReviews } from "../../movies-api";

export default function MovieReviews() {
  const [moviesReviews, setMoviesReviews] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    const getMoviesReviews = async () => {
      try {
        const data = await fetchMoviesReviews(movieId);
        setMoviesReviews(data);
      } catch {
        console.error("error!");
      }
    };
    getMoviesReviews();
  }, [movieId]);

  console.log(moviesReviews);

  return (
    <>
      <div></div>
    </>
  );
}
