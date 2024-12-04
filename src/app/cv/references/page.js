"use client";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { motion, AnimatePresence } from "framer-motion";
import { referencesSchema } from "@/validations/references";
import FormInput from "@/app/cv/components/FormInput";
import DeleteIcon from "@/assets/icons/DeleteIcon";
import EditIcon from "@/assets/icons/EditIcon";
import Toggle from "@/app/cv/components/Toggle";

export default function References() {
  const [references, setReferences] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(true);
  const [showOnDemand, setShowOnDemand] = useState(false);
  const pageRef = useRef(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(referencesSchema),
  });

  function handleDelete(id) {
    setReferences(references.filter((ref) => ref.id !== id));
  }

  function handleEdit(reference) {
    setEditingId(reference.id);
    reset(reference);
    setShowForm(true);
  }

  function handleCancel() {
    setEditingId(null);
    reset();
    setShowForm(false);
  }

  function onSubmit(data) {
    if (editingId) {
      setReferences(
        references.map((ref) => (ref.id === editingId ? data : ref))
      );
    } else {
      const newRef = { ...data, id: Date.now() };
      setReferences([...references, newRef]);
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
      <h1 className="heading-big mb-12">المراجع</h1>

      {/* On Demand Section */}
      <div className="w-full h-[60px] bg-[#33D38E] rounded-[6px] mb-8 flex items-center justify-between px-8">
        <h2 className="text-white text-lg font-semibold">
          عرض &quot;المراجع متوفرة عند الطلب&quot; في سيرتك الذاتية
        </h2>
        <Toggle
          isOn={showOnDemand}
          onToggle={() => setShowOnDemand(!showOnDemand)}
        />
      </div>

      {/* References Form */}
      {(showForm || references.length === 0) && (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-8">
          {/* Single column fields */}
          <div className="space-y-8">
            <FormInput
              must={true}
              label="اسم الشخص (يمكن الاتصال به)"
              name="name"
              register={register}
              error={errors.name?.message}
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
          <div className="flex justify-center gap-4">
            <button type="submit" className="btn-secondary w-full">
              {editingId ? "تحديث المرجع" : "إضافة مرجع"}
            </button>
            {references.length > 0 && !editingId && (
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

      {/* References Cards */}
      {!showForm && references.length > 0 && (
        <>
          <div className="w-full space-y-6">
            <AnimatePresence>
              {references.map((ref, index) => (
                <motion.div
                  key={ref.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                  className="bg-white border border-text rounded-[6px] p-[24px_40px]"
                >
                  {/* Header */}
                  <div className="flex justify-between items-center mb-3 pb-5 border-b border-text">
                    <h3 className="heading-h3 font-semibold">المرجع</h3>
                    <div className="flex items-center gap-4">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => handleDelete(ref.id)}
                        className="text-text hover:text-red-500 transition-colors"
                      >
                        <DeleteIcon />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => handleEdit(ref)}
                        className="text-text hover:text-green-500 transition-colors"
                      >
                        <EditIcon />
                      </motion.button>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="heading-h3 font-semibold">{ref.name}</h3>
                      <h4 className="heading-h4">{ref.company}</h4>
                    </div>
                    <div className="flex items-center gap-4 text-text">
                      <h4 className="heading-h4">
                        {ref.email} • {ref.phone}
                      </h4>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Add Reference Button */}
          <button
            onClick={() => {
              setEditingId(null);
              reset();
              setShowForm(true);
            }}
            className="btn-secondary w-full mt-8"
          >
            إضافة مرجع جديد
          </button>
        </>
      )}
    </div>
  );
}
