import { FadeInUp } from "@/components/motion/MotionWrappers";

export default function TitleDesc({ title = "", desc = "" }) {
  return (
    <section className="text-center">
      <FadeInUp>
        <h2 className="heading-sub font-bold mb-12">{title}</h2>
      </FadeInUp>
      <FadeInUp delay={0.2} className="px-6">
        <span className="text-[28px]" style={{ direction: "initial" }}>
          {desc}
        </span>
      </FadeInUp>
    </section>
  );
}
