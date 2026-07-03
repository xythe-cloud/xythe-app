import { View, Text, StyleSheet, SafeAreaView, ScrollView, Dimensions } from "react-native";
import { BarChart, LineChart } from "react-native-chart-kit";
import { t } from "../translations";

const screenWidth = Dimensions.get("window").width;

const weeklyData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      data: [12, 18, 8, 22, 15, 9, 14],
    },
  ],
};

const monthlyData = {
  labels: ["W1", "W2", "W3", "W4"],
  datasets: [
    {
      data: [45, 62, 38, 71],
      color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
    },
  ],
};

export default function StatsScreen({ lang }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.heading}>{t("analytics")}</Text>

        {/* Weekly Queries */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{"📊 " + t("weeklyQueries")}</Text>
          <BarChart
            data={weeklyData}
            width={screenWidth - 72}
            height={200}
            yAxisLabel=""
            yAxisSuffix=""
            chartConfig={{
              backgroundColor: "#1E293B",
              backgroundGradientFrom: "#1E293B",
              backgroundGradientTo: "#1E293B",
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(148, 163, 184, ${opacity})`,
              barPercentage: 0.6,
            }}
            style={styles.chart}
          />
        </View>

        {/* Monthly Trend */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{"📈 " + t("monthlyTrend")}</Text>
          <LineChart
            data={monthlyData}
            width={screenWidth - 72}
            height={200}
            yAxisLabel=""
            yAxisSuffix=""
            chartConfig={{
              backgroundColor: "#1E293B",
              backgroundGradientFrom: "#1E293B",
              backgroundGradientTo: "#1E293B",
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(16, 185, 129, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(148, 163, 184, ${opacity})`,
            }}
            bezier
            style={styles.chart}
          />
        </View>

        {/* Quick Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>216</Text>
            <Text style={styles.statLabel}>{t("totalQueries2")}</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>85%</Text>
            <Text style={styles.statLabel}>{t("responseRate")}</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>1.2s</Text>
            <Text style={styles.statLabel}>{t("avgResponse")}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0F172A" },
  scroll: { padding: 20, paddingTop: 30 },
  heading: { fontSize: 28, fontWeight: "700", color: "#FFFFFF", marginBottom: 20 },
  card: { backgroundColor: "#1E293B", borderRadius: 16, padding: 16, marginBottom: 16 },
  cardTitle: { fontSize: 16, fontWeight: "600", color: "#FFFFFF", marginBottom: 12 },
  chart: { borderRadius: 12, marginLeft: -8 },
  statsRow: { flexDirection: "row", gap: 10, marginTop: 4 },
  statBox: { flex: 1, backgroundColor: "#1E293B", borderRadius: 12, padding: 14, alignItems: "center" },
  statValue: { fontSize: 22, fontWeight: "700", color: "#FFFFFF" },
  statLabel: { fontSize: 11, color: "#94A3B8", marginTop: 4, textAlign: "center" },
});