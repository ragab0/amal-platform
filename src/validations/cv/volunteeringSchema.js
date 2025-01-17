import * as yup from "yup";

export const volunteeringSchema = yup.object().shape({
  title: yup.string().required("عنوان العمل التطوعي مطلوب"),
  description: yup.string(),
  startDate: yup.string().required("تاريخ البداية مطلوب"),
  endDate: yup.string().required("تاريخ النهاية مطلوب"),
});
