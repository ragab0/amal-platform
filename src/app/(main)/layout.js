import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import Loading from "./loading";

export default function MainLayout({ children, className = "" }) {
  return (
    <div className="bg-white">
      <div className="wrapper min-h-screen flex flex-col mb-[200px]">
        <Navbar />
        <main className={`bg-inherit flex-1 h-full relative ${className}`}>
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
}
