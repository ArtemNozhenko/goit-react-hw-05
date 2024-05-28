import {
  useState,
  useEffect,
  Suspense,
  useRef,
} from "react";
import { fetchMovieDetails } from "../movies-api";
import {
  Link,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import Loader from "../components/Loader/Loader";

export default function MovieDetailsPage() {
  const [movieDetails, setMovieDetails] = useState({});
  const { movieId } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();
  const backLinkRef = useRef(location.state ?? "/");

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        setIsLoading(true);
        const date = await fetchMovieDetails(movieId);
        setMovieDetails(date);
      } catch {
        console.log("error!");
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
    "<https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg>";
  const votePercentage = (vote_average * 10).toFixed(1);

  return (
    <div>
      <p>
        <b>
          <Link to={backLinkRef.current}>Go back</Link>
        </b>
      </p>
      {isLoading && <Loader />}
      <div>
        <img
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w500/${poster_path}`
              : defaultImg
          }
          width={250}
          alt="poster"
        />
        <div>
          <h2>{original_title}</h2>
          <p>User Score {votePercentage}%</p>
          <h3>Overview</h3>
          <p>{overview}</p>
          <h3>Genres</h3>
          <ul>
            {genres &&
              genres.length > 0 &&
              genres.map(({ id, name }) => (
                <li key={id}>{name}</li>
              ))}
          </ul>
        </div>
      </div>
      <div>
        <h3>Additional information</h3>
        <nav>
          <ul>
            <li>
              <Link to={"cast"}>Cast</Link>
            </li>
            <li>
              <Link to={"reviews"}>Reviews</Link>
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
