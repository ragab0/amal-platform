import "./admin.css";
import AdminSidebar from "./components/AdminSidebar";
import AdminHeader from "./components/AdminHeader";

export const metadata = {
  title: "لوحة التحكم",
  description: "لوحة تحكم المشرفين في منصة نبذة",
};

export default function AdminLayout({ children }) {
  return (
    <div className="admin-panel flex h-screen bg-gray-900">
      <AdminSidebar />
      <div className="flex-1 flex flex-col w-full overflow-hidden">
        <AdminHeader />
        <main className="h-full overflow-y-auto p-4 relative">
          <div className="container mx-auto pb-[200px]">{children}</div>
        </main>
      </div>
    </div>
  );
}
