import React, { createContext, useContext, useState, useEffect } from "react";
import { 
  User, 
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged 
} from "firebase/auth";
import { auth } from "@/lib/firebase";

type AuthContextType = {
  currentUser: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<User>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Check if we're in development mode
  const isDevelopment = import.meta.env.DEV;

  async function signIn(email: string, password: string): Promise<User> {
    // In development mode, use a mock authentication
    if (isDevelopment && email === "admin@example.com" && password === "password") {
      const mockUser = {
        uid: "dev-user-123",
        email: "admin@example.com",
        displayName: "Admin User",
        emailVerified: true,
        isAnonymous: false,
        metadata: {},
        providerData: [],
        refreshToken: "mock-refresh-token",
        tenantId: null,
        delete: async () => {},
        getIdToken: async () => "mock-id-token",
        getIdTokenResult: async () => ({
          token: "mock-id-token",
          signInProvider: "password",
          expirationTime: new Date(Date.now() + 3600000).toISOString(),
          issuedAtTime: new Date().toISOString(),
          authTime: new Date().toISOString(),
          claims: {}
        }),
        reload: async () => {},
        toJSON: () => ({})
      } as unknown as User;
      
      setCurrentUser(mockUser);
      return mockUser;
    }
    
    // Otherwise, use Firebase authentication
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }

  function signOut() {
    if (isDevelopment) {
      setCurrentUser(null);
      return Promise.resolve();
    }
    return firebaseSignOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    loading,
    signIn,
    signOut
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
