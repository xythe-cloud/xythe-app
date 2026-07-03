import { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import { getStats, getDocuments, getSettings, updateStats, addDocument } from "../storage";
import { t } from "../translations";

export default function DashboardScreen({ navigation, lang }) {
  const [stats, setStats] = useState({ queries: 0, quotes: 0, converted: 0, revenue: 0 });
  const [docCount, setDocCount] = useState(0);
  const [active, setActive] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const s = getStats();
    const docs = getDocuments();
    if (s) setStats(s);
    setDocCount(docs.length);
  };

  const toggleActive = () => setActive(!active);

  // Helper for bilingual text
  const getText = (en, bm) => lang === "bm" ? bm : en;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>{t("dashboard")}</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
            <Text style={styles.settingsIcon}>⚙️</Text>
          </TouchableOpacity>
        </View>

        {/* Status Card */}
        <TouchableOpacity style={styles.statusCard} onPress={toggleActive} activeOpacity={0.8}>
          <View style={styles.statusLeft}>
            <View style={[styles.dot, { backgroundColor: active ? "#10B981" : "#EF4444" }]} />
            <View>
              <Text style={styles.statusTitle}>
                {active ? getText("Active", "Aktif") : getText("Paused", "Berhenti")}
              </Text>
              <Text style={styles.statusSub}>
                {active 
                  ? getText("Auto-replying to customers", "Membalas pelanggan secara automatik") 
                  : getText("Tap to resume", "Ketuk untuk sambung semula")}
              </Text>
            </View>
          </View>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>

        {/* Stats Grid */}
        <Text style={styles.sectionTitle}>{t("overview")}</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statIcon}>💬</Text>
            <Text style={styles.statNumber}>{stats.queries}</Text>
            <Text style={styles.statLabel}>{t("queries")}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statIcon}>📄</Text>
            <Text style={styles.statNumber}>{stats.quotes}</Text>
            <Text style={styles.statLabel}>{t("quotes")}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statIcon}>✅</Text>
            <Text style={styles.statNumber}>{stats.converted}</Text>
            <Text style={styles.statLabel}>{t("converted")}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statIcon}>💰</Text>
            <Text style={styles.statNumber}>RM{stats.revenue}</Text>
            <Text style={styles.statLabel}>{t("revenue")}</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>{t("quickActions")}</Text>
        <View style={styles.actionsRow}>
          <TouchableOpacity 
            style={styles.actionCard}
            onPress={() => navigation.navigate("Upload")}
          >
            <Text style={styles.actionIcon}>📤</Text>
            <Text style={styles.actionText}>{t("uploadDocs")}</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.actionCard}
            onPress={() => navigation.navigate("WhatsAppConnect")}
          >
            <Text style={styles.actionIcon}>🔗</Text>
            <Text style={styles.actionText}>{t("whatsapp")}</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.actionCard}
            onPress={() => navigation.navigate("Stats")}
          >
            <Text style={styles.actionIcon}>📊</Text>
            <Text style={styles.actionText}>{t("analytics")}</Text>
          </TouchableOpacity>
        </View>

        {/* Account Summary */}
        <Text style={styles.sectionTitle}>{t("account")}</Text>
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>{t("documents")}</Text>
            <Text style={styles.summaryValue}>{docCount} {t("files")}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>{t("plan")}</Text>
            <Text style={styles.summaryValue}>{t("freeTrial")}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>{t("connected")}</Text>
            <Text style={styles.summaryValue}>+60 17-640 2872</Text>
          </View>
        </View>

        {/* Demo Data Loader */}
        <TouchableOpacity 
          style={styles.demoButton}
          onPress={() => {
            updateStats({ queries: 47, quotes: 12, converted: 4, revenue: 2400 });
            addDocument({ name: "AIA-Brochure.pdf", type: "PDF", size: "2.4 MB" });
            addDocument({ name: "Prudential-Rates.xlsx", type: "XLSX", size: "1.1 MB" });
            loadData();
          }}
        >
          <Text style={styles.demoText}>{t("loadDemo")}</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0F172A" },
  scroll: { paddingHorizontal: 20, paddingTop: 20 },
  
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
  greeting: { fontSize: 28, fontWeight: "700", color: "#FFFFFF" },
  settingsIcon: { fontSize: 24 },
  
  statusCard: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "#1E293B", borderRadius: 16, padding: 18, marginBottom: 24 },
  statusLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  dot: { width: 12, height: 12, borderRadius: 6 },
  statusTitle: { fontSize: 16, fontWeight: "600", color: "#FFFFFF" },
  statusSub: { fontSize: 13, color: "#94A3B8", marginTop: 2 },
  chevron: { fontSize: 24, color: "#64748B" },
  
  sectionTitle: { fontSize: 16, fontWeight: "600", color: "#94A3B8", marginBottom: 12, marginTop: 8, textTransform: "uppercase", letterSpacing: 1 },
  
  statsGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginBottom: 24 },
  statCard: { backgroundColor: "#1E293B", borderRadius: 14, padding: 16, width: "47%", alignItems: "center" },
  statIcon: { fontSize: 20, marginBottom: 8 },
  statNumber: { fontSize: 26, fontWeight: "700", color: "#FFFFFF" },
  statLabel: { fontSize: 12, color: "#94A3B8", marginTop: 4 },
  
  actionsRow: { flexDirection: "row", gap: 10, marginBottom: 24 },
  actionCard: { flex: 1, backgroundColor: "#1E293B", borderRadius: 14, padding: 16, alignItems: "center", gap: 8 },
  actionIcon: { fontSize: 24 },
  actionText: { fontSize: 12, color: "#FFFFFF", fontWeight: "500" },
  
  summaryCard: { backgroundColor: "#1E293B", borderRadius: 14, padding: 16, marginBottom: 10 },
  summaryRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 10 },
  summaryLabel: { fontSize: 15, color: "#94A3B8" },
  summaryValue: { fontSize: 15, color: "#FFFFFF", fontWeight: "500" },
  divider: { height: 1, backgroundColor: "#334155" },
  
  demoButton: { backgroundColor: "#3B82F6", paddingVertical: 12, borderRadius: 12, alignItems: "center", marginTop: 10 },
  demoText: { color: "#FFFFFF", fontSize: 14, fontWeight: "600" },
});