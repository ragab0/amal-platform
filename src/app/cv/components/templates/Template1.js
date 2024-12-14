import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { convertFromRaw } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import { styles } from "./Styles";

export default function Template1({ data }) {
  let description = "";
  if (data?.personalInfo?.description) {
    try {
      const contentState = convertFromRaw(
        JSON.parse(data.personalInfo.description)
      );
      description = stateToHTML(contentState);
    } catch (e) {
      description = data.personalInfo.description;
    }
  }

  return (
    <Document>
      <Page size={[616, 888]} style={styles.page}>
        {/* Side Section */}
        <View style={styles.sideSection}>
          <Image src="/src/assets/imgs/logo.png" style={styles.logo} />

          <View style={{ marginTop: 20 }}>
            <Text style={styles.sideSectionTitle}>المعلومات الشخصية</Text>
            {[
              {
                icon: "/icons/nationality.png",
                text: data?.personalInfo?.nationality,
              },
              { icon: "/icons/phone.png", text: data?.personalInfo?.phone },
              { icon: "/icons/email.png", text: data?.personalInfo?.email },
              {
                icon: "/icons/calendar.png",
                text: data?.personalInfo?.birthDate,
              },
              { icon: "/icons/location.png", text: data?.personalInfo?.city },
            ].map((item, index) => (
              <View key={index} style={styles.infoRow}>
                <Image src={item.icon} style={styles.icon} />
                <Text style={styles.infoText}>{item.text}</Text>
              </View>
            ))}
          </View>

          <View style={{ marginTop: 30 }}>
            <Text style={styles.sideSectionTitle}>المهارات</Text>
            {[
              "مهارة العمل ضمن فريق",
              "القدرة على حل المشكلات",
              "التواصل الفعال",
            ].map((skill, index) => (
              <View key={index} style={styles.bulletPoint}>
                <View style={styles.whiteBullet} />
                <Text style={[styles.bulletText, { color: "white" }]}>
                  {skill}
                </Text>
              </View>
            ))}
          </View>

          <View style={styles.volunteerSection}>
            <Text style={styles.sideSectionTitle}>العمل التطوعي</Text>
            {["120 ساعة تطوعية", "مجال تعليمي"].map((vol, index) => (
              <View key={index} style={styles.bulletPoint}>
                <View style={styles.whiteBullet} />
                <Text style={[styles.bulletText, { color: "white" }]}>
                  {vol}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Main Section */}
        <View style={styles.mainSection}>
          <Text style={styles.name}>{data?.personalInfo?.fullName}</Text>
          <Text style={styles.title}>{data?.personalInfo?.headline}</Text>

          <View style={{ marginTop: 20 }}>
            <Text style={styles.sectionTitle}>نبذة عني</Text>
            <Text style={styles.description}>{description}</Text>
          </View>

          <View style={{ marginTop: 20 }}>
            <Text style={styles.sectionTitle}>التعليم</Text>
            {data?.education?.map((edu, index) => (
              <View key={index} style={styles.experienceItem}>
                <Text style={styles.itemTitle}>{edu.degree}</Text>
                <Text style={styles.itemSubtitle}>{edu.school}</Text>
                <Text
                  style={styles.itemSubtitle}
                >{`${edu.startDate} - ${edu.endDate}`}</Text>
              </View>
            ))}
          </View>

          <View style={{ marginTop: 20 }}>
            <Text style={styles.sectionTitle}>الخبرات</Text>
            {data?.experience?.map((exp, index) => (
              <View key={index} style={styles.experienceItem}>
                <Text style={styles.itemTitle}>{exp.title}</Text>
                <Text style={styles.itemSubtitle}>{exp.company}</Text>
                <Text
                  style={styles.itemSubtitle}
                >{`${exp.startDate} - ${exp.endDate}`}</Text>
                <Text style={styles.description}>{exp.description}</Text>
              </View>
            ))}
          </View>

          <View style={{ marginTop: 20 }}>
            <Text style={styles.sectionTitle}>المهارات الشخصية</Text>
            {["التفكير الإبداعي", "إدارة الوقت", "القيادة"].map(
              (skill, index) => (
                <View key={index} style={styles.bulletPoint}>
                  <View style={styles.bullet} />
                  <Text style={styles.bulletText}>{skill}</Text>
                </View>
              )
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
}
