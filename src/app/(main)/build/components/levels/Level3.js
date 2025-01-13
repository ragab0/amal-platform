"use client";
import Image from "next/image";
import { templatesApi } from "@/assets/data/templatesData";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/ReduxHooks";
import { createCv } from "@/store/features/cvs/cvsThunks";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Level3() {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAppSelector((state) => state.auth);
  const [template, setTemplate] = useState(null);

  useEffect(() => {
    const temp = searchParams.get("template");
    if (temp) {
      setTemplate(temp);
    }
  }, [searchParams, setTemplate]);

  async function submitHandler() {
    const data = {
      personalInfo: {
        fullName: user.fname + " " + user.lname,
        headline: user.headline,
        photo: user.photo,
        phone: user.phone,
        email: user.email,
      },
      options: {
        templateId: template,
      },
    };

    const { payload, error } = await dispatch(createCv(data));
    if (!error && payload?.status === "success") {
      toast.success("تم انشاء السيرة الذاتية بنجاح");
      router.push(`/cv`);
      // router.push(`/cv/${payload.result._id}`);
    }
  }

  return (
    <div className="container mx-auto flex flex-col items-center">
      <div className="w-full">
        <h1 className="text-3xl font-semibold mb-12 text-center text-gray-900">
          اختر قالب السيرة الذاتية
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-[5%]">
          {templatesApi.map(({ id, category, image }) => (
            <div
              key={id}
              className={`relative cursor-pointer rounded-xl overflow-hidden transition-all duration-300
                border ring-main
                ${template === id ? "ring-8" : "hover:ring-2"}`}
              onClick={() => setTemplate(id)}
            >
              <Image
                src={image}
                alt={category}
                width={"auto"}
                height={"auto"}
                className="object-contain w-full mx-auto"
              />
              {/* <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
                <h3 className="text-lg font-medium text-center">
                  {category}
                </h3>
              </div> */}
            </div>
          ))}
        </div>

        <button
          onClick={submitHandler}
          disabled={!template}
          className="btn-build-main mt-12 !px-8 !py-4 w-full sm:w-auto mx-auto block"
          title="انشاء السيرة الذاتية"
        >
          إنشاء السيرة الذاتية
        </button>
      </div>
    </div>
  );
}
