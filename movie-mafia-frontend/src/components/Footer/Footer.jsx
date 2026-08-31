import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10 bg-black/30 text-white">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        {/* Main Footer */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link to="/" className="text-2xl font-black tracking-tight">
              Movie<span className="text-white/50">Mafia</span>
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-6 text-white/50">
              Discover movies, explore genres, and find out where to watch your
              next favorite film.
            </p>

            {/* Social Links */}
            <div className="mt-5 flex items-center gap-3">
              <a
                href="https://github.com/atharv7676/MovieMafia"
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-white/10 bg-white/5 p-2.5 text-white/60 transition hover:bg-white/10 hover:text-white"
                aria-label="GitHub"
              >
                <FaGithub size={18} />
              </a>

              <a
                href="https://www.instagram.com/atharv_morabale?igsi=MXg2a3N4bWY2cDI4bg=="
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-white/10 bg-white/5 p-2.5 text-white/60 transition hover:bg-white/10 hover:text-white"
                aria-label="Instagram"
              >
                <FaInstagram size={18} />
              </a>

              <a
                href="https://www.linkedin.com/in/atharv-morabale-15b9a9264/"
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-white/10 bg-white/5 p-2.5 text-white/60 transition hover:bg-white/10 hover:text-white"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={18} />
              </a>

              <a
                href="mailto:contact@moviemafia.com"
                className="rounded-lg border border-white/10 bg-white/5 p-2.5 text-white/60 transition hover:bg-white/10 hover:text-white"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-sm font-semibold text-white">Explore</h3>

            <ul className="mt-4 space-y-3 text-sm text-white/50">
              <li>
                <Link to="/" className="transition hover:text-white">
                  Home
                </Link>
              </li>

              <li>
                <Link to="/movies" className="transition hover:text-white">
                  Movies
                </Link>
              </li>

              <li>
                <Link to="/wishlist" className="transition hover:text-white">
                  Wishlist
                </Link>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-sm font-semibold text-white">Account</h3>

            <ul className="mt-4 space-y-3 text-sm text-white/50">
              <li>
                <Link to="/profile" className="transition hover:text-white">
                  Profile
                </Link>
              </li>

              <li>
                <Link to="/login" className="transition hover:text-white">
                  Login
                </Link>
              </li>

              <li>
                <Link to="/register" className="transition hover:text-white">
                  Create Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h3 className="text-sm font-semibold text-white">Movie Mafia</h3>

            <ul className="mt-4 space-y-3 text-sm text-white/50">
              <li>
                <a href="#" className="transition hover:text-white">
                  About
                </a>
              </li>

              <li>
                <a href="#" className="transition hover:text-white">
                  Privacy Policy
                </a>
              </li>

              <li>
                <a href="#" className="transition hover:text-white">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Movie Mafia. All rights reserved.</p>

          <p>Made for movie lovers.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
