import "./page.css";
import { FadeInUp } from "@/components/motion/MotionWrappers";
import NotificationList from "@/components/notifications/NotificationList";

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
    <div className="notifications-page container mx-auto px-4 pb-[250px]">
      <div className="text-center my-[160px]">
        <FadeInUp>
          <h1 className="heading-big">الإشعارات</h1>
        </FadeInUp>
      </div>
      <NotificationList isPage={true} />
    </div>
  );
}
