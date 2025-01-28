import "./layout.css";
import { Sidebar } from "./components/Sidebar";
import { sidebarData } from "@/assets/data/sidebarData";
import ResumeBar from "../../templates/ResumeBar";
import NavBtns from "./components/NavBtns";
import CVDataProvider from "@/providers/CVDataProvider";

export const metadata = {
  title: "منشئ السيرة الذاتية - منصة نبذة",
  description:
    "قم بإنشاء سيرة ذاتية احترافية مع منشئ السير الذاتية السهل الاستخدام. اختر من بين قوالب متعددة وخصص سيرتك الذاتية للتميز.",
  keywords:
    "منشئ السيرة الذاتية, منشئ السير الذاتية, سيرة ذاتية احترافية, التقديم للوظائف, أدوات المهنية",
};

export default function CVLayout({ children }) {
  return (
    <CVDataProvider>
      <div className="cv-layout flex w-full bg-gray-50 max-lg:pb-[50px]">
        {/* side one */}
        <Sidebar items={sidebarData} />
        {/* side two */}
        <div className="flex-1 flex max-lg:flex-col">
          {/* main content of current page */}
          <main className="flex-1 px-5">
            {children}
            <NavBtns />
          </main>
          {/* third side */}
          <section className="flex-1 sticky top-4 h-[calc(100vh-4rem)] p-5 max-lg:min-h-[750px] max-lg:grid">
            <ResumeBar />
          </section>
        </div>
      </div>
    </CVDataProvider>
  );
}
