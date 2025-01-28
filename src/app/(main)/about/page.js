import {
  offerItems,
  ourMessage,
  ourValues,
  ourVision,
} from "@/assets/data/aboutData";
import Hero from "./components/Hero";
import TitleItems from "./components/TitleItems";
import TitleDesc from "./components/TitleDescription";
import Banner from "@/components/banner/Banner";
import Image from "next/image";

export const metadata = {
  title: "عن منصة نبذة",
  description:
    "تعرف على منصة نبذة - منصتك المتكاملة للتطوير المهني وبناء السيرة الذاتية وإيجاد فرص العمل المناسبة",
  keywords: [
    "منصة نبذة",
    "من نحن",
    "رؤيتنا",
    "مهمتنا",
    "خدمات مهنية",
    "تطوير وظيفي",
    "تطوير مهني",
    "سيرة ذاتية",
  ],
  openGraph: {
    title: "عن منصة نبذة | منصتك المهنية المتكاملة",
    description:
      "تعرف على منصة نبذة - منصتك المتكاملة للتطوير المهني وبناء السيرة الذاتية وإيجاد فرص العمل المناسبة",
  },
};

export default function AboutPage() {
  return (
    <div className="about-page space-y-[100px]">
      <Hero />
      <div className="container mx-auto px-4 space-y-[100px]">
        <TitleItems title="ماذا نقدم؟" items={offerItems} />
        <TitleItems title="قيمنــــا؟" items={ourValues} />
        <TitleDesc title="رسالتنــــا" desc={ourMessage} />
        <TitleDesc title="رؤيتنــــا" desc={ourVision} />
        <div className="pt-[100px]">
          <Banner title="إذا كنت تبحث عن سيرة ذاتية مثالية !تواصل معنا لنساعدك في رحلتك نحو النجاح">
            <Image
              src="/about-banner.webp"
              alt="About Banner"
              width={540}
              height={540}
              className="w-auto"
            />
          </Banner>
        </div>
      </div>
    </div>
  );
}
