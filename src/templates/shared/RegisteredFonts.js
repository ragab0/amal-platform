import CairoRegular from "@/app/fonts/cairo/Cairo-Regular.ttf";
import CairoMedium from "@/app/fonts/cairo/Cairo-Medium.ttf";
import CairoSemiBold from "@/app/fonts/cairo/Cairo-SemiBold.ttf";
import CairoBold from "@/app/fonts/cairo/Cairo-Bold.ttf";

export const cairoRegister = {
  family: "cairo",
  fonts: [
    {
      src: CairoRegular,
      fontWeight: 400,
    },
    {
      src: CairoRegular,
      fontWeight: 400,
      fontStyle: "italic",
    },
    {
      src: CairoMedium,
      fontWeight: 500,
    },
    {
      src: CairoMedium,
      fontWeight: 500,
      fontStyle: "italic",
    },
    {
      src: CairoSemiBold,
      fontWeight: 600,
    },
    {
      src: CairoSemiBold,
      fontWeight: 600,
      fontStyle: "italic",
    },
    {
      src: CairoBold,
      fontWeight: 700,
    },
    {
      src: CairoBold,
      fontWeight: 700,
      fontStyle: "italic",
    },
  ],
};
