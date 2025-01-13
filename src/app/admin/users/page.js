"use client";
import Modal from "@/components/modals/ConfirmModal";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/ReduxHooks";
import { HiTrash, HiLockClosed, HiLockOpen } from "react-icons/hi";
import { FadeInUp } from "@/components/motion/MotionWrappers";
import {
  fetchUsers,
  updateUser,
  deleteUser,
  blockUser,
  unblockUser,
} from "@/store/features/admin/adminThunks";
import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";

// export const metadata = {
//   title: "إدارة المستخدمين | منصة عمل",
//   description: "إدارة المستخدمين في منصة عمل",
// };

export default function UsersPage() {
  const dispatch = useAppDispatch();
  const { results: users, loading } = useAppSelector(
    (state) => state.admin.users
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalAction, setModalAction] = useState(null);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleAction = (user, action) => {
    setSelectedUser(user);
    setModalAction(action);
    setIsModalOpen(true);
  };

  const getModalConfig = () => {
    switch (modalAction) {
      case "delete":
        return {
          title: "حذف مستخدم",
          message: `هل أنت متأكد من حذف المستخدم "${selectedUser?.name}"؟`,
          action: () => dispatch(deleteUser(selectedUser.id)),
        };
      case "block":
        return {
          title: selectedUser?.isBlocked ? "إلغاء حظر مستخدم" : "حظر مستخدم",
          message: `هل أنت متأكد من ${
            selectedUser?.isBlocked ? "إلغاء حظر" : "حظر"
          } المستخدم "${selectedUser?.name}"؟`,
          action: () =>
            selectedUser?.isBlocked
              ? dispatch(unblockUser(selectedUser.id))
              : dispatch(blockUser(selectedUser.id)),
        };
      default:
        return {};
    }
  };

  const confirmAction = async () => {
    try {
      const { action } = getModalConfig();
      await action().unwrap();
      setIsModalOpen(false);
      setSelectedUser(null);
      setModalAction(null);
    } catch (error) {
      // Error is handled by the thunk
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case "admin":
        return "text-red-600 bg-red-100";
      case "expert":
        return "text-green-600 bg-green-100";
      default:
        return "text-blue-600 bg-blue-100";
    }
  };

  return (
    <div className="container px-6 mx-auto">
      <h2 className="my-6 text-2xl font-semibold text-gray-200">
        إدارة المستخدمين
      </h2>
      <FadeInUp>
        <div className="w-full overflow-hidden rounded-lg shadow-xs">
          <div className="w-full overflow-x-auto">
            <table className="w-full whitespace-no-wrap">
              <thead>
                <tr className="text-xs font-semibold tracking-wide text-right uppercase border-b border-gray-700 text-gray-400 bg-gray-800">
                  <th className="px-4 py-3">المستخدم</th>
                  <th className="px-4 py-3">المسمي الوظيفي</th>
                  <th className="px-4 py-3">رقم الجوال</th>
                  <th className="px-4 py-3">البريد الإلكتروني</th>
                  <th className="px-4 py-3">التحقق</th>
                  <th className="px-4 py-3">الدور</th>
                  <th className="px-4 py-3">الحالة</th>
                  {/* <th className="px-4 py-3">العضوية</th> */}
                  <th className="px-4 py-3">تاريخ التسجيل</th>
                  {/* <th className="px-4 py-3">إجراءات</th> */}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700 bg-gray-800">
                {users.map((user, index) => (
                  <tr key={index} className="text-gray-400">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {index + 1}.
                        <div className="w-8 h-8 rounded-full">
                          {user.photo ? (
                            <Image
                              className="object-cover w-full h-full rounded-full"
                              src={user.photo}
                              alt={user.fname + " " + user.lname}
                              width={32}
                              height={32}
                              loading="lazy"
                            />
                          ) : (
                            <FaUserCircle className="h-full w-full" />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold">{user.name}</p>
                          <p className="text-xs text-gray-400">
                            {user.fname} {user.lname}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">{user.headline}</td>
                    <td className="px-4 py-3">{user.phone || "-"}</td>
                    <td className="px-4 py-3">{user.email}</td>
                    <td className="px-4 py-3">
                      {user.isVerified ? "نعم" : "لا"}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 font-semibold leading-tight rounded-full ${getRoleColor(
                          user.role
                        )}`}
                      >
                        {user.role === "admin"
                          ? "مشرف"
                          : user.role === "expert"
                          ? "خبير"
                          : "مستخدم"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 font-semibold leading-tight rounded-full ${
                          user.isActive
                            ? "text-green-600 bg-green-100"
                            : "text-red-600 bg-red-100"
                        }`}
                      >
                        {user.isActive ? "نشط" : "محظور"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleString()
                        : "-"}
                    </td>
                    {/* <td className="px-4 py-3">
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => handleAction(user, "block")}
                          className={`flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 rounded-lg ${
                            user.isActive
                              ? "text-red-600 hover:bg-red-100"
                              : "text-green-600 hover:bg-green-100"
                          } focus:outline-none focus:ring-2 focus:ring-primary-5`}
                        >
                          {user.isActive ? (
                            <HiLockClosed className="w-5 h-5" />
                          ) : (
                            <HiLockOpen className="w-5 h-5" />
                          )}
                        </button>
                        <button
                          onClick={() => handleAction(user, "delete")}
                          className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-red-600 rounded-lg hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                          <HiTrash className="w-5 h-5" />
                        </button>
                      </div>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </FadeInUp>
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedUser(null);
          setModalAction(null);
        }}
        onConfirm={confirmAction}
        {...getModalConfig()}
        confirmText={modalAction === "delete" ? "حذف" : "تأكيد"}
        cancelText="إلغاء"
      />
    </div>
  );
}
