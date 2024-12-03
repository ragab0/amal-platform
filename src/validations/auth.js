import * as yup from "yup";

/* Patterns for validation */
const nameRegex =
  /^[\u0600-\u06FFa-zA-Z]+([\u0600-\u06FFa-zA-Z]+\s?)*[\u0600-\u06FFa-zA-Z]+$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const headlineRegex =
  /^[\u0600-\u06FFa-zA-Z]+([\u0600-\u06FFa-zA-Z]+[\s_|\-]?)*[\u0600-\u06FFa-zA-Z]+$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d\s!@#$%^&*(),.?":{}|<>]{8,128}$/;

/* Base schemas for reuse */

const passwordSchema = yup
  .string()
  .required("كلمة المرور مطلوبة")
  .min(8, "كلمة المرور يجب أن تكون على الأقل 8 أحرف")
  .max(128, "كلمة المرور يجب أن لا تتجاوز 128 حرف")
  .matches(
    passwordRegex,
    "كلمة المرور يجب أن تحتوي على حرف كبير، حرف صغير، رقم وعلامة خاصة"
  );

const emailSchema = yup
  .string()
  .required("البريد الإلكتروني مطلوب")
  .matches(emailRegex, "البريد الإلكتروني غير صالح")
  .max(255, "البريد الإلكتروني يجب أن لا يتجاوز 255 حرف");

/* Auth schemas */

export const loginSchema = yup.object({
  email: emailSchema,
  password: passwordSchema,
});

export const signupSchema = yup.object({
  firstName: yup
    .string()
    .required("الاسم الأول مطلوب")
    .min(3, "الاسم الأول يجب أن يكون على الأقل 3 أحرف")
    .max(50, "الاسم الأول يجب أن لا يتجاوز 50 حرف")
    .matches(
      nameRegex,
      "الاسم الأول غير صالح، يجب أن يتكون من حروف عربية أو إنجليزية فقط"
    ),
  lastName: yup
    .string()
    .required("الاسم الأخير مطلوب")
    .min(3, "الاسم الأخير يجب أن يكون على الأقل 3 أحرف")
    .max(50, "الاسم الأخير يجب أن لا يتجاوز 50 حرف")
    .matches(
      nameRegex,
      "الاسم الأخير غير صالح، يجب أن يتكون من حروف عربية أو إنجليزية فقط"
    ),
  headline: yup
    .string()
    .required("المسمى الوظيفي مطلوب")
    .min(3, "المسمى الوظيفي يجب أن يكون على الأقل 3 أحرف")
    .max(128, "المسمى الوظيفي يجب أن لا يتجاوز 128 حرف")
    .matches(
      headlineRegex,
      "المسمى الوظيفي غير صالح، يمكن استخدام فقط الحروف العربية والانجليزية والرموز (-_|)"
    ),
  email: emailSchema,
  password: passwordSchema,
  passwordConfirm: yup
    .string()
    .required("تأكيد كلمة المرور مطلوب")
    .oneOf([yup.ref("password")], "كلمة المرور غير متطابقة"),
  verificationCode: yup
    .string()
    .required("رمز التحقق مطلوب")
    .matches(/^\d{6}$/, "رمز التحقق يجب أن يكون 6 أرقام فقط"),
});

export const forgotPasswordSchema = yup.object({
  email: emailSchema,
});

export const resetPasswordSchema = yup.object({
  password: passwordSchema,
  passwordConfirm: yup
    .string()
    .required("تأكيد كلمة المرور مطلوب")
    .oneOf([yup.ref("password")], "كلمة المرور غير متطابقة"),
});
