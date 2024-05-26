import { useState, useEffect } from "react";
import { fetchMovieDetails } from "../movies-api";
import { useParams } from "react-router-dom";

export default function MovieDetailsPage() {
  const [movieDetails, setMovieDetails] = useState({});
  const { movieId } = useParams();

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const date = await fetchMovieDetails(movieId);
        setMovieDetails(date);
        console.log(date);
      } catch {
        console.log("error!");
      }
    };
    getMovieDetails;
  }, [movieId]);

  console.log(movieDetails);

  return;
}
