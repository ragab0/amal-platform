"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { forgotPasswordSchema } from "../../../validations/auth";
import AuthInput from "../components/AuthInput";
import AuthOtherLinks from "../components/AuthOtherLinks";

export default function ForgotPasswordForm({ title }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(forgotPasswordSchema),
  });

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
  };

  return (
    <div className="auth-box-content">
      <h3 className="heading-h3 text-center mb-8">{title}</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <AuthInput
          type="email"
          placeholder="البريد الإلكتروني"
          register={register}
          name="email"
          error={errors.email}
          aria-label="البريد الإلكتروني"
        />
        <AuthOtherLinks pageName="forgotPassword" />
        <button type="submit" className="btn-secondary w-full mt-[inherit]">
          إرسال رابط إعادة التعيين
        </button>
      </form>
    </div>
  );
}
