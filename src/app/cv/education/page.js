"use client";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { educationSchema } from "@/validations/education";
import { motion, AnimatePresence } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/hooks/ReduxHooks";
import { updateCV } from "@/store/features/cvs/cvsThunks";
import { toast } from "react-toastify";
import FormInput from "@/components/formInput/FormInput";
import FormSelect from "@/app/cv/components/FormSelect";
import DraftEditor from "@/app/cv/components/DraftEditor";
import ActionButtons from "@/components/buttons/ActionButtons";
import FormActions from "@/components/buttons/FormActions";
import AddButton from "@/components/buttons/AddButton";
import { HoverCvPreviewCard } from "@/components/motion/MotionWrappers";

const degreeOptions = [
  "دكتوراه",
  "ماجستير",
  "بكالوريوس",
  "دبلوم",
  "ثانوية عامة",
  "أخرى",
];

export default function Education() {
  const dispatch = useAppDispatch();
  const [editingId, setEditingId] = useState(null);
  const pageRef = useRef(null);
  const {
    myCV: { educations = [] },
    loading,
  } = useAppSelector((state) => state.cvs);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(educationSchema),
  });

  async function handleDelete(targetId) {
    const updatedEducations = educations.filter((edu) => edu._id !== targetId);
    const { payload, error } = await dispatch(
      updateCV({ educations: updatedEducations })
    );

    if (!error && payload?.status === "success") {
      toast.success("تم حذف المؤهل الدراسي بنجاح");
    } else {
      toast.error("فشل حذف المؤهل الدراسي");
    }
  }

  function handleEdit(edu) {
    setEditingId(edu._id);
    reset(edu);
  }

  function handleCancel() {
    setEditingId(null);
    reset();
  }

  async function onSubmit(data) {
    let updatedEducations;
    if (editingId) {
      updatedEducations = educations.map((edu) =>
        edu._id === editingId ? { ...edu, ...data } : edu
      );
    } else {
      updatedEducations = [...educations, { ...data, _id: undefined }];
    }

    const { payload, error } = await dispatch(
      updateCV({ educations: updatedEducations })
    );

    if (!error && payload?.status === "success") {
      setEditingId(null);
      reset();
      toast.success(
        editingId
          ? "تم تحديث المؤهل الدراسي بنجاح"
          : "تمت إضافة المؤهل الدراسي بنجاح"
      );
    } else {
      toast.error(
        editingId ? "فشل تحديث المؤهل الدراسي" : "فشل إضافة المؤهل الدراسي"
      );
    }
  }

  const showForm = educations.length === 0 || editingId !== null;

  return (
    <div
      className="flex flex-col items-center w-full max-w-[800px] mx-auto"
      ref={pageRef}
      style={loading ? { pointerEvents: "none", opacity: 0.7 } : {}}
    >
      <h1 className="heading-big">التعليــــم والمؤهلات</h1>
      {!showForm && (
        <>
          {/* Educations Cards */}
          <div className="w-full space-y-6">
            <AnimatePresence>
              {educations.map((edu, index) => (
                <HoverCvPreviewCard key={edu._id} index={index}>
                  {/* Header */}
                  <div className="flex justify-between items-center mb-3 pb-5 border-b border-text">
                    <h3 className="heading-h3 font-semibold">المؤهل العلمي</h3>
                    <ActionButtons
                      onEdit={() => handleEdit(edu)}
                      onDelete={() => handleDelete(edu._id)}
                    />
                  </div>

                  {/* Info */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="heading-h3 font-semibold">{edu.field}</h3>
                      <h4 className="heading-h4">{edu.institute}</h4>
                    </div>
                    <div className="flex items-center gap-4 text-text">
                      <h4 className="heading-h4">
                        {edu.city}، {edu.country}
                      </h4>
                    </div>
                    <div className="flex items-center gap-4 text-text">
                      <h4 className="heading-h4">{edu.degree}</h4>
                      <time>
                        {edu.graduationDate &&
                          new Date(edu.graduationDate).toLocaleDateString("ar")}
                      </time>
                    </div>
                    {edu.description && (
                      <div className="mt-6 text-text" data-color-mode="light">
                        <DraftEditor source={edu.description} />
                      </div>
                    )}
                  </div>
                </HoverCvPreviewCard>
              ))}
            </AnimatePresence>
          </div>

          {/* Add Education Button */}
          <AddButton
            onClick={() => setEditingId(0)}
            text="إضافة مؤهل علمي جديد"
          />
        </>
      )}

      {/* Education Form */}
      {showForm && (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-8">
          {/* Single column fields */}
          <div className="space-y-8">
            <FormInput
              must={true}
              label="المجال العلمي"
              name="field"
              register={register}
              error={errors.field?.message}
            />
            <FormInput
              must={true}
              label="المعهد (جامعة، مدرسة)"
              name="institute"
              register={register}
              error={errors.institute?.message}
            />
          </div>

          {/* Two column fields */}
          <div className="grid grid-cols-2 gap-[10%]">
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
            <FormSelect
              must={true}
              label="الدرجة العلمية"
              name="degree"
              options={degreeOptions}
              register={register}
              error={errors.degree?.message}
            />
            <FormInput
              must={true}
              label="تاريخ التخرج"
              type="date"
              name="graduationDate"
              register={register}
              error={errors.graduationDate?.message}
            />
          </div>

          {/* Description field */}
          <DraftEditor
            label="الوصف"
            name="description"
            control={control}
            error={errors.description?.message}
            placeholder="اكتب وصفاً للمؤهل العلمي..."
          />

          {/* Form Actions */}
          <FormActions
            editingId={editingId}
            onCancel={handleCancel}
            showCancelButton={educations.length > 0}
            submitText={editingId ? "تحديث المؤهل العلمي" : "إضافة مؤهل علمي"}
          />
        </form>
      )}
    </div>
  );
}
