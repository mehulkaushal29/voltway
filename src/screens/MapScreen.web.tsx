import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/theme';

export default function MapScreen() {
  const mapUrl =
    'https://www.google.com/maps?q=EV+charging+stations+Gurugram+Haryana&output=embed';

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Station Map</Text>
        <Text style={styles.subtitle}>
          EV charging stations around Gurugram
        </Text>
      </View>

      <View style={styles.map}>
        {React.createElement('iframe', {
          src: mapUrl,
          title: 'VoltWay charging station map',
          width: '100%',
          height: '100%',
          loading: 'lazy',
          allowFullScreen: true,
          referrerPolicy: 'no-referrer-when-downgrade',
          style: {
            border: 0,
            width: '100%',
            height: '100%',
          },
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
    paddingTop: 20,
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  title: {
    color: Colors.text,
    fontSize: 25,
    fontWeight: '800',
  },
  subtitle: {
    color: Colors.text2,
    fontSize: 14,
    marginTop: 5,
  },
  map: {
    flex: 1,
    overflow: 'hidden',
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
});
