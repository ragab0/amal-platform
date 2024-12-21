import AppImg from "@/assets/imgs/iPhone.png";
import Image from "next/image";

export default function OurApp() {
  return (
    <div className="py-16 flex text-center justify-between">
      <div className="flex-1 max-w-xl mx-auto">
        <h3 className="heading-section-name">تطبيق</h3>
        <h2 className="heading-sub mb-[50px] text-center !leading-relaxed">
          يمكنك تحميل تطبيقنا من المتاجر الرسمية
        </h2>
        <div className="flex gap-[6%] justify-center flex-wrap">
          <button className="btn-secondary btn-secondary-makePurple rounded-[10px] ms-0 w-fit px-6 py-3 font-semibold">
            افحص سيرتك الذاتية
          </button>
          <button className="btn-primary rounded-[10px] px-6 py-3 font-semibold">
            انشئ سيرتك الذاتية
          </button>
        </div>
      </div>
      <Image alt="app-img" src={AppImg} className="w-[500px]" />
    </div>
  );
}
