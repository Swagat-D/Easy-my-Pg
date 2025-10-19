import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Modal,
  FlatList,
  Platform,
} from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface DropdownOption {
  id: string;
  label: string;
  value: string;
}

interface RentalDetailsScreenProps {
  onBackPress?: () => void;
  rentalData?: {
    property: string;
    roomNo: string;
    joiningDate: string;
    moveOutDate: string;
    lockInPeriod: string;
    noticePeriod: string;
    agreementPeriod: string;
    rentalType: string;
    rentPrice: string;
    securityDeposit: string;
  };
}

export default function RentalDetailsScreen({ 
  onBackPress,
  rentalData = {
    property: 'Kalyani Nagar',
    roomNo: '102',
    joiningDate: '04102025',
    moveOutDate: '04072026',
    lockInPeriod: '6 Months',
    noticePeriod: '30 Days',
    agreementPeriod: '11 Months',
    rentalType: 'Monthly',
    rentPrice: '15000',
    securityDeposit: '30000',
  }
}: RentalDetailsScreenProps) {
  // Define options first
  const propertyOptions: DropdownOption[] = [
    { id: '1', label: 'Kalyani Nagar', value: 'kalyani_nagar' },
    { id: '2', label: 'Sunrise Apartments', value: 'sunrise' },
    { id: '3', label: 'Green Valley Heights', value: 'green_valley' },
    { id: '4', label: 'Metro Plaza', value: 'metro_plaza' },
  ];

  const roomOptions: DropdownOption[] = [
    { id: '1', label: '101', value: 'room_101' },
    { id: '2', label: '102', value: 'room_102' },
    { id: '3', label: '201', value: 'room_201' },
    { id: '4', label: '301', value: 'room_301' },
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

  // Function to format date from DDMMYYYY to DD/MM/YYYY
  const formatDateDisplay = (dateString: string) => {
    if (dateString.length === 8) {
      const day = dateString.substring(0, 2);
      const month = dateString.substring(2, 4);
      const year = dateString.substring(4, 8);
      return `${day}/${month}/${year}`;
    }
    return dateString;
  };

  // Function to remove slashes from date
  const removeDateSlashes = (dateString: string) => {
    return dateString.replace(/\//g, '');
  };

  // Pre-populate state with existing data
  const [property, setProperty] = useState<DropdownOption | null>(
    propertyOptions.find(option => option.label === rentalData.property) || null
  );
  const [roomNo, setRoomNo] = useState<DropdownOption | null>(
    roomOptions.find(option => option.label === rentalData.roomNo) || null
  );
  const [joiningDate, setJoiningDate] = useState(rentalData.joiningDate);
  const [moveOutDate, setMoveOutDate] = useState(rentalData.moveOutDate);
  const [lockInPeriod, setLockInPeriod] = useState<DropdownOption | null>(
    lockInOptions.find(option => option.label === rentalData.lockInPeriod) || null
  );
  const [noticePeriod, setNoticePeriod] = useState<DropdownOption | null>(
    noticeOptions.find(option => option.label === rentalData.noticePeriod) || null
  );
  const [agreementPeriod, setAgreementPeriod] = useState<DropdownOption | null>(
    agreementOptions.find(option => option.label === rentalData.agreementPeriod) || null
  );
  const [rentalType, setRentalType] = useState<DropdownOption | null>(
    rentalTypeOptions.find(option => option.label === rentalData.rentalType) || null
  );
  const [rentPrice, setRentPrice] = useState(rentalData.rentPrice);
  const [securityDeposit, setSecurityDeposit] = useState(rentalData.securityDeposit);

  const [showPropertyModal, setShowPropertyModal] = useState(false);
  const [showRoomModal, setShowRoomModal] = useState(false);
  const [showLockInModal, setShowLockInModal] = useState(false);
  const [showNoticeModal, setShowNoticeModal] = useState(false);
  const [showAgreementModal, setShowAgreementModal] = useState(false);
  const [showRentalTypeModal, setShowRentalTypeModal] = useState(false);
  const [showJoiningDatePicker, setShowJoiningDatePicker] = useState(false);
  const [showMoveOutDatePicker, setShowMoveOutDatePicker] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Calendar state variables (from AddTenantScreen)
  const [selectedCalendarDate, setSelectedCalendarDate] = useState(new Date());
  const [calendarMode, setCalendarMode] = useState<'joining' | 'moveout'>('joining');

  // Date picker functions (from AddTenantScreen)
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const getMonthYear = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const handleDateSelect = (date: Date) => {
    const formattedDate = formatDate(date);
    const numericDate = formattedDate.replace(/\//g, ''); // Convert DD/MM/YYYY to DDMMYYYY
    
    if (calendarMode === 'joining') {
      setJoiningDate(numericDate);
      setShowJoiningDatePicker(false);
    } else {
      setMoveOutDate(numericDate);
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

  // Handle date input change with automatic formatting
  const handleJoiningDateChange = (text: string) => {
    // Remove any non-numeric characters
    const numericText = text.replace(/[^0-9]/g, '');
    
    // Limit to 8 digits (DDMMYYYY)
    const limitedText = numericText.substring(0, 8);
    
    setJoiningDate(limitedText);
  };

  const handleMoveOutDateChange = (text: string) => {
    // Remove any non-numeric characters
    const numericText = text.replace(/[^0-9]/g, '');
    
    // Limit to 8 digits (DDMMYYYY)
    const limitedText = numericText.substring(0, 8);
    
    setMoveOutDate(limitedText);
  };

  const handleSave = () => {
    setErrorMessage(''); // Clear any previous errors
    
    // Validation
    if (!property) {
      setErrorMessage('Please select property');
      return;
    }
    if (!roomNo) {
      setErrorMessage('Please select room number');
      return;
    }
    if (!joiningDate.trim()) {
      setErrorMessage('Please enter joining date');
      return;
    }
    if (!moveOutDate.trim()) {
      setErrorMessage('Please enter move out date');
      return;
    }
    if (!rentPrice.trim()) {
      setErrorMessage('Please enter rent price');
      return;
    }
    if (!securityDeposit.trim()) {
      setErrorMessage('Please enter security deposit');
      return;
    }
    
    console.log('Updating rental details');
    console.log('Updated rental data:', {
      property: property?.label,
      roomNo: roomNo?.label,
      joiningDate: formatDateDisplay(joiningDate),
      moveOutDate: formatDateDisplay(moveOutDate),
      lockInPeriod: lockInPeriod?.label,
      noticePeriod: noticePeriod?.label,
      agreementPeriod: agreementPeriod?.label,
      rentalType: rentalType?.label,
      rentPrice,
      securityDeposit,
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
        <Text style={styles.headerTitle}>Rental Details</Text>
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
          {/* Property and Room No Row */}
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
                <Text style={styles.dropdownArrowText}>▼</Text>
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
                <Text style={styles.dropdownArrowText}>▼</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Joining Date and Move Out Date Row */}
          <View style={styles.fieldRow}>
            <View style={styles.halfFieldContainer}>
              <Text style={styles.fieldLabel}>Joining Date</Text>
              <TouchableOpacity
                style={styles.dateInput}
                onPress={handleJoiningDateOpen}
              >
                <Text style={[styles.dropdownText, !joiningDate && styles.placeholderText]}>
                  {joiningDate ? formatDateDisplay(joiningDate) : 'Select'}
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
                  {moveOutDate ? formatDateDisplay(moveOutDate) : 'Select'}
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
                <Text style={styles.dropdownArrowText}>▼</Text>
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
                <Text style={styles.dropdownArrowText}>▼</Text>
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
              <Text style={styles.dropdownArrowText}>▼</Text>
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
              <Text style={styles.dropdownArrowText}>▼</Text>
            </TouchableOpacity>
          </View>

          {/* Rent Price */}
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Rent Price</Text>
            <View style={styles.priceInputContainer}>
              <TextInput
                style={styles.priceTextInput}
                value={rentPrice}
                onChangeText={setRentPrice}
                placeholder="15000"
                placeholderTextColor="#9CA3AF"
                keyboardType="numeric"
              />
              <Image
                source={require('../assets/Edit.png')}
                style={styles.editIcon}
              />
            </View>
          </View>

          {/* Security Deposit */}
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Security Deposit</Text>
            <View style={styles.priceInputContainer}>
              <TextInput
                style={styles.priceTextInput}
                value={securityDeposit}
                onChangeText={setSecurityDeposit}
                placeholder="30000"
                placeholderTextColor="#9CA3AF"
                keyboardType="numeric"
              />
              <Image
                source={require('../assets/Edit.png')}
                style={styles.editIcon}
              />
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
              <Text style={styles.modalCloseText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Room No Modal */}
      <Modal visible={showRoomModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Room Number</Text>
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
              <Text style={styles.modalCloseText}>Close</Text>
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
              <Text style={styles.modalCloseText}>Close</Text>
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
              <Text style={styles.modalCloseText}>Close</Text>
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
              <Text style={styles.modalCloseText}>Close</Text>
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
              <Text style={styles.modalCloseText}>Close</Text>
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

            <View style={styles.calendarContainer}>
              {/* Day Headers */}
              <View style={styles.dayHeadersRow}>
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <Text key={day} style={styles.dayHeader}>{day}</Text>
                ))}
              </View>

              {/* Calendar Dates */}
              <View style={styles.datesGrid}>
                {getDaysInMonth(selectedCalendarDate).map((date, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.dateCell,
                      date === null && styles.emptyDateCell,
                      date && date.toDateString() === new Date().toDateString() && styles.todayDateCell
                    ]}
                    onPress={() => date && handleDateSelect(date)}
                    disabled={date === null}
                  >
                    {date && (
                      <Text style={[
                        styles.dateText,
                        date.toDateString() === new Date().toDateString() && styles.todayDateText
                      ]}>
                        {date.getDate()}
                      </Text>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setShowJoiningDatePicker(false)}
            >
              <Text style={styles.modalCloseText}>Close</Text>
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

            <View style={styles.calendarContainer}>
              {/* Day Headers */}
              <View style={styles.dayHeadersRow}>
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <Text key={day} style={styles.dayHeader}>{day}</Text>
                ))}
              </View>

              {/* Calendar Dates */}
              <View style={styles.datesGrid}>
                {getDaysInMonth(selectedCalendarDate).map((date, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.dateCell,
                      date === null && styles.emptyDateCell,
                      date && date.toDateString() === new Date().toDateString() && styles.todayDateCell
                    ]}
                    onPress={() => date && handleDateSelect(date)}
                    disabled={date === null}
                  >
                    {date && (
                      <Text style={[
                        styles.dateText,
                        date.toDateString() === new Date().toDateString() && styles.todayDateText
                      ]}>
                        {date.getDate()}
                      </Text>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setShowMoveOutDatePicker(false)}
            >
              <Text style={styles.modalCloseText}>Close</Text>
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
            <Text style={styles.successMessage}>Rental details updated successfully</Text>
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
  dropdownArrowText: {
    fontSize: Math.max(12, screenWidth * 0.03),
    color: '#9CA3AF',
  },
  priceInputContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: Math.max(8, screenWidth * 0.02),
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    paddingHorizontal: Math.max(16, screenWidth * 0.04),
    paddingVertical: Math.max(2, screenHeight * 0.002),
  },
  currencyCode: {
    backgroundColor: '#FFECA7',
    paddingHorizontal: Math.max(12, screenWidth * 0.04),
    paddingVertical: Math.max(12, screenHeight * 0.015),
    justifyContent: 'center',
    alignItems: 'center',
  },
  currencyCodeText: {
    fontSize: Math.max(14, screenWidth * 0.035),
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Montserrat-SemiBold',
  },
  priceInput: {
    flex: 1,
    paddingHorizontal: Math.max(16, screenWidth * 0.04),
    paddingVertical: Math.max(12, screenHeight * 0.015),
    fontSize: Math.max(14, screenWidth * 0.035),
    fontFamily: 'Montserrat-Regular',
    color: '#111827',
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
  dateInputContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: Math.max(8, screenWidth * 0.02),
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    paddingRight: Math.max(12, screenWidth * 0.03),
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
    tintColor: '#000000',
  },
  priceTextInput: {
    flex: 1,
    paddingVertical: Math.max(12, screenHeight * 0.015),
    paddingHorizontal: 0,
    fontSize: Math.max(14, screenWidth * 0.035),
    fontFamily: 'Montserrat-Regular',
    color: '#111827',
    textAlignVertical: 'center',
  },
  inputWithIcon: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: Math.max(8, screenWidth * 0.02),
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    paddingRight: Math.max(12, screenWidth * 0.03),
  },
  editIcon: {
    width: Math.max(16, screenWidth * 0.04),
    height: Math.max(16, screenWidth * 0.04),
    tintColor: '#9CA3AF',
    marginLeft: Math.max(8, screenWidth * 0.02),
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