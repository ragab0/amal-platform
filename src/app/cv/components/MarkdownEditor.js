"use client";
import { useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Controller } from "react-hook-form";
import dynamic from "next/dynamic";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

const MDEditor = dynamic(
  () => import("@uiw/react-md-editor").then((mod) => mod.default),
  { ssr: false }
);

export const MDPreview = dynamic(
  () => import("@uiw/react-markdown-preview").then((mod) => mod.default),
  { ssr: false }
);

const MarkdownEditor = ({
  label,
  control,
  name,
  error,
  must = false,
  placeholder,
  ...props
}) => {
  const id = useId();

  return (
    <div className="flex flex-col mb-8" data-color-mode="light">
      <label
        htmlFor={id}
        className="mb-5 text-[22px] leading-[30px] font-cairo text-text"
      >
        {label}
        {must && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <MDEditor
              id={id}
              value={field.value || ""}
              onChange={field.onChange}
              textareaProps={{
                placeholder: placeholder,
              }}
              preview="edit"
              height={200}
              {...props}
            />
          )}
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

export default MarkdownEditor;
