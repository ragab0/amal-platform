import HeroImg from "@/assets/imgs/hero-img.webp";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="grid md:grid-cols-2 md:gap-[50px] pt-[75px]">
      <Image alt="Hero Image" src={HeroImg} width={646} height={586} />
      <div className="flex flex-col justify-start mt-10">
        <h1 className="heading-section-name">منصة عمل</h1>
        <h2 className="heading-sub mb-[50px] text-center max-w-lg mx-auto leading-tight font-bold">
          أنشئ سيرتك الذاتية المثالية تصميم احترافي ومراجعة دقيقة لتميزك الوظيفي
        </h2>
        <div className="flex gap-4 justify-center flex-wrap">
          <button className="btn-secondary btn-secondary-makePurple rounded-[10px] ms-0 w-fit px-6 py-3 font-semibold">
            افحص سيرتك الذاتية
          </button>
          <button className="btn-primary rounded-[10px] px-6 py-3 font-semibold">
            انشئ سيرتك الذاتية
          </button>
        </div>
      </div>
    </div>
  );
}
