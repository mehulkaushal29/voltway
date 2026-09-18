import { Link } from 'expo-router';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Colors, FontSize, Radius, Spacing } from '../../src/constants/theme';
import { useAuth } from '../../src/context/AuthContext';

export default function ForgotPasswordScreen() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    try {
      setLoading(true);
      await resetPassword(email);
      Alert.alert('Check your email', 'Firebase has sent a password-reset link if that email is registered.');
    } catch (error: any) {
      Alert.alert('Unable to send reset email', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.wrap}>
        <View style={styles.card}>
          <Text style={styles.logo}>🔐</Text>
          <Text style={styles.title}>Reset Password</Text>
          <Text style={styles.sub}>Enter the email used for your VoltWay account.</Text>
          <TextInput style={styles.input} placeholder="Email" placeholderTextColor={Colors.text3} value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" autoComplete="email" />
          <TouchableOpacity style={[styles.primary, loading && { opacity: 0.65 }]} onPress={submit} disabled={loading}>
            <Text style={styles.primaryText}>{loading ? 'Sending...' : 'Send Reset Link'}</Text>
          </TouchableOpacity>
          <Link href="/auth/sign-in" style={styles.link}>Back to sign in</Link>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.bg }, wrap: { flex: 1, justifyContent: 'center', padding: Spacing.xl },
  card: { backgroundColor: Colors.bg2, borderColor: Colors.border, borderWidth: 1, borderRadius: Radius.xl, padding: Spacing.xxl, gap: Spacing.md },
  logo: { fontSize: 44, textAlign: 'center' }, title: { color: Colors.text, fontSize: FontSize.xxl, fontWeight: '800', textAlign: 'center' },
  sub: { color: Colors.text2, textAlign: 'center', marginBottom: Spacing.sm }, input: { backgroundColor: Colors.bg3, borderColor: Colors.border, borderWidth: 1, borderRadius: Radius.md, paddingHorizontal: Spacing.lg, paddingVertical: 14, color: Colors.text },
  primary: { backgroundColor: Colors.volt, borderRadius: Radius.md, paddingVertical: 15, alignItems: 'center' }, primaryText: { color: Colors.bg, fontWeight: '800' },
  link: { color: Colors.volt, fontWeight: '700', textAlign: 'center', marginTop: Spacing.sm },
});
