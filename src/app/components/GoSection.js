import Image from "next/image";
import Link from "next/link";

export default function GoSection() {
  const cvTemplates = [
    {
      src: "/img/نموذج سيرة ذاتية baseline.png",
      alt: "نموذج سيرة ذاتية baseline",
    },
    {
      src: "/img/نموذج سيرة ذاتية معلم.png",
      alt: "نموذج سيرة ذاتية معلم",
    },
    {
      src: "/img/نموذج سيرة ذاتية baseline.png",
      alt: "نموذج سيرة ذاتية 3",
    },
    {
      src: "/img/نموذج سيرة ذاتية معلم.png",
      alt: "نموذج سيرة ذاتية 4",
    },
  ];

  return (
    <div className="bg-second rounded-3xl p-10 flex flex-col lg:flex-row items-center gap-10">
      <div>
        <h2 className="heading font-normal leading-tight text-white ">
          انطلق في تصميم سيرتك الذاتية المميزة !وأجعل فرصك أقوى
        </h2>
        <Link href="/cv" className="btn-primary mt-8 sm:mt-12 lg:mt-20">
          إنشئ سيرتك الذاتية
        </Link>
      </div>
      <div className="grid sm:grid-cols-2 gap-1 mx-auto">
        {cvTemplates.map((template, index) => (
          <div
            key={index}
            className={`w-[170px] h-[240px] border-2 border-white rounded-[4px] overflow-hidden`}
          >
            <Image
              src={template.src}
              alt={template.alt}
              width={170}
              height={240}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
