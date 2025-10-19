import React, { useState, useEffect } from 'react';
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
  Platform
} from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface DropdownOption {
  id: string;
  label: string;
  value: string;
}

interface AddTenantScreenProps {
  onBackPress?: () => void;
}

export default function AddTenantScreen({ onBackPress }: AddTenantScreenProps) {
  // Current step (1, 2, or 3)
  const [currentStep, setCurrentStep] = useState(1);
  
  const [fullName, setFullName] = useState('');
  const [gender, setGender] = useState<DropdownOption | null>(null);
  const [profession, setProfession] = useState<DropdownOption | null>(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [permanentAddress, setPermanentAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [state, setState] = useState<DropdownOption | null>(null);
  const [property, setProperty] = useState<DropdownOption | null>(null);
  const [roomNo, setRoomNo] = useState<DropdownOption | null>(null);
  const [joiningDate, setJoiningDate] = useState('');
  const [moveOutDate, setMoveOutDate] = useState('');
  const [lockInPeriod, setLockInPeriod] = useState<DropdownOption | null>(null);
  const [noticePeriod, setNoticePeriod] = useState<DropdownOption | null>(null);
  const [agreementPeriod, setAgreementPeriod] = useState<DropdownOption | null>(null);
  const [rentalType, setRentalType] = useState<DropdownOption | null>(null);

  // Step 3 state variables
  const [automaticRentReminder, setAutomaticRentReminder] = useState(false);
  const [rentPrice, setRentPrice] = useState('');
  const [securityDeposit, setSecurityDeposit] = useState('');
  const [electricityReading, setElectricityReading] = useState('');

  const [showGenderModal, setShowGenderModal] = useState(false);
  const [showProfessionModal, setShowProfessionModal] = useState(false);
  const [showStateModal, setShowStateModal] = useState(false);
  const [showPropertyModal, setShowPropertyModal] = useState(false);
  const [showRoomModal, setShowRoomModal] = useState(false);
  const [showLockInModal, setShowLockInModal] = useState(false);
  const [showNoticeModal, setShowNoticeModal] = useState(false);
  const [showAgreementModal, setShowAgreementModal] = useState(false);
  const [showRentalTypeModal, setShowRentalTypeModal] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');

  // Date picker states
  const [showJoiningDatePicker, setShowJoiningDatePicker] = useState(false);
  const [showMoveOutDatePicker, setShowMoveOutDatePicker] = useState(false);

  // Success message state
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

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

  const propertyOptions: DropdownOption[] = [
    { id: '1', label: 'Sunrise Apartments', value: 'sunrise' },
    { id: '2', label: 'Green Valley Heights', value: 'green_valley' },
    { id: '3', label: 'Metro Plaza', value: 'metro_plaza' },
  ];

  const roomOptions: DropdownOption[] = [
    { id: '1', label: 'Room 101', value: 'room_101' },
    { id: '2', label: 'Room 102', value: 'room_102' },
    { id: '3', label: 'Room 201', value: 'room_201' },
    { id: '4', label: 'Room 301', value: 'room_301' },
  ];

  const lockInOptions: DropdownOption[] = [
    { id: '1', label: '3 Months', value: '3' },
    { id: '2', label: '6 Months', value: '6' },
    { id: '3', label: '12 Months', value: '12' },
  ];

  const noticeOptions: DropdownOption[] = [
    { id: '1', label: '15 Days', value: '15' },
    { id: '2', label: '30 Days', value: '30' },
    { id: '3', label: '60 Days', value: '60' },
  ];

  const agreementOptions: DropdownOption[] = [
    { id: '1', label: '11 Months', value: '11' },
    { id: '2', label: '1 Year', value: '12' },
    { id: '3', label: '2 Years', value: '24' },
  ];

  const rentalTypeOptions: DropdownOption[] = [
    { id: '1', label: 'Monthly', value: 'monthly' },
    { id: '2', label: 'Quarterly', value: 'quarterly' },
    { id: '3', label: 'Half Yearly', value: 'half_yearly' },
    { id: '4', label: 'Yearly', value: 'yearly' },
  ];

  // Date picker functions
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const [selectedCalendarDate, setSelectedCalendarDate] = useState(new Date());
  const [calendarMode, setCalendarMode] = useState<'joining' | 'moveout'>('joining');

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const getMonthYear = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const handleDateSelect = (date: Date) => {
    if (calendarMode === 'joining') {
      setJoiningDate(formatDate(date));
      setShowJoiningDatePicker(false);
    } else {
      setMoveOutDate(formatDate(date));
      setShowMoveOutDatePicker(false);
    }
  };

  const handleJoiningDateOpen = () => {
    setCalendarMode('joining');
    setSelectedCalendarDate(new Date());
    setShowJoiningDatePicker(true);
  };

  const handleMoveOutDateOpen = () => {
    setCalendarMode('moveout');
    setSelectedCalendarDate(new Date());
    setShowMoveOutDatePicker(true);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(selectedCalendarDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setSelectedCalendarDate(newDate);
  };

  const handleNext = () => {
    setErrorMessage(''); // Clear any previous errors
    
    if (currentStep === 1) {
      // Validation for Step 1
      if (!fullName.trim()) {
        setErrorMessage('Please enter full name');
        return;
      }
      if (!phoneNumber.trim()) {
        setErrorMessage('Please enter phone number');
        return;
      }
      
      setCurrentStep(2);
      console.log('Moving to step 2');
    } else if (currentStep === 2) {
      // Validation for Step 2
      if (!property) {
        setErrorMessage('Please select a property');
        return;
      }
      if (!roomNo) {
        setErrorMessage('Please select a room number');
        return;
      }
      
      setCurrentStep(3);
      console.log('Moving to step 3');
    } else if (currentStep === 3) {
      // Final submission
      if (!rentPrice.trim()) {
        setErrorMessage('Please enter rent price');
        return;
      }
      if (!securityDeposit.trim()) {
        setErrorMessage('Please enter security deposit');
        return;
      }
      
      console.log('Submitting tenant data');
      console.log('Final form data:', {
        // Step 1 data
        fullName, gender: gender?.label, profession: profession?.label,
        phoneNumber, email, permanentAddress, pincode, state: state?.label,
        // Step 2 data
        property: property?.label, roomNo: roomNo?.label, joiningDate, moveOutDate,
        lockInPeriod: lockInPeriod?.label, noticePeriod: noticePeriod?.label,
        agreementPeriod: agreementPeriod?.label, rentalType: rentalType?.label,
        // Step 3 data
        automaticRentReminder, rentPrice, securityDeposit, electricityReading
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
    }
  };

  // Step indicator component
  const StepIndicator = () => {
    return (
      <View style={styles.stepIndicatorContainer}>
        {[1, 2, 3].map((step, index) => (
          <View key={step} style={styles.stepIndicatorRow}>
            <View
              style={[
                styles.stepDot,
                currentStep >= step ? styles.stepDotActive : styles.stepDotInactive
              ]}
            />
            {index < 2 && (
              <View
                style={[
                  styles.stepLine,
                  currentStep > step ? styles.stepLineActive : styles.stepLineInactive
                ]}
              />
            )}
          </View>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#FED232" barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
          <Image
            source={require('../assets/icons/arrow-right.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Tenant</Text>
      </View>

      {/* Step Indicator */}
      <StepIndicator />

      {/* Page Title */}
      <View style={styles.pageTitleContainer}>
        <Text style={styles.pageTitle}>
          {currentStep === 1 ? 'Basic Information' : 
           currentStep === 2 ? 'Room & Rent Details' : 
           'Rent & Money Details'}
        </Text>
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
        {currentStep === 1 && (
          <>
            {/* Full Name */}
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

            {/* Gender and Profession Row */}
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
                  <Image
                    source={require('../assets/dropdown-arrow.png')}
                    style={styles.dropdownArrow}
                  />
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
                  <Image
                    source={require('../assets/dropdown-arrow.png')}
                    style={styles.dropdownArrow}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Phone Number */}
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
                  placeholder=""
                  placeholderTextColor="#9CA3AF"
                  keyboardType="numeric"
                  maxLength={10}
                />
              </View>
            </View>

            {/* Email */}
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Email</Text>
              <TextInput
                style={styles.textInput}
                value={email}
                onChangeText={setEmail}
                placeholder="Tenant Email id"
                placeholderTextColor="#9CA3AF"
                keyboardType="email-address"
              />
            </View>

            {/* Permanent Address */}
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Permanent Address</Text>
              <TextInput
                style={[styles.textInput, styles.textInputMultiline]}
                value={permanentAddress}
                onChangeText={setPermanentAddress}
                placeholder="Address Line"
                placeholderTextColor="#9CA3AF"
                multiline
                numberOfLines={3}
              />
            </View>

            {/* Pincode and State Row */}
            <View style={styles.fieldRow}>
              <View style={styles.halfFieldContainer}>
                <Text style={styles.fieldLabel}>Pincode</Text>
                <TextInput
                  style={styles.textInput}
                  value={pincode}
                  onChangeText={setPincode}
                  placeholder=""
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
                  <Image
                    source={require('../assets/dropdown-arrow.png')}
                    style={styles.dropdownArrow}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}

        {currentStep === 2 && (
          <>
            {/* Property and Room Row */}
            <View style={styles.fieldRow}>
              <View style={styles.halfFieldContainer}>
                <Text style={styles.fieldLabel}>Property</Text>
                <TouchableOpacity 
                  style={styles.dropdown}
                  onPress={() => setShowPropertyModal(true)}
                >
                  <Text style={[styles.dropdownText, !property && styles.placeholderText]}>
                    {property ? property.label : 'Select'}
                  </Text>
                  <Image
                    source={require('../assets/dropdown-arrow.png')}
                    style={styles.dropdownArrow}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.halfFieldContainer}>
                <Text style={styles.fieldLabel}>Room No</Text>
                <TouchableOpacity 
                  style={styles.dropdown}
                  onPress={() => setShowRoomModal(true)}
                >
                  <Text style={[styles.dropdownText, !roomNo && styles.placeholderText]}>
                    {roomNo ? roomNo.label : 'Select'}
                  </Text>
                  <Image
                    source={require('../assets/dropdown-arrow.png')}
                    style={styles.dropdownArrow}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Joining Date and Move Out Row */}
            <View style={styles.fieldRow}>
              <View style={styles.halfFieldContainer}>
                <Text style={styles.fieldLabel}>Joining Date</Text>
                <TouchableOpacity 
                  style={styles.dateInput}
                  onPress={handleJoiningDateOpen}
                >
                  <Text style={[styles.dropdownText, !joiningDate && styles.placeholderText]}>
                    {joiningDate || 'Select'}
                  </Text>
                  <Image
                    source={require('../assets/calendar.png')}
                    style={styles.calendarIcon}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.halfFieldContainer}>
                <Text style={styles.fieldLabel}>Move - out</Text>
                <TouchableOpacity 
                  style={styles.dateInput}
                  onPress={handleMoveOutDateOpen}
                >
                  <Text style={[styles.dropdownText, !moveOutDate && styles.placeholderText]}>
                    {moveOutDate || 'Select'}
                  </Text>
                  <Image
                    source={require('../assets/calendar.png')}
                    style={styles.calendarIcon}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Lock-in Period and Notice Period Row */}
            <View style={styles.fieldRow}>
              <View style={styles.halfFieldContainer}>
                <Text style={styles.fieldLabel}>Lock-in Period</Text>
                <TouchableOpacity 
                  style={styles.dropdown}
                  onPress={() => setShowLockInModal(true)}
                >
                  <Text style={[styles.dropdownText, !lockInPeriod && styles.placeholderText]}>
                    {lockInPeriod ? lockInPeriod.label : 'Select'}
                  </Text>
                  <Image
                    source={require('../assets/dropdown-arrow.png')}
                    style={styles.dropdownArrow}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.halfFieldContainer}>
                <Text style={styles.fieldLabel}>Notice Period</Text>
                <TouchableOpacity 
                  style={styles.dropdown}
                  onPress={() => setShowNoticeModal(true)}
                >
                  <Text style={[styles.dropdownText, !noticePeriod && styles.placeholderText]}>
                    {noticePeriod ? noticePeriod.label : 'Select'}
                  </Text>
                  <Image
                    source={require('../assets/dropdown-arrow.png')}
                    style={styles.dropdownArrow}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Agreement Period */}
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Agreement Period</Text>
              <TouchableOpacity 
                style={styles.dropdown}
                onPress={() => setShowAgreementModal(true)}
              >
                <Text style={[styles.dropdownText, !agreementPeriod && styles.placeholderText]}>
                  {agreementPeriod ? agreementPeriod.label : 'Select the agreement Period'}
                </Text>
                <Image
                  source={require('../assets/dropdown-arrow.png')}
                  style={styles.dropdownArrow}
                />
              </TouchableOpacity>
            </View>

            {/* Rental Type */}
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Rental Type</Text>
              <TouchableOpacity 
                style={styles.dropdown}
                onPress={() => setShowRentalTypeModal(true)}
              >
                <Text style={[styles.dropdownText, !rentalType && styles.placeholderText]}>
                  {rentalType ? rentalType.label : 'Select type'}
                </Text>
                <Image
                  source={require('../assets/dropdown-arrow.png')}
                  style={styles.dropdownArrow}
                />
              </TouchableOpacity>
            </View>
          </>
        )}

        {currentStep === 3 && (
          <>
            {/* Automatic Rent Reminder */}
            <View style={styles.fieldContainer}>
              <View style={styles.reminderRow}>
                <Text style={styles.fieldLabel}>Automatic Rent Reminder</Text>
                <TouchableOpacity 
                  style={[styles.toggle, automaticRentReminder && styles.toggleActive]}
                  onPress={() => setAutomaticRentReminder(!automaticRentReminder)}
                >
                  <View style={[styles.toggleKnob, automaticRentReminder && styles.toggleKnobActive]} />
                </TouchableOpacity>
              </View>
            </View>

            {/* Rent Price */}
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Rent Price</Text>
              <TextInput
                style={styles.textInput}
                value={rentPrice}
                onChangeText={setRentPrice}
                placeholder="Amount"
                placeholderTextColor="#9CA3AF"
                keyboardType="numeric"
              />
            </View>

            {/* Security Deposit */}
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Security Deposit</Text>
              <TextInput
                style={styles.textInput}
                value={securityDeposit}
                onChangeText={setSecurityDeposit}
                placeholder="Deposit Amount"
                placeholderTextColor="#9CA3AF"
                keyboardType="numeric"
              />
            </View>

            {/* Lock-in Period and Notice Period Row */}
            <View style={styles.fieldRow}>
              <View style={styles.halfFieldContainer}>
                <Text style={styles.fieldLabel}>Lock-in Period</Text>
                <TouchableOpacity 
                  style={styles.dropdown}
                  onPress={() => setShowLockInModal(true)}
                >
                  <Text style={[styles.dropdownText, !lockInPeriod && styles.placeholderText]}>
                    {lockInPeriod ? lockInPeriod.label : 'Select'}
                  </Text>
                  <Image
                    source={require('../assets/dropdown-arrow.png')}
                    style={styles.dropdownArrow}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.halfFieldContainer}>
                <Text style={styles.fieldLabel}>Notice Period</Text>
                <TouchableOpacity 
                  style={styles.dropdown}
                  onPress={() => setShowNoticeModal(true)}
                >
                  <Text style={[styles.dropdownText, !noticePeriod && styles.placeholderText]}>
                    {noticePeriod ? noticePeriod.label : 'Select'}
                  </Text>
                  <Image
                    source={require('../assets/dropdown-arrow.png')}
                    style={styles.dropdownArrow}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Room Electricity Reading */}
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Room Electricity Reading</Text>
              <TextInput
                style={styles.textInput}
                value={electricityReading}
                onChangeText={setElectricityReading}
                placeholder="Deposit Amount"
                placeholderTextColor="#9CA3AF"
                keyboardType="numeric"
              />
            </View>
          </>
        )}

        {/* Bottom spacing */}
        <View style={styles.bottomSpacer} />
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Next Button */}
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>
            {currentStep === 3 ? 'Add Tenant' : 'Next'}
          </Text>
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

      {/* Property Modal */}
      <Modal visible={showPropertyModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Property</Text>
            <FlatList
              data={propertyOptions}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalOption}
                  onPress={() => {
                    setProperty(item);
                    setShowPropertyModal(false);
                  }}
                >
                  <Text style={styles.modalOptionText}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setShowPropertyModal(false)}
            >
              <Text style={styles.modalCloseText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Room Modal */}
      <Modal visible={showRoomModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Room</Text>
            <FlatList
              data={roomOptions}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalOption}
                  onPress={() => {
                    setRoomNo(item);
                    setShowRoomModal(false);
                  }}
                >
                  <Text style={styles.modalOptionText}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setShowRoomModal(false)}
            >
              <Text style={styles.modalCloseText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Lock-in Period Modal */}
      <Modal visible={showLockInModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Lock-in Period</Text>
            <FlatList
              data={lockInOptions}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalOption}
                  onPress={() => {
                    setLockInPeriod(item);
                    setShowLockInModal(false);
                  }}
                >
                  <Text style={styles.modalOptionText}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setShowLockInModal(false)}
            >
              <Text style={styles.modalCloseText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Notice Period Modal */}
      <Modal visible={showNoticeModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Notice Period</Text>
            <FlatList
              data={noticeOptions}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalOption}
                  onPress={() => {
                    setNoticePeriod(item);
                    setShowNoticeModal(false);
                  }}
                >
                  <Text style={styles.modalOptionText}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setShowNoticeModal(false)}
            >
              <Text style={styles.modalCloseText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Agreement Period Modal */}
      <Modal visible={showAgreementModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Agreement Period</Text>
            <FlatList
              data={agreementOptions}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalOption}
                  onPress={() => {
                    setAgreementPeriod(item);
                    setShowAgreementModal(false);
                  }}
                >
                  <Text style={styles.modalOptionText}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setShowAgreementModal(false)}
            >
              <Text style={styles.modalCloseText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Rental Type Modal */}
      <Modal visible={showRentalTypeModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Rental Type</Text>
            <FlatList
              data={rentalTypeOptions}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalOption}
                  onPress={() => {
                    setRentalType(item);
                    setShowRentalTypeModal(false);
                  }}
                >
                  <Text style={styles.modalOptionText}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setShowRentalTypeModal(false)}
            >
              <Text style={styles.modalCloseText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Joining Date Picker Modal */}
      <Modal visible={showJoiningDatePicker} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, styles.calendarModalContent]}>
            <Text style={styles.modalTitle}>Select Joining Date</Text>
            
            {/* Month Navigation */}
            <View style={styles.monthNavigation}>
              <TouchableOpacity onPress={() => navigateMonth('prev')}>
                <Text style={styles.navButton}>‹</Text>
              </TouchableOpacity>
              <Text style={styles.monthYear}>{getMonthYear(selectedCalendarDate)}</Text>
              <TouchableOpacity onPress={() => navigateMonth('next')}>
                <Text style={styles.navButton}>›</Text>
              </TouchableOpacity>
            </View>

            {/* Calendar Grid */}
            <View style={styles.calendarContainer}>
              {/* Day Headers */}
              <View style={styles.dayHeadersRow}>
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                  <Text key={day} style={styles.dayHeader}>{day}</Text>
                ))}
              </View>
              
              {/* Date Grid */}
              <View style={styles.datesGrid}>
                {getDaysInMonth(selectedCalendarDate).map((date, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.dateCell,
                      !date && styles.emptyDateCell,
                      date && date.toDateString() === new Date().toDateString() && styles.todayDateCell
                    ]}
                    onPress={date ? () => handleDateSelect(date) : undefined}
                    disabled={!date}
                  >
                    <Text style={[
                      styles.dateText,
                      date && date.toDateString() === new Date().toDateString() && styles.todayDateText
                    ]}>
                      {date ? date.getDate() : ''}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setShowJoiningDatePicker(false)}
            >
              <Text style={styles.modalCloseText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Move Out Date Picker Modal */}
      <Modal visible={showMoveOutDatePicker} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, styles.calendarModalContent]}>
            <Text style={styles.modalTitle}>Select Move Out Date</Text>
            
            {/* Month Navigation */}
            <View style={styles.monthNavigation}>
              <TouchableOpacity onPress={() => navigateMonth('prev')}>
                <Text style={styles.navButton}>‹</Text>
              </TouchableOpacity>
              <Text style={styles.monthYear}>{getMonthYear(selectedCalendarDate)}</Text>
              <TouchableOpacity onPress={() => navigateMonth('next')}>
                <Text style={styles.navButton}>›</Text>
              </TouchableOpacity>
            </View>

            {/* Calendar Grid */}
            <View style={styles.calendarContainer}>
              {/* Day Headers */}
              <View style={styles.dayHeadersRow}>
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                  <Text key={day} style={styles.dayHeader}>{day}</Text>
                ))}
              </View>
              
              {/* Date Grid */}
              <View style={styles.datesGrid}>
                {getDaysInMonth(selectedCalendarDate).map((date, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.dateCell,
                      !date && styles.emptyDateCell,
                      date && date.toDateString() === new Date().toDateString() && styles.todayDateCell
                    ]}
                    onPress={date ? () => handleDateSelect(date) : undefined}
                    disabled={!date}
                  >
                    <Text style={[
                      styles.dateText,
                      date && date.toDateString() === new Date().toDateString() && styles.todayDateText
                    ]}>
                      {date ? date.getDate() : ''}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setShowMoveOutDatePicker(false)}
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
            <Text style={styles.successMessage}>
              Tenant has been added successfully
            </Text>
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
    width: Math.max(40, screenWidth * 0.1),
    height: Math.max(40, screenHeight * 0.05),
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  backIcon: {
    width: Math.max(20, screenWidth * 0.055),
    height: Math.max(15, screenHeight * 0.025),
    transform: [{ rotate: '180deg' }],
    tintColor: '#000',
  },
  headerTitle: {
    flex: 1,
    fontSize: Math.max(16, Math.min(22, screenWidth * 0.045)),
    fontWeight: '600',
    color: '#171A1F',
    textAlign: 'center',
    marginRight: Math.max(40, screenWidth * 0.1),
    fontFamily: 'Montserrat-SemiBold',
  },
  stepIndicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Math.max(15, screenHeight * 0.018),
    gap: Math.max(8, screenWidth * 0.02),
  },
  stepDot: {
    width: Math.max(12, screenWidth * 0.03),
    height: Math.max(12, screenWidth * 0.03),
    borderRadius: Math.max(6, screenWidth * 0.015),
  },
  stepDotActive: {
    backgroundColor: '#FED232',
  },
  stepDotInactive: {
    backgroundColor: '#D1D5DB',
  },
  pageTitleContainer: {
    paddingHorizontal: Math.max(20, screenWidth * 0.05),
    paddingBottom: Math.max(12, screenHeight * 0.01),
  },
  pageTitle: {
    fontSize: Math.max(18, screenWidth * 0.045),
    fontWeight: '600',
    color: '#111827',
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
    paddingHorizontal: Math.max(20, screenWidth * 0.05),
    paddingVertical: Math.max(20, screenHeight * 0.025),
    backgroundColor: '#F8F9FA',
  },
  nextButton: {
    backgroundColor: '#FED232',
    borderRadius: Math.max(25, screenWidth * 0.063),
    paddingVertical: Math.max(15, screenHeight * 0.019),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Math.max(15, screenHeight * 0.02),
  },
  nextButtonText: {
    fontSize: Math.max(16, screenWidth * 0.04),
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
    maxWidth: 400,
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
  stepIndicatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepLine: {
    height: 3,
    width: Math.max(30, screenWidth * 0.3),
    marginHorizontal: Math.max(6, screenWidth * 0.015),
  },
  stepLineActive: {
    backgroundColor: '#FED232',
  },
  stepLineInactive: {
    backgroundColor: '#D1D5DB',
  },
  dateInput: {
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
  calendarIcon: {
    width: Math.max(16, screenWidth * 0.04),
    height: Math.max(16, screenWidth * 0.04),
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
  reminderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  toggle: {
    width: Math.max(50, screenWidth * 0.12),
    height: Math.max(28, screenHeight * 0.035),
    borderRadius: Math.max(14, screenHeight * 0.018),
    backgroundColor: '#E5E7EB',
    padding: 3,
    justifyContent: 'center',
  },
  toggleActive: {
    backgroundColor: '#FED232',
  },
  toggleKnob: {
    width: Math.max(22, screenHeight * 0.028),
    height: Math.max(22, screenHeight * 0.028),
    borderRadius: Math.max(11, screenHeight * 0.014),
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  toggleKnobActive: {
    alignSelf: 'flex-end',
  },
  datePickerContainer: {
    paddingVertical: Math.max(20, screenHeight * 0.025),
    alignItems: 'center',
  },
  datePickerText: {
    fontSize: Math.max(16, screenWidth * 0.04),
    fontFamily: 'Montserrat-Regular',
    color: '#111827',
    marginBottom: Math.max(15, screenHeight * 0.02),
    textAlign: 'center',
  },
  datePickerButton: {
    backgroundColor: '#FED232',
    borderRadius: Math.max(8, screenWidth * 0.02),
    paddingHorizontal: Math.max(20, screenWidth * 0.05),
    paddingVertical: Math.max(12, screenHeight * 0.015),
  },
  datePickerButtonText: {
    fontSize: Math.max(14, screenWidth * 0.035),
    fontFamily: 'Montserrat-SemiBold',
    color: '#111827',
    fontWeight: '600',
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
  calendarModalContent: {
    width: Math.min(screenWidth * 0.95, 380),
    maxWidth: 400,
  },
  monthNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Math.max(15, screenHeight * 0.02),
    paddingHorizontal: Math.max(10, screenWidth * 0.025),
  },
  navButton: {
    fontSize: Math.max(24, screenWidth * 0.06),
    fontFamily: 'Montserrat-SemiBold',
    color: '#FED232',
    paddingHorizontal: Math.max(15, screenWidth * 0.04),
  },
  monthYear: {
    fontSize: Math.max(16, screenWidth * 0.04),
    fontFamily: 'Montserrat-SemiBold',
    color: '#111827',
    fontWeight: '600',
  },
  calendarContainer: {
    paddingHorizontal: Math.max(5, screenWidth * 0.01),
  },
  dayHeadersRow: {
    flexDirection: 'row',
    paddingVertical: Math.max(10, screenHeight * 0.012),
  },
  dayHeader: {
    flex: 1,
    fontSize: Math.max(12, screenWidth * 0.03),
    fontFamily: 'Montserrat-Medium',
    color: '#6B7280',
    textAlign: 'center',
    fontWeight: '500',
  },
  datesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dateCell: {
    width: '14.28%', // 7 days per week
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Math.max(4, screenWidth * 0.01),
  },
  emptyDateCell: {
    backgroundColor: 'transparent',
  },
  todayDateCell: {
    backgroundColor: '#FED232',
  },
  dateText: {
    fontSize: Math.max(14, screenWidth * 0.035),
    fontFamily: 'Montserrat-Regular',
    color: '#111827',
  },
  todayDateText: {
    color: '#000000',
    fontFamily: 'Montserrat-SemiBold',
    fontWeight: '600',
  },
});