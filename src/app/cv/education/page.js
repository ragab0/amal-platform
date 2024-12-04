"use client";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { motion, AnimatePresence } from "framer-motion";
import { educationSchema } from "@/validations/education";
import FormInput from "@/app/cv/components/FormInput";
import FormSelect from "@/app/cv/components/FormSelect";
import MarkdownEditor, { MDPreview } from "@/app/cv/components/MarkdownEditor";
import DeleteIcon from "@/assets/icons/DeleteIcon";
import EditIcon from "@/assets/icons/EditIcon";

const degreeOptions = [
  "دكتوراه",
  "ماجستير",
  "بكالوريوس",
  "دبلوم",
  "ثانوية عامة",
  "أخرى",
];

export default function Education() {
  const [educations, setEducations] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(true);
  const pageRef = useRef(null);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(educationSchema),
  });

  function handleDelete(id) {
    setEducations(educations.filter((edu) => edu.id !== id));
  }

  function handleEdit(education) {
    setEditingId(education.id);
    reset(education);
    setShowForm(true);
  }

  function handleCancel() {
    setEditingId(null);
    reset();
    setShowForm(false);
  }

  function onSubmit(data) {
    if (editingId) {
      setEducations(
        educations.map((edu) => (edu.id === editingId ? data : edu))
      );
    } else {
      const newEdu = { ...data, id: Date.now() };
      setEducations([...educations, newEdu]);
    }
    setEditingId(null);
    reset();
    setShowForm(false);
  }

  return (
    <div
      className="flex flex-col items-center w-full max-w-[800px] mx-auto"
      ref={pageRef}
    >
      <h1 className="heading-big mb-12">التعليــــم والمؤهلات</h1>

      {/* Education Form */}
      {(showForm || educations.length === 0) && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
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
          <MarkdownEditor
            label="الوصف"
            name="description"
            control={control}
            error={errors.description?.message}
            placeholder="اكتب وصفاً للمؤهل العلمي..."
          />

          {/* Form Actions */}
          <div className="flex justify-center gap-4">
            <button type="submit" className="btn-secondary w-full">
              {editingId ? "تحديث المؤهل العلمي" : "إضافة مؤهل علمي"}
            </button>
            {educations.length > 0 && !editingId && (
              <button
                type="button"
                onClick={handleCancel}
                className="btn-secondary-outline w-full"
              >
                إلغاء
              </button>
            )}
            {editingId && (
              <button
                type="button"
                onClick={handleCancel}
                className="btn-secondary-outline w-full"
              >
                إلغاء
              </button>
            )}
          </div>
        </form>
      )}

      {/* Education Cards */}
      {!showForm && educations.length > 0 && (
        <>
          <div className="w-full space-y-6">
            <AnimatePresence>
              {educations.map((edu, index) => (
                <motion.div
                  key={edu.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                  className="bg-white border border-text rounded-[6px] p-[24px_40px]"
                >
                  {/* Header */}
                  <div className="flex justify-between items-center mb-3 pb-5 border-b border-text">
                    <h3 className="heading-h3 font-semibold">الوصف</h3>
                    <div className="flex items-center gap-4">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => handleDelete(edu.id)}
                        className="text-text hover:text-red-500 transition-colors"
                      >
                        <DeleteIcon />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => handleEdit(edu)}
                        className="text-text hover:text-green-500 transition-colors"
                      >
                        <EditIcon />
                      </motion.button>
                    </div>
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
                        <MDPreview source={edu.description} />
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Add Education Button */}
          <button
            onClick={() => {
              setEditingId(null);
              reset();
              setShowForm(true);
            }}
            className="btn-secondary w-full mt-8"
          >
            إضافة مؤهل علمي جديد
          </button>
        </>
      )}
    </div>
  );
}
