# VoltWay Expo SDK 54 Stable

This version is downgraded from SDK 57 to SDK 54 because Play Store Expo Go may not yet accept SDK 57 projects.

Run these commands from this folder:

```bash
rm -rf node_modules package-lock.json
npm install
npx expo install --fix
npx expo start -c
```

If Android map is blank, replace `YOUR_GOOGLE_MAPS_ANDROID_API_KEY` in `app.json` with a real Google Maps Android API key.
