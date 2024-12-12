export const personalInfoInputs = [
  {
    name: "fname",
    label: "الاسم الأول",
    placeholder: "أدخل اسمك الأول",
  },
  {
    name: "lname",
    label: "الاسم الأخير",
    placeholder: "أدخل الاسم الأخير",
  },
  {
    name: "headline",
    label: "المسمى الوظيفي",
    placeholder: "أدخل المسمى الوظيفي",
  },
  {
    name: "phone",
    label: "الهاتف",
    placeholder: "أدخل رقم هاتفك",
  },
  {
    name: "country",
    label: "الدولة",
    placeholder: "أدخل الدولة",
  },
];

export const accountInfoInputs = [
  {
    name: "email",
    label: "البريد الإلكتروني",
    placeholder: "أدخل بريدك الإلكتروني",
    type: "email",
  },
  {
    name: "password",
    label: "كلمة المرور الجديدة",
    placeholder: "أدخل كلمة المرور الجديدة",
    type: "password",
  },
  {
    name: "passwordConfirm",
    label: "تأكيد كلمة المرور الجديدة",
    placeholder: "أعد إدخال كلمة المرور الجديدة",
    type: "password",
  },
];

export const menuItems = [
  {
    id: "personal",
    label: "المعلومات الشخصية",
    href: "/profile",
  },
  {
    id: "account",
    label: "معلومات الحساب",
    href: "/profile/account",
  },
];
