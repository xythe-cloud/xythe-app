import { useState, useEffect } from "react";
import {
  View, Text, StyleSheet, SafeAreaView, ScrollView,
  TouchableOpacity, Switch, TextInput, Alert
} from "react-native";
import { getSettings, saveSettings } from "../storage";
import { setLanguage, t } from "../translations";

export default function SettingsScreen({ navigation, lang }) {
  const [settings, setSettings] = useState({
    autoReply: true,
    followUpHours: 48,
    tone: "friendly",
    businessName: "",
    language: "en",
  });

  // ============================================
  // UPDATED: Load settings with better handling
  // ============================================
  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const s = getSettings();
    if (s && Object.keys(s).length > 0) {
      setSettings(s);
      // If language exists in settings, apply it
      if (s.language) {
        setLanguage(s.language);
      }
    }
  };

  const update = (key, value) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    saveSettings(newSettings);
    
    // If language is being updated, apply it immediately
    if (key === "language") {
      setLanguage(value);
    }
  };

  const tones = ["friendly", "professional", "casual"];

  // ============================================
  // ADDED: Save button handler
  // ============================================
  const handleSave = () => {
    saveSettings(settings);
    Alert.alert(t("saved"), t("preferencesSaved"));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.heading}>{t("settings")}</Text>

        {/* Business Name */}
        <Text style={styles.label}>{t("businessName")}</Text>
        <TextInput
          style={styles.input}
          value={settings.businessName}
          onChangeText={(text) => update("businessName", text)}
          placeholder={t("businessNamePlaceholder")}
          placeholderTextColor="#64748B"
        />

        {/* Auto-Reply Toggle */}
        <View style={styles.row}>
          <View style={styles.rowText}>
            <Text style={styles.rowTitle}>{t("autoReply")}</Text>
            <Text style={styles.rowSub}>
              {t("autoReplyDesc")}
            </Text>
          </View>
          <Switch
            value={settings.autoReply}
            onValueChange={(val) => update("autoReply", val)}
            trackColor={{ false: "#334155", true: "#3B82F6" }}
            thumbColor="#FFFFFF"
          />
        </View>

        {/* Follow-up Hours */}
        <Text style={styles.label}>{t("followUp")}</Text>
        <TextInput
          style={styles.input}
          value={String(settings.followUpHours)}
          onChangeText={(text) => update("followUpHours", Number(text) || 48)}
          keyboardType="numeric"
          placeholder="48"
          placeholderTextColor="#64748B"
        />

        {/* Tone Selector */}
        <Text style={styles.label}>{t("responseTone")}</Text>
        <View style={styles.toneRow}>
          {tones.map((tone) => (
            <TouchableOpacity
              key={tone}
              style={[
                styles.toneButton,
                settings.tone === tone && styles.toneActive,
              ]}
              onPress={() => update("tone", tone)}
            >
              <Text
                style={[
                  styles.toneText,
                  settings.tone === tone && styles.toneTextActive,
                ]}
              >
                {tone === "friendly" ? t("friendly") : 
                 tone === "professional" ? t("professional") : 
                 t("casual")}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ============================================
            ADDED: Language Selector
            ============================================ */}
        <Text style={styles.label}>{t("language")}</Text>
        <View style={styles.toneRow}>
          {["en", "bm"].map((langOption) => (
            <TouchableOpacity
              key={langOption}
              style={[
                styles.toneButton,
                settings.language === langOption && styles.toneActive,
              ]}
              onPress={() => {
                update("language", langOption);
                setLanguage(langOption);
              }}
            >
              <Text
                style={[
                  styles.toneText,
                  settings.language === langOption && styles.toneTextActive,
                ]}
              >
                {langOption === "en" ? "🇬🇧 English" : "🇲🇾 BM"}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* WhatsApp Status */}
        <Text style={styles.sectionTitle}>{t("whatsapp")}</Text>
        <View style={styles.infoCard}>
          <Text style={styles.infoText}>{t("statusNotConnected")}</Text>
          <TouchableOpacity
            style={styles.connectButton}
            onPress={() => navigation.navigate("WhatsAppConnect")}
          >
            <Text style={styles.connectText}>{t("connectWhatsApp")}</Text>
          </TouchableOpacity>
        </View>

        {/* ============================================
            ADDED: Save button with confirmation
            ============================================ */}
        <TouchableOpacity 
          style={styles.saveButton}
          onPress={handleSave}
        >
          <Text style={styles.saveText}>{t("saveAllSettings")}</Text>
        </TouchableOpacity>

        {/* Save confirmation */}
        <View style={styles.savedBadge}>
          <Text style={styles.savedText}>✅ {t("settingsSavedAuto")}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0F172A" },
  scroll: { paddingHorizontal: 24, paddingTop: 20, paddingBottom: 40 },
  heading: { fontSize: 28, fontWeight: "700", color: "#FFFFFF", marginBottom: 24 },
  label: { fontSize: 14, fontWeight: "600", color: "#94A3B8", marginBottom: 8, marginTop: 16 },
  input: { backgroundColor: "#1E293B", borderRadius: 12, padding: 14, color: "#FFFFFF", fontSize: 16, borderWidth: 1, borderColor: "#334155" },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "#1E293B", borderRadius: 12, padding: 16, marginTop: 16 },
  rowText: { flex: 1, marginRight: 16 },
  rowTitle: { fontSize: 16, fontWeight: "600", color: "#FFFFFF" },
  rowSub: { fontSize: 13, color: "#94A3B8", marginTop: 2 },
  toneRow: { flexDirection: "row", gap: 8 },
  toneButton: { flex: 1, backgroundColor: "#1E293B", borderRadius: 12, padding: 14, alignItems: "center", borderWidth: 1, borderColor: "#334155" },
  toneActive: { backgroundColor: "#3B82F6", borderColor: "#3B82F6" },
  toneText: { color: "#94A3B8", fontSize: 14, fontWeight: "500" },
  toneTextActive: { color: "#FFFFFF" },
  sectionTitle: { fontSize: 18, fontWeight: "600", color: "#FFFFFF", marginTop: 32, marginBottom: 12 },
  infoCard: { backgroundColor: "#1E293B", borderRadius: 12, padding: 16, alignItems: "center", gap: 12 },
  infoText: { color: "#94A3B8", fontSize: 14 },
  connectButton: { backgroundColor: "#3B82F6", paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8 },
  connectText: { color: "#FFFFFF", fontSize: 14, fontWeight: "500" },
  savedBadge: { marginTop: 32, alignItems: "center" },
  savedText: { color: "#10B981", fontSize: 14 },
  
  // ============================================
  // ADDED: Save button styles
  // ============================================
  saveButton: { 
    backgroundColor: "#10B981", 
    paddingVertical: 14, 
    borderRadius: 12, 
    alignItems: "center", 
    marginTop: 20 
  },
  saveText: { 
    color: "#FFFFFF", 
    fontSize: 15, 
    fontWeight: "600" 
  },
});