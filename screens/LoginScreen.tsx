import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  TextInput, 
  TouchableOpacity,
  Dimensions 
} from 'react-native';
import OTPVerificationScreen from './OTPVerificationScreen';
import SignupScreen from './SignUpScreen';

const { width: screenWidth } = Dimensions.get('window');

interface LoginScreenProps {
  initialPhoneNumber?: string;
  onSignupRedirect?: () => void;
}

export default function LoginScreen({ initialPhoneNumber = '', onSignupRedirect }: LoginScreenProps) {
  const [phoneNumber, setPhoneNumber] = useState(initialPhoneNumber);
  const [showOTPScreen, setShowOTPScreen] = useState(false);
  const [showSignupScreen, setShowSignupScreen] = useState(false);
  const handleSendOTP = () => {
    if (phoneNumber.length === 10) {
      setShowOTPScreen(true);
    }
  };

  React.useEffect(() => {
    if (phoneNumber.length === 10) {
      import('react-native').then(RN => RN.Keyboard.dismiss());
    }
  }, [phoneNumber]);

  if (showSignupScreen) {
  return <SignupScreen />;
}

  if (showOTPScreen) {
  return <OTPVerificationScreen 
    phoneNumber={phoneNumber} 
    onEditNumber={() => setShowOTPScreen(false)} 
  />;
}

const handleClearNumber = () => {
    setPhoneNumber('');
  };

  const handleSignupRedirect = () => {
  setShowSignupScreen(true);
};

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
          <Text style={[styles.numberText, { color: phoneNumber[0] ? '#000' : '#CCCCCC' }]}>{phoneNumber[0] || '0'}</Text>
          <Text style={[styles.numberText, { color: phoneNumber[1] ? '#000' : '#CCCCCC' }]}>{phoneNumber[1] || '0'}</Text>
          <Text style={[styles.numberText, { color: phoneNumber[2] ? '#000' : '#CCCCCC' }]}>{phoneNumber[2] || '0'}</Text>
          <Text style={[styles.numberText, { color: phoneNumber[3] ? '#000' : '#CCCCCC' }]}>{phoneNumber[3] || '0'}</Text>
          <Text style={[styles.numberText, { color: phoneNumber[4] ? '#000' : '#CCCCCC' }]}>{phoneNumber[4] || '0'}</Text>
          <Text style={[styles.numberText, { color: phoneNumber[5] ? '#000' : '#CCCCCC' }]}>{phoneNumber[5] || '0'}</Text>
          <Text style={[styles.numberText, { color: phoneNumber[6] ? '#000' : '#CCCCCC' }]}>{phoneNumber[6] || '0'}</Text>
          <Text style={[styles.numberText, { color: phoneNumber[7] ? '#000' : '#CCCCCC' }]}>{phoneNumber[7] || '0'}</Text>
          <Text style={[styles.numberText, { color: phoneNumber[8] ? '#000' : '#CCCCCC' }]}>{phoneNumber[8] || '0'}</Text>
          <Text style={[styles.numberText, { color: phoneNumber[9] ? '#000' : '#CCCCCC' }]}>{phoneNumber[9] || '0'}</Text>
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
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="numeric"
        maxLength={10}
        placeholder="Enter phone number"
      />
      
      <TouchableOpacity style={styles.sendOTPButton} onPress={handleSendOTP}>
        <View style={styles.otpContainer}>
          <Text style={styles.sendOTPText}>Send OTP</Text>
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
    width: 95,
    height: 101,
    top: 151,
    left: 140,
  },
  subtitleContainer: {
    position: 'absolute',
    width: 214,
    height: 24,
    top: 269,
    left: 78,
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
  loginText: {
    position: 'absolute',
    width: 214,
    height: 24,
    top: 330,
    left: 81,
    fontFamily: 'Poppins-Light',
    fontWeight: '300',
    fontSize: 16,
    lineHeight: 16,
    color: '#000',
    textAlign: 'center',
  },
  phoneInputContainer: {
    position: 'absolute',
    top: 394,
    flexDirection: 'row',
    alignItems: 'center',
    width: screenWidth,
  },
  countryCode: {
    position: 'absolute',
    width: 44,
    height: 24,
    left: 37,
    fontFamily: 'Montserrat',
    fontWeight: '600',
    fontSize: 26,
    lineHeight: 26,
    color: '#000',
  },
  numberPlaceholders: {
    position: 'absolute',
    left: 90,
    width: 200,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  numberBox: {
    width: 18,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberText: {
    fontFamily: 'Montserrat',
    fontWeight: '600',
    fontSize: 26,
    lineHeight: 24,
    color: '#000',
  },
  clearButton: {
    position: 'absolute',
    width: 30,
    height: 26,
    left: 298,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearIcon: {
    width: 30,
    height: 26,
  },
  hiddenInput: {
    position: 'absolute',
    opacity: 0,
    top: 394,
    left: 90,
    width: 200,
    height: 24,
  },
  sendOTPButton: {
    position: 'absolute',
    width: 332,
    height: 50,
    top: 460,
    left: 22,
    backgroundColor: '#FFD700',
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#AEAEAE',
  },
  otpContainer: {
    width: 81,
    height: 33,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendOTPText: {
    fontFamily: 'Montserrat',
    fontWeight: '600',
    fontSize: 16,
    color: '#000',
    lineHeight: 24
  },
  termsContainer: {
    position: 'absolute',
    top: 530,
    left: 22,
    width: 332,
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
    width: 160,
    height: 20,
    top: 670,
    left: 100,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tenantText: {
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 13,
    lineHeight: 16,
    color: '#000',
  },
  tenantAppText: {
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 13,
    lineHeight: 16,
    color: '#FF0000',
    textDecorationLine: 'underline',
  },
});