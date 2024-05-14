import About from "@/components/about";
import Banner from "@/components/banner";
import Card from "@/components/card";
import Footer from "@/components/footer";
import HomeNavbar from "@/components/landingNavbar";

//! INI JADI HALAMAN ATAU ROUTE /
export default function Home() {
  return (
    <div>
      <HomeNavbar />
      <Banner />
      <Card />
      <About />
      <Footer />
    </div>
  );
}
