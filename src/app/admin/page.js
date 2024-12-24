import DashboardStats from "./components/DashboardStats";

export default function AdminDashboard() {
  return (
    <div className="container px-6 mx-auto">
      <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        لوحة التحكم
      </h2>
      <DashboardStats />
    </div>
  );
}
