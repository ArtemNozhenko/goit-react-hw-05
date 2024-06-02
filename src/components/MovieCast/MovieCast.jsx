import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMoviesCredits } from "../../movies-api";
import css from "./MovieCast.module.css";

export default function MovieCast() {
  const [moviesCredits, setMoviesCredits] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    const getMoviesCredits = async () => {
      try {
        const data = await fetchMoviesCredits(movieId);
        setMoviesCredits(data.cast);
      } catch {
        console.error("Error fetching movie credits!");
      }
    };
    getMoviesCredits();
  }, [movieId]);

  return (
    <div className={css.container}>
      <ul className={css.list}>
        {moviesCredits.length > 0
          ? moviesCredits.map(
              ({ id, name, profile_path, character }) => (
                <li key={id} className={css.item}>
                  <div>
                    <img
                      className={css.image}
                      src={
                        profile_path
                          ? `https://image.tmdb.org/t/p/w500/${profile_path}`
                          : "https://via.placeholder.com/150"
                      }
                      alt={name}
                    />
                    <h3 className={css.name}>{name}</h3>
                    <p className={css.character}>
                      Character: {character}
                    </p>
                  </div>
                </li>
              )
            )
          : "Sorry, there isn't any info"}
      </ul>
    </div>
  );
}
