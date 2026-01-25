# 📱 Convert to APK with Capacitor - Step by Step

You now have Node.js 22.22.0! Here's how to convert your Ethiopian Shopping List to APK:

## 🚀 Step 1: Install Capacitor

```bash
npm install @capacitor/core @capacitor/cli @capacitor/android
```

## 🔧 Step 2: Initialize Capacitor

```bash
npx cap init "Ethiopian Shopping List" "com.suleyman.ethiopianshoppinglist"
```

This will create:
- `capacitor.config.ts` - Capacitor configuration
- Link your web app to native platforms

## 📦 Step 3: Build Your React App

```bash
npm run build
```

This creates the `build` folder with your compiled app.

## 📱 Step 4: Add Android Platform

```bash
npx cap add android
```

This creates an `android` folder with the native Android project.

## 🔄 Step 5: Copy Web Assets

```bash
npx cap copy
```

This copies your `build` folder to the Android project.

## 🛠️ Step 6: Open in Android Studio

```bash
npx cap open android
```

This opens Android Studio with your project.

## 📲 Step 7: Build APK in Android Studio

1. **Wait for Gradle sync** to complete
2. **Go to Build menu** → "Build Bundle(s) / APK(s)" → "Build APK(s)"
3. **Wait for build** to complete
4. **Find APK** in `android/app/build/outputs/apk/debug/app-debug.apk`

## ⚙️ Alternative: Build from Command Line

If you have Android SDK installed:

```bash
cd android
./gradlew assembleDebug
```

## 📋 Prerequisites for Android Studio Method

You'll need:
1. **Android Studio** - Download from https://developer.android.com/studio
2. **Java Development Kit (JDK)** - Usually comes with Android Studio
3. **Android SDK** - Installed through Android Studio

## 🎯 Quick Commands Summary

```bash
# 1. Install Capacitor
npm install @capacitor/core @capacitor/cli @capacitor/android

# 2. Initialize
npx cap init "Ethiopian Shopping List" "com.suleyman.ethiopianshoppinglist"

# 3. Build React app
npm run build

# 4. Add Android platform
npx cap add android

# 5. Copy web assets
npx cap copy

# 6. Open in Android Studio
npx cap open android
```

## 🔄 When You Make Changes

After updating your React app:

```bash
npm run build
npx cap copy
```

Then rebuild in Android Studio.

## 📱 Your APK Features

Your APK will have:
- ✅ **Native Android App** - Installable from APK
- ✅ **Offline Support** - Works without internet
- ✅ **Data Persistence** - localStorage works natively
- ✅ **Push Notifications** - Can be added later
- ✅ **App Icon** - Your custom shopping cart icon
- ✅ **Splash Screen** - Professional app loading
- ✅ **Full Screen** - No browser UI

## 🎨 Customization Options

Edit `capacitor.config.ts` for:
- App name and package ID
- Icon and splash screen
- Permissions
- Plugin configurations

## 🔙 Switch Back to Node 20 (If Needed)

```bash
nvm use 20.19.0
```

## 🆘 Troubleshooting

**If Capacitor commands fail:**
- Make sure you're using Node 22: `node --version`
- Clear npm cache: `npm cache clean --force`
- Delete node_modules and reinstall: `rm -rf node_modules && npm install`

**If Android Studio build fails:**
- Update Android SDK
- Accept all licenses in SDK Manager
- Ensure Java 11+ is installed

Your Ethiopian Shopping List is ready to become a native Android app! 🛒📱