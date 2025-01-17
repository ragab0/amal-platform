"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/hooks/ReduxHooks";
import { updateCV } from "@/store/features/cvs/cvsThunks";
import { toast } from "react-toastify";
import DraftEditor from "../components/draft/DraftEditor";
import DraftPreview from "../components/draft/DraftPreview";
import FormActions from "@/components/buttons/FormActions";

export default function AboutPage() {
  const dispatch = useAppDispatch();
  const {
    myCV: { personalInfo = {} },
    loading,
  } = useAppSelector((state) => state.cvs);
  const [isEditing, setIsEditing] = useState(false);

  const {
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    defaultValues: {
      description: personalInfo.description || "",
    },
  });

  async function onSubmit(data) {
    const { payload, error } = await dispatch(
      updateCV({
        personalInfo: {
          ...personalInfo,
          description: data.description,
        },
      })
    );

    if (!error && payload?.status === "success") {
      setIsEditing(false);
      toast.success("تم حفظ الوصف بنجاح");
    } else {
      toast.error("فشل حفظ الوصف الشخصي");
    }
  }

  function handleCancel() {
    setIsEditing(false);
    reset();
  }

  return (
    <div
      className="flex flex-col items-center w-full max-w-[800px] mx-auto"
      style={loading ? { pointerEvents: "none", opacity: 0.7 } : {}}
    >
      <h1 className="heading-big mb-[120px]">الوصــف الشخصي</h1>
      {isEditing ? (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-8">
          <DraftEditor
            title="الوصف الشخصي"
            name="description"
            control={control}
            error={errors.description?.message}
            placeholder="اكتب وصفك الشخصي هنا..."
            aiPrompt={{
              type: "about",
              data: {},
            }}
          />
          <FormActions
            onCancel={handleCancel}
            submitText="حفظ"
            cancelText="إلغاء"
            className="w-full"
            showCancelButton={personalInfo.description}
          />
        </form>
      ) : (
        <>
          <DraftPreview
            title="الوصف الشخصي"
            source={personalInfo.description}
            inContainer={true}
          />
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="btn-secondary w-full mt-8"
            disabled={loading}
          >
            تعديل الوصف الشخصي
          </button>
        </>
      )}
    </div>
  );
}
