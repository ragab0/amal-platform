"use client";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { experienceSchema } from "@/validations/experience";
import { motion, AnimatePresence } from "framer-motion";
import FormInput from "@/app/cv/components/FormInput";
import MarkdownEditor, { MDPreview } from "@/app/cv/components/MarkdownEditor";
import DeleteIcon from "@/assets/icons/DeleteIcon";
import EditIcon from "@/assets/icons/EditIcon";
import MoreIcon from "@/assets/icons/MoreIcon";

export default function Experience() {
  const [experiences, setExperiences] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const pageRef = useRef(null);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(experienceSchema),
  });

  function handleDelete(id) {
    setExperiences(experiences.filter((exp) => exp.id !== id));
  }

  function handleEdit(experience) {
    setEditingId(experience.id);
    reset(experience); // default values;
  }

  function handleCancel() {
    setEditingId(null);
    reset();
  }

  function onSubmit(data) {
    if (editingId) {
      setExperiences(
        experiences.map((exp) => (exp.id === editingId ? data : exp))
      );
    } else {
      const newExp = { ...data, id: Date.now() };
      setExperiences([...experiences, newExp]);
    }
    setEditingId(null);
    reset();
  }

  function handleDescriptionClick(exp) {
    handleEdit(exp);
    setTimeout(() => {
      const t = pageRef.current.querySelector("textarea");
      t.focus();
      t.scrollIntoView({ behavior: "smooth" });
    }, 0);
  }

  const showForm = experiences.length === 0 || editingId !== null;
  console.log(experiences);

  return (
    <div
      className="flex flex-col items-center w-full max-w-[800px] mx-auto"
      ref={pageRef}
    >
      <h1 className="heading-big mb-12">الخبرات المهنية</h1>
      {!showForm && (
        <>
          {/* Experience Cards */}
          <div className="w-full space-y-6">
            <AnimatePresence>
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                  className="bg-white border border-text rounded-[6px] p-[24px_40px]"
                >
                  {/* Header */}
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex gap-4 items-center">
                      <h3 className="heading-h3 font-semibold">
                        {exp.jobTitle}
                      </h3>
                      <h4 className="heading-h4">{exp.company}</h4>
                    </div>
                    <div className="flex items-center gap-4">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => handleDelete(exp.id)}
                        className="text-text hover:text-red-500 transition-colors"
                      >
                        <DeleteIcon />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => handleEdit(exp)}
                        className="text-text hover:text-green-500 transition-colors"
                      >
                        <EditIcon />
                      </motion.button>
                    </div>
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
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Add Experience Button */}
          <button
            onClick={() => setEditingId(0)}
            className="btn-secondary w-full flex items-center justify-center gap-2 mt-8 text-xl"
          >
            <MoreIcon className="w-7 h-7 p-2 bg-white text-second rounded-full" />
            إضافة تجربة عمل أخرى
          </button>
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

          <div className="w-full">
            <MarkdownEditor
              label="الوصف"
              name="description"
              control={control}
              error={errors.description?.message}
              placeholder="اكتب وصفاً مختصراً عن دورك ومسؤولياتك..."
            />
          </div>

          {/* Form Buttons */}
          <div className="flex justify-center gap-4">
            <button type="submit" className="btn-secondary mx-0 w-full">
              {editingId ? "تعديل" : "إضافة تجربة عمل"}
            </button>
            {experiences.length > 0 && (
              <button
                type="button"
                onClick={handleCancel}
                className="btn-secondary-outline mx-0"
              >
                إلغاء
              </button>
            )}
          </div>
        </form>
      )}
    </div>
  );
}
