"use client";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/ReduxHooks";
import { fetchUsers } from "@/store/features/admin/adminThunks";
import { FadeInUp } from "@/components/motion/MotionWrappers";
import { HiUsers, HiOfficeBuilding, HiStar } from "react-icons/hi";

export default function DashboardStats() {
  const dispatch = useAppDispatch();
  const {
    users,
    jobs: { results: jobResults },
    reviews: { results: reviewsResults },
  } = useAppSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const stats = [
    {
      title: "المستخدمين",
      count: users.stats.total || 0,
      icon: HiUsers,
      details: [
        { label: "نشط", value: users.stats.active || 0 },
        { label: "خبراء", value: users.stats.experts || 0 },
        { label: "مشرفين", value: users.stats.admins || 0 },
      ],
    },
    {
      title: "الوظائف",
      count: jobResults?.length || 0,
      icon: HiOfficeBuilding,
      details: [
        {
          label: "متاحة",
          value:
            jobResults?.filter((job) => job.status === "active").length || 0,
        },
        {
          label: "مغلقة",
          value:
            jobResults?.filter((job) => job.status === "closed").length || 0,
        },
      ],
    },
    {
      title: "التقييمات",
      count: reviewsResults?.length || 0,
      icon: HiStar,
      details: [
        {
          label: "متوسط التقييم",
          value: reviewsResults?.length
            ? (
                reviewsResults.reduce((acc, review) => acc + review.rating, 0) /
                reviewsResults.length
              ).toFixed(1)
            : 0,
        },
      ],
    },
  ];

  return (
    <>
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-3">
        {stats.map((item) => (
          <FadeInUp key={item.title}>
            <div className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
              <div className="p-3 mr-4 text-primary-6 bg-primary-1 rounded-full dark:text-primary-1 dark:bg-primary-6">
                <item.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                  {item.title}
                </p>
                <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                  {item.count}
                </p>
                <div className="mt-2">
                  {item.details.map((detail) => (
                    <div
                      key={detail.label}
                      className="text-sm text-gray-600 dark:text-gray-400"
                    >
                      {detail.label}: {detail.value}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeInUp>
        ))}
      </div>

      <div className="grid gap-6 mb-8 md:grid-cols-2">
        <FadeInUp>
          <div className="min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
            <h4 className="mb-4 font-semibold text-gray-800 dark:text-gray-300">
              نشاط المستخدمين
            </h4>
            {/* user activity chart  */}
          </div>
        </FadeInUp>

        <FadeInUp>
          <div className="min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
            <h4 className="mb-4 font-semibold text-gray-800 dark:text-gray-300">
              إحصائيات التقييمات
            </h4>
            {/* reviews stats chart  */}
          </div>
        </FadeInUp>
      </div>
    </>
  );
}
