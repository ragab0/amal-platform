import Navbar from "@/components/navbar/Navbar";
import SubNavbar from "./components/SubNavbar";
import ResumeActions from "./components/ResumeActions";
import ResumeBar from "../../templates/ResumeBar";
import { templateOneCustomizeOptions } from "@/templates/temp/TemplateOneCustomizeData";

export const metadata = {
  title: "تخصيص السيرة الذاتية | منصة عمل",
  description:
    "قم بتخصيص سيرتك الذاتية باختيار القالب المناسب وتعديل الألوان والخطوط",
  keywords: ["سيرة ذاتية", "تخصيص", "تصميم", "قوالب", "منصة عمل"],
  openGraph: {
    title: "تخصيص السيرة الذاتية | منصة عمل",
    description:
      "قم بتخصيص سيرتك الذاتية باختيار القالب المناسب وتعديل الألوان والخطوط",
    locale: "ar_SA",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function Layout({ children }) {
  return (
    <div className="bg-second">
      <Navbar />
      <SubNavbar />
      <main className="flex flex-col-reverse xl:grid xl:grid-cols-[1fr_2fr_1fr] gap-4 bg-inherit">
        <section className="bg-white">
          <ResumeActions
            templateCustomizeOptions={templateOneCustomizeOptions}
          />
        </section>
        <section className="sticky top-4 left-0 overflow-hidden">
          <ResumeBar />
        </section>
        <section className="bg-white">{children}</section>
      </main>
    </div>
  );
}
