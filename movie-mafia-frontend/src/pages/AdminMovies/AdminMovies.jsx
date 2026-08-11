import { useState } from "react";
import { createMovie, deleteMovie } from "../../services/movieService";
import { Link, useParams } from "react-router-dom";

function AdminMovies() {

  const {id} = useParams();

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
  });

  const handlePosterChange = (e) => {
    setPoster(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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

    data.append("poster", poster);

    await createMovie(data);
  };

  const handleDelete = async (id) => {
    await deleteMovie(id);
    const updatedMovies = movies.filter((movie) => movie._id !== id);
    setMovies(updatedMovies);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          name="file"
          onChange={handlePosterChange}
          accept="image/*"
        />

        <button type="submit">Create Movie</button>
      </form>

      {movies.map((movie) => {
        return (
          <div id={movie._id}>
            <p>{movie.title}</p>
            <Link to={`/admin/movies/edit/${movie._id}`}>Edit</Link>
            <button onClick={() => handleDelete(movie._id)}>Delete</button>
          </div>
        );
      })}
    </>
  );
}

export default AdminMovies;
