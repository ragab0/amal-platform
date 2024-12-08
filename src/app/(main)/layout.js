import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

export default function MainLayout({ children, className = "" }) {
  return (
    <div className="bg-white">
      <div className="wrapper min-h-screen mb-[200px]">
        <Navbar />
        <main className={`bg-inherit ${className}`}>{children}</main>
      </div>
      <Footer />
    </div>
  );
}
