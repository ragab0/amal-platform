import { StyleSheet, Font } from "@react-pdf/renderer";
import CairoRegular from "@/app/fonts/cairo/Cairo-Regular.ttf";
import CairoMedium from "@/app/fonts/cairo/Cairo-Medium.ttf";
import CairoSemiBold from "@/app/fonts/cairo/Cairo-SemiBold.ttf";
import CairoBold from "@/app/fonts/cairo/Cairo-Bold.ttf";

// Register font for different weights
Font.register({
  family: "Cairo",
  fonts: [
    {
      src: CairoRegular,
      fontWeight: 400,
    },
    {
      src: CairoMedium,
      fontWeight: 500,
    },
    {
      src: CairoSemiBold,
      fontWeight: 600,
    },
    {
      src: CairoBold,
      fontWeight: 700,
    },
  ],
});

export const styles = StyleSheet.create({
  page: {
    flexDirection: "row-reverse",
    backgroundColor: "white",
    fontFamily: "Cairo",
    padding: 0,
    margin: 0,
    direction: "rtl",
    textAlign: "right",
  },
  mainContent: {
    width: "70%",
    backgroundColor: "white",
  },
  sideSection: {
    width: "30%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#3f6184",
  },
  section: {
    paddingHorizontal: 12,
    marginBottom: 25,
  },
  sidebarSection: {
    paddingBottom: 50,
    paddingHorizontal: 10,
    backgroundColor: "#496f94",
    marginBottom: 0,
  },

  // Section Titles && items && lists
  sectionTitle: {
    color: "#6b7f94",
    marginBottom: 5,
    borderBottom: "2px solid #6b7f94",
    fontSize: 15,
    fontWeight: 700,
  },
  sidebarTitle: {
    color: "white",
    textAlign: "center",
    paddingVertical: "10 5",
    marginBottom: 0,
    fontSize: 15,
    fontWeight: 700,
  },
  listItem: {
    position: "relative",
    display: "flex",
    flexDirection: "row-reverse",
  },
  itemTitle: {
    fontSize: 11,
  },
  itemSubtitle: {
    fontSize: 12,
    color: "#666",
  },
  itemDate: {
    fontSize: 11,
    color: "#888",
    marginTop: "-5px",
  },
  bullet: {
    marginLeft: 5,
    fontSize: 12,
    color: "white",
  },
  description: {
    lineHeight: 1.6,
    fontSize: 11,
    color: "#333",
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
  contactItem: {
    display: "flex",
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 5,
    fontSize: 12,
    color: "white",
  },
  contactIcon: {
    width: 16,
    height: 16,
    color: "white",
  },
  contactText: {
    fontSize: 11,
    color: "white",
    lineHeight: 1.6,
  },

  // 03] Languages
  languageItem: {
    display: "flex !important",
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 10,
  },
  languageItemName: {
    flexShrink: 0,
  },
  languageBar: {
    flex: 1,
    height: 10,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    marginTop: 5,
  },
  languageLevel: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },

  // 04] Volunteer Work
  volunteerList: {
    marginRight: 10,
  },
  volunteerSubItem: {
    fontSize: 10,
    marginTop: 2,
    color: "white",
  },

  // 01) Name;
  name: {
    textAlign: "center",
    color: "#5b7d97",
    fontSize: 20,
    marginTop: 30,
    fontWeight: 700,
  },
  title: {
    textAlign: "center",
    color: "#5b7d97",
    fontSize: 12,
    marginBottom: 20,
    fontWeight: 500,
  },

  // 02) Objective;
  // 03) Education;
  // 04) Experience
  // 05) Courses;
  // 06) Personal Skills;
  experienceItem: {
    marginBottom: 15,
    fontSize: 12,
  },
});