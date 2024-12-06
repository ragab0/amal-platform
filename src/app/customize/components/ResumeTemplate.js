"use client";
import Image from "next/image";
import ResumeImg from "@/assets/imgs/defaultResume.png";

export default function ResumeTemplate() {
  return (
    <Image
      src={ResumeImg}
      alt="Resume Preview"
      className="w-full h-full"
      priority
    />
  );
}
