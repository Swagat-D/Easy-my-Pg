import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  TextInput,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import LoginScreen from './LoginScreen';
import OTPVerificationScreen from './OTPVerificationScreen';

const { width: screenWidth } = Dimensions.get('window');

interface SignupScreenProps {
  onVerifyOTP?: (formData: FormData) => void;
  onLoginRedirect?: () => void;
}

interface FormData {
  name: string;
  emailAddress: string;
  mobileNumber: string;
  password: string;
  pincode: string;
}

export default function SignupScreen({ onVerifyOTP, onLoginRedirect }: SignupScreenProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    emailAddress: '',
    mobileNumber: '',
    password: '',
    pincode: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showLoginScreen, setShowLoginScreen] = useState(false);
  const [showOTPScreen, setShowOTPScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { register, sendOTP, clearError } = useAuth();
  const [formError, setFormError] = useState<string | null>(null);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setFormError(null); // clear error when user types
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phone: string): boolean => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone);
  };

  const validatePassword = (password: string): boolean => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;
    return passwordRegex.test(password);
  };

  const validatePincode = (pincode: string): boolean => {
    const pincodeRegex = /^\d{6}$/;
    return pincodeRegex.test(pincode);
  };

  const isFormValid = () => {
    return formData.name.trim() !== '' &&
           formData.emailAddress.trim() !== '' &&
           formData.mobileNumber.trim() !== '' &&
           formData.mobileNumber.length === 10 &&
           formData.password.trim() !== '' &&
           formData.pincode.trim() !== '';
  };

  const handleVerifyOTP = async () => {
    if (!formData.name.trim()) {
      setFormError('Please enter your name');
      return;
    }
    if (!validateEmail(formData.emailAddress)) {
      setFormError('Please enter a valid email address');
      return;
    }
    if (!validatePhoneNumber(formData.mobileNumber)) {
      setFormError('Please enter a valid 10-digit mobile number starting with 6, 7, 8, or 9');
      return;
    }
    if (!validatePassword(formData.password)) {
      setFormError('Password must be at least 6 characters long and contain both letters and numbers');
      return;
    }
    if (!validatePincode(formData.pincode)) {
      setFormError('Please enter a valid 6-digit pincode');
      return;
    }

    try {
      setIsLoading(true);
      clearError();

      await register({
        email: formData.emailAddress,
        password: formData.password,
        name: formData.name,
        phoneNumber: formData.mobileNumber,
        ownershipType: 'Individual'
      });

      await sendOTP(formData.mobileNumber);
      setShowOTPScreen(true);
      setFormError('✅ Account created. Please verify your mobile number.');

    } catch (error: any) {
      console.error('Registration error:', error);

      if (
        error.message.includes('user already exists') ||
        error.message.includes('already registered') ||
        error.message.includes('already in use')
      ) {
        setFormError('⚠️ An account with this mobile number or email already exists. Please login instead.');
      } else if (error.message.includes('network') || error.message.includes('timeout')) {
        setFormError('⚠️ Please check your internet connection and try again.');
      } else {
        setFormError(error.message || '❌ Failed to create account. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (showLoginScreen) {
    return <LoginScreen />;
  }

  const handleEditNumber = () => {
    setShowOTPScreen(false);
  };

  const handleLoginRedirect = () => {
    setShowLoginScreen(true);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (showOTPScreen) {
    return (
      <OTPVerificationScreen 
        phoneNumber={formData.mobileNumber}
        onEditNumber={handleEditNumber}
        isFromSignup={true}
        signupData={formData}
      />
    );
  }

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >

        <Image 
          source={require('../assets/logo.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
        
        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitleText}>India 1st Renting Super App </Text>
          <Image 
            source={require('../assets/india.png')} 
            style={styles.flagIcon}
            resizeMode="contain"
          />
        </View>
        
        <View style={styles.mainTitleContainer}>
          <Text style={styles.mainTitle}>PG ka Management?</Text>
          <Text style={styles.mainTitlea}>Ab Bilkul Easy!</Text>
        </View>

        {/* Error Box */}
        {formError && (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{formError}</Text>
          </View>
        )}
        
        <View style={styles.formContainer}>
          <TextInput
            style={styles.inputField}
            placeholder="Name"
            placeholderTextColor="#999"
            value={formData.name}
            onChangeText={(value) => handleInputChange('name', value)}
            autoCapitalize="words"
          />
          
          <TextInput
            style={styles.inputField}
            placeholder="Email Address"
            placeholderTextColor="#999"
            value={formData.emailAddress}
            onChangeText={(value) => handleInputChange('emailAddress', value)}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
          
          <TextInput
            style={styles.inputField}
            placeholder="Mobile Number"
            placeholderTextColor="#999"
            value={formData.mobileNumber}
            onChangeText={(value) => handleInputChange('mobileNumber', value)}
            keyboardType="numeric"
            maxLength={10}
          />
          
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Password"
              placeholderTextColor="#999"
              value={formData.password}
              onChangeText={(value) => handleInputChange('password', value)}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
            />
            <TouchableOpacity 
              style={styles.eyeButton}
              onPress={togglePasswordVisibility}
            >
              <Text style={styles.eyeIcon}>
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </Text>
            </TouchableOpacity>
          </View>
          
          <TextInput
            style={styles.inputField}
            placeholder="Pincode"
            placeholderTextColor="#999"
            value={formData.pincode}
            onChangeText={(value) => handleInputChange('pincode', value)}
            keyboardType="numeric"
            maxLength={6}
          />
        </View>
        
        <TouchableOpacity 
          style={[
            styles.verifyOTPButton, 
            isFormValid() && styles.verifyOTPButtonActive,
            isLoading && styles.verifyOTPButtonDisabled
          ]} 
          onPress={handleVerifyOTP}
          disabled={!isFormValid() || isLoading}
        >
          <View style={styles.buttonContent}>
            {isLoading ? (
              <ActivityIndicator size="small" color="#000" />
            ) : (
              <Text style={[
                styles.verifyOTPButtonText, 
                isFormValid() && styles.verifyOTPButtonTextActive
              ]}>
                Create Account
              </Text>
            )}
          </View>
        </TouchableOpacity>
        
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <TouchableOpacity onPress={handleLoginRedirect}>
            <Text style={styles.loginLinkText}>Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
    position: 'relative',
    minHeight: 780,
  },
  logo: {
    position: 'absolute',
    width: 95,
    height: 101,
    top: 73,
    left: 139,
  },
  subtitleContainer: {
    position: 'absolute',
    width: 214,
    height: 24,
    top: 191,
    left: 67,
    flexDirection: 'row',
    alignItems: 'center',
  },
  subtitleText: {
    fontFamily: 'Poppins-Light',
    fontWeight: '300',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0,
    color: '#000',
    textAlign: 'center',
    includeFontPadding: false,
  },
  flagIcon: {
    width: 24,
    height: 24,
    marginLeft: 4,
  },
  mainTitleContainer: {
    position: 'absolute',
    top: 232,
    left: 81,
    width: 213,
    alignItems: 'center',
  },
  mainTitle: {
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
    fontSize: 20,
    lineHeight: 25,
    letterSpacing: 0,
    color: '#000',
    textAlign: 'center',
    includeFontPadding: false,
  },
  mainTitlea: {
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
    fontSize: 20,
    lineHeight: 25,
    top: 4,
    letterSpacing: 0,
    color: '#000',
    textAlign: 'center',
    includeFontPadding: false,
  },
  errorBox: {
    backgroundColor: '#fdecea',
    borderRadius: 8,
    padding: 12,
    marginHorizontal: 25,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#f5c2c7',
  },
  errorText: {
    color: '#b71c1c',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  formContainer: {
    position: 'absolute',
    top: 300,
    left: 25,
    width: 323,
  },
  inputField: {
    width: 323,
    height: 55,
    borderWidth: 1,
    borderColor: '#0000001A',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontFamily: 'Poppins',
    fontWeight: '400',
    fontSize: 16,
    color: '#000',
    backgroundColor: '#FFF',
    marginBottom: 15,
  },
  passwordContainer: {
    width: 323,
    height: 55,
    borderWidth: 1,
    borderColor: '#0000001A',
    borderRadius: 8,
    backgroundColor: '#FFF',
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordInput: {
    flex: 1,
    height: 55,
    paddingHorizontal: 16,
    fontFamily: 'Poppins',
    fontWeight: '400',
    fontSize: 16,
    color: '#000',
  },
  eyeButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  eyeIcon: {
    fontSize: 20,
  },
  verifyOTPButton: {
    position: 'absolute',
    width: 332,
    height: 50,
    top: 650,
    left: 22,
    backgroundColor: '#E0E0E0',
    borderRadius: 35,
    borderWidth: 1,
    borderColor: '#AEAEAE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifyOTPButtonActive: {
    backgroundColor: '#FFD700',
    borderColor: '#FFD700',
  },
  verifyOTPButtonText: {
    fontFamily: 'Montserrat',
    fontWeight: '600',
    fontSize: 16,
    color: '#999',
    lineHeight: 24,
  },
  verifyOTPButtonTextActive: {
    color: '#000',
  },
  loginContainer: {
    position: 'absolute',
    width: 200,
    height: 20,
    top: 720,
    left: 87,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginText: {
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 13,
    lineHeight: 16,
    color: '#000',
  },
  loginLinkText: {
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 13,
    lineHeight: 16,
    color: '#FF0000',
    textDecorationLine: 'underline',
  },
  verifyOTPButtonDisabled: {
    opacity: 0.6,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
