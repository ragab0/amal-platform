"use client";
import Image from "next/image";
import DefaultResume from "@/assets/imgs/defaultResume.png";

export default function ResumeBar() {
  return (
    <div className="resume-bar">
      <Image src={DefaultResume} alt="Default Resume" />
      <h3 className="text-second text-center heading-h3 py-5">
        تغييـــــــر القـــــــالـب
      </h3>
    </div>
  );
}
