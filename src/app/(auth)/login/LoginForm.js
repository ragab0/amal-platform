"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../../validations/auth";
import { login } from "@/store/features/auth/authThunks";
import { useAppDispatch, useAppSelector } from "@/hooks/ReduxHooks";
import AuthInput from "../components/AuthInput";
import AuthOtherLinks from "../components/AuthOtherLinks";
import AuthSocialOptions from "../components/AuthSocialOptions";

export default function LoginForm() {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    await dispatch(login(data));
  };

  return (
    <>
      <div className="auth-box">
        <div className="auth-box-content">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-[80px]">
            {/* Email Input */}
            <AuthInput
              type="email"
              placeholder="البريد الإلكتروني"
              register={register}
              name="email"
              error={errors.email}
              aria-label="البريد الإلكتروني"
            />
            <AuthInput
              type="password"
              placeholder="كلمة المرور"
              register={register}
              name="password"
              error={errors.password}
              aria-label="كلمة المرور"
            />
            <AuthOtherLinks pageName="login" />
            <button
              type="submit"
              className="btn-secondary w-1/2 mx-auto block"
              disabled={loading}
              aria-busy={loading}
            >
              {loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
            </button>
          </form>
        </div>
      </div>
      <AuthSocialOptions pageName="login" />
    </>
  );
}
