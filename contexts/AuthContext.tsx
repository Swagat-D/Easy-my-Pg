import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiService } from '../services/apiService';
import { StorageService } from '../utils/storage';

interface User {
  userName: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  authInitializing:boolean;
  login: (phoneNumber: string, otp: string) => Promise<void>;
  sendOTP: (phoneNumber: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
  clearError: () => void;
  phoneNumber: string;
  setPhoneNumber: (phone: string) => void;
  showOTPScreen: boolean;
  setShowOTPScreen: (value: boolean) => void;
  currentPhoneInput: string;
  setCurrentPhoneInput: (phone: string) => void;
}

interface RegisterData {
  email: string;
  password: string;
  name: string;
  phoneNumber: string;
  ownershipType: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const [authInitializing, setAuthInitializing] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  
  const [error, setError] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showOTPScreen, setShowOTPScreen] = useState(false);
  const [currentPhoneInput, setCurrentPhoneInput] = useState('');

  const isAuthenticated = !!user;

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      setIsLoading(true);
      const [token, userData] = await Promise.all([
        StorageService.getAuthToken(),
        StorageService.getUserData(),
      ]);

      if (token && userData) {
        setUser(userData);
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
    } finally {
      setAuthInitializing(false);
      setIsLoading(false);
    }
  };

const sendOTP = async (phoneNumber: string): Promise<void> => {
  try {
    setIsLoading(true);
    setError(null);
    
    const response = await apiService.sendOTP(phoneNumber);
    console.log('OTP sent successfully:', response);

    setPhoneNumber(phoneNumber);
    setShowOTPScreen(true);
    
  } catch (error) {
    console.error('Send OTP error:', error);
    
    let errorMessage = 'Failed to send OTP';
    let shouldThrow = true;
    
    if (error instanceof Error) {
      if (error.message.includes('timeout')) {
        errorMessage = 'Request timed out. Please check your internet connection.';
      } else if (error.message.includes('Network')) {
        errorMessage = 'Network error. Please check your internet connection.';
      } else if (error.message.includes('404')) {
        errorMessage = 'User not found. Please sign up first.';
      } else if (error.message.includes('429')) {
        errorMessage = 'Too many requests. Please wait a few minutes before trying again.';
      } else {
        errorMessage = error.message;
      }
    }
    
    setError(errorMessage);
    
    if (shouldThrow) {
      throw new Error(errorMessage);
    }
  } finally {
    setIsLoading(false);
  }
};

  const login = async (phoneNumber: string, otp: string): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await apiService.login(phoneNumber, otp);
      
      const userData: User = {
        userName: response.userName,
        email: response.email,
        role: response.role,
      };

      await Promise.all([
        StorageService.setAuthToken(response.access_token),
        StorageService.setUserData(userData),
      ]);

      setUser(userData);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterData): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      
      await apiService.registerPropertyOwner(userData);
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Registration failed';
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await StorageService.clearAuthData();
      setUser(null);
      setError(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const clearError = () => {
    setError(null);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    authInitializing,
    isLoading,
    login,
    sendOTP,
    register,
    logout,
    error,
    clearError,
    phoneNumber,
    setPhoneNumber,
    showOTPScreen,
    setShowOTPScreen,
    currentPhoneInput,
    setCurrentPhoneInput
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
