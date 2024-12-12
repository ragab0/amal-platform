"use client";
import AuthInput from "../components/AuthInput";
import AuthSocialOptions from "../components/AuthSocialOptions";
import AuthOtherLinks from "../components/AuthOtherLinks";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupSchema } from "@/validations/auth";
import { useAppDispatch, useAppSelector } from "@/hooks/ReduxHooks";
import { toast } from "react-toastify";
import {
  signup,
  generateVerificationCode,
  verifyEmail,
} from "@/store/features/auth/authThunks";

export default function SignupForm({ steps }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.auth);
  const [currentStep, setCurrentStep] = useState(1);
  const [codeSent, setCodeSent] = useState(false);

  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupSchema),
  });

  // Handle verification step redirect from login
  useEffect(() => {
    const email = searchParams.get("email");
    const step = searchParams.get("step");
    if (email && step === "3") {
      setValue("email", email);
      setCurrentStep(3);
    } else {
      setCurrentStep(1); // Reset to step 1 for any other search param manipulation xD;
    }
  }, [searchParams, setValue]);

  async function handleNextStep() {
    const currentFields = steps[currentStep - 1].fields;
    const isValid = await trigger(currentFields);
    if (isValid) {
      // If moving to the last step and it's a new registration
      if (currentStep === steps.length - 1 && !searchParams.get("email")) {
        const formData = { ...getValues(), role: "user" };
        const { payload, error } = await dispatch(signup(formData));
        if (!error && payload?.status === "success") {
          toast.success("تم إنشاء الحساب بنجاح");
          setCurrentStep((prev) => prev + 1);
        }
      } else {
        setCurrentStep((prev) => prev + 1);
      }
    }
  }

  async function handleSendCode() {
    const email = getValues("email");
    const { payload, error } = await dispatch(
      generateVerificationCode({ email })
    );
    if (!error && payload?.status === "success") {
      toast.success("تم إرسال رمز التحقق");
      setCodeSent(true);
    }
  }

  async function onSubmit(_) {}

  async function handleSubmitCode() {
    const email = getValues("email");
    const code = getValues("verificationCode");
    const isValid = await trigger(code);
    if (isValid) {
      const { payload, error } = await dispatch(verifyEmail({ email, code }));
      if (!error && payload?.status === "success") {
        toast.success("تم التحقق بنجاح");
        router.replace("/auth/callback");
      }
    }
  }

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
                  ${i + 1 <= currentStep ? "text-main" : ""}`}
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
                  name="fname"
                  error={errors.fname}
                />
                <AuthInput
                  type="text"
                  placeholder="الاسم الأخير"
                  register={register}
                  name="lname"
                  error={errors.lname}
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
                  {codeSent
                    ? `تم إرسال رمز التحقق إلى بريدك الإلكتروني ${getValues(
                        "email"
                      )}`
                    : "اضغط على إرسال الرمز للحصول على رمز التحقق"}
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
                {codeSent && (
                  <button
                    type="button"
                    onClick={handleSendCode}
                    className="text-main hover:underline"
                    disabled={loading}
                  >
                    إعادة إرسال الرمز
                  </button>
                )}
              </div>
            )}

            {/* BUTTONS */}
            <div className="flex max-md:flex-col items-center justify-between gap-4 mt-12">
              {currentStep > 1 && currentStep < steps.length && (
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
                  disabled={loading}
                  aria-busy={loading}
                >
                  {loading ? "جاري التحقق..." : "التالي"}
                </button>
              ) : (
                <>
                  {!codeSent ? (
                    <button
                      type="button"
                      className="btn-secondary w-full"
                      onClick={handleSendCode}
                      disabled={loading}
                      aria-busy={loading}
                    >
                      {loading ? "جاري إرسال الرمز..." : "إرسال الرمز"}
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="btn-secondary w-full"
                      disabled={loading}
                      aria-busy={loading}
                      onClick={handleSubmitCode}
                    >
                      {loading ? "جاري تأكيد الرمز..." : "تأكيد الرمز"}
                    </button>
                  )}
                </>
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
