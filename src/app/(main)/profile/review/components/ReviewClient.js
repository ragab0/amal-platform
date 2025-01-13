"use client";
import ConfirmModal from "@/components/modals/ConfirmModal";
import FormInput from "@/components/formInput/FormInput";
import { RiStarFill, RiStarLine } from "@remixicon/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { FadeInUp } from "@/components/motion/MotionWrappers";
import { yupResolver } from "@hookform/resolvers/yup";
import { reviewSchema } from "@/validations/review";
import { formatDate } from "@/utils/formatDate";
import { setUserReview } from "@/store/features/auth/authSlice";
import {
  createReview,
  updateReview,
  deleteReview,
} from "@/store/features/reviews/reviewsThunks";

export default function ReviewClient() {
  const dispatch = useDispatch();
  const { user = {} } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.reviews);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const hasReview = Boolean(user.myReview);
  const _id = user.myReview?._id;
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(reviewSchema),
    defaultValues: user.myReview || {},
  });

  const rating = watch("rating") || 0;

  const handleCreateReview = async (data) => {
    const { error, payload } = await dispatch(createReview(data));
    if (!error && payload?.status !== "error") {
      toast.success("تم إضافة تقييمك بنجاح");
      setIsEditing(false);
      dispatch(setUserReview(payload.result));
    }
  };

  const handleUpdateReview = async (data) => {
    if (!_id) return;
    const fullData = {
      ...user.myReview,
      ...data,
    };

    const { error, payload } = await dispatch(updateReview(fullData));
    if (!error && payload?.status !== "error") {
      toast.success("تم تحديث تقييمك بنجاح");
      setIsEditing(false);
      dispatch(setUserReview(payload.result));
    }
  };

  const handleDeleteReview = async () => {
    if (!_id) return;
    const { error, payload } = await dispatch(deleteReview(_id));
    if (!error && payload?.status !== "error") {
      toast.success("تم حذف تقييمك بنجاح");
      setShowDeleteModal(false);
      dispatch(setUserReview(null));
      reset();
    }
  };

  const handleCancel = () => {
    reset();
    setIsEditing(false);
  };

  const onSubmit = handleSubmit(
    hasReview ? handleUpdateReview : handleCreateReview
  );

  return (
    <>
      <header className="flex max-md:flex-col gap-y-4 justify-between items-center mb-[100px]">
        <FadeInUp>
          <h2 className="heading-sub-small">
            {hasReview ? "تقييمي" : "إضافة تقييم"}
          </h2>
        </FadeInUp>
        <FadeInUp delay={0.2}>
          <div style={loading ? { pointerEvents: "none", opacity: 0.7 } : {}}>
            {isEditing && (
              <button
                onClick={handleCancel}
                className="px-8 py-4 hover:text-text-mutated hover:underline"
                disabled={loading}
              >
                الغاء
              </button>
            )}
            <button
              onClick={isEditing ? onSubmit : () => setIsEditing(true)}
              className="btn-primary max-md:py-3 max-md:px-6"
              disabled={loading}
            >
              {isEditing ? "حفظ" : hasReview ? "تعديل التقييم" : "إضافة تقييم"}
            </button>
          </div>
        </FadeInUp>
      </header>

      <form
        onSubmit={onSubmit}
        className="grid lg:grid-cols-2 gap-8"
        style={loading ? { pointerEvents: "none", opacity: 0.7 } : {}}
      >
        <div className="space-y-8">
          <FadeInUp delay={0.4}>
            <div className="space-y-2">
              <label className="block text-neutral-9 font-medium">
                التقييم
              </label>
              <div className="flex gap-2 rtl">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setValue("rating", star)}
                    className={`text-3xl transition-transform hover:scale-110 ${
                      !isEditing ? "pointer-events-none opacity-70" : ""
                    } ${star <= rating ? "text-yellow-400" : "text-neutral-3"}`}
                    disabled={!isEditing}
                  >
                    {star <= rating ? (
                      <RiStarFill className="w-8 h-8" />
                    ) : (
                      <RiStarLine className="w-8 h-8" />
                    )}
                  </button>
                ))}
              </div>
              {errors.rating && (
                <p className="text-red-500 text-sm">{errors.rating.message}</p>
              )}
            </div>
          </FadeInUp>

          <FadeInUp delay={0.6}>
            <FormInput
              label="محتوى التقييم"
              name="content"
              register={register}
              error={errors.content?.message}
              disabled={!isEditing}
              textarea={true}
              placeholder="اكتب تقييمك هنا..."
            />
          </FadeInUp>
        </div>

        {hasReview && (
          <div className="space-y-8 lg:border-r lg:pr-8">
            <div className="space-y-4">
              <FadeInUp delay={0.8}>
                <h3 className="text-lg font-medium text-neutral-9">
                  معلومات التقييم
                </h3>
              </FadeInUp>
              <div className="space-y-2">
                {user.myReview?.createdAt && (
                  <FadeInUp delay={1}>
                    <div className="flex justify-between items-center text-neutral-7">
                      <span>تاريخ الإنشاء:</span>
                      <span className="font-medium">
                        {formatDate(user.myReview.createdAt, true)}
                      </span>
                    </div>
                  </FadeInUp>
                )}
                {user.myReview?.updatedAt &&
                  user.myReview.updatedAt !== user.myReview.createdAt && (
                    <FadeInUp delay={1.2}>
                      <div className="flex justify-between items-center text-neutral-7">
                        <span>آخر تحديث:</span>
                        <span className="font-medium">
                          {formatDate(user.myReview.updatedAt, true)}
                        </span>
                      </div>
                    </FadeInUp>
                  )}
              </div>
            </div>

            <FadeInUp delay={1.4}>
              <div
                onClick={() => setShowDeleteModal(true)}
                className="flex items-center gap-2 text-red-500 cursor-pointer hover:underline"
              >
                <span className="py-5 cursor-pointer hover:text-red-600 transition-colors">
                  حذف التقييم
                </span>
              </div>
            </FadeInUp>
          </div>
        )}
      </form>

      {showDeleteModal && (
        <ConfirmModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDeleteReview}
          title="تنبيـــه"
          message="هل أنت متأكد من رغبتك في حذف التقييم؟"
          confirmText="موافق"
          cancelText="إلغاء"
        />
      )}
    </>
  );
}
