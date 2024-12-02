"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupSchema } from "@/validations/auth";
import { signup } from "@/store/features/auth/authThunks";
import { useAppDispatch, useAppSelector } from "@/hooks/ReduxHooks";
import AuthInput from "../components/AuthInput";
import AuthSocialOptions from "../components/AuthSocialOptions";
import AuthOtherLinks from "../components/AuthOtherLinks";

export default function SignupForm({ steps }) {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.auth);
  const [currentStep, setCurrentStep] = useState(1);

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    getValues,
  } = useForm({
    resolver: yupResolver(signupSchema),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    await dispatch(signup(data));
  };

  const handleNextStep = async () => {
    const currentFields = steps[currentStep - 1].fields;
    const isValid = await trigger(currentFields);

    if (isValid) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  return (
    <>
      <div className="auth-box">
        <div className="auth-box-content">
          {/* Stepper */}
          <div className="flex justify-between items-center mb-16 font-bold">
            {steps.map(({ text }, i) => (
              <div key={i} className="flex flex-col items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-lg border-2 transition-all duration-300
                  ${
                    i + 1 === currentStep
                      ? "border-main text-main border-4"
                      : ""
                  } ${
                    i + 1 < currentStep ? "bg-main text-white border-main" : ""
                  }`}
                >
                  {i + 1}
                </div>
                <span
                  className={`text-sm md:text-base
                  ${i + 1 <= currentStep ? "text-main" : ""}
                  `}
                >
                  {text}
                </span>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {currentStep === 1 && (
              <>
                <AuthInput
                  type="text"
                  placeholder="الاسم الأول"
                  register={register}
                  name="firstName"
                  error={errors.firstName}
                />
                <AuthInput
                  type="text"
                  placeholder="الاسم الأخير"
                  register={register}
                  name="lastName"
                  error={errors.lastName}
                />
                <AuthInput
                  type="text"
                  placeholder="المسمي الوظيفي"
                  register={register}
                  name="headline"
                  error={errors.headline}
                />
              </>
            )}

            {currentStep === 2 && (
              <>
                <AuthInput
                  type="email"
                  placeholder="البريد الإلكتروني"
                  register={register}
                  name="email"
                  error={errors.email}
                />
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
              </>
            )}

            {currentStep === 3 && (
              <div className="text-center space-y-8">
                <p className="text-lg md:text-xl text-text">
                  تم إرسال رمز التحقق إلى بريدك الإلكتروني {getValues("email")}
                </p>
                <AuthInput
                  type="text"
                  placeholder="رمز التحقق"
                  register={register}
                  name="verificationCode"
                  error={errors.verificationCode}
                  className="text-center"
                  maxLength={6}
                />
              </div>
            )}

            {/* BUTTONS */}
            <div className="flex max-md:flex-col items-center justify-between gap-4 mt-12">
              {currentStep > 1 && (
                <button
                  type="button"
                  className="btn-secondary-outline"
                  onClick={() => setCurrentStep((prev) => prev - 1)}
                >
                  السابق
                </button>
              )}
              {currentStep < 3 ? (
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={handleNextStep}
                >
                  التالي
                </button>
              ) : (
                <button
                  type="submit"
                  className="btn-secondary w-full"
                  disabled={loading}
                  aria-busy={loading}
                >
                  {loading ? "جاري إنشاء الحساب..." : "إنشاء الحساب"}
                </button>
              )}
            </div>
          </form>
          <div className="mx-auto w-fit">
            <AuthOtherLinks pageName="signup" />
          </div>
        </div>
        <AuthSocialOptions pageName="signup" />
      </div>
    </>
  );
}
