import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ShieldAlert } from "lucide-react";

function AdminRoute() {
  const { user, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== "admin") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black px-4 text-white">
        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 text-center shadow-2xl backdrop-blur-xl">
          <div className="mb-5 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10">
              <ShieldAlert className="text-red-500" size={32} />
            </div>
          </div>

          <h1 className="mb-2 text-2xl font-bold">
            Access Denied
          </h1>

          <p className="mb-6 text-sm text-white/60">
            You can't access this page because you don't have admin privileges.
          </p>

          <button
            onClick={() => navigate("/")}
            className="w-full rounded-xl bg-white px-4 py-3 font-semibold text-black transition hover:bg-white/90 active:scale-95"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return <Outlet />;
}

export default AdminRoute;

