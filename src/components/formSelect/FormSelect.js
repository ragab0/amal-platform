"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect, useId } from "react";
import ChevronDownIcon from "@/assets/icons/DownArrowIcon";

const FormSelect = ({
  label,
  options = [],
  defaultOption = "اختر...",
  register,
  name,
  error,
  must = false,
  spaceBlock = true,
  labelClass = "",
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultOption || "");
  const dropdownRef = useRef(null);
  const id = useId();

  useEffect(() => {
    if (defaultOption) {
      setSelectedOption(defaultOption);
    }
  }, [defaultOption]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const { onChange, ...rest } = register(name);

  const handleSelect = (option) => {
    setSelectedOption(option);
    onChange({ target: { value: option, name } });
    setIsOpen(false);
  };

  return (
    <div className={`flex flex-col ${spaceBlock ? "mb-8" : "mb-0"}`}>
      {label && (
        <label
          htmlFor={id}
          className={`mb-5 text-[22px] leading-[30px] font-cairo text-text ${labelClass}`}
        >
          {label}
          {must && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          id={id}
          onClick={() => setIsOpen(!isOpen)}
          className={`form-select-button w-full h-[60px] px-4 bg-white border rounded-[6px] transition-colors duration-200 
            focus:outline-none focus:ring-2 focus:ring-text focus:border-transparent flex items-center justify-between
            ${error ? "border-red-500" : "border-text"}`}
          {...props}
        >
          <span className={selectedOption ? "text-text" : "text-gray-400"}>
            {selectedOption || defaultOption}
          </span>
          <ChevronDownIcon
            className={`w-5 h-5 transition-transform duration-200 ${
              isOpen ? "transform rotate-180" : ""
            }`}
          />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.ul
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5, height: 0, overflow: "hidden" }}
              className="absolute z-10 w-full mt-1 bg-white border border-text rounded-[6px] shadow-lg max-h-60 overflow-auto"
            >
              {options.map((option, index) => (
                <li
                  key={index}
                  onClick={() => handleSelect(option)}
                  className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                    selectedOption === option ? "bg-gray-100" : ""
                  }`}
                >
                  {option}
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
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
