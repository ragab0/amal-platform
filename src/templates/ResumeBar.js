"use client";
import { PDFViewer } from "@react-pdf/renderer";
import { useAppSelector } from "@/hooks/ReduxHooks";
import Template1 from "./temp/Template1";

export default function ResumeBar() {
  const { myCV } = useAppSelector((state) => state.cvs);

  return (
    <div className="resume-bar h-full">
      <div className="w-full h-full rounded-lg shadow-md mb-4">
        <PDFViewer width="100%" height="100%" className="rounded-lg">
          {/* <Template1 data={myCV} /> */}
        </PDFViewer>
      </div>
      <h3 className="text-second text-center heading-h3 underline hover:opacity-70 cursor-pointer">
        تغييـــــــر القـــــــالـب
      </h3>
    </div>
  );
}
