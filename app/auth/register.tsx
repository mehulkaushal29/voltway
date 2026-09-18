import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Link, router } from 'expo-router';
import { Colors, FontSize, Radius, Spacing } from '../../src/constants/theme';
import { useAuth } from '../../src/context/AuthContext';

export default function RegisterScreen() {
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    try {
      setLoading(true);
      await register(name, email, password);
      router.replace('/(tabs)');
    } catch (error: any) {
      Alert.alert('Registration failed', error.message || 'Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.wrap}>
        <View style={styles.card}>
          <Text style={styles.logo}>🔋</Text>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.sub}>Join NCR EV drivers and track better chargers.</Text>

          <TextInput style={styles.input} placeholder="Full name" placeholderTextColor={Colors.text3} value={name} onChangeText={setName} />
          <TextInput style={styles.input} placeholder="Email" placeholderTextColor={Colors.text3} value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
          <TextInput style={styles.input} placeholder="Password" placeholderTextColor={Colors.text3} value={password} onChangeText={setPassword} secureTextEntry />

          <TouchableOpacity style={[styles.primary, loading && { opacity: 0.7 }]} onPress={submit} disabled={loading}>
            <Text style={styles.primaryText}>{loading ? 'Creating...' : 'Register'}</Text>
          </TouchableOpacity>

          <Text style={styles.footerText}>Already have an account? <Link href="/auth/sign-in" style={styles.link}>Sign in</Link></Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.bg },
  wrap: { flex: 1, justifyContent: 'center', padding: Spacing.xl },
  card: { backgroundColor: Colors.bg2, borderColor: Colors.border, borderWidth: 1, borderRadius: Radius.xl, padding: Spacing.xxl, gap: Spacing.md },
  logo: { fontSize: 48, textAlign: 'center' },
  title: { color: Colors.text, fontSize: FontSize.xxxl, fontWeight: '800', textAlign: 'center' },
  sub: { color: Colors.text2, fontSize: FontSize.md, textAlign: 'center', marginBottom: Spacing.md },
  input: { backgroundColor: Colors.bg3, borderColor: Colors.border, borderWidth: 1, borderRadius: Radius.md, paddingHorizontal: Spacing.lg, paddingVertical: 14, color: Colors.text, fontSize: FontSize.md },
  primary: { backgroundColor: Colors.volt, borderRadius: Radius.md, paddingVertical: 15, alignItems: 'center', marginTop: Spacing.sm },
  primaryText: { color: Colors.bg, fontSize: FontSize.md, fontWeight: '800' },
  footerText: { color: Colors.text2, textAlign: 'center', marginTop: Spacing.sm },
  link: { color: Colors.volt, fontWeight: '700' },
  legal: { color: Colors.text3, fontSize: FontSize.sm, textAlign: 'center', lineHeight: 19 },
});
