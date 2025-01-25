"use client";
import Link from "next/link";
import { useAppSelector } from "@/hooks/ReduxHooks";
import { FadeIn, FadeInUp } from "@/components/motion/MotionWrappers";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import {
  FaCrown,
  FaRegCalendarAlt,
  FaCheckCircle,
  FaRocket,
} from "react-icons/fa";

export default function CurrentPlanDetails({ services, children }) {
  const { currentPlan = { type: "free" } } = useAppSelector(
    (state) => state.auth.user
  );

  const currentPlanService = services.find((s) => s.id === currentPlan.type);
  const stats = [
    {
      name: "نوع الباقة",
      value: currentPlanService.title,
      icon: FaCrown,
      iconClassName: currentPlanService.clr,
    },
    ...(currentPlan.type !== "free"
      ? [
          {
            name: "قيمة الاشتراك",
            value: `$${currentPlan.amount}`,
            icon: RiMoneyDollarCircleFill,
            iconClassName: "text-green-500",
          },
          {
            name: "تاريخ بداية الاشتراك",
            value: format(new Date(currentPlan.startDate), "d MMMM yyyy", {
              locale: ar,
            }),
            icon: FaRegCalendarAlt,
            iconClassName: "text-blue-500",
          },
          {
            name: "تاريخ نهاية الاشتراك",
            value: format(new Date(currentPlan.endDate), "d MMMM yyyy", {
              locale: ar,
            }),
            icon: FaRegCalendarAlt,
            iconClassName: "text-red-500",
          },
          // ,{
          //   name: "حالة الاشتراك",
          //   value: currentPlan.status === "active" ? "نشط" : "منتهي",
          //   icon: FaCheckCircle,
          //   iconClassName:
          //     currentPlan.status === "active"
          //       ? "text-green-500"
          //       : "text-red-500",
          // },
        ]
      : []),
  ];

  return (
    <>
      <header>
        <FadeInUp>{children}</FadeInUp>
        <div className=" hidden">
          <span className="text-gray-500 bg-gray-100"></span>
          <span className="text-green-500 bg-green-50"></span>
          <span className="text-yellow-500 bg-yellow-50"></span>
        </div>
      </header>
      <div className="space-y-12">
        <div className={`rounded-xl p-8 lg:border ${currentPlanService.bgClr}`}>
          <div className="grid sm:grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <FadeIn
                key={stat.name}
                delay={0.3 + index * 0.1}
                className={"grid"}
              >
                <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                  <div className="flex max-sm:flex-col max-sm:text-center items-center gap-4">
                    <div
                      className={`p-3 rounded-full ${currentPlanService.bgClr}`}
                    >
                      <stat.icon className={`w-8 h-8 ${stat.iconClassName}`} />
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">{stat.name}</p>
                      <p className="text-xl font-medium mt-1">{stat.value}</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        <FadeIn delay={0.4 + stats.length * 0.1} className="space-y-6">
          <h2 className="text-xl font-medium flex items-center gap-2">
            <FaRocket className="text-main" />
            مميزات الباقة الحالية
          </h2>

          <div
            className={`p-6 rounded-lg border space-y-4 ${currentPlanService.bgClr}`}
          >
            <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
              <FaCrown className={currentPlanService.clr} />
              {currentPlanService.title}
            </h3>
            <ul className="space-y-3">
              {currentPlanService.items.map((feature, index) => (
                <FadeIn
                  key={index}
                  delay={0.6 + stats.length * 0.1 + index * 0.1}
                >
                  <li className="flex items-center gap-2">
                    <FaCheckCircle className="text-green-500 shrink-0" />
                    <span>{feature}</span>
                  </li>
                </FadeIn>
              ))}
            </ul>
            {currentPlanService.type === "free" && (
              <FadeIn
                delay={
                  0.8 +
                  stats.length * 0.1 +
                  currentPlanService.items.length * 0.1
                }
              >
                <Link
                  href="/services"
                  className="text-gray-600 block underline"
                >
                  قم بترقية حسابك الآن للحصول على مميزات إضافية والوصول إلى جميع
                  الخدمات المتاحة
                </Link>
              </FadeIn>
            )}
          </div>
        </FadeIn>
      </div>
    </>
  );
}
