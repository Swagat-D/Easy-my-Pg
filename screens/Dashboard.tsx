import React, { useState, useRef, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView,
  Alert,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
  Dimensions,
  TextInput
} from 'react-native';
import Navbar from './common/Navbar';
import BottomTabNavigator from './common/Tab';
import MainPropertyScreen from './MainProperty';
import TenantsScreen from './TenantsScreen';
import AddPropertyScreen from './AddPropertyScreen';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface DashboardScreenProps {
  userName?: string;
  propertyName?: string;
  onPropertyPress?: () => void;
}

export default function DashboardScreen({ 
  userName = 'Gyana',
  propertyName = 'Kalyani Nagar',
  onPropertyPress
}: DashboardScreenProps) {
  const [activeTab, setActiveTab] = useState('home');
  const [currentScreen, setCurrentScreen] = useState<'property' | 'dashboard' | 'tenants' | 'addProperty'>('dashboard');
  const [searchText, setSearchText] = useState('');
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const slideInterval = useRef<NodeJS.Timeout | null>(null);
  const [showDashboard, setShowDashboard] = useState(false);

  const getCurrentMonth = () => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[new Date().getMonth()];
  };

  const newsSlides = [
    {
      id: 1,
      image: require('../assets/news.jpg'),
      title: 'Quit Your Job, Start Your Co-Living!',
      subtitle: 'Properties in Gurgaon',
      tag: 'Back to Mumbai'
    },
    {
      id: 2,
      image: require('../assets/news.jpg'),
      title: 'New Housing Policies 2024',
      subtitle: 'Government Updates',
      tag: 'Policy Changes'
    },
    {
      id: 3,
      image: require('../assets/news.jpg'),
      title: 'Real Estate Market Trends',
      subtitle: 'Investment Opportunities',
      tag: 'Market Analysis'
    }
  ];

  useEffect(() => {
    slideInterval.current = setInterval(() => {
      setCurrentSlideIndex((prevIndex) => 
        prevIndex === newsSlides.length - 1 ? 0 : prevIndex + 1
      );
    }, 1800);

    return () => {
      if (slideInterval.current) {
        clearInterval(slideInterval.current);
      }
    };
  }, [newsSlides.length]);

  // Handle manual slide navigation
  const handleSlidePress = () => {
    setCurrentSlideIndex((prevIndex) => 
      prevIndex === newsSlides.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePropertyPress = () => {
    if (onPropertyPress) {
      onPropertyPress();
    } else {
      setActiveTab('property');
      setCurrentScreen('property');
    }
  };

  const handleTabPress = (tabId: string) => {
    setActiveTab(tabId);
    if (tabId === 'property') {
      setCurrentScreen('property');
    } else if (tabId === 'tenants') {
      setCurrentScreen('tenants');
    } else if (tabId === 'home') {
      setCurrentScreen('dashboard');
    }
  };

  const handleAddPress = () => {
    Alert.alert(
      'Quick Add',
      'What would you like to add?',
      [
        { text: 'Add Tenant', onPress: () => console.log('Add Tenant') },
        { text: 'Add Payment', onPress: () => console.log('Add Payment') },
        { text: 'Add Property', onPress: () => console.log('Add Property') },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const handleProfilePress = () => {
    console.log('Profile pressed');
  };

  const handleSupportPress = () => {
    console.log('Support pressed');
  };

  // Conditional rendering after all hooks
  if (currentScreen === 'addProperty') {
    return (
      <AddPropertyScreen 
        onTabPress={(tabId) => {
          setActiveTab(tabId);
          if (tabId === 'property') {
            setCurrentScreen('property');
          } else if (tabId === 'tenants') {
            setCurrentScreen('tenants');
          } else if (tabId === 'home') {
            setCurrentScreen('dashboard');
          }
        }}
        onHomePress={() => {
          setActiveTab('home');
          setCurrentScreen('dashboard');
        }}
      />
    );
  }

  if (currentScreen === 'property') {
    return (
      <MainPropertyScreen 
        activeTab={activeTab}
        onTabPress={(tabId) => {
          setActiveTab(tabId);
          if (tabId === 'tenants') {
            setCurrentScreen('tenants');
          } else if (tabId === 'home') {
            setCurrentScreen('dashboard');
          } else if (tabId === 'property') {
            setCurrentScreen('property');
          } else if (tabId === 'addProperty') {
            setCurrentScreen('addProperty');
          }
        }}
        onHomePress={() => {
          setActiveTab('home');
          setCurrentScreen('dashboard');
        }}
      />
    );
  }

  if (currentScreen === 'tenants') {
    return (
      <TenantsScreen 
        activeTab={activeTab}
        onTabPress={(tabId) => {
          setActiveTab(tabId);
          if (tabId === 'property') {
            setCurrentScreen('property');
          } else if (tabId === 'home') {
            setCurrentScreen('dashboard');
          } else if (tabId === 'tenants') {
            setCurrentScreen('tenants');
          } else if (tabId === 'addProperty') {
            setCurrentScreen('addProperty');
          }
        }}
        onHomePress={() => {
          setActiveTab('home');
          setCurrentScreen('dashboard');
        }}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Navbar */}
      <Navbar
        userName={userName}
        propertyName={propertyName}
        onProfilePress={handleProfilePress}
        onSupportPress={handleSupportPress}
        onAddPropertyPress={() => {
          setActiveTab('property');
          setCurrentScreen('addProperty');
        }}
      />

      {/* Search Bar */}
      
      
      {/* Main Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>

        <View style={styles.searchContainer}>
        <Image
          source={require('../assets/icons/search.png')}
          style={styles.searchIcon}
          resizeMode="contain"
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search Tenants, Rooms....."
          placeholderTextColor="#9CA3AF"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

        {/* Dashboard Content Container */}
        <View style={styles.dashboardContent}>
          
          {/* Monthly Summary Section */}
          <View style={styles.summarySection}>
            <View style={styles.summaryHeader}>
              <Text style={styles.summaryTitle}>{getCurrentMonth()} Summary</Text>
              <TouchableOpacity style={styles.allPropertyButton}>
                <Text style={styles.allPropertyText}>All Property</Text>
                <Image 
                  source={require('../assets/dropdown-arrow.png')} 
                  style={styles.summaryDropdown}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
            
            {/* Summary Cards */}
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.summaryScrollView}
              contentContainerStyle={styles.summaryCardsContainer}
            >
              {/* Today Collection Card - Dark */}
              <View style={styles.summaryCardDark}>
                <Text style={styles.cardAmountDark}>₹8,99,450</Text>
                <View style={styles.rupeeIconContainer}>
                  <Image 
                    source={require('../assets/Frame.png')} 
                    style={styles.FrameIconImage}
                    resizeMode="contain"
                  />
                </View>
                <Text style={styles.cardLabelDark}>Today's Collection</Text>
              </View>

              {/* Collection This Month Card */}
              <View style={styles.summaryCardLight}>
                <Text style={styles.cardAmountLight}>₹6,99,670</Text>
                <Text style={styles.cardLabelLight}>Collection in {getCurrentMonth()}</Text>
              </View>

              {/* Pending Amount Card */}
              <View style={styles.summaryCardLight}>
                <Text style={styles.cardAmountLighta}>₹2,99,780</Text>
                <Text style={styles.cardLabelLight}>{getCurrentMonth()} Dues Collection</Text>
              </View>

              {/* This Week Card */}
              <View style={styles.summaryCardLight}>
                <Text style={styles.cardAmountLight}>₹1,50,230</Text>
                <Text style={styles.cardLabelLight}>{getCurrentMonth()} Electricity Collection</Text>
              </View>

              {/* Yesterday Card */}
              <View style={styles.summaryCardLight}>
                <Text style={styles.cardAmountLight}>₹45,670</Text>
                <Text style={styles.cardLabelLight}>{getCurrentMonth()} Rent Collection</Text>
              </View>

              {/* Last Month Card */}
              <View style={styles.summaryCardLight}>
                <Text style={styles.cardAmountLight}>₹3,20,450</Text>
                <Text style={styles.cardLabelLight}>{getCurrentMonth()} Deposit Collection</Text>
              </View>

              {/* Advance Paid Card */}
              <View style={styles.summaryCardLight}>
                <Text style={styles.cardAmountLight}>₹89,320</Text>
                <Text style={styles.cardLabelLight}>{getCurrentMonth()} Last Fine Collection</Text>
              </View>

              {/* Due Amount Card */}
              <View style={styles.summaryCardLight}>
                <Text style={styles.cardAmountLight}>₹67,890</Text>
                <Text style={styles.cardLabelLight}>{getCurrentMonth()} Advance Collection</Text>
              </View>
            </ScrollView>
          </View>

          {/* Quick Actions Section */}
          <View style={styles.quickActionsSection}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <View style={styles.quickActions}>
              <TouchableOpacity style={styles.actionButton}>
                <View style={styles.actionIcon}>
                  <Image 
                    source={require('../assets/icons/user-plus.png')} 
                    style={styles.actionIconImage}
                    resizeMode="contain"
                  />
                </View>
                <Text style={styles.actionText}>Add Tenant</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton}>
                <View style={styles.actionIcon}>
                  <Image 
                    source={require('../assets/icons/banknote.png')} 
                    style={styles.actionIconImage}
                    resizeMode="contain"
                  />
                </View>
                <Text style={styles.actionText}>Record Payments</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton}>
                <View style={styles.actionIcon}>
                  <Image 
                    source={require('../assets/icons/megaphone.png')} 
                    style={styles.actionIconImage}
                    resizeMode="contain"
                  />
                </View>
                <Text style={styles.actionText}>Notice Board</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton}>
                <View style={styles.actionIcon}>
                  <Image 
                    source={require('../assets/icons/door-open.png')} 
                    style={styles.actionIconImage}
                    resizeMode="contain"
                  />
                </View>
                <Text style={styles.actionText}>Add Leads</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton}>
                <View style={styles.actionIcon}>
                  <Image 
                    source={require('../assets/icons/property.png')} 
                    style={styles.actionIconImage}
                    resizeMode="contain"
                  />
                </View>
                <Text style={styles.actionText}>Complaints</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Rent Details Section */}
          <View style={styles.rentDetailsSection}>
            <View style={styles.rentDetailsCard}>
              <Text style={styles.rentDetailsTitle}>Rent Details</Text>
    
              <View style={styles.rentDetailsInnerContainer}>
                <View style={styles.rentStatsContainer}>
                  {/* Paid Section */}
                  <View style={styles.rentStatColumn}>
                    <Text style={styles.rentStatTopLabel}>Paid</Text>
                    <View style={styles.rentStatNumberContainer}>
                      <Text style={styles.rentStatNumber}>124</Text>
                    </View>
                    <Text style={styles.rentStatLabel}>Tenants</Text>
                    <Text style={styles.rentStatSubtext}>On-time: <Text style={styles.rentStatSubtexta}>56</Text></Text>
                  </View>
                  {/* Not-Paid Section */}
                  <View style={styles.rentStatColumn}>
                    <Text style={styles.rentStatTopLabela}>Not-Paid</Text>
                    <View style={styles.rentStatNumberContainera}>
                      <Text style={styles.rentStatNumberRed}>12</Text>
                    </View>
                    <Text style={styles.rentStatLabela}>Tenants</Text>
                    <TouchableOpacity style={styles.remindButton}>
                      <Image 
                        source={require('../assets/icons/bell.png')} 
                        style={styles.bellIcon}
                        resizeMode="contain"
                      />
                      <Text style={styles.remindButtonText}>REMIND TO PAY</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
    
              <TouchableOpacity style={styles.viewButton}>
                <Text style={styles.viewButtonText}>VIEW</Text>
              </TouchableOpacity>
            </View>
          </View>

          
          {/* Other Stats Section */}
          <View style={styles.otherStatsSection}>
            <View style={styles.otherStatsCard}>
              <Text style={styles.rentDetailsTitle}>Other Stats</Text>

              <View style={styles.otherStatsInnerContainer}>
                <View style={styles.otherStatsContainer}>
                  {/* Vacant Beds Section */}
                  <View style={styles.otherStatColumn}>
                    <Text style={styles.otherStatTopLabel}>Vacant Beds</Text>
                    <View style={styles.otherStatNumberContainer}>
                      <Text style={styles.otherStatNumber}>12</Text>
                      <Text style={styles.otherStatSlash}> / </Text>
                      <Text style={styles.otherStatTotal}>145</Text>
                    </View>
                    <Text style={styles.otherStatLabel}>Beds</Text>
                    <TouchableOpacity style={styles.otherViewButton}>
                      <Text style={styles.otherViewButtonText}>VIEW</Text>
                    </TouchableOpacity>
                  </View>

                  {/* Notice Period Section */}
                  <View style={styles.otherStatColumn}>
                    <Text style={styles.otherStatTopLabelRed}>Notice Period</Text>
                    <View style={styles.otherStatNumberContainer}>
                      <Text style={styles.otherStatNumberRed}>5</Text>
                      <Text style={styles.otherStatSlash}> / </Text>
                      <Text style={styles.otherStatTotal}>123</Text>
                    </View>
                    <Text style={styles.otherStatLabel}>Tenants</Text>
                    <TouchableOpacity style={styles.otherViewButton}>
                      <Text style={styles.otherViewButtonText}>VIEW</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Rental News Slider Section */}
          <View style={styles.rentalNewsSection}>
            <View style={styles.rentalNewsHeader}>
              <Text style={styles.rentalNewsTitle}>Rental News</Text>
              <TouchableOpacity onPress={handleSlidePress} >
            <Image
              source={require('../assets/right-arrow.png')}
              style={styles.rightArrowIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
            </View>

            <View style={styles.sliderContainer}>
              <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                style={styles.slider}
                contentOffset={{ x: currentSlideIndex * screenWidth*0.93, y: 0 }}
                onMomentumScrollEnd={(event) => {
                  const slideIndex = Math.round(event.nativeEvent.contentOffset.x / screenWidth*0.93);
                  setCurrentSlideIndex(slideIndex);
                }}
              >
                {newsSlides.map((slide, index) => (
                  <View key={slide.id} style={styles.slideItem}>
                    <Image
                      source={slide.image}
                      style={styles.slideImage}
                      resizeMode="cover"
                    />
                    <View style={styles.slideOverlay}>
                      <View style={styles.slideContent}>
                        <Text style={styles.slideTitle}>{slide.title}</Text>
                        <Text style={styles.slideSubtitle}>{slide.subtitle}</Text>
                        <View style={styles.slideTag}>
                          <Text style={styles.slideTagText}>{slide.tag}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                ))}
              </ScrollView>

              {/* Slide Indicators */}
              <View style={styles.slideIndicators}>
                {newsSlides.map((_, index) => (
                  <View
                    key={index}
                    style={[
                      styles.indicator,
                      index === currentSlideIndex && styles.activeIndicator
                    ]}
                  />
                ))}
              </View>
            </View>
          </View>
          
        </View>
      </ScrollView>

      {/* Bottom Tab Navigator */}
      <BottomTabNavigator
        activeTab={activeTab}
        onTabPress={handleTabPress}
        onAddPress={handleAddPress}
        onPropertyPress={handlePropertyPress}
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
    top: (screenHeight*0.0177),
  },
  
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: screenWidth*0.0472,
    marginTop: screenHeight*0.013,
    marginBottom: screenWidth*0.033,
    height: screenHeight*0.055,
    borderRadius: 22,
    borderWidth: 0.5,
    borderColor: '#D8D8ED',
    backgroundColor: '#FFFFFF',
    paddingLeft: screenWidth*0.044,
    paddingRight: screenWidth*0.044,
  },
  searchIcon: {
    width: screenWidth*0.055,
    height: screenHeight*0.025,
    marginRight: screenWidth*0.033,
    tintColor: '#9CA3AF',
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#000000',
    fontFamily: 'Montserrat-regular',
    paddingVertical: 0,
  },
  
  dashboardContent: {
    paddingHorizontal: screenWidth*0.055,
    paddingTop: screenHeight*0.0125,
    paddingBottom:screenHeight*0.0813
  },
  
  summarySection: {
    marginBottom: screenHeight*0.03,
  },
  summaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: screenHeight*0.02,
    paddingHorizontal: 0,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
    fontFamily: 'Montserrat-Bold',
    lineHeight: screenHeight*0.0263,
    letterSpacing:0
  },
  allPropertyButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  allPropertyText: {
    fontSize: 13,
    fontWeight: '300',
    color: '#666666',
    fontFamily: 'Montserrat',
    lineHeight: screenHeight*0.019,
    marginRight: screenWidth*0.0139,
  },
  summaryDropdown: {
    width: screenWidth*0.033,
    height: screenHeight*0.016,
    borderRadius: 1,
  },
  summaryScrollView: {
    marginHorizontal: -(screenWidth*0.055),
  },
  summaryCardsContainer: {
    paddingHorizontal: screenWidth*0.055,
    paddingRight: screenWidth*0.033,
  },
  summaryCardDark: {
    width: screenWidth*0.43,
    height: screenHeight*0.115,
    backgroundColor: '#242424',
    borderRadius: 8,
    borderWidth: 1.1,
    borderColor: '#EAE7E7',
    padding: screenWidth*0.044,
    marginRight: screenWidth*0.033,
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
    width: screenWidth*0.43,
    height: screenHeight*0.115,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1.1,
    borderColor: '#EAE7E7',
    padding: screenWidth*0.044,
    marginRight: screenWidth*0.033,
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
    lineHeight: screenHeight*0.04,
    marginBottom: screenHeight*0.005,
    width:screenWidth*0.255,
    height:screenHeight*0.04,
    top:-(screenHeight*0.0063)
  },
  cardAmountLight: {
    fontSize: 22,
    fontWeight: '700',
    color: '#33B94D',
    fontFamily: 'Inter-Bold',
    lineHeight: screenHeight*0.04,
    marginBottom: screenHeight*0.005,
    width:screenWidth*0.255,
    height:screenHeight*0.04,
    top:-(screenHeight*0.0063)
  },
  cardLabelDark: {
    fontSize: 13,
    fontWeight: '400',
    color: '#FFF',
    fontFamily: 'Montserrat-Regular',
    lineHeight: screenHeight*0.02,
    position: 'absolute',
    bottom: screenHeight*0.02,
    left: screenWidth*0.044,
    width: screenWidth*0.183,
  },
  cardLabelLight: {
    fontSize: 13,
    fontWeight: '400',
    color: '#000',
    fontFamily: 'Montserrat-Regular',
    lineHeight: screenHeight*0.02,
    position: 'absolute',
    bottom: screenHeight*0.02,
    left: screenWidth*0.044,
    width: screenWidth*0.361,
  },
  cardAmountLighta: {
    fontSize: 22,
    fontWeight: '700',
    color: '#EF1D1D',
    fontFamily: 'Inter-Bold',
    lineHeight: screenHeight*0.04,
    marginBottom: screenHeight*0.005,
    width:screenWidth*0.255,
    height:screenHeight*0.04,
    top:-(screenHeight*0.0063)
  },
  rupeeIconContainer: {
    position: 'absolute',
    top: screenHeight*0.055,
    right: screenWidth*0.055,
    transform: [{ rotate: '-0.03deg' }],
  },
  rupeeIcon: {
    fontSize: 32,
    color: '#FFFFFF',
    fontWeight: 'bold',
    opacity: 0.2,
  },

  quickActionsSection: {
    marginBottom: screenHeight*0.03,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
    fontFamily: 'Montserrat-Bold',
    lineHeight: screenHeight*0.0263,
    letterSpacing:0,
    marginBottom:screenHeight*0.02,
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionButton: {
    width: '18%',
    alignItems: 'center',
    marginBottom: screenHeight*0.02,
  },
  actionIcon: {
    width: screenWidth*0.156,
    height: screenHeight*0.07,
    borderRadius: 28,
    backgroundColor: '#F8F9FA',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: screenHeight*0.01,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  actionIconImage: {
    width: screenWidth*0.67,
    height: screenHeight*0.03,
    tintColor: '#666666',
  },
  FrameIconImage: {
    width: screenWidth*0.117,
    height: screenHeight*0.065,
    tintColor: '#FFF',
    left:screenWidth*0.05
  },
  actionText: {
    fontSize: 10,
    color: '#333333',
    textAlign: 'center',
    fontFamily: 'Poppins',
    lineHeight: screenHeight*0.015,
  },
rentDetailsSection: {
  marginBottom: screenHeight*0.03,
},
rentDetailsCard: {
  width: screenWidth*0.93,
  height: screenHeight*0.30125,
  right: screenWidth*0.02,
  backgroundColor: '#FFF4B8',
  borderRadius: 10,
  borderWidth: 1,
  borderColor: '#606161',
  position: 'relative',
  shadowColor: '#171A1F',
  shadowOffset: {
    width: 0,
    height: 0,
  },
  shadowOpacity: 0.05,
  shadowRadius: 1,
  elevation: 3,
},
rentDetailsTitle: {
  fontSize: 15,
  fontWeight: '600',
  color: '#060606',
  fontFamily: 'Montserrat-Bold',
  marginTop: screenHeight*0.0163,
  textAlign: 'center',
},
rentDetailsInnerContainer: {
  position: 'absolute',
  top: screenHeight*0.0475,
  left: screenWidth*0.048,
  width: screenWidth*0.839,
  height: screenHeight*0.1763,
  backgroundColor: '#FFFFFF',
  borderRadius: 10,
  borderWidth: 1,
  borderColor: '#FFFFFF',
  shadowColor: '#171A1F',
  shadowOffset: {
    width: 2,
    height: 1.5,
  },
  shadowOpacity: 0.05,
  shadowRadius: 2.5,
  elevation: 2,
},
rentStatsContainer: {
  position: 'absolute',
  top: screenHeight*0.0125,
  left: screenWidth*0.1583,
  width: screenWidth*0.539,
  height: screenHeight*0.1013,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
},
rentStatLeft: {
  alignItems: 'flex-start',
  flex: 1,
},
rentStatRight: {
  alignItems: 'flex-end',
  flex: 1,
  paddingRight: screenWidth*0.0278,
},
rentStatLabel: {
  fontSize: 14,
  fontWeight: '400',
  color: '#000000',
  fontFamily: 'Inter',
  lineHeight: screenHeight*0.025,
  left:-( screenWidth*0.104)
},
rentStatLabela: {
  fontSize: 14,
  fontWeight: '400',
  color: '#000000',
  fontFamily: 'Inter',
  lineHeight: screenHeight*0.025,
  left:screenWidth*0.1,
},
rentStatSubtext: {
  fontSize: 14,
  fontWeight: '500',
  color: '#000000',
  fontFamily: 'poppins-Medium',
  lineHeight: screenHeight*0.025,
  position: 'absolute',
  top: screenHeight*0.1163,
  left: -(screenWidth*0.055),
},
rentStatSubtexta: {
  fontSize: 14,
  fontWeight: '500',
  color: '#000000',
  fontFamily: 'Inter-Bold',
  lineHeight: screenHeight*0.025,
  position: 'absolute',
  top: screenHeight*0.1175,
  left: screenWidth*0.1695,
},

rentStatColumn: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
},
rentStatTopLabel: {
  fontFamily: 'Inter',
  fontWeight: '500',
  fontSize: 14,
  lineHeight: screenHeight*0.025,
  color: '#171A1F',
  textAlign: 'center',
  width: screenWidth*0.167,
  marginBottom: screenHeight*0.0025,
  marginRight:screenWidth*0.2084
},
rentStatTopLabela: {
  fontFamily: 'Inter',
  fontWeight: '500',
  fontSize: 14,
  lineHeight: screenHeight*0.025,
  color: '#171A1F',
  textAlign: 'center',
  width: screenWidth*0.167,
  marginBottom: screenHeight*0.0025,
  marginLeft:screenWidth*0.1917
},
rentStatNumberContainer: {
  width: screenWidth*0.167,
  height: screenHeight*0.045,
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: screenHeight*0.0025,
  marginRight:screenWidth*0.2084
},
rentStatNumberContainera: {
  width: screenWidth*0.167,
  height: screenHeight*0.045,
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: screenHeight*0.0025,
  marginLeft:screenWidth*0.1917
},
rentStatNumber: {
  fontSize: 25,
  fontWeight: '700',
  color: '#000000',
  fontFamily: 'Montserrat-Bold',
  textAlign: 'center',
  width: screenWidth*0.167,
  lineHeight: screenHeight*0.045,
},
rentStatNumberRed: {
  fontSize: 25,
  fontWeight: '700',
  color: '#E74C3C',
  fontFamily: 'Montserrat-Bold',
  textAlign: 'center',
  width: screenWidth*0.167,
  lineHeight: screenHeight*0.045,
},
remindButton: {
  position: 'absolute',
  top: screenHeight*0.1063,
  left: screenWidth*0.028,
  width: screenWidth*0.3584,
  height: screenHeight*0.04375,
  backgroundColor: '#FFFFFF',
  borderRadius: 6,
  borderWidth: 1,
  borderColor: '#656272',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  paddingHorizontal: screenWidth*0.022,
},
bellIcon: {
  width: screenWidth*0.055,
  height: screenHeight*0.025,
  left:-(screenWidth*0.022),
  tintColor: '#333333',
},
remindButtonText: {
  fontSize: 12,
  fontWeight: '700',
  color: '#333333',
  fontFamily: 'Montserrat-Bold',
  textAlign: 'center',
},
viewButton: {
  position: 'absolute',
  top: screenHeight*0.239,
  left: screenWidth*0.325,
  width: screenWidth*0.3,
  height: screenHeight*0.045,
  backgroundColor: '#333333',
  borderRadius: 6,
  borderWidth: 1,
  borderColor: '#000000',
  alignItems: 'center',
  justifyContent: 'center',
},
viewButtonText: {
  fontSize: 16,
  fontWeight: '500',
  color: '#FFFFFF',
  fontFamily: 'Inter',
  lineHeight: screenHeight*0.0325,
  textAlign: 'center',
},
otherStatsSection: {
  marginBottom: screenHeight*0.03,
},
otherStatsCard: {
  width: screenWidth*0.93,
  height: screenHeight*0.27,
  right: screenWidth*0.02,
  backgroundColor: '#FFF4B8',
  borderRadius: 10,
  borderWidth: 1,
  borderColor: '#606161',
  position: 'relative',
  shadowColor: '#171A1F',
  shadowOffset: {
    width: 0,
    height: 0,
  },
  shadowOpacity: 0.05,
  shadowRadius: 1,
  elevation: 3,
},
otherStatsInnerContainer: {
  position: 'absolute',
  top: screenHeight*0.049,
  left: screenWidth*0.048,
  width: screenWidth*0.839,
  height: screenHeight*0.19,
  backgroundColor: '#FFFFFF',
  borderRadius: 10,
  borderWidth: 1,
  borderColor: '#FFFFFF',
  shadowColor: '#171A1F',
  shadowOffset: {
    width: 4,
    height: 3,
  },
  shadowOpacity: 0.05,
  shadowRadius: 2.5,
  elevation: 4,
},
otherStatsContainer: {
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'flex-start',
  paddingTop: screenHeight*0.025,
  paddingHorizontal: screenWidth*0.055,
},
otherStatColumn: {
  alignItems: 'center',
  flex: 1,
},
otherStatTopLabel: {
  fontSize: 14,
  fontWeight: '600',
  color: '#000000',
  fontFamily: 'Inter',
  lineHeight: screenHeight*0.025,
  marginBottom: screenHeight*0.015,
  textAlign: 'center',
  bottom:screenHeight*0.005
},
otherStatTopLabelRed: {
  fontSize: 14,
  fontWeight: '600',
  color: '#000000',
  fontFamily: 'Inter',
  lineHeight: screenHeight*0.025,
  marginBottom: screenHeight*0.015,
  textAlign: 'center',
  bottom: screenHeight*0.005
},
otherStatNumberContainer: {
  flexDirection: 'row',
  alignItems: 'baseline',
  justifyContent: 'center',
  marginBottom: screenHeight*0.01,
  bottom:screenHeight*0.0125
},
otherStatNumber: {
  fontSize: 25,
  fontWeight: '700',
  color: '#000000',
  fontFamily: 'Montserrat',
  lineHeight: screenHeight*0.045,
},
otherStatNumberRed: {
  fontSize: 25,
  fontWeight: '700',
  color: '#E74C3C',
  fontFamily: 'Montserrat',
  lineHeight: screenHeight*0.045,
},
otherStatSlash: {
  fontSize: 20,
  fontWeight: '400',
  color: '#666666',
  fontFamily: 'Montserrat-Bold',
  lineHeight: screenHeight*0.04,
  
},
otherStatTotal: {
  fontSize: 20,
  fontWeight: '400',
  color: '#666666',
  fontFamily: 'Montserrat-Bold',
  lineHeight: screenHeight*0.04,
    
},
otherStatLabel: {
  fontSize: 14,
  fontWeight: '400',
  color: '#000000',
  fontFamily: 'Inter',
  lineHeight: screenHeight*0.025,
  marginBottom: screenHeight*0.015,
  bottom:screenHeight*0.02,
  textAlign: 'center',
},
otherViewButton: {
  width: screenWidth*0.2639,
  height: screenHeight*0.0413,
  bottom:screenHeight*0.025,
  backgroundColor: '#FEFEFE',
  borderRadius: 5,
  borderWidth: 1,
  borderColor: '#4F4F4F',
  alignItems: 'center',
  justifyContent: 'center',
},
otherViewButtonText: {
  fontSize: 14,
  width:screenWidth*0.1028,
  fontWeight: '600',
  color: '#000000',
  fontFamily: 'Montserrat-SemiBold',
  lineHeight: screenHeight*0.0325,
  textAlign: 'center',
},
rentalNewsSection: {
  left:-(screenWidth*0.0472),
  marginBottom: screenHeight*0.03,
  marginHorizontal: screenWidth*0.0472,
},
rentalNewsHeader: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: screenHeight*0.015,
  paddingHorizontal: 2,
},
rentalNewsTitle: {
  fontSize: 18,
  fontWeight: '700',
  color: '#000000',
  fontFamily: 'Montserrat-Bold',
  lineHeight: screenHeight*0.026,
  letterSpacing:0,
},
rightArrowIcon: {
  width: screenWidth*0.0639,
  height: screenHeight*0.029,
  left:screenWidth*0.0695,
  tintColor: '#000000',
},
sliderContainer: {
  width: screenWidth*0.93,
  height: screenHeight*0.25,
  position: 'relative',
  right:screenWidth*0.015
},
slider: {
  width: '100%',
  height: '100%',
},
slideItem: {
  width: screenWidth*0.93,
  height: screenHeight*0.25,
  borderRadius: 12,
  overflow: 'hidden',
  position: 'relative',
},
slideImage: {
  width: '100%',
  height: '100%',
},
slideOverlay: {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.3)',
  justifyContent: 'flex-end',
  padding: screenHeight*0.025,
},
slideContent: {
  alignItems: 'flex-start',
},
slideTitle: {
  fontSize: 20,
  fontWeight: '700',
  color: '#FFFFFF',
  fontFamily: 'Montserrat',
  lineHeight: screenHeight*0.03,
  marginBottom: screenHeight*0.005,
},
slideSubtitle: {
  fontSize: 14,
  fontWeight: '400',
  color: '#FFFFFF',
  fontFamily: 'Inter',
  lineHeight: screenHeight*0.0225,
  marginBottom: screenHeight*0.0225,
},
slideTag: {
  backgroundColor: '#4CAF50',
  paddingHorizontal: screenWidth*0.033,
  paddingVertical: screenHeight*0.0075,
  borderRadius: 16,
  alignSelf: 'flex-start',
},
slideTagText: {
  fontSize: 12,
  fontWeight: '500',
  color: '#FFFFFF',
  fontFamily: 'Inter',
  lineHeight: screenHeight*0.0175,
},
slideIndicators: {
  position: 'absolute',
  bottom: screenHeight*0.0125,
  left: 0,
  right: 0,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
},
indicator: {
  width: screenWidth*0.022,
  height: screenHeight*0.01,
  borderRadius: 4,
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  marginHorizontal: 3,
},
activeIndicator: {
  backgroundColor: '#FFFFFF',
  width: screenWidth*0.033,
  height: screenHeight*0.01,
  borderRadius: 4,
},
});