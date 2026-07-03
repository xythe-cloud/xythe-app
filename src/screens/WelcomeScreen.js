import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image } from "react-native";
import { t } from "../translations";

export default function WelcomeScreen({ navigation, lang, setLang }) {

  const switchLang = (newLang) => {
    setLang(newLang);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top}>
        <Image source={require("../../assets/xythe logo 1.png")} style={styles.logo} resizeMode="contain" />

        <View style={styles.langRow}>
          <TouchableOpacity 
            style={[styles.langBtn, lang === "en" && styles.langActive]} 
            onPress={() => switchLang("en")}
          >
            <Text style={styles.langText}>🇬🇧 EN</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.langBtn, lang === "bm" && styles.langActive]} 
            onPress={() => switchLang("bm")}
          >
            <Text style={styles.langText}>🇲🇾 BM</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.subtitle}>{t("works247")}</Text>
      </View>

      <View style={styles.bottom}>
        <View style={styles.privacyBadge}>
          <Text style={styles.lockIcon}>🔒</Text>
          <Text style={styles.privacyText}>{t("privacy")}</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("ModeSelect")}>
          <Text style={styles.buttonText}>{t("getStarted")}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0F172A", justifyContent: "space-between" },
  top: { flex: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: 30 },
  logo: { width: 150, height: 150, marginBottom: 30 },
  langRow: { flexDirection: "row", gap: 10, marginBottom: 16, justifyContent: "center" },
  langBtn: { paddingVertical: 8, paddingHorizontal: 20, borderRadius: 20, borderWidth: 1, borderColor: "#334155" },
  langActive: { backgroundColor: "#3B82F6", borderColor: "#3B82F6" },
  langText: { color: "#FFFFFF", fontSize: 14, fontWeight: "500" },
  subtitle: { fontSize: 17, color: "#94A3B8", textAlign: "center", lineHeight: 26 },
  bottom: { paddingHorizontal: 24, paddingBottom: 40, gap: 16 },
  privacyBadge: { flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: "#1E293B", paddingVertical: 12, paddingHorizontal: 20, borderRadius: 50, gap: 8 },
  lockIcon: { fontSize: 14 },
  privacyText: { color: "#94A3B8", fontSize: 13 },
  button: { backgroundColor: "#3B82F6", paddingVertical: 18, borderRadius: 16, alignItems: "center" },
  buttonText: { color: "#FFFFFF", fontSize: 17, fontWeight: "600" },
});