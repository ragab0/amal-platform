import Navbar from "@/components/navbar/Navbar";
import SubNavbar from "./components/SubNavbar";
import ResumeActions from "./components/ResumeActions";
import ResumeBar from "../../templates/ResumeBar";
import CVDataProvider from "@/providers/CVDataProvider";

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
    <CVDataProvider>
      <div className="bg-second">
        <Navbar />
        <SubNavbar />
        <main className="flex flex-col-reverse xl:grid xl:grid-cols-[1fr_2fr_1fr] gap-x-4 bg-inherit">
          <section className="bg-white">
            <ResumeActions />
          </section>
          <section className="overflow-hidden h-screen min-h-[500px] grid">
            <ResumeBar isCustomize={true} />
          </section>
          <section className="bg-white">{children}</section>
        </main>
      </div>
    </CVDataProvider>
  );
}
