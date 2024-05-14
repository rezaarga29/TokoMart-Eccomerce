import Footer from "@/components/footer";
import HomeNavbar from "@/components/landingNavbar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div style={{ minHeight: "100vh", position: "relative" }}>
      <HomeNavbar />
      <div style={{ paddingTop: "7rem", paddingBottom: "7rem" }}>
        {children}
      </div>
      <Footer />
    </div>
  );
}
