# VoltWay Play Store setup

## 1. Add your Firebase and API values
Copy `.env.example` to `.env`, then replace every placeholder with the values from Firebase, Open Charge Map and Google Maps.

```bash
cp .env.example .env
```

In Firebase Console enable Authentication -> Sign-in method -> Email/Password.

## 2. Install and test
```bash
npm install
npx expo install --fix
npx expo start -c
```

Test registration, email verification, sign-in, forgot password, sign-out, account deletion, map loading and denied-location permission.

## 3. Create the EAS project
```bash
npm install -g eas-cli
eas login
eas build:configure
```
Replace the placeholder `extra.eas.projectId` in `app.json` if EAS does not update it automatically.

## 4. Build test APK
```bash
eas build --platform android --profile preview
```

## 5. Build Play Store AAB
```bash
eas build --platform android --profile production
```
Upload the `.aab` to Google Play Console Internal testing before production.

## 6. Required before release
- Replace the Privacy Policy and Terms templates with legally reviewed text.
- Publish the privacy policy on a public HTTPS webpage and add that URL in Play Console.
- Replace placeholder support details.
- Complete Data safety, App access, Content rating and Ads declarations.
- Supply reviewer credentials if the app cannot be reviewed without login.
- Confirm the Android package ID before first release; changing it later creates a different app.
- Restrict API keys by package name and signing-certificate SHA-1 where supported.
