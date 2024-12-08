"use client";
import FormInput from "@/components/formInput/FormInput";
import { useState } from "react";
import { FadeInUp } from "@/components/motion/MotionWrappers";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { settingsPersonalInfoSchema } from "@/validations/settings";

export default function ProfilePersonalInfoClient({ children, inputs = [] }) {
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(settingsPersonalInfoSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
    setIsEditing(false);
  };

  const handleCancel = () => {
    reset();
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <>
      <header className="flex justify-between items-center mb-[100px]">
        <FadeInUp>{children}</FadeInUp>
        <FadeInUp delay={0.2}>
          <div>
            {isEditing && (
              <button
                onClick={handleCancel}
                className="px-8 py-4 hover:text-text-mutated hover:underline"
              >
                الغاء
              </button>
            )}
            <button
              onClick={isEditing ? handleSubmit(onSubmit) : handleEdit}
              className="btn-primary"
            >
              {isEditing ? "حفظ" : "تعديل الملف الشخصي"}
            </button>
          </div>
        </FadeInUp>
      </header>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-wrap justify-between"
      >
        {inputs.map((input, index) => (
          <FadeInUp
            key={input.name}
            delay={0.6 + index * 0.2}
            className={index < 2 ? "w-[calc(50%-10px)]" : "w-full"}
          >
            <FormInput
              label={input.label}
              placeholder={input.placeholder}
              name={input.name}
              register={register}
              error={errors[input.name]?.message}
              disabled={!isEditing}
            />
          </FadeInUp>
        ))}
      </form>
    </>
  );
}
