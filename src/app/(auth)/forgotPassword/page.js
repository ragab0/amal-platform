import ForgotPasswordForm from "./ForgotPasswordForm";

export const metadata = {
  title: "نسيت كلمة المرور - منصة عمل",
  description:
    "استعد كلمة المرور الخاصة بك على منصة عمل. أدخل بريدك الإلكتروني وسنرسل لك رابطاً لإعادة تعيين كلمة المرور.",
  keywords: ["نسيت كلمة المرور", "استعادة كلمة المرور", "منصة عمل"],
  openGraph: {
    title: "نسيت كلمة المرور - منصة عمل",
    description: "استعد كلمة المرور الخاصة بك على منصة عمل",
    type: "website",
    locale: "ar_SA",
  },
};

const title = "ادخل بريدك الإلكتروني وسنرسل لك رابط لإعادة تعيين كلمة المرور";

export default function ForgotPasswordPage() {
  return (
    <main className="auth-page">
      <header className="auth-page-header">
        <h1 className="heading">نسيت كلمة المرور؟</h1>
      </header>
      <div className="auth-page-body">
        <div className="auth-box">
          <ForgotPasswordForm title={title} />
        </div>
      </div>
    </main>
  );
}
