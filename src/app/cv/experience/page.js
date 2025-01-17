"use client";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { experienceSchema } from "@/validations/experience";
import { AnimatePresence } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/hooks/ReduxHooks";
import { updateCV } from "@/store/features/cvs/cvsThunks";
import { toast } from "react-toastify";
import { HoverCvPreviewCard } from "@/components/motion/MotionWrappers";
import FormActions from "@/components/buttons/FormActions";
import AddButton from "@/components/buttons/AddButton";
import ActionButtons from "@/components/buttons/ActionButtons";
import FormInput from "@/components/formInput/FormInput";
import DraftEditor from "../components/draft/DraftEditor";
import DraftPreview from "../components/draft/DraftPreview";
import getLocalDate from "@/utils/getLocalDate";
import AddDescriptionBtn from "../components/AddDescriptionBtn";

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
    watch,
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
    reset({
      ...experience,
      startDate: getLocalDate(experience.startDate),
      endDate: getLocalDate(experience.endDate),
    });
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

  function handleCopy(experience) {
    const newExperience = { ...experience, _id: undefined };
    const updatedExperiences = [...experiences];
    updatedExperiences.splice(
      experiences.indexOf(experience) + 1,
      0,
      newExperience
    );
    dispatch(updateCV({ experiences: updatedExperiences }));
  }

  function handleMove(direction, currentIndex) {
    const newIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;

    if (
      (direction === "up" && currentIndex > 0) ||
      (direction === "down" && currentIndex < experiences.length - 1)
    ) {
      const updatedExperiences = [...experiences];
      const temp = { ...updatedExperiences[currentIndex] };
      updatedExperiences[currentIndex] = updatedExperiences[newIndex];
      updatedExperiences[newIndex] = temp;

      dispatch(updateCV({ experiences: updatedExperiences }));
    }
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
            <AnimatePresence mode="sync">
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
                      onCopy={() => handleCopy(exp)}
                      onMoveUp={() => handleMove("up", index)}
                      onMoveDown={() => handleMove("down", index)}
                      isFirst={index === 0}
                      isLast={index === experiences.length - 1}
                    />
                  </div>

                  {/* Info */}
                  <div className="pb-5 border-b border-text">
                    <div className="flex items-center gap-4 text-text">
                      <h4 className="heading-h4">
                        {exp.city}، {exp.country}
                      </h4>
                      <time>
                        {exp.startDate && getLocalDate(exp.startDate)}{" "}
                        <span className="mx-2">-</span>
                        {exp.endDate && getLocalDate(exp.endDate)}
                      </time>
                    </div>
                  </div>

                  {/* Description or Add Details Button */}
                  {exp.description ? (
                    <div className="mt-6 text-text">
                      <DraftPreview
                        title="وصف الوظيفة"
                        source={exp.description}
                      />
                    </div>
                  ) : (
                    <AddDescriptionBtn
                      pageRef={pageRef}
                      handleEdit={handleEdit}
                      item={exp}
                    />
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
          </div>

          {/* Two column fields */}
          <div className="grid sm:grid-cols-2 gap-[10%]">
            <FormInput
              must={true}
              label="المدينة"
              name="city"
              register={register}
              error={errors.city?.message}
              spaceBlock={false}
            />
            <FormInput
              must={true}
              label="الدولة"
              name="country"
              register={register}
              error={errors.country?.message}
              spaceBlock={false}
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-[10%]">
            <FormInput
              must={true}
              label="تاريخ البداية"
              type="date"
              name="startDate"
              register={register}
              error={errors.startDate?.message}
              spaceBlock={false}
            />
            {/* <FormInput
              must={true}
              label="تاريخ النهاية"
              type="date"
              name="endDate"
              register={register}
              error={errors.endDate?.message}
              spaceBlock={false}
              inpClassName=""
            >
              <label className="flex items-center justify-center flex-col ms-2">
                <input type="checkbox" {...register("present")} />
                <span className="text-text">حاليا</span>
              </label>
            </FormInput> */}
            <FormInput
              must={true}
              label="تاريخ النهاية"
              type="date"
              name="endDate"
              register={register}
              error={errors.endDate?.message}
              spaceBlock={false}
              inpClassName=""
            />
          </div>

          {/* Description field */}
          <DraftEditor
            name="description"
            control={control}
            error={errors.description?.message}
            placeholder="اكتب وصفاً مختصراً عن دورك ومسؤولياتك..."
            aiPrompt={{
              type: "experience",
              data: {
                jobTitle: watch("jobTitle"),
                company: watch("company"),
                city: watch("city"),
                country: watch("country"),
                startDate: watch("startDate"),
                endDate: watch("endDate"),
              },
            }}
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
