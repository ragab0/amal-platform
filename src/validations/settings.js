import * as yup from "yup";
import {
  emailSchema,
  firstNameSchema,
  headlineSchema,
  lastNameSchema,
  passwordConfirmSchema,
  passwordSchema,
  phoneSchema,
} from "./_baseSchemas";

export const settingsPersonalInfoSchema = yup.object({
  firstName: firstNameSchema,
  lastName: lastNameSchema,
  headline: headlineSchema,
  phone: phoneSchema,
  country: yup.string().required("الدولة مطلوبة"),
});

export const settingsAccountInfoSchema = yup.object({
  email: emailSchema,
  password: passwordSchema,
  passwordConfirm: passwordConfirmSchema,
});
