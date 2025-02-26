import "./(main)/home.css";
import Image from "next/image";
import MainLayout from "./(main)/layout";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Reviews from "./components/Reviews";
import Banner from "@/components/banner/Banner";
import ChooseTemplate from "./components/ChooseTemplate";
import OurApp from "./components/OurApp";
import { FadeInUp } from "@/components/motion/MotionWrappers";
import { templatesApi } from "@/assets/data/templatesData";
import { adminPanelImgs, ourServices, reviews } from "@/assets/data/homeData";

export default function HomePage() {
  return (
    <MainLayout className="home-page space-y-16">
      <section className="container mx-auto px-4">
        <FadeInUp>
          <Hero />
        </FadeInUp>
      </section>
      <section
        className="pt-[60px] pb-[200px] rounded-[50px]"
        style={{ backgroundColor: "rgba(123, 85, 215, 0.17)" }}
      >
        <div className="container mx-auto px-4">
          <FadeInUp>
            <h3 className="heading-section-name">قوالب سيرة ذاتية</h3>
            <h2 className="heading-sub mb-[64px] text-center">
              اختار القالب المناسب لك
            </h2>
          </FadeInUp>
          <ChooseTemplate />
        </div>
      </section>
      <section className="container mx-auto px-4">
        <FadeInUp>
          <h3 className="heading-section-name">مميزات</h3>
          <h2 className="heading-sub mb-[50px] text-center">
            كيف يمكن لمنصة نبذة مساعدتك؟
          </h2>
        </FadeInUp>
        <Services ourServices={ourServices} />
      </section>
      <section className="bg-pink-light">
        <FadeInUp className="container mx-auto px-4">
          <OurApp />
        </FadeInUp>
      </section>
      {/* <section className="container mx-auto px-4">
        <FadeInUp>
          <h3 className="heading-section-name">الخبراء</h3>
          <h2 className="heading-sub mb-[64px] text-center">
            يمكنك مراجعة السيرة الذاتية مع الخبراء في مجال التوظيف
          </h2>
        </FadeInUp>
        <OurExperts />
      </section> */}
      {/* <section className="container mx-auto px-4 py-[64px]">
        <FadeInUp>
          <h3 className="heading-section-name">الوظائف</h3>
          <h2 className="heading-sub mb-[64px] text-center">
            أخر الوظائف المعلن عنها
          </h2>
        </FadeInUp>
        <LastJobs />
      </section> */}
      {/* <section className="container mx-auto px-4">
        <FadeInUp>
          <h2 className="heading-sub mb-[50px]">الأسئلة الشائعة</h2>
        </FadeInUp>
        <FAQClient questions={faqs} />
      </section> */}
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
        <Reviews reviews={reviews} />
      </section>
      <section className="container mx-auto px-4">
        <Banner title="انطلق في تصميم سيرتك الذاتية المميزة !وأجعل فرصك أقوى">
          <div className="flex-shrink-0 grid grid-cols-2 gap-1 mx-auto">
            {[
              ...templatesApi,
              ...templatesApi,
              ...templatesApi,
              ...templatesApi,
            ]
              .slice(0, 4)
              .map(({ image, category }, index) => (
                <div
                  key={index}
                  className={`max-w-[170px] max-h-[240px] border-2 border-white rounded-[4px] overflow-hidden`}
                >
                  {image && (
                    <Image
                      src={image}
                      alt={category}
                      width={"auto"}
                      height={"auto"}
                      className="w-auto"
                    />
                  )}
                </div>
              ))}
          </div>
        </Banner>
      </section>
      <section className="container mx-auto px-4 overflow-hidden">
        <div
          className="bg-second rounded-3xl p-10 flex flex-row gap-10 overflow-auto max-h-[1000px]"
          style={{
            colorScheme: "dark",
          }}
        >
          {adminPanelImgs.map(({ Img }, index) => (
            <Image
              key={index}
              src={Img}
              alt={`Admin Panel Image ${index + 1}`}
              width={"auto"}
              height={"auto"}
              className="w-auto rounded-[inherit]"
            />
          ))}
        </div>
      </section>
    </MainLayout>
  );
}
