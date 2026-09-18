import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, SafeAreaView, RefreshControl } from 'react-native';
import { router } from 'expo-router';
import { Colors, Spacing, Radius, FontSize } from '../../src/constants/theme';
import { StationCard } from '../../src/components/StationCard';
import { MOCK_STATIONS } from '../../src/constants/mockData';
import { Station } from '../../src/types';

const FILTERS = [{id:'all',label:'All Nearby'},{id:'dc',label:'⚡ DC Fast'},{id:'available',label:'🟢 Available'},{id:'top',label:'⭐ Top Rated'}];

export default function HomeScreen() {
  const [filter,setFilter] = useState('all');
  const [search,setSearch] = useState('');
  const [refreshing,setRefreshing] = useState(false);

  const filtered = MOCK_STATIONS.filter(s => {
    const m = s.name.toLowerCase().includes(search.toLowerCase())||s.network.toLowerCase().includes(search.toLowerCase());
    if(!m) return false;
    if(filter==='dc') return s.maxPowerKW>=30;
    if(filter==='available') return s.ports.some(p=>p.status==='available');
    if(filter==='top') return s.reliabilityScore>=8;
    return true;
  });

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.logo}>Volt<Text style={{color:Colors.text}}>Way ⚡</Text></Text>
        <View style={styles.locationPill}><Text style={styles.locationText}>📍 Gurugram, Haryana</Text></View>
      </View>
      <View style={styles.searchWrap}>
        <View style={styles.searchBar}>
          <Text>🔍</Text>
          <TextInput style={styles.searchInput} placeholder="Search stations..." placeholderTextColor={Colors.text3} value={search} onChangeText={setSearch}/>
        </View>
      </View>
      <View style={styles.statsBar}>
        {[{c:Colors.green,n:MOCK_STATIONS.filter(s=>s.reliabilityColor==='green').length,l:'Working'},
          {c:Colors.amber,n:MOCK_STATIONS.filter(s=>s.reliabilityColor==='amber').length,l:'Busy'},
          {c:Colors.red,n:MOCK_STATIONS.filter(s=>s.reliabilityColor==='red').length,l:'Fault'}].map(({c,n,l})=>(
          <View key={l} style={styles.statPill}>
            <Text style={[styles.statNum,{color:c}]}>{n}</Text>
            <Text style={styles.statLbl}>{l}</Text>
          </View>
        ))}
        <TouchableOpacity style={styles.routeBtn} onPress={()=>router.push('/route/planner')}>
          <Text style={styles.routeBtnText}>Plan Route ⚡</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{flexGrow:0}} contentContainerStyle={styles.filterRow}>
        {FILTERS.map(f=>(
          <TouchableOpacity key={f.id} style={[styles.chip,filter===f.id&&styles.chipActive]} onPress={()=>setFilter(f.id)}>
            <Text style={[styles.chipText,filter===f.id&&styles.chipTextActive]}>{f.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Nearby Stations</Text>
        <Text style={styles.countLabel}>{filtered.length} found</Text>
      </View>
      <ScrollView style={{flex:1}} contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={()=>{setRefreshing(true);setTimeout(()=>setRefreshing(false),1000);}} tintColor={Colors.volt}/>}>
        {filtered.map(s=>(
          <StationCard key={s.id} station={s} onPress={()=>router.push({pathname:'/station/[id]',params:{id:s.id}})}/>
        ))}
        {filtered.length===0&&<View style={{alignItems:'center',paddingTop:60}}><Text style={{fontSize:40}}>🔌</Text><Text style={{color:Colors.text2,marginTop:16,fontSize:16}}>No stations match</Text></View>}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:{flex:1,backgroundColor:Colors.bg},
  header:{flexDirection:'row',alignItems:'center',paddingHorizontal:Spacing.xl,paddingTop:Spacing.md,paddingBottom:Spacing.sm,gap:Spacing.md},
  logo:{color:Colors.volt,fontSize:FontSize.xxl,fontWeight:'800'},
  locationPill:{flex:1,backgroundColor:Colors.bg3,borderWidth:1,borderColor:Colors.border,borderRadius:Radius.full,paddingHorizontal:Spacing.md,paddingVertical:7},
  locationText:{color:Colors.text2,fontSize:FontSize.sm},
  searchWrap:{paddingHorizontal:Spacing.xl,paddingBottom:Spacing.md},
  searchBar:{flexDirection:'row',alignItems:'center',gap:Spacing.md,backgroundColor:Colors.bg3,borderWidth:1,borderColor:Colors.border,borderRadius:Radius.md,paddingHorizontal:Spacing.md,paddingVertical:10},
  searchInput:{flex:1,color:Colors.text,fontSize:FontSize.md},
  statsBar:{flexDirection:'row',alignItems:'center',paddingHorizontal:Spacing.xl,gap:Spacing.sm,marginBottom:Spacing.md},
  statPill:{backgroundColor:Colors.bg3,borderWidth:1,borderColor:Colors.border,borderRadius:Radius.md,paddingHorizontal:Spacing.md,paddingVertical:6,alignItems:'center'},
  statNum:{fontSize:FontSize.lg,fontWeight:'800'},
  statLbl:{color:Colors.text3,fontSize:9,textTransform:'uppercase'},
  routeBtn:{flex:1,backgroundColor:Colors.voltGlow,borderWidth:1,borderColor:Colors.borderGlow,borderRadius:Radius.md,paddingVertical:8,alignItems:'center'},
  routeBtnText:{color:Colors.volt,fontSize:FontSize.sm,fontWeight:'700'},
  filterRow:{paddingHorizontal:Spacing.xl,gap:Spacing.sm,paddingBottom:Spacing.md},
  chip:{paddingHorizontal:Spacing.lg,paddingVertical:7,borderRadius:Radius.full,borderWidth:1,borderColor:Colors.border,backgroundColor:Colors.bg3},
  chipActive:{backgroundColor:Colors.volt,borderColor:Colors.volt},
  chipText:{color:Colors.text2,fontSize:FontSize.sm,fontWeight:'500'},
  chipTextActive:{color:Colors.bg,fontWeight:'700'},
  sectionHeader:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingHorizontal:Spacing.xl,marginBottom:Spacing.md},
  sectionTitle:{color:Colors.text,fontSize:FontSize.lg,fontWeight:'700'},
  countLabel:{color:Colors.text3,fontSize:FontSize.sm},
  list:{paddingHorizontal:Spacing.xl,paddingBottom:100},
});
