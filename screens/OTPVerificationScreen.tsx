import React, { useState, useRef, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  TextInput, 
  TouchableOpacity,
  Dimensions,
  Clipboard
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import RoleSelectionScreen from './RoleSelectionScreen';
import DashboardScreen from './Dashboard';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');


interface OTPVerificationScreenProps {
  phoneNumber: string;
  onEditNumber?: () => void;
  onOTPVerified?: () => void;
  isFromSignup?: boolean;
  signupData?: any;
}

export default function OTPVerificationScreen({ 
  phoneNumber, 
  onEditNumber, 
  onOTPVerified, 
  isFromSignup = false
}: OTPVerificationScreenProps) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isAutoFetching, setIsAutoFetching] = useState(false);
  const inputRefs = useRef<(TextInput | null)[]>([]);
  const [showRoleSelection, setShowRoleSelection] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(120);
  const [otpError, setOtpError] = useState<string | null>(null);
  const { login, sendOTP, error, clearError } = useAuth();



  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  useEffect(() => {
    if (otp.join('').length === 6) {
      import('react-native').then(RN => RN.Keyboard.dismiss());
      
      const timer = setTimeout(() => {
        handleVerifyOTP(otp);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [otp]);

  const handleOTPChange = async (value: string, index: number) => {
    if (otpError) {
      setOtpError(null);
    }
    
    if (value.length > 1) {
      const pastedValue = value.replace(/\D/g, ''); 
      
      if (pastedValue.length === 6) {
        const newOtp = pastedValue.split('');
        setOtp(newOtp);
        inputRefs.current[5]?.focus(); 
        return;
      } else if (pastedValue.length > 1) {
        const newOtp = [...otp];
        const remainingSlots = 6 - index;
        const valuesToFill = Math.min(pastedValue.length, remainingSlots);
        
        for (let i = 0; i < valuesToFill; i++) {
          newOtp[index + i] = pastedValue[i];
        }
        
        setOtp(newOtp);
        
        const nextIndex = Math.min(index + valuesToFill, 5);
        inputRefs.current[nextIndex]?.focus();
        return;
      }
    }

    const digit = value.replace(/\D/g, '');
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);

    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOTP = async (otpArray = otp) => {
    const otpString = otpArray.join('');
    if (otpString.length !== 6) {
      setOtpError('Please enter the complete 6-digit OTP');
      return;
    }

    try {
      setIsLoading(true);
      setOtpError(null);
      clearError();

      if (isFromSignup) {
        setOtpError('Account verified successfully! Setting up your profile...');
        setShowRoleSelection(true);
      } else {
        await login(phoneNumber, otpString);
        setOtpError('Login successful! Welcome back!');
      }
      
    } catch (error: any) {
      console.error('OTP verification error:', error);
      
      // Prevent error from bubbling up and causing page redirects
      if (error.message.includes('invalid otp') || 
          error.message.includes('expired') || 
          error.message.includes('incorrect') ||
          error.message.includes('wrong')) {
        setOtpError('Invalid OTP. Please check and try again.');
      } else if (error.message.includes('User not found') || error.message.includes('404')) {
        setOtpError('Account not found. Please sign up first.');
      } else if (error.message.includes('network') || error.message.includes('timeout')) {
        setOtpError('Please check your internet connection and try again.');
      } else {
        setOtpError(error.message || 'Verification failed. Please try again.');
      }
      
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
      
      // Important: Do not re-throw the error
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoleSelected = (role: string) => {
    console.log('selected role:', role);
  };

  if (showOnboarding) {
    return <DashboardScreen />;
  }

  if (showRoleSelection) {
    return <RoleSelectionScreen onNextStep={handleRoleSelected} />;
  }

  const handleEditNumber = () => {
    if (onEditNumber) {
      onEditNumber();
    }
  };

  const handleResendOTP = async () => {
    if (resendTimer > 0) {
      setOtpError(`Please wait ${resendTimer} seconds before requesting a new OTP`);
      return;
    }

    try {
      setIsLoading(true);
      setOtpError(null);
      clearError();
      
      await sendOTP(phoneNumber);
      setResendTimer(120);
      setOtp(['', '', '', '', '', '']);
      setOtpError(' New OTP sent successfully to your mobile number');
      inputRefs.current[0]?.focus();
      
    } catch (error: any) {
      console.error('Resend OTP error:', error);
      
      // Prevent error from bubbling up and causing page redirects
      if (error.message.includes('network') || error.message.includes('timeout')) {
        setOtpError('Please check your internet connection and try again.');
      } else if (error.message.includes('429') || error.message.includes('Too many requests')) {
        setOtpError('Too many attempts. Please wait a few minutes and try again.');
      } else {
        setOtpError(error.message || 'Failed to resend OTP. Please try again.');
      }
      
      // Important: Do not re-throw the error
    } finally {
      setIsLoading(false);
    }
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
      
      <Text style={styles.otpTitle}>Enter the OTP sent to</Text>
      
      <View style={styles.phoneNumberContainer}>
        <Text style={styles.phoneNumberText}>+91 {phoneNumber}</Text>
        <TouchableOpacity onPress={handleEditNumber} style={styles.editButton}>
          <Image 
            source={require('../assets/Edit.png')} 
            style={styles.editIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      {isAutoFetching && (
        <Text style={styles.autoFetchText}>Auto-detecting OTP...</Text>
      )}

      {otpError && (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{otpError}</Text>
        </View>
      )}
      
      <View style={styles.otpInputContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => { inputRefs.current[index] = ref; }}
            style={[styles.otpInput, digit && styles.otpInputFilled]}
            value={digit}
            onChangeText={(value) => handleOTPChange(value, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            keyboardType="numeric"
            maxLength={6}
            textAlign="center"
            autoComplete="sms-otp"
            textContentType="oneTimeCode"
          />
        ))}
      </View>
      
      <TouchableOpacity 
        style={[styles.verifyButton, otp.join('').length === 6 && styles.verifyButtonActive]} 
        onPress={() => handleVerifyOTP()}
        disabled={otp.join('').length !== 6}
      >
        <Text style={[styles.verifyButtonText, otp.join('').length === 6 && styles.verifyButtonTextActive]}>
          Verify OTP
        </Text>
      </TouchableOpacity>
      
      <View style={styles.resendContainer}>
        <Text style={styles.resendText}>Didn't receive code? </Text>
        <TouchableOpacity onPress={handleResendOTP}>
          <Text style={styles.resendLinkText}>Resend</Text>
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
    height: screenHeight*0.126,
    top: screenHeight*0.188,
    left: screenWidth*0.39,
  },
  subtitleContainer: {
    position: 'absolute',
    width: screenWidth*0.9,
    height: screenHeight*0.03,
    top: screenHeight*0.336,
    left: screenWidth*0.05,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subtitleText: {
    fontFamily: 'Poppins-Light',
    fontWeight: '300',
    fontSize: Math.min(16, screenWidth * 0.04),
    lineHeight: screenHeight*0.03,
    letterSpacing: 0,
    color: '#000',
    textAlign: 'center',
    includeFontPadding: false,
    flexShrink: 1,
  },
  flagIcon: {
    width: screenWidth*0.067,
    height: screenHeight*0.03,
    marginLeft: 4,
  },
  otpTitle: {
    position: 'absolute',
    width: screenWidth*0.42,
    height: screenHeight*0.03,
    top: screenHeight*0.43,
    left: screenWidth*0.278,
    fontFamily: 'Poppins-Light',
    fontWeight: '300',
    fontSize: 16,
    lineHeight: screenHeight*0.02,
    color: '#000',
    textAlign: 'center',
  },
  phoneNumberContainer: {
    position: 'absolute',
    width: screenWidth*0.39,
    height: screenHeight*0.03,
    top: screenHeight*0.471,
    left: screenWidth*0.3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  phoneNumberText: {
    fontFamily: 'Montserrat',
    fontWeight: '600',
    fontSize: 15,
    lineHeight: screenHeight*0.025,
    color: '#000',
    textAlign: 'center',
  },
  editButton: {
    marginLeft: screenWidth*0.022,
    width: screenWidth*0.044,
    height: screenHeight*0.02,
  },
  editIcon: {
    width: screenWidth*0.0444,
    height: screenHeight*0.02,
  },
  autoFetchText: {
    position: 'absolute',
    top: screenHeight*0.54,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: 12,
    color: '#FFD700',
    fontWeight: '500',
  },
  otpInputContainer: {
    position: 'absolute',
    width: screenWidth*0.85,
    height: screenHeight*0.0625,
    top: screenHeight*0.54,
    left: screenWidth*0.083,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: screenHeight*0.0125,
  },
  otpInput: {
    width: screenWidth*0.125,
    height: screenHeight*0.0625,
    borderWidth: 2,
    borderColor: '#0000001A',
    borderRadius: 8,
    fontFamily: 'Montserrat',
    fontWeight: '600',
    fontSize: 24,
    color: '#000',
    backgroundColor: '#FFF',
    textAlign: 'center',
  },
  otpInputFilled: {
    borderColor: '#FFD700',
  },
  verifyButton: {
    position: 'absolute',
    width: screenWidth*0.87,
    height: screenHeight*0.0625,
    top: screenHeight*0.65,
    left: screenWidth*0.065,
    backgroundColor: '#E0E0E0',
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#AEAEAE',
  },
  verifyButtonActive: {
    backgroundColor: '#FFD700',
  },
  verifyButtonText: {
    fontFamily: 'Montserrat',
    fontWeight: '600',
    fontSize: 16,
    color: '#999',
    lineHeight: screenHeight*0.025,
  },
  verifyButtonTextActive: {
    color: '#000',
  },
  resendContainer: {
    position: 'absolute',
    width: screenWidth*0.562,
    height: screenHeight*0.026,
    top: screenHeight*0.76,
    left: screenWidth*0.22,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resendText: {
    fontFamily: 'Poppins',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: screenHeight*0.0175,
    color: '#000',
    textAlign: 'center',
  },
  resendLinkText: {
    fontFamily: 'Poppins',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: screenHeight*0.0175,
    color: '#FF0000',
    textAlign: 'center',
  },
  errorBox: {
    backgroundColor: '#fdecea',
    borderRadius: 8,
    padding: screenHeight*0.015,
    marginHorizontal: screenHeight*0.031,
    marginTop: screenHeight*0.025,
    borderWidth: 1,
    borderColor: '#f5c2c7',
    top:screenHeight*0.845
  },
  errorText: {
    color: '#b71c1c',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
});