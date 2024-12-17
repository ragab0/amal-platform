"use client";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useId, useEffect, useState } from "react";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import dynamic from "next/dynamic";
// import AIIcon from "@/assets/icons/CalenderIcon";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

export default function DraftEditor({
  label,
  value,
  onChange,
  error,
  must = false,
  placeholder = "اكتب هنا...",
}) {
  const id = useId();
  const [editorState, setEditorState] = useState(() => {
    if (value) {
      try {
        return EditorState.createWithContent(convertFromRaw(JSON.parse(value)));
      } catch (e) {
        return EditorState.createEmpty();
      }
    }
    return EditorState.createEmpty();
  });

  useEffect(() => {
    if (value) {
      try {
        const contentState = convertFromRaw(JSON.parse(value));
        setEditorState(EditorState.createWithContent(contentState));
      } catch (e) {
        setEditorState(EditorState.createEmpty());
      }
    }
  }, [value]);

  const handleEditorChange = (newState) => {
    setEditorState(newState);
    const content = newState.getCurrentContent();
    onChange(JSON.stringify(convertToRaw(content)));
  };

  return (
    <div className="flex flex-col mb-8" data-color-mode="light">
      <label
        htmlFor={id}
        className="mb-5 text-[22px] leading-[30px] font-cairo text-text"
      >
        {label}
        {must && <span className="text-red-500">*</span>}
      </label>
      <div className="relative bg-white rounded-lg shadow-sm border border-text/20">
        <Editor
          editorState={editorState}
          onEditorStateChange={handleEditorChange}
          placeholder={placeholder}
          toolbar={{
            options: ["inline", "textAlign"],
            inline: {
              options: ["bold", "italic", "underline"],
            },
            textAlign: {
              options: ["right", "center", "left"],
              // defaultValue: "right",
            },
            // AI: {
            //   component: () => (
            //     <button
            //       type="button"
            //       className="flex items-center gap-2 text-text hover:text-primary transition-colors px-4 py-2 rounded-lg hover:bg-gray-50"
            //       onClick={() => {}}
            //     >
            //       {/* <AIIcon className="w-5 h-5" /> */}
            //       <span>توليد وصف</span>
            //     </button>
            //   ),
            // },
          }}
          editorClassName="min-h-[200px] px-4 py-2"
          toolbarClassName="border-none !p-2 flex justify-between text-right"
          localization={{
            locale: "ar",
          }}
          textAlignment="right"
        />
      </div>
      {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
    </div>
  );
}

export function DraftPreview({ content }) {
  if (!content) return null;

  const contentState = convertFromRaw(JSON.parse(content));
  const editorState = EditorState.createWithContent(contentState);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-text/20 p-4 w-full">
      <Editor
        editorState={editorState}
        readOnly
        toolbarHidden
        textDirectionality="RTL"
      />
    </div>
  );
}
