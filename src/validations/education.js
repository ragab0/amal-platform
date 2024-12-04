import * as yup from "yup";

export const educationSchema = yup.object().shape({
  field: yup.string().required("المجال العلمي مطلوب"),
  institute: yup.string().required("المعهد مطلوب"),
  city: yup.string().required("المدينة مطلوبة"),
  country: yup.string().required("الدولة مطلوبة"),
  degree: yup.string().required("الدرجة العلمية مطلوبة"),
  graduationDate: yup.string().required("تاريخ التخرج مطلوب"),
  description: yup.string(),
});
