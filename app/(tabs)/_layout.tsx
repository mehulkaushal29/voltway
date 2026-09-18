import { Tabs } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../src/constants/theme';

function TabIcon({ emoji, label, focused }: { emoji:string; label:string; focused:boolean }) {
  return (
    <View style={styles.tab}>
      <Text style={[styles.emoji,{opacity:focused?1:0.4}]}>{emoji}</Text>
      <Text style={[styles.label,{color:focused?Colors.volt:Colors.text3}]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tab:{alignItems:'center',gap:2,paddingTop:4},
  emoji:{fontSize:20},
  label:{fontSize:10,fontWeight:'500'},
});

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{
      headerShown:false,
      tabBarStyle:{backgroundColor:'rgba(10,14,26,0.97)',borderTopColor:Colors.border,borderTopWidth:1,height:70,paddingBottom:10},
      tabBarShowLabel:false,
    }}>
      <Tabs.Screen name="index" options={{tabBarIcon:({focused})=><TabIcon emoji="🏠" label="Home" focused={focused}/>}}/>
      <Tabs.Screen name="map" options={{tabBarIcon:({focused})=><TabIcon emoji="🗺️" label="Map" focused={focused}/>}}/>
      <Tabs.Screen name="route" options={{tabBarIcon:({focused})=><TabIcon emoji="⚡" label="Route" focused={focused}/>}}/>
      <Tabs.Screen name="report" options={{tabBarIcon:({focused})=><TabIcon emoji="📋" label="Report" focused={focused}/>}}/>
      <Tabs.Screen name="profile" options={{tabBarIcon:({focused})=><TabIcon emoji="👤" label="Profile" focused={focused}/>}}/>
    </Tabs>
  );
}
