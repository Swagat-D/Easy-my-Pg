import React, { useState, useRef, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  TextInput, 
  TouchableOpacity,
  Dimensions,
  Clipboard,
  Alert 
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import RoleSelectionScreen from './RoleSelectionScreen';
import DashboardScreen from './Dashboard';

const { width: screenWidth } = Dimensions.get('window');

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
  const { login, sendOTP, error, clearError } = useAuth();

  useEffect(() => {
    const autoFetchOTP = async () => {
      try {
        setIsAutoFetching(true);
        const clipboardContent = await Clipboard.getString();
        
        const otpPattern = /^\d{6}$/;
        if (otpPattern.test(clipboardContent.trim())) {
          const otpArray = clipboardContent.trim().split('');
          setOtp(otpArray);
          
           setTimeout(() => {
            handleVerifyOTP(otpArray);
          }, 500);
        }
      } catch (error) {
        console.log('Auto-fetch failed:', error);
      } finally {
        setIsAutoFetching(false);
      }
    };

    const timer = setTimeout(autoFetchOTP, 1000);
    return () => clearTimeout(timer);
  }, []);

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
    Alert.alert('Incomplete OTP', 'Please enter the complete 6-digit OTP');
    return;
  }

  try {
    setIsLoading(true);
    clearError();

    if (isFromSignup) {
      Alert.alert('Verification Successful', 'Your account has been verified successfully!');
      setShowRoleSelection(true);
    } else {
      await login(phoneNumber, otpString);
      Alert.alert('Login Successful', 'Welcome back!');
    }
    
  } catch (error: any) {
    console.error('OTP verification error:', error);
    
    if (error.message.includes('invalid otp') || 
        error.message.includes('expired') || 
        error.message.includes('incorrect')) {
      Alert.alert('Invalid OTP', 'The OTP you entered is incorrect or has expired. Please try again.');
    } else if (error.message.includes('User not found')) {
      Alert.alert('Account Not Found', 'No account found with this number. Please sign up first.');
    } else {
      Alert.alert('Verification Failed', error.message || 'Failed to verify OTP. Please try again.');
    }
    
    setOtp(['', '', '', '', '', '']);
    inputRefs.current[0]?.focus();
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
    Alert.alert('Please Wait', `You can resend OTP after ${resendTimer} seconds`);
    return;
  }

  try {
    setIsLoading(true);
    clearError();
    
    await sendOTP(phoneNumber);
    setResendTimer(120);
    setOtp(['', '', '', '', '', '']);
    Alert.alert('OTP Resent', 'A new OTP has been sent to your mobile number');
    inputRefs.current[0]?.focus();
    
  } catch (error: any) {
    Alert.alert('Resend Failed', error.message || 'Failed to resend OTP. Please try again.');
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
  otpTitle: {
    position: 'absolute',
    width: 164,
    height: 24,
    top: 344,
    left: 106,
    fontFamily: 'Poppins-Light',
    fontWeight: '300',
    fontSize: 16,
    lineHeight: 16,
    color: '#000',
    textAlign: 'center',
  },
  phoneNumberContainer: {
    position: 'absolute',
    width: 140,
    height: 24,
    top: 377,
    left: 117,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  phoneNumberText: {
    fontFamily: 'Montserrat',
    fontWeight: '600',
    fontSize: 15,
    lineHeight: 15,
    color: '#000',
    textAlign: 'center',
  },
  editButton: {
    marginLeft: 8,
    width: 16,
    height: 16,
  },
  editIcon: {
    width: 16,
    height: 16,
  },
  autoFetchText: {
    position: 'absolute',
    top: 410,
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
    width: 316,
    height: 50,
    top: 433,
    left: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  otpInput: {
    width: 45,
    height: 50,
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
    width: 332,
    height: 50,
    top: 519,
    left: 22,
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
    lineHeight: 16,
  },
  verifyButtonTextActive: {
    color: '#000',
  },
  resendContainer: {
    position: 'absolute',
    width: 202,
    height: 21,
    top: 592,
    left: 87,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resendText: {
    fontFamily: 'Poppins',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 14,
    color: '#000',
    textAlign: 'center',
  },
  resendLinkText: {
    fontFamily: 'Poppins',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 14,
    color: '#FF0000',
    textAlign: 'center',
  },
});