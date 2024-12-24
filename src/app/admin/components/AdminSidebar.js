"use client";
import Link from "next/link";
import Logo from "@/components/logo/Logo";
import LogoutButton from "@/components/buttons/LogoutButton";
import { usePathname } from "next/navigation";
import { navItems } from "@/assets/data/adminData";

export default function AdminSidebar() {
  const pathname = usePathname();
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="z-30 flex-shrink-0 hidden w-64 overflow-y-auto bg-gray-800 md:block">
        <div className="py-4">
          <Logo isLittle={true} className="mx-auto" />
          <ul className="mt-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <li className="relative px-6 py-3" key={item.href}>
                  {pathname === item.href && (
                    <span className="absolute inset-y-0 right-0 w-1 bg-primary-6 rounded-tl-lg rounded-bl-lg" />
                  )}
                  <Link
                    href={item.href}
                    className={`inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-primary-7 ${
                      pathname !== item.href
                        ? "text-primary-6"
                        : "text-gray-100"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="mr-4">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="px-6 mt-6">
            <LogoutButton className="w-full px-4 py-2 text-sm font-medium text-gray-600 transition-colors duration-150 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400" />
          </div>
        </div>
      </aside>

      {/* Mobile Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-20 bg-white border-t border-gray-200 md:hidden">
        <div className="flex justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center py-2 px-3 ${
                  isActive
                    ? "text-gray-600 hover:text-primary-7"
                    : "text-primary-6"
                }`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-xs mt-1">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
