import { FadeInUp, HoverCard } from "@/components/motion/MotionWrappers";
import { BsClockFill } from "react-icons/bs";

export const metadata = {
  title: "الإشعارات | منصة عمل",
  description: "تابع آخر التحديثات والإشعارات الخاصة بك على منصة عمل",
  keywords: ["إشعارات", "تنبيهات", "تحديثات", "وظائف", "فرص عمل", "منصة عمل"],
  openGraph: {
    title: "الإشعارات | منصة عمل",
    description: "تابع آخر التحديثات والإشعارات الخاصة بك على منصة عمل",
  },
};

const notifications = [
  {
    id: 1,
    message:
      "تهانينا! لقد تم قبولك في وظيفة مدير المبيعات، اضغط هنا للتواصل مع الشركة",
    time: "8 ساعة و5 دقائق",
    link: "#",
  },
  {
    id: 2,
    message: "تم مراجعة سيرتك الذاتية بنجاح، اضغط هنا لمعرفة التفاصيل",
    time: "يوم واحد",
    link: "#",
  },
  {
    id: 3,
    message: "لديك رسالة جديدة من شركة التقنية المتقدمة، اضغط هنا للرد",
    time: "3 أيام",
    link: "#",
  },
  {
    id: 4,
    message: "تم تحديث حالة طلبك الوظيفي، اضغط هنا لمعرفة المزيد",
    time: "أسبوع",
    link: "#",
  },
];

export default function NotificationsPage() {
  return (
    <div className="container mx-auto px-4 pb-[250px]">
      <div className="text-center my-[160px]">
        <FadeInUp>
          <h1 className="heading-big">الإشعارات</h1>
        </FadeInUp>
      </div>
      <div className="max-w-[900px] mx-auto">
        {notifications.map((notification, index) => (
          <HoverCard
            key={notification.id}
            className="bg-[#F9F5FF] shadow-[0px_3px_6px_#00000029] border border-[#E6E6E6] rounded-lg p-[50px] mb-6 cursor-pointer"
          >
            <div className="block">
              <p className="text-text-mutated text-xl lg:text-2xl mb-6">
                {notification.message}
              </p>
              <div className="flex items-center gap-2 ">
                <BsClockFill className="w-[19px] h-[19px]" />
                <span className="text-lg leading-6">
                  منذ {notification.time}
                </span>
              </div>
            </div>
          </HoverCard>
        ))}
      </div>
    </div>
  );
}
