import React, { useState, useRef, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  TextInput, 
  TouchableOpacity,
  Dimensions,
  Alert, 
  ActivityIndicator
} from 'react-native';
import OTPVerificationScreen from './OTPVerificationScreen';
import SignupScreen from './SignUpScreen';
import { useAuth } from '../contexts/AuthContext';


const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface LoginScreenProps {
  initialPhoneNumber?: string;
  onSignupRedirect?: () => void;
}

export default function LoginScreen({ initialPhoneNumber = '' }) {
  const { 
    currentPhoneInput, setCurrentPhoneInput,
    phoneNumber, showOTPScreen, setShowOTPScreen,
    sendOTP, isLoading, clearError
  } = useAuth();

  const [showSignupScreen, setShowSignupScreen] = useState(false);
  const [manualClear, setManualClear] = useState(false);

  useEffect(() => {
    if (!currentPhoneInput && initialPhoneNumber) {
      setCurrentPhoneInput(initialPhoneNumber);
    }
  }, [initialPhoneNumber]);

  const handlePhoneNumberChange = (text: string) => {
    if (showOTPScreen) return;
    if (text === '') {
      setManualClear(false);
      setCurrentPhoneInput('');
      return;
    }
    setCurrentPhoneInput(text);
  };

  const handleSendOTP = async () => {
    if (currentPhoneInput.length === 10) {
      try {
        clearError();
        await sendOTP(currentPhoneInput);
        setShowOTPScreen(true);
      } catch (err: any) {
        Alert.alert('Error', err?.message ?? 'Failed to send OTP');
      }
    } else {
      Alert.alert('Invalid Phone Number', 'Please enter a valid 10-digit phone number');
    }
  };

  const handleClearNumber = () => {
    if (!showOTPScreen) {
      setManualClear(true);
      setCurrentPhoneInput('');
      clearError();
    }
  };

  const handleSignupRedirect = () => setShowSignupScreen(true);

  const handleEditNumber = () => {
    setShowOTPScreen(false);
  };

  if (showSignupScreen) return <SignupScreen />;

  if (showOTPScreen && phoneNumber) {
    return <OTPVerificationScreen phoneNumber={phoneNumber} onEditNumber={handleEditNumber} />;
  }

  return (
    <View style={styles.container}>
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
      
      <Text style={styles.loginText}>Login with Phone number</Text>
      
      <View style={styles.phoneInputContainer}>
        <Text style={styles.countryCode}>+91</Text>
        
        <View style={styles.numberPlaceholders}>
          {Array.from({ length: 10 }).map((_, index) => (
            <Text
              key={index}
              style={[
                styles.numberText,
                { color: currentPhoneInput[index] ? '#000' : '#CCCCCC' },
              ]}
            >
              {currentPhoneInput[index] || '0'}
            </Text>
          ))}
        </View>

        
        <TouchableOpacity onPress={handleClearNumber} style={styles.clearButton}>
          <Image 
            source={require('../assets/clear.png')} 
            style={styles.clearIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      
      <TextInput
        style={styles.hiddenInput}
        value={currentPhoneInput}
        onChangeText={handlePhoneNumberChange}
        keyboardType="numeric"
        maxLength={10}
        placeholder="Enter phone number"
      />
      
        <TouchableOpacity 
          style={[styles.sendOTPButton, { opacity: isLoading ? 0.7 : 1 }]} 
          onPress={handleSendOTP}
          disabled={isLoading}
        >
          <View style={styles.otpContainer}>
            {isLoading ? (
              <ActivityIndicator color="#000" size="small" />
            ) : (
              <Text style={styles.sendOTPText}>Send OTP</Text>
            )}
          </View>
        </TouchableOpacity>
      
      <View style={styles.termsContainer}>
        <Text style={styles.termsText}>By continuing you agree to our </Text>
        <TouchableOpacity>
          <Text style={styles.linkText}>Terms of Service</Text>
        </TouchableOpacity>
        <Text style={styles.termsText}> & </Text>
        <TouchableOpacity>
          <Text style={styles.linkText}>Privacy Policy</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.tenantContainer}>
        <Text style={styles.tenantText}>Don't have an account? </Text>
        <TouchableOpacity onPress={handleSignupRedirect}>
          <Text style={styles.tenantAppText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative',
  },
  logo: {
    position: 'absolute',
    width: screenWidth*0.264,
    height: screenHeight*0.12625,
    top: screenHeight*0.189,
    left: screenWidth*0.37,
  },
  subtitleContainer: {
    position: 'absolute',
    width: screenWidth*0.5944,
    height: screenHeight*0.03,
    top: screenHeight*0.33625,
    left: screenWidth*0.2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  subtitleText: {
    fontFamily: 'Poppins-Light',
    fontWeight: '300',
    fontSize: 16 ,
    lineHeight: screenHeight*0.03, 
    letterSpacing: 0,
    color: '#000',
    textAlign: 'center',
    includeFontPadding: false,
  },
  flagIcon: {
    width: screenHeight*0.03,
    height: screenHeight*0.03,
    marginLeft: 4,
  },
  loginText: {
    position: 'absolute',
    width: screenWidth*0.5944,
    height: screenHeight*0.03,
    top: screenHeight*0.4,
    left: screenWidth*0.2,
    fontFamily: 'Poppins-Light',
    fontWeight: '300',
    fontSize: 16,
    lineHeight: screenHeight*0.02,
    color: '#000',
    textAlign: 'center',
  },
  phoneInputContainer: {
    position: 'absolute',
    top: screenHeight*0.4925,
    flexDirection: 'row',
    alignItems: 'center',
    width: screenWidth,
  },
  countryCode: {
    position: 'absolute',
    width: screenWidth*0.122,
    height: screenHeight*0.03,
    left: screenWidth*0.102,
    fontFamily: 'Montserrat',
    fontWeight: '600',
    fontSize: 26,
    lineHeight: screenHeight*0.035,
    color: '#000',
  },
  numberPlaceholders: {
    position: 'absolute',
    left: screenWidth*0.24,
    width: screenWidth*0.52,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  numberBox: {
    width: screenWidth*0.05,
    height: screenHeight*0.03,
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberText: {
    fontFamily: 'Montserrat',
    fontWeight: '600',
    fontSize: 26,
    lineHeight: screenHeight*0.03,
    color: '#000',
  },
  clearButton: {
    position: 'absolute',
    width: screenWidth*0.0833,
    height: screenHeight*0.0325,
    left: screenWidth*0.78,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearIcon: {
    width: screenWidth*0.0833,
    height: screenHeight*0.0325,
  },
  hiddenInput: {
    position: 'absolute',
    opacity: 0,
    top: screenHeight*0.4925,
    left: screenWidth*0.25,
    width: screenWidth*0.55,
    height: screenHeight*0.03,
  },
  sendOTPButton: {
    position: 'absolute',
    width: screenWidth*0.87,
    height: screenHeight*0.0625,
    top: screenHeight*0.55,
    left: screenWidth*0.06,
    backgroundColor: '#FFD700',
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#AEAEAE',
  },
  otpContainer: {
    width: screenWidth*0.225,
    height: screenHeight*0.041,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendOTPText: {
    fontFamily: 'Montserrat',
    fontWeight: '600',
    fontSize: 16,
    color: '#000',
    lineHeight: screenHeight*0.03
  },
  termsContainer: {
    position: 'absolute',
    top: screenHeight*0.64,
    left: screenWidth*0.06,
    width: screenWidth*0.9,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  termsText: {
    fontFamily: 'Poppins',
    fontWeight: '300',
    fontSize: 12,
    color: '#000',
  },
  linkText: {
    fontFamily: 'Poppins',
    fontWeight: '300',
    fontSize: 12,
    color: '#007AFF',
    textDecorationLine: 'underline',
  },
  tenantContainer: {
    position: 'absolute',
    width: screenWidth*0.44,
    height: screenHeight*0.025,
    top: screenHeight*0.837,
    left: screenWidth*0.25,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tenantText: {
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 13,
    lineHeight: screenHeight*0.02,
    color: '#000',
  },
  tenantAppText: {
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 13,
    lineHeight: screenHeight*0.02,
    color: '#FF0000',
    textDecorationLine: 'underline',
  },
});