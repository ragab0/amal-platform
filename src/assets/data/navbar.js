export const navLinks = [
  { name: "بناء السيرة الذاتية", href: "/build" },
  { name: "تحليل السيرة الذاتية", href: "/analyze" },
  { name: "الخدمات", href: "/services" },
  { name: "الوظائف", href: "/jobs" },
  { name: "الاستشارات", href: "/consultents" },
  { name: "من نحن", href: "/about" },
];

export const userMenuItems = [
  { href: "/profile", label: "الملف الشخصي" },
  { href: "/cv", label: "السيرة الذاتية" },
  { href: "/customize", label: "تخصيص السيرة الذاتية" },
];

export const notifications = [
  {
    id: 1,
    message: "تم قبول طلب التوظيف الخاص بك",
    timestamp: new Date().toISOString(),
    read: false,
  },
  {
    id: 2,
    message: "لديك رسالة جديدة من المشرف",
    timestamp: new Date().toISOString(),
    read: true,
  },
  {
    id: 3,
    message: "تم تحديث حالة طلبك",
    timestamp: new Date().toISOString(),
    read: false,
  },
];
