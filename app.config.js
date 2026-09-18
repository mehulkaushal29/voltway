module.exports = {
  expo: {
    name: 'VoltWay',
    slug: 'voltway-india',
    version: '1.0.0',
    orientation: 'portrait',
    scheme: 'voltway',
    icon: './assets/icon.png',
    userInterfaceStyle: 'dark',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#0A0E1A',
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: false,
      bundleIdentifier: 'com.mehulkaushal.voltway',
      infoPlist: {
        NSLocationWhenInUseUsageDescription:
          'VoltWay uses your location while the app is open to show nearby EV charging stations.',
      },
    },
    android: {
      package: 'com.mehulkaushal.voltway',
      versionCode: 1,
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#0A0E1A',
      },
      permissions: ['ACCESS_FINE_LOCATION', 'ACCESS_COARSE_LOCATION'],
      config: {
        googleMaps: {
          apiKey: process.env.EXPO_PUBLIC_GOOGLE_MAPS_ANDROID_API_KEY || '',
        },
      },
    },
    plugins: [
      'expo-router',
      [
        'expo-location',
        {
          locationWhenInUsePermission:
            'VoltWay uses your location while the app is open to show nearby EV charging stations.',
        },
      ],
    ],
    extra: {
      eas: {
        projectId: process.env.EAS_PROJECT_ID || 'REPLACE_AFTER_RUNNING_EAS_BUILD_CONFIGURE',
      },
    },
  },
};
