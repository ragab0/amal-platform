"use client";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/ReduxHooks";
import { updateCV } from "@/store/features/cvs/cvsThunks";
import { toast } from "react-toastify";
import DraftEditor, { DraftPreview } from "../components/DraftEditor";
import FormActions from "@/components/buttons/FormActions";

export default function AboutPage() {
  const dispatch = useAppDispatch();
  const {
    myCV: { personalInfo = {} },
    loading,
  } = useAppSelector((state) => state.cvs);
  const [isEditing, setIsEditing] = useState(!personalInfo.description);
  const [description, setDescription] = useState(
    personalInfo.description || ""
  );

  async function handleSubmit(e) {
    e?.preventDefault();
    const { payload, error } = await dispatch(
      updateCV({
        personalInfo: {
          ...personalInfo,
          description,
        },
      })
    );

    if (!error && payload?.status === "success") {
      toast.success("تم تحديث الوصف الشخصي بنجاح");
      setIsEditing(false);
    } else {
      toast.error("فشل تحديث الوصف الشخصي");
    }
  }

  function handleCancel() {
    setDescription(personalInfo.description || "");
    setIsEditing(false);
  }

  return (
    <div
      className="flex flex-col items-center w-full max-w-[800px] mx-auto"
      style={loading ? { pointerEvents: "none", opacity: 0.7 } : {}}
    >
      <h1 className="heading-big mb-[120px]">الوصــف الشخصي</h1>
      {isEditing ? (
        <form onSubmit={handleSubmit} className="w-full">
          <DraftEditor
            label="الوصف الشخصي"
            value={description}
            onChange={setDescription}
            placeholder="اكتب وصفك الشخصي هنا..."
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
          <DraftPreview content={personalInfo.description} />
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
