import { useEffect } from 'react';
import { router } from 'expo-router';
export default function Planner() {
  useEffect(()=>{ router.replace('/(tabs)/route'); },[]);
  return null;
}
