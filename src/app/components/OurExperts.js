import Image from "next/image";
import { ourExperts } from "@/assets/data/homeData";

export default function OurExperts() {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-8">
      {ourExperts.map(({ name, title, imgSrc }, i) => (
        <figure key={i} className="p-4 border rounded-2xl">
          <div className="bg-pink-light  flex items-center justify-center rounded-xl">
            <Image
              src={imgSrc}
              alt={name}
              width={300}
              height={300}
              className="aspect-square  w-full h-full"
            />
          </div>
          <figcaption className="text-center my-6">
            <h3 className="heading-h3 mb-2 font-bold text-neutral-9">{name}</h3>
            <p className="md:text-xl text-neutral-7">{title}</p>
          </figcaption>
          <button className="btn-primary rounded-[10px] px-6 py-3 font-semibold mx-auto block">
            احجز استشارة
          </button>
        </figure>
      ))}
    </div>
  );
}
