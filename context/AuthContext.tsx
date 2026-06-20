'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { User } from '@/types';

interface AuthState {
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthState>({
  user: null,
  token: null,
  login: () => {},
  logout: () => {},
  isLoading: true,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('blog_auth');
      if (stored) {
        const { user, token } = JSON.parse(stored);
        setUser(user);
        setToken(token);
      }
    } catch {
      // corrupted storage — ignore
    } finally {
      setIsLoading(false);
    }
  }, []);

  function login(user: User, token: string) {
    setUser(user);
    setToken(token);
    localStorage.setItem('blog_auth', JSON.stringify({ user, token }));
  }

  function logout() {
    setUser(null);
    setToken(null);
    localStorage.removeItem('blog_auth');
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
