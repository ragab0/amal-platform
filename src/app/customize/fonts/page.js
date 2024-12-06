import FontsForm from "./components/FontsForm";

export const metadata = {
  title: "تخصيص خطوط السيرة الذاتية | منصة أمل",
  description: "اختر وخصص خطوط سيرتك الذاتية لتحسين مظهرها وقابلية قراءتها",
  keywords: [
    "خطوط عربية",
    "تنسيق خطوط",
    "حجم الخط",
    "تصميم سيرة ذاتية",
    "منصة أمل",
  ],
  openGraph: {
    title: "تخصيص خطوط السيرة الذاتية | منصة أمل",
    description: "اختر وخصص خطوط سيرتك الذاتية لتحسين مظهرها وقابلية قراءتها",
    locale: "ar_SA",
    type: "website",
  },
};

export default function FontsPage() {
  return <FontsForm />;
}
