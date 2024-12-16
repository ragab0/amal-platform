import { convertFromRaw } from "draft-js";

export const convertDraftToPlainText = (draftContent) => {
  if (!draftContent) return "";

  try {
    const contentState = convertFromRaw(JSON.parse(draftContent));
    return contentState.getPlainText();
  } catch (e) {
    console.error("Error converting draft content:", e);
    return "";
  }
};
