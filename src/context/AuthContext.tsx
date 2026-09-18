import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  User,
  createUserWithEmailAndPassword,
  deleteUser,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../config/firebase';

export type VoltUser = {
  uid: string;
  name: string;
  email: string;
  city: string;
  emailVerified: boolean;
};

type AuthContextValue = {
  user: VoltUser | null;
  firebaseUser: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  resendVerification: () => Promise<void>;
  signOut: () => Promise<void>;
  deleteAccount: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function toVoltUser(user: User): VoltUser {
  return {
    uid: user.uid,
    name: user.displayName || user.email?.split('@')[0] || 'VoltWay Driver',
    email: user.email || '',
    city: 'Delhi NCR',
    emailVerified: user.emailVerified,
  };
}

function friendlyAuthError(error: any): Error {
  const code = error?.code || '';
  const messages: Record<string, string> = {
    'auth/email-already-in-use': 'An account already exists with this email.',
    'auth/invalid-email': 'Please enter a valid email address.',
    'auth/invalid-credential': 'Incorrect email or password.',
    'auth/weak-password': 'Password must be at least 6 characters.',
    'auth/too-many-requests': 'Too many attempts. Please wait and try again.',
    'auth/network-request-failed': 'Network error. Check your internet connection.',
    'auth/requires-recent-login': 'Please sign out, sign in again, and retry this action.',
  };
  return new Error(messages[code] || error?.message || 'Authentication failed. Please try again.');
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setFirebaseUser(currentUser);
      setIsLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = useMemo<AuthContextValue>(() => ({
    user: firebaseUser ? toVoltUser(firebaseUser) : null,
    firebaseUser,
    isLoading,
    signIn: async (email, password) => {
      try {
        if (!email.trim() || !password) throw new Error('Please enter email and password.');
        await signInWithEmailAndPassword(auth, email.trim().toLowerCase(), password);
      } catch (error) {
        throw friendlyAuthError(error);
      }
    },
    register: async (name, email, password) => {
      try {
        if (!name.trim() || !email.trim() || !password) throw new Error('Please complete all fields.');
        if (password.length < 6) throw new Error('Password must be at least 6 characters.');
        const credential = await createUserWithEmailAndPassword(auth, email.trim().toLowerCase(), password);
        await updateProfile(credential.user, { displayName: name.trim() });
        await sendEmailVerification(credential.user);
        await credential.user.reload();
        setFirebaseUser(auth.currentUser);
      } catch (error) {
        throw friendlyAuthError(error);
      }
    },
    resetPassword: async email => {
      try {
        if (!email.trim()) throw new Error('Enter your email address first.');
        await sendPasswordResetEmail(auth, email.trim().toLowerCase());
      } catch (error) {
        throw friendlyAuthError(error);
      }
    },
    resendVerification: async () => {
      try {
        if (!auth.currentUser) throw new Error('You are not signed in.');
        await sendEmailVerification(auth.currentUser);
      } catch (error) {
        throw friendlyAuthError(error);
      }
    },
    signOut: async () => {
      await firebaseSignOut(auth);
    },
    deleteAccount: async () => {
      try {
        if (!auth.currentUser) throw new Error('You are not signed in.');
        await deleteUser(auth.currentUser);
      } catch (error) {
        throw friendlyAuthError(error);
      }
    },
  }), [firebaseUser, isLoading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error('useAuth must be used inside AuthProvider');
  return value;
}
