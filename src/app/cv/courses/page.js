"use client";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { coursesSchema } from "@/validations/cv/coursesSchema";
import { motion, AnimatePresence } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/hooks/ReduxHooks";
import { updateCV } from "@/store/features/cvs/cvsThunks";
import { toast } from "react-toastify";
import { HoverCvPreviewCard } from "@/components/motion/MotionWrappers";
import FormActions from "@/components/buttons/FormActions";
import AddButton from "@/components/buttons/AddButton";
import ActionButtons from "@/components/buttons/ActionButtons";
import FormInput from "@/components/formInput/FormInput";
import MoreIcon from "@/assets/icons/MoreIcon";
import DraftEditor from "../components/draft/DraftEditor";
import DraftPreview from "../components/draft/DraftPreview";
import getLocalDate from "@/utils/getLocalDate";

export default function Courses() {
  const dispatch = useAppDispatch();
  const [editingId, setEditingId] = useState(null);
  const pageRef = useRef(null);
  const {
    myCV: { courses = [] },
    loading,
  } = useAppSelector((state) => state.cvs);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(coursesSchema),
  });

  async function handleDelete(targetId) {
    const updatedCourses = courses.filter((course) => course._id !== targetId);
    const { payload, error } = await dispatch(
      updateCV({ courses: updatedCourses })
    );

    if (!error && payload?.status === "success") {
      toast.success("تم حذف الدورة بنجاح");
    } else {
      toast.error("فشل حذف الدورة");
    }
  }

  function handleEdit(course) {
    setEditingId(course._id);
    reset({
      ...course,
      startDate: getLocalDate(course.startDate),
      endDate: getLocalDate(course.endDate),
    });
  }

  function handleCancel() {
    setEditingId(null);
    reset();
  }

  async function onSubmit(data) {
    let updatedCourses;
    if (editingId) {
      updatedCourses = courses.map((course) =>
        course._id === editingId ? { ...course, ...data } : course
      );
    } else {
      updatedCourses = [...courses, data];
    }

    const { payload, error } = await dispatch(
      updateCV({ courses: updatedCourses })
    );

    if (!error && payload?.status === "success") {
      setEditingId(null);
      reset();
      toast.success(
        editingId ? "تم تحديث الدورة بنجاح" : "تمت إضافة الدورة بنجاح"
      );
    } else {
      toast.error("فشل حفظ الدورة");
    }
  }

  function handleDescriptionClick(course) {
    handleEdit(course);
    setTimeout(() => {
      const t = pageRef.current.querySelector("textarea");
      t?.focus();
      t?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }

  function handleCopy(course) {
    const newCourse = { ...course, _id: undefined };
    const updatedCourses = [
      ...courses.slice(0, courses.indexOf(course) + 1),
      newCourse,
      ...courses.slice(courses.indexOf(course) + 1),
    ];

    dispatch(updateCV({ courses: updatedCourses }));
  }

  function handleMove(direction, currentIndex) {
    const newIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;

    if (
      (direction === "up" && currentIndex > 0) ||
      (direction === "down" && currentIndex < courses.length - 1)
    ) {
      const updatedCourses = [...courses];
      const temp = updatedCourses[currentIndex];
      updatedCourses[currentIndex] = updatedCourses[newIndex];
      updatedCourses[newIndex] = temp;

      dispatch(updateCV({ courses: updatedCourses }));
    }
  }

  const showForm = courses.length === 0 || editingId !== null;

  return (
    <div
      className="flex flex-col items-center w-full max-w-[800px] mx-auto"
      ref={pageRef}
      style={loading ? { pointerEvents: "none", opacity: 0.7 } : {}}
    >
      <h1 className="heading-big">الدورات التدريبية</h1>
      {!showForm && (
        <>
          {/* Courses Cards */}
          <div className="w-full space-y-6">
            <AnimatePresence mode="sync">
              {courses.map((course, index) => (
                <HoverCvPreviewCard key={course._id} index={index}>
                  {/* Header */}
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex gap-4 items-center">
                      <h3 className="heading-h3 font-semibold">
                        {course.courseName}
                      </h3>
                      <h4 className="heading-h4">{course.instituteName}</h4>
                    </div>
                    <ActionButtons
                      onDelete={() => handleDelete(course._id)}
                      onEdit={() => handleEdit(course)}
                      onCopy={() => handleCopy(course)}
                      onMoveUp={() => handleMove("up", index)}
                      onMoveDown={() => handleMove("down", index)}
                      isFirst={index === 0}
                      isLast={index === courses.length - 1}
                    />
                  </div>

                  {/* Info */}
                  <div className="pb-5 border-b border-text">
                    <div className="flex items-center gap-4 text-text">
                      <time>
                        {course.startDate && getLocalDate(course.startDate)}{" "}
                        <span className="mx-2">-</span>
                        {course.endDate && getLocalDate(course.endDate)}
                      </time>
                    </div>
                  </div>

                  {/* Description or Add Details Button */}
                  {course.description ? (
                    <div className="mt-6 text-text">
                      <DraftPreview
                        title="وصف الدورة"
                        source={course.description}
                      />
                    </div>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                      onClick={() => handleDescriptionClick(course)}
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

          {/* Add Course Button */}
          <AddButton
            onClick={() => setEditingId(0)}
            text="إضافة دورة تدريبية جديدة"
          />
        </>
      )}

      {/* Course Form */}
      {showForm && (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-8">
          {/* Single column fields */}
          <div className="space-y-8">
            <FormInput
              must={true}
              label="اسم الدورة"
              name="courseName"
              register={register}
              error={errors.courseName?.message}
            />
            <FormInput
              must={true}
              label="المعهد/المؤسسة"
              name="instituteName"
              register={register}
              error={errors.instituteName?.message}
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
              spaceBlock={false}
            />
            <FormInput
              must={true}
              label="تاريخ النهاية"
              type="date"
              name="endDate"
              register={register}
              error={errors.endDate?.message}
              spaceBlock={false}
            />
          </div>

          {/* Description field */}
          <DraftEditor
            name="description"
            control={control}
            error={errors.description?.message}
            placeholder="اكتب وصفاً مختصراً عن الدورة..."
          />

          {/* Form Actions */}
          <FormActions
            editingId={editingId}
            onCancel={handleCancel}
            showCancelButton={courses.length > 0}
            submitText={editingId ? "تحديث الدورة التدريبية" : "إضافة دورة تدريبية"}
          />
        </form>
      )}
    </div>
  );
}
