"use client";
import { motion, AnimatePresence } from "framer-motion";
import CloseIcon from "@/assets/icons/DeleteIcon";

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = "تنبيـــه",
  message = "هل أنت متأكد على أنك تريد حذف هذا القسم؟",
  confirmText = "نعم",
  cancelText = "لا",
}) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50"
      >
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-[#461887] opacity-30"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-[1025px] bg-white rounded-t-[12px] shadow-[7px_7px_20px_#00000029]"
          >
            {/* Header */}
            <div className="h-[109px] bg-[#F9F5FF] rounded-t-[12px] flex items-center justify-between px-8">
              <h2 className="text-2xl font-semibold">{title}</h2>
              <button
                onClick={onClose}
                className="text-text hover:text-red-500 transition-colors"
              >
                <CloseIcon />
              </button>
            </div>

            {/* Body */}
            <div className="h-[291px] flex flex-col items-center justify-center">
              <p className="text-xl mb-8">{message}</p>
              <div className="flex gap-4">
                <button
                  onClick={onConfirm}
                  className="w-[180px] h-[50px] bg-main text-white rounded-[6px] hover:bg-opacity-90 transition-colors"
                >
                  {confirmText}
                </button>
                <button
                  onClick={onClose}
                  className="w-[180px] h-[50px] border border-main text-main rounded-[6px] hover:bg-main hover:text-white transition-colors"
                >
                  {cancelText}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
