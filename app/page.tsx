import Navbar from "@/component/Navbar";
import { Hero, Services, Work, Expertise, GitHub, Contact, Footer} from "@/component/sections" 

export default function Home() {
  return (
    <div className="min-h-screen bg-[#09090a] text-zinc-300">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Work />
        <Expertise />
        <GitHub />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}