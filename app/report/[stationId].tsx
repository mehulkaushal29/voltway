import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Colors, Spacing, Radius, FontSize } from '../../src/constants/theme';

const ISSUES = [
  {e:'⚡',l:'Charger not working'},{e:'⏱️',l:'Long wait time'},
  {e:'🔌',l:'Cable damaged'},{e:'📱',l:'App / payment issue'},
  {e:'💡',l:'Lighting problem'},{e:'🚘',l:'Blocked by ICE car'},
  {e:'🔒',l:'Feels unsafe'},{e:'💧',l:'Dirty / waterlogged'},
];

export default function ReportIssue() {
  const { stationId, stationName } = useLocalSearchParams<{stationId:string;stationName:string}>();
  const [selected,setSelected] = useState<string[]>([]);
  const [rating,setRating] = useState(0);
  const [comment,setComment] = useState('');
  const [submitting,setSubmitting] = useState(false);

  const toggle = (l:string) => setSelected(prev=>prev.includes(l)?prev.filter(i=>i!==l):[...prev,l]);

  const submit = () => {
    if(selected.length===0&&rating===0&&!comment.trim()){Alert.alert('Nothing to report','Please select at least one issue.');return;}
    setSubmitting(true);
    setTimeout(()=>{
      setSubmitting(false);
      Alert.alert('Thank you! ⚡','Your report has been submitted.',[{text:'OK',onPress:()=>router.back()}]);
    },1000);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={()=>router.back()}><Text style={{color:Colors.text,fontSize:18}}>←</Text></TouchableOpacity>
        <View style={{flex:1}}>
          <Text style={styles.title}>Report Issue</Text>
          <Text style={styles.sub} numberOfLines={1}>{stationName}</Text>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionLabel}>What's wrong?</Text>
        <View style={styles.issueGrid}>
          {ISSUES.map(({e,l})=>(
            <TouchableOpacity key={l} style={[styles.chip,selected.includes(l)&&styles.chipActive]} onPress={()=>toggle(l)}>
              <Text style={{fontSize:22}}>{e}</Text>
              <Text style={[styles.chipText,selected.includes(l)&&{color:Colors.volt}]}>{l}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.sectionLabel}>Rate this station</Text>
        <View style={styles.ratingCard}>
          <View style={{flexDirection:'row',gap:10}}>
            {[1,2,3,4,5].map(i=>(
              <TouchableOpacity key={i} onPress={()=>setRating(i)}>
                <Text style={{fontSize:34,opacity:i<=rating?1:0.2}}>⭐</Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={{color:Colors.text2,fontSize:FontSize.md,marginTop:6}}>
            {rating===0?'Tap to rate':rating===1?'Very poor':rating===2?'Poor':rating===3?'Average':rating===4?'Good':'Excellent!'}
          </Text>
        </View>
        <Text style={styles.sectionLabel}>Comments</Text>
        <TextInput style={styles.commentBox} placeholder="Tell other EV drivers what you noticed..." placeholderTextColor={Colors.text3} multiline numberOfLines={4} value={comment} onChangeText={setComment} textAlignVertical="top"/>
        <View style={styles.note}><Text style={styles.noteText}>📊 Reports update the station's reliability score in real time.</Text></View>
        <TouchableOpacity style={[styles.submitBtn,submitting&&{opacity:0.7}]} onPress={submit} disabled={submitting}>
          <Text style={styles.submitText}>{submitting?'⏳ Submitting...':'📤  Submit Report'}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:{flex:1,backgroundColor:Colors.bg},
  header:{flexDirection:'row',alignItems:'center',paddingHorizontal:Spacing.xl,paddingVertical:Spacing.md,gap:Spacing.md},
  backBtn:{width:36,height:36,backgroundColor:Colors.bg3,borderWidth:1,borderColor:Colors.border,borderRadius:Radius.full,alignItems:'center',justifyContent:'center'},
  title:{color:Colors.text,fontSize:FontSize.xl,fontWeight:'800'},
  sub:{color:Colors.text3,fontSize:FontSize.sm,marginTop:1},
  scroll:{paddingHorizontal:Spacing.xl,paddingBottom:80},
  sectionLabel:{color:Colors.text3,fontSize:11,fontWeight:'600',textTransform:'uppercase',letterSpacing:0.6,marginBottom:Spacing.sm,marginTop:Spacing.lg},
  issueGrid:{flexDirection:'row',flexWrap:'wrap',gap:Spacing.sm},
  chip:{width:'47%',backgroundColor:Colors.bg3,borderWidth:1,borderColor:Colors.border,borderRadius:Radius.md,padding:Spacing.md,alignItems:'center',gap:5},
  chipActive:{backgroundColor:Colors.voltGlow,borderColor:Colors.borderGlow},
  chipText:{color:Colors.text2,fontSize:FontSize.sm,fontWeight:'500',textAlign:'center'},
  ratingCard:{backgroundColor:Colors.bg3,borderWidth:1,borderColor:Colors.border,borderRadius:Radius.xl,padding:Spacing.xl,alignItems:'center'},
  commentBox:{backgroundColor:Colors.bg3,borderWidth:1,borderColor:Colors.border,borderRadius:Radius.md,padding:Spacing.lg,color:Colors.text,fontSize:FontSize.md,minHeight:100,lineHeight:22},
  note:{backgroundColor:Colors.voltGlow,borderWidth:1,borderColor:Colors.borderGlow,borderRadius:Radius.md,padding:Spacing.lg,marginTop:Spacing.lg},
  noteText:{color:Colors.text2,fontSize:FontSize.sm,lineHeight:20},
  submitBtn:{backgroundColor:Colors.volt,borderRadius:Radius.md,paddingVertical:16,alignItems:'center',marginTop:Spacing.xl},
  submitText:{color:Colors.bg,fontSize:FontSize.lg,fontWeight:'800'},
});
