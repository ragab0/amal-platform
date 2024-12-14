"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import PersonalDetails from "@/assets/icons/sidebar/PersonalDetailsIcon";
import Experience from "@/assets/icons/sidebar/ExperienceIcon";
import Skills from "@/assets/icons/sidebar/SkillsIcon";
import Education from "@/assets/icons/sidebar/EducationIcon";
import About from "@/assets/icons/sidebar/AboutIcon";
import References from "@/assets/icons/sidebar/ReferencesIcon";

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
            <Icon className="w-6 h-6" />
            <span className="text-lg font-medium">{item.name}</span>
            {isActive && (
              <div className="w-2 h-2 ml-auto rounded-full bg-main" />
            )}
          </Link>
        );
      })}

      {/* Customize CV Link */}
      <Link
        href="/customize"
        className="flex items-center gap-4 p-4 rounded-lg transition-colors mt-8 text-white hover:bg-white/10 border-t border-white/20 pt-8"
      >
        {/* <Icons.Template className="w-6 h-6" /> */}
        <span className="text-lg font-medium">تخصيص السيرة الذاتية</span>
      </Link>
    </nav>
  );
}
