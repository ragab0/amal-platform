import * as yup from "yup";
import {
  emailSchema,
  fnameSchema,
  headlineSchema,
  lnameSchema,
  passwordConfirmSchema,
  passwordSchema,
  phoneSchema,
} from "./_baseSchemas";

export const settingsPersonalInfoSchema = yup.object({
  fname: fnameSchema,
  lname: lnameSchema,
  headline: headlineSchema,
  phone: phoneSchema,
  country: yup.string().required("الدولة مطلوبة"),
});

export const settingsAccountInfoSchema = yup.object({
  email: emailSchema,
  password: passwordSchema,
  passwordConfirm: passwordConfirmSchema,
});
