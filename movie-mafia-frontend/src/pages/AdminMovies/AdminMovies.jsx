import { useState } from "react";
import { createMovie, deleteMovie } from "../../services/movieService";
import { Link } from "react-router-dom";
import {
  Plus,
  Trash2,
  Pencil,
  Upload,
  Film,
  ExternalLink,
} from "lucide-react";

function AdminMovies() {
  const [poster, setPoster] = useState(null);
  const [movies, setMovies] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    releaseYear: "",
    genre: "",
    duration: "",
    director: "",
    rating: "",
    language: "",
    cast: "",
    watchOptions: [
      {
        platform: "",
        url: "",
        type: "subscription",
      },
    ],
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleWatchOptionChange = (index, field, value) => {
    const updatedOptions = [...formData.watchOptions];

    updatedOptions[index] = {
      ...updatedOptions[index],
      [field]: value,
    };

    setFormData({
      ...formData,
      watchOptions: updatedOptions,
    });
  };

  const addWatchOption = () => {
    setFormData({
      ...formData,
      watchOptions: [
        ...formData.watchOptions,
        {
          platform: "",
          url: "",
          type: "subscription",
        },
      ],
    });
  };

  const removeWatchOption = (index) => {
    const updatedOptions = formData.watchOptions.filter(
      (_, i) => i !== index
    );

    setFormData({
      ...formData,
      watchOptions: updatedOptions,
    });
  };

  const handlePosterChange = (e) => {
    setPoster(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("releaseYear", formData.releaseYear);
      data.append("genre", formData.genre);
      data.append("duration", formData.duration);
      data.append("director", formData.director);
      data.append("rating", formData.rating);
      data.append("language", formData.language);
      data.append("cast", formData.cast);

      data.append(
        "watchOptions",
        JSON.stringify(formData.watchOptions)
      );

      data.append("poster", poster);

      const response = await createMovie(data);

      setMovies((prev) => [...prev, response.data]);

      setFormData({
        title: "",
        description: "",
        releaseYear: "",
        genre: "",
        duration: "",
        director: "",
        rating: "",
        language: "",
        cast: "",
        watchOptions: [
          {
            platform: "",
            url: "",
            type: "subscription",
          },
        ],
      });

      setPoster(null);

      alert("Movie created successfully!");
    } catch (error) {
      console.error("Movie creation failed:", error);
      alert(
        error.response?.data?.message ||
          "Failed to create movie"
      );
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteMovie(id);

      setMovies((prev) =>
        prev.filter((movie) => movie._id !== id)
      );
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return (
    <div className="min-h-screen px-4 pb-16 pt-28 text-white sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-10">
          <div className="mb-2 flex items-center gap-3">
            <div className="rounded-xl bg-white/10 p-3">
              <Film size={26} />
            </div>

            <div>
              <h1 className="text-3xl font-bold sm:text-4xl">
                Movie Management
              </h1>

              <p className="mt-1 text-sm text-white/50">
                Create and manage movies in Movie Mafia.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">

          {/* Create Movie */}
          <section className="rounded-3xl border border-white/10 bg-black/30 p-5 shadow-2xl backdrop-blur-md sm:p-7">

            <div className="mb-7 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">
                  Create Movie
                </h2>

                <p className="text-sm text-white/40">
                  Add a new movie to your collection.
                </p>
              </div>

              <Plus size={22} className="text-white/50" />
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* Title */}
              <div>
                <label className="mb-2 block text-sm text-white/70">
                  Movie Title
                </label>

                <input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter movie title"
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none transition focus:border-white/30"
                />
              </div>

              {/* Description */}
              <div>
                <label className="mb-2 block text-sm text-white/70">
                  Description
                </label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter movie description"
                  rows={4}
                  required
                  className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none transition focus:border-white/30"
                />
              </div>

              {/* Year / Duration / Rating */}
              <div className="grid gap-4 sm:grid-cols-3">

                <input
                  name="releaseYear"
                  value={formData.releaseYear}
                  onChange={handleChange}
                  placeholder="Release Year"
                  type="number"
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-white/30"
                />

                <input
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="Duration (min)"
                  type="number"
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-white/30"
                />

                <input
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  placeholder="Rating"
                  type="number"
                  step="0.1"
                  min="0"
                  max="10"
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-white/30"
                />

              </div>

              {/* Genre */}
              <input
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                placeholder="Genre (e.g. Action, Drama)"
                required
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-white/30"
              />

              {/* Director / Language */}
              <div className="grid gap-4 sm:grid-cols-2">

                <input
                  name="director"
                  value={formData.director}
                  onChange={handleChange}
                  placeholder="Director"
                  required
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-white/30"
                />

                <input
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                  placeholder="Language"
                  required
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-white/30"
                />

              </div>

              {/* Cast */}
              <input
                name="cast"
                value={formData.cast}
                onChange={handleChange}
                placeholder="Cast (e.g. Actor 1, Actor 2)"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-white/30"
              />

              {/* Poster */}
              <div className="rounded-2xl border border-dashed border-white/20 bg-white/3 p-5">

                <div className="mb-3 flex items-center gap-3">
                  <Upload size={20} />

                  <div>
                    <p className="font-medium">
                      Movie Poster
                    </p>

                    <p className="text-xs text-white/40">
                      Upload JPG, PNG or WEBP
                    </p>
                  </div>
                </div>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePosterChange}
                  required
                  className="w-full cursor-pointer text-sm text-white/60"
                />

                {poster && (
                  <p className="mt-3 truncate text-xs text-white/50">
                    Selected: {poster.name}
                  </p>
                )}
              </div>

              {/* Watch Options */}
              <div className="rounded-2xl border border-white/10 bg-white/3 p-5">

                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">
                      Watch Options
                    </h3>

                    <p className="text-xs text-white/40">
                      Where can users watch this movie?
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={addWatchOption}
                    className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs transition hover:bg-white/10"
                  >
                    + Add
                  </button>
                </div>

                <div className="space-y-4">

                  {formData.watchOptions.map(
                    (option, index) => (
                      <div
                        key={index}
                        className="rounded-xl border border-white/10 bg-black/20 p-4"
                      >

                        <div className="grid gap-3 sm:grid-cols-2">

                          <input
                            value={option.platform}
                            onChange={(e) =>
                              handleWatchOptionChange(
                                index,
                                "platform",
                                e.target.value
                              )
                            }
                            placeholder="Platform (Netflix)"
                            className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:border-white/30"
                          />

                          <select
                            value={option.type}
                            onChange={(e) =>
                              handleWatchOptionChange(
                                index,
                                "type",
                                e.target.value
                              )
                            }
                            className="rounded-lg border border-white/10 bg-black px-3 py-2 text-sm outline-none"
                          >
                            <option value="subscription">
                              Subscription
                            </option>
                            <option value="rent">
                              Rent
                            </option>
                            <option value="buy">
                              Buy
                            </option>
                            <option value="free">
                              Free
                            </option>
                          </select>

                        </div>

                        <div className="mt-3 flex gap-2">

                          <input
                            value={option.url}
                            onChange={(e) =>
                              handleWatchOptionChange(
                                index,
                                "url",
                                e.target.value
                              )
                            }
                            placeholder="https://..."
                            className="min-w-0 flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:border-white/30"
                          />

                          {formData.watchOptions.length >
                            1 && (
                            <button
                              type="button"
                              onClick={() =>
                                removeWatchOption(index)
                              }
                              className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 text-red-400 transition hover:bg-red-500/20"
                            >
                              <Trash2 size={16} />
                            </button>
                          )}

                        </div>

                      </div>
                    )
                  )}

                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-black transition hover:scale-[0.99] hover:bg-white/90 active:scale-95"
              >
                <Plus size={18} />
                Create Movie
              </button>

            </form>
          </section>

          {/* Movie List */}
          <section className="rounded-3xl border border-white/10 bg-black/30 p-5 shadow-2xl backdrop-blur-md sm:p-7">

            <div className="mb-6">
              <h2 className="text-xl font-bold">
                Movies
              </h2>

              <p className="text-sm text-white/40">
                Manage your movie collection.
              </p>
            </div>

            {movies.length === 0 ? (
              <div className="flex min-h-75 flex-col items-center justify-center text-center">

                <Film
                  size={42}
                  className="mb-4 text-white/20"
                />

                <p className="font-medium text-white/60">
                  No movies created yet
                </p>

                <p className="mt-1 text-sm text-white/30">
                  Create your first movie using the form.
                </p>

              </div>
            ) : (
              <div className="space-y-3">

                {movies.map((movie) => (
                  <div
                    key={movie._id}
                    className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/3 p-4"
                  >

                    <div className="min-w-0">
                      <p className="truncate font-medium">
                        {movie.title}
                      </p>

                      <p className="text-xs text-white/40">
                        {movie.releaseYear}
                      </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-2">

                      <Link
                        to={`/admin/movies/edit/${movie._id}`}
                        className="rounded-lg border border-white/10 p-2 text-white/60 transition hover:bg-white/10 hover:text-white"
                      >
                        <Pencil size={16} />
                      </Link>

                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(movie._id)
                        }
                        className="rounded-lg border border-red-500/20 p-2 text-red-400 transition hover:bg-red-500/10"
                      >
                        <Trash2 size={16} />
                      </button>

                    </div>

                  </div>
                ))}

              </div>
            )}

          </section>

        </div>
      </div>
    </div>
  );
}

export default AdminMovies;

