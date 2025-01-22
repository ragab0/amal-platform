import * as yup from "yup";

export const paymentSchema = yup.object().shape({
  cardNumber: yup
    .string()
    .required("رقم البطاقة مطلوب")
    .matches(/^[0-9]{16}$/, "رقم البطاقة يجب أن يكون 16 رقم"),
  // cardName: yup.string().required("اسم حامل البطاقة مطلوب"),
  expiryDate: yup
    .string()
    .required("تاريخ انتهاء البطاقة مطلوب")
    .matches(
      /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
      "صيغة تاريخ الانتهاء غير صحيحة MM/YY"
    ),
  cvv: yup
    .string()
    .required("رمز الأمان مطلوب")
    .matches(/^[0-9]{3,4}$/, "رمز الأمان يجب أن يكون 3 أو 4 أرقام"),
});
