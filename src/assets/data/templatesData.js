import temp1 from "@/assets/imgs/templates/temp1.png";

export const templatesApi = [
  {
    id: "template1",
    category: "احترافي حديث",
    image: temp1,
    customizeOptions: {
      personalInfo: {
        arabicTitle: "المعلومات الشخصية",
        fields: {
          nationality: {
            arabicName: "الجنسية",
            isSelected: true,
          },
          phone: {
            arabicName: "رقم الجوال",
            isSelected: true,
          },
          email: {
            arabicName: "البريد الالكتروني",
            isSelected: true,
          },
          birthDate: {
            arabicName: "تاريخ الميلاد",
            isSelected: true,
          },
          location: {
            arabicName: "الموقع",
            isSelected: true,
          },
          // fullName: {
          //   arabicName: "الاسم الكامل",
          //   isSelected: true,
          // },
          // headline: {
          //   arabicName: "المسمي الوظيفي",
          //   isSelected: true,
          // },
          // description: {
          //   arabicName: "الوصف الشخصي",
          //   isSelected: true,
          // },
        },
      },
      languages: {
        arabicTitle: "اللغات",
        fields: {
          proficiencyLevel: {
            arabicName: "مستوى الإتقان",
            isSelected: true,
          },
        },
      },
      volunteers: {
        arabicTitle: "العمل التطوعي",
        fields: {
          description: {
            arabicName: "الوصف",
            isSelected: true,
          },
        },
      },
      educations: {
        arabicTitle: "المؤهل العلمي",
        fields: {
          institute: {
            arabicName: "اسم المؤسسة التعليمية",
            isSelected: true,
          },
          description: {
            arabicName: "الوصف الشخصي",
            isSelected: true,
          },
        },
      },
      experiences: {
        arabicTitle: "الخبرات العملية",
        fields: {
          location: {
            arabicName: "الموقع",
            isSelected: true,
          },
          date: {
            arabicName: "التاريخ",
            isSelected: true,
          },
          description: {
            arabicName: "الوصف",
            isSelected: true,
          },
        },
      },

      softSkills: {
        arabicTitle: "المهارات الشخصية",
        fields: {
          skillName: {
            arabicName: "المهارة",
            isSelected: true,
          },
        },
      },
    },
  },
];
