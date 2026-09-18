import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, Spacing, Radius, FontSize } from '../constants/theme';
import { Station } from '../types';

export function StationCard({ station, onPress }: { station:Station; onPress:()=>void }) {
  const sc = station.reliabilityColor==='green'?Colors.green:station.reliabilityColor==='amber'?Colors.amber:Colors.red;
  const wc = station.waitClass==='low'?Colors.green:station.waitClass==='mid'?Colors.amber:Colors.red;
  return (
    <TouchableOpacity style={[styles.card,{borderLeftColor:sc}]} onPress={onPress} activeOpacity={0.85}>
      <View style={styles.topRow}>
        <View style={styles.nameBlock}>
          <Text style={styles.name}>{station.name}</Text>
          <Text style={styles.network}>{station.network}</Text>
        </View>
        <View style={styles.scoreBlock}>
          <Text style={[styles.score,{color:sc}]}>{station.reliabilityScore.toFixed(1)}</Text>
          <Text style={styles.scoreLabel}>Reliability</Text>
        </View>
      </View>
      <View style={styles.statsRow}>
        <Text style={styles.statText}>📍 {station.distance?.toFixed(1)} km</Text>
        <Text style={styles.statText}>⚡ {station.maxPowerKW} kW</Text>
        <View style={[styles.waitPill,{borderColor:wc,backgroundColor:wc+'1A'}]}>
          <Text style={[styles.waitText,{color:wc}]}>🕐 {station.waitText}</Text>
        </View>
      </View>
      <View style={styles.bottomRow}>
        <View style={styles.portList}>
          {station.connectorTypes.map(t=>(
            <View key={t} style={styles.portTag}><Text style={styles.portTagText}>{t}</Text></View>
          ))}
        </View>
        <View style={styles.goBtn}><Text style={styles.goBtnText}>Details →</Text></View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card:{backgroundColor:Colors.bg3,borderRadius:Radius.xl,padding:Spacing.lg,marginBottom:Spacing.md,borderWidth:1,borderColor:Colors.border,borderLeftWidth:3},
  topRow:{flexDirection:'row',justifyContent:'space-between',marginBottom:Spacing.sm},
  nameBlock:{flex:1,marginRight:Spacing.md},
  name:{color:Colors.text,fontSize:FontSize.md,fontWeight:'700'},
  network:{color:Colors.text3,fontSize:FontSize.xs,marginTop:2},
  scoreBlock:{alignItems:'flex-end'},
  score:{fontSize:FontSize.xxl,fontWeight:'800',lineHeight:26},
  scoreLabel:{color:Colors.text3,fontSize:9,textTransform:'uppercase',letterSpacing:0.5},
  statsRow:{flexDirection:'row',alignItems:'center',gap:Spacing.md,marginBottom:Spacing.md},
  statText:{color:Colors.text2,fontSize:FontSize.sm},
  waitPill:{paddingHorizontal:Spacing.sm,paddingVertical:3,borderRadius:Radius.full,borderWidth:1},
  waitText:{fontSize:11,fontWeight:'500'},
  bottomRow:{flexDirection:'row',justifyContent:'space-between',alignItems:'center'},
  portList:{flexDirection:'row',gap:5,flexWrap:'wrap',flex:1},
  portTag:{backgroundColor:Colors.bg4,borderRadius:6,paddingHorizontal:7,paddingVertical:3,borderWidth:1,borderColor:Colors.border},
  portTagText:{color:Colors.text2,fontSize:10,fontWeight:'500'},
  goBtn:{backgroundColor:Colors.voltGlow,borderWidth:1,borderColor:Colors.borderGlow,borderRadius:Spacing.sm,paddingHorizontal:Spacing.md,paddingVertical:6},
  goBtnText:{color:Colors.volt,fontSize:11,fontWeight:'700'},
});
