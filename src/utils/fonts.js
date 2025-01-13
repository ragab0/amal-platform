import { Font } from "@react-pdf/renderer";
import { fonts } from "@/assets/data/fontsData";

export function registerFonts() {
  Object.values(fonts).forEach((font) => {
    Font.register({
      family: font.name,
      fonts: [{ src: font.regular }, { src: font.bold, fontWeight: "bold" }],
    });
  });
}
