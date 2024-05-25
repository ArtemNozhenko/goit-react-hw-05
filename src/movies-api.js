import axios from "axios";

const url =
  "https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1";

const options = {
  headers: {
    Authorization:
      "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YWExNDdjN2ZiMmU4Njc1MDBhMzJhNTY1Y2I5MmEwOCIsInN1YiI6IjY2NTBlMTJjZmM4MTUwMjBmYTkwNWRiOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6hRtI1Xfco5STtMIIF8dSHqgmPyBY6IAFIxrM71eDZ8",
  },
};

axios
  .get(url, options)
  .then((response) => console.log(response))
  .catch((err) => console.error(err));
