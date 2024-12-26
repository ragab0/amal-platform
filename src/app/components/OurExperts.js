import Image from "next/image";
import { ourExperts } from "@/assets/data/homeData";

export default function OurExperts() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center gap-8">
      {ourExperts.map(({ name, title, imgSrc }, i) => (
        <figure
          key={i}
          className="p-4 border rounded-2xl max-md:max-w-[400px] w-full"
        >
          <div className="bg-pink-light flex items-center justify-center rounded-xl min-w-full max-w-[300px] h-[300px]  mx-auto">
            {imgSrc && (
              <Image
                src={imgSrc}
                alt={name}
                width={"auto"}
                height={"auto"}
                className="aspect-square w-full h-full"
              />
            )}
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
