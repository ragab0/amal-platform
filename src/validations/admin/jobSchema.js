import * as yup from "yup";

export const jobSchema = yup.object().shape({
  title: yup
    .string()
    .required("عنوان الوظيفة مطلوب")
    .min(3, "عنوان الوظيفة يجب أن يكون على الأقل 3 أحرف")
    .max(100, "عنوان الوظيفة يجب أن لا يتجاوز 100 حرف"),
  company: yup
    .string()
    .required("اسم الشركة مطلوب")
    .min(1, "اسم الشركة يجب أن يكون على الأقل حرف")
    .max(50, "اسم الشركة يجب أن لا يتجاوز 50 حرف"),
  description: yup
    .string()
    .required("وصف الوظيفة مطلوب")
    .min(10, "وصف الوظيفة يجب أن يكون على الأقل 10 أحرف")
    .max(2000, "وصف الوظيفة يجب أن لا يتجاوز 2000 حرف"),
  requirements: yup
    .array()
    .of(
      yup
        .string()
        .required("المتطلب مطلوب")
        .min(3, "كل متطلب يجب أن يكون على الأقل 3 أحرف")
        .max(200, "كل متطلب يجب أن لا يتجاوز 200 حرف")
    )
    .min(1, "يجب إضافة متطلب واحد على الأقل")
    .required("المتطلبات مطلوبة"),
  location: yup.object().shape({
    country: yup.string().required("دولة الوظيفة مطلوبة"),
    city: yup.string().required("مدينة الوظيفة مطلوبة"),
  }),
  type: yup
    .string()
    .required("نوع الوظيفة مطلوب")
    .oneOf(["دوام كامل", "دوام جزئي", "عقد", "تدريب"], "نوع الوظيفة غير صحيح"),
  experience: yup
    .string()
    .required("مستوى الخبرة مطلوب")
    .oneOf(["حديث تخرج", "مبتدأ", "متوسط", "متقدم"], "مستوى الخبرة غير صحيح"),
  salary: yup.object().shape({
    from: yup
      .number()
      .transform((value) => (isNaN(value) ? undefined : value))
      .required("الحد الأدنى للراتب مطلوب")
      .min(0, "يجب أن يكون الراتب أكبر من 0"),
    to: yup
      .number()
      .transform((value) => (isNaN(value) ? undefined : value))
      .required("الحد الأقصى للراتب مطلوب")
      .min(0, "يجب أن يكون الراتب أكبر من 0")
      .test(
        "is-greater",
        "يجب أن يكون الحد الأقصى أكبر أو يساوي من الحد الأدنى",
        function (value) {
          const { from } = this.parent;
          return !from || !value || value >= from;
        }
      ),
    currency: yup
      .string()
      .required("عملة الراتب مطلوبة")
      .oneOf(["EGP", "USD", "SAR"], "عملة الراتب غير صحيحة"),
  }),
});
