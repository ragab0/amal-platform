"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { motion, AnimatePresence } from "framer-motion";
import { personalInfoSchema } from "@/validations/personalInfo";
import FormInput from "@/app/cv/components/FormInput";
import DownArrow from "@/assets/icons/DownArrowIcon";

export default function PersonalDetails() {
  const [showAdditional, setShowAdditional] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(personalInfoSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-[800px] mx-auto">
      <h1 className="heading-big">المعلومات الشخصية</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-8">
        {/* Single column fields */}
        <div className="space-y-8">
          <FormInput
            must={true}
            label="الاسم كاملا"
            name="fullName"
            register={register}
            error={errors.fullName?.message}
          />
          <FormInput
            must={true}
            label="البريد الإلكتروني"
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

        {/* Two column fields */}
        <div className="grid grid-cols-2 gap-[10%]">
          <FormInput
            label="المدينة"
            name="city"
            register={register}
            error={errors.city?.message}
          />
          <FormInput
            label="الدولة"
            name="country"
            register={register}
            error={errors.country?.message}
          />
        </div>

        {/* Additional Info Button */}
        <button
          type="button"
          className="btn-secondary flex items-center justify-center gap-2 mx-0 w-full mt-8"
          onClick={() => setShowAdditional(!showAdditional)}
        >
          <motion.div
            animate={{ rotate: showAdditional ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <DownArrow className="w-4 h-4" />
          </motion.div>
          معلومات إضافية
        </button>

        {/* Additional Info Fields - two columns per row */}
        <div className="relative overflow-hidden">
          <AnimatePresence>
            {showAdditional && (
              <motion.div
                layout
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  duration: 0.2,
                  opacity: { duration: 0.15 },
                  layout: { duration: 0.2 },
                }}
                className="grid grid-cols-2 gap-[10%] gap-y-8 mt-8"
              >
                <FormInput
                  label="تاريخ الميلاد"
                  type="date"
                  name="birthDate"
                  register={register}
                  error={errors.birthDate?.message}
                />
                <FormInput
                  label="الجنسية"
                  name="nationality"
                  register={register}
                  error={errors.nationality?.message}
                />
                <FormInput
                  label="رخصة القيادة"
                  name="drivingLicense"
                  register={register}
                  error={errors.drivingLicense?.message}
                />
                <FormInput
                  label="الحالة المدنية"
                  name="maritalStatus"
                  register={register}
                  error={errors.maritalStatus?.message}
                />
                <FormInput
                  label="لينكد إن"
                  type="url"
                  name="linkedin"
                  register={register}
                  error={errors.linkedin?.message}
                />
                <FormInput
                  label="الموقع الإلكتروني"
                  type="url"
                  name="website"
                  register={register}
                  error={errors.website?.message}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Save Button */}
        <div className="flex justify-center mt-12">
          <button type="submit" className="btn-secondary w-full">
            حفظ المعلومات الشخصية
          </button>
        </div>
      </form>
    </div>
  );
}