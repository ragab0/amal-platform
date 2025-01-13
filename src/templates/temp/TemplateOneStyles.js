import { StyleSheet, Font } from "@react-pdf/renderer";
import { cairoRegister } from "../shared/RegisteredFonts";

Font.register(cairoRegister);

const rtl = {
  flexDirection: "row-reverse",
  textAlign: "right",
  direction: "rtl",
};

export const createStyle = ({
  fontFamily = "cairo",
  fontSize = 11,
  titleFontSize = 15,
}) =>
  StyleSheet.create({
    page: {
      ...rtl,
      backgroundColor: "white",
      fontFamily: fontFamily,
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
      fontSize: titleFontSize,
      fontWeight: 700,
    },
    sidebarTitle: {
      ...rtl,
      textAlign: "center",
      color: "white",
      paddingVertical: "10 5",
      marginBottom: 0,
      fontSize: titleFontSize,
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
      fontSize: fontSize + 1,
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
      fontSize,
      color: "#333",
    },

    itemTitle: {
      ...rtl,
      fontSize,
    },
    itemSubtitle: {
      ...rtl,
      fontSize: fontSize + 1,
      color: "#666",
    },
    itemDate: {
      ...rtl,
      fontSize,
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
      fontSize,
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
      fontSize: titleFontSize * 1.33333,
      marginTop: 30,
      fontWeight: 700,
    },
    title: {
      ...rtl,
      textAlign: "center",
      color: "#5b7d97",
      fontSize: fontSize + 1,
      marginBottom: 20,
      fontWeight: 500,
    },
  });
