import AppStore from "@/assets/icons/AppStore";
import PlayStore from "@/assets/icons/PlayStore";
import AppImg from "@/assets/imgs/iPhone.png";
import Image from "next/image";

export default function OurApp() {
  return (
    <div className="py-16 flex text-center justify-between max-lg:flex-col gap-y-16">
      <div className="flex-1 max-w-xl mx-auto">
        <h3 className="heading-section-name">تطبيق</h3>
        <h2 className="heading-sub mb-[50px] text-center !leading-relaxed">
          يمكنك تحميل تطبيقنا من المتاجر الرسمية
        </h2>
        <div className="flex gap-[6%] justify-center flex-wrap gap-y-4">
          <button
            className="flex gap-2 items-center btn-secondary btn-secondary-makePurple rounded-[10px] ms-0 w-fit px-6 py-3 font-semibold
          !bg-[#1D6FF2] hover:opacity-90"
          >
            متجر التطبيقات <AppStore />
          </button>
          <button
            className="flex gap-2 items-center btn-primary rounded-[10px] px-6 py-3 font-semibold
          !bg-[#1C1C1C] hover:opacity-90"
          >
            متجر التطبيقات <PlayStore />
          </button>
        </div>
      </div>
      <Image
        alt="app-img"
        src={AppImg}
        className="w-full max-w-[500px] mx-auto"
      />
    </div>
  );
}
