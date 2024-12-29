"use client";
import { styles } from "./Styles";
import { Document, Page, Text, View, Image } from "@react-pdf/renderer";
import getLocalDate from "@/utils/getLocalDate";
import {
  BirthdayIcon,
  FlagIcon,
  LocationIcon,
  PhoneIcon,
} from "./components/Icons";
import EmailIcon from "@/assets/icons/EmailIcon";
// import { convertMarkdownToPdfText } from "@/utils/markdownToPdf";
// import { Markdown } from "@react-pdf/renderer";

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
              <EmailIcon />
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
                {/* {convertMarkdownToPdfText(personalInfo.description)} */}
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
