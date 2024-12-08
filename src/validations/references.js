import * as yup from "yup";
import { emailSchema, phoneSchema } from "./_baseSchemas";

export const referencesSchema = yup.object().shape({
  name: yup.string().required("اسم الشخص مطلوب"),
  company: yup.string().required("اسم الشركة مطلوب"),
  email: emailSchema,
  phone: phoneSchema,
});
