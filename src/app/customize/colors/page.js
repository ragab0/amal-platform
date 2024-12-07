import ColorsForm from "./components/ColorsForm";

export const metadata = {
  title: "تخصيص ألوان السيرة الذاتية | منصة عمل",
  description: "اختر الألوان المناسبة لسيرتك الذاتية لتعكس شخصيتك المهنية",
  keywords: ["ألوان سيرة ذاتية", "تنسيق ألوان", "تصميم سيرة ذاتية", "منصة عمل"],
  openGraph: {
    title: "تخصيص ألوان السيرة الذاتية | منصة عمل",
    description: "اختر الألوان المناسبة لسيرتك الذاتية لتعكس شخصيتك المهنية",
    locale: "ar_SA",
    type: "website",
  },
};

export default function ColorsPage() {
  return <ColorsForm />;
}
