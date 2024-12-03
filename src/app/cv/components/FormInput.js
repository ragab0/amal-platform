"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useId } from "react";

const FormInput = ({
  label,
  type = "text",
  icon,
  register,
  name,
  error,
  must = false,
  ...props
}) => {
  const id = useId();

  return (
    <div className="flex flex-col mb-8">
      <label
        htmlFor={id}
        className="mb-5 text-[22px] leading-[30px] font-cairo text-text"
      >
        {label}
        {must && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <input
          id={id}
          type={type}
          className={`w-full h-[60px] px-4 bg-white border rounded-[6px] transition-colors duration-200 
            focus:outline-none focus:ring-2 focus:ring-text focus:border-transparent ${
              error ? "border-red-500" : "border-text"
            }`}
          {...(register && register(name))}
          {...props}
        />
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2">{icon}</div>
        )}
      </div>
      <AnimatePresence mode="wait">
        {error && (
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="mt-2 text-sm text-red-500"
          >
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FormInput;
