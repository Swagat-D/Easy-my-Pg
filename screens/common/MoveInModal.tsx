import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Dimensions,
  ScrollView,
} from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface TenantBooking {
  id: string;
  name: string;
  profileImage?: string;
  room: string;
  bookingAmount: number;
  bookingDate: string;
  moveInDate: string;
  daysLabel: string;
}

interface MoveInModalProps {
  visible: boolean;
  onClose: () => void;
  tenant: TenantBooking | null;
  onMoveIn: (date: string) => void;
  onDeleteBooking: () => void;
}

export default function MoveInModal({
  visible,
  onClose,
  tenant,
  onMoveIn,
  onDeleteBooking
}: MoveInModalProps) {
  const [selectedCalendarDate, setSelectedCalendarDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);
  const [showYearDropdown, setShowYearDropdown] = useState(false);
  
  const monthScrollRef = useRef<ScrollView>(null);
  const yearScrollRef = useRef<ScrollView>(null);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 20 }, (_, i) => 2021 + i);

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

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(selectedCalendarDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setSelectedCalendarDate(newDate);
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const handleMoveIn = () => {
    if (selectedDate) {
      onMoveIn(formatDate(selectedDate));
      onClose();
    }
  };

  const handleDeleteBooking = () => {
    onDeleteBooking();
    onClose();
  };

  const handleMonthSelect = (monthIndex: number) => {
    const newDate = new Date(selectedCalendarDate.getFullYear(), monthIndex, 1);
    setSelectedCalendarDate(newDate);
    setShowMonthDropdown(false);
  };

  const handleYearSelect = (year: number) => {
    const newDate = new Date(year, selectedCalendarDate.getMonth(), 1);
    setSelectedCalendarDate(newDate);
    setShowYearDropdown(false);
  };

  const scrollToSelectedMonth = () => {
    setTimeout(() => {
      const selectedIndex = selectedCalendarDate.getMonth();
      const itemHeight = Math.max(60, screenHeight * 0.075); 
      monthScrollRef.current?.scrollTo({
        y: selectedIndex * itemHeight,
        animated: true,
      });
    }, 100);
  };

  const scrollToSelectedYear = () => {
    setTimeout(() => {
      const selectedYear = selectedCalendarDate.getFullYear();
      const selectedIndex = years.indexOf(selectedYear);
      if (selectedIndex >= 0) {
        const itemHeight = Math.max(60, screenHeight * 0.075); 
        yearScrollRef.current?.scrollTo({
          y: selectedIndex * itemHeight,
          animated: true,
        });
      }
    }, 100);
  };

  useEffect(() => {
    if (showMonthDropdown) {
      scrollToSelectedMonth();
    }
  }, [showMonthDropdown]);

  useEffect(() => {
    if (showYearDropdown) {
      scrollToSelectedYear();
    }
  }, [showYearDropdown]);

  React.useEffect(() => {
    if (visible) {
      const today = new Date();
      setSelectedCalendarDate(today);
      setSelectedDate(today);
    }
  }, [visible]);

  if (!tenant) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Close Button */}
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <View style={styles.closeCircle}>
              <Text style={styles.closeX}>×</Text>
            </View>
          </TouchableOpacity>

          {/* Content */}
          <View style={styles.contentBox}>
            <Text style={styles.title}>Select Move In date :</Text>

            {/* Month Navigation */}
            <View style={styles.monthNavigation}>
              <TouchableOpacity onPress={() => navigateMonth('prev')}>
                <Text style={styles.navArrow}>‹</Text>
              </TouchableOpacity>
              <View style={styles.monthYearContainer}>
                <TouchableOpacity 
                  style={styles.monthButton}
                  onPress={() => {
                    setShowMonthDropdown(!showMonthDropdown);
                    setShowYearDropdown(false);
                  }}
                >
                  <Text style={styles.monthText}>{months[selectedCalendarDate.getMonth()]}</Text>
                  <Text style={styles.dropdownArrow}>▼</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.yearButton}
                  onPress={() => {
                    setShowYearDropdown(!showYearDropdown);
                    setShowMonthDropdown(false);
                  }}
                >
                  <Text style={styles.yearText}>{selectedCalendarDate.getFullYear()}</Text>
                  <Text style={styles.dropdownArrow}>▼</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => navigateMonth('next')}>
                <Text style={styles.navArrow}>›</Text>
              </TouchableOpacity>
            </View>

            {/* Calendar */}
            <View style={styles.calendar}>
              {/* Week Days Header */}
              <View style={styles.weekDaysRow}>
                {weekDays.map((day) => (
                  <Text key={day} style={styles.weekDayText}>
                    {day}
                  </Text>
                ))}
              </View>

              {/* Calendar Days */}
              <View style={styles.datesGrid}>
                {getDaysInMonth(selectedCalendarDate).map((date, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.dateCell,
                      !date && styles.emptyDateCell,
                      date && styles.dateContainer,
                      date && selectedDate && date.toDateString() === selectedDate.toDateString() && styles.selectedDateContainer
                    ]}
                    onPress={date ? () => handleDateSelect(date) : undefined}
                    disabled={!date}
                  >
                    <Text
                      style={[
                        styles.dayText,
                        date && selectedDate && date.toDateString() === selectedDate.toDateString() && styles.selectedDayText
                      ]}
                    >
                      {date ? date.getDate() : ''}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteBooking}>
                <Text style={styles.deleteButtonText}>Delete Booking</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.moveInBtn} onPress={handleMoveIn}>
                <Text style={styles.moveInText}>Move - In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      {/* Month Picker Modal */}
      <Modal
        visible={showMonthDropdown}
        animationType="fade"
        transparent
        onRequestClose={() => setShowMonthDropdown(false)}
      >
        <View style={styles.popupOverlay}>
          <View style={styles.popupContainer}>
            <View style={styles.popupHeader}>
              <Text style={styles.popupTitle}>Select Month</Text>
              <TouchableOpacity
                style={styles.popupCloseBtn}
                onPress={() => setShowMonthDropdown(false)}
              >
                <Text style={styles.popupCloseText}>×</Text>
              </TouchableOpacity>
            </View>
            <ScrollView 
              ref={monthScrollRef}
              style={styles.popupScrollView} 
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollContent}
            >
              {months.map((month, index) => (
                <TouchableOpacity
                  key={month}
                  style={[
                    styles.popupItem,
                    index === selectedCalendarDate.getMonth() && styles.selectedPopupItem
                  ]}
                  onPress={() => handleMonthSelect(index)}
                  activeOpacity={0.7}
                >
                  <Text style={[
                    styles.popupItemText,
                    index === selectedCalendarDate.getMonth() && styles.selectedPopupItemText
                  ]}>
                    {month}
                  </Text>
                  {index === selectedCalendarDate.getMonth() && (
                    <View style={styles.checkmark}>
                      <Text style={styles.checkmarkText}>✓</Text>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Year Picker Modal */}
      <Modal
        visible={showYearDropdown}
        animationType="fade"
        transparent
        onRequestClose={() => setShowYearDropdown(false)}
      >
        <View style={styles.popupOverlay}>
          <View style={styles.popupContainer}>
            <View style={styles.popupHeader}>
              <Text style={styles.popupTitle}>Select Year</Text>
              <TouchableOpacity
                style={styles.popupCloseBtn}
                onPress={() => setShowYearDropdown(false)}
              >
                <Text style={styles.popupCloseText}>×</Text>
              </TouchableOpacity>
            </View>
            <ScrollView 
              ref={yearScrollRef}
              style={styles.popupScrollView} 
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollContent}
            >
              {years.map((year) => (
                <TouchableOpacity
                  key={year}
                  style={[
                    styles.popupItem,
                    year === selectedCalendarDate.getFullYear() && styles.selectedPopupItem
                  ]}
                  onPress={() => handleYearSelect(year)}
                  activeOpacity={0.7}
                >
                  <Text style={[
                    styles.popupItemText,
                    year === selectedCalendarDate.getFullYear() && styles.selectedPopupItemText
                  ]}>
                    {year}
                  </Text>
                  {year === selectedCalendarDate.getFullYear() && (
                    <View style={styles.checkmark}>
                      <Text style={styles.checkmarkText}>✓</Text>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  container: {
    backgroundColor: '#fff',
    borderTopLeftRadius: Math.max(20, screenWidth * 0.05),
    borderTopRightRadius: Math.max(20, screenWidth * 0.05),
    padding: Math.max(20, screenWidth * 0.05),
    paddingBottom: Math.max(120, screenHeight * 0.15),
    minHeight: Math.max(420, screenHeight * 0.48),
    maxHeight: screenHeight * 0.85,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 10,
  },
  closeBtn: {
    alignSelf: 'center',
    marginBottom: Math.max(20, screenHeight * 0.025),
  },
  closeCircle: {
    width: Math.max(36, screenWidth * 0.09),
    height: Math.max(36, screenWidth * 0.09),
    borderRadius: Math.max(18, screenWidth * 0.045),
    borderWidth: 2,
    borderColor: '#f5d11dff',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  closeX: {
    fontSize: Math.max(24, screenWidth * 0.06),
    color: '#f5d11dff',
    fontWeight: 'bold',
  },
  contentBox: {
    backgroundColor: '#fff',
    borderRadius: Math.max(12, screenWidth * 0.03),
    paddingHorizontal: Math.max(16, screenWidth * 0.035),
    paddingVertical: Math.max(12, screenWidth * 0.035),
    borderWidth: 1,
    borderColor: '#EAEAEA',
  },
  title: {
    fontSize: Math.max(16, Math.min(20, screenWidth * 0.04)),
    fontWeight: '600',
    fontFamily: 'Montserrat-SemiBold',
    marginBottom: Math.max(15, screenHeight * 0.02),
    color: '#101111',
  },
  monthNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Math.max(15, screenHeight * 0.02),
    paddingHorizontal: Math.max(10, screenWidth * 0.025),
  },
  navArrow: {
    fontSize: Math.max(20, screenWidth * 0.05),
    color: '#333',
    fontWeight: 'bold',
    paddingHorizontal: Math.max(10, screenWidth * 0.025),
  },
  monthYearContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Math.max(6, screenWidth * 0.015),
  },
  monthText: {
    fontSize: Math.max(14, Math.min(16, screenWidth * 0.035)),
    fontWeight: '600',
    color: '#333',
    fontFamily: 'Montserrat-SemiBold',
  },
  yearText: {
    fontSize: Math.max(14, Math.min(16, screenWidth * 0.035)),
    fontWeight: '600',
    color: '#333',
    fontFamily: 'Montserrat-SemiBold',
  },
  dropdownArrow: {
    fontSize: Math.max(10, screenWidth * 0.025),
    color: '#666',
    marginLeft: Math.max(4, screenWidth * 0.01),
  },
  calendar: {
    marginBottom: Math.max(20, screenHeight * 0.025),
    backgroundColor: '#F8F9FA',
    borderRadius: Math.max(8, screenWidth * 0.02),
    padding: Math.max(12, screenWidth * 0.03),
  },
  weekDaysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Math.max(8, screenHeight * 0.01),
  },
  weekDayText: {
    fontSize: Math.max(12, Math.min(14, screenWidth * 0.03)),
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
    width: Math.max(32, screenWidth * 0.08),
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  datesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: Math.max(32, screenWidth * 0.08),
    height: Math.max(32, screenWidth * 0.08),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Math.max(4, screenHeight * 0.005),
  },
  dateCell: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Math.max(4, screenWidth * 0.01),
    marginBottom: Math.max(2, screenHeight * 0.003),
  },
  dateContainer: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: Math.max(6, screenWidth * 0.015),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  selectedDateContainer: {
    backgroundColor: '#FED232',
    borderColor: '#C39901',
    borderWidth: 2,
    shadowColor: '#FED232',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  emptyDateCell: {
    backgroundColor: 'transparent',
  },
  dayText: {
    fontSize: Math.max(14, Math.min(16, screenWidth * 0.035)),
    color: '#333',
    fontWeight: '500',
  },
  selectedDayText: {
    color: '#000',
    fontWeight: 'bold',
  },
  inactiveDayText: {
    color: '#CCC',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: Math.max(12, screenWidth * 0.03),
  },
  deleteButton: {
    flex: 1,
    backgroundColor: '#FFDEDE',
    borderRadius: Math.max(8, screenWidth * 0.02),
    paddingVertical: Math.max(12, screenHeight * 0.015),
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EF1D1D',
  },
  deleteButtonText: {
    color: '#000000',
    fontWeight: '600',
    fontFamily: 'Montserrat-Regular',
    fontSize: Math.max(14, Math.min(16, screenWidth * 0.035)),
  },
  moveInBtn: {
    flex: 1,
    backgroundColor: '#FFECA7',
    borderRadius: Math.max(8, screenWidth * 0.02),
    paddingVertical: Math.max(12, screenHeight * 0.015),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#C39901',
  },
  disabledBtn: {
    backgroundColor: '#B3D4FC',
    borderColor: '#B3D4FC',
  },
  moveInText: {
    color: '#000000',
    fontWeight: '600',
    fontFamily: 'Montserrat-Regular',
    fontSize: Math.max(16, Math.min(18, screenWidth * 0.04)),
  },
  disabledText: {
    color: '#fff',
    opacity: 0.7,
  },
  monthButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Math.max(12, screenWidth * 0.03),
    paddingVertical: Math.max(8, screenHeight * 0.01),
    borderRadius: Math.max(6, screenWidth * 0.015),
    backgroundColor: '#FFFFFF',
    marginRight: Math.max(8, screenWidth * 0.02),
    borderWidth: 1,
    borderColor: '#E0E0E0',
    minWidth: Math.max(90, screenWidth * 0.22),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 0.5,
  },
  yearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Math.max(12, screenWidth * 0.03),
    paddingVertical: Math.max(8, screenHeight * 0.01),
    borderRadius: Math.max(6, screenWidth * 0.015),
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    minWidth: Math.max(75, screenWidth * 0.18),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 0.5,
  },
  popupOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  popupContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: Math.max(20, screenWidth * 0.05),
    width: Math.max(300, screenWidth * 0.75),
    maxHeight: Math.max(450, screenHeight * 0.55),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 12,
  },
  popupHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Math.max(24, screenWidth * 0.06),
    paddingTop: Math.max(20, screenHeight * 0.025),
    paddingBottom: Math.max(16, screenHeight * 0.02),
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  popupTitle: {
    fontSize: Math.max(18, Math.min(22, screenWidth * 0.05)),
    fontWeight: '600',
    color: '#1A1A1A',
    fontFamily: 'Montserrat-SemiBold',
  },
  popupCloseBtn: {
    width: Math.max(36, screenWidth * 0.09),
    height: Math.max(36, screenWidth * 0.09),
    borderRadius: Math.max(18, screenWidth * 0.045),
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  popupCloseText: {
    fontSize: Math.max(18, screenWidth * 0.045),
    color: '#666',
    fontWeight: '600',
  },
  popupScrollView: {
    maxHeight: Math.max(320, screenHeight * 0.4),
  },
  scrollContent: {
    paddingBottom: Math.max(20, screenHeight * 0.025),
  },
  popupItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Math.max(24, screenWidth * 0.06),
    paddingVertical: Math.max(18, screenHeight * 0.022),
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 0.5,
    borderBottomColor: '#F0F0F0',
    minHeight: Math.max(60, screenHeight * 0.075),
  },
  selectedPopupItem: {
    backgroundColor: '#F8F9FA',
    borderLeftWidth: 4,
    borderLeftColor: '#FED232',
  },
  popupItemText: {
    fontSize: Math.max(16, Math.min(18, screenWidth * 0.042)),
    color: '#333',
    fontWeight: '500',
    fontFamily: 'Montserrat-Medium',
  },
  selectedPopupItemText: {
    color: '#1A1A1A',
    fontWeight: '600',
    fontFamily: 'Montserrat-SemiBold',
  },
  checkmark: {
    width: Math.max(24, screenWidth * 0.06),
    height: Math.max(24, screenWidth * 0.06),
    borderRadius: Math.max(12, screenWidth * 0.03),
    backgroundColor: '#FED232',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkText: {
    fontSize: Math.max(14, screenWidth * 0.035),
    color: '#000',
    fontWeight: 'bold',
  },
});