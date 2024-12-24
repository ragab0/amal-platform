import { HiUsers, HiUserGroup, HiStar, HiUserCircle } from "react-icons/hi";

async function getStats() {
  return {
    totalUsers: 1250,
    activeUsers: 980,
    experts: 45,
    admins: 5,
  };
}

export default async function UsersStats() {
  const stats = await getStats();

  const statCards = [
    {
      title: "إجمالي المستخدمين",
      value: stats.totalUsers,
      icon: HiUsers,
      color: "blue",
    },
    {
      title: "المستخدمين النشطين",
      value: stats.activeUsers,
      icon: HiUserGroup,
      color: "green",
    },
    {
      title: "الخبراء",
      value: stats.experts,
      icon: HiStar,
      color: "yellow",
    },
    {
      title: "المشرفين",
      value: stats.admins,
      icon: HiUserCircle,
      color: "purple",
    },
  ];

  return (
    <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
      {statCards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.title}
            className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800"
          >
            <div
              className={`p-3 mr-4 text-${card.color}-500 bg-${card.color}-100 rounded-full dark:text-${card.color}-100 dark:bg-${card.color}-500`}
            >
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                {card.title}
              </p>
              <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                {card.value}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
