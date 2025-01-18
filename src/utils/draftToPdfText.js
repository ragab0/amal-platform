import { Text, View } from "@react-pdf/renderer";

export function draftToPdfText(
  draftTxt,
  mainBlockStyle,
  itemStyle,
  itemBullitStyle,
  itemTextStyle
) {
  if (!draftTxt) return "";
  try {
    const draftContent = JSON.parse(draftTxt);
    console.log("draftContent:", draftContent);
    return (
      <View style={mainBlockStyle}>
        {draftContent.blocks.map((block, index) => {
          if (!block || !block.text) return null;

          let text = block.text;
          const styledSegments = [];

          // Create a map of positions to their styles
          const styleMap = new Map();

          // Fill the style map with all style ranges
          if (Array.isArray(block.inlineStyleRanges)) {
            block.inlineStyleRanges.forEach((range) => {
              const start = range.offset;
              const end = range.offset + range.length;

              for (let i = start; i < end; i++) {
                if (!styleMap.has(i)) {
                  styleMap.set(i, new Set());
                }
                styleMap.get(i).add(range.style);
              }
            });
          }

          // Convert the style map to segments
          let currentStyles = new Set();
          let currentStart = 0;

          // Process text character by character
          for (let i = 0; i <= text.length; i++) {
            const posStyles = styleMap.get(i) || new Set();

            // If styles changed or we're at the end, create a segment
            if (i === text.length || !setsEqual(currentStyles, posStyles)) {
              if (i > currentStart) {
                const styles = {};
                if (currentStyles.has("BOLD")) {
                  styles.fontWeight = 700;
                }
                if (currentStyles.has("ITALIC")) {
                  styles.fontStyle = "italic";
                }
                if (currentStyles.has("UNDERLINE")) {
                  styles.textDecoration = "underline";
                }

                styledSegments.push({
                  text: text.slice(currentStart, i),
                  styles,
                });
              }
              currentStart = i;
              currentStyles = new Set(posStyles);
            }
          }

          return (
            <View
              key={block.key}
              style={[itemStyle, { lineHeight: 1 }]}
              wrap={false}
            >
              {block.type === "unordered-list-item" && (
                <Text style={itemBullitStyle}>•</Text>
              )}
              {block.type === "ordered-list-item" && (
                <Text style={itemBullitStyle}>{index + 1}.</Text>
              )}
              <Text style={itemTextStyle}>
                {styledSegments.length > 0 ? (
                  styledSegments.map((segment, i) => (
                    <Text
                      key={`${block.key}-${i}`}
                      style={{
                        ...itemTextStyle,
                        ...segment.styles,
                      }}
                    >
                      {segment.text}
                    </Text>
                  ))
                ) : (
                  <Text style={itemTextStyle}>{text}</Text>
                )}
              </Text>
            </View>
          );
        })}
      </View>
    );
  } catch (error) {
    console.log("Error parsing draft content:", error);
    return "";
  }
}

// Helper function to compare sets
function setsEqual(a, b) {
  if (a.size !== b.size) return false;
  for (const item of a) {
    if (!b.has(item)) return false;
  }
  return true;
}
