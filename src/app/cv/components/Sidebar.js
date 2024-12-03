"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import PersonalDetails from "@/assets/icons/sidebar/PersonalDetails";
import Experience from "@/assets/icons/sidebar/Experience";
import Skills from "@/assets/icons/sidebar/Skills";
import Education from "@/assets/icons/sidebar/Education";
import About from "@/assets/icons/sidebar/About";
import References from "@/assets/icons/sidebar/References";

// import the icons in client-side and text on the server-side for better SEO;
const icons = {
  PersonalDetails,
  Experience,
  Skills,
  Education,
  About,
  References,
};

export function Sidebar({ items }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col ps-4 space-y-10">
      {items.map((item) => {
        const isActive = pathname === item.href;
        const Icon = icons[item.icon];
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`
              flex items-center gap-3 py-3 px-6 rounded-s-full transition-colors font-bold text-2xl
              ${
                isActive ? "bg-white text-main" : "text-white hover:bg-white/10"
              }
            `}
          >
            <Icon />
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
}
