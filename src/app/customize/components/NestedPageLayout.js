"use client";
import CloseIcon from "@/assets/icons/CloseIcon";

export default function NestedPageLayout({ title, children }) {
  return (
    <div className="p-6">
      <div className="flex flex-col gap-0 mb-10">
        <button className="p-2 me-auto text-second flex items-center justify-center rounded">
          <CloseIcon />
        </button>
        <h1 className="text-[24px] leading-[32px] font-cairo font-bold text-second w-full text-center">
          {title}
        </h1>
      </div>
      {children}
    </div>
  );
}
