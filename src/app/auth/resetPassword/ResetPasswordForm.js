"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { resetPasswordSchema } from "../../../validations/auth";
import { useAppDispatch, useAppSelector } from "@/hooks/ReduxHooks";
import { resetPassword } from "@/store/features/auth/authThunks";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import AuthInput from "@/app/(auth)/components/AuthInput";

export default function ResetPasswordForm({ email, token }) {
  const dispatch = useAppDispatch();
  const { loading, isInitialized } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(resetPasswordSchema),
  });

  async function onSubmit(data) {
    const { payload, error } = await dispatch(
      resetPassword({ ...data, email, token })
    );
    if (!error && payload?.status === "success") {
      toast.success(payload.result);
      router.push("/login");
    }
  }

  return (
    <div className="auth-box-content">
      <form onSubmit={handleSubmit(onSubmit)}>
        <AuthInput
          type="password"
          placeholder="كلمة المرور"
          register={register}
          name="password"
          error={errors.password}
        />
        <AuthInput
          type="password"
          placeholder="تأكيد كلمة المرور"
          register={register}
          name="passwordConfirm"
          error={errors.passwordConfirm}
        />
        <button type="submit" className="btn-secondary w-full mt-[inherit]">
          حفظ
        </button>
      </form>
    </div>
  );
}
