"use client";
import Image from "next/image";
import NestedPageLayout from "../../components/NestedPageLayout";

const templates = [
  {
    id: 1,
    image: "/img/نموذج سيرة ذاتية من تصميمي.png",
    alt: "نموذج سيرة ذاتية 1",
  },
  {
    id: 2,
    image: "/img/نموذج سيرة ذاتية من تصميمي.png",
    alt: "نموذج سيرة ذاتية 2",
  },
];

export default function TemplatesGrid() {
  return (
    <NestedPageLayout title="اختــار قالــب">
      <div className="h-[calc(100vh)] overflow-y-auto pr-4 [&::-webkit-scrollbar]:w-[13px] [&::-webkit-scrollbar]:bg-[#F1EDF6] [&::-webkit-scrollbar]:rounded-lg [&::-webkit-scrollbar-thumb]:bg-second [&::-webkit-scrollbar-thumb]:rounded-lg">
        <div className="flex flex-wrap justify-center gap-6">
          {templates.map((template) => (
            <div
              key={template.id}
              className="w-[190px] h-[300px] border border-text cursor-pointer hover:border-second transition-colors"
            >
              <Image
                src={template.image}
                alt={template.alt}
                width={206}
                height={292}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </NestedPageLayout>
  );
}
