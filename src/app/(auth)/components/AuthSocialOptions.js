import GoogleIco from "@/assets/icons/GoogleIco";
import LinkedInIco from "@/assets/icons/LinkedInIco";

export default function AuthSocialOptions({ pageName }) {
  return (
    <div className="mt-20">
      <h3 className="heading-h3 text-center mb-8">
        أو {pageName === "login" ? "تسجيل دخول عن طريق" : " انشاء حساب عن طريق"}
      </h3>
      <div className="flex max-md:flex-col gap-4 justify-center">
        <button className="btn-glass w-full" aria-label="تسجيل باستخدام Google">
          <span>Google حساب</span>
          <GoogleIco className="w-6 h-6" />
        </button>
        <button
          className="btn-glass w-full"
          aria-label="تسجيل باستخدام LinkedIn"
        >
          <span>LinkedIn حساب</span>
          <LinkedInIco className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
