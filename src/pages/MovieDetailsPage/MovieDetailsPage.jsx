import {
  useState,
  useEffect,
  Suspense,
  useRef,
} from "react";
import { fetchMovieDetails } from "../../movies-api";
import {
  Link,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import css from "./MovieDetailsPage.module.css";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

export default function MovieDetailsPage() {
  const [movieDetails, setMovieDetails] = useState({});
  const { movieId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const location = useLocation();
  const backLinkRef = useRef(location.state?.from ?? "/");

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const data = await fetchMovieDetails(movieId);
        setMovieDetails(data);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getMovieDetails();
  }, [movieId]);

  const {
    poster_path,
    original_title,
    overview,
    genres,
    vote_average,
  } = movieDetails;

  const defaultImg =
    "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";
  const votePercentage = (vote_average * 10).toFixed(1);

  return (
    <div className={css.container}>
      <p>
        <b>
          <Link
            to={backLinkRef.current}
            className={css.backLink}
          >
            Go back
          </Link>
        </b>
      </p>
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      <div className={css.movieDetails}>
        <img
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w500/${poster_path}`
              : defaultImg
          }
          width={250}
          alt="poster"
          className={css.movieImage}
        />
        <div className={css.movieInfo}>
          <h2 className={css.movieTitle}>
            {original_title}
          </h2>
          <p className={css.userScore}>
            User Score: {votePercentage}%
          </p>
          <h3 className={css.sectionTitle}>Overview</h3>
          <p>{overview}</p>
          <h3 className={css.sectionTitle}>Genres</h3>
          <ul className={css.genresList}>
            {genres &&
              genres.length > 0 &&
              genres.map(({ id, name }) => (
                <li key={id}>{name}</li>
              ))}
          </ul>
        </div>
      </div>
      <div className={css.additionalInfo}>
        <h3 className={css.sectionTitle}>
          Additional information
        </h3>
        <nav>
          <ul>
            <li>
              <Link to="cast">Cast</Link>
            </li>
            <li>
              <Link to="reviews">Reviews</Link>
            </li>
          </ul>
        </nav>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
}
