// Simple in-memory storage (works with Expo Go)
// Will be replaced with real storage when we build the standalone app

let store = {
  stats: { queries: 0, quotes: 0, converted: 0, revenue: 0 },
  documents: [],
  settings: { autoReply: true, followUpHours: 48, tone: "friendly" },
  mode: null,
};

export const saveData = (key, value) => {
  store[key] = value;
};

export const getData = (key) => {
  return store[key] || null;
};

export const getStats = () => store.stats;
export const updateStats = (newStats) => {
  store.stats = { ...store.stats, ...newStats };
};

export const getDocuments = () => store.documents;
export const addDocument = (doc) => {
  store.documents.push({ ...doc, id: Date.now(), uploadedAt: new Date().toISOString() });
  return store.documents;
};

export const getSettings = () => store.settings;
export const saveSettings = (settings) => {
  store.settings = { ...store.settings, ...settings };
};