import Image from "next/image";
import Temp1 from "@/assets/imgs/temp1.png";

export default function ChooseTemplate() {
  return (
    <div
      className="ltr text-left flex gap-8 overflow-auto pb-4"
      style={{
        scrollbarColor: "rgba(123, 85, 215, 0.17) transparent",
      }}
    >
      <Image alt="template-img" src={Temp1} />
      <Image alt="template-img" src={Temp1} />
      <Image alt="template-img" src={Temp1} />
      <Image alt="template-img" src={Temp1} />
      <Image alt="template-img" src={Temp1} />
    </div>
  );
}
