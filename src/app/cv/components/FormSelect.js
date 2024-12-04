"use client";
import { useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
// import { ChevronDownIcon } from "@heroicons/react/24/outline";
import ChevronDownIcon from "@/assets/icons/DownArrowIcon";

const FormSelect = ({
  label,
  options = [],
  register,
  name,
  error,
  must = false,
  placeholder = "اختــر",
  ...props
}) => {
  const id = useId();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (register && name) {
      const event = {
        target: {
          name,
          value: option,
        },
      };
      register(name).onChange(event);
    }
  };

  return (
    <div className="flex flex-col mb-8">
      <label
        htmlFor={id}
        className="mb-5 text-[22px] leading-[30px] font-cairo text-text"
      >
        {label}
        {must && <span className="text-red-500">*</span>}
      </label>
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          id={id}
          onClick={() => setIsOpen(!isOpen)}
          className={`w-[350px] h-[60px] px-4 bg-white border rounded-[6px] transition-colors duration-200 
            focus:outline-none focus:ring-2 focus:ring-text focus:border-transparent flex items-center justify-between
            ${error ? "border-red-500" : "border-[#9D94A8]"}`}
          {...props}
        >
          <span className={selectedOption ? "text-text" : "text-gray-400"}>
            {selectedOption || placeholder}
          </span>
          <ChevronDownIcon
            className={`w-5 h-5 transition-transform duration-200 ${
              isOpen ? "transform rotate-180" : ""
            }`}
          />
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute z-50 w-full mt-1 bg-white border border-[#9D94A8] rounded-[6px] shadow-lg"
            >
              {options.map((option, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleSelect(option)}
                  className="w-full px-4 py-3 text-right hover:bg-gray-50 transition-colors duration-200"
                >
                  {option}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        <input
          type="hidden"
          {...(register && register(name))}
          value={selectedOption}
        />
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

export default FormSelect;
