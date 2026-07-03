import { useState, useEffect } from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import ModeSelectScreen from "./src/screens/ModeSelectScreen";
import WhatsAppConnectScreen from "./src/screens/WhatsAppConnectScreen";
import UploadScreen from "./src/screens/UploadScreen";
import DashboardScreen from "./src/screens/DashboardScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import StatsScreen from "./src/screens/StatsScreen";
import { getLanguage, setLanguage } from "./src/translations";

const screens = {
  Welcome: WelcomeScreen,
  ModeSelect: ModeSelectScreen,
  WhatsAppConnect: WhatsAppConnectScreen,
  Upload: UploadScreen,
  Dashboard: DashboardScreen,
  Settings: SettingsScreen,
  Stats: StatsScreen,
};

export default function App() {
  const [screen, setScreen] = useState("Welcome");
  const [history, setHistory] = useState(["Welcome"]);
  const [lang, setLang] = useState(getLanguage());

  const switchLang = (newLang) => {
    setLang(newLang);
    setLanguage(newLang);
  };

  const navigate = (screenName) => {
    setHistory([...history, screenName]);
    setScreen(screenName);
  };

  const goBack = () => {
    if (history.length > 1) {
      const newHistory = history.slice(0, -1);
      setHistory(newHistory);
      setScreen(newHistory[newHistory.length - 1]);
    }
  };

  const CurrentScreen = screens[screen] || WelcomeScreen;
  const showBack = screen !== "Welcome";

  return (
    <View style={{ flex: 1, backgroundColor: "#0F172A" }}>
      {showBack && (
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <Text style={styles.backText}>
            {lang === "bm" ? "← Kembali" : "← Back"}
          </Text>
        </TouchableOpacity>
      )}
      {/* ============================================
          ADDED: key={screen + lang} to force re-render
          ============================================ */}
      <CurrentScreen 
        navigation={{ navigate }} 
        lang={lang} 
        setLang={switchLang} 
        key={screen + lang} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  backButton: { paddingHorizontal: 20, paddingTop: 50, paddingBottom: 10 },
  backText: { color: "#3B82F6", fontSize: 16 },
});