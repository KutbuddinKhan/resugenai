import { FeatureCards } from "./_components/FeatureCards";
import { Footer } from "./_components/Footer";
import { Header } from "./_components/Header";
import { Hero } from "./_components/Hero";
import { ImageSection } from "./_components/ImageSection";


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Hero />
        <ImageSection />
        <FeatureCards />
      </main>
      <Footer />
    </div>
  )
}

