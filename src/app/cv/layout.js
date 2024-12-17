import "./layout.css";
import { Sidebar } from "./components/Sidebar";
import { sidebarData } from "@/assets/data/sidebarData";
import Logo from "@/components/logo/Logo";
import ResumeBar from "../../templates/ResumeBar";
import NavBtns from "./components/NavBtns";
import CVDataProvider from "./components/CVDataProvider";

export const metadata = {
  title: "منشئ السيرة الذاتية - منصة عمل",
  description:
    "قم بإنشاء سيرة ذاتية احترافية مع منشئ السير الذاتية السهل الاستخدام. اختر من بين قوالب متعددة وخصص سيرتك الذاتية للتميز.",
  keywords:
    "منشئ السيرة الذاتية, منشئ السير الذاتية, سيرة ذاتية احترافية, التقديم للوظائف, أدوات المهنية",
};

export default function CVLayout({ children }) {
  return (
    <div className="cv-layout flex w-full gap-y-4 gap-x-10 bg-gray-50">
      {/* side one */}
      <aside className="sticky top-0 w-fit min-w-[300px] h-[calc(100vh-0rem)] bg-main py-10 overflow-y-auto">
        <div>
          <div className="flex justify-center mb-14">
            <Logo />
          </div>
          <Sidebar items={sidebarData} />
        </div>
      </aside>
      <CVDataProvider>
        {/* main content of current page */}
        <main className="flex-1">
          {children}
          <NavBtns />
        </main>
        {/* third side */}
        <section className="flex-1 sticky top-4 h-[calc(100vh-4rem)] p-5 ps-0">
          <ResumeBar />
        </section>
      </CVDataProvider>
    </div>
  );
}
