import { FadeInUp } from "@/components/motion/MotionWrappers";
import { faqs } from "@/assets/data/faqs";
import MainLayout from "./(main)/layout";
import FAQClient from "./components/FAQClient";
import Reviews from "./components/Reviews";
import GoSection from "./components/GoSection";

export default function HomePage() {
  return (
    <MainLayout className="space-y-[100px] mb-[200px]">
      <section className="container mx-auto px-4"></section>
      <section className="container mx-auto px-4">
        <FadeInUp>
          <h2 className="heading-sub mb-[50px]">الأسئلة الشائعة</h2>
        </FadeInUp>
        <FAQClient questions={faqs} />
      </section>
      <section className="container mx-auto px-4">
        <div className="text-center">
          <FadeInUp>
            <h2 className="heading-sub mb-12">تقديم أفضل انطباع من البداية</h2>
            <p className="heading-h3 font-medium mt-4 max-w-4xl mx-auto">
              لا تدع الفرصة تضيع بسبب سيرة ذاتية غير ملائمة. سواءً كنت خريجًا
              جديدًا، محترفًا، أو تبحث عن تغيير مسارك المهني، نحن هنا لنساعدك
              على النجاح
            </p>
          </FadeInUp>
        </div>
        <Reviews />
      </section>
      <section className="container mx-auto px-4">
        <GoSection />
      </section>
    </MainLayout>
  );
}
