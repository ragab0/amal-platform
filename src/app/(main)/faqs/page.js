import FAQClient from "@/app/components/FAQClient";
import { FadeInUp } from "@/components/motion/MotionWrappers";
import { faqs } from "@/assets/data/homeData";
import Link from "next/link";

export const metadata = {
  title: "الأسئلة الشائعة",
  description:
    "اعثر على إجابات لأكثر الأسئلة شيوعاً حول خدماتنا وكيفية استخدام منصة عمل",
  keywords: [
    "أسئلة شائعة",
    "مساعدة",
    "دعم",
    "خدمة العملاء",
    "منصة عمل",
    "توظيف",
  ],
  openGraph: {
    title: "الأسئلة الشائعة | منصة عمل",
    description:
      "اعثر على إجابات لأكثر الأسئلة شيوعاً حول خدماتنا وكيفية استخدام منصة عمل",
  },
};

export default function FaqsPage() {
  return (
    <div className="container mx-auto px-4 mt-[160px] mb-[200px]">
      <header className="text-center mb-[90px]">
        <FadeInUp>
          <h1 className="heading-big">الأسئلة الشائعة</h1>
        </FadeInUp>
        <FadeInUp delay={0.2}>
          <h2 className="font-medium text-2xl md:text-3xl">
            في حال لم تجد سؤالك، تواصل معنا{" "}
            <Link href="/support" className="underline">
              بالضغط هنا
            </Link>
          </h2>
        </FadeInUp>
      </header>
      <FAQClient questions={faqs} />
    </div>
  );
}
