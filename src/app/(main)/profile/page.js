import { personalInfoInputs } from "@/assets/data/profileData";
import ProfilePersonalInfoClient from "./components/ProfilePersonalInfoClient";

export default function ProfilePersonalInfoPage() {
  return (
    <section>
      <ProfilePersonalInfoClient inputs={personalInfoInputs}>
        <h2 className="text-[32px] font-bold">المعلومات الشخصية</h2>
      </ProfilePersonalInfoClient>
    </section>
  );
}
