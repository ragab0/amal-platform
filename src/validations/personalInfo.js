import * as yup from "yup";

export const personalInfoSchema = yup.object().shape({
  fullName: yup.string().required("الاسم مطلوب"),
  headline: yup.string().required("العنوان المهني مطلوب"),
  email: yup
    .string()
    .email("البريد الإلكتروني غير صحيح")
    .required("البريد الإلكتروني مطلوب"),
  phone: yup.string().required("رقم الهاتف مطلوب"),
});
