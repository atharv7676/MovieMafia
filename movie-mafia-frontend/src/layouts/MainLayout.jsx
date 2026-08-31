import { StarsBackground } from "@/components/animate-ui/components/backgrounds/stars";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <StarsBackground className="min-h-screen" pointerEvents={false}>
      <Navbar />

      <main className="pt-24">
        <Outlet />
      </main>

      <Footer />
    </StarsBackground>
  );
}


export default MainLayout;