import { FadeInUp } from "@/components/motion/MotionWrappers";
import SearchForm from "./components/SearchForm";
import SearchResults from "./components/SearchResults";

export const metadata = {
  title: "فرص العمل المتاحة",
  description:
    "اكتشف أحدث فرص العمل المتاحة في مختلف المجالات والتخصصات. تصفح وقدم على الوظائف التي تناسب مهاراتك وخبراتك",
  keywords: [
    "وظائف",
    "فرص عمل",
    "توظيف",
    "وظائف شاغرة",
    "البحث عن عمل",
    "مهن",
    "منصة عمل",
  ],
  openGraph: {
    title: "فرص العمل المتاحة | منصة عمل",
    description:
      "اكتشف أحدث فرص العمل المتاحة في مختلف المجالات والتخصصات. تصفح وقدم على الوظائف التي تناسب مهاراتك وخبراتك",
  },
};

export default function page() {
  return (
    <div className="container mx-auto px-4">
      <header className="text-center mt-[160px]">
        <FadeInUp>
          <h1 className="heading-big">الوظــائــف</h1>
        </FadeInUp>
        <FadeInUp delay={0.2}>
          <h2 className="heading font-medium">
            ابحث عن الوظيفة التي تلائم مجالك، نقدم لك آلاف الوظائف
          </h2>
        </FadeInUp>
      </header>
      <FadeInUp delay={0.4} className="mt-12 mb-[140px]">
        <SearchForm />
      </FadeInUp>
      <FadeInUp delay={0.6} className="mt-12 mb-[140px]">
        <SearchResults />
      </FadeInUp>
    </div>
  );
}
