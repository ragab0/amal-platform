import * as yup from "yup";

export const cvBuilderSchema = yup.object().shape({
  cvType: yup.string().required("الرجاء اختيار نوع السيرة الذاتية"),
  cvFile: yup.mixed(),
  linkedinUrl: yup.string(),
  template: yup.string().required("الرجاء اختيار قالب"),
});
