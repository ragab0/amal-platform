"use client";
import "draft-js/dist/Draft.css";
import { EditorState, convertFromRaw, Editor } from "draft-js";

export default function DraftPreview({
  title,
  source,
  className,
  inContainer = false,
}) {
  if (!source) return null;

  try {
    const editorState = EditorState.createWithContent(
      convertFromRaw(JSON.parse(source))
    );

    return (
      <div
        className={`${
          inContainer
            ? "w-full rounded-lg shadow-sm border border-gray-200 p-4"
            : ""
        } ${className}`}
      >
        {inContainer && title && (
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          </div>
        )}
        <div className="prose max-w-none">
          <Editor
            editorState={editorState}
            readOnly={true}
            textAlignment="right"
            textDirectionality="RTL"
          />
        </div>
      </div>
    );
  } catch (e) {
    return null;
  }
}
