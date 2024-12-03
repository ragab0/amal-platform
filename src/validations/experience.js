import * as yup from 'yup';

export const experienceSchema = yup.object().shape({
  jobTitle: yup.string().required('اسم الوظيفة مطلوب'),
  company: yup.string().required('اسم الشركة مطلوب'),
  city: yup.string().required('المدينة مطلوبة'),
  country: yup.string().required('الدولة مطلوبة'),
  startDate: yup.string().required('تاريخ البداية مطلوب'),
  endDate: yup.string().required('تاريخ النهاية مطلوب'),
  description: yup.string(),
});
