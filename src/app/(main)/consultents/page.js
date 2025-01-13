import { FadeInUp } from "@/components/motion/MotionWrappers";
import ConsultensForm from "./ConsultensForm";

export const metadata = {
  title: "المستشارون المهنيون",
  description:
    "تواصل مع مستشارينا المهنيين المتخصصين للحصول على التوجيه والإرشاد في مسيرتك المهنية",
  keywords: [
    "مستشارون مهنيون",
    "استشارات مهنية",
    "توجيه وظيفي",
    "تطوير مهني",
    "خبراء التوظيف",
    "منصة عمل",
  ],
  openGraph: {
    title: "المستشارون المهنيون | منصة عمل",
    description:
      "تواصل مع مستشارينا المهنيين المتخصصين للحصول على التوجيه والإرشاد في مسيرتك المهنية",
  },
};

export default function ConsultantsPage() {
  return (
    <div className="container mx-auto px-4">
      <header className="text-center my-[160px]">
        <FadeInUp>
          <h1 className="heading-big">الاستشارات</h1>
        </FadeInUp>
        <FadeInUp delay={0.2}>
          <h2 className="heading font-medium">
            ارفع سيــرتك الذاتيــة
            <br />
            لمراجعة مع استشاريين اخصائيين بالسير الذاتية
          </h2>
        </FadeInUp>
      </header>
      <div>
        <ConsultensForm />
      </div>
    </div>
  );
}
