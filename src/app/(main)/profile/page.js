import { personalInfoInputs } from "@/assets/data/profileData";
import ProfilePersonalInfoClient from "./components/ProfilePersonalInfoClient";

export default function ProfilePersonalInfoPage() {
  return (
    <section>
      <ProfilePersonalInfoClient inputs={personalInfoInputs}>
        <h2 className="heading-sub-small">المعلومات الشخصية</h2>
      </ProfilePersonalInfoClient>
    </section>
  );
}
