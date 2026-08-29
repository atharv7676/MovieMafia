import { Link } from "react-router-dom";
import {
  Film,
  Plus,
  Settings,
  Users,
  Heart,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

function Dashboard() {
  return (
    <div className="min-h-screen px-4 pb-12 pt-28 sm:px-6 lg:px-10">
      {/* Header */}
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 rounded-3xl border border-white/10 bg-black/30 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2 text-white/50">
                <ShieldCheck size={18} />
                <span className="text-sm font-medium">Admin Panel</span>
              </div>

              <h1 className="text-3xl font-bold text-white sm:text-4xl">
                Admin Dashboard
              </h1>

              <p className="mt-2 text-sm text-white/50 sm:text-base">
                Manage your Movie Mafia platform from here.
              </p>
            </div>

            <Link
              to="/admin/movies"
              className="flex w-fit items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition-all duration-200 hover:scale-95 hover:bg-white/90"
            >
              <Plus size={18} />
              Add Movie
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
            <Film className="mb-4 text-white/70" size={24} />
            <p className="text-sm text-white/50">Total Movies</p>
            <h2 className="mt-1 text-3xl font-bold text-white">—</h2>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
            <Users className="mb-4 text-white/70" size={24} />
            <p className="text-sm text-white/50">Users</p>
            <h2 className="mt-1 text-3xl font-bold text-white">—</h2>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
            <Heart className="mb-4 text-red-400" size={24} />
            <p className="text-sm text-white/50">Wishlist Activity</p>
            <h2 className="mt-1 text-3xl font-bold text-white">—</h2>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
            <Settings className="mb-4 text-white/70" size={24} />
            <p className="text-sm text-white/50">Platform Status</p>
            <h2 className="mt-1 text-lg font-bold text-green-400">
              Operational
            </h2>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="mb-4 text-xl font-bold text-white">
            Quick Actions
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Link
              to="/admin/movies"
              className="group rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-200 hover:bg-white/10"
            >
              <div className="flex items-center justify-between">
                <div>
                  <Film className="mb-4 text-white/70" size={28} />
                  <h3 className="text-lg font-semibold text-white">
                    Manage Movies
                  </h3>
                  <p className="mt-1 text-sm text-white/50">
                    Create, edit and delete movies.
                  </p>
                </div>

                <ArrowRight
                  className="text-white/40 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-white"
                  size={22}
                />
              </div>
            </Link>

            <Link
              to="/admin/movies"
              className="group rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-200 hover:bg-white/10"
            >
              <div className="flex items-center justify-between">
                <div>
                  <Plus className="mb-4 text-white/70" size={28} />
                  <h3 className="text-lg font-semibold text-white">
                    Create Movie
                  </h3>
                  <p className="mt-1 text-sm text-white/50">
                    Add a new movie to Movie Mafia.
                  </p>
                </div>

                <ArrowRight
                  className="text-white/40 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-white"
                  size={22}
                />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;