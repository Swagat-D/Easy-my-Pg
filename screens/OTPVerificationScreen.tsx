import React, { useState, useRef } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  TextInput, 
  TouchableOpacity,
  Dimensions 
} from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

interface OTPVerificationScreenProps {
  phoneNumber: string;
  onEditNumber?: () => void;
}

export default function OTPVerificationScreen({ phoneNumber, onEditNumber }: OTPVerificationScreenProps) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const handleOTPChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOTP = () => {
    const otpString = otp.join('');
    if (otpString.length === 6) {
      console.log('Verifying OTP:', otpString);
      // Handle OTP verification logic
    }
  };

  const handleEditNumber = () => {
    if (onEditNumber) {
      onEditNumber();
    }
  };

  const handleResendOTP = () => {
    console.log('Resending OTP to:', phoneNumber);
    setOtp(['', '', '', '', '', '']);
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image 
        source={require('../assets/logo.png')} 
        style={styles.logo}
        resizeMode="contain"
      />
      
      {/* Subtitle with India flag */}
      <View style={styles.subtitleContainer}>
        <Text style={styles.subtitleText}>India 1st Renting Super App </Text>
        <Image 
          source={require('../assets/india.png')} 
          style={styles.flagIcon}
          resizeMode="contain"
        />
      </View>
      
      {/* Enter OTP text */}
      <Text style={styles.otpTitle}>Enter the OTP sent to</Text>
      
      {/* Phone number with edit button */}
      <View style={styles.phoneNumberContainer}>
        <Text style={styles.phoneNumberText}>{phoneNumber}</Text>
        <TouchableOpacity onPress={handleEditNumber} style={styles.editButton}>
          <Image 
            source={require('../assets/Edit.png')} 
            style={styles.editIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      
      {/* OTP Input Container */}
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
            maxLength={1}
            textAlign="center"
          />
        ))}
      </View>
      
      {/* Verify OTP Button */}
      <TouchableOpacity 
        style={[styles.verifyButton, otp.join('').length === 6 && styles.verifyButtonActive]} 
        onPress={handleVerifyOTP}
        disabled={otp.join('').length !== 6}
      >
        <Text style={[styles.verifyButtonText, otp.join('').length === 6 && styles.verifyButtonTextActive]}>
          Verify OTP
        </Text>
      </TouchableOpacity>
      
      {/* Didn't receive code and Resend */}
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
    width: 118,
    height: 24,
    top: 377,
    left: 129,
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