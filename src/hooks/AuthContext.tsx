import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  user: any;
  isLoading: boolean;
  setIsAuthenticated: (value: boolean) => void;
  setUser: (user: any) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('authUser');

    if (token && userData) {
      setIsAuthenticated(true);
      try {
        setUser(JSON.parse(userData));
      } catch (err) {
        console.error('Lỗi khi parse user từ localStorage', err);
        setUser(null);
      }
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }

    setIsLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, setIsAuthenticated, setUser, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
