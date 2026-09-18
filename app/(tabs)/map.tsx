import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker, PROVIDER_DEFAULT, PROVIDER_GOOGLE } from 'react-native-maps';
import { router } from 'expo-router';
import { Colors, FontSize, MapStyle, Radius, Spacing } from '../../src/constants/theme';
import { NCR_CENTER } from '../../src/constants/mockData';
import { getNcrChargingStations } from '../../src/services/chargingStations';
import { Station } from '../../src/types';

export default function MapScreen() {
  const [selected, setSelected] = useState<Station | null>(null);
  const [stations, setStations] = useState<Station[]>([]);
  const [loading, setLoading] = useState(true);
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getNcrChargingStations();
        setStations(data);
      } catch (error) {
        console.log('Station load error', error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const cityCount = new Set(stations.map(s => s.city)).size;

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bg }}>
      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT}
        initialRegion={NCR_CENTER}
        customMapStyle={MapStyle}
        showsUserLocation
        showsMyLocationButton={false}
        onPress={() => setSelected(null)}
      >
        {stations.map(s => {
          const c = s.reliabilityColor === 'green' ? '#00C853' : s.reliabilityColor === 'amber' ? '#E65100' : '#C62828';
          return (
            <Marker key={s.id} coordinate={s.coordinates} onPress={() => setSelected(s)}>
              <View style={[styles.pin, { backgroundColor: c }]}>
                <Text style={styles.pinText}>⚡</Text>
              </View>
            </Marker>
          );
        })}
      </MapView>

      <SafeAreaView style={styles.topOverlay}>
        <View style={styles.topBar}>
          <View>
            <Text style={styles.mapTitle}>⚡ VoltWay NCR</Text>
            <Text style={styles.mapSub}>{stations.length} stations · {cityCount || 6} NCR cities</Text>
          </View>
          <TouchableOpacity style={styles.myLocBtn} onPress={() => mapRef.current?.animateToRegion(NCR_CENTER, 600)}>
            <Text style={{ color: Colors.volt, fontSize: FontSize.sm, fontWeight: '700' }}>📍 NCR</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.legend}>
          {[{ c: '#00C853', l: 'Working' }, { c: '#E65100', l: 'Busy' }, { c: '#C62828', l: 'Fault' }].map(({ c, l }) => (
            <View key={l} style={styles.legendItem}>
              <View style={[styles.dot, { backgroundColor: c }]} />
              <Text style={styles.legendText}>{l}</Text>
            </View>
          ))}
        </View>
      </SafeAreaView>

      {loading && (
        <View style={styles.loadingBox}>
          <ActivityIndicator color={Colors.volt} />
          <Text style={styles.loadingText}>Loading NCR charging network...</Text>
        </View>
      )}

      {selected && (
        <View style={styles.popup}>
          <View style={styles.popupTop}>
            <View style={{ flex: 1 }}>
              <Text style={styles.popupName}>{selected.name}</Text>
              <Text style={styles.popupSub}>{selected.city} · {selected.network}</Text>
              <Text style={styles.popupSub}>{selected.waitText} wait · ₹{selected.pricePerKWh}/kWh</Text>
            </View>
            <Text style={[styles.popupScore, { color: selected.reliabilityColor === 'green' ? Colors.green : selected.reliabilityColor === 'amber' ? Colors.amber : Colors.red }]}>
              {selected.reliabilityScore.toFixed(1)}
            </Text>
          </View>
          <View style={styles.popupStats}>
            <View style={styles.popupStat}><Text style={styles.popupStatText}>⚡ {selected.maxPowerKW} kW</Text></View>
            <View style={styles.popupStat}><Text style={styles.popupStatText}>🔌 {selected.ports.filter(p => p.status === 'available').length}/{selected.ports.length} free</Text></View>
          </View>
          <View style={styles.popupBtns}>
            <TouchableOpacity style={styles.btnSec} onPress={() => setSelected(null)}><Text style={styles.btnSecText}>Close</Text></TouchableOpacity>
            <TouchableOpacity style={styles.btnPrim} onPress={() => router.push({ pathname: '/station/[id]', params: { id: selected.id } })}><Text style={styles.btnPrimText}>View Details →</Text></TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  pin: { width: 38, height: 38, borderRadius: 19, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: 'rgba(255,255,255,0.3)' },
  pinText: { color: '#fff', fontSize: 16, fontWeight: '800' },
  topOverlay: { position: 'absolute', top: 0, left: 0, right: 0 },
  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', margin: Spacing.lg, backgroundColor: 'rgba(10,14,26,0.94)', borderRadius: Radius.md, borderWidth: 1, borderColor: Colors.border, paddingHorizontal: Spacing.lg, paddingVertical: 10 },
  mapTitle: { color: Colors.volt, fontSize: FontSize.lg, fontWeight: '800' },
  mapSub: { color: Colors.text3, fontSize: 11, marginTop: 2 },
  myLocBtn: { backgroundColor: Colors.voltGlow, borderWidth: 1, borderColor: Colors.borderGlow, borderRadius: Radius.full, paddingHorizontal: Spacing.md, paddingVertical: 6 },
  legend: { flexDirection: 'row', gap: 8, marginHorizontal: Spacing.lg },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: 'rgba(10,14,26,0.85)', borderRadius: 20, borderWidth: 1, borderColor: Colors.border, paddingHorizontal: 10, paddingVertical: 4 },
  dot: { width: 7, height: 7, borderRadius: 4 },
  legendText: { color: Colors.text2, fontSize: 11 },
  loadingBox: { position: 'absolute', bottom: 90, left: Spacing.lg, right: Spacing.lg, backgroundColor: 'rgba(17,24,39,0.97)', borderRadius: Radius.lg, padding: Spacing.md, alignItems: 'center', gap: 8 },
  loadingText: { color: Colors.text2, fontSize: FontSize.sm },
  popup: { position: 'absolute', bottom: 80, left: Spacing.lg, right: Spacing.lg, backgroundColor: 'rgba(17,24,39,0.97)', borderWidth: 1, borderColor: Colors.border, borderRadius: Radius.xl, padding: Spacing.lg, gap: Spacing.md },
  popupTop: { flexDirection: 'row', alignItems: 'flex-start', gap: Spacing.md },
  popupName: { color: Colors.text, fontSize: FontSize.lg, fontWeight: '700' },
  popupSub: { color: Colors.text3, fontSize: FontSize.sm, marginTop: 2 },
  popupScore: { fontSize: 26, fontWeight: '800' },
  popupStats: { flexDirection: 'row', gap: 8 },
  popupStat: { backgroundColor: Colors.bg3, borderRadius: Radius.sm, paddingHorizontal: Spacing.md, paddingVertical: 6, borderWidth: 1, borderColor: Colors.border },
  popupStatText: { color: Colors.text2, fontSize: FontSize.sm },
  popupBtns: { flexDirection: 'row', gap: Spacing.md },
  btnSec: { flex: 1, backgroundColor: Colors.bg3, borderWidth: 1, borderColor: Colors.border, borderRadius: Radius.md, paddingVertical: 12, alignItems: 'center' },
  btnSecText: { color: Colors.text2, fontWeight: '600' },
  btnPrim: { flex: 2, backgroundColor: Colors.volt, borderRadius: Radius.md, paddingVertical: 12, alignItems: 'center' },
  btnPrimText: { color: Colors.bg, fontWeight: '800', fontSize: FontSize.md },
});
