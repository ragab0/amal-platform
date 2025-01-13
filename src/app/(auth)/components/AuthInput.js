"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaEyeSlash, FaEye } from "react-icons/fa";

export default function AuthInput({
  type = "text",
  placeholder,
  register,
  name,
  error,
  className = "",
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className="relative w-full">
      <input
        type={inputType}
        placeholder={placeholder}
        className={`w-full py-4 text-xl md:text-2xl lg:text-3xl
          border-b border-text focus:outline-none focus:border-b-2 
          focus:border-b-black transition-[border] placeholder:text-gray-400
          ${error ? "border-red-500" : ""}
          ${className}`}
        {...register(name)}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${name}-error` : undefined}
        {...props}
      />

      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-text 
            hover:text-main transition-colors"
          aria-label={showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
        >
          {showPassword ? (
            <FaEye className="w-6 h-6 md:w-8 md:h-8" />
          ) : (
            <FaEyeSlash className="w-6 h-6 md:w-8 md:h-8" />
          )}
        </button>
      )}
      <AnimatePresence mode="wait">
        {error && (
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="mt-2 text-sm text-red-500 block"
            role="alert"
          >
            {error.message}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}
