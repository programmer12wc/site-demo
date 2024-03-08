import Hero from "@/components/Hero";
import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import Topdownloads from "@/components/top-downloads/top-downloads";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Topdownloads />
      <Footer />
    </>
  );
}
