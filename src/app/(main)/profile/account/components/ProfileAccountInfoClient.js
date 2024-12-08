"use client";
import React, { useState } from "react";
import FormInput from "@/components/formInput/FormInput";
import ConfirmModal from "@/components/modals/ConfirmModal";
import { FadeInUp } from "@/components/motion/MotionWrappers";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { settingsAccountInfoSchema } from "@/validations/settings";

export default function ProfileAccountClient({ children, inputs = [] }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(settingsAccountInfoSchema),
  });

  function submitHandler(data) {
    console.log(data);
    setIsEditing(false);
  }

  function cancelHandler() {
    reset();
    setIsEditing(false);
  }

  function editHandler() {
    setIsEditing(true);
  }

  return (
    <>
      <header className="flex justify-between items-center mb-[100px]">
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
              onClick={isEditing ? handleSubmit(submitHandler) : editHandler}
              className="btn-primary"
            >
              {isEditing ? "حفظ" : "تعديل معلومات الحساب"}
            </button>
          </div>
        </FadeInUp>
      </header>
      <form onSubmit={handleSubmit(submitHandler)}>
        {inputs.map((input, index) => (
          <FadeInUp key={input.name} delay={0.6 + index * 0.2}>
            <FormInput
              type={input.type}
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
      {/* Delete Account Section */}
      <div className="mt-12">
        <FadeInUp delay={1.4}>
          <div
            onClick={() => setShowDeleteModal(true)}
            className="text-xl text-red-600 cursor-pointer hover:underline transition-colors"
          >
            حذف الحساب
          </div>
        </FadeInUp>
      </div>
      {/* Delete Account Confirmation Modal */}
      {showDeleteModal && (
        <ConfirmModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={() => {
            console.log("Account deletion initiated");
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
