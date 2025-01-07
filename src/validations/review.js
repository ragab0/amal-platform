import * as yup from "yup";

export const reviewSchema = yup.object().shape({
  rating: yup
    .number()
    .required("يجب تحديد التقييم")
    .min(1, "التقييم يجب أن يكون بين 1 و 5")
    .max(5, "التقييم يجب أن يكون بين 1 و 5"),
  content: yup
    .string()
    .required("يجب كتابة محتوى التقييم")
    .trim()
    .min(10, "محتوى التقييم يجب أن يكون على الأقل 10 أحرف")
    .max(500, "محتوى التقييم يجب أن لا يتجاوز 500 حرف"),
});
