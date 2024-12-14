"use client";
import { useState } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import { useAppSelector } from "@/hooks/ReduxHooks";
import Template1 from "./templates/Template1";

export default function ResumeBar() {
  const { myCV } = useAppSelector((state) => state.cvs);
  const [selectedTemplate, setSelectedTemplate] = useState("template1");

  return (
    <div className="resume-bar">
      <div className="w-full h-[calc(100vh-100px)] bg-white rounded-lg shadow-sm">
        <PDFViewer width="100%" height="100%" className="rounded-lg">
          <Template1 data={myCV} />
        </PDFViewer>
      </div>
      <h3 className="text-second text-center heading-h3 py-5">
        تغييـــــــر القـــــــالـب
      </h3>
    </div>
  );
}
