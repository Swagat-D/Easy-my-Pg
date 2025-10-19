import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Dimensions,
  Image,
  TextInput,
  Modal,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface DropdownOption {
  id: string;
  label: string;
  value: string;
}

interface EditProfileScreenProps {
  onBackPress?: () => void;
  profileData?: {
    fullName: string;
    gender: string;
    profession: string;
    phoneNumber: string;
    email: string;
    permanentAddress: string;
    pincode: string;
    state: string;
    profileImage?: string;
  };
}

export default function EditProfileScreen({ 
  onBackPress,
  profileData = {
    fullName: 'Soumya',
    gender: 'Female',
    profession: 'Student',
    phoneNumber: '9876543210',
    email: 'soumya@example.com',
    permanentAddress: '123 Main Street, Kalyani Nagar',
    pincode: '411006',
    state: 'Maharashtra',
  }
}: EditProfileScreenProps) {
  // Define options first
  const genderOptions: DropdownOption[] = [
    { id: '1', label: 'Male', value: 'male' },
    { id: '2', label: 'Female', value: 'female' },
    { id: '3', label: 'Other', value: 'other' },
  ];

  const professionOptions: DropdownOption[] = [
    { id: '1', label: 'Student', value: 'student' },
    { id: '2', label: 'Working Professional', value: 'working' },
    { id: '3', label: 'Business', value: 'business' },
    { id: '4', label: 'Other', value: 'other' },
  ];

  const stateOptions: DropdownOption[] = [
    { id: '1', label: 'Maharashtra', value: 'maharashtra' },
    { id: '2', label: 'Karnataka', value: 'karnataka' },
    { id: '3', label: 'Delhi', value: 'delhi' },
    { id: '4', label: 'Gujarat', value: 'gujarat' },
    { id: '5', label: 'Tamil Nadu', value: 'tamil_nadu' },
  ];

  // Pre-populate state with existing data
  const [fullName, setFullName] = useState(profileData.fullName);
  const [gender, setGender] = useState<DropdownOption | null>(
    genderOptions.find(option => option.label === profileData.gender) || null
  );
  const [profession, setProfession] = useState<DropdownOption | null>(
    professionOptions.find(option => option.label === profileData.profession) || null
  );
  const [phoneNumber, setPhoneNumber] = useState(profileData.phoneNumber);
  const [email, setEmail] = useState(profileData.email);
  const [permanentAddress, setPermanentAddress] = useState(profileData.permanentAddress);
  const [pincode, setPincode] = useState(profileData.pincode);
  const [state, setState] = useState<DropdownOption | null>(
    stateOptions.find(option => option.label === profileData.state) || null
  );

  const [showGenderModal, setShowGenderModal] = useState(false);
  const [showProfessionModal, setShowProfessionModal] = useState(false);
  const [showStateModal, setShowStateModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleSave = () => {
    setErrorMessage(''); // Clear any previous errors
    
    // Validation
    if (!fullName.trim()) {
      setErrorMessage('Please enter full name');
      return;
    }
    if (!phoneNumber.trim()) {
      setErrorMessage('Please enter phone number');
      return;
    }
    if (!email.trim()) {
      setErrorMessage('Please enter email');
      return;
    }
    
    console.log('Updating profile data');
    console.log('Updated profile:', {
      fullName,
      gender: gender?.label,
      profession: profession?.label,
      phoneNumber,
      email,
      permanentAddress,
      pincode,
      state: state?.label,
    });

    // Show success message
    setShowSuccessMessage(true);
    
    // Close screen after delay
    setTimeout(() => {
      setShowSuccessMessage(false);
      if (onBackPress) {
        onBackPress();
      }
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#FED232" barStyle="dark-content" translucent={false} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
          <Image
            source={require('../assets/icons/arrow-right.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
      </View>

      {/* Error Message */}
      {errorMessage ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      ) : null}

      <KeyboardAvoidingView 
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        enabled={true}
      >
        <ScrollView 
          style={styles.content} 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContentContainer}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          automaticallyAdjustKeyboardInsets={true}
          scrollEventThrottle={16}
          bounces={false}
        >
          {/* Profile Image Section */}
          <View style={styles.profileImageSection}>
            <View style={styles.profileImageContainer}>
              <Image
                source={require('../assets/pht.png')}
                style={styles.profileImage}
                resizeMode="cover"
              />
              <TouchableOpacity style={styles.cameraButton}>
                <Text style={styles.cameraIcon}>📷</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Form Fields */}
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Full Name</Text>
            <TextInput
              style={styles.textInput}
              value={fullName}
              onChangeText={setFullName}
              placeholder="Full Name"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <View style={styles.fieldRow}>
            <View style={styles.halfFieldContainer}>
              <Text style={styles.fieldLabel}>Gender</Text>
              <TouchableOpacity
                style={styles.dropdown}
                onPress={() => setShowGenderModal(true)}
              >
                <Text style={[styles.dropdownText, !gender && styles.placeholderText]}>
                  {gender ? gender.label : 'Select'}
                </Text>
                <Text style={styles.dropdownArrowText}>▼</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.halfFieldContainer}>
              <Text style={styles.fieldLabel}>Profession</Text>
              <TouchableOpacity
                style={styles.dropdown}
                onPress={() => setShowProfessionModal(true)}
              >
                <Text style={[styles.dropdownText, !profession && styles.placeholderText]}>
                  {profession ? profession.label : 'Select'}
                </Text>
                <Text style={styles.dropdownArrowText}>▼</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Phone Number</Text>
            <View style={styles.phoneInputContainer}>
              <View style={styles.countryCode}>
                <Text style={styles.countryCodeText}>+91</Text>
              </View>
              <TextInput
                style={styles.phoneInput}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                placeholder="Phone Number"
                placeholderTextColor="#9CA3AF"
                keyboardType="phone-pad"
                maxLength={10}
              />
            </View>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Email</Text>
            <TextInput
              style={styles.textInput}
              value={email}
              onChangeText={setEmail}
              placeholder="Tenant Email id"
              placeholderTextColor="#9CA3AF"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Permanent Address</Text>
            <TextInput
              style={[styles.textInput, styles.textInputMultiline]}
              value={permanentAddress}
              onChangeText={setPermanentAddress}
              placeholder="Address Line"
              placeholderTextColor="#9CA3AF"
              multiline={true}
              numberOfLines={3}
            />
          </View>

          <View style={styles.fieldRow}>
            <View style={styles.halfFieldContainer}>
              <Text style={styles.fieldLabel}>Pincode</Text>
              <TextInput
                style={styles.textInput}
                value={pincode}
                onChangeText={setPincode}
                placeholder="Pincode"
                placeholderTextColor="#9CA3AF"
                keyboardType="numeric"
                maxLength={6}
              />
            </View>

            <View style={styles.halfFieldContainer}>
              <Text style={styles.fieldLabel}>State</Text>
              <TouchableOpacity
                style={styles.dropdown}
                onPress={() => setShowStateModal(true)}
              >
                <Text style={[styles.dropdownText, !state && styles.placeholderText]}>
                  {state ? state.label : 'Select'}
                </Text>
                <Text style={styles.dropdownArrowText}>▼</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.bottomSpacer} />
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Save Button */}
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Details</Text>
        </TouchableOpacity>
      </View>

      {/* Gender Modal */}
      <Modal visible={showGenderModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Gender</Text>
            <FlatList
              data={genderOptions}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalOption}
                  onPress={() => {
                    setGender(item);
                    setShowGenderModal(false);
                  }}
                >
                  <Text style={styles.modalOptionText}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setShowGenderModal(false)}
            >
              <Text style={styles.modalCloseText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Profession Modal */}
      <Modal visible={showProfessionModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Profession</Text>
            <FlatList
              data={professionOptions}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalOption}
                  onPress={() => {
                    setProfession(item);
                    setShowProfessionModal(false);
                  }}
                >
                  <Text style={styles.modalOptionText}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setShowProfessionModal(false)}
            >
              <Text style={styles.modalCloseText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* State Modal */}
      <Modal visible={showStateModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select State</Text>
            <FlatList
              data={stateOptions}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalOption}
                  onPress={() => {
                    setState(item);
                    setShowStateModal(false);
                  }}
                >
                  <Text style={styles.modalOptionText}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setShowStateModal(false)}
            >
              <Text style={styles.modalCloseText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Success Message Modal */}
      <Modal visible={showSuccessMessage} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, styles.successModalContent]}>
            <View style={styles.successIconContainer}>
              <Text style={styles.successIcon}>✓</Text>
            </View>
            <Text style={styles.successTitle}>Success!</Text>
            <Text style={styles.successMessage}>Profile updated successfully</Text>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    width: '100%',
    height: Math.max(88, screenHeight * 0.11),
    backgroundColor: '#FED232',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Math.max(15, screenWidth * 0.04),
    paddingTop: Math.max(20, screenHeight * 0.04),
    minHeight: 80,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  backIcon: {
    width: 20,
    height: 15,
    transform: [{ rotate: '180deg' }],
    tintColor: '#000',
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: '#171A1F',
    textAlign: 'center',
    marginRight: 40,
    fontFamily: 'Montserrat-SemiBold',
  },
  content: {
    flex: 1,
    paddingHorizontal: Math.max(20, screenWidth * 0.05),
    backgroundColor: '#F8F9FA',
  },
  keyboardContainer: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollContentContainer: {
    flexGrow: 1,
    paddingBottom: Math.max(100, screenHeight * 0.12),
    paddingTop: Math.max(20, screenHeight * 0.025),
  },
  profileImageSection: {
    alignItems: 'center',
    marginBottom: Math.max(30, screenHeight * 0.04),
  },
  profileImageContainer: {
    position: 'relative',
  },
  profileImage: {
    width: Math.max(100, screenWidth * 0.25),
    height: Math.max(100, screenWidth * 0.25),
    borderRadius: Math.max(50, screenWidth * 0.125),
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#FED232',
    borderRadius: Math.max(18, screenWidth * 0.045),
    width: Math.max(36, screenWidth * 0.09),
    height: Math.max(36, screenWidth * 0.09),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  cameraIcon: {
    fontSize: Math.max(18, screenWidth * 0.045),
    color: '#000',
  },
  fieldContainer: {
    marginBottom: Math.max(12, screenHeight * 0.015),
  },
  fieldRow: {
    flexDirection: 'row',
    gap: Math.max(12, screenWidth * 0.03),
    marginBottom: Math.max(12, screenHeight * 0.015),
  },
  halfFieldContainer: {
    flex: 1,
  },
  fieldLabel: {
    fontSize: Math.max(14, screenWidth * 0.035),
    fontWeight: '500',
    color: '#111827',
    fontFamily: 'Montserrat-Medium',
    marginBottom: Math.max(6, screenHeight * 0.008),
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: Math.max(8, screenWidth * 0.02),
    paddingHorizontal: Math.max(16, screenWidth * 0.04),
    paddingVertical: Math.max(12, screenHeight * 0.015),
    fontSize: Math.max(14, screenWidth * 0.035),
    fontFamily: 'Montserrat-Regular',
    backgroundColor: '#FFFFFF',
    color: '#111827',
  },
  textInputMultiline: {
    height: Math.max(80, screenHeight * 0.1),
    textAlignVertical: 'top',
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: Math.max(8, screenWidth * 0.02),
    paddingHorizontal: Math.max(16, screenWidth * 0.04),
    paddingVertical: Math.max(12, screenHeight * 0.015),
    backgroundColor: '#FFFFFF',
  },
  dropdownText: {
    fontSize: Math.max(14, screenWidth * 0.035),
    fontFamily: 'Montserrat-Regular',
    color: '#111827',
  },
  placeholderText: {
    color: '#9CA3AF',
  },
  dropdownArrow: {
    width: Math.max(16, screenWidth * 0.04),
    height: Math.max(16, screenWidth * 0.04),
  },
  dropdownArrowText: {
    fontSize: Math.max(12, screenWidth * 0.03),
    color: '#9CA3AF',
  },
  phoneInputContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: Math.max(8, screenWidth * 0.02),
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  countryCode: {
    backgroundColor: '#FFECA7',
    paddingHorizontal: Math.max(12, screenWidth * 0.04),
    paddingVertical: Math.max(12, screenHeight * 0.015),
    justifyContent: 'center',
    alignItems: 'center',
  },
  countryCodeText: {
    fontSize: Math.max(14, screenWidth * 0.035),
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Montserrat-SemiBold',
  },
  phoneInput: {
    flex: 1,
    paddingHorizontal: Math.max(16, screenWidth * 0.04),
    paddingVertical: Math.max(12, screenHeight * 0.015),
    fontSize: Math.max(14, screenWidth * 0.035),
    fontFamily: 'Montserrat-Regular',
    color: '#111827',
  },
  bottomSpacer: {
    height: Math.max(100, screenHeight * 0.12),
  },
  bottomButtonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#F8F9FA',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  saveButton: {
    backgroundColor: '#FED232',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Montserrat-SemiBold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: Math.max(15, screenWidth * 0.04),
    width: Math.min(screenWidth * 0.9, 350),
    maxHeight: screenHeight * 0.7,
  },
  modalTitle: {
    fontSize: Math.max(16, Math.min(20, screenWidth * 0.045)),
    fontWeight: '600',
    color: '#000',
    fontFamily: 'Montserrat-SemiBold',
    textAlign: 'center',
    marginBottom: Math.max(10, screenHeight * 0.015),
  },
  modalOption: {
    paddingVertical: Math.max(12, screenHeight * 0.015),
    paddingHorizontal: Math.max(10, screenWidth * 0.025),
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    minHeight: Math.max(40, screenHeight * 0.05),
    justifyContent: 'center',
  },
  modalOptionText: {
    fontSize: Math.max(14, Math.min(18, screenWidth * 0.04)),
    fontFamily: 'Montserrat-Regular',
    color: '#000',
  },
  modalCloseButton: {
    marginTop: Math.max(10, screenHeight * 0.015),
    paddingVertical: Math.max(12, screenHeight * 0.015),
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    alignItems: 'center',
    minHeight: Math.max(40, screenHeight * 0.05),
    justifyContent: 'center',
  },
  modalCloseText: {
    fontSize: Math.max(14, Math.min(18, screenWidth * 0.04)),
    fontFamily: 'Montserrat-SemiBold',
    color: '#6B7280',
  },
  errorContainer: {
    backgroundColor: '#FEE2E2',
    borderRadius: Math.max(8, screenWidth * 0.02),
    paddingHorizontal: Math.max(16, screenWidth * 0.04),
    paddingVertical: Math.max(12, screenHeight * 0.015),
    marginHorizontal: Math.max(20, screenWidth * 0.05),
    marginBottom: Math.max(16, screenHeight * 0.02),
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  errorText: {
    fontSize: Math.max(14, screenWidth * 0.035),
    fontFamily: 'Montserrat-Medium',
    color: '#DC2626',
    textAlign: 'center',
  },
  successModalContent: {
    alignItems: 'center',
    paddingVertical: Math.max(30, screenHeight * 0.04),
  },
  successIconContainer: {
    width: Math.max(60, screenWidth * 0.15),
    height: Math.max(60, screenWidth * 0.15),
    borderRadius: Math.max(30, screenWidth * 0.075),
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Math.max(20, screenHeight * 0.025),
  },
  successIcon: {
    fontSize: Math.max(30, screenWidth * 0.075),
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  successTitle: {
    fontSize: Math.max(20, screenWidth * 0.05),
    fontFamily: 'Montserrat-SemiBold',
    fontWeight: '600',
    color: '#111827',
    marginBottom: Math.max(10, screenHeight * 0.012),
  },
  successMessage: {
    fontSize: Math.max(14, screenWidth * 0.035),
    fontFamily: 'Montserrat-Regular',
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: Math.max(20, screenHeight * 0.025),
  },
});