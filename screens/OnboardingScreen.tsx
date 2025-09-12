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
  Platform
} from 'react-native';
import AddPropertyScreen from './AddPropertyScreen';

const { width: screenWidth } = Dimensions.get('window');

interface OnboardingScreenProps {
  onNextStep?: (formData: FormData) => void;
  onBack?: () => void;
}

interface FormData {
  propertyName: string;
  emailAddress: string;
  password: string;
  pincode: string;
  referralCode: string;
}

export default function OnboardingScreen({ onNextStep, onBack }: OnboardingScreenProps) {
  const [formData, setFormData] = useState<FormData>({
    propertyName: '',
    emailAddress: '',
    password: '',
    pincode: '',
    referralCode: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const[showAddProperty, setShowAddProperty] =  useState(false);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const isFormValid = () => {
    return formData.propertyName.trim() !== '' &&
           formData.emailAddress.trim() !== '' &&
           formData.password.trim() !== '' &&
           formData.pincode.trim() !== '';
  };

  if (showAddProperty){
    return <AddPropertyScreen />
  }

  const handleNextStep = () => {
    if (isFormValid() && onNextStep) {
      onNextStep(formData);
      setShowAddProperty(true);
    }
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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
        
        <View style={styles.formContainer}>
          <TextInput
            style={styles.inputField}
            placeholder="Property Name"
            placeholderTextColor="#999"
            value={formData.propertyName}
            onChangeText={(value) => handleInputChange('propertyName', value)}
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
          
          <TextInput
            style={styles.inputField}
            placeholder="Referral code ( Optional )"
            placeholderTextColor="#999"
            value={formData.referralCode}
            onChangeText={(value) => handleInputChange('referralCode', value)}
            autoCapitalize="characters"
          />
        </View>
        
        <TouchableOpacity 
          style={[
            styles.nextButton, 
            isFormValid() && styles.nextButtonActive
          ]} 
          onPress={handleNextStep}
          disabled={!isFormValid()}
        >
          <Text style={[
            styles.nextButtonText, 
            isFormValid() && styles.nextButtonTextActive
          ]}>
            Next Step
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.backButton}
          onPress={handleBack}
        >
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
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
    top:4,
    letterSpacing: 0,
    color: '#000',
    textAlign: 'center',
    includeFontPadding: false,
  },
  formContainer: {
    position: 'absolute',
    top: 315,
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
  nextButton: {
    position: 'absolute',
    width: 332,
    height: 50,
    top: 661,
    left: 22,
    backgroundColor: '#E0E0E0',
    borderRadius: 35,
    borderWidth: 1,
    borderColor: '#AEAEAE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButtonActive: {
    backgroundColor: '#FFD700',
    borderColor: '#FFD700',
  },
  nextButtonText: {
    fontFamily: 'Montserrat',
    fontWeight: '600',
    fontSize: 16,
    color: '#999',
    lineHeight: 16,
  },
  nextButtonTextActive: {
    color: '#000',
  },
  backButton: {
    position: 'absolute',
    width: 42,
    height: 24,
    top: 728,
    left: 160,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontFamily: 'Poppins',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 16,
    letterSpacing: 0,
    color: '#000',
    textAlign: 'center',
  },
});