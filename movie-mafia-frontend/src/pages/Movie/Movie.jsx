import { useEffect, useState } from "react";
import { getMovies } from "../../services/movieService";
import { Link, useSearchParams } from "react-router-dom";

function Movie() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);

      try {
        const response = await getMovies(search);
        setMovies(response);
      } catch (error) {
        console.log(error);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [search]);

  return (
    <>
      {loading && <p>Loading...</p>}

      {!loading && movies.length === 0 && (
        <p>
          {search
            ? `No movies found for "${search}"`
            : "No Movies Found ...."}
        </p>
      )}

      {!loading &&
        movies.map((movie) => (
          <div key={movie._id}>
            <Link to={`/movies/${movie._id}`}>
              <h2>{movie.title}</h2>
              <h2>{movie.genre}</h2>
              <h2>{movie.rating}</h2>
              <h2>{movie.releaseYear}</h2>
            </Link>
          </div>
        ))}
    </>
  );
}

export default Movie;