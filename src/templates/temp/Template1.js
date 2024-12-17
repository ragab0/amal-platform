"use client";
import { styles } from "./Styles";
import {
  Document,
  Page,
  Text,
  View,
  Image,
  Svg,
  Path,
} from "@react-pdf/renderer";
import getLocalDate from "@/utils/getLocalDate";
import { convertMarkdownToPdfText } from "@/utils/markdownToPdf";

// Define SVG icons as components
const PhoneIcon = () => (
  <Svg width="12" height="12" viewBox="0 0 24 24">
    <Path
      fill="#fff"
      d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"
    />
  </Svg>
);

const LocationIcon = () => (
  <Svg width="12" height="12" viewBox="0 0 24 24">
    <Path
      fill="#fff"
      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z"
    />
  </Svg>
);

const BirthdayIcon = () => (
  <Svg width="12" height="12" viewBox="0 0 24 24">
    <Path
      fill="#fff"
      d="M12 6c1.11 0 2-.9 2-2 0-.38-.1-.73-.29-1.03L12 0l-1.71 2.97c-.19.3-.29.65-.29 1.03 0 1.1.9 2 2 2zm4.6 9.99l-1.07-1.07-1.08 1.07c-1.3 1.3-3.58 1.31-4.89 0l-1.07-1.07-1.09 1.07C6.75 16.64 5.88 17 4.96 17c-.73 0-1.4-.23-1.96-.61V21c0 .55.45 1 1 1h16c.55 0 1-.45 1-1v-4.61c-.56.38-1.23.61-1.96.61-.92 0-1.79-.36-2.44-1.01zM18 9h-5V7h-2v2H6c-1.66 0-3 1.34-3 3v1.54c0 1.08.88 1.96 1.96 1.96.52 0 1.02-.2 1.38-.57l2.14-2.13 2.13 2.13c.74.74 2.03.74 2.77 0l2.14-2.13 2.13 2.13c.37.37.86.57 1.38.57 1.08 0 1.96-.88 1.96-1.96V12C21 10.34 19.66 9 18 9z"
    />
  </Svg>
);

const FlagIcon = () => (
  <Svg width="12" height="12" viewBox="0 0 24 24">
    <Path fill="#fff" d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6h-5.6z" />
  </Svg>
);

export default function Template1({ data = {} }) {
  const {
    personalInfo = {},
    experiencesFull = [],
    volunteerWork = [],
    skills = {},
    educations = [],
    references = [],
  } = data;
  const {
    description = "",
    interests = "",
    languages = [],
    otherSkills = [],
    personalSkills = [],
  } = skills;

  const experiences = experiencesFull.map((exp) => ({
    description: exp.description,
  }));

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

          <View style={[styles.section, styles.sidebarSection]}>
            <Text style={styles.sidebarTitle}>المعلومات الشخصية</Text>
            <View style={styles.contactItem}>
              <PhoneIcon />
              <Text style={styles.contactText}>{personalInfo.phone}</Text>
            </View>
            <View style={styles.contactItem}>
              <LocationIcon />
              <Text style={styles.contactText}>{personalInfo.city}</Text>
            </View>
            <View style={styles.contactItem}>
              <LocationIcon />
              <Text style={styles.contactText}>{personalInfo.email}</Text>
            </View>
            <View style={styles.contactItem}>
              <BirthdayIcon />
              <Text style={styles.contactText}>
                {getLocalDate(personalInfo.birthDate)}
              </Text>
            </View>
            <View style={styles.contactItem}>
              <FlagIcon />
              <Text style={styles.contactText}>{personalInfo.nationality}</Text>
            </View>
          </View>

          {languages.length > 0 && (
            <View
              style={[styles.sidebarSection, { backgroundColor: "#456b8f" }]}
            >
              <Text style={styles.sidebarTitle}>اللغات</Text>
              {languages.map(({ name, levelPercentage }, index) => (
                <View key={index} style={styles.languageItem}>
                  <View style={[styles.listItem, { flexShrink: 0 }]}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={styles.contactText}>{name}</Text>
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

          {volunteerWork.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sidebarTitle}>العمل التطوعي</Text>
              {volunteerWork.map((work, index) => (
                <View key={index}>
                  <Text style={styles.contactText}>{work.title}</Text>
                  {work.items.map((item, idx) => (
                    <View key={idx} style={styles.listItem}>
                      <Text style={styles.bullet}>.{idx + 1}</Text>
                      <Text style={styles.volunteerSubItem}>{item}</Text>
                    </View>
                  ))}
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
              <View style={styles.description}>
                {convertMarkdownToPdfText(personalInfo.description)}
              </View>
            </View>
          )}

          {educations.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>المؤهل العلمي</Text>
              {educations.map((edu, index) => (
                <View key={index} style={styles.listItem}>
                  <Text style={[styles.bullet, { color: "#496f94" }]}>•</Text>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                    }}
                  >
                    <View style={[styles.listItem]}>
                      <Text style={[styles.itemTitle]}> {edu.degree}</Text>
                      <Text style={[styles.itemSubtitle]}>{edu.school} - </Text>
                    </View>
                    <Text style={styles.itemDate}>المعدل: {edu.gpa}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}

          {experiences.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>الخبرات العملية</Text>
              {experiences.map((exp, index) => (
                <View key={index} style={styles.listItem}>
                  <Text style={[styles.bullet, { color: "#496f94" }]}>•</Text>
                  <View style={styles.description}>
                    {/* {convertMarkdownToPdf(exp.description)} */}
                  </View>
                </View>
              ))}
            </View>
          )}

          {otherSkills.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>الدورات التدريبية</Text>
              {otherSkills.map((course, index) => (
                <View key={index} style={styles.listItem}>
                  <Text style={[styles.bullet, { color: "#496f94" }]}>•</Text>
                  <Text style={[styles.contactText, { color: "#333" }]}>
                    {course}
                  </Text>
                </View>
              ))}
            </View>
          )}
          {personalSkills.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>المهارات الشخصية</Text>
              {personalSkills.map((skill, index) => (
                <View key={index} style={styles.listItem}>
                  <Text style={[styles.bullet, { color: "#496f94" }]}>•</Text>
                  <Text style={[styles.contactText, { color: "#333" }]}>
                    {skill}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
}
