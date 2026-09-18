import { router } from 'expo-router';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Colors, FontSize, Spacing } from '../../src/constants/theme';
export default function TermsScreen(){return <SafeAreaView style={styles.safe}><ScrollView contentContainerStyle={styles.content}>
<TouchableOpacity onPress={()=>router.back()}><Text style={styles.back}>‹ Back</Text></TouchableOpacity><Text style={styles.title}>Terms of Use</Text><Text style={styles.updated}>Template — obtain legal review before release</Text>
<Text style={styles.h}>Station information</Text><Text style={styles.p}>Charging availability, price, power and operating status can change. Confirm critical details with the charging-network operator before travelling.</Text>
<Text style={styles.h}>Safe use</Text><Text style={styles.p}>Do not interact with VoltWay while driving. Follow road laws, signage, station rules and manufacturer guidance.</Text>
<Text style={styles.h}>Accounts</Text><Text style={styles.p}>You are responsible for protecting your login details and for activity performed through your account.</Text>
<Text style={styles.h}>Service availability</Text><Text style={styles.p}>Features may be changed, interrupted or discontinued. VoltWay does not guarantee uninterrupted access or complete station coverage.</Text>
<Text style={styles.h}>Contact</Text><Text style={styles.p}>Replace this section with your business name, support email and jurisdiction before Play Store submission.</Text>
</ScrollView></SafeAreaView>}
const styles=StyleSheet.create({safe:{flex:1,backgroundColor:Colors.bg},content:{padding:Spacing.xl,paddingBottom:50},back:{color:Colors.volt,fontWeight:'700',marginBottom:Spacing.lg},title:{color:Colors.text,fontSize:FontSize.xxxl,fontWeight:'800'},updated:{color:Colors.amber,marginTop:6,marginBottom:Spacing.xl},h:{color:Colors.text,fontSize:FontSize.lg,fontWeight:'700',marginTop:Spacing.lg},p:{color:Colors.text2,lineHeight:22,marginTop:6}});
