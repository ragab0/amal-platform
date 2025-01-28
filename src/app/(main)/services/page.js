import Link from "next/link";
import { services } from "@/assets/data/servicesData";
import {
  FadeInUp,
  HoverCard,
  HoverHeader,
  FadeInSlide,
  HoverButton,
} from "@/components/motion/MotionWrappers";

export const metadata = {
  title: "خدماتنا المهنية",
  description:
    "اكتشف خدماتنا المتكاملة لتطوير مسيرتك المهنية، من بناء السيرة الذاتية إلى الاستشارات المهنية",
  keywords: [
    "خدمات مهنية",
    "بناء سيرة ذاتية",
    "استشارات مهنية",
    "تطوير وظيفي",
    "خدمات التوظيف",
    "منصة نبذة",
  ],
  openGraph: {
    title: "خدماتنا المهنية | منصة نبذة",
    description:
      "اكتشف خدماتنا المتكاملة لتطوير مسيرتك المهنية، من بناء السيرة الذاتية إلى الاستشارات المهنية",
  },
};

export default function ServicesPage() {
  return (
    <div className="container mx-auto px-4">
      <header className="text-center my-[160px]">
        <FadeInUp>
          <h1 className="heading-big">الخدمات</h1>
        </FadeInUp>
        <FadeInUp delay={0.2}>
          <h2 className="heading font-medium">
            تقدم لكم منصة نبذة خدماتها المميزة والاحترافية
          </h2>
        </FadeInUp>
      </header>
      <div className="cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center gap-[5%] mt-16">
        {services.map((service, index) => (
          <HoverCard
            key={index}
            className="flex flex-col bg-pink border-[3px] border-second rounded-t-xl w-full max-w-[500px] mx-auto h-full"
          >
            <HoverHeader className="bg-second flex flex-col py-10 gap-4 items-center justify-center rounded-t-lg">
              <h3 className="heading-sub font-medium text-white">
                {service.title}
              </h3>
              <div>
                <div className="flex items-center justify-center gap-3 mb-6">
                  <h4 className="heading-sub font-medium text-main">
                    ({service.price || "0$"})
                  </h4>
                  {service.originalPrice && (
                    <span className="heading-sub-small text-gray-400 line-through">
                      {service.originalPrice}
                    </span>
                  )}
                </div>
              </div>
            </HoverHeader>
            <ul className="py-[100px] px-[50px] border-b border-second space-y-6 list-disc h-full text-lg">
              {service.items.map((item, itemIndex) => (
                <FadeInSlide
                  key={itemIndex}
                  index={index}
                  itemIndex={itemIndex}
                >
                  {item}
                </FadeInSlide>
              ))}
            </ul>
            <div className="py-[80px] flex items-center justify-center">
              <HoverButton>
                <Link
                  href={service.to}
                  className="btn-secondary block w-auto min-w-[200px] mx-auto rounded-lg"
                >
                  {service.btnText}
                </Link>
              </HoverButton>
            </div>
          </HoverCard>
        ))}
      </div>
    </div>
  );
}
