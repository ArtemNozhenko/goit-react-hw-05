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
        setMoviesReviews(data.results);
      } catch {
        console.error("error!");
      }
    };
    getMoviesReviews();
  }, [movieId]);

  return (
    <>
      <div>
        <ul>
          {moviesReviews.length > 0
            ? moviesReviews.map(
                ({ author, content, id }) => (
                  <li key={id}>
                    <h3>Author: {author}</h3>
                    <p>{content}</p>
                  </li>
                )
              )
            : `We don't have any reviews for this movie`}
        </ul>
      </div>
    </>
  );
}
