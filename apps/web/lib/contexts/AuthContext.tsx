'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useAuth } from '@/lib/auth/hooks/useAuth';

// Define auth context type
type AuthContextType = ReturnType<typeof useAuth>;

// Create the context
const AuthContext = createContext<AuthContextType | null>(null);

// Custom hook to use the auth context
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

// Auth provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const authContextValue = useAuth();
  
  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
