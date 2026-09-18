import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import { Colors, Spacing, Radius, FontSize } from '../../src/constants/theme';
import { MOCK_STATIONS } from '../../src/constants/mockData';

export default function ReportScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <Text style={styles.title}>Report an Issue 📋</Text>
      <Text style={styles.subtitle}>Help the EV community by reporting charger problems</Text>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionLabel}>Select a station</Text>
        {MOCK_STATIONS.map(s=>{
          const c = s.reliabilityColor==='green'?Colors.green:s.reliabilityColor==='amber'?Colors.amber:Colors.red;
          return (
            <TouchableOpacity key={s.id} style={styles.row} onPress={()=>router.push({pathname:'/report/[stationId]',params:{stationId:s.id,stationName:s.name}})}>
              <View style={[styles.circle,{backgroundColor:c+'22',borderColor:c}]}>
                <Text style={[styles.circleText,{color:c}]}>{s.reliabilityScore.toFixed(1)}</Text>
              </View>
              <View style={{flex:1}}>
                <Text style={styles.stationName}>{s.name}</Text>
                <Text style={styles.stationAddr}>{s.address} · {s.distance} km</Text>
              </View>
              <Text style={styles.arrow}>›</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:{flex:1,backgroundColor:Colors.bg},
  title:{color:Colors.text,fontSize:FontSize.xxl,fontWeight:'800',paddingHorizontal:Spacing.xl,paddingTop:Spacing.xl,paddingBottom:4},
  subtitle:{color:Colors.text2,fontSize:FontSize.md,paddingHorizontal:Spacing.xl,marginBottom:Spacing.lg,lineHeight:22},
  scroll:{paddingHorizontal:Spacing.xl,paddingBottom:100},
  sectionLabel:{color:Colors.text3,fontSize:11,fontWeight:'600',textTransform:'uppercase',letterSpacing:0.6,marginBottom:Spacing.md},
  row:{flexDirection:'row',alignItems:'center',gap:Spacing.md,backgroundColor:Colors.bg3,borderWidth:1,borderColor:Colors.border,borderRadius:Radius.xl,padding:Spacing.lg,marginBottom:Spacing.md},
  circle:{width:44,height:44,borderRadius:22,borderWidth:1.5,alignItems:'center',justifyContent:'center'},
  circleText:{fontSize:FontSize.md,fontWeight:'800'},
  stationName:{color:Colors.text,fontSize:FontSize.md,fontWeight:'600'},
  stationAddr:{color:Colors.text3,fontSize:FontSize.sm,marginTop:2},
  arrow:{color:Colors.text3,fontSize:22},
});
