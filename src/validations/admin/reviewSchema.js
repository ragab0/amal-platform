import * as yup from "yup";

export const reviewSchema = yup.object({
  userName: yup.string().required("اسم المستخدم مطلوب"),
  rating: yup
    .number()
    .required("التقييم مطلوب")
    .min(1, "التقييم يجب أن يكون بين 1 و 5")
    .max(5, "التقييم يجب أن يكون بين 1 و 5"),
  comment: yup.string().required("التعليق مطلوب"),
});
