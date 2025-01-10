import { StyleSheet, Font } from "@react-pdf/renderer";
import CairoRegular from "@/app/fonts/cairo/Cairo-Regular.ttf";
import CairoMedium from "@/app/fonts/cairo/Cairo-Medium.ttf";
import CairoSemiBold from "@/app/fonts/cairo/Cairo-SemiBold.ttf";
import CairoBold from "@/app/fonts/cairo/Cairo-Bold.ttf";

const rtl = {
  flexDirection: "row-reverse",
  textAlign: "right",
  direction: "rtl",
};

// Register font for different weights
Font.register({
  family: "Cairo",
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
});

export const styles = StyleSheet.create({
  page: {
    ...rtl,
    backgroundColor: "white",
    fontFamily: "Cairo",
    padding: 0,
    margin: 0,
  },
  mainContent: {
    width: "70%",
    backgroundColor: "white",
  },
  sideSection: {
    width: "30%",
    flexDirection: "column",
    backgroundColor: "#3f6184",
  },
  section: {
    paddingHorizontal: 12,
    marginBottom: 20,
  },
  sidebarSection: {
    paddingBottom: 50,
    paddingHorizontal: 10,
    backgroundColor: "#496f94",
    marginBottom: 0,
  },

  // Section Titles
  sectionTitle: {
    ...rtl,
    color: "#6b7f94",
    marginBottom: 5,
    borderBottom: "2px solid #6b7f94",
    fontSize: 15,
    fontWeight: 700,
  },
  sidebarTitle: {
    ...rtl,
    textAlign: "center",
    color: "white",
    paddingVertical: "10 5",
    marginBottom: 0,
    fontSize: 15,
    fontWeight: 700,
  },

  // Description section && its list items styles
  description: {
    color: "#333",
  },
  item: {
    ...rtl,
    gap: 5,
  },
  itemBullet: {
    ...rtl,
    fontSize: 12,
    color: "#6b7f94",
  },
  itemIcon: {
    width: 12,
    height: 12,
    marginTop: 4,
  },
  itemText: {
    ...rtl,
    flex: 1,
    fontSize: 11,
    color: "#333",
  },

  itemTitle: {
    ...rtl,
    fontSize: 11,
  },
  itemSubtitle: {
    ...rtl,
    fontSize: 12,
    color: "#666",
  },
  itemDate: {
    ...rtl,
    fontSize: 11,
    color: "#888",
  },

  // 01] Logo
  logoContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#6b7f94",
  },
  logo: {
    height: 138,
    width: "100%",
  },

  // 02] Contact Info
  contactText: {
    ...rtl,
    fontSize: 11,
    color: "white",
    lineHeight: 1.6,
  },

  // 03] Languages
  languageBar: {
    ...rtl,
    flex: 1,
    height: 10,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  languageLevel: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },

  // 01) Name;
  name: {
    ...rtl,
    textAlign: "center",
    color: "#5b7d97",
    fontSize: 20,
    marginTop: 30,
    fontWeight: 700,
  },
  title: {
    ...rtl,
    textAlign: "center",
    color: "#5b7d97",
    fontSize: 12,
    marginBottom: 20,
    fontWeight: 500,
  },
});
