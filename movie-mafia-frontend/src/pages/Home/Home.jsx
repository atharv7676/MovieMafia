import { useEffect, useState } from "react";
import { getMovies } from "../../services/movieService";
import Hero from "@/components/Hero";
import MovieSection from "@/components/MovieSection/MovieSection";

const genres = [
  "Action",
  "Adventure",
  "Animation",
  "Comedy",
  "Crime",
  "Drama",
  "Fantasy",
  "Horror",
  "Mystery",
  "Romance",
  "Sci-Fi",
  "Thriller",
];

function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await getMovies();
        setMovies(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <>
      <Hero />

      <main className="mx-auto w-full max-w-6xl px-4 pb-10">
        {genres.map((genre) => {
          const genreMovies = movies.filter((movie) =>
            movie.genre?.includes(genre)
          );

          return (
            <MovieSection
              key={genre}
              title={genre}
              movies={genreMovies}
            />
          );
        })}
      </main>
    </>
  );
}

export default Home;