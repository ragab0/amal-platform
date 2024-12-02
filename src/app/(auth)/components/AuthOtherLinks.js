import Link from "next/link";
const links = {
  login: [
    {
      text: "نسيت كلمة المرور؟",
      href: "/forgotPassword",
    },
    {
      text: "ليس لديك حساب؟",
      href: "/signup",
    },
  ],
  signup: [
    {
      text: "لديك حساب بالفعل؟",
      href: "/login",
    },
  ],
  forgotPassword: [
    {
      text: "العودة لتسجيل الدخول",
      href: "/login",
    },
  ],
};

export default function AuthOtherLinks({ pageName }) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-8">
      {links[pageName].map((link, index) => (
        <Link
          key={index}
          href={link.href}
          className="text-blue hover:text-indigo-700 underline underline-offset-8 
                      text-lg md:text-xl transition-colors"
        >
          {link.text}
        </Link>
      ))}
    </div>
  );
}
