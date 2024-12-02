"use client";
import { useState } from "react";
import EyeIco from "@/assets/icons/EyeIco";

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
          <EyeIco className="w-6 h-6 md:w-8 md:h-8" />
        </button>
      )}

      {error && (
        <span
          className="text-red-500 text-sm mt-1 block"
          role="alert"
          id={`${name}-error`}
        >
          {error.message}
        </span>
      )}
    </div>
  );
}
