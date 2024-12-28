"use client";
import "draft-js/dist/Draft.css";
import { useState, useRef } from "react";
import { IoSparklesOutline } from "react-icons/io5";
import { Controller } from "react-hook-form";
import {
  FiBold,
  FiItalic,
  FiUnderline,
  FiLink,
  FiList,
  FiAlignLeft,
} from "react-icons/fi";
import {
  Editor,
  EditorState,
  RichUtils,
  ContentState,
  convertToRaw,
  convertFromRaw,
} from "draft-js";

const TEMP_ADVICE = `أنا مطور برمجيات متحمس مع خبرة 5 سنوات في تطوير تطبيقات الويب. متخصص في React وNode.js، مع سجل حافل في تقديم حلول مبتكرة وعالية الأداء. شغوف بالتعلم المستمر وتحسين مهاراتي التقنية.`;

export default function DraftEditor({
  title,
  name,
  control,
  error,
  placeholder,
}) {
  const editorRef = useRef(null);

  const handleKeyCommand = (command, editorState, { setEditorState }) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };

  const toggleInlineStyle = (style, editorState, setEditorState) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  const toggleBlockType = (blockType, editorState, setEditorState) => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };

  const fillWithAdvice = (setEditorState) => {
    const contentState = ContentState.createFromText(TEMP_ADVICE);
    setEditorState(EditorState.createWithContent(contentState));
  };

  const ToolbarButton = ({ icon: Icon, onClick, isActive, testId }) => (
    <button
      type="button"
      data-testid={testId}
      onClick={onClick}
      className={`p-2 rounded hover:bg-gray-100 ${
        isActive ? "text-blue-600" : ""
      }`}
    >
      <Icon size={16} />
    </button>
  );

  return (
    <div className="draft-editor">
      <h3 className="heading-h3 mb-5">{title}</h3>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field: { onChange, value } }) => {
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const [editorState, setEditorState] = useState(() => {
            if (value) {
              try {
                const contentState = convertFromRaw(JSON.parse(value));
                return EditorState.createWithContent(contentState);
              } catch (e) {
                return EditorState.createEmpty();
              }
            }
            return EditorState.createEmpty();
          });

          const handleEditorChange = (newState) => {
            setEditorState(newState);
            const contentState = newState.getCurrentContent();
            const rawContent = convertToRaw(contentState);
            onChange(JSON.stringify(rawContent));
          };

          return (
            <div className="border border-text rounded-md overflow-hidden">
              {/* Toolbar */}
              <div className="flex items-center gap-1 p-2 border-b border-text">
                <div className="flex items-center">
                  <ToolbarButton
                    icon={FiAlignLeft}
                    onClick={() =>
                      toggleBlockType(
                        "ordered-list-item",
                        editorState,
                        handleEditorChange
                      )
                    }
                  />
                  <ToolbarButton
                    icon={FiList}
                    onClick={() =>
                      toggleBlockType(
                        "unordered-list-item",
                        editorState,
                        handleEditorChange
                      )
                    }
                  />
                </div>
                <div className="w-px h-6 bg-gray-300 mx-1" />
                <div className="flex items-center">
                  <ToolbarButton
                    icon={FiUnderline}
                    onClick={() =>
                      toggleInlineStyle(
                        "UNDERLINE",
                        editorState,
                        handleEditorChange
                      )
                    }
                    testId="toolbar-btn-UNDERLINE"
                  />
                  <ToolbarButton
                    icon={FiItalic}
                    onClick={() =>
                      toggleInlineStyle(
                        "ITALIC",
                        editorState,
                        handleEditorChange
                      )
                    }
                    testId="toolbar-btn-ITALIC"
                  />
                  <ToolbarButton
                    icon={FiBold}
                    onClick={() =>
                      toggleInlineStyle("BOLD", editorState, handleEditorChange)
                    }
                    testId="toolbar-btn-BOLD"
                  />
                </div>
                {/* <div className="w-px h-6 bg-gray-300 mx-1" />
                <ToolbarButton
                  icon={FiLink}
                  onClick={() => {}}
                  testId="toolbar-btn-hyperlink"
                /> */}
                <div className="flex-1 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    className="flex items-center gap-2 p-2 px-6 hover:bg-gray-100 text-second me-[3%] text-[10px]
                      border-2 border-main rounded-2xl
                    "
                    onClick={() => fillWithAdvice(handleEditorChange)}
                  >
                    <IoSparklesOutline size={14} />
                    <span className="text-xs">نصـــــــائح</span>
                  </button>
                </div>
              </div>
              {/* Editor */}
              <div
                className="p-4 min-h-[200px]"
                onClick={() => editorRef.current?.focus()}
              >
                <Editor
                  ref={editorRef}
                  editorState={editorState}
                  onChange={handleEditorChange}
                  handleKeyCommand={(command) =>
                    handleKeyCommand(command, editorState, {
                      setEditorState: handleEditorChange,
                    })
                  }
                  placeholder={placeholder}
                  textAlignment="right"
                  textDirectionality="RTL"
                />
              </div>
            </div>
          );
        }}
      />
      {error && <span className="text-red-500 text-sm mt-2">{error}</span>}
    </div>
  );
}
