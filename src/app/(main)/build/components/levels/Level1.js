"use client";

import Image from "next/image";
import aliasChoose from "@/assets/imgs/cv/aliasChoose.png";

export default function Level1({
  errors,
  setCvChoice,
  setValue,
  onSkip = () => {},
  onNext = () => {},
}) {
  const handleOptionSelect = (type) => {
    setCvChoice(type);
    setValue("cvType", type);
  };

  return (
    <div className="flex flex-col items-center">
      <Image
        src={aliasChoose}
        alt="اختيار طريقة السيرة الذاتية"
        width={"auto"}
        height={"auto"}
        className="object-contain mx-auto"
      />
      <div className="mt-16 text-center">
        <h1 className="text-3xl font-semibold mb-12 text-gray-900">
          هل لديك سيرة ذاتية أو حساب LinkedIn؟
        </h1>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            type="button"
            onClick={() => onNext() || handleOptionSelect("cv")}
            className="w-full sm:w-auto btn-build-main"
          >
            نعم، لدي سيرة ذاتية
          </button>
          <button
            type="button"
            onClick={() => onNext() || handleOptionSelect("linkedin")}
            className="w-full sm:w-auto btn-build-main"
          >
            نعم، لدي LinkedIn
          </button>
          <button
            type="button"
            onClick={onSkip}
            className="w-full sm:w-auto btn-build-secondary"
          >
            لا، أبدأ من البداية
          </button>
        </div>
        {errors.cvType && (
          <p className="mt-2 text-red-500 text-sm">{errors.cvType.message}</p>
        )}
      </div>
    </div>
  );
}
