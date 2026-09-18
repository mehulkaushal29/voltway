# VoltWay — final Play Store steps

The Firebase project is connected in `.env` and Email/Password authentication is implemented.

## Still required before a production build

1. Replace `ADD_YOUR_OPEN_CHARGE_MAP_KEY` in `.env` with an Open Charge Map API key.
2. Replace `ADD_YOUR_GOOGLE_MAPS_ANDROID_KEY` with a Google Maps Android SDK key restricted to package `com.mehulkaushal.voltway` and the production signing certificate SHA-1.
3. Run `eas init` and place the generated project ID in `EAS_PROJECT_ID`.
4. In Firebase Authentication, enable Email/Password.
5. Publish the privacy policy and terms at public URLs, then add those URLs to the Play Console listing.
6. Test registration, verification email, sign-in, reset password, sign-out, account deletion, location permission, map loading and offline behaviour.
7. Build with `npm run build:android:production` and upload the resulting `.aab` to Internal testing first.

## Commands

```bash
npm install
npx expo install --fix
npm run typecheck
npx expo start -c

eas login
eas init
npm run build:android:production
```

Do not run `npm audit fix --force`; it can replace Expo-compatible native dependencies with incompatible versions.
