"use client";
import getLocalDate from "@/utils/getLocalDate";
import { styles } from "./Styles";
import { Document, Page, Text, View, Image } from "@react-pdf/renderer";
import { draftToPdfText } from "@/utils/draftToPdfText";
import { personalIcons } from "./components/personalIcons";

function getDate(date) {
  if (!date) return "";
  try {
    return new Intl.DateTimeFormat("ar-EG", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(date));
  } catch (error) {}
}

function getLocation(country, city) {
  if (country && city) {
    return `${country} - ${city}`;
  } else if (country || city) {
    return country || city;
  }
}

export default function Template1({ data = {} }) {
  const {
    personalInfo = {},
    volunteers = [],
    allSkills = {},
    educations = [],
    experiences = [],
    courses = [],
    // references = [],
  } = data;
  const {
    // description = "",
    // interests = "",
    // otherSkills = [],
    languages = [],
    softSkills = [],
  } = allSkills;

  // const experiences = experiencesFull.map((exp) => ({
  //   description: exp.description,
  // }));

  const ourPersonalInfo = [...personalIcons]
    .map(([k, v], i) => ({
      text:
        k === "location"
          ? getLocation(personalInfo.country, personalInfo.city)
          : k === "birthDate"
          ? getLocalDate(personalInfo[k])
          : personalInfo[k],
      Icon: v,
    }))
    .filter((o) => o.text);

  return (
    <Document
      author={personalInfo.fullName}
      keywords="resume"
      subject={`The resume of ${personalInfo.fullName}`}
      title={`${personalInfo.fullName} - Resume`}
    >
      <Page size="LETTER" style={styles.page} renderMode="svg">
        {/* Side Section */}
        <View style={styles.sideSection}>
          <View style={styles.logoContainer}>
            <Image src="/imgs/cv-logo.png" style={styles.logo} alt="CV Logo" />
          </View>

          {ourPersonalInfo.length > 0 && (
            <View style={[styles.section, styles.sidebarSection]}>
              <Text style={styles.sidebarTitle}>المعلومات الشخصية</Text>
              {ourPersonalInfo.map(({ text, Icon }, i) => (
                <View style={styles.item} key={i}>
                  <Icon style={styles.itemIcon} />
                  <Text style={[styles.itemText, { color: "#fff" }]}>
                    {text}
                  </Text>
                </View>
              ))}
            </View>
          )}

          {languages.length > 0 && (
            <View
              style={[styles.sidebarSection, { backgroundColor: "#456b8f" }]}
            >
              <Text style={styles.sidebarTitle}>اللغات</Text>
              {languages.map(({ name, levelPercentage }, index) => (
                <View
                  key={index}
                  style={[styles.item, { alignItems: "center", gap: 10 }]}
                >
                  <View
                    style={[
                      styles.item,
                      {
                        flexShrink: 0,
                        verticalAlign: "middle",
                      },
                    ]}
                  >
                    <Text style={[styles.itemBullet, { color: "white" }]}>
                      •
                    </Text>
                    <Text style={[styles.itemTitle, { color: "white" }]}>
                      {name}
                    </Text>
                  </View>
                  <View style={styles.languageBar}>
                    <View
                      style={[
                        styles.languageLevel,
                        { width: `${levelPercentage}%` },
                      ]}
                    />
                  </View>
                </View>
              ))}
            </View>
          )}

          {volunteers.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sidebarTitle}>العمل التطوعي</Text>
              {volunteers.map((volunteer, index) => (
                <View key={index} style={{ marginBottom: 2.5 }}>
                  <Text style={styles.contactText}>{volunteer.title}</Text>
                  {draftToPdfText(
                    volunteer.description,
                    styles.description,
                    { ...styles.item, color: "white" },
                    { ...styles.itemBullet, color: "white" },
                    { ...styles.itemText, color: "white" }
                  )}
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Main Content */}
        <View style={styles.mainContent}>
          <Text style={styles.name}>{personalInfo.fullName}</Text>
          <Text style={styles.title}>{personalInfo.headline}</Text>

          {personalInfo.description && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>الهدف الوظيفي</Text>
              {draftToPdfText(
                personalInfo.description,
                styles.description,
                styles.item,
                styles.itemBullet,
                styles.itemText
              )}
            </View>
          )}

          {educations.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>المؤهل العلمي</Text>
              {educations.map((edu, index) => (
                <View key={index} style={{ marginBottom: 2.5 }}>
                  <View
                    style={[
                      styles.item,
                      { lineHeight: 1, alignItems: "center" },
                    ]}
                  >
                    <View style={[styles.item]}>
                      <Text style={[styles.itemTitle]}>
                        {edu.degree} {edu.field}
                      </Text>
                      <View style={styles.item}>
                        <Text style={[styles.itemSubtitle]}>-</Text>
                        <Text style={[styles.itemSubtitle]}>
                          {edu.institute}
                        </Text>
                      </View>
                    </View>
                  </View>
                  {draftToPdfText(
                    edu.description,
                    styles.description,
                    { ...styles.item, lineHeight: 1 },
                    styles.itemBullet,
                    styles.itemText
                  )}
                </View>
              ))}
            </View>
          )}

          {experiences.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>الخبرات العملية</Text>
              {experiences.map((exp, index) => (
                <View key={index} style={{ marginBottom: 2.5 }}>
                  <View
                    style={[
                      styles.item,
                      { lineHeight: 1, alignItems: "center" },
                    ]}
                  >
                    <View style={[styles.item]}>
                      <Text style={[styles.itemTitle]}>
                        {exp.jobTitle} | {exp.company}
                      </Text>
                      {exp.country && (
                        <View style={styles.item}>
                          <Text style={[styles.itemSubtitle]}>|</Text>
                          <Text style={[styles.itemSubtitle]}>
                            {exp.country}
                          </Text>
                        </View>
                      )}
                      {exp.startDate && (
                        <View style={styles.item}>
                          <Text style={[styles.itemSubtitle]}>|</Text>
                          <Text style={[styles.itemDate]}>
                            {getDate(exp.startDate)} -{" "}
                            {exp.endDate ? getDate(exp.endDate) : "حتى الآن"}
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>
                  {draftToPdfText(
                    exp.description,
                    styles.description,
                    { ...styles.item, lineHeight: 1 },
                    styles.itemBullet,
                    styles.itemText
                  )}
                </View>
              ))}
            </View>
          )}

          {courses.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>الدورات التدريبية</Text>
              {courses.map(({ courseName, instituteName }, index) => (
                <View key={index} style={[styles.item, { lineHeight: 1 }]}>
                  <Text style={styles.itemBullet}>•</Text>
                  <Text style={styles.itemText}>
                    {courseName} - {instituteName}
                  </Text>
                </View>
              ))}
            </View>
          )}

          {softSkills.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>المهارات الشخصية</Text>
              {softSkills.map(({ name }, index) => (
                <View key={index} style={[styles.item, { lineHeight: 1 }]}>
                  <Text style={styles.itemBullet}>•</Text>
                  <Text style={styles.itemText}>{name}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
}
