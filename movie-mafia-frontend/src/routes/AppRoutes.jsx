import { Routes, Route } from "react-router-dom";

// Layouts
import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/AdminLayout";

// Routes / Guards
import ProtectedRoute from "../routes/ProtectedRoute";
import AdminRoute from "../routes/AdminRoute";
import PublicRoute from "../routes/PublicRoute";

// Public pages
import Home from "../pages/Home/Home";
import Movie from "../pages/Movie/Movie";
import MovieDetails from "../pages/MovieDetails/MovieDetails";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";

// User pages
import Profile from "../pages/Profile/Profile";

// Admin pages
import Dashboard from "../pages/Dashboard/Dashboard";
import AdminMovies from "../pages/AdminMovies/AdminMovies";
import EditMovies from "../pages/AdminMovies/EditMovies";
import Users from "../pages/Users/Users";

function AppRoutes() {
  return (
    <Routes>
      {/* Main website */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />

        <Route path="/movie/:id" element={<MovieDetails />} />

        <Route path="/movies" element={<Movie />} />

        {/* Logged-in users only */}
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>

      {/* Login / Register */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />
      </Route>

      {/* Admin */}
      <Route path="/admin" element={<AdminRoute />}>
        <Route element={<AdminLayout />}>
          <Route index element={<Dashboard />} />

          <Route path="movies" element={<AdminMovies />} />

          <Route path="movies/edit/:id" element={<EditMovies />} />

          <Route path="users" element={<Users />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default AppRoutes;
