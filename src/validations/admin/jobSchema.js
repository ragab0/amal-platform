import * as yup from "yup";

export const jobSchema = yup.object({
  jobName: yup.string().required("اسم الوظيفة مطلوب"),
  companyName: yup.string().required("اسم الشركة مطلوب"),
  location: yup.string().required("الموقع مطلوب"),
  desc: yup.string().required("الوصف مطلوب"),
});
