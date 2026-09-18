import { router } from 'expo-router';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Colors, FontSize, Radius, Spacing } from '../../src/constants/theme';

export default function PrivacyScreen() {
  return <SafeAreaView style={styles.safe}><ScrollView contentContainerStyle={styles.content}>
    <TouchableOpacity onPress={() => router.back()}><Text style={styles.back}>‹ Back</Text></TouchableOpacity>
    <Text style={styles.title}>Privacy Policy</Text>
    <Text style={styles.updated}>Template — update before Play Store submission</Text>
    <Text style={styles.h}>Information we use</Text><Text style={styles.p}>VoltWay uses account details such as name and email for authentication. With permission, it uses approximate or precise location while the app is open to show nearby EV charging stations.</Text>
    <Text style={styles.h}>How information is used</Text><Text style={styles.p}>Information is used to provide sign-in, station discovery, route and reporting features, maintain security, and improve app reliability.</Text>
    <Text style={styles.h}>Third-party services</Text><Text style={styles.p}>The app may use Firebase, Google Maps and Open Charge Map. Their handling of information is governed by their respective policies.</Text>
    <Text style={styles.h}>Data deletion</Text><Text style={styles.p}>Users can delete their account from Profile → Delete Account. Some security and legal records may be retained where required by law.</Text>
    <Text style={styles.h}>Contact</Text><Text style={styles.p}>Replace this text with your published support email and privacy-policy web address before release.</Text>
  </ScrollView></SafeAreaView>;
}
const styles=StyleSheet.create({safe:{flex:1,backgroundColor:Colors.bg},content:{padding:Spacing.xl,paddingBottom:50},back:{color:Colors.volt,fontWeight:'700',marginBottom:Spacing.lg},title:{color:Colors.text,fontSize:FontSize.xxxl,fontWeight:'800'},updated:{color:Colors.amber,marginTop:6,marginBottom:Spacing.xl},h:{color:Colors.text,fontSize:FontSize.lg,fontWeight:'700',marginTop:Spacing.lg},p:{color:Colors.text2,lineHeight:22,marginTop:6},});
