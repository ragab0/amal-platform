import LoginForm from "./LoginForm";

export const metadata = {
  title: "تسجيل الدخول - منصة عمل",
  description:
    "سجل دخولك إلى منصة عمل للوصول إلى خدماتنا المتميزة. يمكنك التسجيل باستخدام بريدك الإلكتروني أو حسابات التواصل الاجتماعي.",
  keywords: ["تسجيل الدخول", "منصة عمل", "خدمات", "حساب جديد"],
  openGraph: {
    title: "تسجيل الدخول - منصة عمل",
    description: "سجل دخولك إلى منصة عمل للوصول إلى خدماتنا المتميزة",
    type: "website",
    locale: "ar_SA",
  },
};

export default function LoginPage() {
  return (
    <main className="auth-page">
      <header className="auth-page-header">
        <h1 className="heading">تسجيل الدخول</h1>
      </header>
      <div className="auth-page-body">
        <LoginForm />
      </div>
    </main>
  );
}
