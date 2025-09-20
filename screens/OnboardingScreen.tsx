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

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
interface OnboardingScreenProps {
  onNextStep?: (formData: FormData) => void;
  onBack?: () => void;
}

interface FormData {
  propertyName: string;
  ownerName: string;
  pincode: string;
  referralCode: string;
}

export default function OnboardingScreen({ onNextStep, onBack }: OnboardingScreenProps) {
  const [formData, setFormData] = useState<FormData>({
    propertyName: '',
    ownerName: '',
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
           formData.ownerName.trim() !== '' &&
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
            placeholder="Owner Name"
            placeholderTextColor="#999"
            value={formData.ownerName}
            onChangeText={(value) => handleInputChange('ownerName', value)}
            autoCapitalize="words"
          />
          
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
    minHeight: screenHeight*0.975,
  },
  logo: {
    position: 'absolute',
    width: screenWidth*0.264,
    height: screenHeight*0.126,
    top: screenHeight*0.091,
    left: screenWidth*0.3861,
  },
  subtitleContainer: {
    position: 'absolute',
    width: screenWidth*0.595,
    height: screenHeight*0.03,
    top: screenHeight*0.2387,
    left: screenWidth*0.1861,
    flexDirection: 'row',
    alignItems: 'center',
  },
  subtitleText: {
    fontFamily: 'Poppins-Light',
    fontWeight: '300',
    fontSize: 16,
    lineHeight: screenHeight*0.03,
    letterSpacing: 0,
    color: '#000',
    textAlign: 'center',
    includeFontPadding: false,
  },
  flagIcon: {
    width: screenWidth*0.067,
    height: screenHeight*0.03,
    marginLeft: 4,
  },
  mainTitleContainer: {
    position: 'absolute',
    top: screenHeight*0.29,
    left: screenWidth*0.225,
    width: screenWidth*0.592,
    alignItems: 'center',
  },
  mainTitle: {
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
    fontSize: 20,
    lineHeight: screenHeight*0.031,
    letterSpacing: 0,
    color: '#000',
    textAlign: 'center',
    includeFontPadding: false,
  },
  mainTitlea: {
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
    fontSize: 20,
    lineHeight: screenHeight*0.031,
    top:screenHeight*0.005,
    letterSpacing: 0,
    color: '#000',
    textAlign: 'center',
    includeFontPadding: false,
  },
  formContainer: {
    position: 'absolute',
    top: screenHeight*0.393,
    left: screenWidth*0.695,
    width: screenWidth*0.875,
  },
  inputField: {
    width: screenWidth*0.875,
    height: screenHeight*0.06875,
    borderWidth: 1,
    borderColor: '#0000001A',
    borderRadius: 8,
    paddingHorizontal: screenHeight*0.02,
    fontFamily: 'Poppins',
    fontWeight: '400',
    fontSize: 16,
    color: '#000',
    backgroundColor: '#FFF',
    marginBottom: screenWidth*0.42,
  },
  nextButton: {
    position: 'absolute',
    width: screenWidth*0.89,
    height: screenHeight*0.0625,
    top: screenHeight*0.826,
    left: screenWidth*0.061,
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
    lineHeight: screenHeight*0.02,
  },
  nextButtonTextActive: {
    color: '#000',
  },
  backButton: {
    position: 'absolute',
    width: screenWidth*0.117,
    height: screenHeight*0.03,
    top: screenHeight*0.91,
    left: screenWidth*0.45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontFamily: 'Poppins',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: screenHeight*0.02,
    letterSpacing: 0,
    color: '#000',
    textAlign: 'center',
  },
});