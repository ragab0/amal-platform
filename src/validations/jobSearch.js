import * as yup from "yup";

export const searchSchema = yup.object().shape({
  jobTitle: yup.string().max(100, "المسمى الوظيفي يجب أن يكون أقل من 100 حرف"),
  location: yup.string().max(100, "الموقع يجب أن يكون أقل من 100 حرف"),
});
