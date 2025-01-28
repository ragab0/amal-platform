"use client";
import getLocalDate from "@/utils/getLocalDate";
import { createStyle } from "./TemplateOneStyles";
import { Document, Page, Text, View, Image } from "@react-pdf/renderer";
import { draftToPdfText } from "@/utils/draftToPdfText";
import { personalIcons } from "./components/personalIcons";
import { useState } from "react";
import YoungCircleLoader from "@/components/loaders/YoungCircleLoader";

export default function Template1({
  data = {},
  cobject = {},
  isCustomize = false,
  myCVFontOptions = {},
}) {
  const [documentError, setDocumentError] = useState(null);
  const styles = createStyle(isCustomize ? myCVFontOptions : {});

  const {
    personalInfo = {},
    volunteers = [],
    allSkills = {},
    educations = [],
    experiences = [],
    courses = [],
  } = data;

  const { languages = [], softSkills = [] } = allSkills;

  const ourPersonalInfo = [...personalIcons]
    .map(([k, v], i) => ({
      text:
        k === "location"
          ? getLocation(personalInfo.country, personalInfo.city)
          : k === "birthDate"
          ? getLocalDate(personalInfo[k])
          : personalInfo[k],
      Icon: v,
      key: k,
    }))
    .filter((o) => o.text);

  function isSelected(parent, key) {
    if (!isCustomize) return true;
    const field = cobject[parent]?.fields[key];
    if (field) {
      return field.isSelected;
    }
    console.warn("!!!", parent, key, "NOT exists");
    return true;
  }

  if (documentError) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 rounded-lg p-4">
        <h3 className="text-xl font-semibold text-red-600 mb-4">
          خطأ في تحميل ملف PDF
        </h3>
        <p className="text-gray-700 mb-4">{documentError}</p>
      </div>
    );
  }

  return (
    <Document
      author={personalInfo.fullName}
      keywords="resume"
      subject={`The resume of ${personalInfo.fullName}`}
      title={`${personalInfo.fullName} - Resume`}
      onRender={({ blob, cancel }) => {
        // Called when render starts
        console.log("PDF rendering started");
      }}
      onLoadSuccess={() => {
        console.log("PDF loaded successfully");
        setDocumentError(null);
      }}
      onLoadError={(error) => {
        console.error("PDF loading error:", error);
        setDocumentError("حدث خطأ أثناء تحميل الملف. يرجى المحاولة مرة أخرى.");
      }}
      onLoadProgress={({ loaded, total }) => {
        // Track loading progress
        console.log(`Loading progress: ${Math.round((loaded / total) * 100)}%`);
      }}
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
              {ourPersonalInfo.map(
                ({ text, Icon, key }, i) =>
                  isSelected("personalInfo", key) && (
                    <View style={styles.item} key={i}>
                      <Icon style={styles.itemIcon} />
                      <Text style={[styles.itemText, { color: "#fff" }]}>
                        {text}
                      </Text>
                    </View>
                  )
              )}
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
                  {isSelected("languages", "proficiencyLevel") && (
                    <View style={styles.languageBar}>
                      <View
                        style={[
                          styles.languageLevel,
                          { width: `${levelPercentage}%` },
                        ]}
                      />
                    </View>
                  )}
                </View>
              ))}
            </View>
          )}

          {volunteers.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sidebarTitle}>العمل التطوعي</Text>
              {volunteers.map((volunteer, index) =>
                isSelected("volunteers", "description") ? (
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
                ) : (
                  <View
                    key={index}
                    style={[styles.item, { alignItems: "center", gap: 10 }]}
                    wrap={false}
                  >
                    <View
                      style={[
                        styles.item,
                        {
                          flexShrink: 0,
                          verticalAlign: "middle",
                        },
                      ]}
                      wrap={false}
                    >
                      <Text style={[styles.itemBullet, { color: "white" }]}>
                        •
                      </Text>
                      <Text style={[styles.itemTitle, { color: "white" }]}>
                        {volunteer.title}
                      </Text>
                    </View>
                  </View>
                )
              )}
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
                <View key={index} style={{ marginBottom: 2.5 }} wrap={false}>
                  <View style={[styles.item, { alignItems: "center" }]}>
                    <View style={[styles.item]}>
                      {!isSelected("educations", "description") ? (
                        <View style={[styles.item]} wrap={false}>
                          <Text style={styles.itemBullet}>•</Text>
                          <Text style={[styles.itemTitle]}>
                            {edu.degree} {edu.field}
                          </Text>
                        </View>
                      ) : (
                        <Text style={[styles.itemTitle]} wrap={false}>
                          {edu.degree} {edu.field}
                        </Text>
                      )}

                      {isSelected("educations", "institute") && (
                        <View style={styles.item} wrap={false}>
                          <Text style={[styles.itemSubtitle]}>-</Text>
                          <Text style={[styles.itemSubtitle]}>
                            {edu.institute}
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>
                  {isSelected("educations", "description") &&
                    draftToPdfText(
                      edu.description,
                      styles.description,
                      styles.item,
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
                  <View style={[styles.item, { alignItems: "center" }]}>
                    <View style={[styles.item]}>
                      {!isSelected("experiences", "description") ? (
                        <View style={[styles.item]} wrap={false}>
                          <Text style={styles.itemBullet}>•</Text>
                          <Text style={[styles.itemTitle]}>{exp.jobTitle}</Text>
                        </View>
                      ) : (
                        <Text style={[styles.itemTitle]}>{exp.jobTitle}</Text>
                      )}
                      {isSelected("experiences", "location") && (
                        <View style={styles.item} wrap={false}>
                          <Text style={[styles.itemTitle]}>|</Text>
                          <Text style={[styles.itemTitle]}>
                            {exp.company}, {exp.country}
                          </Text>
                        </View>
                      )}
                      {isSelected("experiences", "date") && exp.startDate && (
                        <View style={styles.item} wrap={false}>
                          <Text style={[styles.itemTitle]}>|</Text>
                          <Text style={[styles.itemDate]}>
                            {getDate(exp.startDate)} -{" "}
                            {exp.endDate ? getDate(exp.endDate) : "حتى الآن"}
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>
                  {isSelected("experiences", "description") &&
                    draftToPdfText(
                      exp.description,
                      styles.description,
                      { ...styles.item },
                      styles.itemBullet,
                      styles.itemText
                    )}
                </View>
              ))}
            </View>
          )}

          {courses.length > 0 && (
            <View style={styles.section} wrap={false}>
              <Text style={styles.sectionTitle}>الدورات التدريبية</Text>
              {courses.map(({ courseName, instituteName }, index) => (
                <View key={index} style={[styles.item]} wrap={false}>
                  <Text style={styles.itemBullet}>•</Text>
                  <Text style={styles.itemText}>
                    {courseName} - {instituteName}
                  </Text>
                </View>
              ))}
            </View>
          )}

          {softSkills.length > 0 && (
            <View style={styles.section} wrap={false}>
              <Text style={styles.sectionTitle}>المهارات الشخصية</Text>
              {softSkills.map(({ name }, index) => (
                <View key={index} style={[styles.item]} wrap={false}>
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
