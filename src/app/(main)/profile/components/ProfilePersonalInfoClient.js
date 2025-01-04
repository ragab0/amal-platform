"use client";
import FormInput from "@/components/formInput/FormInput";
import { useState } from "react";
import { FadeInUp } from "@/components/motion/MotionWrappers";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { settingsPersonalInfoSchema } from "@/validations/settings";
import { useAppDispatch, useAppSelector } from "@/hooks/ReduxHooks";
import { updateProfileBasicInfo } from "@/store/features/users/usersThunks";
import { toast } from "react-toastify";

export default function ProfilePersonalInfoClient({ children, inputs = [] }) {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useAppDispatch();
  const { user: personalInfo = {}, loading } = useAppSelector(
    (state) => state.auth
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(settingsPersonalInfoSchema),
    defaultValues: personalInfo,
  });

  async function onSubmit(data) {
    const { payload, error } = await dispatch(updateProfileBasicInfo(data));
    if (!error && payload?.status === "success") {
      toast.success("تم تحديث المعلومات الشخصية بنجاح");
    } else {
      toast.error("فشل تحديث المعلومات الشخصية");
    }
    setIsEditing(false);
  }

  const handleCancel = () => {
    reset();
    setIsEditing(false);
  };

  return (
    <>
      <header
        className="flex max-md:flex-col gap-y-4 justify-between items-center mb-[100px]"
        style={loading ? { pointerEvents: "none", opacity: 0.7 } : {}}
      >
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
              onClick={
                isEditing ? handleSubmit(onSubmit) : () => setIsEditing(true)
              }
              className="btn-primary max-md:py-3 max-md:px-6"
            >
              {isEditing ? "حفظ" : "تعديل الملف الشخصي"}
            </button>
          </div>
        </FadeInUp>
      </header>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-wrap justify-between"
        style={loading ? { pointerEvents: "none", opacity: 0.7 } : {}}
      >
        {inputs.map((input, index) => (
          <FadeInUp
            key={input.name}
            delay={0.6 + index * 0.2}
            className={index < 2 ? "md:w-[calc(50%-10px)] w-full" : "w-full"}
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
