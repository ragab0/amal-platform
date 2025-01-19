import Link from "next/link";
import Benifits from "./components/Benifits";
import MethodsForm from "./components/MethodsForm";
import { IoIosArrowBack } from "react-icons/io";

export default function layout() {
  return (
    <div className="home-page mt-[150px] mb-[200px] container mx-auto px-4">
      <h1 className="heading-sub !text-second font-normal mb-[40px]">
        الفوائد
      </h1>
      <Benifits />
      <MethodsForm />
      <Link
        href="/services"
        className="flex gap-2 items-center justify-center text-center text-shadow-plate sm:text-xl hover:opacity-70"
      >
        الرجــــوع <IoIosArrowBack />
      </Link>
    </div>
  );
}
