"use client";
import React, { useState } from "react";
import Link from "next/link";
import ConfirmModal from "@/components/modals/ConfirmModal";
import { usePathname } from "next/navigation";

export default function ProfileMenu({ menuItems }) {
  const pathname = usePathname();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  function logoutHandler() {
    console.log("Logging out...");
    setShowLogoutModal(false);
  }

  return (
    <div className="my-10">
      {menuItems.map((item) => (
        <Link
          key={item.id}
          href={item.href}
          className={`block text-xl mb-6 cursor-pointer hover:text-main transition-colors ${
            pathname === item.href ? "text-main font-bold" : "font-medium"
          }`}
        >
          {item.label}
        </Link>
      ))}
      {/* Logout Button */}
      <button
        onClick={() => setShowLogoutModal(true)}
        className="text-xl py-5 text-shadow-plate cursor-pointer hover:text-red-600 transition-colors"
      >
        تسجيل الخروج
      </button>
      {/* Modal comp */}
      {showLogoutModal && (
        <ConfirmModal
          isOpen={showLogoutModal}
          onClose={() => setShowLogoutModal(false)}
          onConfirm={logoutHandler}
          title="تنبيـــه"
          message="هل أنت متأكد من رغبتك في تسجيل الخروج؟"
          confirmText="موافق"
          cancelText="إلغــــاء"
        />
      )}
    </div>
  );
}
