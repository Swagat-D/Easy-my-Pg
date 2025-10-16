import React, { useState, useRef, useEffect } from 'react';
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
  Platform,
  KeyboardAvoidingView,
  Keyboard
} from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface Property {
  id: string;
  name: string;
}

interface Room {
  id: string;
  name: string;
  property: string;
}

interface DropdownOption {
  id: string;
  label: string;
  value: string;
}

interface AddTenantScreenProps {
  onBackPress?: () => void;
}

export default function AddTenantScreen({ onBackPress }: AddTenantScreenProps) {
  // TextInput refs for focus management
  const fixedRentRef = useRef<TextInput>(null);
  const securityDepositRef = useRef<TextInput>(null);
  const advanceAmountRef = useRef<TextInput>(null);
  const bookingAmountRef = useRef<TextInput>(null);
  const scrollViewRef = useRef<ScrollView>(null);

  // Keyboard state
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  // Form state
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [altPhone, setAltPhone] = useState('');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [moveInDate, setMoveInDate] = useState('');
  const [moveOutDate, setMoveOutDate] = useState('');
  const [lockInPeriod, setLockInPeriod] = useState<DropdownOption | null>(null);
  const [noticePeriod, setNoticePeriod] = useState<DropdownOption | null>(null);
  const [agreementPeriod, setAgreementPeriod] = useState<DropdownOption | null>(null);
  
  // New state for additional fields
  const [rentalFrequency, setRentalFrequency] = useState<DropdownOption | null>(null);
  const [addRentOn, setAddRentOn] = useState<DropdownOption | null>(null);
  const [fixedRent, setFixedRent] = useState('');
  const [securityDeposit, setSecurityDeposit] = useState('');
  const [roomElectricityMeter, setRoomElectricityMeter] = useState('');
  const [tenantElectricityMeter, setTenantElectricityMeter] = useState('');
  const [bookedBy, setBookedBy] = useState<DropdownOption | null>(null);
  const [advanceAmount, setAdvanceAmount] = useState('');
  const [bookingAmount, setBookingAmount] = useState('');

  // Keyboard listeners
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener?.remove();
      keyboardDidHideListener?.remove();
    };
  }, []);

  // Modal states
  const [showPropertyModal, setShowPropertyModal] = useState(false);
  const [showRoomModal, setShowRoomModal] = useState(false);
  const [showLockInModal, setShowLockInModal] = useState(false);
  const [showNoticeModal, setShowNoticeModal] = useState(false);
  const [showAgreementModal, setShowAgreementModal] = useState(false);
  const [showRentalFrequencyModal, setShowRentalFrequencyModal] = useState(false);
  const [showAddRentOnModal, setShowAddRentOnModal] = useState(false);
  const [showBookedByModal, setShowBookedByModal] = useState(false);
  
  // Date picker states
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [datePickerType, setDatePickerType] = useState('');
  const [currentDatePickerDate, setCurrentDatePickerDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  
  // Custom popup states
  const [showCustomPopup, setShowCustomPopup] = useState(false);
  const [popupTitle, setPopupTitle] = useState('');
  const [popupMessage, setPopupMessage] = useState('');
  const [popupType, setPopupType] = useState('info');
  const [showInputPopup, setShowInputPopup] = useState(false);
  const [inputPopupTitle, setInputPopupTitle] = useState('');
  const [inputPopupValue, setInputPopupValue] = useState('');
  const [inputPopupCallback, setInputPopupCallback] = useState<(value: string) => void>(() => {});

  // Data arrays
  const properties: Property[] = [
    { id: '1', name: 'Sunrise Apartments' },
    { id: '2', name: 'Green Valley Heights' },
    { id: '3', name: 'Metro Plaza' },
  ];

  const rooms: Room[] = [
    { id: '1', name: 'Room 101', property: '1' },
    { id: '2', name: 'Room 102', property: '1' },
    { id: '3', name: 'Room 201', property: '2' },
    { id: '4', name: 'Room 301', property: '3' },
  ];

  const lockInOptions: DropdownOption[] = [
    { id: '1', label: '3 Months', value: '3' },
    { id: '2', label: '6 Months', value: '6' },
    { id: '3', label: '12 Months', value: '12' },
  ];

  const noticePeriodOptions: DropdownOption[] = [
    { id: '1', label: '15 Days', value: '15' },
    { id: '2', label: '30 Days', value: '30' },
    { id: '3', label: '60 Days', value: '60' },
  ];

  const agreementPeriodOptions: DropdownOption[] = [
    { id: '1', label: '11 Months', value: '11' },
    { id: '2', label: '1 Year', value: '12' },
    { id: '3', label: '2 Years', value: '24' },
  ];

  const rentalFrequencyOptions: DropdownOption[] = [
    { id: '1', label: 'Monthly', value: 'monthly' },
    { id: '2', label: 'Quarterly', value: 'quarterly' },
    { id: '3', label: 'Half Yearly', value: 'half-yearly' },
    { id: '4', label: 'Yearly', value: 'yearly' },
  ];

  const addRentOnOptions: DropdownOption[] = [
    { id: '1', label: 'Room/Flat', value: 'room' },
    { id: '2', label: 'Bed', value: 'bed' },
  ];

  const bookedByOptions: DropdownOption[] = [
    { id: '1', label: 'Self', value: 'self' },
    { id: '2', label: 'Agent', value: 'agent' },
    { id: '3', label: 'Referral', value: 'referral' },
  ];

  // Utility functions
  const showCustomAlert = (title: string, message: string, type: 'info' | 'error' | 'success' = 'info') => {
    setPopupTitle(title);
    setPopupMessage(message);
    setPopupType(type);
    setShowCustomPopup(true);
  };

  const showInputAlert = (title: string, defaultValue: string, callback: (value: string) => void) => {
    setInputPopupTitle(title);
    setInputPopupValue(defaultValue);
    setInputPopupCallback(() => callback);
    setShowInputPopup(true);
  };

  // Date picker functions
  const openDatePicker = (type: string) => {
    setDatePickerType(type);
    const today = new Date();
    setCurrentDatePickerDate(today);
    setSelectedDay(today.getDate().toString());
    setSelectedMonth((today.getMonth() + 1).toString());
    setSelectedYear(today.getFullYear().toString());
    setShowDatePicker(true);
  };

  const handleDateSelect = () => {
    if (!selectedDay || !selectedMonth || !selectedYear) {
      showCustomAlert('Invalid Date', 'Please select day, month and year.', 'error');
      return;
    }

    const day = parseInt(selectedDay);
    const month = parseInt(selectedMonth);
    const year = parseInt(selectedYear);

    // Validate date
    if (day < 1 || day > 31 || month < 1 || month > 12 || year < 1900 || year > 2100) {
      showCustomAlert('Invalid Date', 'Please enter a valid date.', 'error');
      return;
    }

    // Check if date is valid for the month
    const daysInMonth = new Date(year, month, 0).getDate();
    if (day > daysInMonth) {
      showCustomAlert('Invalid Date', `${getMonthName(month)} ${year} has only ${daysInMonth} days.`, 'error');
      return;
    }

    const formattedDate = `${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year}`;
    
    if (datePickerType === 'moveIn') {
      setMoveInDate(formattedDate);
    } else if (datePickerType === 'moveOut') {
      setMoveOutDate(formattedDate);
    }
    
    setShowDatePicker(false);
  };

  const getMonthName = (month: number) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June',
                   'July', 'August', 'September', 'October', 'November', 'December'];
    return months[month - 1];
  };

  const generateDays = () => {
    const days = [];
    for (let i = 1; i <= 31; i++) {
      days.push(i.toString());
    }
    return days;
  };

  const generateMonths = () => {
    const months = [];
    for (let i = 1; i <= 12; i++) {
      months.push({ value: i.toString(), label: getMonthName(i) });
    }
    return months;
  };

  const generateYears = () => {
    const years = [];
    const currentYear = new Date().getFullYear();
    for (let i = currentYear - 5; i <= currentYear + 10; i++) {
      years.push(i.toString());
    }
    return years;
  };

  // Currency formatting
  const formatCurrency = (value: string) => {
    const number = value.replace(/[^\d]/g, '');
    if (number.length === 0) return '';
    
    const formatted = new Intl.NumberFormat('en-IN').format(parseInt(number));
    return `₹ ${formatted}`;
  };

  const handleCurrencyChange = (value: string, setter: (value: string) => void) => {
    const cleanValue = value.replace(/[^\d]/g, '');
    setter(cleanValue);
  };

  // Get available rooms for selected property
  const getAvailableRooms = () => {
    if (!selectedProperty) return [];
    return rooms.filter(room => room.property === selectedProperty.id);
  };

  const handleSubmit = () => {
    if (!name.trim()) {
      showCustomAlert('Missing Information', 'Please enter tenant name.', 'error');
      return;
    }
    
    if (!phone.trim()) {
      showCustomAlert('Missing Information', 'Please enter phone number.', 'error');
      return;
    }
    
    if (!selectedProperty) {
      showCustomAlert('Missing Information', 'Please select a property.', 'error');
      return;
    }
    
    if (!selectedRoom) {
      showCustomAlert('Missing Information', 'Please select a room.', 'error');
      return;
    }
    
    showCustomAlert('Success', 'Tenant added successfully!', 'success');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#FED232" barStyle="dark-content" />
      
      {/* Top Navigation */}
      <View style={styles.topNavbar}>
        <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
          <Image
            source={require('../assets/right-arrow.png')}
            style={styles.backArrowImage}
          />
        </TouchableOpacity>
        <Text style={styles.navTitle}>Add Tenant</Text>
      </View>

      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={0}
      >
        <ScrollView 
          ref={scrollViewRef}
          style={styles.scrollContent}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 10
          }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          nestedScrollEnabled={true}
        >
          {/* Container 1: Personal Information */}
          <View style={styles.sectionContainer}>
            <View style={styles.fieldRow}>
              <Text style={styles.fieldLabel}>Name</Text>
              <View style={styles.fieldInputContainer}>
                <TextInput
                  style={styles.fieldInput}
                  value={name}
                  onChangeText={setName}
                  placeholder="Enter name"
                  placeholderTextColor="#9CA3AF"
                />
              </View>
            </View>

            <View style={styles.fieldRow}>
              <Text style={styles.fieldLabel}>Phone Number</Text>
              <View style={styles.fieldInputContainer}>
                <TextInput
                  style={styles.fieldInput}
                  value={phone}
                  onChangeText={setPhone}
                  placeholder="Enter phone number"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="numeric"
                  maxLength={10}
                />
                <TouchableOpacity style={styles.fieldIcon}>
                  <Image
                    source={require('../assets/icons/user-plus.png')}
                    style={styles.iconImage}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.fieldRow}>
              <Text style={styles.fieldLabel}>Alt. Phone Number</Text>
              <View style={styles.fieldInputContainer}>
                <TextInput
                  style={styles.fieldInput}
                  value={altPhone}
                  onChangeText={setAltPhone}
                  placeholder="Enter alternate number"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="numeric"
                  maxLength={10}
                />
                <TouchableOpacity style={styles.fieldIcon}>
                  <Image
                    source={require('../assets/icons/user-plus.png')}
                    style={styles.iconImage}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Container 2: Property & Room */}
          <View style={styles.sectionContainer}>
            <View style={styles.fieldRow}>
              <Text style={styles.fieldLabel}>Property</Text>
              <TouchableOpacity 
                style={styles.fieldDropdownContainer}
                onPress={() => setShowPropertyModal(true)}
              >
                <Text style={[styles.fieldDropdownText, !selectedProperty && styles.placeholderText]}>
                  {selectedProperty ? selectedProperty.name : 'Select property'}
                </Text>
                <Image
                  source={require('../assets/dropdown-arrow.png')}
                  style={styles.dropdownArrow}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.fieldRow}>
              <Text style={styles.fieldLabel}>Room/Flat</Text>
              <TouchableOpacity 
                style={styles.fieldDropdownContainer}
                onPress={() => {
                  if (selectedProperty) {
                    setShowRoomModal(true);
                  } else {
                    showCustomAlert('Select Property', 'Please select a property first.', 'error');
                  }
                }}
              >
                <Text style={[styles.fieldDropdownText, !selectedRoom && styles.placeholderText]}>
                  {selectedRoom ? selectedRoom.name : 'Select room'}
                </Text>
                <Image
                  source={require('../assets/dropdown-arrow.png')}
                  style={styles.dropdownArrow}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Container 3: Move In & Move Out Dates */}
          <View style={styles.sectionContainer}>
            <View style={styles.fieldRow}>
              <Text style={styles.fieldLabel}>Move In Date</Text>
              <TouchableOpacity 
                style={styles.fieldDropdownContainer}
                onPress={() => openDatePicker('moveIn')}
              >
                <Text style={[styles.fieldDropdownText, !moveInDate && styles.placeholderText]}>
                  {moveInDate || 'Select date'}
                </Text>
                <Image
                  source={require('../assets/calendar.png')}
                  style={styles.iconImage}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.fieldRow}>
              <Text style={styles.fieldLabel}>Move Out Date</Text>
              <TouchableOpacity 
                style={styles.fieldDropdownContainer}
                onPress={() => openDatePicker('moveOut')}
              >
                <Text style={[styles.fieldDropdownText, !moveOutDate && styles.placeholderText]}>
                  {moveOutDate || 'Select date'}
                </Text>
                <Image
                  source={require('../assets/calendar.png')}
                  style={styles.iconImage}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Container 4: Lock In, Notice & Agreement Periods */}
          <View style={styles.sectionContainer}>
            <View style={styles.fieldRow}>
              <Text style={styles.fieldLabel}>Lock In Period</Text>
              <TouchableOpacity 
                style={styles.fieldDropdownContainer}
                onPress={() => setShowLockInModal(true)}
              >
                <Text style={[styles.fieldDropdownText, !lockInPeriod && styles.placeholderText]}>
                  {lockInPeriod ? lockInPeriod.label : 'Select period'}
                </Text>
                <Image
                  source={require('../assets/dropdown-arrow.png')}
                  style={styles.dropdownArrow}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.fieldRow}>
              <Text style={styles.fieldLabel}>Notice Period</Text>
              <TouchableOpacity 
                style={styles.fieldDropdownContainer}
                onPress={() => setShowNoticeModal(true)}
              >
                <Text style={[styles.fieldDropdownText, !noticePeriod && styles.placeholderText]}>
                  {noticePeriod ? noticePeriod.label : 'Select period'}
                </Text>
                <Image
                  source={require('../assets/dropdown-arrow.png')}
                  style={styles.dropdownArrow}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.fieldRow}>
              <Text style={styles.fieldLabel}>Agreement Period</Text>
              <TouchableOpacity 
                style={styles.fieldDropdownContainer}
                onPress={() => setShowAgreementModal(true)}
              >
                <Text style={[styles.fieldDropdownText, !agreementPeriod && styles.placeholderText]}>
                  {agreementPeriod ? agreementPeriod.label : 'Select period'}
                </Text>
                <Image
                  source={require('../assets/dropdown-arrow.png')}
                  style={styles.dropdownArrow}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Container 5: Rental Information */}
          <View style={styles.sectionContainer}>
            <View style={styles.fieldRow}>
              <Text style={styles.fieldLabel}>Rental Frequency</Text>
              <TouchableOpacity 
                style={styles.fieldDropdownContainer}
                onPress={() => setShowRentalFrequencyModal(true)}
              >
                <Text style={[styles.fieldDropdownText, !rentalFrequency && styles.placeholderText]}>
                  {rentalFrequency ? rentalFrequency.label : 'Select frequency'}
                </Text>
                <Image
                  source={require('../assets/dropdown-arrow.png')}
                  style={styles.dropdownArrow}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.fieldRow}>
              <Text style={styles.fieldLabel}>Add Rent On</Text>
              <TouchableOpacity 
                style={styles.fieldDropdownContainer}
                onPress={() => {
                  if (rentalFrequency) {
                    setShowAddRentOnModal(true);
                  } else {
                    showCustomAlert('Select Rental Frequency', 'Please select rental frequency first.', 'error');
                  }
                }}
              >
                <Text style={[styles.fieldDropdownText, !addRentOn && styles.placeholderText]}>
                  {addRentOn ? addRentOn.label : 'Select option'}
                </Text>
                <Image
                  source={require('../assets/dropdown-arrow.png')}
                  style={styles.dropdownArrow}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.fieldRow}>
              <Text style={styles.fieldLabel}>Fixed Rent</Text>
              <View style={styles.fieldInputContainer}>
                <TextInput
                  ref={fixedRentRef}
                  style={styles.fieldInput}
                  value={fixedRent ? formatCurrency(fixedRent) : ''}
                  onChangeText={(value) => handleCurrencyChange(value, setFixedRent)}
                  placeholder="Enter amount"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="numeric"
                  onFocus={() => {
                    setTimeout(() => {
                      scrollViewRef.current?.scrollTo({ y: 400, animated: true });
                    }, 100);
                  }}
                />
                <TouchableOpacity 
                  style={styles.fieldIcon}
                  onPress={() => fixedRentRef.current?.focus()}
                >
                  <Image
                    source={require('../assets/icons/banknote.png')}
                    style={styles.iconImage}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.fieldRow}>
              <Text style={styles.fieldLabel}>Security Deposit</Text>
              <View style={styles.fieldInputContainer}>
                <TextInput
                  ref={securityDepositRef}
                  style={styles.fieldInput}
                  value={securityDeposit ? formatCurrency(securityDeposit) : ''}
                  onChangeText={(value) => handleCurrencyChange(value, setSecurityDeposit)}
                  placeholder="Enter amount"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="numeric"
                  onFocus={() => {
                    setTimeout(() => {
                      scrollViewRef.current?.scrollTo({ y: 450, animated: true });
                    }, 100);
                  }}
                />
                <TouchableOpacity 
                  style={styles.fieldIcon}
                  onPress={() => securityDepositRef.current?.focus()}
                >
                  <Image
                    source={require('../assets/icons/banknote.png')}
                    style={styles.iconImage}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Container 6: Additional Information */}
          <View style={styles.sectionContainer}>
            <View style={styles.fieldRow}>
              <Text style={styles.fieldLabel}>Room Electricity Meter</Text>
              <View style={styles.fieldInputContainer}>
                <TextInput
                  style={styles.fieldInput}
                  value={roomElectricityMeter}
                  onChangeText={setRoomElectricityMeter}
                  placeholder="Enter meter reading"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="numeric"
                  onFocus={() => {
                    setTimeout(() => {
                      scrollViewRef.current?.scrollToEnd({ animated: true });
                    }, 100);
                  }}
                />
              </View>
            </View>

            <View style={styles.fieldRow}>
              <Text style={styles.fieldLabel}>Tenant Electricity Meter</Text>
              <View style={styles.fieldInputContainer}>
                <TextInput
                  style={styles.fieldInput}
                  value={tenantElectricityMeter}
                  onChangeText={setTenantElectricityMeter}
                  placeholder="Enter meter reading"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="numeric"
                  onFocus={() => {
                    setTimeout(() => {
                      scrollViewRef.current?.scrollToEnd({ animated: true });
                    }, 100);
                  }}
                />
              </View>
            </View>

            <View style={styles.fieldRow}>
              <Text style={styles.fieldLabel}>Booked By</Text>
              <TouchableOpacity 
                style={styles.fieldDropdownContainer}
                onPress={() => setShowBookedByModal(true)}
              >
                <Text style={[styles.fieldDropdownText, !bookedBy && styles.placeholderText]}>
                  {bookedBy ? bookedBy.label : 'Select option'}
                </Text>
                <Image
                  source={require('../assets/dropdown-arrow.png')}
                  style={styles.dropdownArrow}
                />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        {/* Bottom Button */}
        <View style={[styles.bottomButtonContainer, isKeyboardVisible && { display: 'none' }]}>
          <TouchableOpacity style={styles.addTenantButton} onPress={handleSubmit}>
            <Text style={styles.addTenantButtonText}>Add Tenant</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      {/* Property Modal */}
      <Modal visible={showPropertyModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Property</Text>
            <FlatList
              data={properties}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalOption}
                  onPress={() => {
                    setSelectedProperty(item);
                    setSelectedRoom(null); // Reset room when property changes
                    setShowPropertyModal(false);
                  }}
                >
                  <Text style={styles.modalOptionText}>{item.name}</Text>
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
              data={getAvailableRooms()}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalOption}
                  onPress={() => {
                    setSelectedRoom(item);
                    setShowRoomModal(false);
                  }}
                >
                  <Text style={styles.modalOptionText}>{item.name}</Text>
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

      {/* Rental Frequency Modal */}
      <Modal visible={showRentalFrequencyModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Rental Frequency</Text>
            <FlatList
              data={rentalFrequencyOptions}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalOption}
                  onPress={() => {
                    setRentalFrequency(item);
                    setAddRentOn(null); // Reset add rent on when frequency changes
                    setShowRentalFrequencyModal(false);
                  }}
                >
                  <Text style={styles.modalOptionText}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setShowRentalFrequencyModal(false)}
            >
              <Text style={styles.modalCloseText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Add Rent On Modal */}
      <Modal visible={showAddRentOnModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Rent On</Text>
            <FlatList
              data={addRentOnOptions}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalOption}
                  onPress={() => {
                    setAddRentOn(item);
                    setShowAddRentOnModal(false);
                  }}
                >
                  <Text style={styles.modalOptionText}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setShowAddRentOnModal(false)}
            >
              <Text style={styles.modalCloseText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Lock In Period Modal */}
      <Modal visible={showLockInModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Lock In Period</Text>
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
              data={noticePeriodOptions}
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
              data={agreementPeriodOptions}
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

      {/* Booked By Modal */}
      <Modal visible={showBookedByModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Booked By</Text>
            <FlatList
              data={bookedByOptions}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalOption}
                  onPress={() => {
                    setBookedBy(item);
                    setShowBookedByModal(false);
                  }}
                >
                  <Text style={styles.modalOptionText}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setShowBookedByModal(false)}
            >
              <Text style={styles.modalCloseText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Date Picker Modal */}
      <Modal visible={showDatePicker} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Select {datePickerType === 'moveIn' ? 'Move In' : 'Move Out'} Date
            </Text>
            
            {/* Calendar-style Date Picker */}
            <View style={styles.datePickerContainer}>
              {/* Day Selector */}
              <View style={styles.datePickerSection}>
                <Text style={styles.datePickerLabel}>Day</Text>
                <ScrollView style={styles.datePickerScroll} showsVerticalScrollIndicator={false}>
                  {generateDays().map((day) => (
                    <TouchableOpacity
                      key={day}
                      style={[
                        styles.datePickerOption,
                        selectedDay === day && styles.selectedDateOption
                      ]}
                      onPress={() => setSelectedDay(day)}
                    >
                      <Text style={[
                        styles.datePickerOptionText,
                        selectedDay === day && styles.selectedDateOptionText
                      ]}>
                        {day}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              {/* Month Selector */}
              <View style={styles.datePickerSection}>
                <Text style={styles.datePickerLabel}>Month</Text>
                <ScrollView style={styles.datePickerScroll} showsVerticalScrollIndicator={false}>
                  {generateMonths().map((month) => (
                    <TouchableOpacity
                      key={month.value}
                      style={[
                        styles.datePickerOption,
                        selectedMonth === month.value && styles.selectedDateOption
                      ]}
                      onPress={() => setSelectedMonth(month.value)}
                    >
                      <Text style={[
                        styles.datePickerOptionText,
                        selectedMonth === month.value && styles.selectedDateOptionText
                      ]}>
                        {month.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              {/* Year Selector */}
              <View style={styles.datePickerSection}>
                <Text style={styles.datePickerLabel}>Year</Text>
                <ScrollView style={styles.datePickerScroll} showsVerticalScrollIndicator={false}>
                  {generateYears().map((year) => (
                    <TouchableOpacity
                      key={year}
                      style={[
                        styles.datePickerOption,
                        selectedYear === year && styles.selectedDateOption
                      ]}
                      onPress={() => setSelectedYear(year)}
                    >
                      <Text style={[
                        styles.datePickerOptionText,
                        selectedYear === year && styles.selectedDateOptionText
                      ]}>
                        {year}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>

            {/* Selected Date Preview */}
            <View style={styles.selectedDatePreview}>
              <Text style={styles.selectedDateText}>
                Selected: {selectedDay && selectedMonth && selectedYear ? 
                  `${selectedDay}-${selectedMonth}-${selectedYear}` : 
                  'No date selected'}
              </Text>
            </View>

            {/* Action Buttons */}
            <View style={styles.datePickerActions}>
              <TouchableOpacity
                style={[styles.modalCloseButton, { flex: 1, backgroundColor: '#F3F4F6', marginRight: 10, marginTop: 0 }]}
                onPress={() => setShowDatePicker(false)}
              >
                <Text style={styles.modalCloseText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalCloseButton, { flex: 1, backgroundColor: '#FED232', marginTop: 0 }]}
                onPress={handleDateSelect}
              >
                <Text style={[styles.modalCloseText, { color: '#000' }]}>Select</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Custom Alert Popup */}
      <Modal visible={showCustomPopup} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={[styles.modalTitle, {
              color: popupType === 'error' ? '#EF4444' : 
                     popupType === 'success' ? '#10B981' : '#374151'
            }]}>
              {popupTitle}
            </Text>
            <Text style={{
              fontSize: 14,
              fontFamily: 'Montserrat-Regular',
              color: '#6B7280',
              textAlign: 'center',
              marginBottom: 20,
              lineHeight: 20
            }}>
              {popupMessage}
            </Text>
            <TouchableOpacity
              style={[styles.modalCloseButton, {
                backgroundColor: popupType === 'error' ? '#FEE2E2' :
                               popupType === 'success' ? '#ECFDF5' : '#F3F4F6'
              }]}
              onPress={() => setShowCustomPopup(false)}
            >
              <Text style={[styles.modalCloseText, {
                color: popupType === 'error' ? '#EF4444' :
                       popupType === 'success' ? '#10B981' : '#6B7280'
              }]}>
                OK
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Input Popup */}
      <Modal visible={showInputPopup} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{inputPopupTitle}</Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: '#DEE1E6',
                borderRadius: 8,
                padding: 12,
                marginBottom: 20,
                fontSize: 14,
                fontFamily: 'Montserrat-Regular'
              }}
              value={inputPopupValue}
              onChangeText={setInputPopupValue}
              placeholder="Enter value"
              keyboardType="numeric"
              maxLength={10}
            />
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <TouchableOpacity
                style={[styles.modalCloseButton, { flex: 1, backgroundColor: '#F3F4F6' }]}
                onPress={() => setShowInputPopup(false)}
              >
                <Text style={styles.modalCloseText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalCloseButton, { flex: 1, backgroundColor: '#FED232' }]}
                onPress={() => {
                  inputPopupCallback(inputPopupValue);
                  setShowInputPopup(false);
                  setInputPopupValue('');
                }}
              >
                <Text style={[styles.modalCloseText, { color: '#000' }]}>OK</Text>
              </TouchableOpacity>
            </View>
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
  topNavbar: {
    width: '100%',
    height: Math.max(80, screenHeight * 0.12),
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
  backArrowImage: {
    width: Math.max(20, screenWidth * 0.055),
    height: Math.max(15, screenHeight * 0.025),
    transform: [{ rotate: '180deg' }],
  },
  navTitle: {
    flex: 1,
    fontSize: Math.max(16, Math.min(22, screenWidth * 0.045)),
    fontWeight: '600',
    color: '#171A1F',
    textAlign: 'center',
    marginRight: Math.max(40, screenWidth * 0.1),
    fontFamily: 'Montserrat-SemiBold',
  },
  scrollContent: {
    flex: 1,
    paddingHorizontal: Math.max(15, screenWidth * 0.04),
    paddingTop: Math.max(10, screenHeight * 0.02),
  },
  sectionContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: Math.max(12, screenWidth * 0.03),
    borderWidth: 1,
    borderColor: '#DEE1E6',
    marginBottom: Math.max(12, screenHeight * 0.018),
    paddingVertical: Math.max(8, screenHeight * 0.015),
    paddingHorizontal: Math.max(8, screenWidth * 0.02),
    shadowColor: '#171A1F',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  fieldRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Math.max(8, screenHeight * 0.01),
    paddingHorizontal: Math.max(8, screenWidth * 0.02),
    borderBottomWidth: 0.5,
    borderBottomColor: '#F3F4F6',
    minHeight: Math.max(50, screenHeight * 0.06),
  },
  fieldLabel: {
    fontSize: Math.max(12, Math.min(16, screenWidth * 0.035)),
    fontWeight: '500',
    color: '#6B7280',
    fontFamily: 'Montserrat-Medium',
    width: Math.max(120, screenWidth * 0.32),
    textAlign: 'left',
    flexShrink: 0,
  },
  fieldInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    minHeight: Math.max(35, screenHeight * 0.045),
    paddingHorizontal: 4,
  },
  fieldInput: {
    flex: 1,
    fontSize: Math.max(12, Math.min(16, screenWidth * 0.032)),
    fontFamily: 'Montserrat-Regular',
    color: '#000000',
    textAlign: 'right',
    paddingRight: Math.max(8, screenWidth * 0.015),
    minHeight: Math.max(30, screenHeight * 0.035),
    paddingVertical: 0,
  },
  fieldDropdownContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    minHeight: Math.max(35, screenHeight * 0.045),
    paddingHorizontal: 4,
  },
  fieldDropdownText: {
    fontSize: Math.max(12, Math.min(16, screenWidth * 0.032)),
    fontFamily: 'Montserrat-Regular',
    color: '#000',
    textAlign: 'right',
    paddingRight: Math.max(8, screenWidth * 0.015),
    flexShrink: 1,
  },
  placeholderText: {
    color: '#9CA3AF',
  },
  fieldIcon: {
    width: Math.max(28, screenWidth * 0.065),
    height: Math.max(28, screenWidth * 0.065),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 4,
  },
  iconImage: {
    width: Math.max(18, screenWidth * 0.04),
    height: Math.max(18, screenWidth * 0.04),
  },
  dropdownArrow: {
    width: Math.max(14, screenWidth * 0.03),
    height: Math.max(14, screenWidth * 0.03),
    marginLeft: Math.max(4, screenWidth * 0.01),
  },
  bottomButtonContainer: {
    paddingHorizontal: Math.max(20, screenWidth * 0.05),
    paddingBottom: Math.max(25, screenHeight * 0.03),
    paddingTop: Math.max(15, screenHeight * 0.02),
    backgroundColor: '#F8F9FA',
  },
  addTenantButton: {
    width: '100%',
    height: Math.max(50, screenHeight * 0.065),
    backgroundColor: '#FEDC15',
    borderRadius: 35,
    borderWidth: 1,
    borderColor: '#EAEAEA',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    maxWidth: 400,
  },
  addTenantButtonText: {
    fontSize: Math.max(14, Math.min(18, screenWidth * 0.042)),
    fontWeight: '600',
    color: '#000',
    fontFamily: 'Montserrat-SemiBold',
    textAlign: 'center',
  },
  // Modal styles
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
  // Date picker styles
  datePickerContainer: {
    flexDirection: 'row',
    height: 200,
    marginBottom: 20,
    gap: 10,
  },
  datePickerSection: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    overflow: 'hidden',
  },
  datePickerLabel: {
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold',
    color: '#374151',
    textAlign: 'center',
    paddingVertical: 10,
    backgroundColor: '#E5E7EB',
  },
  datePickerScroll: {
    flex: 1,
  },
  datePickerOption: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E5E7EB',
    alignItems: 'center',
  },
  selectedDateOption: {
    backgroundColor: '#FED232',
  },
  datePickerOptionText: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: '#374151',
    textAlign: 'center',
  },
  selectedDateOptionText: {
    color: '#000',
    fontFamily: 'Montserrat-SemiBold',
  },
  selectedDatePreview: {
    backgroundColor: '#F3F4F6',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
  },
  selectedDateText: {
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
    color: '#374151',
  },
  datePickerActions: {
    flexDirection: 'row',
    gap: 10,
  },
});