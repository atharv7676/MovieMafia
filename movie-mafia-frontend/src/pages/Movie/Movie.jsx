import { useEffect, useState } from "react";
import getMovies from "../../services/movieService";
import { Link } from "react-router-dom";

function Movie() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await getMovies();
        console.log(response);
        setMovies(response);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <>
      <div>{loading ? "Loading..." : ""}</div>

      {movies.length === 0 ? (
        <p>No Movies Found ....</p>
      ) : (
        movies.map((movie) => (
          <div key={movie._id}>
            <Link to={`/movie/${movie._id}`}>
              <h2>{movie.title}</h2>
              <h2>{movie.genre}</h2>
              <h2>{movie.rating}</h2>
              <h2>{movie.releaseYear}</h2>
            </Link>
          </div>
        ))
      )}
    </>
  );
}

export default Movie;
