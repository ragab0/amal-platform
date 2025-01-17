import * as yup from "yup";

export const coursesSchema = yup.object().shape({
  courseName: yup.string().required("اسم الدورة مطلوب"),
  instituteName: yup.string().required("اسم المعهد/المؤسسة مطلوب"),
  startDate: yup.string().required("تاريخ البداية مطلوب"),
  endDate: yup.string().required("تاريخ النهاية مطلوب"),
});
