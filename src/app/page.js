import { FadeInUp } from "@/components/motion/MotionWrappers";
import { faqs } from "@/assets/data/faqs";
import MainLayout from "./(main)/layout";
import FAQClient from "./components/FAQClient";
import Reviews from "./components/Reviews";
import Banner from "@/components/banner/Banner";
import Image from "next/image";
import { cvTemplates } from "@/assets/data/homeData";

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
        <Banner title="انطلق في تصميم سيرتك الذاتية المميزة !وأجعل فرصك أقوى">
          <div className="grid sm:grid-cols-2 gap-1 mx-auto">
            {cvTemplates.map((template, index) => (
              <div
                key={index}
                className={`w-[170px] h-[240px] border-2 border-white rounded-[4px] overflow-hidden`}
              >
                <Image
                  src={template.src}
                  alt={template.alt}
                  width={170}
                  height={240}
                />
              </div>
            ))}
          </div>
        </Banner>
      </section>
    </MainLayout>
  );
}
