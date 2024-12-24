import Link from "next/link";
import LogoutButton from "@/components/buttons/LogoutButton";

export default function AdminHeader() {
  return (
    <header className="z-10 py-4 shadow-md bg-gray-800">
      <div className="container flex items-center justify-between h-full px-6 mx-auto text-primary-1">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="px-4 py-2 text-sm font-medium transition-colors duration-150 rounded-md hover:text-primary-6 text-gray-400"
          >
            العودة للرئيسية
          </Link>
        </div>
        <LogoutButton />
      </div>
    </header>
  );
}
