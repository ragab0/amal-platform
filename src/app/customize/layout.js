import Navbar from "@/components/navbar/Navbar";
import SubNavbar from "./components/SubNavbar";
import ResumeActions from "./components/ResumeActions";
import ResumeBar from "../cv/components/ResumeBar";

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
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#461887",
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
      <main className="grid grid-cols-[1fr_auto_1fr] gap-4 bg-inherit">
        <section className="bg-white">
          <ResumeActions />
        </section>
        <section className="sticky top-4 w-[800px] h-full overflow-hidden">
          <ResumeBar />
        </section>
        <section className="bg-white">{children}</section>
      </main>
    </div>
  );
}
