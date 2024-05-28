import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3";

const options = {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YWExNDdjN2ZiMmU4Njc1MDBhMzJhNTY1Y2I5MmEwOCIsInN1YiI6IjY2NTBlMTJjZmM4MTUwMjBmYTkwNWRiOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6hRtI1Xfco5STtMIIF8dSHqgmPyBY6IAFIxrM71eDZ8",
  },
};

export const fetchTrendingMovies = async () => {
  const response = await axios.get(
    "/trending/movie/day",
    options
  );
  return response.data;
};

export const fetchSearchMovies = async (query) => {
  const response = await axios.get(
    `/search/movie?include_adult=false&language=en-US&page=1`,
    {
      ...options,
      params: { query },
    }
  );
  return response.data;
};

export const fetchMovieDetails = async (movieId) => {
  const response = await axios.get(
    `/movie/${movieId}?language=en-US`,
    options
  );
  return response.data;
};

export const fetchMoviesCredits = async (movieId) => {
  const response = await axios.get(
    `/movie/${movieId}/credits?language=en-US`,
    options
  );
  return response.data;
};

export const fetchMoviesReviews = async (movieId) => {
  const response = await axios.get(
    `/movie/${movieId}/reviews?language=en-US&page=1`,
    options
  );
  return response.data;
};
