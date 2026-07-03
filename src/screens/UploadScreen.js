import { useState, useEffect } from "react";
import {
  View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Alert
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { getDocuments, addDocument } from "../storage";
import { t } from "../translations";

export default function UploadScreen({ navigation, lang }) {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    setDocs(getDocuments());
  }, []);

  const pickDocument = async (category) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["application/pdf", "application/vnd.ms-excel", 
               "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
               "text/csv", "image/*"],
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets?.length > 0) {
        const file = result.assets[0];
        const newDoc = {
          name: file.name,
          type: file.mimeType?.split("/")[1]?.toUpperCase() || "FILE",
          size: file.size ? `${(file.size / 1024 / 1024).toFixed(1)} MB` : "Unknown",
          category: category,
        };
        addDocument(newDoc);
        setDocs(getDocuments());
        Alert.alert(t("uploadSuccess"), `${file.name} ${t("addedSuccess")}`);
      }
    } catch (err) {
      console.log("Pick error:", err);
    }
  };

  const getDocsByCategory = (category) => {
    return docs.filter(d => d.category === category);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>{t("uploadKnowledge")}</Text>
      <Text style={styles.subtitle}>{t("uploadDesc")}</Text>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Brochures */}
        <TouchableOpacity style={styles.uploadCard} onPress={() => pickDocument("brochure")}>
          <Text style={styles.uploadIcon}>📄</Text>
          <View style={styles.uploadInfo}>
            <Text style={styles.uploadTitle}>{t("brochures")}</Text>
            <Text style={styles.uploadHint}>{t("brochuresHint")}</Text>
            {getDocsByCategory("brochure").map((doc) => (
              <Text key={doc.id} style={styles.fileName}>✅ {doc.name} ({doc.size})</Text>
            ))}
          </View>
          <Text style={styles.addButton}>{t("addFiles")}</Text>
        </TouchableOpacity>

        {/* Rate Tables */}
        <TouchableOpacity style={styles.uploadCard} onPress={() => pickDocument("rates")}>
          <Text style={styles.uploadIcon}>📊</Text>
          <View style={styles.uploadInfo}>
            <Text style={styles.uploadTitle}>{t("rates")}</Text>
            <Text style={styles.uploadHint}>{t("ratesHint")}</Text>
            {getDocsByCategory("rates").map((doc) => (
              <Text key={doc.id} style={styles.fileName}>✅ {doc.name} ({doc.size})</Text>
            ))}
          </View>
          <Text style={styles.addButton}>{t("addFiles")}</Text>
        </TouchableOpacity>

        {/* Client List */}
        <TouchableOpacity style={styles.uploadCard} onPress={() => pickDocument("clients")}>
          <Text style={styles.uploadIcon}>👥</Text>
          <View style={styles.uploadInfo}>
            <Text style={styles.uploadTitle}>{t("clients")}</Text>
            <Text style={styles.uploadHint}>{t("clientsHint")}</Text>
            {getDocsByCategory("clients").map((doc) => (
              <Text key={doc.id} style={styles.fileName}>✅ {doc.name} ({doc.size})</Text>
            ))}
          </View>
          <Text style={styles.addButton}>{t("addFiles")}</Text>
        </TouchableOpacity>

        {/* FAQs */}
        <TouchableOpacity style={styles.uploadCard} onPress={() => pickDocument("faq")}>
          <Text style={styles.uploadIcon}>❓</Text>
          <View style={styles.uploadInfo}>
            <Text style={styles.uploadTitle}>{t("faqs")}</Text>
            <Text style={styles.uploadHint}>{t("faqsHint")}</Text>
            {getDocsByCategory("faq").map((doc) => (
              <Text key={doc.id} style={styles.fileName}>✅ {doc.name} ({doc.size})</Text>
            ))}
          </View>
          <Text style={styles.addButton}>{t("addFiles")}</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom buttons */}
      <View style={styles.bottomButtons}>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => navigation.navigate("Dashboard")}
        >
          <Text style={styles.continueText}>{t("goDashboard")}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0F172A", paddingHorizontal: 24, paddingTop: 40 },
  heading: { fontSize: 28, fontWeight: "700", color: "#FFFFFF", marginBottom: 8 },
  subtitle: { fontSize: 15, color: "#94A3B8", lineHeight: 22, marginBottom: 24 },
  scroll: { flex: 1 },
  uploadCard: { flexDirection: "row", backgroundColor: "#1E293B", borderRadius: 16, padding: 16, marginBottom: 12, alignItems: "flex-start", gap: 12 },
  uploadIcon: { fontSize: 28, marginTop: 2 },
  uploadInfo: { flex: 1 },
  uploadTitle: { fontSize: 16, fontWeight: "600", color: "#FFFFFF", marginBottom: 4 },
  uploadHint: { fontSize: 13, color: "#94A3B8", lineHeight: 18, marginBottom: 6 },
  fileName: { fontSize: 12, color: "#10B981", marginTop: 2 },
  addButton: { color: "#3B82F6", fontSize: 14, fontWeight: "600", marginTop: 4 },
  bottomButtons: { paddingVertical: 20, gap: 10 },
  continueButton: { backgroundColor: "#3B82F6", paddingVertical: 16, borderRadius: 12, alignItems: "center" },
  continueText: { color: "#FFFFFF", fontSize: 16, fontWeight: "600" },
});