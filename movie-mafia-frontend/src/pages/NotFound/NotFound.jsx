import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import { StarsBackground } from "@/components/animate-ui/components/backgrounds/stars";

function NotFound() {
  return (
    <StarsBackground className="min-h-screen" pointerEvents={false}>
      <main className="flex min-h-screen flex-col items-center justify-center px-4 text-center text-white">
        <p className="text-sm font-semibold uppercase tracking-widest text-white/40">
          404
        </p>

        <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
          Page not found
        </h1>

        <p className="mt-4 max-w-md text-white/60">
          The page you're looking for doesn't exist or may have been moved.
        </p>

        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-black transition hover:scale-105 hover:bg-white/90"
        >
          <Home size={18} />
          Back to Home
        </Link>
      </main>
    </StarsBackground>
  );
}

export default NotFound;