"use client";
import Image from "next/image";
import NestedPageLayout from "../../components/NestedPageLayout";
import { templatesApi } from "@/assets/data/templatesData";
import { useAppSelector } from "@/hooks/ReduxHooks";

export default function TemplatesGrid() {
  const { options = {} } = useAppSelector((state) => state.cvs.myCV);
  const { templateId } = options;

  return (
    <NestedPageLayout title="اختــار قالــب">
      <div className="h-[calc(100vh)] overflow-y-auto pr-4 [&::-webkit-scrollbar]:w-[13px] [&::-webkit-scrollbar]:bg-[#F1EDF6] [&::-webkit-scrollbar]:rounded-lg [&::-webkit-scrollbar-thumb]:bg-second [&::-webkit-scrollbar-thumb]:rounded-lg">
        <div className="flex flex-wrap justify-center gap-6 p-4">
          {templatesApi.map(({ id, category, image }) => (
            <div
              key={id}
              className={`w-[190px] h-[300px] border-text relative cursor-pointer rounded-lg
          overflow-hidden transition-all duration-300 border ring-main hover:ring-4 ${
            templateId === id ? "ring-4" : ""
          }`}
            >
              <Image
                src={image}
                alt={category}
                width={"auto"}
                height={"auto"}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </NestedPageLayout>
  );
}
