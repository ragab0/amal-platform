"use client";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { educationSchema } from "@/validations/education";
import { AnimatePresence } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/hooks/ReduxHooks";
import { updateCV } from "@/store/features/cvs/cvsThunks";
import { toast } from "react-toastify";
import { HoverCvPreviewCard } from "@/components/motion/MotionWrappers";
import FormInput from "@/components/formInput/FormInput";
import FormSelect from "@/components/formSelect/FormSelect";
import ActionButtons from "@/components/buttons/ActionButtons";
import FormActions from "@/components/buttons/FormActions";
import AddButton from "@/components/buttons/AddButton";
import DraftEditor from "../components/draft/DraftEditor";
import DraftPreview from "../components/draft/DraftPreview";
import getLocalDate from "@/utils/getLocalDate";
import AddDescriptionBtn from "../components/AddDescriptionBtn";

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
    watch,
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
    reset({
      ...edu,
      graduationDate: getLocalDate(edu.graduationDate),
    });
  }

  function handleCancel() {
    setEditingId(null);
    reset();
  }

  function handleCopy(education) {
    const newEducation = { ...education, _id: undefined };
    const updatedEducations = [
      ...educations.slice(0, educations.indexOf(education) + 1),
      newEducation,
      ...educations.slice(educations.indexOf(education) + 1),
    ];

    dispatch(updateCV({ educations: updatedEducations }));
  }

  function handleMove(direction, currentIndex) {
    const newIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;

    if (
      (direction === "up" && currentIndex > 0) ||
      (direction === "down" && currentIndex < educations.length - 1)
    ) {
      const updatedEducations = [...educations];
      const temp = updatedEducations[currentIndex];
      updatedEducations[currentIndex] = updatedEducations[newIndex];
      updatedEducations[newIndex] = temp;

      dispatch(updateCV({ educations: updatedEducations }));
    }
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
      <h1 className="heading-big">التعليـم والمؤهلات</h1>
      {!showForm && (
        <>
          {/* Educations Cards */}
          <div className="w-full space-y-6">
            <AnimatePresence mode="sync">
              {educations.map((edu, index) => (
                <HoverCvPreviewCard key={edu._id} index={index}>
                  {/* Header */}
                  <div className="flex justify-between items-center mb-3 pb-5 border-b border-text">
                    <h3 className="heading-h3 font-semibold">المؤهل العلمي</h3>
                    <ActionButtons
                      onEdit={() => handleEdit(edu)}
                      onDelete={() => handleDelete(edu._id)}
                      onCopy={() => handleCopy(edu)}
                      onMoveUp={() => handleMove("up", index)}
                      onMoveDown={() => handleMove("down", index)}
                      isFirst={index === 0}
                      isLast={index === educations.length - 1}
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
                    {edu.description ? (
                      <div className="mt-6 text-text">
                        <DraftPreview
                          title="وصف المؤهل العلمي"
                          source={edu.description}
                        />
                      </div>
                    ) : (
                      <AddDescriptionBtn
                        pageRef={pageRef}
                        handleEdit={handleEdit}
                        item={edu}
                      />
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
              defaultOption={
                console.log(
                  "EEEEEEEEEee",
                  editingId,
                  educations.find((edu) => edu._id === editingId)
                ) || editingId
                  ? educations.find((edu) => edu._id === editingId)?.degree
                  : "اختر..."
              }
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
            title="وصف المؤهل العلمي"
            name="description"
            control={control}
            error={errors.description?.message}
            placeholder="اكتب وصفاً مختصراً عن دراستك"
            aiPrompt={{
              type: "education",
              data: {
                field: watch("field"),
                city: watch("city"),
                country: watch("country"),
                degree: watch("degree"),
                graduationDate: watch("graduationDate"),
                institute: watch("institute"),
              },
            }}
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
