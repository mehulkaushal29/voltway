import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth, getReactNativePersistence, initializeAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAHp93pJdEmpw4hV3_cpJAkbfU8aeP6OY4",
  authDomain: "voltway-2aca6.firebaseapp.com",
  databaseURL: "https://voltway-2aca6-default-rtdb.firebaseio.com",
  projectId: "voltway-2aca6",
  storageBucket: "voltway-2aca6.firebasestorage.app",
  messagingSenderId: "678925373618",
  appId: "1:678925373618:web:31a6dda3076e3feb5a39ab",
  measurementId: "G-6CTVVXZKKG"
};

const missing = Object.entries(firebaseConfig)
  .filter(([, value]) => !value)
  .map(([key]) => key);

if (missing.length) {
  console.warn(`Firebase configuration is incomplete: ${missing.join(', ')}`);
}

export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = (() => {
  try {
    return initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  } catch {
    return getAuth(app);
  }
})();
