import * as yup from "yup";

export const skillSchema = yup.object().shape({
  description: yup.string().required("الوصف مطلوب"),
  languages: yup.array().of(
    yup.object().shape({
      language: yup.string().required("اللغة مطلوبة"),
      level: yup.string().required("المستوى مطلوب"),
    })
  ),
  interests: yup.string().required("الاهتمامات مطلوبة"),
  otherSkills: yup.array().of(
    yup.object().shape({
      skill: yup.string().required("المهارة مطلوبة"),
      level: yup.string().required("المستوى مطلوب"),
    })
  ),
});
