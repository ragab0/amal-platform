import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

export default function MainLayout({ children }) {
  return (
    <div className="bg-white">
      <div className="wrapper min-h-screen">
        <Navbar />
        <main className="bg-inherit">{children}</main>
      </div>
      <Footer />
    </div>
  );
}
