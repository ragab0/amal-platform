import { FadeInUp } from "@/components/motion/MotionWrappers";

export default function TitleItems({ title = "قيمنا", items = [] }) {
  return (
    <section>
      <FadeInUp>
        <h2 className="heading-sub font-bold mb-12">{title}</h2>
      </FadeInUp>
      <div className="px-6">
        <ul className="space-y-[35px]">
          {items.map((value, index) => (
            <FadeInUp key={index} delay={index * 0.2}>
              <li className="flex items-center gap-3">
                <div className="flex-shrink-0 rounded-full border border-text h-5 w-5"></div>
                <span className="text-[28px]" style={{ direction: "initial" }}>
                  {value}
                </span>
              </li>
            </FadeInUp>
          ))}
        </ul>
      </div>
    </section>
  );
}
