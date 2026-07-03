import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import { t } from "../translations";

export default function ModeSelectScreen({ navigation, lang }) {
  const modes = [
    { id: "agent", title: t("agent"), subtitle: t("agentDesc"), icon: "🤝" },
    { id: "shop", title: t("shop"), subtitle: t("shopDesc"), icon: "🏪" },
    { id: "service", title: t("service"), subtitle: t("serviceDesc"), icon: "🛠️" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>{t("modeSelect")}</Text>
      <Text style={styles.subtitle}>{t("modeDesc")}</Text>

      <View style={styles.cards}>
        {modes.map((mode) => (
          <TouchableOpacity
            key={mode.id}
            style={styles.card}
            onPress={() => navigation.navigate("WhatsAppConnect", { mode: mode.id })}
          >
            <Text style={styles.cardIcon}>{mode.icon}</Text>
            <View style={styles.cardText}>
              <Text style={styles.cardTitle}>{mode.title}</Text>
              <Text style={styles.cardSubtitle}>{mode.subtitle}</Text>
            </View>
            <Text style={styles.arrow}>→</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0F172A", paddingHorizontal: 24, paddingTop: 40 },
  heading: { fontSize: 28, fontWeight: "700", color: "#FFFFFF", marginBottom: 8 },
  subtitle: { fontSize: 15, color: "#94A3B8", marginBottom: 32 },
  cards: { gap: 12 },
  card: { flexDirection: "row", alignItems: "center", backgroundColor: "#1E293B", padding: 20, borderRadius: 16, gap: 16 },
  cardIcon: { fontSize: 32 },
  cardText: { flex: 1 },
  cardTitle: { fontSize: 17, fontWeight: "600", color: "#FFFFFF" },
  cardSubtitle: { fontSize: 13, color: "#94A3B8", marginTop: 2 },
  arrow: { fontSize: 20, color: "#64748B" },
});