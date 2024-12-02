import SignupForm from "./SignupForm";

export const metadata = {
  title: "إنشاء حساب - منصة عمل",
  description:
    "انضم إلى منصة عمل وأنشئ حسابك الجديد للوصول إلى خدماتنا المتميزة. يمكنك التسجيل باستخدام بريدك الإلكتروني أو حسابات التواصل الاجتماعي.",
  keywords: ["إنشاء حساب", "منصة عمل", "تسجيل", "حساب جديد"],
  openGraph: {
    title: "إنشاء حساب - منصة عمل",
    description:
      "انضم إلى منصة عمل وأنشئ حسابك الجديد للوصول إلى خدماتنا المتميزة",
    type: "website",
    locale: "ar_SA",
  },
};

const steps = [
  {
    text: "المعلومات الشخصية",
    fields: ["firstName", "lastName", "headline"],
  },
  {
    text: "معلومات الحساب",
    fields: ["email", "password", "passwordConfirm"],
  },
  { text: "تأكيد الحساب", fields: ["verificationCode"] },
];

export default function SignupPage() {
  return (
    <main className="auth-page">
      <header className="auth-page-header">
        <h1 className="heading">إنشاء حساب</h1>
      </header>
      <div className="auth-page-body">
        <SignupForm steps={steps} />
      </div>
    </main>
  );
}
