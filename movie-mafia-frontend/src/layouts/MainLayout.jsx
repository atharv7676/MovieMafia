import { StarsBackground } from "@/components/animate-ui/components/backgrounds/stars";
import Navbar from "@/components/Navbar/Navbar";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <StarsBackground className="min-h-screen">
      <Navbar />

      <main className="pt-24">
        <Outlet />
      </main>
    </StarsBackground>
  );
}

export default MainLayout;