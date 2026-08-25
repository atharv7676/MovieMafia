import { useEffect, useState } from "react";
import { getMovies } from "../../services/movieService";
import Hero from "@/components/Hero";
import MovieSection from "@/components/MovieSection/MovieSection";

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
      <div className="mx-auto w-full max-w-6xl px-4 pb-10">
        <MovieSection title="More Movies" movies={movies} />
      </div>
    </>
  );
}

export default Home;
