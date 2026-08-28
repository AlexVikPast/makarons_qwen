import { Header, Hero, About, MenuSection } from "./sections";
import { Gallery, Reviews, Events, Booking, Footer } from "./sections2";

export default function App() {
  return (
    <div className="relative">
      <div className="noise-layer" aria-hidden="true" />
      <Header />
      <main>
        <Hero />
        <About />
        <MenuSection />
        <Gallery />
        <Reviews />
        <Events />
        <Booking />
      </main>
      <Footer />
    </div>
  );
}
