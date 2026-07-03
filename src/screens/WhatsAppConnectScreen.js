import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import { t } from "../translations";

export default function WhatsAppConnectScreen({ navigation, lang }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>{t("connectWA")}</Text>
      <Text style={styles.subtitle}>{t("connectWADesc")}</Text>

      <View style={styles.qrPlaceholder}>
        <Text style={styles.qrEmoji}>📱</Text>
        <Text style={styles.qrText}>{t("scanQR")}</Text>
        <Text style={styles.qrHint}>{t("scanQRHint")}</Text>
      </View>

      <Text style={styles.or}>{t("or")}</Text>

      <TouchableOpacity style={styles.apiButton}>
        <Text style={styles.apiButtonText}>{t("enterAPI")}</Text>
      </TouchableOpacity>

      <View style={styles.spacer} />

      <TouchableOpacity
        style={styles.skipButton}
        onPress={() => navigation.navigate("Upload")}
      >
        <Text style={styles.skipText}>{t("skipForNow")}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0F172A", paddingHorizontal: 24, paddingTop: 40 },
  heading: { fontSize: 28, fontWeight: "700", color: "#FFFFFF", marginBottom: 8 },
  subtitle: { fontSize: 15, color: "#94A3B8", lineHeight: 22, marginBottom: 32 },
  qrPlaceholder: { backgroundColor: "#1E293B", borderRadius: 16, padding: 40, alignItems: "center", gap: 12 },
  qrEmoji: { fontSize: 48 },
  qrText: { fontSize: 18, fontWeight: "600", color: "#FFFFFF" },
  qrHint: { fontSize: 13, color: "#64748B" },
  or: { textAlign: "center", color: "#64748B", marginVertical: 20 },
  apiButton: { backgroundColor: "#1E293B", paddingVertical: 16, borderRadius: 12, alignItems: "center", borderWidth: 1, borderColor: "#334155" },
  apiButtonText: { color: "#FFFFFF", fontSize: 15, fontWeight: "500" },
  spacer: { flex: 1 },
  skipButton: { alignItems: "center", paddingBottom: 30 },
  skipText: { color: "#3B82F6", fontSize: 15 },
});