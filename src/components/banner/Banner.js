import Image from "next/image";
import Link from "next/link";

export default function Banner({ children, title }) {
  return (
    <div className="bg-second rounded-3xl p-10 flex flex-col lg:flex-row items-center gap-10">
      <div className="-mb-16">
        <h2 className="heading-sub xl:text-5xl font-normal !leading-tight text-white ">
          {title}
        </h2>
        <Link href="/cv" className="btn-primary mt-8 sm:mt-12 lg:mt-20">
          إنشئ سيرتك الذاتية
        </Link>
      </div>
      {children}
    </div>
  );
}
