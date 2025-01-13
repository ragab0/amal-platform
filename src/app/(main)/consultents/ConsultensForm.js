"use client";
import aliasUpload from "@/assets/imgs/cv/aliasUpload.png";
import { useDropzone } from "react-dropzone";
import { useCallback } from "react";
import { useForm } from "react-hook-form";

export default function ConsultensForm() {
  const { setValue, register } = useForm();
  const onDrop = useCallback(
    (acceptedFiles) => {
      setValue("cvFile", acceptedFiles[0]);
    },
    [setValue]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },
    maxFiles: 1,
  });
  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed border-main rounded-3xl bg-gray-50 p-8 text-center cursor-pointer transition-colors
        relative
        ${
          isDragActive
            ? "border-main ring-8 ring-green-500/20 transition-all duration-300 bg-gray-100"
            : ""
        }`}
    >
      <label className="btn-build-main w-full h-full absolute top-0 left-0 cursor-pointer opacity-0">
        <input
          {...getInputProps()}
          {...register("cvFile")}
          placeholder="اختيار ملف"
        />
      </label>
      <p className="text-neutral-6 text-xl font-medium">
        {isDragActive
          ? "اترك الملف هنا..."
          : "اسحب وأفلت ملف السيرة الذاتية هنا، أو انقر للاختيار"}
      </p>
    </div>
  );
}
