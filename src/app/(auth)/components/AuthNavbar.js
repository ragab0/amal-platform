import Logo from "@/components/logo/Logo";
import Link from "next/link";

export default function AuthNavbar() {
  return (
    <nav className="bg-main">
      <div className="container mx-auto flex justify-between items-center py-6 md:py-10 px-6">
        <Logo />
        <div className="flex gap-4 md:gap-8">
          <Link
            href="/"
            className="text-white py-3 hover:underline text-lg md:text-2xl"
          >
            الرئيسية
          </Link>
          {/* <Link
            href="/contact"
            className="text-white py-3 hover:underline text-lg md:text-2xl"
          >
            تواصل معنا
          </Link> */}
        </div>
      </div>
    </nav>
  );
}
