import { FadeInUp } from "@/components/motion/MotionWrappers";
import { menuItems } from "@/assets/data/profileData";
import ProfileMenu from "./components/ProfileMenu";
import ProfileImg from "./components/ProfileImg";
import UserName from "./components/UserName";

export const metadata = {
  title: "الإعدادات - الملف الشخصي",
  description: "صفحة الإعدادات والملف الشخصي للمستخدم",
};

export default function ProfileLayout({ children }) {
  return (
    <div>
      <header className="text-center my-[160px]">
        <FadeInUp>
          <h1 className="heading-big">الإعدادات</h1>
        </FadeInUp>
      </header>
      <div className="flex max-lg:flex-col gap-[50px] p-8">
        {/* First Side - Profile Overview */}
        <FadeInUp className="lg:w-[25%] shadow-sm border border-[#E6E6E6] rounded-[8px] px-6 py-10">
          <FadeInUp delay={0.2}>
            <h2 className="heading-sub-small mb-10">الملف الشخصي</h2>
          </FadeInUp>
          <FadeInUp delay={0.4}>
            <ProfileImg />
          </FadeInUp>
          <FadeInUp delay={0.6} className="text-center">
            <UserName />
          </FadeInUp>
          <FadeInUp delay={0.8}>
            <ProfileMenu menuItems={menuItems} />
          </FadeInUp>
        </FadeInUp>
        {/* Second Side - Dynamic Side */}
        <FadeInUp className="flex-1 bg-white shadow-sm border border-[#E6E6E6] rounded-[8px] px-4 md:px-16 py-10">
          <FadeInUp delay={1}>{children}</FadeInUp>
        </FadeInUp>
      </div>
    </div>
  );
}
