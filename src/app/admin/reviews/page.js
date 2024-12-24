"use client";
import Modal from "@/components/modals/ConfirmModal";
import FormInput from "@/components/formInput/FormInput";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useAppSelector } from "@/hooks/ReduxHooks";
import { HiPencil, HiTrash } from "react-icons/hi";
import { reviewSchema } from "@/validations/admin/reviewSchema";
import { FadeInUp } from "@/components/motion/MotionWrappers";
import {
  fetchReviews,
  createReview,
  updateReview,
  deleteReview,
} from "@/store/features/admin/adminThunks";

// export const metadata = {
//   title: "إدارة التقييمات | منصة عمل",
//   description: "إدارة التقييمات في منصة عمل",
// };

export default function ReviewsPage() {
  const dispatch = useAppDispatch();
  const { results: reviews, loading } = useAppSelector(
    (state) => state.admin.reviews
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [reviewToDelete, setReviewToDelete] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(reviewSchema),
  });

  useEffect(() => {
    dispatch(fetchReviews());
  }, [dispatch]);

  const onSubmit = async (data) => {
    try {
      if (editingReview) {
        await dispatch(
          updateReview({ id: editingReview.id, reviewData: data })
        ).unwrap();
      } else {
        await dispatch(createReview(data)).unwrap();
      }
      reset();
      setEditingReview(null);
    } catch (error) {
      // Error is handled by the thunk
    }
  };

  const handleEdit = (review) => {
    setEditingReview(review);
    setValue("userName", review.userName);
    setValue("rating", review.rating);
    setValue("comment", review.comment);
  };

  const handleDelete = (review) => {
    setReviewToDelete(review);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await dispatch(deleteReview(reviewToDelete.id)).unwrap();
      setIsModalOpen(false);
      setReviewToDelete(null);
    } catch (error) {
      // Error is handled by the thunk
    }
  };

  return (
    <div className="container px-6 mx-auto">
      <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        إدارة التقييمات
      </h2>

      <FadeInUp>
        <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
          <h3 className="text-lg font-semibold mb-6">
            {editingReview ? "تعديل تقييم" : "إضافة تقييم جديد"}
          </h3>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid gap-6 md:grid-cols-2"
          >
            <FormInput
              label="اسم المستخدم"
              name="userName"
              register={register}
              error={errors.userName?.message}
              must={true}
            />
            <FormInput
              label="التقييم"
              name="rating"
              type="number"
              register={register}
              error={errors.rating?.message}
              must={true}
              min={1}
              max={5}
            />
            <div className="md:col-span-2">
              <FormInput
                label="التعليق"
                name="comment"
                register={register}
                error={errors.comment?.message}
                must={true}
                textarea
                rows={4}
              />
            </div>

            <div className="md:col-span-2 flex gap-4 justify-end">
              {editingReview && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingReview(null);
                    reset();
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
                >
                  إلغاء
                </button>
              )}
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-primary-6 rounded-lg hover:bg-primary-7 focus:outline-none focus:ring-2 focus:ring-primary-5"
              >
                {editingReview ? "تحديث" : "إضافة"}
              </button>
            </div>
          </form>
        </div>

        <div className="w-full overflow-hidden rounded-lg shadow-xs">
          <div className="w-full overflow-x-auto">
            <table className="w-full whitespace-no-wrap">
              <thead>
                <tr className="text-xs font-semibold tracking-wide text-right text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                  <th className="px-4 py-3">المستخدم</th>
                  <th className="px-4 py-3">التقييم</th>
                  <th className="px-4 py-3">التعليق</th>
                  <th className="px-4 py-3">إجراءات</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                {reviews.map((review) => (
                  <tr
                    key={review.id}
                    className="text-gray-700 dark:text-gray-400"
                  >
                    <td className="px-4 py-3">{review.userName}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <svg
                            key={i}
                            className="w-4 h-4 text-yellow-500 fill-current"
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                          </svg>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3 max-w-xs truncate">
                      {review.comment}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => handleEdit(review)}
                          className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-primary-6 rounded-lg hover:bg-primary-1 focus:outline-none focus:ring-2 focus:ring-primary-5"
                        >
                          <HiPencil className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(review)}
                          className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-red-600 rounded-lg hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                          <HiTrash className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </FadeInUp>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setReviewToDelete(null);
        }}
        onConfirm={confirmDelete}
        title="حذف تقييم"
        message={`هل أنت متأكد من حذف تقييم "${reviewToDelete?.userName}"؟`}
        confirmText="حذف"
        cancelText="إلغاء"
      />
    </div>
  );
}
