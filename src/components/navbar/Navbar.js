"use client";
import "./Navbar.css";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useAppSelector } from "@/hooks/ReduxHooks";
import { HiMenu, HiX } from "react-icons/hi";
import { navLinks, userMenuItems } from "@/assets/data/navbar";
import Logo from "../logo/Logo";
import Link from "next/link";
import NotificationBadge from "../notifications/NotificationBadge";
import User from "./components/User";
import UserMenu from "./components/UserMenu";
import DropdownMenu from "../drobDown/DropdownMenu";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user = {}, isAuthenticated } = useAppSelector((state) => state.auth);

  return (
    <nav className="relative bg-main">
      <div
        className={`container mx-auto px-4 py-[10px] flex ${
          isAuthenticated ? "" : "max-lg:flex-row-reverse"
        } gap-2 items-center justify-between`}
      >
        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <HiX className="w-8 h-8" />
          ) : (
            <HiMenu className="w-8 h-8" />
          )}
        </button>
        {/* Logo */}
        <div className="flex-shrink-0">
          {user.role === "admin" ? (
            <Link
              href="/admin"
              className="outline-bottom-hover text-white font-bold text-[1.25rem] flex items-center gap-1 py-2"
            >
              <FaUserCircle />
              لوحة التحكم
            </Link>
          ) : (
            <Logo isLittle={true} />
          )}
        </div>
        {/* Desktop Navigation */}
        <div className="navbar-items hidden lg:flex items-center justify-center">
          {navLinks.map((link, i) => (
            <Link
              key={i}
              href={link.href}
              className={`outline-bottom-hover mx-2 xl:mx-4 py-3 text-white hover:opacity-90 transition-all 
                duration-300 text-lg
                ${i === 0 ? "outline-bottom" : ""}
                `}
            >
              {link.name}
            </Link>
          ))}
        </div>
        {isAuthenticated ? (
          <>
            {/* User Section */}
            <div className="flex xl:gap-6 items-center space-x-4">
              <NotificationBadge />
              <DropdownMenu menuClassName="py-2" trigger={<User user={user} />}>
                <UserMenu userMenuItems={userMenuItems} />
              </DropdownMenu>
            </div>
          </>
        ) : (
          <div className="max-lg:hidden">
            <Link
              href="/login"
              className=" text-white hover:text-gray-200 px-4 py-2 transition-colors"
            >
              تسجيل الدخول
            </Link>
            <Link
              href="/signup"
              className="text-main bg-white hover:bg-gray-100 px-4 py-2 rounded-lg transition-colors"
            >
              إنشاء حساب
            </Link>
          </div>
        )}
      </div>

      {isMenuOpen && (
        <div className="lg:hidden z-[1000] absolute top-full left-0 w-full bg-main border-t border-white/20 text-white">
          <div className="px-4 py-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block py-2 hover:text-gray-200 transition-colors text-lg "
              >
                {link.name}
              </Link>
            ))}
            {!isAuthenticated && (
              <div className="flex flex-col gap-4 mt-4 py-4 items-center">
                <Link
                  href="/login"
                  className=" hover:text-gray-200 transition-colors "
                >
                  تسجيل الدخول
                </Link>
                <Link
                  href="/signup"
                  className="bg-white text-main px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors "
                >
                  إنشاء حساب
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
