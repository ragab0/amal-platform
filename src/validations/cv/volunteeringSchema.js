import * as yup from "yup";

export const volunteeringSchema = yup.object().shape({
  title: yup.string().required("عنوان العمل التطوعي مطلوب"),
  description: yup.string(),
  startDate: yup.date().nullable(),
  endDate: yup.date().nullable(),
});
