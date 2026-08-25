import { useEffect, useRef, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getMovies } from "../../services/movieService";
import { Button } from "@/components/ui/button";
import {
  House,
  Bookmark,
  UserRound,
  ShieldCheck,
  LogOutIcon,
  Search,
  LoaderCircle,
  Star,
  Menu,
  X,
  MenuIcon,
} from "lucide-react";
import movieMafiaLogo from "@/assets/movie-mafia-logo.svg";

function Navbar() {
  const { logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const searchRef = useRef(null);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch search suggestions
  useEffect(() => {
    const trimmedSearch = search.trim();

    if (!trimmedSearch) {
      setResults([]);
      setShowResults(false);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setLoading(true);

        const response = await getMovies(trimmedSearch);

        setResults(response.data.slice(0, 5));
        setShowResults(true);
      } catch (error) {
        console.error(error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  // Close dropdown outside search
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();

    const trimmedSearch = search.trim();

    if (!trimmedSearch) return;

    setShowResults(false);

    navigate(`/movies?search=${encodeURIComponent(trimmedSearch)}`);
  };

  const handleMovieClick = (movieId) => {
    setSearch("");
    setShowResults(false);

    navigate(`/movies/${movieId}`);
  };

  const navItems = [
    {
      label: "Home",
      path: "/",
      icon: House,
    },
    {
      label: "Watch Later",
      path: "/watch-later",
      icon: Bookmark,
    },
    {
      label: "Profile",
      path: "/profile",
      icon: UserRound,
    },
  ];

  if (isAdmin) {
    navItems.push({
      label: "Admin",
      path: "/admin",
      icon: ShieldCheck,
    });
  }

  return (
    <nav className="fixed left-1/2 top-4 z-50 h-16 w-[95%] -translate-x-1/2 rounded-2xl border border-white/10 bg-black/20 backdrop-blur-md md:w-[80%]">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <NavLink to="/" className="shrink-0">
          <img src={movieMafiaLogo} alt="Movie Mafia" className="h-10 w-10" />
        </NavLink>

        {/* Navigation */}
        <div className="hidden items-center gap-6 font-bold text-white lg:flex">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 transition-all duration-200 hover:scale-95 ${
                    isActive ? "text-white" : "text-white/70"
                  }`
                }
              >
                <Icon size={18} strokeWidth={1.8} />
                {item.label}
              </NavLink>
            );
          })}
        </div>

        {/* Search */}
        <div
          ref={searchRef}
          className="relative min-w-0 flex-1 md:max-w-105 lg:mx-6"
        >
          <form onSubmit={handleSearch}>
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50"
            />

            {loading && (
              <LoaderCircle
                size={17}
                className="absolute right-3 top-1/2 -translate-y-1/2 animate-spin text-white/50"
              />
            )}

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              onFocus={() => {
                if (search.trim()) {
                  setShowResults(true);
                }
              }}
              placeholder="Search movies..."
              className="h-11 w-full rounded-xl border border-white/10 bg-white/5 pl-10 pr-10 text-sm text-white outline-none placeholder:text-white/40 transition-all duration-200 focus:border-white/30 focus:bg-white/10"
            />
          </form>

          {/* Search Results */}
          {showResults && (
            <div className="absolute right-0 top-12 w-80 overflow-hidden rounded-xl border border-white/10 bg-zinc-950/95 shadow-2xl backdrop-blur-xl">
              {results.length > 0 ? (
                <>
                  <div className="border-b border-white/10 px-4 py-2 text-xs font-medium text-white/40">
                    Movies
                  </div>

                  {results.map((movie) => (
                    <button
                      key={movie._id}
                      onClick={() => handleMovieClick(movie._id)}
                      className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition-colors hover:bg-white/10"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-white">
                          {movie.title}
                        </p>

                        <p className="mt-1 text-xs text-white/50">
                          {movie.releaseYear} • {movie.genre?.join(", ")}
                        </p>
                      </div>

                      <div className="flex shrink-0 items-center gap-1 text-xs text-yellow-400">
                        <Star size={13} fill="currentColor" />
                        {movie.rating}
                      </div>
                    </button>
                  ))}

                  <button
                    onClick={() =>
                      handleSearch({
                        preventDefault: () => {},
                      })
                    }
                    className="w-full border-t border-white/10 px-4 py-3 text-left text-sm font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    View all results →
                  </button>
                </>
              ) : (
                !loading && (
                  <div className="px-4 py-6 text-center text-sm text-white/50">
                    No movies found
                  </div>
                )
              )}
            </div>
          )}
        </div>

        {/* Logout */}
        <Button
          variant="outline"
          onClick={handleLogout}
          className="hidden lg:flex shrink-0"
        >
          <LogOutIcon />
          Logout
        </Button>

        {/* Menu Buttons */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden text-white shrink-0"
        >
          {isMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
        </button>
      </div>

      {/* Mobi;e Menu */}

      {isMenuOpen && (
        <div className="absolute left-0 right-0 top-20 w-full rounded-2xl border border-white/10 bg-black/90 p-4 backdrop-blur-xl lg:hidden">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-4 py-3 transition-colors ${
                      isActive
                        ? "bg-white/10 text-white"
                        : "text-white/70 hover:bg-white/5 hover:text-white"
                    }`
                  }
                >
                  <Icon size={20} strokeWidth={1.8} />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}

            <button
              onClick={handleLogout}
              className="mt-2 flex items-center gap-3 rounded-xl px-4 py-3 text-left text-white/70 transition-colors hover:bg-red-300 hover:text-white bg-red-400"
            >
              <LogOutIcon size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
