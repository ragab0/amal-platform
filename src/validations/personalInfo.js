import * as yup from "yup";
import { emailSchema, phoneSchema } from "./_baseSchemas";

export const personalInfoSchema = yup.object().shape({
  fullName: yup.string().required("الاسم مطلوب"),
  headline: yup.string().required("العنوان المهني مطلوب"),
  email: emailSchema,
  phone: phoneSchema,
});
