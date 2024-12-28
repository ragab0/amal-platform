import * as yup from "yup";

const skillSchema = yup.object().shape({
  name: yup.string().required("اسم المهارة مطلوب"),
  levelPercentage: yup.number(),
  levelText: yup.string(),
});

export const skillsSchema = yup.object().shape({
  description: yup.string(),
  interests: yup.string(),
  languages: yup.array().of(skillSchema),
  softSkills: yup.array().of(skillSchema),
});
