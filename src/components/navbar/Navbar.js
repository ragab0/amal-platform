"use client";
import "./Navbar.css";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useAppSelector } from "@/hooks/ReduxHooks";
import { HiMenu, HiX } from "react-icons/hi";
import { navLinks, userMenuItems } from "@/assets/data/navbar";
import NotificationIco from "@/assets/icons/NotificationIco";
import Logo from "../logo/Logo";
import Link from "next/link";
import LogoutButton from "../buttons/LogoutButton";
import Image from "next/image";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {
    user = {},
    isAuthenticated,
    loading,
  } = useAppSelector((state) => state.auth);

  const AuthButtonsSkeleton = () => (
    <>
      <div className="h-8 w-24 bg-gray-300 animate-pulse rounded"></div>
      <div className="h-10 w-28 bg-gray-300 animate-pulse rounded-lg"></div>
    </>
  );

  return (
    <nav className="relative bg-main">
      <div className="container mx-auto px-4 py-[10px] flex gap-2 items-center justify-between">
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
        <div className="navbar-items hidden lg:flex items-center justify-center flex-1">
          {navLinks.map((link, i) => (
            <Link
              key={i}
              href={link.href}
              className={`outline-bottom-hover mx-2 xl:mx-4 py-3 text-white hover:opacity-90 transition-all duration-300 text-lg
                ${i === 0 ? "outline-bottom" : ""}
                `}
            >
              {link.name}
            </Link>
          ))}
        </div>
        {/* User Section */}
        <div className="hidden lg:flex gap-6 items-center space-x-4">
          {loading ? (
            <AuthButtonsSkeleton />
          ) : isAuthenticated ? (
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
              {/* User Profile */}
              <div className="relative group">
                <button className="flex items-center text-white gap-4 ">
                  <div className="flex flex-col justify-center text-center">
                    <span className="mr-2">
                      {user.fname && user.lname
                        ? `${user.fname} ${user.lname}`
                        : "UnNamed!"}
                    </span>
                    <span className="text-sm">
                      {user.email || "saleh@amal.com"}
                    </span>
                  </div>
                  {user.photo ? (
                    <Image
                      src={user.photo}
                      alt="User"
                      width={40}
                      height={40}
                      className="w-14 h-14 rounded-full"
                    />
                  ) : (
                    <FaUserCircle className="h-14 w-14" />
                  )}
                </button>
                <div className="absolute left-0 pt-2 z-50">
                  <div className="rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 hidden group-hover:block">
                    <ul className="py-1">
                      {userMenuItems.map((item, i) => (
                        <li key={i}>
                          <Link
                            href={item.href}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <LogoutButton className="block w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" />
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-white hover:text-gray-200 transition-colors"
              >
                تسجيل الدخول
              </Link>
              <Link
                href="/signup"
                className="bg-white text-main px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                إنشاء حساب
              </Link>
            </>
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
