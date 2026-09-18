import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, Linking } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Colors, Spacing, Radius, FontSize } from '../../src/constants/theme';

export default function RouteResult() {
  const { origin, destination, battery, stationsJson } = useLocalSearchParams<{origin:string;destination:string;battery:string;stationsJson:string}>();
  const stations = JSON.parse(stationsJson||'[]');

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={()=>router.back()}><Text style={{color:Colors.text,fontSize:18}}>←</Text></TouchableOpacity>
        <View style={{flex:1}}>
          <Text style={styles.title}>Route Ready ⚡</Text>
          <Text style={styles.sub} numberOfLines={1}>{origin?.split(',')[0]} → {destination?.split(',')[0]}</Text>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.summaryRow}>
          {[{e:'📍',l:'Distance',v:'38 km'},{e:'🕐',l:'Est. Time',v:'52 min'},{e:'⚡',l:'Stops',v:String(stations.length)}].map(({e,l,v})=>(
            <View key={l} style={styles.summaryCard}>
              <Text style={{fontSize:18,marginBottom:4}}>{e}</Text>
              <Text style={styles.summaryVal}>{v}</Text>
              <Text style={styles.summaryLbl}>{l}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.sectionTitle}>Battery Journey</Text>
        <View style={styles.card}>
          {[
            {icon:'🚦',label:origin?.split(',')[0]||'Start',pct:parseInt(battery||'72'),color:Colors.green},
            ...stations.map((s:any)=>({icon:'⚡',label:s.name.split(' ').slice(0,2).join(' '),pct:s.batteryOnArrival,color:Colors.amber,charge:s.batteryOnDeparture})),
            {icon:'🏁',label:destination?.split(',')[0]||'Destination',pct:45,color:Colors.green},
          ].map((step:any,i:number,arr)=>(
            <View key={i} style={{flexDirection:'row',gap:Spacing.md}}>
              <View style={{alignItems:'center',width:28}}>
                <Text style={{fontSize:18,marginBottom:4}}>{step.icon}</Text>
                {i<arr.length-1&&<View style={{width:2,flex:1,backgroundColor:Colors.border,marginBottom:4}}/>}
              </View>
              <View style={{flex:1,paddingBottom:Spacing.lg}}>
                <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:6}}>
                  <Text style={{color:Colors.text,fontSize:FontSize.md,fontWeight:'600'}}>{step.label}</Text>
                  <Text style={{color:step.color,fontSize:FontSize.lg,fontWeight:'800'}}>{step.pct}%</Text>
                </View>
                <View style={{height:6,backgroundColor:Colors.bg4,borderRadius:3,overflow:'hidden'}}>
                  <View style={{height:'100%',width:`${step.pct}%`,backgroundColor:step.color,borderRadius:3}}/>
                </View>
                {step.charge&&<View style={{backgroundColor:Colors.voltGlow,borderRadius:Radius.sm,padding:6,marginTop:6,borderWidth:1,borderColor:Colors.borderGlow}}><Text style={{color:Colors.volt,fontSize:11}}>⚡ Charge to {step.charge}% here (~25 min)</Text></View>}
              </View>
            </View>
          ))}
        </View>
        <Text style={styles.sectionTitle}>Charging Stops</Text>
        {stations.map((s:any,i:number)=>(
          <View key={s.id} style={styles.stopCard}>
            <View style={{flexDirection:'row',alignItems:'center',gap:Spacing.md,marginBottom:Spacing.md}}>
              <View style={styles.stopNum}><Text style={{color:Colors.volt,fontWeight:'800',fontSize:12}}>{i+1}</Text></View>
              <View style={{flex:1}}>
                <Text style={{color:Colors.text,fontSize:FontSize.md,fontWeight:'700'}}>{s.name}</Text>
                <Text style={{color:Colors.text3,fontSize:FontSize.sm,marginTop:1}}>{s.address}</Text>
              </View>
              <Text style={{color:Colors.green,fontSize:FontSize.xl,fontWeight:'800'}}>{s.reliabilityScore?.toFixed(1)}</Text>
            </View>
            <View style={{flexDirection:'row',flexWrap:'wrap',gap:6,marginBottom:Spacing.md}}>
              {[`⏱️ 25 min charge`,`🔋 38% → 80%`,`↗️ +0.4 km detour`].map(t=>(
                <View key={t} style={{backgroundColor:Colors.bg4,borderRadius:Radius.sm,paddingHorizontal:Spacing.sm,paddingVertical:4,borderWidth:1,borderColor:Colors.border}}>
                  <Text style={{color:Colors.text2,fontSize:11}}>{t}</Text>
                </View>
              ))}
            </View>
            <TouchableOpacity style={{backgroundColor:Colors.voltGlow,borderWidth:1,borderColor:Colors.borderGlow,borderRadius:Radius.md,paddingVertical:9,alignItems:'center'}} onPress={()=>router.push({pathname:'/station/[id]',params:{id:s.id}})}>
              <Text style={{color:Colors.volt,fontSize:FontSize.sm,fontWeight:'700'}}>View Station →</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <View style={styles.navCta}>
        <TouchableOpacity style={styles.navCtaBtn} onPress={()=>Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination||'')}`)}>
          <Text style={styles.navCtaBtnText}>🗺️  Start Navigation in Maps</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:{flex:1,backgroundColor:Colors.bg},
  header:{flexDirection:'row',alignItems:'center',paddingHorizontal:Spacing.xl,paddingVertical:Spacing.md,gap:Spacing.md},
  backBtn:{width:36,height:36,backgroundColor:Colors.bg3,borderWidth:1,borderColor:Colors.border,borderRadius:Radius.full,alignItems:'center',justifyContent:'center'},
  title:{color:Colors.text,fontSize:FontSize.xl,fontWeight:'800'},
  sub:{color:Colors.text3,fontSize:FontSize.sm},
  scroll:{paddingHorizontal:Spacing.xl,paddingBottom:120},
  summaryRow:{flexDirection:'row',gap:Spacing.sm,marginBottom:Spacing.lg},
  summaryCard:{flex:1,backgroundColor:Colors.bg3,borderWidth:1,borderColor:Colors.border,borderRadius:Radius.md,padding:Spacing.md,alignItems:'center'},
  summaryVal:{color:Colors.text,fontSize:FontSize.lg,fontWeight:'800'},
  summaryLbl:{color:Colors.text3,fontSize:10,marginTop:2},
  sectionTitle:{color:Colors.text3,fontSize:11,fontWeight:'600',textTransform:'uppercase',letterSpacing:0.6,marginBottom:Spacing.md},
  card:{backgroundColor:Colors.bg3,borderRadius:Radius.xl,borderWidth:1,borderColor:Colors.border,padding:Spacing.lg,marginBottom:Spacing.lg},
  stopCard:{backgroundColor:Colors.bg3,borderRadius:Radius.xl,borderWidth:1,borderColor:Colors.border,padding:Spacing.lg,marginBottom:Spacing.md},
  stopNum:{width:28,height:28,borderRadius:14,backgroundColor:Colors.voltGlow,borderWidth:1,borderColor:Colors.borderGlow,alignItems:'center',justifyContent:'center'},
  navCta:{position:'absolute',bottom:0,left:0,right:0,padding:Spacing.xl,paddingBottom:30,backgroundColor:Colors.bg,borderTopWidth:1,borderTopColor:Colors.border},
  navCtaBtn:{backgroundColor:Colors.volt,borderRadius:Radius.md,paddingVertical:16,alignItems:'center'},
  navCtaBtnText:{color:Colors.bg,fontSize:FontSize.lg,fontWeight:'800'},
});
