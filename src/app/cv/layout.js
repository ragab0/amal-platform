import Logo from "@/components/logo/Logo";
import { Sidebar } from "./components/Sidebar";
import { sidebarData } from "@/assets/data/sidebarData";
import ResumeBar from "./components/ResumeBar";
import NavBtns from "./components/NavBtns";

export const metadata = {
  title: "منشئ السيرة الذاتية - منصة عمل",
  description:
    "قم بإنشاء سيرة ذاتية احترافية مع منشئ السير الذاتية السهل الاستخدام. اختر من بين قوالب متعددة وخصص سيرتك الذاتية للتميز.",
  keywords:
    "منشئ السيرة الذاتية, منشئ السير الذاتية, سيرة ذاتية احترافية, التقديم للوظائف, أدوات المهنية",
};

export default function CVLayout({ children }) {
  return (
    <div className="flex w-full gap-y-4 gap-x-10 bg-gray-50">
      {/* side one */}
      <aside className="sticky top-0 w-fit min-w-[300px] h-[calc(100vh-0rem)] bg-main py-10 overflow-y-auto">
        <div>
          <div className="flex justify-center mb-14">
            <Logo />
          </div>
          <Sidebar items={sidebarData} />
        </div>
      </aside>
      {/* main content of current page */}
      <main className="flex-1">
        {children}
        <NavBtns />
      </main>
      <section className="sticky top-4 w-[612px] overflow-hidden p-5">
        <ResumeBar />
      </section>
    </div>
  );
}