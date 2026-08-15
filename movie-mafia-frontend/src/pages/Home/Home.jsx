import { StarsBackground } from "@/components/animate-ui/components/backgrounds/stars";
import Hero from "@/components/Hero";

function Home() {
  return (
    <div className="h-screen">
      <StarsBackground>
        <div className="relative z-10 flex h-screen items-center justify-center">
          
          <Hero />



        </div>
      </StarsBackground>
    </div>
  );
}

export default Home;