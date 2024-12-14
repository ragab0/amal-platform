"use client";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { referencesSchema } from "@/validations/references";
import { AnimatePresence } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/hooks/ReduxHooks";
import { updateCV } from "@/store/features/cvs/cvsThunks";
import { toast } from "react-toastify";
import { HoverCvPreviewCard } from "@/components/motion/MotionWrappers";
import FormInput from "@/components/formInput/FormInput";
import ActionButtons from "@/components/buttons/ActionButtons";
import FormActions from "@/components/buttons/FormActions";
import AddButton from "@/components/buttons/AddButton";
import Demand from "./components/Demand";

export default function References() {
  const dispatch = useAppDispatch();
  const [editingId, setEditingId] = useState(null);
  const pageRef = useRef(null);
  const {
    myCV: { references = [] },
    loading,
  } = useAppSelector((state) => state.cvs);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(referencesSchema),
  });

  async function handleDelete(targetId) {
    const updatedReferences = references.filter((ref) => ref._id !== targetId);
    const { payload, error } = await dispatch(
      updateCV({ references: updatedReferences })
    );

    if (!error && payload?.status === "success") {
      toast.success("تم حذف المرجع بنجاح");
    } else {
      toast.error("فشل حذف المرجع");
    }
  }

  function handleEdit(reference) {
    setEditingId(reference._id);
    reset(reference);
  }

  function handleCancel() {
    setEditingId(null);
    reset();
  }

  async function onSubmit(data) {
    let updatedReferences;
    if (editingId) {
      updatedReferences = references.map((ref) =>
        ref._id === editingId ? { ...ref, ...data } : ref
      );
    } else {
      updatedReferences = [...references, { ...data, _id: undefined }];
    }

    const { payload, error } = await dispatch(
      updateCV({ references: updatedReferences })
    );

    if (!error && payload?.status === "success") {
      setEditingId(null);
      reset();
      toast.success(
        editingId ? "تم تحديث المرجع بنجاح" : "تمت إضافة المرجع بنجاح"
      );
    } else {
      toast.error(editingId ? "فشل تحديث المرجع" : "فشل إضافة المرجع");
    }
  }

  const showForm = references.length === 0 || editingId !== null;

  return (
    <div
      className="flex flex-col items-center w-full max-w-[800px] mx-auto"
      ref={pageRef}
      style={loading ? { pointerEvents: "none", opacity: 0.7 } : {}}
    >
      <h1 className="heading-big">المراجع</h1>
      <Demand />
      {!showForm && (
        <>
          <div className="w-full space-y-6">
            <AnimatePresence>
              {references.map((ref, index) => (
                <HoverCvPreviewCard key={ref._id} index={index}>
                  {/* Header */}
                  <div className="flex justify-between items-center mb-3 pb-5 border-b border-text">
                    <h3 className="heading-h3 font-semibold">المرجع</h3>
                    <ActionButtons
                      onEdit={() => handleEdit(ref)}
                      onDelete={() => handleDelete(ref._id)}
                    />
                  </div>

                  {/* Info */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="heading-h3 font-semibold">
                        {ref.fullName}
                      </h3>
                      <h4 className="heading-h4">{ref.company}</h4>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-text">
                    <h4 className="heading-h4">{ref.email}</h4>
                    <h4 className="heading-h4">{ref.phone}</h4>
                  </div>
                </HoverCvPreviewCard>
              ))}
            </AnimatePresence>
          </div>

          {/* Add Reference Button */}
          <AddButton onClick={() => setEditingId(0)} text="إضافة مرجع جديد" />
        </>
      )}

      {/* References Form */}
      {showForm && (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-8">
          {/* Single column fields */}
          <div className="space-y-8">
            <FormInput
              must={true}
              label="اسم الشخص (يمكن الاتصال به)"
              name="fullName"
              register={register}
              error={errors.fullName?.message}
            />
            <FormInput
              must={true}
              label="الشركة"
              name="company"
              register={register}
              error={errors.company?.message}
            />
          </div>

          {/* Two column fields */}
          <div className="grid grid-cols-2 gap-[10%]">
            <FormInput
              must={true}
              label="البريد الالكتروني"
              type="email"
              name="email"
              register={register}
              error={errors.email?.message}
            />
            <FormInput
              must={true}
              label="رقم الهاتف"
              name="phone"
              register={register}
              error={errors.phone?.message}
            />
          </div>

          {/* Form Actions */}
          <FormActions
            editingId={editingId}
            onCancel={handleCancel}
            showCancelButton={references.length > 0}
            submitText={editingId ? "تحديث المرجع" : "إضافة مرجع"}
          />
        </form>
      )}
    </div>
  );
}
