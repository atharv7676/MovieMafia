import { useEffect, useState } from "react";
import { getMovies } from "../../services/movieService";
import { useSearchParams } from "react-router-dom";
import { MovieCard } from "@/components/MovieCard/MovieCard";

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
        setMovies(response.data);
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
    <div>
      {loading && <p>Loading...</p>}

      {!loading && movies.length === 0 && (
        <p>
          {search ? `No movies found for "${search}"` : "No Movies Found ...."}
        </p>
      )}

      {!loading && movies.length > 0 && (
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {movies.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Movie;
