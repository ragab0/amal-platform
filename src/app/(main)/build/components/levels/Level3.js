"use client";

import Image from "next/image";
import temp1 from "@/assets/imgs/cv/cv_temp1.png";
import temp2 from "@/assets/imgs/cv/cv_temp2.png";
import temp3 from "@/assets/imgs/cv/cv_temp3.png";

const templates = [
  {
    id: "template1",
    name: "احترافي حديث",
    image: temp1,
  },
  {
    id: "template2",
    name: "تصميم إبداعي",
    image: temp2,
  },
  {
    id: "template3",
    name: "كلاسيكي أنيق",
    image: temp3,
  },
];

export default function Level3({ errors, setValue, watch }) {
  const selectedTemplate = watch("template");

  return (
    <div className="container mx-auto flex flex-col items-center">
      <div className="w-full">
        <h1 className="text-3xl font-semibold mb-12 text-center text-gray-900">
          اختر قالب السيرة الذاتية
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-[5%]">
          {templates.map((template) => (
            <div
              key={template.id}
              className={`relative cursor-pointer rounded-xl overflow-hidden transition-all duration-300
                border ring-main
                ${
                  selectedTemplate === template.id ? "ring-8" : "hover:ring-2"
                }`}
              onClick={() => setValue("template", template.id)}
            >
              <Image
                src={template.image}
                alt={template.name}
                width={"auto"}
                height={"auto"}
                className="object-contain w-full mx-auto"
              />
              {/* <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
                <h3 className="text-lg font-medium text-center">
                  {template.name}
                </h3>
              </div> */}
            </div>
          ))}
        </div>
        {errors.template && (
          <p className="mt-4 text-red-500 text-sm text-center">
            {errors.template.message}
          </p>
        )}
        <button
          type="submit"
          disabled={!selectedTemplate}
          className="btn-build-main mt-12 !px-8 !py-4 w-full sm:w-auto mx-auto block"
          onClick={() => {
            // redirect to cv page;
            window.location.href = "/cv";
          }}
          title="انشاء السيرة الذاتية"
        >
          إنشاء السيرة الذاتية
        </button>
      </div>
    </div>
  );
}
