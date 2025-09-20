import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  TouchableOpacity,
  Dimensions 
} from 'react-native';
import OnboardingScreen from './OnboardingScreen';
import AddPropertyScreen from './AddPropertyScreen';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
interface RoleSelectionScreenProps {
  onNextStep?: (selectedRole: string) => void;
}

interface FormData {
  propertyName: string;
  emailAddress: string;
  password: string;
  pincode: string;
  referralCode: string;
}

export default function RoleSelectionScreen({ onNextStep }: RoleSelectionScreenProps) {
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showAddProperty, setShowAddProperty] = useState(false);

  const roles = [
    'Property Manager',
    'Property Operator', 
    'Landlord'
  ];

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleNextStep = () => {
    if (selectedRole) {
      setShowOnboarding(true);
    }
  };

  const handleOnboarded = (formData: FormData) => {
    console.log('Onboarding completed with data:', formData);
    console.log('User role:', selectedRole);
    const completeUserData = {
      role: selectedRole,
      ...formData
    };
    console.log('Complete user registration data:', completeUserData);
    setShowOnboarding(false);
    setShowAddProperty(true);
  };

  const handleBackFromOnboarding = () => {
    setShowOnboarding(false);
  };

  if (showOnboarding) {
    return (
      <OnboardingScreen 
        onBack={handleBackFromOnboarding}
      />
    );
  }

  if (showAddProperty) {
    return <AddPropertyScreen />;
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
      
      <TouchableOpacity 
        style={styles.roleSelectButton}
        onPress={toggleDropdown}
      >
        <Text style={[
          styles.roleSelectText,
          { color: selectedRole ? '#000' : '#999' }
        ]}>
          {selectedRole || 'Select Your Role'}
        </Text>
        <Image 
          source={require('../assets/dropdown-arrow.png')} 
          style={[styles.dropdownArrow, isDropdownOpen && styles.dropdownArrowRotated]}
          resizeMode="contain"
        />
      </TouchableOpacity>
      
      {isDropdownOpen && (
        <View style={styles.dropdownContainer}>
          {roles.map((role, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.dropdownItem,
                index === roles.length - 1 && styles.lastDropdownItem
              ]}
              onPress={() => handleRoleSelect(role)}
            >
              <Text style={styles.dropdownItemText}>{role}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
      
      {selectedRole && (
        <TouchableOpacity 
          style={[styles.nextButton, styles.nextButtonActive]} 
          onPress={handleNextStep}
        >
          <Text style={[styles.nextButtonText, styles.nextButtonTextActive]}>
            Next Step
          </Text>
        </TouchableOpacity>
      )}
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
    top: screenHeight*0.19,
    left: screenWidth*0.3862,
  },
  subtitleContainer: {
    position: 'absolute',
    width: screenWidth*0.595,
    height: screenHeight*0.03,
    top: screenHeight*0.3375,
    left: screenWidth*0.1862,
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
    marginLeft: screenWidth*0.011,
  },
  roleSelectButton: {
    position: 'absolute',
    width: screenWidth*0.875,
    height: screenHeight*0.0675,
    top: screenHeight*0.43,
    left: screenWidth*0.072,
    backgroundColor: '#FFF',
    borderWidth: 2,
    borderColor: '#0000001A',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  roleSelectText: {
    fontFamily: 'Poppins',
    fontWeight: '400',
    fontSize: 18,
    letterSpacing:0,
    flex: 1,
    left: screenWidth*0.12
  },
  dropdownArrow: {
    width: screenWidth*0.062,
    height: screenHeight*0.03,
    right:screenWidth*0.045,
    tintColor: '#000',
  },
  dropdownArrowRotated: {
    transform: [{ rotate: '180deg' }],
  },
  dropdownContainer: {
    position: 'absolute',
    width: screenWidth*0.875,
    height: screenHeight*0.195,
    top: screenHeight*0.4975,
    left: screenWidth*0.072,
    backgroundColor: '#FFF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
    overflow: 'hidden',
  },
  dropdownItem: {
    height: screenHeight*0.065,
    paddingHorizontal: screenWidth*0.045,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  lastDropdownItem: {
    borderBottomWidth: 0,
  },
  dropdownItemText: {
    fontFamily: 'Poppins',
    fontWeight: '400',
    fontSize: 16,
    color: '#000',
  },
  nextButton: {
    position: 'absolute',
    width: screenWidth*0.92,
    height: screenHeight*0.0625,
    top: screenHeight*0.754,
    left: screenWidth*0.06,
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
    lineHeight: screenHeight*0.03,
  },
  nextButtonTextActive: {
    color: '#000',
  },
});