import Image from "next/image";
import { templatesApi } from "@/assets/data/templatesData";
import Link from "next/link";

export default function ChooseTemplate() {
  return (
    <div
      className="ltr text-left flex gap-8 overflow-auto py-4 px-2 -mx-2"
      style={{
        scrollbarColor: "rgba(123, 85, 215, 0.17) transparent",
      }}
    >
      {templatesApi.map(({ id, category, image }) => (
        <Link
          key={id}
          href={`/build?template=${id}`}
          className="relative cursor-pointer rounded-xl 
          overflow-hidden transition-all duration-300 border ring-main hover:ring-2"
        >
          <Image
            alt={category}
            src={image}
            width={"auto"}
            height={"auto"}
            className="w-full h-full max-w-[400px]"
          />
        </Link>
      ))}
    </div>
  );
}
