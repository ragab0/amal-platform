import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
  page: {
    flexDirection: "row-reverse",
    backgroundColor: "white",
    padding: 0,
  },
  sideSection: {
    width: "30%",
    backgroundColor: "#496E94",
    padding: 20,
    color: "white",
  },
  mainSection: {
    width: "70%",
    padding: 30,
  },
  logo: {
    width: 120,
    height: 120,
    alignSelf: "center",
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "right",
  },
  title: {
    fontSize: 18,
    marginBottom: 30,
    textAlign: "right",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#33637F",
    textAlign: "right",
  },
  sideSectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 15,
    color: "white",
    textAlign: "right",
  },
  infoRow: {
    flexDirection: "row-reverse",
    alignItems: "center",
    marginBottom: 10,
  },
  icon: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
  infoText: {
    fontSize: 12,
    color: "white",
  },
  bulletPoint: {
    flexDirection: "row-reverse",
    alignItems: "center",
    marginBottom: 8,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#33637F",
    marginLeft: 8,
  },
  whiteBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "white",
    marginLeft: 8,
  },
  bulletText: {
    fontSize: 12,
  },
  description: {
    fontSize: 12,
    marginBottom: 20,
    lineHeight: 1.5,
    textAlign: "right",
  },
  experienceItem: {
    marginBottom: 15,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "right",
  },
  itemSubtitle: {
    fontSize: 12,
    marginBottom: 5,
    color: "#666",
    textAlign: "right",
  },
  volunteerSection: {
    marginTop: "auto",
    backgroundColor: "#33637F",
    padding: 15,
    borderRadius: 8,
  },
});
