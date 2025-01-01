import { FadeInUp, HoverCard } from "@/components/motion/MotionWrappers";
import NotificationBadge from "@/components/notifications/NotificationBadge";

export const metadata = {
  title: "الإشعارات | منصة عمل",
  description: "تابع آخر التحديثات والإشعارات الخاصة بك على منصة عمل",
  keywords: ["إشعارات", "تنبيهات", "تحديثات", "وظائف", "فرص عمل", "منصة عمل"],
  openGraph: {
    title: "الإشعارات | منصة عمل",
    description: "تابع آخر التحديثات والإشعارات الخاصة بك على منصة عمل",
  },
};

export default function NotificationsPage() {
  return (
    <div className="container mx-auto px-4 pb-[250px]">
      <div className="text-center my-[160px]">
        <FadeInUp>
          <h1 className="heading-big">الإشعارات</h1>
        </FadeInUp>
      </div>
      <NotificationBadge />
    </div>
  );
}
