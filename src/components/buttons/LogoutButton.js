"use client";
import { useState } from "react";
import ConfirmModal from "@/components/modals/ConfirmModal";
import { useAppDispatch } from "@/hooks/ReduxHooks";
import { logout } from "@/store/features/auth/authThunks";

export default function LogoutButton({ className = "" }) {
  const dispatch = useAppDispatch();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  function handleLogout() {
    dispatch(logout());
    setShowLogoutModal(false);
  }

  return (
    <>
      <button onClick={() => setShowLogoutModal(true)} className={className}>
        تسجيل الخروج
      </button>
      {showLogoutModal && (
        <ConfirmModal
          isOpen={showLogoutModal}
          onClose={() => setShowLogoutModal(false)}
          onConfirm={handleLogout}
          title="تنبيـــه"
          message="هل أنت متأكد من رغبتك في تسجيل الخروج؟"
          confirmText="موافق"
          cancelText="إلغــــاء"
        />
      )}
    </>
  );
}
