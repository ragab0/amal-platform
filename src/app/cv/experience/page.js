"use client";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { experienceSchema } from "@/validations/experience";
import { motion, AnimatePresence, delay } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/hooks/ReduxHooks";
import { updateCV } from "@/store/features/cvs/cvsThunks";
import { toast } from "react-toastify";
import { HoverCvPreviewCard } from "@/components/motion/MotionWrappers";
import MarkdownEditor, { MDPreview } from "../components/MarkdownEditor";
import FormActions from "@/components/buttons/FormActions";
import AddButton from "@/components/buttons/AddButton";
import ActionButtons from "@/components/buttons/ActionButtons";
import FormInput from "@/components/formInput/FormInput";
import MoreIcon from "@/assets/icons/MoreIcon";

export default function Experience() {
  const dispatch = useAppDispatch();
  const [editingId, setEditingId] = useState(null);
  const pageRef = useRef(null);
  const {
    myCV: { experiences = [] },
    loading,
  } = useAppSelector((state) => state.cvs);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(experienceSchema),
  });

  async function handleDelete(targetId) {
    const updatedExperiences = experiences.filter(
      (exp) => exp._id !== targetId
    );
    const { payload, error } = await dispatch(
      updateCV({ experiences: updatedExperiences })
    );

    if (!error && payload?.status === "success") {
      toast.success("تم حذف الخبرة بنجاح");
    } else {
      toast.error("فشل حذف الخبرة");
    }
  }

  function handleEdit(experience) {
    setEditingId(experience._id);
    reset(experience);
  }

  function handleCancel() {
    setEditingId(null);
    reset();
  }

  async function onSubmit(data) {
    let updatedExperiences;
    if (editingId) {
      updatedExperiences = experiences.map((exp) =>
        exp._id === editingId ? { ...exp, ...data } : exp
      );
    } else {
      updatedExperiences = [...experiences, { ...data, _id: undefined }];
    }

    const { payload, error } = await dispatch(
      updateCV({ experiences: updatedExperiences })
    );

    if (!error && payload?.status === "success") {
      setEditingId(null);
      reset();
      toast.success(
        editingId ? "تم تحديث الخبرة بنجاح" : "تمت إضافة الخبرة بنجاح"
      );
    } else {
      toast.error(editingId ? "فشل تحديث الخبرة" : "فشل إضافة الخبرة");
    }
  }

  function handleDescriptionClick(exp) {
    handleEdit(exp);
    setTimeout(() => {
      const t = pageRef.current.querySelector("textarea");
      t?.focus();
      t?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }

  const showForm = experiences.length === 0 || editingId !== null;

  return (
    <div
      className="flex flex-col items-center w-full max-w-[800px] mx-auto"
      ref={pageRef}
      style={loading ? { pointerEvents: "none", opacity: 0.7 } : {}}
    >
      <h1 className="heading-big">الخبرات المهنية</h1>
      {!showForm && (
        <>
          {/* Experiences Cards */}
          <div className="w-full space-y-6">
            <AnimatePresence>
              {experiences.map((exp, index) => (
                <HoverCvPreviewCard key={exp._id} index={index}>
                  {/* Header */}
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex gap-4 items-center">
                      <h3 className="heading-h3 font-semibold">
                        {exp.jobTitle}
                      </h3>
                      <h4 className="heading-h4">{exp.company}</h4>
                    </div>
                    <ActionButtons
                      onDelete={() => handleDelete(exp._id)}
                      onEdit={() => handleEdit(exp)}
                    />
                  </div>

                  {/* Info */}
                  <div className="pb-5 border-b border-text">
                    <div className="flex items-center gap-4 text-text">
                      <h4 className="heading-h4">
                        {exp.city}، {exp.country}
                      </h4>
                      <time>
                        {exp.startDate &&
                          new Date(exp.startDate).toLocaleDateString()}{" "}
                        <span className="mx-2">-</span>
                        {exp.endDate &&
                          new Date(exp.endDate).toLocaleDateString()}
                      </time>
                    </div>
                  </div>

                  {/* Description or Add Details Button */}
                  {exp.description ? (
                    <div className="mt-6 text-text" data-color-mode="light">
                      <MDPreview source={exp.description} />
                    </div>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                      onClick={() => handleDescriptionClick(exp)}
                      className="flex items-center justify-center mx-auto gap-2 mt-6 text-text0"
                    >
                      <MoreIcon className="w-7 h-7 p-2 bg-text text-white rounded-full" />
                      إضافة وصف
                    </motion.button>
                  )}
                </HoverCvPreviewCard>
              ))}
            </AnimatePresence>
          </div>

          {/* Add Experience Button */}
          <AddButton
            onClick={() => setEditingId(0)}
            text="إضافة خبرة مهنية جديدة"
          />
        </>
      )}

      {/* Experience Form */}
      {showForm && (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-8">
          {/* Single column fields */}
          <div className="space-y-8">
            <FormInput
              must={true}
              label="اسم الوظيفة"
              name="jobTitle"
              register={register}
              error={errors.jobTitle?.message}
            />
            <FormInput
              must={true}
              label="الشركة"
              name="company"
              register={register}
              error={errors.company?.message}
            />
            <FormInput
              must={true}
              label="المدينة"
              name="city"
              register={register}
              error={errors.city?.message}
            />
            <FormInput
              must={true}
              label="الدولة"
              name="country"
              register={register}
              error={errors.country?.message}
            />
          </div>

          {/* Two column fields */}
          <div className="grid grid-cols-2 gap-[10%]">
            <FormInput
              must={true}
              label="تاريخ البداية"
              type="date"
              name="startDate"
              register={register}
              error={errors.startDate?.message}
            />
            <FormInput
              must={true}
              label="تاريخ النهاية"
              type="date"
              name="endDate"
              register={register}
              error={errors.endDate?.message}
            />
          </div>

          {/* Description field */}
          <MarkdownEditor
            label="الوصف"
            name="description"
            control={control}
            error={errors.description?.message}
            placeholder="اكتب وصفاً مختصراً عن دورك ومسؤولياتك..."
          />

          {/* Form Actions */}
          <FormActions
            editingId={editingId}
            onCancel={handleCancel}
            showCancelButton={experiences.length > 0}
            submitText={editingId ? "تحديث الخبرة المهنية" : "إضافة خبرة مهنية"}
          />
        </form>
      )}
    </div>
  );
}
