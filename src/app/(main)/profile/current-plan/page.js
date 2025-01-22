import CurrentPlanDetails from "./components/CurrentPlanDetails";
import { services } from "@/assets/data/servicesData";

export const metadata = {
  title: "خطة الحساب - الإعدادات",
  description: "إدارة خطة حسابك وعرض المميزات المتاحة",
};

export default function CurrentPlanPage() {
  return (
    <section className="space-y-8">
      <CurrentPlanDetails services={services}>
        <h2 className="heading-sub-small">خطة الحساب</h2>
      </CurrentPlanDetails>
    </section>
  );
}
