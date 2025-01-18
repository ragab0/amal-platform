import { stateToHTML } from "draft-js-export-html";
import { convertFromRaw, EditorState } from "draft-js";
import Html from "react-pdf-html";

/**
 *   "draft-js-export-html": "^1.4.1",
 *   "draft-js-import-html": "^1.4.1",
 *   "react-pdf-html": "^2.1.3",
 */

const rtl = {
  display: "flex",
  flexDirection: "row-reverse",
  textAlign: "right",
  direction: "rtl",
};

const defaultStyles = {
  ul: {
    ...rtl,
    padding: 0,
    margin: 0,
  },
  li: {
    ...rtl,
    display: "flex",
    flexDirection: "row-reverse",
    gap: 5,
    marginBottom: 2,
    color: "#333",
  },
  "li::before": {
    content: "•",
    fontSize: 12,
    color: "#6b7f94",
    marginLeft: 5,
  },
  text: {
    ...rtl,
    flex: 1,
    fontSize: 11,
    color: "#333",
    fontFamily: "cairo",
  },
  strong: {
    fontWeight: 700,
    color: "#333",
  },
  em: {
    fontStyle: "italic",
    color: "#333",
  },
  u: {
    textDecoration: "underline",
    color: "#333",
  },
};

export function draftToPdfText(
  draftTxt,
  mainBlockStyle,
  itemStyle,
  itemBullitStyle,
  itemTextStyle
) {
  if (!draftTxt) return "";
  try {
    const rawContent = JSON.parse(draftTxt);
    const contentState = convertFromRaw(rawContent);
    const editorState = EditorState.createWithContent(contentState);
    const html = stateToHTML(editorState.getCurrentContent());

    console.log("HTML IS:", html);

    const styles = {
      // ...defaultStyles,
      // ul: {
      //   ...defaultStyles.ul,
      //   ...mainBlockStyle,
      // },
      // li: {
      //   ...defaultStyles.li,
      //   ...itemStyle,
      // },
      // "li::before": {
      //   ...defaultStyles["li::before"],
      //   ...itemBullitStyle,
      // },
      // text: {
      //   ...defaultStyles.text,
      //   ...itemTextStyle,
      // },
      p: {
        ...itemTextStyle,
        margin: 0,
        padding: 0,
      },
      ol: {
        margin: 0,
        padding: 0,
        fontSize: 11,
        textAlign: "right",
        direction: "rtl",
      },
      ["ol > li"]: {
        margin: 0,
        display: "flex",
        flexDirection: "row-reverse",
        textAlign: "right",
        direction: "rtl",
        justifyContent: "flex-start",
        flex: 1,
      },
      // li: {
      //   // ...itemTextStyle,
      //   margin: 0,
      // },
      // ul: {
      //   display: "flex",
      //   flexDirection: "column",
      //   margin: 0,
      //   padding: 0,
      // },
    };
    const htmlPdf = (
      <Html
        stylesheet={{ ...styles, fontSize: 11, lineHeight: 1.5 }}
        collapse={true}
      >
        {html}
      </Html>
    );

    console.log("###########################", htmlPdf);

    return htmlPdf;
  } catch (error) {
    console.error("Error converting content:", error);
    return "";
  }
}
