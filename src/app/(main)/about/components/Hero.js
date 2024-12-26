import { FadeInUp } from "@/components/motion/MotionWrappers";

export default function Hero() {
  return (
    <section className="min-h-[1080px] bg-[url('/about-hero-img.webp')] bg-opacity-50 bg-cover bg-center">
      <header className="text-center my-[160px]">
        <FadeInUp>
          <h1 className="heading-big">من نحن؟</h1>
        </FadeInUp>
        <FadeInUp delay={0.2}>
          <h2 className="heading font-medium">
            !نحن هنا لتحويل سيرتك الذاتية إلى فرصة
          </h2>
        </FadeInUp>
      </header>
      <div></div>
    </section>
  );
}
