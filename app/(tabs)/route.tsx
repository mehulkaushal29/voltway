import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { router } from 'expo-router';
import { Colors, Spacing, Radius, FontSize } from '../../src/constants/theme';
import { MOCK_STATIONS } from '../../src/constants/mockData';

const DESTINATIONS = ['🏢 Connaught Place, Delhi','✈️ IGI Airport, Delhi','🛍️ Select Citywalk, Saket','🏨 Aerocity, New Delhi'];

export default function RouteScreen() {
  const [origin,setOrigin] = useState('DLF Cyber Hub, Gurugram');
  const [dest,setDest] = useState('');
  const [battery,setBattery] = useState(72);
  const [loading,setLoading] = useState(false);

  const plan = () => {
    if(!dest.trim()){Alert.alert('Add Destination','Please enter where you want to go.');return;}
    setLoading(true);
    setTimeout(()=>{
      setLoading(false);
      const stops = MOCK_STATIONS.filter(s=>s.reliabilityColor!=='red').slice(0,2).map(s=>({...s,detourKm:0.4,suggestedChargeMinutes:25,batteryOnArrival:38,batteryOnDeparture:80}));
      router.push({pathname:'/route/result',params:{origin,destination:dest,battery:String(battery),stationsJson:JSON.stringify(stops)}});
    },1200);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <Text style={styles.title}>Plan Route ⚡</Text>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <View style={styles.routeRow}>
            <View style={[styles.routeDot,{backgroundColor:Colors.blue}]}/>
            <View style={{flex:1}}>
              <Text style={styles.routeLabel}>FROM</Text>
              <TextInput style={styles.routeInput} value={origin} onChangeText={setOrigin} placeholderTextColor={Colors.text3}/>
            </View>
          </View>
          <View style={styles.routeLine}/>
          <View style={styles.routeRow}>
            <View style={[styles.routeDot,{backgroundColor:Colors.volt}]}/>
            <View style={{flex:1}}>
              <Text style={styles.routeLabel}>TO</Text>
              <TextInput style={styles.routeInput} placeholder="Enter destination..." placeholderTextColor={Colors.text3} value={dest} onChangeText={setDest}/>
            </View>
          </View>
        </View>
        <Text style={styles.sectionLabel}>Quick Destinations</Text>
        <View style={styles.quickGrid}>
          {DESTINATIONS.map(d=>(
            <TouchableOpacity key={d} style={styles.quickChip} onPress={()=>setDest(d)}>
              <Text style={styles.quickChipText}>{d}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.sectionLabel}>Current Battery</Text>
        <View style={styles.card}>
          <View style={{flexDirection:'row',alignItems:'center',gap:12,marginBottom:12}}>
            <Text style={{fontSize:22}}>🔋</Text>
            <Text style={[styles.battPct,{color:battery>50?Colors.volt:battery>20?Colors.amber:Colors.red}]}>{battery}%</Text>
            <Text style={{color:Colors.text2,fontSize:FontSize.sm}}>≈ {Math.round(battery/100*437)} km range</Text>
          </View>
          <View style={styles.battBarBg}>
            <View style={[styles.battBarFill,{width:`${battery}%`,backgroundColor:battery>50?Colors.volt:battery>20?Colors.amber:Colors.red}]}/>
          </View>
          <View style={{flexDirection:'row',gap:6,flexWrap:'wrap',marginTop:12}}>
            {[20,40,60,72,90,100].map(v=>(
              <TouchableOpacity key={v} style={[styles.battBtn,battery===v&&styles.battBtnActive]} onPress={()=>setBattery(v)}>
                <Text style={[styles.battBtnText,battery===v&&{color:Colors.bg,fontWeight:'700'}]}>{v}%</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <TouchableOpacity style={[styles.planBtn,loading&&{opacity:0.7}]} onPress={plan} disabled={loading}>
          <Text style={styles.planBtnText}>{loading?'⏳ Planning...':'⚡ Find Charging Stops'}</Text>
        </TouchableOpacity>
        <View style={styles.note}>
          <Text style={styles.noteText}>💡 Only stations with reliability score above 7.0 are suggested.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:{flex:1,backgroundColor:Colors.bg},
  title:{color:Colors.text,fontSize:FontSize.xxl,fontWeight:'800',paddingHorizontal:Spacing.xl,paddingTop:Spacing.xl,paddingBottom:Spacing.md},
  scroll:{paddingHorizontal:Spacing.xl,paddingBottom:100},
  card:{backgroundColor:Colors.bg3,borderRadius:Radius.xl,borderWidth:1,borderColor:Colors.border,padding:Spacing.lg,marginBottom:Spacing.lg},
  routeRow:{flexDirection:'row',alignItems:'center',gap:Spacing.md},
  routeDot:{width:10,height:10,borderRadius:5},
  routeLine:{width:2,height:20,backgroundColor:Colors.border,marginLeft:4,marginVertical:4},
  routeLabel:{color:Colors.text3,fontSize:9,fontWeight:'600',textTransform:'uppercase',letterSpacing:0.5,marginBottom:2},
  routeInput:{color:Colors.text,fontSize:FontSize.md,paddingVertical:2},
  sectionLabel:{color:Colors.text3,fontSize:11,fontWeight:'600',textTransform:'uppercase',letterSpacing:0.6,marginBottom:Spacing.sm,marginTop:Spacing.md},
  quickGrid:{flexDirection:'row',flexWrap:'wrap',gap:Spacing.sm,marginBottom:Spacing.sm},
  quickChip:{backgroundColor:Colors.bg3,borderWidth:1,borderColor:Colors.border,borderRadius:Radius.full,paddingHorizontal:Spacing.md,paddingVertical:7},
  quickChipText:{color:Colors.text2,fontSize:FontSize.sm},
  battPct:{fontSize:FontSize.xxl,fontWeight:'800'},
  battBarBg:{height:8,backgroundColor:Colors.bg4,borderRadius:4,overflow:'hidden'},
  battBarFill:{height:'100%',borderRadius:4},
  battBtn:{paddingHorizontal:Spacing.md,paddingVertical:5,borderRadius:Radius.full,borderWidth:1,borderColor:Colors.border,backgroundColor:Colors.bg4},
  battBtnActive:{backgroundColor:Colors.volt,borderColor:Colors.volt},
  battBtnText:{color:Colors.text2,fontSize:FontSize.sm},
  planBtn:{backgroundColor:Colors.volt,borderRadius:Radius.md,paddingVertical:16,alignItems:'center',marginTop:Spacing.xl},
  planBtnText:{color:Colors.bg,fontSize:FontSize.lg,fontWeight:'800'},
  note:{backgroundColor:Colors.voltGlow,borderWidth:1,borderColor:Colors.borderGlow,borderRadius:Radius.md,padding:Spacing.lg,marginTop:Spacing.lg},
  noteText:{color:Colors.text2,fontSize:FontSize.sm,lineHeight:20},
});
