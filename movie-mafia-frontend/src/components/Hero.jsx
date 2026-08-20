import axios from "axios";
import { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner";

const Hero = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch movies and select initial carousel movie
  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await axios.get("http://localhost:3000/movies");

        const movieList = response.data.data;

        setMovies(movieList);

        const inceptionIndex = movieList.findIndex(
          (movie) => movie.title === "Inception",
        );

        const index = inceptionIndex >= 0 ? inceptionIndex : 0;

        setCurrentIndex(index);
        setSelectedMovie(movieList[index]);
      } catch (error) {
        console.log("Movie fetch error:", error);
      }
    };

    getMovies();
  }, []);

  // Automatically change movies every six seconds
  useEffect(() => {
    if (!movies.length) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % movies.length;

        setSelectedMovie(movies[nextIndex]);

        return nextIndex;
      });
    }, 6000);

    return () => clearInterval(interval);
  }, [movies]);

  // Change carousel movie using navigation arrows
  const changeMovie = (direction) => {
    if (!movies.length) return;

    let newIndex = currentIndex + direction;

    if (newIndex < 0) {
      newIndex = movies.length - 1;
    }

    if (newIndex >= movies.length) {
      newIndex = 0;
    }

    setCurrentIndex(newIndex);
    setSelectedMovie(movies[newIndex]);
  };

  // Display spinner while movie data loads
  if (!selectedMovie) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center">
        <Spinner />
      </section>
    );
  }

  // Prepare additional movies excluding selected movie
  const otherMovies = movies
    .filter((movie) => movie._id !== selectedMovie._id)
    .slice(0, 7);

  return (
    <section className="w-full px-4 py-6 sm:px-6 lg:px-8">

      {/* Main hero section displays selected movie */}
      <div
        className="
          relative mx-auto
          w-full max-w-6xl
          overflow-hidden
          rounded-[2rem]
          border border-white/10
          bg-black/40
          shadow-2xl
          min-h-[620px]
          sm:min-h-[650px]
          md:min-h-[600px]
          lg:h-[58vh]
          lg:min-h-[500px]
          lg:max-h-[600px]
        "
      >
        <div
          className="
            relative z-10
            flex h-full
            flex-col
            items-center
            justify-center
            gap-6
            p-6
            sm:p-8
            md:p-10
            lg:flex-row
            lg:gap-12
          "
        >

          {/* Previous arrow navigates carousel movies backward */}
          <button
            onClick={() => changeMovie(-1)}
            className="
              absolute left-3 top-1/2 z-30
              -translate-y-1/2
              rounded-full
              bg-black/60
              px-4 py-3
              text-2xl text-white
              backdrop-blur
              transition
              hover:bg-white/20
            "
          >
            ←
          </button>

          {/* Movie poster displays selected movie artwork */}
          <div
            className="
              shrink-0
              w-[190px]
              h-[285px]
              sm:w-[210px]
              sm:h-[315px]
              md:w-[230px]
              md:h-[345px]
              lg:w-[250px]
              lg:h-[375px]
            "
          >
            <img
              src={selectedMovie.poster?.url}
              alt={selectedMovie.title}
              className="
                h-full
                w-full
                rounded-2xl
                object-cover
                shadow-2xl
              "
            />
          </div>

          {/* Movie information displays important details */}
          <div
            className="
              flex
              w-full
              max-w-2xl
              flex-col
              justify-center
              text-center
              lg:text-left
            "
          >

            {/* Movie title displays selected movie name */}
            <h1
              className="
                text-4xl
                font-black
                tracking-tight
                text-white
                sm:text-5xl
                md:text-6xl
              "
            >
              {selectedMovie.title}
            </h1>

            {/* Basic movie details show rating and metadata */}
            <div
              className="
                mt-4
                flex
                flex-wrap
                justify-center
                gap-3
                text-sm
                text-gray-300
                lg:justify-start
              "
            >
              <span>⭐ {selectedMovie.rating ?? "N/A"}</span>
              <span>•</span>
              <span>{selectedMovie.releaseYear}</span>
              <span>•</span>
              <span>{selectedMovie.language}</span>
              <span>•</span>
              <span>{selectedMovie.duration} min</span>
            </div>

            {/* Genre badges display available movie categories */}
            <div
              className="
                mt-4
                flex
                flex-wrap
                justify-center
                gap-2
                lg:justify-start
              "
            >
              {selectedMovie.genre?.map((genre) => (
                <span
                  key={genre}
                  className="
                    rounded-full
                    bg-white/10
                    px-3
                    py-1
                    text-xs
                    font-semibold
                    text-gray-200
                  "
                >
                  {genre}
                </span>
              ))}
            </div>

            {/* Movie description provides a short overview */}
            <p
              className="
                mt-5
                line-clamp-4
                text-sm
                leading-6
                text-gray-300
                sm:text-base
              "
            >
              {selectedMovie.description}
            </p>

            {/* Director information identifies movie director */}
            <p className="mt-4 text-sm text-gray-400">
              Director:
              <span className="ml-2 font-semibold text-white">
                {selectedMovie.director}
              </span>
            </p>

            {/* Watch links provide available streaming options */}
            <div
              className="
                mt-6
                flex
                flex-wrap
                justify-center
                gap-3
                lg:justify-start
              "
            >
              {selectedMovie.watchOptions?.map((option, index) => (
                <a
                  key={`${option.platform}-${index}`}
                  href={option.url}
                  target="_blank"
                  rel="noreferrer"
                  className="
                    rounded-lg
                    bg-white
                    px-4
                    py-2
                    text-sm
                    font-bold
                    text-black
                    transition
                    hover:scale-105
                  "
                >
                  {option.type === "subscription"
                    ? `Watch on ${option.platform}`
                    : `${option.type} on ${option.platform}`}
                </a>
              ))}
            </div>
          </div>

          {/* Next arrow navigates carousel movies forward */}
          <button
            onClick={() => changeMovie(1)}
            className="
              absolute right-3 top-1/2 z-30
              -translate-y-1/2
              rounded-full
              bg-black/60
              px-4 py-3
              text-2xl text-white
              backdrop-blur
              transition
              hover:bg-white/20
            "
          >
            →
          </button>
        </div>
      </div>

      {/* Additional movies provide quick carousel selection */}
      <div className="mx-auto mt-8 w-full max-w-6xl">
        <h2 className="mb-4 text-xl font-bold text-white">
          More Movies
        </h2>

        <div
          className="
            grid
            grid-cols-2
            gap-4
            sm:grid-cols-3
            md:grid-cols-4
            lg:grid-cols-7
          "
        >
          {otherMovies.map((movie) => (
            <button
              key={movie._id}
              onClick={() => {
                const index = movies.findIndex(
                  (item) => item._id === movie._id,
                );

                setCurrentIndex(index);
                setSelectedMovie(movie);
              }}
              className="group text-left"
            >

              {/* Movie poster provides clickable selection */}
              <div className="overflow-hidden rounded-xl">
                <img
                  src={movie.poster?.url}
                  alt={movie.title}
                  className="
                    aspect-2/3
                    w-full
                    object-cover
                    transition
                    duration-300
                    group-hover:scale-105
                  "
                />
              </div>

              {/* Movie name identifies each carousel option */}
              <p
                className="
                  mt-2
                  truncate
                  text-sm
                  font-semibold
                  text-white
                "
              >
                {movie.title}
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;