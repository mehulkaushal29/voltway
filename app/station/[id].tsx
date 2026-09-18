import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, Linking } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Colors, Spacing, Radius, FontSize } from '../../src/constants/theme';
import { MOCK_STATIONS } from '../../src/constants/mockData';
import { Station } from '../../src/types';

export default function StationDetail() {
  const { id } = useLocalSearchParams<{id:string}>();
  const [station,setStation] = useState<Station|null>(null);
  const [saved,setSaved] = useState(false);

  useEffect(()=>{setStation(MOCK_STATIONS.find(s=>s.id===id)||null);},[id]);
  if(!station) return <SafeAreaView style={{flex:1,backgroundColor:Colors.bg,alignItems:'center',justifyContent:'center'}}><Text style={{color:Colors.text2}}>Loading...</Text></SafeAreaView>;

  const sc = station.reliabilityColor==='green'?Colors.green:station.reliabilityColor==='amber'?Colors.amber:Colors.red;
  const avail = station.ports.filter(p=>p.status==='available').length;

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={()=>router.back()}><Text style={{color:Colors.text,fontSize:18}}>←</Text></TouchableOpacity>
        <View style={{flex:1}}>
          <Text style={styles.headerTitle} numberOfLines={1}>{station.name}</Text>
          <Text style={styles.headerSub}>{station.network}</Text>
        </View>
        <TouchableOpacity style={styles.iconBtn} onPress={()=>setSaved(!saved)}><Text style={{fontSize:18}}>{saved?'❤️':'🤍'}</Text></TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom:120}}>
        <View style={[styles.heroBand,{borderColor:sc+'33'}]}>
          <View style={{alignItems:'center'}}>
            <Text style={[styles.heroScore,{color:sc}]}>{station.reliabilityScore.toFixed(1)}</Text>
            <Text style={styles.heroScoreLabel}>Reliability</Text>
          </View>
          <View style={{flex:1,flexDirection:'row',justifyContent:'center',gap:Spacing.xl}}>
            <View style={{alignItems:'center'}}><Text style={styles.heroStatVal}>{avail}</Text><Text style={styles.heroStatLabel}>Available</Text></View>
            <View style={{width:1,height:30,backgroundColor:Colors.border}}/>
            <View style={{alignItems:'center'}}><Text style={styles.heroStatVal}>{station.ports.length}</Text><Text style={styles.heroStatLabel}>Total</Text></View>
          </View>
          <View style={[styles.statusBadge,{backgroundColor:sc+'22',borderColor:sc+'55'}]}>
            <View style={[styles.statusDot,{backgroundColor:sc}]}/>
            <Text style={[styles.statusText,{color:sc}]}>{station.isOpen?'Open':'Closed'}</Text>
          </View>
        </View>
        <View style={styles.scoreGrid}>
          {[
            {l:'Wait',v:station.waitText,c:station.waitClass==='low'?Colors.green:station.waitClass==='mid'?Colors.amber:Colors.red},
            {l:'Price',v:`₹${station.pricePerKWh}/kWh`,c:Colors.text},
            {l:'Rating',v:`${station.averageRating.toFixed(1)} ★`,c:Colors.amber},
          ].map(({l,v,c})=>(
            <View key={l} style={styles.scoreCard}><Text style={[styles.scoreVal,{color:c}]}>{v}</Text><Text style={styles.scoreLbl}>{l}</Text></View>
          ))}
        </View>
        <View style={styles.infoCard}>
          {[{e:'📍',t:station.address},{e:'🕐',t:station.operatingHours},{e:'⚡',t:`Max ${station.maxPowerKW}kW · ${station.connectorTypes.join(', ')}`},{e:'🎯',t:station.amenities.join(' · ')||'No amenities'}].map(({e,t})=>(
            <View key={e} style={{flexDirection:'row',gap:Spacing.md,alignItems:'flex-start'}}>
              <Text style={{fontSize:14,width:22}}>{e}</Text>
              <Text style={{color:Colors.text2,fontSize:FontSize.sm,flex:1,lineHeight:20}}>{t}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.sectionTitle}>Charger Ports</Text>
        <View style={styles.section}>
          {station.ports.map((p,i)=>{
            const dc = p.status==='offline'?Colors.red:p.status==='available'?Colors.green:Colors.amber;
            return (
              <View key={p.id} style={[styles.portRow,i<station.ports.length-1&&{borderBottomWidth:1,borderBottomColor:Colors.border}]}>
                <View><Text style={{color:Colors.text,fontSize:FontSize.md,fontWeight:'600'}}>{p.displayName}</Text><Text style={{color:Colors.text2,fontSize:FontSize.sm,marginTop:2}}>{p.powerKW} kW</Text></View>
                <View style={{flexDirection:'row',alignItems:'center',gap:6}}>
                  <View style={[styles.dot2,{backgroundColor:dc}]}/>
                  <Text style={{color:dc,fontSize:FontSize.sm,fontWeight:'500'}}>{p.statusText}</Text>
                </View>
              </View>
            );
          })}
        </View>
        <Text style={styles.sectionTitle}>Reviews</Text>
        {(station.reviews||[]).map(r=>(
          <View key={r.id} style={styles.reviewCard}>
            <View style={{flexDirection:'row',gap:Spacing.md,alignItems:'center',marginBottom:Spacing.sm}}>
              <View style={styles.reviewAvatar}><Text style={{color:Colors.volt,fontSize:12,fontWeight:'700'}}>{r.userInitials}</Text></View>
              <View style={{flex:1}}><Text style={{color:Colors.text,fontSize:FontSize.md,fontWeight:'600'}}>{r.userName}</Text><Text style={{color:Colors.text3,fontSize:FontSize.sm}}>{String(r.createdAt)}</Text></View>
            </View>
            <View style={{flexDirection:'row',gap:2,marginBottom:6}}>{Array.from({length:5}).map((_,i)=><Text key={i} style={{fontSize:12,opacity:i<r.rating?1:0.2}}>⭐</Text>)}</View>
            <Text style={{color:Colors.text2,fontSize:FontSize.sm,lineHeight:20}}>{r.comment}</Text>
            <View style={{flexDirection:'row',flexWrap:'wrap',gap:5,marginTop:6}}>
              {r.tags.map((tag,i)=>(
                <View key={tag} style={{backgroundColor:r.tagTypes[i]==='ok'?Colors.greenBg:Colors.amberBg,borderRadius:Radius.full,paddingHorizontal:8,paddingVertical:3,borderWidth:1,borderColor:r.tagTypes[i]==='ok'?Colors.green+'44':Colors.amber+'44'}}>
                  <Text style={{color:r.tagTypes[i]==='ok'?Colors.green:Colors.amber,fontSize:11,fontWeight:'500'}}>{tag}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={styles.ctaBar}>
        <TouchableOpacity style={styles.ctaSec} onPress={()=>router.push({pathname:'/report/[stationId]',params:{stationId:station.id,stationName:station.name}})}>
          <Text style={styles.ctaSecText}>📋 Report Issue</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.ctaPrim} onPress={()=>Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${station.coordinates.latitude},${station.coordinates.longitude}`)}>
          <Text style={styles.ctaPrimText}>🗺️ Navigate</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:{flex:1,backgroundColor:Colors.bg},
  header:{flexDirection:'row',alignItems:'center',paddingHorizontal:Spacing.xl,paddingVertical:Spacing.md,gap:Spacing.md},
  backBtn:{width:36,height:36,backgroundColor:Colors.bg3,borderWidth:1,borderColor:Colors.border,borderRadius:Radius.full,alignItems:'center',justifyContent:'center'},
  headerTitle:{color:Colors.text,fontSize:FontSize.lg,fontWeight:'700'},
  headerSub:{color:Colors.text3,fontSize:FontSize.sm},
  iconBtn:{width:36,height:36,backgroundColor:Colors.bg3,borderWidth:1,borderColor:Colors.border,borderRadius:Radius.full,alignItems:'center',justifyContent:'center'},
  heroBand:{margin:Spacing.xl,borderRadius:Radius.xl,padding:Spacing.xl,flexDirection:'row',alignItems:'center',gap:Spacing.xl,borderWidth:1,backgroundColor:Colors.bg3},
  heroScore:{fontSize:42,fontWeight:'800',lineHeight:44},
  heroScoreLabel:{color:Colors.text3,fontSize:10,textTransform:'uppercase',letterSpacing:0.5},
  heroStatVal:{color:Colors.text,fontSize:FontSize.xxl,fontWeight:'700'},
  heroStatLabel:{color:Colors.text3,fontSize:10},
  statusBadge:{flexDirection:'row',alignItems:'center',gap:5,borderWidth:1,borderRadius:Radius.full,paddingHorizontal:Spacing.sm,paddingVertical:4},
  statusDot:{width:7,height:7,borderRadius:4},
  statusText:{fontSize:11,fontWeight:'600'},
  scoreGrid:{flexDirection:'row',gap:Spacing.sm,paddingHorizontal:Spacing.xl,marginBottom:Spacing.lg},
  scoreCard:{flex:1,backgroundColor:Colors.bg3,borderRadius:Radius.md,padding:Spacing.md,borderWidth:1,borderColor:Colors.border},
  scoreVal:{fontSize:FontSize.md,fontWeight:'800',marginBottom:2},
  scoreLbl:{color:Colors.text3,fontSize:10},
  infoCard:{marginHorizontal:Spacing.xl,marginBottom:Spacing.lg,backgroundColor:Colors.bg3,borderRadius:Radius.xl,padding:Spacing.lg,borderWidth:1,borderColor:Colors.border,gap:Spacing.md},
  sectionTitle:{color:Colors.text3,fontSize:11,fontWeight:'600',textTransform:'uppercase',letterSpacing:0.6,paddingHorizontal:Spacing.xl,marginBottom:Spacing.md},
  section:{marginHorizontal:Spacing.xl,marginBottom:Spacing.lg,backgroundColor:Colors.bg3,borderRadius:Radius.xl,borderWidth:1,borderColor:Colors.border,overflow:'hidden'},
  portRow:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',padding:Spacing.lg},
  dot2:{width:8,height:8,borderRadius:4},
  reviewCard:{marginHorizontal:Spacing.xl,marginBottom:Spacing.md,backgroundColor:Colors.bg3,borderRadius:Radius.xl,padding:Spacing.lg,borderWidth:1,borderColor:Colors.border},
  reviewAvatar:{width:32,height:32,borderRadius:16,backgroundColor:Colors.bg4,alignItems:'center',justifyContent:'center',borderWidth:1,borderColor:Colors.border},
  ctaBar:{position:'absolute',bottom:0,left:0,right:0,flexDirection:'row',gap:Spacing.md,padding:Spacing.xl,paddingBottom:30,backgroundColor:Colors.bg,borderTopWidth:1,borderTopColor:Colors.border},
  ctaSec:{flex:1,backgroundColor:Colors.bg3,borderWidth:1,borderColor:Colors.border,borderRadius:Radius.md,paddingVertical:14,alignItems:'center'},
  ctaSecText:{color:Colors.text2,fontSize:FontSize.md,fontWeight:'600'},
  ctaPrim:{flex:2,backgroundColor:Colors.volt,borderRadius:Radius.md,paddingVertical:14,alignItems:'center'},
  ctaPrimText:{color:Colors.bg,fontSize:FontSize.md,fontWeight:'800'},
});
