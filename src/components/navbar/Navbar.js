"use client";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { FaUserCircle } from "react-icons/fa";
import NotificationIco from "@/assets/icons/NotificationIco";
import Logo from "../logo/Logo";
import Link from "next/link";

const navLinks = [
  { name: "الرئيسية", href: "/" },
  { name: "من نحن", href: "/about" },
  { name: "الخدمات", href: "/services" },
  { name: "الوظائف", href: "/jobs" },
  { name: "الاستشارات", href: "/consultations" },
];

const userInfo = {
  name: "محمد أحمد",
  email: "mohamed@example.com",
};

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <nav className="relative bg-main">
      <div className="container mx-auto px-4 py-[10px] flex gap-2 items-center justify-between">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Logo isLittle={true} />
        </div>
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center justify-center flex-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="mx-4 text-white hover:text-gray-200 transition-colors  text-lg"
            >
              {link.name}
            </Link>
          ))}
        </div>
        {/* User Section */}
        <div className="hidden lg:flex gap-6 items-center space-x-4 ">
          {isLoggedIn ? (
            <>
              {/* Notification Icon */}
              <div className="relative">
                <Link
                  href="/notifications"
                  className="bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-90"
                >
                  <NotificationIco className="w-10 h-10 p-2" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    3
                  </span>
                </Link>
              </div>
              {/* User Info */}
              <div className="flex gap-4 items-center space-x-3 text-center text-white">
                <div>
                  <p className="text-xl font-medium">{userInfo.name}</p>
                  <p className="t font-poppins text-sm">{userInfo.email}</p>
                </div>
                <Link href="/profile" className="w-[55px] h-[55px]">
                  <FaUserCircle className="w-full h-full t" />
                </Link>
              </div>
            </>
          ) : (
            <div className="flex gap-2 items-center ">
              <Link
                href="/login"
                className="text-white hover:text-gray-200 transition-colors "
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
      </div>
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-main border-t border-white/20 text-white">
          <div className="px-4 py-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block py-2  hover:text-gray-200 transition-colors  text-lg "
              >
                {link.name}
              </Link>
            ))}
            {!isLoggedIn && (
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
