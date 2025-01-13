"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { forgotPasswordSchema } from "../../../validations/auth";
import { useAppDispatch } from "@/hooks/ReduxHooks";
import { forgetPassword } from "@/store/features/auth/authThunks";
import { toast } from "react-toastify";
import { useState } from "react";
import AuthInput from "../components/AuthInput";
import AuthOtherLinks from "../components/AuthOtherLinks";

export default function ForgotPasswordForm({ title }) {
  const dispatch = useAppDispatch();
  const [isSent, setIsSent] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(forgotPasswordSchema),
  });

  async function onSubmit(data) {
    const { payload, error } = await dispatch(forgetPassword(data));
    if (!error && payload?.status === "success") {
      // toast.success(payload.result);
      setIsSent(true);
    }
  }

  return (
    <div className="auth-box-content">
      <h3 className="heading-h3 text-center mb-8">{title}</h3>
      {isSent ? (
        <div className="text-center flex items-center flex-col ">
          <h2 className="text-2xl text-main">
            تم إرسال رابط إعادة التعيين علي البريد الالكتروني بنجاح
          </h2>
          <AuthOtherLinks pageName="forgotPassword" />
        </div>
      ) : (
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
      )}
    </div>
  );
}
