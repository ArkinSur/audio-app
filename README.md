# Welcome to your Audio App 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the development server

   ```bash
   npx expo start
   ```

   This will open Expo Developer Tools in your browser and show a QR code.

3. Run the app locally

   - **Web**: Press `w` in the terminal or click "Open in web browser" in Expo Developer Tools
   - **iOS Simulator**: Press `i` in the terminal (requires Xcode on macOS)
   - **Android Emulator**: Press `a` in the terminal (requires Android Studio)
   - **Physical Device**: Install [Expo Go](https://expo.dev/client) and scan the QR code

## Building for Production

### Web

To build the web version for production:

```bash
npx expo export:web
```

This creates a `web-build` directory with optimized static files ready for deployment.

### Android

To build an Android APK or AAB:

1. **Configure app.json** (already done for this project)
2. **Build the app**:
   ```bash
   npx expo build:android
   ```
   
   Or for a specific build type:
   ```bash
   # For APK (easier to install on devices)
   npx expo build:android --type apk
   
   # For AAB (required for Google Play Store)
   npx expo build:android --type aab
   ```

3. **Download the build** from the provided URL when complete

### iOS

To build for iOS:

1. **Configure app.json** (already done for this project)
2. **Build the app**:
   ```bash
   npx expo build:ios
   ```
   
   Or for a specific build type:
   ```bash
   # For simulator
   npx expo build:ios --type simulator
   
   # For device
   npx expo build:ios --type archive
   ```

3. **Download the build** from the provided URL when complete


## Testing

Run the test suite:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests for CI
npm run test:ci
```

