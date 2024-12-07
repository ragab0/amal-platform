import TemplatesGrid from "./components/TemplatesGrid";

export const metadata = {
  title: "اختيار قالب السيرة الذاتية | منصة عمل",
  description:
    "اختر من بين مجموعة متنوعة من قوالب السيرة الذاتية المصممة خصيصاً لاحتياجاتك المهنية",
  keywords: [
    "قوالب سيرة ذاتية",
    "تصميم سيرة ذاتية",
    "نماذج سيرة ذاتية",
    "منصة عمل",
  ],
  openGraph: {
    title: "اختيار قالب السيرة الذاتية | منصة عمل",
    description:
      "اختر من بين مجموعة متنوعة من قوالب السيرة الذاتية المصممة خصيصاً لاحتياجاتك المهنية",
    locale: "ar_SA",
    type: "website",
  },
};

export default function TemplatesPage() {
  return <TemplatesGrid />;
}
