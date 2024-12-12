import * as yup from "yup";

/* Patterns for validation */
const nameRegex = /^[\u0600-\u06FFa-zA-Z\s]+$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const headlineRegex = /^[\u0600-\u06FFa-zA-Z\s_\|\-]+$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d\s!@#$%^&*(),.?":{}|<>]{8,255}$/;
const phoneRegex = /^\+?[0-9\s-]{7,15}$/;

/* Base schemas for reuse */
export const fnameSchema = yup
  .string()
  .required("الاسم الأول مطلوب")
  .min(3, "الاسم الأول يجب أن يكون على الأقل 3 أحرف")
  .max(50, "الاسم الأول يجب أن لا يتجاوز 50 حرف")
  .matches(
    nameRegex,
    "الاسم الأول غير صالح، يجب أن يتكون من حروف عربية أو إنجليزية فقط"
  )
  .trim();
export const lnameSchema = yup
  .string()
  .required("الاسم الأخير مطلوب")
  .min(3, "الاسم الأخير يجب أن يكون على الأقل 3 أحرف")
  .max(50, "الاسم الأخير يجب أن لا يتجاوز 50 حرف")
  .matches(
    nameRegex,
    "الاسم الأخير غير صالح، يجب أن يتكون من حروف عربية أو إنجليزية فقط"
  )
  .trim();

export const headlineSchema = yup
  .string()
  .required("المسمى الوظيفي مطلوب")
  .min(3, "المسمى الوظيفي يجب أن يكون على الأقل 3 أحرف")
  .max(128, "المسمى الوظيفي يجب أن لا يتجاوز 128 حرف")
  .matches(
    headlineRegex,
    "المسمى الوظيفي غير صالح، يمكن استخدام فقط الحروف العربية والانجليزية والرموز (-_|)"
  )
  .trim();

export const phoneSchema = yup
  .string()
  .min(7, "رقم الهاتف يجب أن يكون على الأقل 7 ارقام")
  .max(15, "رقم الهاتف يجب أن لا يتجاوز 15 رقم")
  .matches(phoneRegex, "رقم الهاتف غير صالح")
  .required("رقم الهاتف مطلوب");

export const passwordSchema = yup
  .string()
  .required("كلمة المرور مطلوبة")
  .min(8, "كلمة المرور يجب أن تكون على الأقل 8 أحرف")
  .max(128, "كلمة المرور يجب أن لا تتجاوز 128 حرف")
  .matches(
    passwordRegex,
    "كلمة المرور يجب أن تحتوي على حرف كبير، حرف صغير، رقم وعلامة خاصة"
  );

export const passwordConfirmSchema = yup
  .string()
  .required("تأكيد كلمة المرور مطلوب")
  .oneOf([yup.ref("password")], "كلمة المرور غير متطابقة");

export const emailSchema = yup
  .string()
  .required("البريد الإلكتروني مطلوب")
  .matches(emailRegex, "البريد الإلكتروني غير صالح")
  .max(255, "البريد الإلكتروني يجب أن لا يتجاوز 255 حرف");
