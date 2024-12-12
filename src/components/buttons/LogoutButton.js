"use client";
import ConfirmModal from "@/components/modals/ConfirmModal";
import { useState } from "react";
import { useAppDispatch } from "@/hooks/ReduxHooks";
import { logout } from "@/store/features/auth/authThunks";
import { toast } from "react-toastify";

export default function LogoutButton({ className = "" }) {
  const dispatch = useAppDispatch();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  async function handleLogout() {
    const { error } = await dispatch(logout());
    if (!error) {
      toast.success("تم تسجيل الخروج بنجاح");
    }
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
