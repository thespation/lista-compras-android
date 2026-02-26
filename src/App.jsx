import { useState, useEffect, useRef, useCallback } from "react";

// --- PALETTES ----------------------------------------------------------------
const PALETTES = {
  dourado: {
    name: "Dourado",
    dark: {
      bg: "#0f0f0f", bg2: "#1a1a1a", bg3: "#252525", bg4: "#2a2a2a",
      text: "#f0ead6", text2: "#aaaaaa", text3: "#666666", text4: "#444444",
      accent: "#c8a96e", accentBg: "#c8a96e22", accentBorder: "#c8a96e44",
      accentText: "#0f0f0f", border: "#252525",
      up: "#ff6666", upBg: "#ff444422", down: "#66ff99", downBg: "#44ff7722",
      navBg: "#141414", shadow: "rgba(200,169,110,0.3)",
    },
    light: {
      bg: "#faf8f2", bg2: "#f0ead6", bg3: "#e8dfca", bg4: "#ddd5bc",
      text: "#2a2215", text2: "#6b5b3e", text3: "#9a8060", text4: "#bba880",
      accent: "#a07840", accentBg: "#a0784018", accentBorder: "#a0784044",
      accentText: "#ffffff", border: "#ddd5bc",
      up: "#c0392b", upBg: "#c0392b18", down: "#27ae60", downBg: "#27ae6018",
      navBg: "#ede8dc", shadow: "rgba(160,120,64,0.25)",
    },
  },
  nord: {
    name: "Nórdica",
    dark: {
      bg: "#2e3440", bg2: "#3b4252", bg3: "#434c5e", bg4: "#4c566a",
      text: "#eceff4", text2: "#d8dee9", text3: "#8090a0", text4: "#5a6a7a",
      accent: "#88c0d0", accentBg: "#88c0d022", accentBorder: "#88c0d044",
      accentText: "#2e3440", border: "#434c5e",
      up: "#bf616a", upBg: "#bf616a22", down: "#a3be8c", downBg: "#a3be8c22",
      navBg: "#242930", shadow: "rgba(136,192,208,0.3)",
    },
    light: {
      bg: "#eceff4", bg2: "#e5e9f0", bg3: "#d8dee9", bg4: "#cdd3de",
      text: "#2e3440", text2: "#3b4252", text3: "#5a6a7a", text4: "#8090a0",
      accent: "#5e81ac", accentBg: "#5e81ac18", accentBorder: "#5e81ac44",
      accentText: "#ffffff", border: "#d0d6e2",
      up: "#bf616a", upBg: "#bf616a18", down: "#a3be8c", downBg: "#a3be8c18",
      navBg: "#e0e5ef", shadow: "rgba(94,129,172,0.25)",
    },
  },
  gruvbox: {
    name: "Gruvbox",
    dark: {
      bg: "#282828", bg2: "#3c3836", bg3: "#504945", bg4: "#665c54",
      text: "#ebdbb2", text2: "#d5c4a1", text3: "#928374", text4: "#665c54",
      accent: "#d79921", accentBg: "#d7992122", accentBorder: "#d7992144",
      accentText: "#282828", border: "#504945",
      up: "#cc241d", upBg: "#cc241d22", down: "#98971a", downBg: "#98971a22",
      navBg: "#1d2021", shadow: "rgba(215,153,33,0.3)",
    },
    light: {
      bg: "#fbf1c7", bg2: "#f2e5bc", bg3: "#ebdbb2", bg4: "#d5c4a1",
      text: "#3c3836", text2: "#504945", text3: "#7c6f64", text4: "#928374",
      accent: "#b57614", accentBg: "#b5761418", accentBorder: "#b5761444",
      accentText: "#fbf1c7", border: "#d5c4a1",
      up: "#9d0006", upBg: "#9d000618", down: "#79740e", downBg: "#79740e18",
      navBg: "#ede8ca", shadow: "rgba(181,118,20,0.25)",
    },
  },
  rosePine: {
    name: "Rosé Pine",
    dark: {
      bg: "#191724", bg2: "#1f1d2e", bg3: "#26233a", bg4: "#312e44",
      text: "#e0def4", text2: "#c4c0da", text3: "#726d89", text4: "#524f67",
      accent: "#eb6f92", accentBg: "#eb6f9222", accentBorder: "#eb6f9244",
      accentText: "#191724", border: "#312e44",
      up: "#eb6f92", upBg: "#eb6f9222", down: "#9ccfd8", downBg: "#9ccfd822",
      navBg: "#120f20", shadow: "rgba(235,111,146,0.3)",
    },
    light: {
      bg: "#faf4ed", bg2: "#fffaf3", bg3: "#f2e9e1", bg4: "#dfdad9",
      text: "#575279", text2: "#6e6a86", text3: "#9893a5", text4: "#b4afbe",
      accent: "#b4637a", accentBg: "#b4637a18", accentBorder: "#b4637a44",
      accentText: "#faf4ed", border: "#dfdad9",
      up: "#b4637a", upBg: "#b4637a18", down: "#286983", downBg: "#28698318",
      navBg: "#f0e9e0", shadow: "rgba(180,99,122,0.25)",
    },
  },
  catppuccin: {
    name: "Catppuccin",
    dark: {
      bg: "#1e1e2e", bg2: "#181825", bg3: "#313244", bg4: "#45475a",
      text: "#cdd6f4", text2: "#bac2de", text3: "#7f849c", text4: "#585b70",
      accent: "#cba6f7", accentBg: "#cba6f722", accentBorder: "#cba6f744",
      accentText: "#1e1e2e", border: "#313244",
      up: "#f38ba8", upBg: "#f38ba822", down: "#a6e3a1", downBg: "#a6e3a122",
      navBg: "#11111b", shadow: "rgba(203,166,247,0.3)",
    },
    light: {
      bg: "#eff1f5", bg2: "#e6e9ef", bg3: "#dce0e8", bg4: "#ccd0da",
      text: "#4c4f69", text2: "#5c5f77", text3: "#8c8fa1", text4: "#acafc0",
      accent: "#8839ef", accentBg: "#8839ef18", accentBorder: "#8839ef44",
      accentText: "#ffffff", border: "#ccd0da",
      up: "#d20f39", upBg: "#d20f3918", down: "#40a02b", downBg: "#40a02b18",
      navBg: "#dce0e8", shadow: "rgba(136,57,239,0.25)",
    },
  },
};

const DEFAULT_MARKETS = ["Mercado A", "Mercado B", "Mercado C", "Outro"];
const MONTHS     = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];
const MONTHS_FULL = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho",
                     "Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
const STORAGE_KEY  = "lista-compras-v2";
const SETTINGS_KEY = "lista-compras-settings";

const SORT_OPTIONS = [
  { key: "insertion",          label: "Ordem de inserção" },
  { key: "alpha",              label: "Alfabética (A->Z)" },
  { key: "alpha-checked-last", label: "Alfabética + marcados abaixo" },
  { key: "checked-last",       label: "Inserção + marcados abaixo" },
  { key: "checked-first",      label: "Marcados primeiro" },
  { key: "price-asc",          label: "Menor preço total primeiro" },
  { key: "price-desc",         label: "Maior preço total primeiro" },
];

// --- HELPERS -----------------------------------------------------------------
function fmt(v) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v || 0);
}
function todayStr() { return new Date().toISOString().split("T")[0]; }
function monthKey(d) {
  const x = new Date(d + "T12:00");
  return `${x.getFullYear()}-${String(x.getMonth() + 1).padStart(2, "0")}`;
}
function monthLabel(k) {
  const [y, m] = k.split("-");
  return `${MONTHS[parseInt(m) - 1]}/${y.slice(2)}`;
}
function monthLabelFull(k) {
  const [y, m] = k.split("-");
  return `${MONTHS_FULL[parseInt(m) - 1]} ${y}`;
}
function listTotal(list) {
  return list.items.reduce((s, i) => s + i.qty * i.price, 0);
}
function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2); }

function maskCurrency(raw) {
  const digits = raw.replace(/\D/g, "");
  if (!digits) return "";
  return (parseInt(digits, 10) / 100).toFixed(2).replace(".", ",");
}
function unmaskCurrency(masked) {
  return parseFloat((masked || "").replace(",", ".")) || 0;
}

function applySortKey(items, sortKey) {
  const arr = [...items];
  switch (sortKey) {
    case "alpha":
      return arr.sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
    case "alpha-checked-last":
      return arr.sort((a, b) => {
        if (a.checked !== b.checked) return a.checked ? 1 : -1;
        return a.name.localeCompare(b.name, "pt-BR");
      });
    case "checked-last":
      return arr.sort((a, b) => {
        if (a.checked !== b.checked) return a.checked ? 1 : -1;
        return 0;
      });
    case "checked-first":
      return arr.sort((a, b) => {
        if (a.checked !== b.checked) return a.checked ? -1 : 1;
        return 0;
      });
    case "price-asc":
      return arr.sort((a, b) => a.qty * a.price - b.qty * b.price);
    case "price-desc":
      return arr.sort((a, b) => b.qty * b.price - a.qty * a.price);
    default:
      return arr; // insertion order
  }
}

function useSystemDark() {
  const getInitial = () => {
    if (typeof window === "undefined") return true;
    // Android WebView injects this before page renders
    if (typeof window.__androidDarkMode === "boolean") return window.__androidDarkMode;
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  };
  const [dark, setDark] = useState(getInitial);
  useEffect(() => {
    // Listen for Android dark mode changes (when user toggles while app is open)
    const handleAndroid = () => {
      if (typeof window.__androidDarkMode === "boolean") setDark(window.__androidDarkMode);
    };
    window.addEventListener("androidDarkModeChange", handleAndroid);
    // Also listen to standard media query as fallback
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handleMq = (e) => {
      if (typeof window.__androidDarkMode !== "boolean") setDark(e.matches);
    };
    mq.addEventListener("change", handleMq);
    return () => {
      window.removeEventListener("androidDarkModeChange", handleAndroid);
      mq.removeEventListener("change", handleMq);
    };
  }, []);
  return dark;
}

// --- MINI CHART COMPONENTS ---------------------------------------------------
function VerticalBars({ data, t, fs }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div style={{ display: "flex", gap: 6, alignItems: "flex-end", height: 130, padding: "0 2px" }}>
      {data.map((d, i) => (
        <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
          {d.value > 0 && (
            <div style={{ fontSize: Math.max(8, fs - 6), color: t.accent, fontWeight: "bold", textAlign: "center", whiteSpace: "nowrap" }}>
              {fmt(d.value).replace("R$\u00a0", "R$")}
            </div>
          )}
          <div style={{ width: "100%", background: t.bg3, borderRadius: "4px 4px 0 0", overflow: "hidden", height: 90, display: "flex", alignItems: "flex-end" }}>
            <div
              style={{
                width: "100%",
                height: `${Math.max(d.value > 0 ? 6 : 0, (d.value / max) * 100)}%`,
                background: `linear-gradient(180deg, ${t.accent}, ${t.accent}88)`,
                borderRadius: "3px 3px 0 0",
                transition: "height 0.4s ease",
              }}
            />
          </div>
          <div style={{ fontSize: Math.max(8, fs - 6), color: t.text3, textAlign: "center", whiteSpace: "nowrap" }}>{d.label}</div>
        </div>
      ))}
    </div>
  );
}

