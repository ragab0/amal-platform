"use client";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

const navItems = ["القوالب", "الألوان", "الخطوط"];

export default function SubNavbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState("القوالب");

  const handleTabChange = (item) => {
    setActiveTab(item);
    // Update the URL based on the selected tab
    const route =
      item === "القوالب" ? "" : item === "الألوان" ? "colors" : "fonts";
    router.push(`/customize/${route}`);
  };

  return (
    <nav className="container mx-auto px-4 py-12 flex justify-center xl:justify-between items-center bg-[#461887]">
      <div className="flex gap-8 xl:gap-12 items-center">
        {navItems.map((item) => (
          <div key={item} className="relative">
            <button
              onClick={() => handleTabChange(item)}
              className="text-xl lg:text-3xl xl:text-[40px] xl:leading-[53px] text-white duration-300
              hover:opacity-90 transition-all
                
              "
            >
              {item}
            </button>
            {activeTab === item && (
              <div className="absolute bottom-[-20px] left-0 right-0 h-1 bg-[#33D38E] rounded-full" />
            )}
          </div>
        ))}
      </div>
      {/* <div>
        <button className="bg-white text-[#461887] font-semibold text-[32px] leading-[43px] px-8 py-4 rounded-lg">
          حفظ والاستمرار
        </button>
      </div> */}
    </nav>
  );
}
