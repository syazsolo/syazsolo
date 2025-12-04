'use client';

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

interface AuthContextType {
  isOwner: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    const storedAuth = localStorage.getItem('kessel_run_12_parsecs');
    if (storedAuth === 'true') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsOwner(true);
    }
  }, []);

  const login = () => {
    setIsOwner(true);
    if (typeof window !== 'undefined') {
      localStorage.setItem('kessel_run_12_parsecs', 'true');
    }
  };

  const logout = () => {
    setIsOwner(false);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('kessel_run_12_parsecs');
    }
  };

  return (
    <AuthContext.Provider value={{ isOwner, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