function HorizontalBars({ data, t, fs }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {data.map((d, i) => (
        <div key={i}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
            <span style={{ fontSize: Math.max(10, fs - 3), color: t.text2 }}>{d.label}</span>
            <span style={{ fontSize: Math.max(10, fs - 3), color: t.accent, fontWeight: "bold" }}>{fmt(d.value)}</span>
          </div>
          <div style={{ height: 8, background: t.bg3, borderRadius: 4, overflow: "hidden" }}>
            <div
              style={{
                height: "100%",
                width: `${Math.max(d.value > 0 ? 3 : 0, (d.value / max) * 100)}%`,
                background: `linear-gradient(90deg, ${t.accent}, ${t.accent}88)`,
                borderRadius: 4,
                transition: "width 0.4s ease",
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

// --- MAIN APP -----------------------------------------------------------------
export default function App() {
  const systemDark = useSystemDark();

  const [settings, setSettings] = useState({
    paletteKey: "dourado",
    paletteMode: "dark", // "dark" | "light"
    markets: DEFAULT_MARKETS,
    customPalettes: {},
    sortKey: "insertion",
    fontSize: 15,
    swipeEnabled: true,
    hamburgerPos: "top-left", // "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right"
  });
  const [data, setData] = useState({ lists: [], priceHistory: {} });

  // Navigation
  const [view, setView] = useState("analysis"); // start on analysis
  const [activeListId, setActiveListId] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // List detail
  const [newItem, setNewItem] = useState({ name: "", qty: "", price: "" });
  const [autocomplete, setAutocomplete] = useState([]);
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [listMenuOpen, setListMenuOpen] = useState(false);
  const [listPriceFilter, setListPriceFilter] = useState(null); // null | "cheaper" | "pricier"
  const [settingsOpen, setSettingsOpen] = useState(null); // which accordion section is open
  const [showNewListForm, setShowNewListForm] = useState(false);
  // Which month groups are expanded. Current month always starts expanded.
  const [showHistory, setShowHistory] = useState(false);
  const [confirmModal, setConfirmModal] = useState(null); // { title, message, onConfirm }
  const [importConfirm, setImportConfirm] = useState(null); // { parsed } — pending import waiting confirmation
  const [backupManager, setBackupManager] = useState(null); // null | { backups: [] }
  const [editingItem, setEditingItem] = useState(null);

  // Home / search
  const [searchQuery, setSearchQuery] = useState("");

  // New list
  const [newListName, setNewListName] = useState("");
  const [newListMarket, setNewListMarket] = useState("");
  const [newMarketName, setNewMarketName] = useState("");
  const [editingMarketIdx, setEditingMarketIdx] = useState(null);
  const [editingMarketVal, setEditingMarketVal] = useState("");

  // Duplicate modal
  const [duplicateSource, setDuplicateSource] = useState(null);
  const [duplicateZero, setDuplicateZero] = useState(false);
  const [duplicateMarket, setDuplicateMarket] = useState(null); // market for duplicate
  const [editingListHeader, setEditingListHeader] = useState(false);
  const [editListName, setEditListName] = useState("");
  const [editListMarket, setEditListMarket] = useState("");

  // Analysis
  const [analysisTab, setAnalysisTab] = useState("monthly");
  const [chartMode, setChartMode] = useState("bars"); // bars | hbars | numbers
  const [analysisMonth, setAnalysisMonth] = useState(() => monthKey(todayStr()));

  // Settings
  const [importError, setImportError] = useState("");
  const [themeImportError, setThemeImportError] = useState("");

  // Toast
  const [toast, setToast] = useState(null);

  // Refs
  const fileInputRef = useRef();
  const themeFileRef = useRef();
  const touchStartX = useRef(null);

  // -- Theme --
  const allPalettes = { ...PALETTES, ...(settings.customPalettes || {}) };
  const isDark = (settings.paletteMode ?? "dark") === "dark";
  const palette = allPalettes[settings.paletteKey] || PALETTES.dourado;
  const t = isDark ? palette.dark : palette.light;
  const markets = settings.markets?.length ? settings.markets : DEFAULT_MARKETS;
  const fs = settings.fontSize || 15;

  // -- Persistence --
  useEffect(() => {
    try {
      const s = localStorage.getItem(SETTINGS_KEY);
      if (s) {
        const p = JSON.parse(s);
        // Migrate old format
        if (p.themeMode !== undefined) {
          p.paletteMode = p.themeMode === "light" ? "light" : "dark";
          delete p.themeMode;
        }
        delete p.themeSource;
        if (!p.paletteMode) p.paletteMode = "dark";
        if (p.swipeEnabled === undefined) p.swipeEnabled = true;
        if (!p.hamburgerPos) p.hamburgerPos = "top-left";
        setSettings(p);
        setNewListMarket(p.markets?.[0] || DEFAULT_MARKETS[0]);
      } else {
        setNewListMarket(DEFAULT_MARKETS[0]);
      }
    } catch { setNewListMarket(DEFAULT_MARKETS[0]); }
    try {
      const d = localStorage.getItem(STORAGE_KEY);
      if (d) setData(JSON.parse(d));
    } catch {}
  }, []);
  useEffect(() => { localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings)); }, [settings]);
  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); }, [data]);

  // -- Toast --
  const showToast = useCallback((msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  }, []);

  // -- Swipe-to-open drawer --
  const onTouchStart = (e) => {
    if (!settings.swipeEnabled) return;
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (!settings.swipeEnabled || touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (dx > 55 && !drawerOpen) setDrawerOpen(true);
    if (dx < -55 && drawerOpen) setDrawerOpen(false);
    touchStartX.current = null;
  };

  // -- Navigation helper --
  function navigate(v) {
    setView(v);
    setDrawerOpen(false);
    setSearchQuery("");
    setListMenuOpen(false);
    setListPriceFilter(null);
  }

  // -- Android back button handler (called from MainActivity.java) --
  useEffect(() => {
    window.__drawerOpen = drawerOpen; // Java reads this to decide minimize vs handled
    window.__androidBack = () => {
      if (backupManager) { setBackupManager(null); return; }
      if (importConfirm) { setImportConfirm(null); return; }
      if (confirmModal) { setConfirmModal(null); return; }
      if (editingItem) { setEditingItem(null); return; }
      if (editingListHeader) { setEditingListHeader(false); return; }
      if (duplicateSource) { setDuplicateSource(null); return; }
      if (drawerOpen) { setDrawerOpen(false); return; }
      if (view === "list-detail") { setView("home"); setSearchQuery(""); setListMenuOpen(false); setListPriceFilter(null); return; }
      if (view === "about") { setView("home"); return; }
      // On main views: open drawer first, then minimize (handled by Java after drawer check)
      setDrawerOpen(true);
    };
    return () => { window.__androidBack = null; };
  });

  // -- List CRUD --
  const currentList = data.lists.find((l) => l.id === activeListId) || null;

  function updateList(listId, updater) {
    setData((d) => ({ ...d, lists: d.lists.map((l) => (l.id === listId ? updater(l) : l)) }));
  }

  function recordPriceHistory(itemName, price, list, baseData) {
    const ph = { ...((baseData || data).priceHistory) };
    const k = itemName.toLowerCase();
    if (!ph[k]) ph[k] = [];
    ph[k] = [
      { date: list.date, price, market: list.market },
      ...ph[k].filter((h) => !(h.date === list.date && h.market === list.market)),
    ].slice(0, 60);
    return ph;
  }

  function createList() {
    if (!newListName.trim()) return;
    const list = { id: uid(), name: newListName.trim(), market: newListMarket, date: todayStr(), items: [] };
    setData((d) => ({ ...d, lists: [list, ...d.lists] }));
    setNewListName("");
    setActiveListId(list.id);
    setShowNewListForm(false);
    setView("list-detail");
    showToast("Lista criada!");
  }

  function doDuplicate() {
    if (!duplicateSource) return;
    const copy = {
      ...duplicateSource,
      id: uid(),
      name: duplicateSource.name + " (cópia)",
      date: todayStr(),
      market: duplicateMarket || duplicateSource.market,
      items: duplicateSource.items.map((i) => ({
        ...i,
        id: uid(),
        checked: false,
        price: duplicateZero ? 0 : i.price,
        qty: i.qty,
      })),
    };
    setData((d) => ({ ...d, lists: [copy, ...d.lists] }));
    setDuplicateSource(null);
    showToast(duplicateZero ? "Duplicada com valores zerados!" : "Lista duplicada!");
  }

  function deleteList(id) {
    setData((d) => ({ ...d, lists: d.lists.filter((l) => l.id !== id) }));
    showToast("Lista removida");
  }

  // -- Item CRUD --
  function handleNameInput(val) {
    setNewItem((i) => ({ ...i, name: val }));
    if (val.length < 2) { setShowAutocomplete(false); return; }
    const lower = val.toLowerCase();
    const matches = Object.entries(data.priceHistory)
      .filter(([k]) => k.includes(lower))
      .map(([k, entries]) => {
        const sorted = [...entries].sort((a, b) => b.date.localeCompare(a.date));
        return { name: k, lastPrice: sorted[0]?.price };
      })
      .slice(0, 5);
    setAutocomplete(matches);
    setShowAutocomplete(matches.length > 0);
  }

  function pickAutocomplete(item) {
    setNewItem((i) => ({
      ...i,
      name: item.name,
      price: maskCurrency(String(Math.round((item.lastPrice || 0) * 100))),
    }));
    setShowAutocomplete(false);
  }

  // Returns { arrow: "up"|"down", pct, lastPrice } or null
  // Compares currentPrice against the most recent PREVIOUS purchase price
  // (ignores entries with the same price as currentPrice from the current list date)
  function getPriceHint(itemName, currentPrice) {
    if (!itemName || !currentPrice) return null;
    const key = itemName.trim().toLowerCase();
    const history = data.priceHistory[key];
    if (!history || history.length === 0) return null;
    // Sort newest first
    const sorted = [...history].sort((a, b) => b.date.localeCompare(a.date));
    // Find the most recent entry whose price differs from currentPrice
    // This handles the case where the current item was just recorded at currentPrice
    const prev = sorted.find((h) => Math.abs(h.price - currentPrice) > 0.001);
    if (!prev) return null;
    const lastPrice = prev.price;
    const pct = Math.abs(((currentPrice - lastPrice) / lastPrice) * 100);
    if (pct < 0.5) return null;
    return { arrow: currentPrice > lastPrice ? "up" : "down", pct, lastPrice };
  }

  function addItem() {
    if (!newItem.name.trim() || !newItem.price || !currentList) return;
    const price = unmaskCurrency(newItem.price);
    const qty = parseInt(newItem.qty, 10) || 1;
    if (!price) return;
    // Get hint BEFORE recording history so comparison uses previous purchases
    const hint = getPriceHint(newItem.name.trim(), price);
    const item = { id: uid(), name: newItem.name.trim(), qty, price, checked: false, priceHint: hint || null };
    const ph = recordPriceHistory(item.name, price, currentList);
    setData((d) => ({
      ...d,
      priceHistory: ph,
      lists: d.lists.map((l) =>
        l.id === currentList.id ? { ...l, items: [...l.items, item] } : l
      ),
    }));
    setNewItem((i) => ({ ...i, name: "", price: "", qty: "" }));
    setShowAutocomplete(false);
    showToast("Item adicionado!");
  }

  function toggleItem(itemId) {
    updateList(currentList.id, (l) => ({
      ...l,
      items: l.items.map((i) => (i.id === itemId ? { ...i, checked: !i.checked } : i)),
    }));
  }

  function removeItem(itemId) {
    updateList(currentList.id, (l) => ({ ...l, items: l.items.filter((i) => i.id !== itemId) }));
  }

  function saveEditItem() {
    if (!editingItem?.name.trim()) return;
    const price = unmaskCurrency(editingItem.price);
    const qty = parseInt(editingItem.qty, 10) || 1;
    // Recalculate hint based on history BEFORE recording the new price
    const hint = getPriceHint(editingItem.name.trim(), price);
    const ph = recordPriceHistory(editingItem.name, price, currentList);
    setData((d) => ({
      ...d,
      priceHistory: ph,
      lists: d.lists.map((l) =>
        l.id === currentList.id
          ? {
              ...l,
              items: l.items.map((i) =>
                i.id === editingItem.id
                  ? { ...i, name: editingItem.name.trim(), qty, price, priceHint: hint || null }
                  : i
              ),
            }
          : l
      ),
    }));
    setEditingItem(null);
    showToast("Item salvo!");
  }

  function markAll(checked) {
    updateList(currentList.id, (l) => ({ ...l, items: l.items.map((i) => ({ ...i, checked })) }));
    setListMenuOpen(false);
  }

  // -- Markets --
  function addMarket() {
    const name = newMarketName.trim();
    if (!name || markets.includes(name)) return;
    setSettings((s) => ({ ...s, markets: [...markets, name] }));
    setNewMarketName("");
    showToast("Mercado adicionado!");
  }
  function removeMarket(idx) {
    const updated = markets.filter((_, i) => i !== idx);
    setSettings((s) => ({ ...s, markets: updated }));
    if (newListMarket === markets[idx]) setNewListMarket(updated[0] || "");
  }
  function saveMarketEdit() {
    const val = editingMarketVal.trim();
    if (!val || editingMarketIdx === null) return;
    setSettings((s) => ({ ...s, markets: markets.map((m, i) => (i === editingMarketIdx ? val : m)) }));
    setEditingMarketIdx(null);
    setEditingMarketVal("");
    showToast("Mercado atualizado!");
  }

  // -- Themes --
  function importThemeFromFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setThemeImportError("");
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target.result);
        const req = ["bg","bg2","bg3","bg4","text","text2","text3","text4","accent","accentBg","accentBorder","accentText","border","up","upBg","down","downBg","navBg","shadow"];
        if (!parsed.name || !parsed.dark || !parsed.light) throw new Error();
        for (const f of req) { if (!parsed.dark[f] || !parsed.light[f]) throw new Error(); }
        const key = "custom_" + parsed.name.toLowerCase().replace(/\s+/g, "_");
        setSettings((s) => ({
          ...s,
          customPalettes: { ...(s.customPalettes || {}), [key]: { name: parsed.name, dark: parsed.dark, light: parsed.light } },
          paletteKey: key,
          // (themeSource removed)
        }));
        showToast(`Tema "${parsed.name}" importado!`);
      } catch { setThemeImportError("Arquivo inválido. Verifique os campos dark/light."); }
    };
    reader.readAsText(file);
    e.target.value = "";
  }
  function removeCustomTheme(key) {
    setSettings((s) => {
      const cp = { ...(s.customPalettes || {}) };
      delete cp[key];
      return { ...s, customPalettes: cp, paletteKey: s.paletteKey === key ? "dourado" : s.paletteKey };
    });
    showToast("Tema removido");
  }

  // -- Data export/import --
  // ── BACKUP SYSTEM (localStorage-based, works in Android WebView) ──
  const BACKUP_INDEX_KEY = "lista-compras-backups";

  function getBackupIndex() {
    try { return JSON.parse(localStorage.getItem(BACKUP_INDEX_KEY) || "[]"); } catch { return []; }
  }

  function saveBackupIndex(index) {
    localStorage.setItem(BACKUP_INDEX_KEY, JSON.stringify(index));
  }

  function exportData() {
    const now = new Date();
    const pad = (n) => String(n).padStart(2, "0");
    const ts = `${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}`;
    const key = `lista-compras-backup-${Date.now()}`;
    const payload = JSON.stringify({ ...data, exportedAt: now.toISOString() });
    try {
      localStorage.setItem(key, payload);
      const index = getBackupIndex();
      index.unshift({ key, name: `Backup ${ts}`, date: now.toISOString(), size: payload.length, lists: data.lists.length });
      saveBackupIndex(index);
      showToast("Backup salvo com sucesso!");
    } catch {
      showToast("Erro ao salvar backup.");
    }
  }

  function deleteBackup(key) {
    localStorage.removeItem(key);
    const index = getBackupIndex().filter((b) => b.key !== key);
    saveBackupIndex(index);
    setBackupManager((bm) => ({ ...bm, backups: index }));
  }

  function restoreBackup(backup) {
    try {
      const raw = localStorage.getItem(backup.key);
      if (!raw) { showToast("Backup não encontrado."); return; }
      const parsed = JSON.parse(raw);
      if (!parsed.lists || !Array.isArray(parsed.lists)) { showToast("Backup inválido."); return; }
      setImportConfirm({ parsed, filename: backup.name });
    } catch { showToast("Erro ao ler backup."); }
  }

  function confirmImport() {
    if (!importConfirm) return;
    setData({ lists: importConfirm.parsed.lists, priceHistory: importConfirm.parsed.priceHistory || {} });
    showToast(`${importConfirm.parsed.lists.length} listas restauradas!`);
    setImportConfirm(null);
    setBackupManager(null);
  }


  // -- Analysis data --
  const allMonthKeys = [...new Set(data.lists.map((l) => monthKey(l.date)))].sort();

  // ensure current analysisMonth is in list, else pick last
  const safeMonth = allMonthKeys.includes(analysisMonth)
    ? analysisMonth
    : allMonthKeys[allMonthKeys.length - 1] || monthKey(todayStr());

  const annualYears = (() => {
    const yearSet = new Set(allMonthKeys.map((k) => k.split("-")[0]));
    return [...yearSet].sort().map((y) => {
      const months = MONTHS.map((label, idx) => {
        const key = `${y}-${String(idx + 1).padStart(2, "0")}`;
        const val = data.lists
          .filter((l) => monthKey(l.date) === key)
          .reduce((s, l) => s + listTotal(l), 0);
        return { label, key, value: val };
      });
      return { year: y, months, total: months.reduce((s, m) => s + m.value, 0) };
    });
  })();

  const selectedMonthLists = data.lists.filter((l) => monthKey(l.date) === safeMonth);
  const prevMonthKey = (() => {
    const [y, m] = safeMonth.split("-").map(Number);
    return m === 1 ? `${y - 1}-12` : `${y}-${String(m - 1).padStart(2, "0")}`;
  })();
  const prevMonthLists = data.lists.filter((l) => monthKey(l.date) === prevMonthKey);

  const productComparison = (() => {
    const cur = {};
    const prev = {};
    selectedMonthLists.forEach((l) =>
      l.items.forEach((i) => {
        const k = i.name.toLowerCase();
        if (!cur[k] || i.price > cur[k]) cur[k] = i.price;
      })
    );
    prevMonthLists.forEach((l) =>
      l.items.forEach((i) => {
        const k = i.name.toLowerCase();
        if (!prev[k] || i.price > prev[k]) prev[k] = i.price;
      })
    );
    return Object.keys({ ...cur, ...prev })
      .map((k) => ({
        name: k,
        curPrice: cur[k],
        prevPrice: prev[k],
        diff: cur[k] && prev[k] ? ((cur[k] - prev[k]) / prev[k]) * 100 : null,
      }))
      .filter((p) => p.diff !== null)
      .sort((a, b) => Math.abs(b.diff) - Math.abs(a.diff));
  })();

  const dashMarkets = (() => {
    const map = {};
    data.lists.forEach((l) => {
      if (!map[l.market]) map[l.market] = { total: 0, count: 0 };
      map[l.market].total += listTotal(l);
      map[l.market].count++;
    });
    return Object.entries(map)
      .map(([m, v]) => ({ market: m, total: v.total, avg: v.total / v.count, count: v.count }))
      .sort((a, b) => a.avg - b.avg);
  })();

  // Sorted items for list-detail
  const sortedItems = currentList ? applySortKey(currentList.items, settings.sortKey) : [];

  // Apply price filter
  const displayedItems = listPriceFilter
    ? sortedItems.filter((item) => {
        const hint = item.priceHint || getPriceHint(item.name, item.price);
        if (!hint) return false;
        return listPriceFilter === "cheaper" ? hint.arrow === "down" : hint.arrow === "up";
      })
    : sortedItems;

  // Filtered lists for home
  const filteredLists = data.lists.filter(
    (l) =>
      !searchQuery ||
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.market.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.items.some((i) => i.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // -- Style shortcuts --
  const inp = {
    display: "block", width: "100%", marginTop: 6, padding: "11px 13px",
    background: t.bg3, border: `1px solid ${t.bg4}`, borderRadius: 10,
    color: t.text, fontSize: fs, fontFamily: "inherit", outline: "none", boxSizing: "border-box",
  };
  const primaryBtn = {
    display: "block", width: "100%", padding: "13px", background: t.accent,
    color: t.accentText, border: "none", borderRadius: 10, fontSize: fs - 1,
    fontFamily: "inherit", fontWeight: "bold", letterSpacing: 1, cursor: "pointer",
  };
  const card = {
    background: t.bg2, border: `1px solid ${t.border}`,
    borderRadius: 14, padding: 16, marginBottom: 12,
  };
  const tabBtn = (active) => ({
    flex: 1, padding: "8px 4px", fontSize: fs - 4, letterSpacing: 0.5,
    cursor: "pointer", fontFamily: "inherit",
    border: `1px solid ${active ? t.accent : t.border}`,
    background: active ? t.accentBg : "transparent",
    color: active ? t.accent : t.text3, borderRadius: 8,
  });

  const navItems = [
    { key: "home",     icon: "🛒", label: "Listas" },
    { key: "analysis", icon: "📊", label: "Análise" },
    { key: "settings", icon: "⚙️", label: "Configurações" },
  ];

  // -- Hamburger position --
  const hPos = settings.hamburgerPos || "top-left";
  const hStyle = (() => {
    const MARGIN = 14;
    const base = { position: "fixed", zIndex: 400 };
    // Max-width container is 430px centered, so we clamp to its edges
    const left  = `max(${MARGIN}px, calc(50vw - 215px + ${MARGIN}px))`;
    const right = `max(${MARGIN}px, calc(50vw - 215px + ${MARGIN}px))`;
    const cx    = "calc(50vw - 19px)"; // centered (half of 38px button)
    const top   = `${MARGIN}px`;
    const bot   = `${MARGIN + 20}px`;
    switch (hPos) {
      case "top-left":    return { ...base, top, left };
      case "top-center":  return { ...base, top, left: cx };
      case "top-right":   return { ...base, top, right };
      case "bottom-left": return { ...base, bottom: bot, left };
      case "bottom-center": return { ...base, bottom: bot, left: cx };
      case "bottom-right":  return { ...base, bottom: bot, right };
      default:            return { ...base, top, left };
    }
  })();

  // -- TOP-LEVEL TOUCH HANDLERS (swipe) --
  return (
    <div
      style={{
        fontFamily: "'Georgia', serif",
        background: t.bg,
        minHeight: "100vh",
        maxWidth: 430,
        margin: "0 auto",
        color: t.text,
        position: "relative",
        overflowX: "hidden",
        fontSize: fs,
      }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >

      {/* -- TOAST -- */}
      {toast && (
        <div style={{
          position: "fixed", top: 20, left: "50%", transform: "translateX(-50%)",
          background: t.accent, color: t.accentText, padding: "9px 22px",
          borderRadius: 20, fontFamily: "monospace", fontSize: fs - 2,
          zIndex: 1000, fontWeight: "bold", letterSpacing: 1,
          boxShadow: `0 4px 20px ${t.shadow}`, whiteSpace: "nowrap",
        }}>
          {toast}
        </div>
      )}

      {/* -- DRAWER SCRIM -- */}
      {drawerOpen && (
        <div
          onClick={() => setDrawerOpen(false)}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", zIndex: 500, backdropFilter: "blur(2px)" }}
        />
      )}

      {/* -- DRAWER -- */}
      <div style={{
        position: "fixed", top: 0, left: 0, bottom: 0, width: 270, zIndex: 600,
        background: t.bg2, borderRight: `1px solid ${t.border}`,
        transform: drawerOpen ? "translateX(0)" : "translateX(-100%)",
        transition: "transform 0.28s cubic-bezier(0.4,0,0.2,1)",
        display: "flex", flexDirection: "column",
        boxShadow: drawerOpen ? `6px 0 40px rgba(0,0,0,0.45)` : "none",
      }}>
        {/* Drawer header */}
        <div style={{ padding: "52px 22px 20px", borderBottom: `1px solid ${t.border}` }}>
          <div style={{ fontSize: fs - 5, letterSpacing: 3, color: t.accent, marginBottom: 6 }}>MERCADO INTELIGENTE</div>
          <div style={{ fontSize: fs + 5, fontWeight: "normal", lineHeight: 1.3 }}>
            Listas de<br /><span style={{ color: t.accent }}>Compras</span>
          </div>
        </div>

        {/* Nav items */}
        <div style={{ flex: 1, paddingTop: 10 }}>
          {navItems.map((item) => {
            const active = view === item.key || (item.key === "home" && view === "list-detail");
            return (
              <button
                key={item.key}
                onClick={() => navigate(item.key)}
                style={{
                  display: "flex", alignItems: "center", gap: 14,
                  width: "100%", padding: "15px 22px",
                  background: active ? t.accentBg : "transparent",
                  border: "none",
                  borderLeft: `3px solid ${active ? t.accent : "transparent"}`,
                  color: active ? t.accent : t.text2,
                  cursor: "pointer", fontFamily: "inherit", fontSize: fs,
                  textAlign: "left",
                }}
              >
                <span style={{ fontSize: fs + 4, lineHeight: 1 }}>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        <div style={{ padding: "12px 16px", borderTop: `1px solid ${t.border}` }}>
          <button
            onClick={() => { setDrawerOpen(false); setView("about"); }}
            style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", background: "none", border: `1px solid ${t.border}`, borderRadius: 10, color: t.text3, fontSize: fs - 2, cursor: "pointer", fontFamily: "inherit" }}
          >
            <span style={{ fontSize: fs }}>ℹ️</span>
            <span>Sobre o app</span>
          </button>
        </div>
      </div>

      {/* -- HAMBURGER (hidden inside list-detail to avoid overlap with back/sort bar) -- */}
      {view !== "list-detail" && <button
        onClick={() => setDrawerOpen(true)}
        style={{
          ...hStyle,
          background: t.bg2, border: `1px solid ${t.border}`,
          color: t.text2, width: 38, height: 38, borderRadius: 10,
          cursor: "pointer", fontSize: 17,
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: `0 2px 10px ${t.shadow}`,
        }}
      >
        ☰
      </button>}

      {/* ======================================================================
          H O M E
      ====================================================================== */}
      {view === "home" && (
        <div style={{ paddingBottom: 40, paddingTop: 0 }}>
          {/* Header */}
          <div style={{
            padding: "14px 24px 18px", paddingTop: 68,
            background: `linear-gradient(160deg, ${t.bg2}, ${t.bg})`,
            borderBottom: `1px solid ${t.border}`,
          }}>
            <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
              {[
                { label: "Hoje", value: data.lists.filter((l) => l.date === todayStr()).length + " listas" },
                { label: "Este mês", value: fmt(data.lists.filter((l) => monthKey(l.date) === monthKey(todayStr())).reduce((s, l) => s + listTotal(l), 0)) },
                { label: "Produtos", value: Object.keys(data.priceHistory).length },
              ].map((s) => (
                <div key={s.label} style={{ flex: 1, background: t.bg3, border: `1px solid ${t.border}`, borderRadius: 10, padding: "10px 8px" }}>
                  <div style={{ fontSize: fs - 6, color: t.text3, letterSpacing: 1 }}>{s.label.toUpperCase()}</div>
                  <div style={{ fontSize: fs, color: t.accent, marginTop: 2, fontWeight: "bold" }}>{s.value}</div>
                </div>
              ))}
            </div>
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="🔍 Buscar listas..."
              style={{ ...inp, marginTop: 0 }}
            />
          </div>

          {/* Inline new list form */}
          <div style={{ padding: "12px 24px 0" }}>
            {!showNewListForm ? (
              <button onClick={() => setShowNewListForm(true)} style={primaryBtn}>+ NOVA LISTA</button>
            ) : (
              <div style={{ background: t.bg2, border: `1px solid ${t.accentBorder}`, borderRadius: 14, padding: 16, marginBottom: 4 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                  <div style={{ fontSize: fs, fontWeight: "bold", color: t.accent }}>Nova Lista</div>
                  <button onClick={() => { setShowNewListForm(false); setNewListName(""); }} style={{ background: "none", border: "none", color: t.text3, cursor: "pointer", fontSize: fs + 2, padding: "0 4px" }}>✕</button>
                </div>

                <div style={{ marginBottom: 14 }}>
                  <label style={{ fontSize: fs - 4, letterSpacing: 2, color: t.text3 }}>NOME DA LISTA</label>
                  <input
                    value={newListName}
                    onChange={(e) => setNewListName(e.target.value)}
                    placeholder="Ex: Compras de sexta"
                    style={{ ...inp, marginTop: 6 }}
                    onKeyDown={(e) => e.key === "Enter" && createList()}
                    autoFocus
                  />
                </div>

                <div style={{ marginBottom: 14 }}>
                  <label style={{ fontSize: fs - 4, letterSpacing: 2, color: t.text3 }}>MERCADO</label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8, marginBottom: 8 }}>
                    {markets.map((m, idx) => (
                      <div key={idx} style={{ display: "flex", alignItems: "center", borderRadius: 20, overflow: "hidden", border: `1px solid ${newListMarket === m ? t.accent : t.border}`, background: newListMarket === m ? t.accentBg : t.bg3 }}>
                        {editingMarketIdx === idx ? (
                          <>
                            <input
                              value={editingMarketVal}
                              onChange={(e) => setEditingMarketVal(e.target.value)}
                              onKeyDown={(e) => { if (e.key === "Enter") saveMarketEdit(); if (e.key === "Escape") setEditingMarketIdx(null); }}
                              style={{ ...inp, marginTop: 0, border: "none", background: "transparent", padding: "6px 10px", fontSize: fs - 2, width: 100, outline: "none", color: t.text }}
                              autoFocus
                            />
                            <button onClick={saveMarketEdit} style={{ background: "none", border: "none", color: t.accent, padding: "6px 8px", cursor: "pointer", fontSize: fs - 2 }}>✓</button>
                            <button onClick={() => setEditingMarketIdx(null)} style={{ background: "none", border: "none", color: t.text3, padding: "6px 6px 6px 0", cursor: "pointer", fontSize: fs - 2 }}>✕</button>
                          </>
                        ) : (
                          <>
                            <button onClick={() => setNewListMarket(m)} style={{ background: "none", border: "none", padding: "6px 10px", fontSize: fs - 2, cursor: "pointer", color: newListMarket === m ? t.accent : t.text2, fontFamily: "inherit", fontWeight: newListMarket === m ? "bold" : "normal" }}>
                              🏪 {m}
                            </button>
                            <button onClick={() => { setEditingMarketIdx(idx); setEditingMarketVal(m); }} style={{ background: "none", border: "none", color: t.text4, padding: "6px 4px 6px 0", cursor: "pointer", fontSize: fs - 4 }}>✏️</button>
                            {markets.length > 1 && (
                              <button onClick={() => removeMarket(idx)} style={{ background: "none", border: "none", color: t.text4, padding: "6px 8px 6px 2px", cursor: "pointer", fontSize: fs - 4 }}>✕</button>
                            )}
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <input
                      value={newMarketName}
                      onChange={(e) => setNewMarketName(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && addMarket()}
                      placeholder="+ Novo mercado..."
                      style={{ ...inp, marginTop: 0, flex: 1, padding: "8px 12px", borderStyle: "dashed" }}
                    />
                    <button
                      onClick={addMarket}
                      disabled={!newMarketName.trim()}
                      style={{ background: newMarketName.trim() ? t.accent : t.bg4, color: newMarketName.trim() ? t.accentText : t.text4, border: "none", borderRadius: 10, padding: "9px 14px", cursor: newMarketName.trim() ? "pointer" : "default", fontFamily: "inherit", fontWeight: "bold", fontSize: fs, flexShrink: 0 }}
                    >+</button>
                  </div>
                </div>

                <button onClick={createList} style={primaryBtn}>CRIAR LISTA</button>
              </div>
            )}
          </div>

          <div style={{ padding: "14px 24px 0" }}>
            {filteredLists.length === 0 ? (
              <div style={{ textAlign: "center", padding: "50px 0", color: t.text4 }}>
                <div style={{ fontSize: 38 }}>🛒</div>
                <div style={{ marginTop: 10, fontSize: fs }}>Nenhuma lista encontrada</div>
              </div>
) : (() => {
              const now = new Date();
              const curMk = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,"0")}`;
              const currentLists = filteredLists.filter((l) => (l.date || "").startsWith(curMk));
              const historyLists = filteredLists.filter((l) => !(l.date || "").startsWith(curMk));

              // Group history by month
              const histGroups = {};
              historyLists.forEach((list) => {
                const mk = list.date ? list.date.substring(0, 7) : "0000-00";
                if (!histGroups[mk]) histGroups[mk] = [];
                histGroups[mk].push(list);
              });
              const histKeys = Object.keys(histGroups).sort((a, b) => b.localeCompare(a));

              const renderListCard = (list, idx, lists) => (
                          <div
                            key={list.id}
                            style={{ ...card, cursor: "pointer", margin: 0, borderRadius: 0, border: "none", borderBottom: idx < lists.length - 1 ? `1px solid ${t.bg3}` : "none" }}
                            onClick={() => { setActiveListId(list.id); setSearchQuery(""); setView("list-detail"); }}
                          >
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                              <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ fontWeight: "bold", fontSize: fs + 1 }}>{list.name}</div>
                                <div style={{ fontSize: fs - 3, color: t.text3, marginTop: 2 }}>
                                  {list.market} · {new Date(list.date + "T12:00").toLocaleDateString("pt-BR")}
                                </div>
                              </div>
                              <div style={{ textAlign: "right", flexShrink: 0, marginLeft: 10 }}>
                                <div style={{ color: t.accent, fontWeight: "bold", fontSize: fs + 3 }}>{fmt(listTotal(list))}</div>
                                <div style={{ fontSize: fs - 4, color: t.text3 }}>{list.items.length} itens</div>
                              </div>
                            </div>
                            {list.items.length > 0 && (
                              <div style={{ marginTop: 8, display: "flex", gap: 5, flexWrap: "wrap" }}>
                                {list.items.slice(0, 5).map((i) => (
                                  <span key={i.id} style={{ background: t.bg3, borderRadius: 6, padding: "2px 7px", fontSize: fs - 4, color: t.text3, textDecoration: i.checked ? "line-through" : "none" }}>
                                    {i.name}
                                  </span>
                                ))}
                                {list.items.length > 5 && <span style={{ fontSize: fs - 4, color: t.text4 }}>+{list.items.length - 5}</span>}
                              </div>
                            )}
                            <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
                              <button
                                onClick={(e) => { e.stopPropagation(); setDuplicateSource(list); setDuplicateZero(false); setDuplicateMarket(list.market); }}
                                style={{ background: t.accentBg, border: `1px solid ${t.accentBorder}`, color: t.accent, borderRadius: 8, padding: "4px 10px", fontSize: fs - 4, cursor: "pointer", fontFamily: "inherit" }}
                              >
                                ⧉ Duplicar
                              </button>
                              <button
                                onClick={(e) => { e.stopPropagation(); deleteList(list.id); }}
                                style={{ background: "none", border: "none", color: t.text4, fontSize: fs - 4, cursor: "pointer", padding: "4px 0", fontFamily: "inherit" }}
                              >
                                ✕ Remover
                              </button>
                            </div>
                          </div>
              );

              return (
                <>
                  {/* Current month lists */}
                  {currentLists.length === 0 && !searchQuery ? (
                    <div style={{ textAlign: "center", padding: "30px 0", color: t.text4, fontSize: fs - 1 }}>
                      Nenhuma lista este mês
                    </div>
                  ) : (
                    <div style={{ border: `1px solid ${t.accentBorder}`, borderRadius: 12, overflow: "hidden", marginBottom: 8 }}>
                      {currentLists.map((list, idx) => renderListCard(list, idx, currentLists))}
                    </div>
                  )}

                  {/* History button / section */}
                  {historyLists.length > 0 && (
                    <div style={{ marginTop: 4 }}>
                      {!showHistory ? (
                        <button
                          onClick={() => setShowHistory(true)}
                          style={{ width: "100%", padding: "12px", background: t.bg2, border: `1px solid ${t.border}`, borderRadius: 12, color: t.text3, fontSize: fs - 2, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
                        >
                          <span>📁</span>
                          <span>Ver histórico ({historyLists.length} lista{historyLists.length !== 1 ? "s" : ""})</span>
                          <span style={{ marginLeft: "auto", fontSize: fs - 3 }}>▾</span>
                        </button>
                      ) : (
                        <>
                          <button
                            onClick={() => setShowHistory(false)}
                            style={{ width: "100%", padding: "12px", background: t.bg2, border: `1px solid ${t.border}`, borderRadius: "12px 12px 0 0", color: t.text3, fontSize: fs - 2, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, borderBottom: "none" }}
                          >
                            <span>📁</span>
                            <span>Histórico ({historyLists.length} lista{historyLists.length !== 1 ? "s" : ""})</span>
                            <span style={{ marginLeft: "auto", fontSize: fs - 3 }}>▴</span>
                          </button>
                          <div style={{ border: `1px solid ${t.border}`, borderTop: "none", borderRadius: "0 0 12px 12px", overflow: "hidden" }}>
                            {histKeys.map((mk) => {
                              const [yr, mo] = mk.split("-");
                              const monthName = mo && mo !== "00" ? `${MONTHS_FULL[parseInt(mo,10)-1]} ${yr}` : "Data desconhecida";
                              const lists = histGroups[mk];
                              const groupTotal = lists.reduce((s, l) => s + listTotal(l), 0);
                              return (
                                <div key={mk}>
                                  <div style={{ padding: "8px 14px", background: t.bg3, display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${t.border}` }}>
                                    <span style={{ fontSize: fs - 2, fontWeight: "bold", color: t.text2 }}>{monthName}</span>
                                    <span style={{ fontSize: fs - 3, color: t.text3 }}>{lists.length} lista{lists.length !== 1 ? "s" : ""} · {fmt(groupTotal)}</span>
                                  </div>
                                  {lists.map((list, idx) => renderListCard(list, idx, lists))}
                                </div>
                              );
                            })}
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </>
              );
            })()}
          </div>
        </div>
      )}

      {/* ======================================================================
          L I S T   D E T A I L
      ====================================================================== */}
      {view === "list-detail" && currentList && (
        <div style={{ display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden" }}>

          {/* -- Fixed top section -- */}
          <div style={{ flexShrink: 0, background: t.bg2, borderBottom: `1px solid ${t.border}`, zIndex: 10 }}>

            {/* Compact top bar: [← Voltar]  [☰ title]  [⋮] */}
            <div style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "10px 12px", paddingTop: "calc(10px + env(safe-area-inset-top, 0px))",
              borderBottom: `1px solid ${t.bg3}`,
            }}>
              {/* Left: back button */}
              <button
                onClick={() => { setView("home"); setSearchQuery(""); setListMenuOpen(false); setListPriceFilter(null); }}
                style={{ background: "none", border: "none", color: t.accent, fontSize: fs, cursor: "pointer", padding: "4px 6px", fontFamily: "inherit", flexShrink: 0, display: "flex", alignItems: "center", gap: 4, borderRadius: 8 }}
              >
                ← Voltar
              </button>

              {/* Centre: drawer button + list name (tap to edit) */}
              <button
                onClick={() => setDrawerOpen(true)}
                style={{ background: "none", border: "none", color: t.text3, fontSize: fs + 2, cursor: "pointer", padding: "4px 2px", flexShrink: 0, lineHeight: 1 }}
              >
                ☰
              </button>
              <div
                style={{ flex: 1, minWidth: 0, textAlign: "center", cursor: "pointer" }}
                onClick={() => { setEditListName(currentList.name); setEditListMarket(currentList.market); setEditingListHeader(true); }}
              >
                <div style={{ fontSize: fs - 1, fontWeight: "bold", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", color: t.text }}>
                  {currentList.name}
                </div>
                <div style={{ fontSize: fs - 4, color: t.text3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  ✏️ {currentList.market} · {new Date(currentList.date + "T12:00").toLocaleDateString("pt-BR")}
                </div>
              </div>

              {/* Right: sort/actions menu */}
              <div style={{ position: "relative", flexShrink: 0 }}>
                <button
                  onClick={() => setListMenuOpen((v) => !v)}
                  style={{ background: t.bg3, border: `1px solid ${t.border}`, color: t.text2, borderRadius: 8, padding: "5px 10px", cursor: "pointer", fontSize: fs + 2, fontFamily: "inherit", lineHeight: 1 }}
                  title="Ordenar e ações"
                >
                  ⋮
                </button>

                {/* Dropdown menu — anchored to right edge */}
                {listMenuOpen && (
                  <>
                    <div onClick={() => setListMenuOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 98 }} />
                    <div style={{
                      position: "absolute", right: 0, top: "calc(100% + 6px)", zIndex: 99,
                      background: t.bg2, border: `1px solid ${t.border}`, borderRadius: 12,
                      minWidth: 230, boxShadow: `0 8px 32px rgba(0,0,0,0.5)`, overflow: "hidden",
                    }}>
                      <div style={{ padding: "10px 16px", fontSize: fs - 5, letterSpacing: 2, color: t.text3, borderBottom: `1px solid ${t.border}` }}>
                        ORDENAR POR
                      </div>
                      {SORT_OPTIONS.map((opt) => (
                        <button
                          key={opt.key}
                          onClick={() => { setSettings((s) => ({ ...s, sortKey: opt.key })); setListMenuOpen(false); }}
                          style={{
                            display: "flex", alignItems: "center", justifyContent: "space-between",
                            width: "100%", padding: "11px 16px",
                            background: settings.sortKey === opt.key ? t.accentBg : "none",
                            border: "none", borderBottom: `1px solid ${t.bg3}`,
                            color: settings.sortKey === opt.key ? t.accent : t.text,
                            cursor: "pointer", fontFamily: "inherit", fontSize: fs - 2, textAlign: "left",
                          }}
                        >
                          <span>{opt.label}</span>
                          {settings.sortKey === opt.key && <span>✓</span>}
                        </button>
                      ))}
                      <div style={{ padding: "10px 16px", fontSize: fs - 5, letterSpacing: 2, color: t.text3, borderBottom: `1px solid ${t.border}`, borderTop: `1px solid ${t.border}`, marginTop: 4 }}>
                        FILTRAR PREÇO
                      </div>
                      {[
                        { key: null,       label: "Todos os itens",       icon: "○" },
                        { key: "cheaper",  label: "Ficou mais barato",    icon: "▼", color: t.down },
                        { key: "pricier",  label: "Ficou mais caro",      icon: "▲", color: t.up   },
                      ].map(({ key, label, icon, color }) => {
                        const active = listPriceFilter === key;
                        return (
                          <button
                            key={String(key)}
                            onClick={() => { setListPriceFilter(key); setListMenuOpen(false); }}
                            style={{
                              display: "flex", alignItems: "center", gap: 10,
                              width: "100%", padding: "11px 16px",
                              background: active ? t.accentBg : "none",
                              border: "none", borderBottom: `1px solid ${t.bg3}`,
                              color: active ? t.accent : t.text,
                              cursor: "pointer", fontFamily: "inherit", fontSize: fs - 2, textAlign: "left",
                            }}
                          >
                            <span style={{ color: active ? t.accent : (color || t.text3), fontSize: fs - 2, width: 14 }}>{icon}</span>
                            <span style={{ flex: 1 }}>{label}</span>
                            {active && <span style={{ color: t.accent }}>✓</span>}
                          </button>
                        );
                      })}
                      <div style={{ padding: "10px 16px", fontSize: fs - 5, letterSpacing: 2, color: t.text3, borderBottom: `1px solid ${t.border}`, borderTop: `1px solid ${t.border}`, marginTop: 4 }}>
                        AÇÕES
                      </div>
                      <button
                        onClick={() => markAll(true)}
                        style={{ display: "block", width: "100%", padding: "11px 16px", background: "none", border: "none", borderBottom: `1px solid ${t.bg3}`, color: t.text, cursor: "pointer", fontFamily: "inherit", fontSize: fs - 2, textAlign: "left" }}
                      >
                        ✓ Marcar todos
                      </button>
                      <button
                        onClick={() => markAll(false)}
                        style={{ display: "block", width: "100%", padding: "11px 16px", background: "none", border: "none", color: t.text, cursor: "pointer", fontFamily: "inherit", fontSize: fs - 2, textAlign: "left" }}
                      >
                        ○ Desmarcar todos
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Total strip — compact single line */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 16px", background: t.bg }}>
              <div style={{ fontSize: fs - 4, color: t.text3 }}>
                {currentList.items.filter((i) => i.checked).length}/{currentList.items.length} marcados
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                <span style={{ fontSize: fs - 4, color: t.text3, letterSpacing: 1 }}>TOTAL</span>
                <span style={{ fontSize: fs + 6, color: t.accent, fontWeight: "bold", lineHeight: 1 }}>{fmt(listTotal(currentList))}</span>
              </div>
            </div>

            {/* Add item form */}
            <div style={{ padding: "10px 16px 12px", background: t.bg, borderBottom: `1px solid ${t.border}`, position: "relative" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 56px 70px", gap: 6, marginBottom: 8 }}>
                <div style={{ position: "relative" }}>
                  <input
                    value={newItem.name}
                    onChange={(e) => handleNameInput(e.target.value)}
                    placeholder="Produto"
                    style={{ ...inp, marginTop: 0 }}
                    onKeyDown={(e) => e.key === "Enter" && addItem()}
                  />
                  {showAutocomplete && (
                    <div style={{ position: "absolute", top: "100%", left: 0, right: 0, background: t.bg2, border: `1px solid ${t.border}`, borderRadius: 10, zIndex: 50, overflow: "hidden", boxShadow: `0 8px 24px ${t.shadow}` }}>
                      {autocomplete.map((ac) => (
                        <div
                          key={ac.name}
                          onClick={() => pickAutocomplete(ac)}
                          style={{ padding: "10px 14px", cursor: "pointer", borderBottom: `1px solid ${t.border}`, display: "flex", justifyContent: "space-between" }}
                        >
                          <span style={{ textTransform: "capitalize", fontSize: fs - 1 }}>{ac.name}</span>
                          <span style={{ color: t.accent, fontSize: fs - 2 }}>{fmt(ac.lastPrice)}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <input
                  type="number"
                  value={newItem.qty}
                  onChange={(e) => setNewItem((i) => ({ ...i, qty: e.target.value.replace(/[^0-9]/g, "") }))}
                  placeholder="Qtd"
                  style={{ ...inp, marginTop: 0 }}
                  min="1"
                  step="1"
                />
                <div style={{ position: "relative" }}>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={newItem.price}
                    onChange={(e) => setNewItem((i) => ({ ...i, price: maskCurrency(e.target.value) }))}
                    placeholder="0,00"
                    style={{ ...inp, marginTop: 0 }}
                    onKeyDown={(e) => e.key === "Enter" && addItem()}
                  />
                  {(() => {
                    const hint = getPriceHint(newItem.name, unmaskCurrency(newItem.price));
                    if (!hint) return null;
                    return (
                      <div style={{
                        position: "absolute", top: "50%", right: 6, transform: "translateY(-50%)",
                        fontSize: fs - 5, fontWeight: "bold", lineHeight: 1,
                        color: hint.arrow === "down" ? t.down : t.up,
                        display: "flex", flexDirection: "column", alignItems: "center", gap: 1,
                        pointerEvents: "none",
                      }}>
                        <span>{hint.arrow === "down" ? "▼" : "▲"}</span>
                        <span style={{ fontSize: fs - 7 }}>{hint.pct.toFixed(0)}%</span>
                      </div>
                    );
                  })()}
                </div>
              </div>
              <button onClick={addItem} style={{ ...primaryBtn, padding: "10px" }}>+ ADICIONAR</button>
            </div>
          </div>

          {/* -- Scrollable items -- */}
          <div style={{ flex: 1, overflowY: "auto", padding: "8px 16px 20px" }}>
            {/* Active filter badge */}
            {listPriceFilter && (
              <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 0 4px", marginBottom: 2 }}>
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  background: listPriceFilter === "cheaper" ? t.downBg : t.upBg,
                  color: listPriceFilter === "cheaper" ? t.down : t.up,
                  borderRadius: 20, padding: "4px 12px", fontSize: fs - 4, fontWeight: "bold",
                }}>
                  {listPriceFilter === "cheaper" ? "▼ Mais baratos" : "▲ Mais caros"}
                  <span
                    onClick={() => setListPriceFilter(null)}
                    style={{ marginLeft: 4, cursor: "pointer", opacity: 0.7, fontSize: fs - 3 }}
                  >✕</span>
                </div>
              </div>
            )}
            {sortedItems.length === 0 && (
              <div style={{ textAlign: "center", padding: "40px 0", color: t.text4, fontSize: fs }}>
                Nenhum item ainda
              </div>
            )}
            {sortedItems.length > 0 && displayedItems.length === 0 && (
              <div style={{ textAlign: "center", padding: "40px 0", color: t.text4, fontSize: fs }}>
                Nenhum item com variação de preço encontrado
              </div>
            )}
            {displayedItems.map((item) => {
              const hint = item.priceHint || getPriceHint(item.name, item.price);
              return (
                <div key={item.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 0", borderBottom: `1px solid ${t.bg3}` }}>
                  <div
                    onClick={() => toggleItem(item.id)}
                    style={{ width: 22, height: 22, borderRadius: 6, border: `2px solid ${item.checked ? t.accent : t.bg4}`, background: item.checked ? t.accent : "transparent", cursor: "pointer", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: fs - 3, color: t.accentText }}
                  >
                    {item.checked ? "✓" : ""}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: fs, textDecoration: item.checked ? "line-through" : "none", color: item.checked ? t.text4 : t.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {item.name}
                    </div>
                    <div style={{ fontSize: fs - 3, color: t.text3, display: "flex", alignItems: "center", gap: 5 }}>
                      <span>{item.qty}x {fmt(item.price)}</span>
                      {hint && !item.checked && (
                        <span style={{
                          color: hint.arrow === "down" ? t.down : t.up,
                          fontWeight: "bold", fontSize: fs - 4, lineHeight: 1,
                          display: "inline-flex", alignItems: "center", gap: 2,
                        }}>
                          {hint.arrow === "down" ? "▼" : "▲"}{hint.pct.toFixed(0)}%
                        </span>
                      )}
                    </div>
                  </div>
                  <div style={{ color: item.checked ? t.text4 : t.accent, fontWeight: "bold", fontSize: fs }}>
                    {fmt(item.qty * item.price)}
                  </div>
                  <button
                    onClick={() => setEditingItem({ ...item, price: maskCurrency(String(Math.round(item.price * 100))), qty: item.qty.toString() })}
                    style={{ background: "none", border: "none", color: t.text3, cursor: "pointer", fontSize: fs + 1, padding: "0 2px" }}
                  >
                    ✏️
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ======================================================================
          A N A L Y S I S
      ====================================================================== */}
      {view === "analysis" && (
        <div style={{ paddingBottom: 40 }}>
          {/* Header */}
          <div style={{ padding: "68px 24px 16px", borderBottom: `1px solid ${t.border}`, background: t.bg2 }}>
            <h2 style={{ margin: "0 0 16px", fontWeight: "normal", fontSize: fs + 8 }}>Análise</h2>
            <div style={{ display: "flex", gap: 7 }}>
              {[["annual", "📅 Anual"], ["monthly", "🗓 Mensal"], ["markets", "🏪 Mercados"]].map(([k, l]) => (
                <button key={k} onClick={() => setAnalysisTab(k)} style={tabBtn(analysisTab === k)}>{l}</button>
              ))}
            </div>
          </div>

          <div style={{ padding: "16px 24px" }}>

            {/* -- ANNUAL ------------------------------------------- */}
            {analysisTab === "annual" && (
              <div>
                <div style={{ display: "flex", gap: 7, marginBottom: 18 }}>
                  {[["bars", "📊 Barras"], ["hbars", "↔ Horizontal"], ["numbers", "🔢 Números"]].map(([k, l]) => (
                    <button key={k} onClick={() => setChartMode(k)} style={tabBtn(chartMode === k)}>{l}</button>
                  ))}
                </div>

                {annualYears.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "60px 0", color: t.text4, fontSize: fs }}>Sem dados ainda</div>
                ) : annualYears.map((yr) => (
                  <div key={yr.year} style={card}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                      <div style={{ fontSize: fs + 2, color: t.text2, fontWeight: "bold" }}>{yr.year}</div>
                      <div style={{ color: t.accent, fontWeight: "bold", fontSize: fs + 2 }}>{fmt(yr.total)}</div>
                    </div>

                    {chartMode === "bars" && (
                      <VerticalBars data={yr.months} t={t} fs={fs} />
                    )}
                    {chartMode === "hbars" && (
                      <HorizontalBars data={yr.months.filter((m) => m.value > 0)} t={t} fs={fs} />
                    )}
                    {chartMode === "numbers" && (
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                        {yr.months.map((m) => (
                          <div key={m.key} style={{ background: t.bg3, borderRadius: 8, padding: "8px 10px", opacity: m.value > 0 ? 1 : 0.35 }}>
                            <div style={{ fontSize: fs - 4, color: t.text3 }}>{m.label}</div>
                            <div style={{ fontSize: fs - 1, color: m.value > 0 ? t.accent : t.text4, fontWeight: "bold", marginTop: 2 }}>
                              {m.value > 0 ? fmt(m.value) : "--"}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* -- MONTHLY ------------------------------------------ */}
            {analysisTab === "monthly" && (
              <div>
                {/* Month navigator */}
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                  <button
                    onClick={() => {
                      const idx = allMonthKeys.indexOf(safeMonth);
                      if (idx > 0) setAnalysisMonth(allMonthKeys[idx - 1]);
                    }}
                    disabled={allMonthKeys.indexOf(safeMonth) <= 0}
                    style={{ background: t.bg3, border: `1px solid ${t.border}`, color: t.text2, borderRadius: 8, padding: "8px 14px", cursor: "pointer", fontSize: fs + 2, opacity: allMonthKeys.indexOf(safeMonth) <= 0 ? 0.3 : 1 }}
                  >‹</button>
                  <div style={{ flex: 1, textAlign: "center", fontSize: fs + 1, color: t.text, fontWeight: "bold" }}>
                    {monthLabelFull(safeMonth)}
                  </div>
                  <button
                    onClick={() => {
                      const idx = allMonthKeys.indexOf(safeMonth);
                      if (idx < allMonthKeys.length - 1) setAnalysisMonth(allMonthKeys[idx + 1]);
                    }}
                    disabled={allMonthKeys.indexOf(safeMonth) >= allMonthKeys.length - 1}
                    style={{ background: t.bg3, border: `1px solid ${t.border}`, color: t.text2, borderRadius: 8, padding: "8px 14px", cursor: "pointer", fontSize: fs + 2, opacity: allMonthKeys.indexOf(safeMonth) >= allMonthKeys.length - 1 ? 0.3 : 1 }}
                  >›</button>
                </div>

                {/* View toggle */}
                <div style={{ display: "flex", gap: 7, marginBottom: 16 }}>
                  {[["bars", "📊 Gráfico"], ["numbers", "🔢 Números"]].map(([k, l]) => (
                    <button key={k} onClick={() => setChartMode(k)} style={tabBtn(chartMode === k)}>{l}</button>
                  ))}
                </div>

                {selectedMonthLists.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "40px 0", color: t.text4, fontSize: fs }}>
                    Sem listas neste mês
                  </div>
                ) : (
                  <>
                    {/* Summary card */}
                    <div style={{ ...card, background: t.accentBg, border: `1px solid ${t.accentBorder}` }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <div>
                          <div style={{ fontSize: fs - 4, color: t.accent, letterSpacing: 2 }}>TOTAL DO MÊS</div>
                          <div style={{ fontSize: fs + 10, color: t.accent, fontWeight: "bold", lineHeight: 1.1 }}>
                            {fmt(selectedMonthLists.reduce((s, l) => s + listTotal(l), 0))}
                          </div>
                          <div style={{ fontSize: fs - 3, color: t.text3, marginTop: 4 }}>
                            {selectedMonthLists.length} lista{selectedMonthLists.length !== 1 ? "s" : ""}
                          </div>
                        </div>

                        {/* vs prev month */}
                        {prevMonthLists.length > 0 && (() => {
                          const cur = selectedMonthLists.reduce((s, l) => s + listTotal(l), 0);
                          const prev = prevMonthLists.reduce((s, l) => s + listTotal(l), 0);
                          const diff = ((cur - prev) / prev) * 100;
                          return (
                            <div style={{ textAlign: "right" }}>
                              <div style={{ fontSize: fs - 4, color: t.text3 }}>vs {monthLabel(prevMonthKey)}</div>
                              <div style={{ fontSize: fs + 3, color: diff > 0 ? t.up : t.down, fontWeight: "bold" }}>
                                {diff > 0 ? "↑" : "↓"} {Math.abs(diff).toFixed(1)}%
                              </div>
                              <div style={{ fontSize: fs - 4, color: t.text3 }}>{fmt(prev)}</div>
                            </div>
                          );
                        })()}
                      </div>
                    </div>

                    {/* Lists of the month */}
                    {chartMode === "bars" ? (
                      <div style={card}>
                        <div style={{ fontSize: fs - 4, letterSpacing: 2, color: t.text3, marginBottom: 14 }}>LISTAS DO MÊS</div>
                        <VerticalBars
                          data={selectedMonthLists.map((l) => ({ label: l.name.slice(0, 10), value: listTotal(l) }))}
                          t={t} fs={fs}
                        />
                      </div>
                    ) : (
                      selectedMonthLists.map((l) => (
                        <div
                          key={l.id}
                          style={{ ...card, cursor: "pointer" }}
                          onClick={() => { setActiveListId(l.id); setView("list-detail"); }}
                        >
                          <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <div>
                              <div style={{ fontSize: fs, fontWeight: "bold" }}>{l.name}</div>
                              <div style={{ fontSize: fs - 3, color: t.text3 }}>
                                {l.market} · {new Date(l.date + "T12:00").toLocaleDateString("pt-BR")}
                              </div>
                              <div style={{ fontSize: fs - 3, color: t.text3, marginTop: 2 }}>{l.items.length} itens</div>
                            </div>
                            <div style={{ color: t.accent, fontWeight: "bold", fontSize: fs + 2, flexShrink: 0, marginLeft: 10 }}>
                              {fmt(listTotal(l))}
                            </div>
                          </div>
                        </div>
                      ))
                    )}

                    {/* Product price comparison */}
                    {productComparison.length > 0 && (
                      <div style={card}>
                        <div style={{ fontSize: fs - 4, letterSpacing: 2, color: t.text3, marginBottom: 14 }}>
                          COMPARAÇÃO COM {monthLabel(prevMonthKey).toUpperCase()}
                        </div>
                        {productComparison.slice(0, 12).map((p) => (
                          <div key={p.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 0", borderBottom: `1px solid ${t.bg3}` }}>
                            <div style={{ textTransform: "capitalize", fontSize: fs - 1, flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                              {p.name}
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0, marginLeft: 8 }}>
                              <span style={{ fontSize: fs - 3, color: t.text3 }}>{fmt(p.prevPrice)}</span>
                              <span style={{
                                fontSize: fs - 4, padding: "2px 7px", borderRadius: 8,
                                background: p.diff > 0 ? t.upBg : t.downBg,
                                color: p.diff > 0 ? t.up : t.down, fontWeight: "bold",
                              }}>
                                {p.diff > 0 ? "↑" : "↓"} {Math.abs(p.diff).toFixed(1)}%
                              </span>
                              <span style={{ fontSize: fs - 1, color: t.accent, fontWeight: "bold" }}>{fmt(p.curPrice)}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            )}

            {/* -- MARKETS ------------------------------------------ */}
            {analysisTab === "markets" && (
              <div>
                <div style={{ display: "flex", gap: 7, marginBottom: 18 }}>
                  {[["hbars", "📊 Gráfico"], ["numbers", "🔢 Números"]].map(([k, l]) => (
                    <button key={k} onClick={() => setChartMode(k)} style={tabBtn(chartMode === k)}>{l}</button>
                  ))}
                </div>

                {dashMarkets.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "60px 0", color: t.text4, fontSize: fs }}>Sem dados ainda</div>
                ) : (
                  <>
                    <div style={{ background: t.accentBg, border: `1px solid ${t.accentBorder}`, borderRadius: 12, padding: 16, marginBottom: 14 }}>
                      <div style={{ fontSize: fs - 4, color: t.accent, letterSpacing: 2 }}>MAIS ECONÔMICO</div>
                      <div style={{ fontSize: fs + 5, marginTop: 4 }}>🏆 {dashMarkets[0]?.market}</div>
                      <div style={{ fontSize: fs - 2, color: t.text3, marginTop: 2 }}>Média: {fmt(dashMarkets[0]?.avg)}/compra</div>
                    </div>

                    {chartMode === "hbars" ? (
                      <div style={card}>
                        <HorizontalBars data={dashMarkets.map((m) => ({ label: m.market, value: m.avg }))} t={t} fs={fs} />
                      </div>
                    ) : (
                      dashMarkets.map((m, i) => (
                        <div key={m.market} style={{ ...card, display: "flex", alignItems: "center", gap: 12 }}>
                          <div style={{ width: 28, height: 28, borderRadius: 8, background: i === 0 ? t.accentBg : t.bg3, color: i === 0 ? t.accent : t.text3, display: "flex", alignItems: "center", justifyContent: "center", fontSize: fs - 2, fontWeight: "bold" }}>
                            {i + 1}º
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: fs }}>{m.market}</div>
                            <div style={{ fontSize: fs - 3, color: t.text3 }}>{m.count} compra{m.count !== 1 ? "s" : ""}</div>
                          </div>
                          <div style={{ textAlign: "right" }}>
                            <div style={{ color: t.accent, fontSize: fs - 1 }}>{fmt(m.avg)}/compra</div>
                            <div style={{ fontSize: fs - 3, color: t.text3 }}>Total: {fmt(m.total)}</div>
                          </div>
                        </div>
                      ))
                    )}
                  </>
                )}
              </div>
            )}

          </div>
        </div>
      )}

      {/* ======================================================================
          S E T T I N G S
      ====================================================================== */}
      {view === "settings" && (() => {
        // Accordion helper
        const toggle = (key) => setSettingsOpen((o) => o === key ? null : key);
        const isOpen = (key) => settingsOpen === key;

        const AccordionHeader = ({ skey, icon, title, subtitle }) => (
          <div
            onClick={() => toggle(skey)}
            style={{
              display: "flex", alignItems: "center", gap: 12,
              padding: "15px 16px", cursor: "pointer",
              borderBottom: isOpen(skey) ? `1px solid ${t.border}` : "none",
            }}
          >
            <span style={{ fontSize: fs + 2 }}>{icon}</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: fs - 1, fontWeight: "bold", color: t.text }}>{title}</div>
              {subtitle && <div style={{ fontSize: fs - 4, color: t.text3, marginTop: 2 }}>{subtitle}</div>}
            </div>
            <span style={{ color: t.text3, fontSize: fs - 2, transition: "transform 0.2s", display: "inline-block", transform: isOpen(skey) ? "rotate(180deg)" : "none" }}>▾</span>
          </div>
        );

        const acCard = { ...card, padding: 0, overflow: "hidden", marginBottom: 10 };
        const body = { padding: "14px 16px 16px" };

        return (
          <div style={{ padding: "68px 16px 40px" }}>
            <h2 style={{ margin: "0 0 20px", fontWeight: "normal", fontSize: fs + 8, paddingLeft: 8 }}>Configurações</h2>

            {/* 1 — NAVEGAÇÃO */}
            <div style={acCard}>
              <AccordionHeader skey="nav" icon="👆" title="Navegação"
                subtitle={`Gesto: ${settings.swipeEnabled ? "ativo" : "inativo"} · Botão: ${(settings.hamburgerPos || "top-left").replace("-", " ").replace("-", " ")}`}
              />
              {isOpen("nav") && (
                <div style={body}>
                  {/* Swipe toggle */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                    <div>
                      <div style={{ fontSize: fs - 1, fontWeight: "bold" }}>Gesto de deslize</div>
                      <div style={{ fontSize: fs - 4, color: t.text3, marginTop: 2 }}>Deslizar da esquerda abre o menu</div>
                    </div>
                    <div
                      onClick={() => setSettings((s) => ({ ...s, swipeEnabled: !s.swipeEnabled }))}
                      style={{ width: 48, height: 26, borderRadius: 13, cursor: "pointer", flexShrink: 0, background: settings.swipeEnabled ? t.accent : t.bg4, position: "relative", transition: "background 0.2s" }}
                    >
                      <div style={{ position: "absolute", top: 3, left: settings.swipeEnabled ? 25 : 3, width: 20, height: 20, borderRadius: "50%", background: settings.swipeEnabled ? t.accentText : t.text3, transition: "left 0.2s", boxShadow: "0 1px 4px rgba(0,0,0,0.3)" }} />
                    </div>
                  </div>
                  {settings.swipeEnabled && (
                    <div style={{ fontSize: fs - 4, color: t.text3, background: t.bg3, borderRadius: 8, padding: "7px 10px", marginBottom: 16 }}>
                      💡 Se o deslize incomodar ao editar mercados, desative aqui.
                    </div>
                  )}

                  {/* Hamburger position */}
                  <div style={{ fontSize: fs - 4, letterSpacing: 1, color: t.text3, marginBottom: 10 }}>POSIÇÃO DO BOTÃO ☰</div>
                  {(() => {
                    const positions = [
                      { key: "top-left", label: "↖", r: 1, c: 1 },
                      { key: "top-center", label: "↑", r: 1, c: 2 },
                      { key: "top-right", label: "↗", r: 1, c: 3 },
                      { key: "bottom-left", label: "↙", r: 2, c: 1 },
                      { key: "bottom-center", label: "↓", r: 2, c: 2 },
                      { key: "bottom-right", label: "↘", r: 2, c: 3 },
                    ];
                    const labels = { "top-left": "Superior esquerdo", "top-center": "Superior centro", "top-right": "Superior direito", "bottom-left": "Inferior esquerdo", "bottom-center": "Inferior centro", "bottom-right": "Inferior direito" };
                    const cur = settings.hamburgerPos || "top-left";
                    return (
                      <>
                        <div style={{ background: t.bg3, borderRadius: 12, border: `1px solid ${t.border}`, padding: 8, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gridTemplateRows: "48px 48px", gap: 5 }}>
                          {positions.map((p) => {
                            const active = cur === p.key;
                            return (
                              <button key={p.key} onClick={() => setSettings((s) => ({ ...s, hamburgerPos: p.key }))}
                                style={{ gridRow: p.r, gridColumn: p.c, background: active ? t.accentBg : t.bg4, border: `2px solid ${active ? t.accent : "transparent"}`, borderRadius: 8, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: active ? fs + 4 : fs, color: active ? t.accent : t.text4, transition: "all 0.15s" }}
                              >
                                {active ? "☰" : p.label}
                              </button>
                            );
                          })}
                        </div>
                        <div style={{ fontSize: fs - 4, color: t.accent, textAlign: "center", marginTop: 8 }}>{labels[cur]}</div>
                      </>
                    );
                  })()}
                </div>
              )}
            </div>

            {/* 2 — APARÊNCIA */}
            <div style={acCard}>
              <AccordionHeader skey="theme" icon="🎨" title="Aparência"
                subtitle={`Paleta: ${allPalettes[settings.paletteKey]?.name || "Dourado"} · ${settings.paletteMode === "dark" ? "Escuro" : "Claro"}`}
              />
              {isOpen("theme") && (
                <div style={body}>
                  {/* Paleta */}
                  <div style={{ border: `1px solid ${t.border}`, borderRadius: 10, overflow: "hidden", marginBottom: 4 }}>
                    <div style={{ padding: "12px 12px 14px", background: t.bg2 }}>
                      {/* Light/dark toggle */}
                      <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
                        {[["dark", "🌙 Escuro"], ["light", "☀️ Claro"]].map(([k, l]) => (
                          <button key={k} onClick={() => setSettings((s) => ({ ...s, paletteMode: k, themeSource: "palette" }))}
                            style={{ flex: 1, padding: "8px 4px", fontSize: fs - 3, border: `1px solid ${settings.paletteMode === k ? t.accent : t.border}`, background: settings.paletteMode === k ? t.accentBg : t.bg3, color: settings.paletteMode === k ? t.accent : t.text2, borderRadius: 8, cursor: "pointer", fontFamily: "inherit" }}
                          >{l}</button>
                        ))}
                      </div>
                      {/* Palettes */}
                      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                        {Object.entries(allPalettes).map(([key, pal]) => {
                          const active = settings.themeSource === "palette" && settings.paletteKey === key;
                          const isCustom = key.startsWith("custom_");
                          const desc = { dourado: "Clássica e elegante", nord: "Ártico e limpa", gruvbox: "Retrô e quente", rosePine: "Suave e floral", catppuccin: "Pastel techno", meiaNoite: "OLED · preto absoluto", papel: "Tinta sobre papel" };
                          return (
                            <div key={key} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                              <button onClick={() => setSettings((s) => ({ ...s, paletteKey: key, themeSource: "palette" }))}
                                style={{ flex: 1, display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", background: active ? t.accentBg : t.bg3, border: `1px solid ${active ? t.accent : t.border}`, borderRadius: 10, cursor: "pointer", textAlign: "left" }}
                              >
                                <div style={{ display: "flex", gap: 2, flexShrink: 0 }}>
                                  {[pal.dark.bg, pal.dark.accent].map((c, i) => <div key={i} style={{ width: 10, height: 26, borderRadius: i === 0 ? "3px 0 0 3px" : 0, background: c }} />)}
                                  <div style={{ width: 1, background: t.border }} />
                                  {[pal.light.bg, pal.light.accent].map((c, i) => <div key={i} style={{ width: 10, height: 26, borderRadius: i === 1 ? "0 3px 3px 0" : 0, background: c }} />)}
                                </div>
                                <div style={{ flex: 1 }}>
                                  <div style={{ fontSize: fs - 2, color: active ? t.accent : t.text, fontWeight: active ? "bold" : "normal" }}>
                                    {pal.name}{isCustom && <span style={{ fontSize: fs - 6, color: t.accent, marginLeft: 5, background: t.accentBg, padding: "1px 5px", borderRadius: 4 }}>custom</span>}
                                  </div>
                                  <div style={{ fontSize: fs - 5, color: t.text3 }}>{desc[key] || "Tema importado"}</div>
                                </div>
                                {active && <span style={{ color: t.accent }}>✓</span>}
                              </button>
                              {isCustom && <button onClick={() => removeCustomTheme(key)} style={{ background: t.upBg, border: `1px solid ${t.up}33`, color: t.up, borderRadius: 8, padding: "7px 9px", cursor: "pointer", fontSize: fs - 3, flexShrink: 0 }}>✕</button>}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 3 — FONTE */}
            <div style={acCard}>
              <AccordionHeader skey="font" icon="🔤" title="Tamanho da fonte" subtitle={`${fs}px · Toque para ajustar`} />
              {isOpen("font") && (
                <div style={body}>
                  <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
                    <button onClick={() => setSettings((s) => ({ ...s, fontSize: Math.max(11, (s.fontSize || 15) - 1) }))}
                      style={{ background: t.bg3, border: `1px solid ${t.border}`, color: t.text, width: 38, height: 38, borderRadius: 8, cursor: "pointer", fontSize: 20, fontFamily: "inherit", flexShrink: 0 }}>-</button>
                    <div style={{ flex: 1, textAlign: "center" }}>
                      <div style={{ fontSize: fs + 4, color: t.accent, fontWeight: "bold" }}>{fs}px</div>
                      <div style={{ fontSize: fs, color: t.text3, marginTop: 4 }}>Texto de exemplo</div>
                    </div>
                    <button onClick={() => setSettings((s) => ({ ...s, fontSize: Math.min(22, (s.fontSize || 15) + 1) }))}
                      style={{ background: t.bg3, border: `1px solid ${t.border}`, color: t.text, width: 38, height: 38, borderRadius: 8, cursor: "pointer", fontSize: 20, fontFamily: "inherit", flexShrink: 0 }}>+</button>
                  </div>
                  <input type="range" min={11} max={22} value={fs}
                    onChange={(e) => setSettings((s) => ({ ...s, fontSize: Number(e.target.value) }))}
                    style={{ width: "100%", accentColor: t.accent }} />
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: fs - 5, color: t.text4, marginTop: 4 }}>
                    <span>Menor (11)</span><span>Maior (22)</span>
                  </div>
                </div>
              )}
            </div>

            {/* 4 — DADOS */}
            <div style={acCard}>
              <AccordionHeader skey="data" icon="💾" title="Dados" subtitle="Exportar, importar ou apagar" />
              {isOpen("data") && (
                <div style={body}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    <button onClick={exportData} style={primaryBtn}>💾 SALVAR BACKUP AGORA</button>
                    <button
                      onClick={() => setBackupManager({ backups: getBackupIndex() })}
                      style={{ padding: "12px", background: t.bg3, color: t.text2, border: `1px solid ${t.border}`, borderRadius: 10, fontSize: fs - 1, fontFamily: "inherit", fontWeight: "bold", letterSpacing: 1, cursor: "pointer" }}>
                      📂 VER E RESTAURAR BACKUPS
                    </button>
                    <div style={{ fontSize: fs - 3, color: t.text3, lineHeight: 1.6 }}>
                      Backups ficam salvos no armazenamento interno do app.
                    </div>

                    <div style={{ height: 1, background: t.border, margin: "4px 0" }} />

                    <button
                      onClick={() => setConfirmModal({
                        title: "⚠️ Apagar tudo?",
                        message: "Isso apagará TODAS as listas e o histórico de preços permanentemente. Esta ação não pode ser desfeita.",
                        onConfirm: () => { setData({ lists: [], priceHistory: {} }); showToast("Todos os dados apagados."); },
                      })}
                      style={{ padding: "11px", background: t.upBg, color: t.up, border: `1px solid ${t.up}33`, borderRadius: 10, fontSize: fs - 2, fontFamily: "inherit", cursor: "pointer", width: "100%" }}
                    >
                      🗑 Apagar todos os dados
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        );
      })()}

      {/* ── ABOUT VIEW ── */}
      {view === "about" && (
        <div style={{ flex: 1, overflowY: "auto", padding: "20px 16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
            <button
              onClick={() => setView("home")}
              style={{ background: "none", border: "none", color: t.accent, fontSize: fs, cursor: "pointer", padding: "4px 6px", fontFamily: "inherit" }}
            >← Voltar</button>
          </div>

          {/* App icon + name */}
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{ fontSize: 56, marginBottom: 10 }}>🛒</div>
            <div style={{ fontSize: fs + 8, fontWeight: "bold", color: t.accent }}>Lista de Compras</div>
            <div style={{ fontSize: fs - 2, color: t.text3, marginTop: 6 }}>Versão 1.0</div>
          </div>

          {/* Info cards */}
          {[
            { icon: "👨‍💻", label: "Desenvolvedor", value: "William Santos" },
            { icon: "✉️", label: "Contato", value: "thespation@gmail.com" },
            { icon: "📦", label: "Versão", value: "1.0" },
          ].map(({ icon, label, value }) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", background: t.bg2, border: `1px solid ${t.border}`, borderRadius: 12, marginBottom: 10 }}>
              <span style={{ fontSize: fs + 4 }}>{icon}</span>
              <div>
                <div style={{ fontSize: fs - 3, color: t.text3 }}>{label}</div>
                <div style={{ fontSize: fs, color: t.text, fontWeight: "bold", marginTop: 2 }}>{value}</div>
              </div>
            </div>
          ))}

          <div style={{ marginTop: 24, padding: "14px 16px", background: t.accentBg, border: `1px solid ${t.accentBorder}`, borderRadius: 12, fontSize: fs - 3, color: t.text3, lineHeight: 1.7, textAlign: "center" }}>
            App desenvolvido para uso pessoal.<br/>
            Seus dados ficam salvos localmente no celular.
          </div>
        </div>
      )}

      {/* -- BACKUP MANAGER MODAL -- */}
      {backupManager && (
        <div style={{ position: "fixed", inset: 0, zIndex: 800, display: "flex", flexDirection: "column" }}>
          <div onClick={() => setBackupManager(null)} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }} />
          <div style={{ position: "relative", zIndex: 1, marginTop: "auto", width: "100%", maxWidth: 430, marginLeft: "auto", marginRight: "auto", background: t.bg2, borderRadius: "20px 20px 0 0", maxHeight: "80vh", display: "flex", flexDirection: "column", border: `1px solid ${t.border}`, boxShadow: "0 -8px 40px rgba(0,0,0,0.6)" }}>
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 20px 12px" }}>
              <div>
                <div style={{ fontSize: fs + 1, fontWeight: "bold" }}>📂 Backups salvos</div>
                <div style={{ fontSize: fs - 3, color: t.text3, marginTop: 2 }}>{backupManager.backups.length} backup{backupManager.backups.length !== 1 ? "s" : ""} encontrado{backupManager.backups.length !== 1 ? "s" : ""}</div>
              </div>
              <button onClick={() => setBackupManager(null)} style={{ background: t.bg3, border: "none", color: t.text2, width: 32, height: 32, borderRadius: 8, cursor: "pointer", fontSize: 16 }}>✕</button>
            </div>
            {/* List */}
            <div style={{ overflowY: "auto", flex: 1, padding: "0 20px 20px" }}>
              {backupManager.backups.length === 0 ? (
                <div style={{ textAlign: "center", padding: "40px 0", color: t.text4 }}>
                  <div style={{ fontSize: 32 }}>🗄️</div>
                  <div style={{ marginTop: 10, fontSize: fs - 1 }}>Nenhum backup ainda</div>
                  <div style={{ marginTop: 6, fontSize: fs - 3, color: t.text3 }}>Toque em "Salvar backup agora" para criar um.</div>
                </div>
              ) : backupManager.backups.map((backup) => (
                <div key={backup.key} style={{ background: t.bg3, border: `1px solid ${t.border}`, borderRadius: 12, padding: "12px 14px", marginBottom: 10 }}>
                  <div style={{ fontSize: fs - 1, fontWeight: "bold", marginBottom: 4 }}>{backup.name}</div>
                  <div style={{ fontSize: fs - 3, color: t.text3, marginBottom: 10 }}>
                    {backup.lists} lista{backup.lists !== 1 ? "s" : ""} · {(backup.size / 1024).toFixed(1)} KB
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      onClick={() => restoreBackup(backup)}
                      style={{ flex: 1, padding: "9px", background: t.accentBg, color: t.accent, border: `1px solid ${t.accentBorder}`, borderRadius: 8, fontSize: fs - 2, fontFamily: "inherit", fontWeight: "bold", cursor: "pointer" }}>
                      ↩ Restaurar
                    </button>
                    <button
                      onClick={() => setConfirmModal({
                        title: "🗑 Excluir backup?",
                        message: `Excluir "${backup.name}"? Esta ação não pode ser desfeita.`,
                        onConfirm: () => deleteBackup(backup.key),
                      })}
                      style={{ padding: "9px 14px", background: t.upBg, color: t.up, border: `1px solid ${t.up}33`, borderRadius: 8, fontSize: fs - 2, fontFamily: "inherit", cursor: "pointer" }}>
                      🗑
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* -- CONFIRM MODAL (replaces window.confirm for Android WebView) -- */}
      {confirmModal && (
        <div style={{ position: "fixed", inset: 0, zIndex: 800, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 24px" }}>
          <div onClick={() => setConfirmModal(null)} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }} />
          <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 380, background: t.bg2, borderRadius: 18, padding: 24, border: `1px solid ${t.border}`, boxShadow: "0 8px 40px rgba(0,0,0,0.6)" }}>
            <div style={{ fontSize: fs + 2, fontWeight: "bold", marginBottom: 12, color: t.up }}>{confirmModal.title}</div>
            <div style={{ fontSize: fs - 1, color: t.text2, lineHeight: 1.6, marginBottom: 24 }}>{confirmModal.message}</div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setConfirmModal(null)} style={{ flex: 1, padding: "12px", background: t.bg3, color: t.text, border: `1px solid ${t.border}`, borderRadius: 10, fontSize: fs - 1, fontFamily: "inherit", cursor: "pointer" }}>
                Cancelar
              </button>
              <button onClick={() => { confirmModal.onConfirm(); setConfirmModal(null); }} style={{ flex: 1, padding: "12px", background: t.upBg, color: t.up, border: `1px solid ${t.up}44`, borderRadius: 10, fontSize: fs - 1, fontFamily: "inherit", fontWeight: "bold", cursor: "pointer" }}>
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* -- IMPORT CONFIRM MODAL -- */}
      {importConfirm && (
        <div style={{ position: "fixed", inset: 0, zIndex: 800, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 24px" }}>
          <div onClick={() => setImportConfirm(null)} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }} />
          <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 380, background: t.bg2, borderRadius: 18, padding: 24, border: `1px solid ${t.border}`, boxShadow: "0 8px 40px rgba(0,0,0,0.6)" }}>
            <div style={{ fontSize: fs + 2, fontWeight: "bold", marginBottom: 12 }}>📂 Restaurar backup?</div>
            <div style={{ fontSize: fs - 2, color: t.text3, marginBottom: 8 }}>Arquivo: {importConfirm.filename}</div>
            <div style={{ fontSize: fs - 1, color: t.text2, lineHeight: 1.6, marginBottom: 8 }}>
              Serão importadas <strong style={{ color: t.accent }}>{importConfirm.parsed.lists.length} listas</strong>.
            </div>
            <div style={{ fontSize: fs - 2, padding: "10px 12px", background: t.upBg, color: t.up, borderRadius: 8, marginBottom: 24, lineHeight: 1.5 }}>
              ⚠️ Atenção: os dados atuais serão substituídos. Esta ação não pode ser desfeita.
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setImportConfirm(null)} style={{ flex: 1, padding: "12px", background: t.bg3, color: t.text, border: `1px solid ${t.border}`, borderRadius: 10, fontSize: fs - 1, fontFamily: "inherit", cursor: "pointer" }}>
                Cancelar
              </button>
              <button onClick={confirmImport} style={{ flex: 1, padding: "12px", background: t.accent, color: t.accentText, border: "none", borderRadius: 10, fontSize: fs - 1, fontFamily: "inherit", fontWeight: "bold", cursor: "pointer" }}>
                Restaurar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* -- EDIT ITEM MODAL -- */}
      {editingItem && (
        <div style={{ position: "fixed", inset: 0, zIndex: 700, display: "flex", alignItems: "flex-end" }}>
          <div onClick={() => setEditingItem(null)} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.65)", backdropFilter: "blur(4px)" }} />
          <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 430, margin: "0 auto", background: t.bg2, borderRadius: "20px 20px 0 0", padding: "22px 22px 40px", border: `1px solid ${t.border}`, boxShadow: "0 -8px 40px rgba(0,0,0,0.5)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
              <h3 style={{ margin: 0, fontWeight: "normal", fontSize: fs + 4 }}>Editar Item</h3>
              <button onClick={() => setEditingItem(null)} style={{ background: t.bg3, border: "none", color: t.text2, width: 32, height: 32, borderRadius: 8, cursor: "pointer", fontSize: fs + 1 }}>✕</button>
            </div>
            <div style={{ marginBottom: 12 }}>
              <label style={{ fontSize: fs - 4, letterSpacing: 2, color: t.text3 }}>PRODUTO</label>
              <input value={editingItem.name} onChange={(e) => setEditingItem((i) => ({ ...i, name: e.target.value }))} style={inp} autoFocus />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
              <div>
                <label style={{ fontSize: fs - 4, letterSpacing: 2, color: t.text3 }}>QUANTIDADE</label>
                <input
                  type="number"
                  value={editingItem.qty}
                  onChange={(e) => setEditingItem((i) => ({ ...i, qty: String(Math.max(1, Math.round(parseFloat(e.target.value) || 1))) }))}
                  style={inp}
                  min="1"
                  step="1"
                />
              </div>
              <div>
                <label style={{ fontSize: fs - 4, letterSpacing: 2, color: t.text3 }}>VALOR UNIT.</label>
                <div style={{ position: "relative" }}>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={editingItem.price}
                    onChange={(e) => setEditingItem((i) => ({ ...i, price: maskCurrency(e.target.value) }))}
                    style={{ ...inp, paddingRight: 30 }}
                    placeholder="0,00"
                  />
                  {(() => {
                    const hint = getPriceHint(editingItem.name, unmaskCurrency(editingItem.price));
                    if (!hint) return null;
                    return (
                      <div style={{
                        position: "absolute", top: "50%", right: 8, transform: "translateY(-50%)",
                        fontSize: fs - 4, fontWeight: "bold", lineHeight: 1,
                        color: hint.arrow === "down" ? t.down : t.up,
                        display: "flex", flexDirection: "column", alignItems: "center", gap: 1,
                        pointerEvents: "none",
                      }}>
                        <span>{hint.arrow === "down" ? "▼" : "▲"}</span>
                        <span style={{ fontSize: fs - 7 }}>{hint.pct.toFixed(0)}%</span>
                      </div>
                    );
                  })()}
                </div>
              </div>
            </div>
            {/* Price hint explanation when visible */}
            {(() => {
              const hint = getPriceHint(editingItem.name, unmaskCurrency(editingItem.price));
              if (!hint) return null;
              return (
                <div style={{ marginBottom: 12, fontSize: fs - 4, color: hint.arrow === "down" ? t.down : t.up, display: "flex", alignItems: "center", gap: 6, padding: "6px 10px", background: hint.arrow === "down" ? t.downBg : t.upBg, borderRadius: 8 }}>
                  <span style={{ fontSize: fs - 2 }}>{hint.arrow === "down" ? "▼" : "▲"}</span>
                  <span>
                    {hint.arrow === "down" ? "Mais barato" : "Mais caro"} que a última compra ({fmt(hint.lastPrice)}) — {hint.pct.toFixed(1)}%
                  </span>
                </div>
              );
            })()}
            {editingItem.price && editingItem.qty && (
              <div style={{ background: t.bg3, borderRadius: 10, padding: "10px 14px", marginBottom: 14, display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: t.text3, fontSize: fs - 2 }}>Subtotal</span>
                <span style={{ color: t.accent, fontWeight: "bold" }}>
                  {fmt(unmaskCurrency(editingItem.price || "0") * (parseInt(editingItem.qty, 10) || 1))}
                </span>
              </div>
            )}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <button
                onClick={() => { removeItem(editingItem.id); setEditingItem(null); showToast("Item removido"); }}
                style={{ padding: "12px", background: t.upBg, color: t.up, border: `1px solid ${t.up}33`, borderRadius: 10, fontSize: fs - 1, cursor: "pointer", fontFamily: "inherit", fontWeight: "bold" }}
              >
                🗑 REMOVER
              </button>
              <button onClick={saveEditItem} style={primaryBtn}>✓ SALVAR</button>
            </div>
          </div>
        </div>
      )}

      {/* -- EDIT LIST HEADER MODAL -- */}
      {editingListHeader && currentList && (
        <div style={{ position: "fixed", inset: 0, zIndex: 800, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 24px" }}>
          <div onClick={() => setEditingListHeader(false)} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }} />
          <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 380, background: t.bg2, borderRadius: 18, padding: 24, border: `1px solid ${t.border}`, boxShadow: "0 8px 40px rgba(0,0,0,0.6)" }}>
            <div style={{ fontSize: fs + 2, fontWeight: "bold", marginBottom: 18 }}>✏️ Editar lista</div>

            <div style={{ fontSize: fs - 3, color: t.text3, marginBottom: 5 }}>Nome da lista</div>
            <input
              value={editListName}
              onChange={(e) => setEditListName(e.target.value)}
              autoFocus
              style={{ ...inp, marginBottom: 16 }}
            />

            <div style={{ fontSize: fs - 3, color: t.text3, marginBottom: 8 }}>Mercado</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 20 }}>
              {markets.map((m) => (
                <div
                  key={m}
                  onClick={() => setEditListMarket(m)}
                  style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", background: editListMarket === m ? t.accentBg : t.bg3, border: `1px solid ${editListMarket === m ? t.accent : t.border}`, borderRadius: 10, cursor: "pointer" }}
                >
                  <div style={{ width: 16, height: 16, borderRadius: "50%", border: `2px solid ${editListMarket === m ? t.accent : t.text4}`, background: editListMarket === m ? t.accent : "transparent", flexShrink: 0 }} />
                  <span style={{ fontSize: fs - 1, color: editListMarket === m ? t.accent : t.text, fontWeight: editListMarket === m ? "bold" : "normal" }}>{m}</span>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setEditingListHeader(false)} style={{ flex: 1, padding: "12px", background: t.bg3, color: t.text2, border: `1px solid ${t.border}`, borderRadius: 10, fontSize: fs - 1, fontFamily: "inherit", cursor: "pointer" }}>
                Cancelar
              </button>
              <button
                onClick={() => {
                  if (!editListName.trim()) return;
                  updateList(currentList.id, (l) => ({ ...l, name: editListName.trim(), market: editListMarket }));
                  setEditingListHeader(false);
                  showToast("Lista atualizada!");
                }}
                style={{ ...primaryBtn, flex: 1 }}
              >
                ✓ Salvar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* -- DUPLICATE MODAL -- */}
      {duplicateSource && (
        <div style={{ position: "fixed", inset: 0, zIndex: 700, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
          <div onClick={() => setDuplicateSource(null)} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.65)", backdropFilter: "blur(4px)" }} />
          <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 380, background: t.bg2, borderRadius: 16, padding: 24, border: `1px solid ${t.border}`, boxShadow: `0 8px 40px rgba(0,0,0,0.5)` }}>
            <h3 style={{ margin: "0 0 6px", fontWeight: "normal", fontSize: fs + 3 }}>Duplicar Lista</h3>
            <p style={{ margin: "0 0 16px", fontSize: fs - 2, color: t.text3 }}>"{duplicateSource.name}"</p>

            {/* Market selector */}
            <div style={{ fontSize: fs - 3, color: t.text3, marginBottom: 6 }}>Mercado</div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
              {markets.map((m) => (
                <button key={m} onClick={() => setDuplicateMarket(m)}
                  style={{ padding: "6px 12px", fontSize: fs - 3, fontFamily: "inherit", borderRadius: 8, cursor: "pointer", background: duplicateMarket === m ? t.accentBg : t.bg3, border: `1px solid ${duplicateMarket === m ? t.accent : t.border}`, color: duplicateMarket === m ? t.accent : t.text2, fontWeight: duplicateMarket === m ? "bold" : "normal" }}
                >{m}</button>
              ))}
            </div>

            {/* Zero values toggle */}
            <div
              onClick={() => setDuplicateZero((v) => !v)}
              style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: 14, background: t.bg3, borderRadius: 10, cursor: "pointer", marginBottom: 20, border: `1px solid ${duplicateZero ? t.accent : t.border}` }}
            >
              <div style={{ width: 20, height: 20, borderRadius: 5, border: `2px solid ${duplicateZero ? t.accent : t.bg4}`, background: duplicateZero ? t.accent : "transparent", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: t.accentText, flexShrink: 0, marginTop: 1 }}>
                {duplicateZero ? "✓" : ""}
              </div>
              <div>
                <div style={{ fontSize: fs - 1, color: duplicateZero ? t.accent : t.text, fontWeight: duplicateZero ? "bold" : "normal" }}>
                  Zerar todos os valores
                </div>
                <div style={{ fontSize: fs - 4, color: t.text3, marginTop: 3, lineHeight: 1.5 }}>
                  Itens copiados com preço R$0,00 para preencher na hora das compras
                </div>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <button
                onClick={() => setDuplicateSource(null)}
                style={{ padding: "12px", background: t.bg3, color: t.text2, border: `1px solid ${t.border}`, borderRadius: 10, fontSize: fs - 1, cursor: "pointer", fontFamily: "inherit" }}
              >
                Cancelar
              </button>
              <button onClick={doDuplicate} style={primaryBtn}>⧉ DUPLICAR</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
