"use client";
import "draft-js/dist/Draft.css";
import { useState, useRef } from "react";
import { IoSparklesOutline } from "react-icons/io5";
import { Controller } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/hooks/ReduxHooks";
import { generateDescription } from "@/store/features/ai/aiThunks";
import { toast } from "react-toastify";
import { markdownToDraft } from "markdown-draft-js";
import {
  FiBold,
  FiItalic,
  FiUnderline,
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
const TEMP_RES = {
  status: "success",
  result:
    "**مدير مبيعات | New horizons | القاهرة، مصر**\n\n*   قيادة وتوجيه فريق المبيعات لتحقيق الأهداف البيعية وتجاوزها.\n*   تطوير وتنفيذ استراتيجيات المبيعات الفعالة لزيادة الحصة السوقية والإيرادات.\n*   بناء علاقات قوية مع العملاء الرئيسيين والحفاظ عليها.\n*   تحليل اتجاهات السوق وتحديد الفرص الجديدة للنمو.\n*   إعداد تقارير دورية عن أداء المبيعات وتقديم التوصيات اللازمة.\n*   إدارة عمليات البيع من البداية إلى النهاية، بما في ذلك إعداد العروض والتفاوض وإتمام الصفقات.\n*   تدريب وتطوير فريق المبيعات لضمان تحقيق أعلى مستويات الأداء.\n",
};

export default function DraftEditor({
  title,
  name,
  control,
  error,
  placeholder,
  aiPrompt,
}) {
  const dispatch = useAppDispatch();
  const editorRef = useRef(null);
  const { loading } = useAppSelector((state) => state.ai);

  function handleKeyCommand(command, editorState, { setEditorState }) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  }

  function toggleInlineStyle(style, editorState, setEditorState) {
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  }

  function toggleBlockType(blockType, editorState, setEditorState) {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  }

  async function fillWithAdvice(setEditorState) {
    const { payload, error } = await dispatch(generateDescription(aiPrompt));
    if (error) {
      return;
      return toast.error("فشل توليد الوصف");
    }

    try {
      const draftRaw = markdownToDraft(payload.result);
      const contentState = convertFromRaw(draftRaw);
      setEditorState(EditorState.createWithContent(contentState));
    } catch (_) {
      console.log("Failed to convert the generated markdown to draft");
      const contentState = ContentState.createFromText(
        payload.result?.replaceAll("*", "")
      );
      setEditorState(EditorState.createWithContent(contentState));
    }
  }

  function ToolbarButton({ icon: Icon, onClick, isActive, testId }) {
    return (
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
  }

  if (!aiPrompt) {
    return <h1>AiPrompt is needed</h1>;
  }

  return (
    <div
      className="draft-editor"
      style={
        loading
          ? {
              opacity: ".5",
              pointerEvents: "none",
            }
          : {}
      }
    >
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
              <div className="flex items-center gap-1 p-2 border-b border-text overflow-auto">
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

                    {loading ? (
                      <span
                        className="text-xs animate-spin h-4 w-4 border-2 border-r-main rounded-full"
                        title="جاري التوليد"
                      ></span>
                    ) : (
                      <span className="text-xs">نصـــــــائح</span>
                    )}
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
