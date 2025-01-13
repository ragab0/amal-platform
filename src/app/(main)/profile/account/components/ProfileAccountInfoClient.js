"use client";
import React, { useState } from "react";
import FormInput from "@/components/formInput/FormInput";
import ConfirmModal from "@/components/modals/ConfirmModal";
import { FadeInUp } from "@/components/motion/MotionWrappers";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { settingsAccountInfoSchema } from "@/validations/settings";
import { useAppDispatch, useAppSelector } from "@/hooks/ReduxHooks";
import { updateProfileAccountInfo } from "@/store/features/users/usersThunks";
import { toast } from "react-toastify";

export default function ProfileAccountClient({ children, inputs = [] }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useAppDispatch();
  const { user: accountInfo = {}, loading } = useAppSelector(
    (state) => state.auth
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    // resolver: yupResolver(settingsAccountInfoSchema),
    defaultValues: {
      email: accountInfo.email,
      _id: accountInfo._id,
    },
  });

  async function submitHandler(data) {
    const { payload, error } = await dispatch(updateProfileAccountInfo(data));
    if (!error && payload?.status === "success") {
      toast.success("تم تحديث معلومات الحساب بنجاح");
      setValue("password", "");
      setValue("passwordConfirm", "");
    } else {
      toast.error("فشل تحديث معلومات الحساب");
    }
    setIsEditing(false);
  }

  function cancelHandler() {
    reset();
    setIsEditing(false);
  }

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
                onClick={cancelHandler}
                className="px-8 py-4 hover:text-text-mutated hover:underline"
              >
                الغاء
              </button>
            )}
            <button
              onClick={
                isEditing
                  ? handleSubmit(submitHandler)
                  : () => setIsEditing(true)
              }
              className="btn-primary max-md:py-3 max-md:px-6"
            >
              {isEditing ? "حفظ" : "تعديل معلومات الحساب"}
            </button>
          </div>
        </FadeInUp>
      </header>
      <form
        onSubmit={handleSubmit(submitHandler)}
        style={loading ? { pointerEvents: "none", opacity: 0.7 } : {}}
      >
        {inputs.map((input, index) => (
          <FadeInUp key={input.name} delay={0.6 + index * 0.2}>
            <FormInput
              label={input.label}
              placeholder={input.placeholder}
              name={input.name}
              type={input.type}
              register={register}
              error={errors[input.name]?.message}
              disabled={!isEditing}
            />
          </FadeInUp>
        ))}
      </form>
      {/* Delete Account Section */}
      {/* <div className="mt-12">
        <FadeInUp delay={1.4}>
          <div
            onClick={() => setShowDeleteModal(true)}
            className="text-xl text-red-600 cursor-pointer hover:underline transition-colors"
          >
            حذف الحساب
          </div>
        </FadeInUp>
      </div> */}
      {/* Delete Account Confirmation Modal */}
      {showDeleteModal && (
        <ConfirmModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={() => {
            setShowDeleteModal(false);
          }}
          title="تنبيـــه"
          message="هل أنت متأكد من رغبتك في حذف حسابك؟"
          confirmText="موافق"
          cancelText="إلغاء"
        />
      )}
    </>
  );
}
