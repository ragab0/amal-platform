"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { jobSchema } from "@/validations/admin/jobSchema";
import { motion } from "framer-motion";
import FormInput from "@/components/formInput/FormInput";
import FormSelect from "@/components/formSelect/FormSelect";
import FormArrayInput from "@/components/formArrayInput/FormArrayInput";

const defaultValues = {
  title: "",
  company: "",
  description: "",
  requirements: [""],
  location: {
    country: "",
    city: "",
  },
  type: "",
  experience: "",
  salary: {
    from: "",
    to: "",
    currency: "EGP",
  },
};

const jobTypes = ["دوام كامل", "دوام جزئي", "عقد", "تدريب"];
const experienceLevels = ["حديث تخرج", "مبتدأ", "متوسط", "متقدم"];
const currencies = ["EGP", "USD", "SAR"];

export default function JobForm({ onSubmit, initialData, onCancel }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(jobSchema),
    defaultValues: initialData || defaultValues,
  });

  // Get the root requirements error if it exists
  const requirementsError = errors.requirements?.message || 
                           (Array.isArray(errors.requirements) && errors.requirements) || 
                           null;

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "tween", duration: 0.3 }}
      className="admin-card"
    >
      <h3 className="heading-h3 mt-2 mb-8 text-center">
        {initialData ? "تعديل وظيفة" : "إضافة وظيفة جديدة"}
      </h3>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <FormInput
            label="عنوان الوظيفة"
            name="title"
            register={register}
            error={errors.title?.message}
            must={true}
          />
          <FormInput
            label="الشركة"
            name="company"
            register={register}
            error={errors.company?.message}
            must={true}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <FormInput
            label="الدولة"
            name="location.country"
            register={register}
            error={errors.location?.country?.message}
            must={true}
          />
          <FormInput
            label="المدينة"
            name="location.city"
            register={register}
            error={errors.location?.city?.message}
            must={true}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <FormSelect
            label="نوع الوظيفة"
            name="type"
            register={register}
            error={errors.type?.message}
            must={true}
            options={jobTypes}
          />
          <FormSelect
            label="مستوى الخبرة"
            name="experience"
            register={register}
            error={errors.experience?.message}
            must={true}
            options={experienceLevels}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <FormInput
            label="الحد الأدنى للراتب"
            name="salary.from"
            register={register}
            error={errors.salary?.from?.message}
            must={true}
            type="number"
          />
          <FormInput
            label="الحد الأقصى للراتب"
            name="salary.to"
            register={register}
            error={errors.salary?.to?.message}
            must={true}
            type="number"
          />
          <FormSelect
            label="العملة"
            name="salary.currency"
            register={register}
            error={errors.salary?.currency?.message}
            must={true}
            options={currencies}
          />
        </div>

        <div className="w-full">
          <FormInput
            label="الوصف"
            name="description"
            register={register}
            error={errors.description?.message}
            must={true}
            textarea
            rows={4}
          />
        </div>

        <div className="w-full">
          <FormArrayInput
            label="المتطلبات"
            name="requirements"
            control={control}
            error={requirementsError}
            must={true}
            placeholder="أضف متطلب جديد"
          />
        </div>

        <div className="flex gap-4 justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="admin-btn-secondary"
          >
            إلغاء
          </button>
          <button type="submit" className="admin-btn-primary">
            {initialData ? "تحديث" : "إضافة"}
          </button>
        </div>
      </form>
    </motion.div>
  );
}
