import Image from "next/image";
import Link from "next/link";

export default function Banner({ children, title }) {
  return (
    <div className="bg-second rounded-3xl p-10 flex flex-col lg:flex-row items-center gap-10">
      <div className="lg:-mb-16">
        <h2 className="heading-sub xl:text-5xl font-normal !leading-tight !text-white ">
          {title}
        </h2>
        <Link
          href="/cv"
          className="btn-primary mt-8 sm:mt-12 lg:mt-20 max-lg:hidden"
        >
          إنشئ سيرتك الذاتية
        </Link>
      </div>
      <div className="flex-shrink-0 lg:max-w-[50%] lg:pe-20">
        {children}
        <Link
          href="/cv"
          className="btn-primary mt-8 sm:mt-12 lg:mt-20 max-lg:w-full lg:hidden"
        >
          إنشئ سيرتك الذاتية
        </Link>
      </div>
    </div>
  );
}
