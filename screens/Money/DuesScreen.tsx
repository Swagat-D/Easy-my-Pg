import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
  Dimensions,
  TextInput,
  PanResponder,
  Animated,
  Linking,
} from 'react-native';
import Navbar from '../common/Navbar';
import BottomTabNavigator from '../common/Tab';
import MoneyNav from './MoneyNav';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface DuesScreenProps {
  userName?: string;
  propertyName?: string;
  onTabPress?: (tabId: string) => void;
  onHomePress?: () => void;
  onSectionPress?: (section: string) => void;
  activeTab?: string;
  currentMoneySection?: string; 
}

export default function DuesScreen({
  userName = 'Gyana',
  propertyName = 'Kalyani Nagar',
  onTabPress,
  onHomePress,
  onSectionPress,
  activeTab = 'money',
  currentMoneySection = 'dues' // Default to dues
}: DuesScreenProps) {
  const [activeSection, setActiveSection] = useState(currentMoneySection);
  const [searchText, setSearchText] = useState('');
  
  const animatedValues = useRef<{[key: string]: Animated.Value}>({});

  const handleProfilePress = () => {
    console.log('Profile pressed');
  };

  const handleSupportPress = () => {
    console.log('Support pressed');
  };

  const handleAddPress = () => {
    console.log('Add button pressed');
  };

  const handleFilterPress = () => {
    console.log('Filter pressed');
  };

  const handleTabPress = (tabId: string) => {
    if (onTabPress) {
      onTabPress(tabId);
    }
  };

  const handleHomePress = () => {
    if (onHomePress) {
      onHomePress();
    }
  };

  const handleSectionPress = (section: string) => {
    setActiveSection(section);
    if (onSectionPress) {
      onSectionPress(section);
    }
  };

  const handleRecordPayment = (tenantName: string) => {
    console.log('Record payment for:', tenantName);
  };

  const handleRemindToPay = (tenantName: string) => {
    console.log('Remind to pay:', tenantName);
  };

  const getAnimatedValue = (tenantId: string) => {
    if (!animatedValues.current[tenantId]) {
      animatedValues.current[tenantId] = new Animated.Value(0);
    }
    return animatedValues.current[tenantId];
  };

  const resetCardPosition = (tenantId: string) => {
    Animated.timing(getAnimatedValue(tenantId), {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const handleGiveDiscount = (tenantId: string) => {
    console.log('Give discount to tenant:', tenantId);
    resetCardPosition(tenantId);
  };

  const handleAddRemarks = (tenantId: string) => {
    console.log('Add remarks for tenant:', tenantId);
    resetCardPosition(tenantId);
  };

  const handleLateFine = (tenantId: string) => {
    console.log('Add late fine for tenant:', tenantId);
    resetCardPosition(tenantId);
  };

  const handleAddDues = (tenantId: string) => {
    console.log('Add dues for tenant:', tenantId);
    resetCardPosition(tenantId);
  };

  const handleCall = (tenantId: string) => {
    const tenant = tenantDues.find(t => t.id === tenantId);
    if (tenant) {
      // Since mobile number is not in the current data, we'll use a placeholder
      const phoneNumber = '919876543210'; // Default number
      Linking.openURL(`tel:${phoneNumber}`);
    }
    resetCardPosition(tenantId);
  };

  const handleWhatsApp = (tenantId: string) => {
    const tenant = tenantDues.find(t => t.id === tenantId);
    if (tenant) {
      // Since mobile number is not in the current data, we'll use a placeholder
      const phoneNumber = '919876543210'; // Default number
      Linking.openURL(`whatsapp://send?phone=${phoneNumber}`);
    }
    resetCardPosition(tenantId);
  };

  const createPanResponder = (tenant: any) => {
    const animatedValue = getAnimatedValue(tenant.id);
    let startTime = 0;
    let startPosition = { x: 0, y: 0 };
    
    return PanResponder.create({
      onStartShouldSetPanResponder: (evt) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return Math.abs(gestureState.dx) > Math.abs(gestureState.dy) && Math.abs(gestureState.dx) > 20;
      },
      onPanResponderGrant: (evt) => {
        startTime = Date.now();
        startPosition = { x: evt.nativeEvent.pageX, y: evt.nativeEvent.pageY };
        animatedValue.extractOffset();
      },
      onPanResponderMove: (evt, gestureState) => {
        const maxDrag = -screenWidth * 0.45; 
        const newValue = Math.min(0, Math.max(gestureState.dx, maxDrag));
        animatedValue.setValue(newValue);
      },
      onPanResponderRelease: (evt, gestureState) => {
        animatedValue.flattenOffset();
        
        const duration = Date.now() - startTime;
        const distance = Math.sqrt(gestureState.dx * gestureState.dx + gestureState.dy * gestureState.dy);
        
        if (duration < 300 && distance < 15) {
          // Handle tap on card if needed
          animatedValue.setValue(0);
        } else {
          const threshold = -screenWidth * 0.45; 
          const shouldOpen = gestureState.dx < threshold;
          
          Animated.timing(animatedValue, {
            toValue: shouldOpen ? -screenWidth * 0.45 : 0, 
            duration: 200, 
            useNativeDriver: true,
          }).start();
        }
      },
    });
  };

  const getCurrentMonth = () => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[new Date().getMonth()];
  };

  const tenantDues = [
    {
      id: '1',
      name: 'Soumya',
      unit: '102',
      dueAmount: '6,99,670',
      dueDate: '05 Sep 2023',
      avatar: require('../../assets/pht.png'),
    },
    {
      id: '2',
      name: 'Soumya',
      unit: '102',
      dueAmount: '6,99,670',
      dueDate: '05 Sep 2023',
      avatar: require('../../assets/pht.png'),
    },
    {
      id: '3',
      name: 'Soumya',
      unit: '102',
      dueAmount: '6,99,670',
      dueDate: '05 Sep 2023',
      avatar: require('../../assets/pht.png'),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <Navbar
        userName={userName}
        propertyName={propertyName}
        onProfilePress={handleProfilePress}
        onSupportPress={handleSupportPress}
        onAddPropertyPress={() => {
          if (onTabPress) {
            onTabPress('addProperty');
          }
        }}
      />

      <MoneyNav
        activeSection="dues"
        onSectionPress={handleSectionPress}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>

      <View style={styles.searchFilterContainer}>
        <View style={styles.searchContainer}>
          <View style={styles.searchIconContainer}>
            <Image
              source={require('../../assets/icons/search.png')}
              style={styles.searchIcon}
              resizeMode="contain"
            />
          </View>
          <TextInput
            style={styles.searchInput}
            placeholder="Search here"
            placeholderTextColor="#9CA3AF"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
        <TouchableOpacity style={styles.filterContainer} onPress={handleFilterPress}>
          <Image
            source={require('../../assets/icons/filter.png')}
            style={styles.filterIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>


        <View style={styles.dashboardContent}>
          
          {/* Monthly Summary Section */}
          <View style={styles.summarySection}>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.summaryScrollView}
              contentContainerStyle={styles.summaryCardsContainer}
            >
              <View style={styles.summaryCardDark}>
                <Text style={styles.cardAmountDark}>₹8,99,450</Text>
                <View style={styles.rupeeIconContainer}>
                  <Image 
                    source={require('../../assets/Frame.png')} 
                    style={styles.FrameIconImage}
                    resizeMode="contain"
                  />
                </View>
                <Text style={styles.cardLabelDark}>All Dues</Text>
              </View>

              {/* Current Dues Card */}
              <View style={styles.summaryCardLight}>
                <Text style={styles.cardAmountLighta}>₹6,99,670</Text>
                <Text style={styles.cardLabelLight}>Current Dues</Text>
              </View>

              {/* This Month Dues Card */}
              <View style={styles.summaryCardLight}>
                <Text style={styles.cardAmountLighta}>₹2,99,780</Text>
                <Text style={styles.cardLabelLight}>{getCurrentMonth()} Dues</Text>
              </View>

              {/* October Electricity Dues Card */}
              <View style={styles.summaryCardLight}>
                <Text style={styles.cardAmountLighta}>₹1,50,230</Text>
                <Text style={styles.cardLabelLight}>{getCurrentMonth()} Electricity Dues</Text>
              </View>

              {/* Total Unpaid Rent Card */}
              <View style={styles.summaryCardLight}>
                <Text style={styles.cardAmountLighta}>₹3,20,450</Text>
                <Text style={styles.cardLabelLight}>Total Unpaid Rent</Text>
              </View>

              {/* Total Electricity Dues Card */}
              <View style={styles.summaryCardLight}>
                <Text style={styles.cardAmountLighta}>₹89,320</Text>
                <Text style={styles.cardLabelLight}>Total Electricity Dues</Text>
              </View>
            </ScrollView>
          </View>

          {/* Tenant Dues List */}
          <View style={styles.tenantsList}>
            {tenantDues.map((tenant) => {
              const panResponder = createPanResponder(tenant);
              
              return (
                <View key={tenant.id} style={styles.tenantCardContainer}>
                  {/* Action Panel (Always rendered behind card) */}
                  <View style={styles.actionPanel}>
                    <View style={styles.actionColumn}>
                      <TouchableOpacity 
                        style={[styles.actionButton, styles.discountButton]}
                        onPress={() => handleGiveDiscount(tenant.id)}
                      >
                        <Text style={styles.discountButtonText}>Give Discount</Text>
                      </TouchableOpacity>
                      
                      <TouchableOpacity 
                        style={[styles.actionButton, styles.remarksButton]}
                        onPress={() => handleAddRemarks(tenant.id)}
                      >
                        <Text style={styles.actionButtonText}>Add Remarks</Text>
                      </TouchableOpacity>
                      
                      <TouchableOpacity 
                        style={[styles.actionButton, styles.fineButton]}
                        onPress={() => handleLateFine(tenant.id)}
                      >
                        <Text style={styles.actionButtonText}>Late Fine</Text>
                      </TouchableOpacity>
                      
                      <TouchableOpacity 
                        style={[styles.actionButton, styles.addDuesButton]}
                        onPress={() => handleAddDues(tenant.id)}
                      >
                        <Text style={styles.actionButtonText}>Add Dues</Text>
                      </TouchableOpacity>
                    </View>
                    
                    <View style={styles.contactColumn}>
                      <TouchableOpacity 
                        style={[styles.contactButton, styles.callButton]}
                        onPress={() => handleCall(tenant.id)}
                      >
                        <Image
                          source={require('../../assets/call.png')}
                          style={styles.contactIcon}
                        />
                      </TouchableOpacity>
                      
                      <TouchableOpacity 
                        style={[styles.contactButton, styles.whatsappButton]}
                        onPress={() => handleWhatsApp(tenant.id)}
                      >
                        <Image
                          source={require('../../assets/whatsApp.png')}
                          style={styles.contactIcon}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  
                  {/* Main Tenant Card with PanResponder */}
                  <Animated.View 
                    style={[
                      styles.tenantCard,
                      {
                        transform: [{
                          translateX: getAnimatedValue(tenant.id)
                        }]
                      }
                    ]}
                    {...panResponder.panHandlers}
                  >
                    {/* Tenant Info Row */}
                    <View style={styles.tenantRow}>
                      <View style={styles.tenantLeft}>
                        <Image
                          source={tenant.avatar}
                          style={styles.tenantAvatar}
                          resizeMode="cover"
                        />
                        <View style={styles.tenantInfo}>
                          <Text style={styles.tenantName}>{tenant.name}</Text>
                          <View style={styles.unitRow}>
                            <Image
                              source={require('../../assets/icons/double-bed.png')} 
                              style={styles.carIcon}
                              resizeMode="contain"
                            />
                            <Text style={styles.unitNumber}>{tenant.unit}</Text>
                          </View>
                        </View>
                      </View>
                      
                      <View style={styles.tenantRight}>
                        <Text style={styles.dueAmount}>₹{tenant.dueAmount}</Text>
                        <View style={styles.dateRow}>
                          <Image
                            source={require('../../assets/calendar.png')}
                            style={styles.calendarIcon}
                            resizeMode="contain"
                          />
                          <Text style={styles.dueDate}>{tenant.dueDate}</Text>
                        </View>
                      </View>
                    </View>

                    {/* Action Buttons Row */}
                    <View style={styles.buttonRow}>
                      <TouchableOpacity 
                        style={styles.recordButton}
                        onPress={() => handleRecordPayment(tenant.name)}
                      >
                        <Text style={styles.recordButtonText}>Record Payment</Text>
                      </TouchableOpacity>
                      
                      <TouchableOpacity 
                        style={styles.remindButton}
                        onPress={() => handleRemindToPay(tenant.name)}
                      >
                        <Image
                          source={require('../../assets/whatsApp.png')}
                          style={styles.whatsappIcon}
                          resizeMode="contain"
                        />
                        <Text style={styles.remindButtonText}>Remind To Pay</Text>
                      </TouchableOpacity>
                    </View>
                  </Animated.View>
                </View>
              );
            })}
          </View>
        </View>

        {/* Spacer for content */}
        <View style={styles.contentSpacer} />
      </ScrollView>

      <BottomTabNavigator
        activeTab={activeTab}
        onTabPress={handleTabPress}
        onAddPress={handleAddPress}
        onHomePress={handleHomePress}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  searchFilterContainer: {
    width: screenWidth * 0.78,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: screenWidth * 0.0472,
    marginTop: screenHeight * 0.02,
    marginBottom: screenHeight * 0.015,
    height: screenHeight * 0.055,
    borderRadius: 22,
    borderWidth: 0.75,
    borderColor: '#000000',
    backgroundColor: '#FFFFFF',
  },
  searchContainer: {
    width: screenWidth * 0.78,
    height: screenHeight * 0.057,
    backgroundColor: '#F2F2F31A',
    borderWidth: 0.5,
    borderColor: '#D8D8ED',
    borderRadius: 22,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  searchIconContainer: {
    width: screenWidth * 0.094,
    height: screenHeight * 0.0425,
    left: screenWidth * 0.0167,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000'
  },
  searchIcon: {
    width: screenWidth * 0.0695,
    height: screenHeight * 0.0312,
    tintColor: '#fff',
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#000000',
    fontFamily: 'Montserrat-Regular',
    paddingVertical: 0,
    marginLeft: 8,
  },
  filterContainer: {
    width: screenWidth * 0.12,
    height: screenHeight * 0.055,
    left: screenWidth * 0.8,
    borderWidth: 0.75,
    borderColor: '#000',
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  filterIcon: {
    width: screenWidth * 0.065,
    height: screenHeight * 0.025,
    tintColor: '#000',
  },
  dashboardContent: {
    paddingHorizontal: screenWidth * 0.05,
    paddingTop: screenHeight * 0.002,
  },
  summarySection: {
    marginBottom: screenHeight * 0.02,
  },
  summaryScrollView: {
    marginHorizontal: -(screenWidth * 0.055),
  },
  summaryCardsContainer: {
    paddingHorizontal: screenWidth * 0.055,
    paddingRight: screenWidth * 0.033,
  },
  summaryCardDark: {
    width: screenWidth * 0.43,
    height: screenHeight * 0.115,
    backgroundColor: '#242424',
    borderRadius: 8,
    borderWidth: 1.1,
    borderColor: '#EAE7E7',
    padding: screenWidth * 0.044,
    marginRight: screenWidth * 0.033,
    shadowColor: '#171A1F',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.07,
    shadowRadius: 1,
    elevation: 2,
    position: 'relative',
  },
  summaryCardLight: {
    width: screenWidth * 0.43,
    height: screenHeight * 0.115,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1.1,
    borderColor: '#EAE7E7',
    padding: screenWidth * 0.044,
    marginRight: screenWidth * 0.033,
    shadowColor: '#171A1F',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.07,
    shadowRadius: 1,
    elevation: 2,
    position: 'relative',
  },
  cardAmountDark: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFD600',
    fontFamily: 'Inter-Bold',
    lineHeight: screenHeight * 0.04,
    marginBottom: screenHeight * 0.005,
    width: screenWidth * 0.255,
    height: screenHeight * 0.04,
    top: -(screenHeight * 0.0063)
  },
  cardAmountLight: {
    fontSize: 22,
    fontWeight: '700',
    color: '#33B94D',
    fontFamily: 'Inter-Bold',
    lineHeight: screenHeight * 0.04,
    marginBottom: screenHeight * 0.005,
    width: screenWidth * 0.255,
    height: screenHeight * 0.04,
    top: -(screenHeight * 0.0063)
  },
  cardAmountLighta: {
    fontSize: 22,
    fontWeight: '700',
    color: '#EF1D1D',
    fontFamily: 'Inter-Bold',
    lineHeight: screenHeight * 0.04,
    marginBottom: screenHeight * 0.005,
    width: screenWidth * 0.255,
    height: screenHeight * 0.04,
    top: -(screenHeight * 0.0063)
  },
  cardLabelDark: {
    fontSize: 13,
    fontWeight: '400',
    color: '#FFF',
    fontFamily: 'Montserrat-Regular',
    lineHeight: screenHeight * 0.02,
    position: 'absolute',
    bottom: screenHeight * 0.02,
    left: screenWidth * 0.044,
    width: screenWidth * 0.183,
  },
  cardLabelLight: {
    fontSize: 13,
    fontWeight: '400',
    color: '#000',
    fontFamily: 'Montserrat-Regular',
    lineHeight: screenHeight * 0.02,
    position: 'absolute',
    bottom: screenHeight * 0.02,
    left: screenWidth * 0.044,
    width: screenWidth * 0.361,
  },
  rupeeIconContainer: {
    position: 'absolute',
    top: screenHeight * 0.055,
    right: screenWidth * 0.055,
    transform: [{ rotate: '-0.03deg' }],
  },
  FrameIconImage: {
    width: screenWidth * 0.117,
    height: screenHeight * 0.065,
    tintColor: '#FFF',
    left: screenWidth * 0.05
  },
  tenantsList: {
    marginTop: screenHeight * 0.01,
    marginBottom: screenHeight * 0.05
  },
  tenantCardContainer: {
    position: 'relative',
    marginBottom: screenHeight * 0.015,
    overflow: 'hidden', 
    borderRadius: 12, 
    backgroundColor: '#FFFFFF',
    shadowColor: '#171A1F',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.08,
    shadowRadius: 1,
    zIndex: 10,
  },
  actionPanel: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: screenWidth * 0.45,
    height: '100%',
    backgroundColor: '#FFD600',
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    flexDirection: 'row',
    paddingHorizontal: screenWidth * 0.015,
    paddingVertical: screenHeight * 0.008,
    zIndex: 0, 
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionColumn: {
    flex: 2.2,
    justifyContent: 'space-around',
    paddingRight: screenWidth * 0.015,
    paddingLeft: screenWidth * 0.01,
  },
  contactColumn: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingRight: screenWidth * 0.01,
    paddingVertical: screenHeight * 0.01,
    height: '100%',
    display: 'flex',
  },
  actionButton: {
    backgroundColor: 'transparent',
    paddingVertical: screenHeight * 0.005,
    paddingHorizontal: screenWidth * 0.01,
    borderRadius: 4,
    marginVertical: screenHeight * 0.001,
    alignItems: 'flex-start',
  },
  discountButton: {
    backgroundColor: 'transparent',
  },
  discountButtonText: {
    fontFamily: 'Roboto-Medium',
    fontWeight: '600',
    fontSize: screenWidth * 0.032,
    color: '#FF4444',
    textAlign: 'left',
    lineHeight: screenHeight * 0.02,
  },
  remarksButton: {
    backgroundColor: 'transparent',
  },
  fineButton: {
    backgroundColor: 'transparent',
  },
  addDuesButton: {
    backgroundColor: 'transparent',
  },
  actionButtonText: {
    fontFamily: 'Roboto-Medium',
    fontWeight: '600',
    fontSize: screenWidth * 0.032,
    color: '#000000',
    textAlign: 'left',
    lineHeight: screenHeight * 0.02,
  },
  contactButton: {
    width: screenWidth * 0.09,
    height: screenWidth * 0.09,
    borderRadius: screenWidth * 0.045,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: screenHeight * 0.003,
    display: 'flex',
  },
  callButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#000000',
  },
  whatsappButton: {
    backgroundColor: '#25D366',
  },
  moreButton: {
    backgroundColor: '#000000',
  },
  contactIcon: {
    width: screenWidth * 0.04,
    height: screenWidth * 0.04,
    resizeMode: 'contain',
  },
  moreText: {
    fontFamily: 'Inter-Bold',
    fontWeight: '700',
    fontSize: screenWidth * 0.035,
    color: '#FFFFFF',
    textAlign: 'center',
    textAlignVertical: 'center',
    lineHeight: screenWidth * 0.035,
    includeFontPadding: false,
  },
  tenantCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: screenWidth * 0.04,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    zIndex: 10,
    position: 'relative',
  },
  tenantRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: screenHeight * 0.015,
  },
  tenantLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  tenantAvatar: {
    width: screenWidth * 0.12,
    height: screenWidth * 0.12,
    borderRadius: (screenWidth * 0.12) / 2,
    marginRight: screenWidth * 0.03,
    backgroundColor: '#F0F0F0',
  },
  tenantInfo: {
    flex: 1,
  },
  tenantName: {
    fontSize: screenWidth * 0.042,
    fontWeight: '600',
    color: '#1A1A1A',
    fontFamily: 'Montserrat-SemiBold',
    marginBottom: screenHeight * 0.005,
  },
  unitRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  carIcon: {
    width: screenWidth * 0.04,
    height: screenWidth * 0.04,
    marginRight: screenWidth * 0.015,
    tintColor: '#000000',
  },
  unitNumber: {
    fontSize: screenWidth * 0.035,
    fontWeight: '600',
    color: '#FF0000',
    fontFamily: 'OpenSans-SemiBold',
  },
  tenantRight: {
    alignItems: 'flex-end',
  },
  dueAmount: {
    fontSize: screenWidth * 0.045,
    fontWeight: '500',
    color: '#EF1D1D',
    fontFamily: 'Inter-Medium',
    marginBottom: screenHeight * 0.005,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  calendarIcon: {
    width: screenWidth * 0.035,
    height: screenWidth * 0.035,
    marginRight: screenWidth * 0.02,
    tintColor: '#000000',
  },
  dueDate: {
    fontSize: screenWidth * 0.04,
    color: '#5D626E',
    fontFamily: 'Roboto-Regular',
    fontWeight: '400',
    verticalAlign: 'middle',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: screenWidth * 0.04,
    marginTop: screenHeight * 0.005,
  },
  recordButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#313030',
    borderRadius: 8,
    paddingVertical: screenHeight * 0.012,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recordButtonText: {
    fontSize: screenWidth * 0.033,
    fontWeight: '400',
    color: '#000000',
    fontFamily: 'Monetserrat-Medium',
  },
  remindButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#FFF4B8',
    borderWidth: 1.5,
    borderColor: '#313030',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  whatsappIcon: {
    width: screenWidth * 0.05,
    height: screenWidth * 0.05,
    marginRight: screenWidth * 0.015,
  },
  remindButtonText: {
    fontSize: screenWidth * 0.033,
    fontWeight: '500',
    color: '#000000',
    fontFamily: 'Montserrat-Medium',
  },
  contentSpacer: {
    height: screenHeight * 0.1,
  },
});