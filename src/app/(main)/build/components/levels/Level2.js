"use client";
import Image from "next/image";
import aliasUpload from "@/assets/imgs/cv/aliasUpload.png";
import { useDropzone } from "react-dropzone";
import { useCallback } from "react";

export default function Level2({ register, errors, cvChoice, setValue }) {
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

  function handleLinkedIn() {
    window.open(process.env.NEXT_PUBLIC_LINKEDIN_URL, "mozillaWindow", "popup");
  }

  return (
    <div className="flex flex-col items-center">
      <Image
        src={aliasUpload}
        alt="رفع السيرة الذاتية"
        width={"auto"}
        height={"auto"}
        className="object-contain mx-auto"
      />
      <div className="w-full max-w-2xl mt-16">
        {cvChoice === "cv" ? (
          <>
            <h1 className="text-4xl font-semibold mb-12 text-center text-gray-900">
              ممتاز ,ارفع السيرة الذاتية للبدأ
            </h1>
            <div
              {...getRootProps()}
              className={`border-2 border-dashed border-main rounded-3xl bg-gray-50 p-8 text-center cursor-pointer transition-colors
                ${
                  isDragActive
                    ? "border-main ring-8 ring-green-500/20 transition-all duration-300 bg-gray-100"
                    : ""
                }`}
            >
              <input {...getInputProps()} {...register("cvFile")}>
                <button type="button" className="btn-build-main mt-4 w-full">
                  اختيار ملف
                </button>
              </input>
              <p className="text-neutral-6 text-xl font-medium">
                {isDragActive
                  ? "اترك الملف هنا..."
                  : "اسحب وأفلت ملف السيرة الذاتية هنا، أو انقر للاختيار"}
              </p>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-semibold mb-12 text-center text-gray-900">
              ربط حساب LinkedIn
            </h1>
            <button
              type="button"
              onClick={handleLinkedIn}
              className="btn-build-main mt-6 w-full"
            >
              ربط الحساب
            </button>
          </>
        )}
        {errors.cvFile && (
          <p className="mt-2 text-red-500 text-sm text-right">
            {errors.cvFile.message}
          </p>
        )}
        {errors.linkedinUrl && (
          <p className="mt-2 text-red-500 text-sm text-right">
            {errors.linkedinUrl.message}
          </p>
        )}
      </div>
    </div>
  );
}
