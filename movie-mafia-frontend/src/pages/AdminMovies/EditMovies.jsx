import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieById, updateMovie } from "../../services/movieService";

function EditMovies() {
  const [formData, setFormData] = useState();
  const { id } = useParams();
  const [poster, setPoster] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await getMovieById(id);
        setFormData(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMovie();
  }, [id]);

  if (!formData) {
    return <p>Loading....</p>;
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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

    if (poster) {
      data.append("poster", poster);
    }
    await updateMovie(id, data);
  };

  const handlePosterChange = (e) => {
    setPoster(e.target.files[0]);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter movie title"
        />

        <input
          name="releaseYear"
          value={formData.releaseYear}
          onChange={handleChange}
          placeholder="Enter release year"
        />

        <input
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter movie description"
        />

        <input
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          placeholder="Enter movie genre"
        />

        <input
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          placeholder="Enter movie duration"
        />

        <input
          name="director"
          value={formData.director}
          onChange={handleChange}
          placeholder="Enter director name"
        />

        <input
          name="rating"
          value={formData.rating}
          onChange={handleChange}
          placeholder="Enter IMDb rating"
        />

        <input
          name="language"
          value={formData.language}
          onChange={handleChange}
          placeholder="Enter movie language"
        />

        <input
          name="cast"
          value={formData.cast}
          onChange={handleChange}
          placeholder="Enter cast members"
        />

        <input type="file" accept="image/*" onChange={handlePosterChange} />

        <button type="submit">Update Movie</button>
      </form>
    </>
  );
}

export default EditMovies;
