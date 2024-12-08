import { accountInfoInputs } from "@/assets/data/profileData";
import ProfileAccountInfoClient from "./components/ProfileAccountInfoClient";

export const metadata = {
  title: 'معلومات الحساب',
  description: 'صفحة معلومات الحساب الشخصية',
};

export default function ProfileAccountInfoPage() {
  return (
    <section>
      <ProfileAccountInfoClient inputs={accountInfoInputs}>
        <h2 className="text-[32px] font-bold">معلومات الحساب</h2>
      </ProfileAccountInfoClient>
    </section>
  );
}
