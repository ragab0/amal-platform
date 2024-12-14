import * as yup from "yup";

export const aboutSchema = yup.object({
  description: yup.string().required("الوصف الشخصي مطلوب"),
});
