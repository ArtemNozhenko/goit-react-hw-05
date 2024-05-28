import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMoviesCredits } from "../../movies-api";

export default function MovieCast() {
  const [moviesCredits, setMoviesCredits] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    const getMoviesCredits = async () => {
      try {
        const data = await fetchMoviesCredits(movieId);
        setMoviesCredits(data.cast);
      } catch {
        console.error("error!");
      }
    };
    getMoviesCredits();
  }, [movieId]);

  return (
    <>
      <div>
        <ul>
          {moviesCredits.length > 0
            ? moviesCredits.map(
                ({ id, name, profile_path, character }) => (
                  <li key={id}>
                    <div>
                      <img
                        src={`https://image.tmdb.org/t/p/w500/${profile_path}`}
                        alt={name}
                      />
                      <h3>{name}</h3>
                      <p>Character: {character}</p>
                    </div>
                  </li>
                )
              )
            : "Sorry, there isn't any info"}
        </ul>
      </div>
    </>
  );
}

// adult: false;
// cast_id: 14;
// character: "Haley";
// credit_id: "635d062988c659007a3c2d1f";
// gender: 1;
// id: 2480853;
// known_for_department: "Acting";
// name: "Harriet Slater";
// order: 0;
// original_name: "Harriet Slater";
// popularity: 9.42;
// profile_path: "/9BJxdhi4tuiQdgT8bfDuiPipnsx.jpg";
