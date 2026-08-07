import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Movie from "../pages/Movie/Movie";
import MovieDetials from "../pages/MovieDetails/MovieDetails";
import Profile from "../pages/Profile/Profile";
import Register from "../pages/Register/Register";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard/Dashboard";


function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />

        <Route path="/movie/:id" element={<MovieDetails />} />

        <Route path="/movies" element={<Movie />} />

        <Route path="/profile" element={<Profile />} />
      </Route>

      <Route
        path="/admin/*"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route index element={<Dashboard />} />

        <Route path="movies" element={<AdminMovies />} />

        <Route path="users" element={<Users />} />
      </Route>


    </Routes>
  );
}

export default AppRoutes;
