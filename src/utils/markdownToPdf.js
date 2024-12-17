import { Text } from "@react-pdf/renderer";

export function convertMarkdownToPdfText(markdown) {
  // This is a simple conversion.
  return markdown.split("\n").map((line, index) => {
    if (line.startsWith("# ")) {
      return (
        <Text key={index} style={[, { fontSize: 24, fontWeight: "bold" }]}>
          {line.replace("# ", "")}
        </Text>
      );
    }
    if (line.startsWith("## ")) {
      return (
        <Text key={index} style={[, { fontSize: 20, fontWeight: "bold" }]}>
          {line.replace("## ", "")}
        </Text>
      );
    }
    if (line.startsWith("- ")) {
      return (
        <Text key={index} style={[, { marginLeft: 10 }]}>
          • {line.replace("- ", "")}
        </Text>
      );
    }
    return <Text key={index}>{line}</Text>;
  });
}
