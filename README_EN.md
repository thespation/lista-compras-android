# 🛒 Shopping List

> **[🇧🇷 Leia em Português](README.md)**

A native Android shopping list app with price history, spending analysis, and multiple color themes. Works **100% offline** — no data ever leaves your device.

---

## 📱 Download & Installation

1. Go to the [Releases](https://github.com/thespation/lista-compras-android/releases) page
2. Download `app-release.apk`
3. On Android: **Settings → Security → Install unknown apps** → enable for your file manager
4. Open the APK and tap **Install**

> **Minimum requirement:** Android 5.1 (API 22)

---

## ✨ Features

### 🛒 Shopping Lists

- **Create lists** with a custom name, automatic date, and selectable store
- **Organized by month** — current month is expanded by default; older months are hidden behind a "View history" button
- **Duplicate a list** — copies all items to a new list, with the option to zero out prices and change the store
- **Global search** — filter lists by name, store, or item
- **Edit name & store** — tap the list header to edit inline
- **Delete list** directly from the main screen

### 📦 List Items

- **Add items** with name, quantity, and price
- **Autocomplete** — suggests item names used in previous lists
- **Automatic price comparison** — while typing the price, shows ▼ cheaper or ▲ more expensive compared to the last purchase
- **Price arrow persists** on the item after adding (does not disappear)
- **Check/uncheck** items as purchased using a checkbox
- **Edit item** — tap ✏️ to fix name, quantity, or price; the price comparison is recalculated on save
- **6 sorting options:**
  - Insertion order
  - Alphabetical (A→Z)
  - Alphabetical + checked items last
  - Insertion + checked items last
  - Checked items first
  - Lowest total price first
- **Price variation filter** — show only items that got cheaper or more expensive
- **Live list total** updated in real time
- **Check all / Uncheck all** in one tap

### 📊 Spending Analysis

- **Monthly spending** — bar chart showing total per month
- **Store comparison** — total and average per establishment
- **Price history per product** — line chart showing the variation of any item over time
- **History table** per product with date, store, and price
- **Recent lists** with a quick summary and direct access
- Navigate between months to compare periods

### ⚙️ Settings

#### Navigation
- Enable/disable swipe gesture to open the side menu
- Menu button position (top-left, top-right, or bottom)

#### Appearance
- **7 color themes**, each with dark and light mode:
  - 🟡 **Dourado** (Golden) — classic and elegant
  - 🔵 **Nórdica** (Nordic) — clean arctic palette (Nord)
  - 🟤 **Gruvbox** — retro and warm
  - 🌸 **Rosé Pine** — soft and floral
  - 🟣 **Catppuccin** — pastel techno
  - ⚫ **Meia-Noite** (Midnight) — OLED, pure black `#000000`
  - 📄 **Papel** (Paper) — ink on paper, pure white `#ffffff`
- Quick toggle between **dark mode** and **light mode**

#### Font
- Font size control (11px to 22px) with slider and +/− buttons
- Live preview

#### Stores
- Add, edit, and remove custom store names
- Used when creating or editing lists

#### Data
- **💾 Save backup now** — saves a snapshot to the app's internal storage with date and time
- **📂 View and restore backups** — lists all saved backups with name, number of lists, and size; allows restoring (with overwrite confirmation) or deleting each backup individually
- **🗑 Delete all data** — confirmation modal before erasing

### ℹ️ About
Accessible via the side menu → "About the app" button:
- App version
- Developer name
- Contact email

---

## 🗂️ Project Structure

```
lista-compras-android/
├── android/                          # Android Studio project
│   ├── app/
│   │   ├── build.gradle              # Module config (AGP 8.3.2, compileSdk 34)
│   │   ├── proguard-rules.pro
│   │   └── src/main/
│   │       ├── AndroidManifest.xml   # Permissions and Activity config
│   │       ├── assets/public/
│   │       │   ├── index.html        # Full app (embedded bundle, ~256KB)
│   │       │   └── bundle.js         # Minified React bundle
│   │       ├── java/com/listacompras/app/
│   │       │   └── MainActivity.java # WebView + back button + dark mode bridge
│   │       └── res/
│   │           ├── mipmap-*/         # Icons for all densities (mdpi→xxxhdpi)
│   │           └── values/
│   │               ├── strings.xml
│   │               └── themes.xml    # Theme.Material.Light.NoActionBar
│   ├── build.gradle                  # Root build (plugins)
│   ├── settings.gradle               # Repositories and modules
│   ├── gradle.properties
│   └── gradle/wrapper/
│       └── gradle-wrapper.properties # Gradle 8.5
├── dist/
│   ├── index.html                    # Same as android/assets/public/
│   └── bundle.js
├── src/
│   ├── App.jsx                       # React source (~2100 lines)
│   ├── main.jsx                      # Entry point
│   └── main-bundle.jsx               # Entry for esbuild
├── capacitor.config.json
├── package.json
├── vite.config.js
├── README.md                         # Portuguese version
└── README_EN.md                      # This file
```

---

## 🔧 Technologies Used

| Technology | Version | Purpose |
|---|---|---|
| **React** | 18.x | User interface |
| **JavaScript (JSX)** | ES2017+ | Application logic |
| **esbuild** | latest | Bundler — compiles and minifies JSX |
| **Android WebView** | — | Native container for the web app |
| **Java** | 17 | MainActivity, back button, dark mode bridge |
| **Gradle** | 8.5 | Android build system |
| **Android Gradle Plugin** | 8.3.2 | Android build plugin |
| **localStorage** | Web API | Data persistence and backups |
| **CSS-in-JS** | — | Styling via inline style objects |

> No external frameworks, no database, no server, no internet.

---

## 🏗️ Architecture

The app is a **Single Page Application (SPA)** built with React and bundled by esbuild into a single ~256KB `index.html` file. This file is loaded by a native Android `WebView`.

### Data flow
```
User interaction → React state → localStorage (automatic persistence)
```

### Java ↔ JavaScript Bridge

`MainActivity.java` injects global variables into JavaScript:

```javascript
window.__androidDarkMode   // boolean — Android system theme
window.__androidBack       // function — back button handler
window.__drawerOpen        // boolean — side menu state
```

### Persistence

All data is stored in the WebView's `localStorage`:

| Key | Content |
|---|---|
| `lista-compras-v2` | Lists, items, and price history |
| `lista-compras-settings` | User preferences |
| `lista-compras-backups` | Backup index |
| `lista-compras-backup-{timestamp}` | Individual backup data |

---

## 📲 How to Build the APK

### Prerequisites
- [Android Studio](https://developer.android.com/studio) (Hedgehog or newer)
- JDK 17 or 21

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/thespation/lista-compras-android.git

# 2. Open Android Studio
# File → Open → select the android/ folder

# 3. Wait for Gradle to sync (first time may take ~5 min)

# 4. Build the APK
# Build → Build Bundle(s) / APK(s) → Build APK(s)

# 5. The APK will be at:
# android/app/build/outputs/apk/debug/app-debug.apk
```

### Rebuild the bundle (if you modify App.jsx)

```bash
# Install esbuild globally
npm install -g esbuild

# Compile JSX
esbuild src/main-bundle.jsx \
  --bundle --minify --jsx=automatic \
  --platform=browser --target=es2017 \
  --outfile=dist/bundle.js

# Copy to Android assets
cp dist/bundle.js android/app/src/main/assets/public/bundle.js

# Rebuild index.html embedding the bundle
# (see build script in the project)
```

---

## 🎮 App Navigation

### Side Menu (Drawer)
Opened via the ☰ button or by swiping from the left edge:
- 🛒 **Lists** — main screen
- 📊 **Analysis** — charts and history
- ⚙️ **Settings** — preferences
- ℹ️ **About** — version and contact

### Back Button (Android)
Cascading behavior:
1. Closes any open modal
2. Closes the side menu if open
3. Inside a list → goes back to the lists screen
4. On the About screen → goes back to Lists
5. On Lists/Analysis/Settings → opens the side menu
6. With side menu open → minimizes the app

---

## 👨‍💻 Developer

**William Santos**
- GitHub: [@thespation](https://github.com/thespation)
- Email: thespation@gmail.com

---

## 📄 License

This project is for personal use. Feel free to use it as a reference or as a base for your own projects.
