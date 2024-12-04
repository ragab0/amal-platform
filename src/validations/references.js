import * as yup from "yup";

export const referencesSchema = yup.object().shape({
  name: yup.string().required("اسم الشخص مطلوب"),
  company: yup.string().required("اسم الشركة مطلوب"),
  email: yup
    .string()
    .email("البريد الإلكتروني غير صالح")
    .required("البريد الإلكتروني مطلوب"),
  phone: yup
    .string()
    .matches(/^[0-9+\s-]+$/, "رقم الهاتف غير صالح")
    .required("رقم الهاتف مطلوب"),
});
