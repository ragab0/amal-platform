import * as yup from "yup";
import {
  emailSchema,
  firstNameSchema,
  headlineSchema,
  lastNameSchema,
  passwordConfirmSchema,
  passwordSchema,
} from "./_baseSchemas";

export const loginSchema = yup.object({
  email: emailSchema,
  password: passwordSchema,
});

export const signupSchema = yup.object({
  firstName: firstNameSchema,
  lastName: lastNameSchema,
  headline: headlineSchema,
  email: emailSchema,
  password: passwordSchema,
  passwordConfirm: passwordConfirmSchema,
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
  passwordConfirm: passwordConfirmSchema,
});
