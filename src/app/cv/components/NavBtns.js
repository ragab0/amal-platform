"use client";
import { usePathname, useRouter } from "next/navigation";
import { sidebarData } from "@/assets/data/sidebarData";

/* Navigation Buttons */

export default function NavBtns() {
  const router = useRouter();
  const pathname = usePathname();

  // Find current page index in sidebarData
  const currentIndex = sidebarData.findIndex((item) => item.href === pathname);
  const isFirstPage = currentIndex === 0;
  const isLastPage = currentIndex === sidebarData.length - 1;

  function handleBack() {
    if (!isFirstPage) {
      router.push(sidebarData[currentIndex - 1].href);
    }
  }

  function handleNext() {
    if (isLastPage) {
      // Go to customize page
      router.push("/customize");
    } else {
      router.push(sidebarData[currentIndex + 1].href);
    }
  }

  // onClick={handleBack}
  // disabled={isFirstPage}
  // className={`btn-secondary-outline ${
  //   isFirstPage ? "opacity-50 cursor-not-allowed" : ""
  // }`}

  //   <button onClick={handleNext} className="btn-secondary">
  // </button>

  return (
    <div className="flex justify-center max-md:flex-col-reverse gap-x-[60px] gap-y-2 mt-[60px] mb-[120px] clear-both">
      <button
        type="button"
        className={`btn-secondary-outline mx-0 min-w-[200px] max-md:w-full
            ${isFirstPage ? "opacity-50 cursor-not-allowed" : ""}
          `}
        onClick={handleBack}
        disabled={isFirstPage}
      >
        رجــوع
      </button>
      <button
        type="button"
        className={`btn-secondary btn-secondary-makeMain mx-0 px-4 min-w-[200px] max-md:w-full`}
        onClick={handleNext}
      >
        {isLastPage ? "تخصيص السيرة الذاتية" : "التالي"}
      </button>
    </div>
  );
}
