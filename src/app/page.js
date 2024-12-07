import { FadeInUp } from "@/components/motion/MotionWrappers";
import { faqs } from "@/assets/data/faqs";
import MainLayout from "./(main)/layout";
import FAQClient from "./components/FAQClient";

export default function HomePage() {
  return (
    <MainLayout>
      <section>{/** benifits section */}</section>
      <section className="container mx-auto px-4 py-16"></section>
      <section>{/** reviews section */}</section>
      <section>{/** go section */}</section>
      <section className="container mx-auto px-4 py-[100px]">
        <FadeInUp>
          <h2 className="heading-sub mb-[50px]">الأسئلة الشائعة</h2>
        </FadeInUp>
        <FAQClient questions={faqs} />
      </section>
    </MainLayout>
  );
}
