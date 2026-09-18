import React, { useState } from 'react';
import { Alert, SafeAreaView, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import { Colors, FontSize, Radius, Spacing } from '../../src/constants/theme';
import { useAuth } from '../../src/context/AuthContext';

export default function ProfileScreen() {
  const [notifs, setNotifs] = useState(true);
  const { user, signOut, resendVerification, deleteAccount } = useAuth();
  const initials = (user?.name || 'VoltWay Driver').split(' ').map(p => p[0]).join('').slice(0, 2).toUpperCase();

  const handleSignOut = () => {
    Alert.alert('Sign out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Sign Out', style: 'destructive', onPress: async () => { await signOut(); router.replace('/auth/sign-in'); } },
    ]);
  };

  const handleDeleteAccount = () => {
    Alert.alert('Delete account permanently?', 'This action cannot be undone. You may need to sign in again before Firebase permits deletion.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: async () => {
        try {
          await deleteAccount();
          router.replace('/auth/sign-in');
        } catch (error: any) {
          Alert.alert('Unable to delete account', error.message);
        }
      } },
    ]);
  };

  const handleVerification = async () => {
    try {
      await resendVerification();
      Alert.alert('Verification sent', 'Check your email inbox and spam folder.');
    } catch (error: any) {
      Alert.alert('Unable to send verification', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={styles.hero}>
          <View style={styles.avatar}><Text style={styles.avatarText}>{initials}</Text></View>
          <View style={styles.badge}><Text style={styles.badgeText}>⭐ NCR EV Driver</Text></View>
          <Text style={styles.name}>{user?.name || 'VoltWay Driver'}</Text>
          <Text style={styles.sub}>{user?.email || 'Signed in'} · {user?.city || 'Delhi NCR'}</Text>
        </View>

        <View style={styles.statsRow}>
          {[{ v: '47', l: 'Sessions' }, { v: '12', l: 'Reports' }, { v: 'NCR', l: 'Coverage' }].map(({ v, l }) => (
            <View key={l} style={styles.statCard}>
              <Text style={styles.statVal}>{v}</Text>
              <Text style={styles.statLbl}>{l}</Text>
            </View>
          ))}
        </View>

        <View style={styles.vehicleCard}>
          <Text style={{ fontSize: 22 }}>🚗</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.vehicleName}>Tata Nexon EV Max · 2023</Text>
            <Text style={styles.vehicleSub}>Preferred network: Tata Power / Statiq</Text>
            <View style={styles.battBarBg}><View style={[styles.battBarFill, { width: '72%' }]} /></View>
            <Text style={{ color: Colors.volt, fontSize: FontSize.sm, marginTop: 4 }}>72% battery</Text>
          </View>
        </View>

        {[
          { title: 'Charging', items: [{ e: '🔋', t: 'Charging History', s: '47 sessions' }, { e: '❤️', t: 'Saved Stations', s: '8 saved' }, { e: '🗺️', t: 'Planned Routes', s: 'Delhi NCR routes' }] },
          { title: 'Community', items: [{ e: '⭐', t: 'My Reviews', s: '12 submitted' }, { e: '🏆', t: 'Leaderboard', s: '#14 in NCR' }, { e: '👥', t: 'Invite Friends', s: 'Earn VoltPoints' }] },
        ].map(({ title, items }) => (
          <View key={title}>
            <Text style={styles.sectionTitle}>{title}</Text>
            {items.map(({ e, t, s }) => (
              <TouchableOpacity key={t} style={styles.menuItem}>
                <View style={styles.menuIcon}><Text style={{ fontSize: 16 }}>{e}</Text></View>
                <View style={{ flex: 1 }}><Text style={styles.menuTitle}>{t}</Text><Text style={styles.menuSub}>{s}</Text></View>
                <Text style={styles.arrow}>›</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}

        <Text style={styles.sectionTitle}>Settings</Text>
        <View style={[styles.menuItem, { justifyContent: 'space-between' }]}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: Spacing.md, flex: 1 }}>
            <View style={styles.menuIcon}><Text style={{ fontSize: 16 }}>🔔</Text></View>
            <View><Text style={styles.menuTitle}>Notifications</Text><Text style={styles.menuSub}>Charger alerts</Text></View>
          </View>
          <Switch value={notifs} onValueChange={setNotifs} trackColor={{ false: Colors.bg4, true: Colors.voltDark }} thumbColor={Colors.volt} />
        </View>

        <Text style={styles.sectionTitle}>Account & Legal</Text>
        {!user?.emailVerified && <TouchableOpacity style={styles.menuItem} onPress={handleVerification}><View style={styles.menuIcon}><Text>✉️</Text></View><View style={{flex:1}}><Text style={styles.menuTitle}>Verify Email</Text><Text style={styles.menuSub}>Send verification link</Text></View><Text style={styles.arrow}>›</Text></TouchableOpacity>}
        <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/legal/privacy')}><View style={styles.menuIcon}><Text>🔒</Text></View><View style={{flex:1}}><Text style={styles.menuTitle}>Privacy Policy</Text><Text style={styles.menuSub}>How VoltWay uses data</Text></View><Text style={styles.arrow}>›</Text></TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/legal/terms')}><View style={styles.menuIcon}><Text>📄</Text></View><View style={{flex:1}}><Text style={styles.menuTitle}>Terms of Use</Text><Text style={styles.menuSub}>Service conditions</Text></View><Text style={styles.arrow}>›</Text></TouchableOpacity>
        <TouchableOpacity style={styles.logoutBtn} onPress={handleSignOut}><Text style={styles.logoutText}>Sign Out</Text></TouchableOpacity>
        <TouchableOpacity style={styles.deleteBtn} onPress={handleDeleteAccount}><Text style={styles.deleteText}>Delete Account</Text></TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.bg },
  hero: { alignItems: 'center', padding: Spacing.xxl, borderBottomWidth: 1, borderBottomColor: Colors.border },
  avatar: { width: 72, height: 72, borderRadius: 36, backgroundColor: '#004D40', alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: Colors.borderGlow, marginBottom: Spacing.sm },
  avatarText: { color: Colors.volt, fontSize: 28, fontWeight: '800' },
  badge: { backgroundColor: Colors.voltGlow, borderWidth: 1, borderColor: Colors.borderGlow, borderRadius: Radius.full, paddingHorizontal: Spacing.md, paddingVertical: 3, marginBottom: Spacing.sm },
  badgeText: { color: Colors.volt, fontSize: 11, fontWeight: '600' },
  name: { color: Colors.text, fontSize: FontSize.xl, fontWeight: '800' },
  sub: { color: Colors.text2, fontSize: FontSize.sm, marginTop: 3, textAlign: 'center' },
  statsRow: { flexDirection: 'row', gap: Spacing.sm, padding: Spacing.xl },
  statCard: { flex: 1, backgroundColor: Colors.bg3, borderWidth: 1, borderColor: Colors.border, borderRadius: Radius.md, padding: Spacing.md, alignItems: 'center' },
  statVal: { color: Colors.volt, fontSize: FontSize.xxl, fontWeight: '800' },
  statLbl: { color: Colors.text3, fontSize: 10, marginTop: 2 },
  vehicleCard: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, marginHorizontal: Spacing.xl, marginBottom: Spacing.lg, backgroundColor: Colors.bg3, borderWidth: 1, borderColor: Colors.border, borderRadius: Radius.xl, padding: Spacing.lg },
  vehicleName: { color: Colors.text, fontSize: FontSize.md, fontWeight: '700' },
  vehicleSub: { color: Colors.text3, fontSize: FontSize.sm, marginTop: 2 },
  battBarBg: { height: 6, backgroundColor: Colors.bg4, borderRadius: 3, overflow: 'hidden', marginTop: 8 },
  battBarFill: { height: '100%', backgroundColor: Colors.volt, borderRadius: 3 },
  sectionTitle: { color: Colors.text3, fontSize: 11, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.6, paddingHorizontal: Spacing.xl, marginBottom: Spacing.sm, marginTop: Spacing.lg },
  menuItem: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, marginHorizontal: Spacing.xl, backgroundColor: Colors.bg3, borderWidth: 1, borderColor: Colors.border, borderRadius: Radius.md, padding: Spacing.md, marginBottom: 6 },
  menuIcon: { width: 36, height: 36, borderRadius: 10, backgroundColor: Colors.bg4, alignItems: 'center', justifyContent: 'center' },
  menuTitle: { color: Colors.text, fontSize: FontSize.md, fontWeight: '500' },
  menuSub: { color: Colors.text3, fontSize: FontSize.sm, marginTop: 1 },
  arrow: { color: Colors.text3, fontSize: 20 },
  logoutBtn: { marginHorizontal: Spacing.xl, marginTop: Spacing.xl, backgroundColor: 'rgba(255,77,77,0.08)', borderWidth: 1, borderColor: 'rgba(255,77,77,0.2)', borderRadius: Radius.md, paddingVertical: 14, alignItems: 'center' },
  logoutText: { color: Colors.red, fontSize: FontSize.md, fontWeight: '700' },
  deleteBtn: { marginHorizontal: Spacing.xl, marginTop: Spacing.md, borderRadius: Radius.md, paddingVertical: 14, alignItems: 'center' },
  deleteText: { color: Colors.text3, fontSize: FontSize.sm, fontWeight: '600', textDecorationLine: 'underline' },
});
