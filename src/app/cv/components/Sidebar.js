"use client";
import Link from "next/link";
import PersonalDetails from "@/assets/icons/sidebar/PersonalDetailsIcon";
import Experience from "@/assets/icons/sidebar/ExperienceIcon";
import Skills from "@/assets/icons/sidebar/SkillsIcon";
import Education from "@/assets/icons/sidebar/EducationIcon";
import About from "@/assets/icons/sidebar/AboutIcon";
import References from "@/assets/icons/sidebar/ReferencesIcon";
import Logo from "@/components/logo/Logo";
import { FaCertificate } from "react-icons/fa";
import { RiOrganizationChart } from "@remixicon/react";
import { usePathname } from "next/navigation";
import {
  IoChevronBackCircle,
  IoChevronBackOutline,
  IoChevronForwardOutline,
  IoChevronUpOutline,
} from "react-icons/io5";
import { useState } from "react";

// import the icons in client-side and text on the server-side for better SEO;
const icons = {
  PersonalDetails,
  Experience,
  Skills,
  Education,
  About,
  Courses: FaCertificate,
  VolunteerWork: RiOrganizationChart,
  References,
};

export function Sidebar({ items }) {
  const pathname = usePathname();
  const [isOpened, setIsOpened] = useState(true);

  return (
    <aside
      className={`
        sticky top-0 w-fit h-[calc(100vh-0rem)] bg-main py-10 overflow-y-auto
        transition-all duration-300 ease-in-out
        ${isOpened ? "w-[300px] max-xl:fixed z-10" : "w-fit"}
      `}
    >
      <div>
        {/* Toggle Button */}
        <button
          onClick={() => setIsOpened(!isOpened)}
          className={`
            absolute ${
              isOpened ? "left-0" : "left-1/2 -translate-x-1/2 rounded-lg top-2"
            }
            top-0 z-20 p-2 bg-white  shadow-md transition-all duration-300 ease-in-out
            hover:bg-gray-50 focus:outline-none
          `}
        >
          <IoChevronForwardOutline
            className={`w-5 h-5 text-main transition-all duration-300 ${
              isOpened ? "" : "rotate-180"
            }`}
          />
        </button>

        <div
          className={`flex justify-center transition-all duration-300 ${
            isOpened ? "mb-14" : "scale-75 my-8"
          }`}
        >
          <Logo />
        </div>

        <nav
          className={`flex flex-col ${
            isOpened ? "space-y-10 ps-4" : "space-y-4"
          }`}
        >
          {items.map((item) => {
            const isActive = pathname === item.href;
            const Icon = icons[item.icon];
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center gap-3 py-3 px-6 rounded-s-full transition-all duration-300
                  font-bold text-2xl
                  ${
                    isActive
                      ? "bg-white text-main"
                      : "text-white hover:bg-white/10"
                  }
                  ${!isOpened && "justify-center px-3"}
                `}
              >
                <Icon
                  className={`w-6 h-6 transition-all duration-300 ${
                    !isOpened && "scale-110"
                  }`}
                />
                {isOpened && (
                  <>
                    <span className="text-lg font-medium whitespace-nowrap">
                      {item.name}
                    </span>
                    {isActive && (
                      <div className="w-2 h-2 ml-auto rounded-full bg-main" />
                    )}
                  </>
                )}
              </Link>
            );
          })}

          {/* Customize CV Link */}
          <Link
            href="/customize"
            className={`
              flex items-center gap-4 p-4 rounded-lg transition-all duration-300
              text-white hover:bg-white/10 border-t border-white/20 pt-8
              ${!isOpened && "justify-center p-3"}
            `}
          >
            {/* <Icons.Template className="w-6 h-6" /> */}
            {isOpened ? (
              <span className="text-lg font-medium whitespace-nowrap">
                تخصيص السيرة الذاتية
              </span>
            ) : (
              <IoChevronBackCircle className="w-6 h-6" />
            )}
          </Link>
        </nav>
      </div>
    </aside>
  );
}
