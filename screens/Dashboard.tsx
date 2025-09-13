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

const { width: screenWidth } = Dimensions.get('window');

interface DashboardScreenProps {
  userName?: string;
  propertyName?: string;
}

export default function DashboardScreen({ 
  userName = 'Gyana',
  propertyName = 'Kalyani Nagar'
}: DashboardScreenProps) {
  const [activeTab, setActiveTab] = useState('home');
  const [searchText, setSearchText] = useState('');
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const slideInterval = useRef<NodeJS.Timeout | null>(null);

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
  }, 1800); // Change slide every 3 seconds

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

  const handleTabPress = (tabId: string) => {
    setActiveTab(tabId);
    
    // Handle navigation based on tab
    switch (tabId) {
      case 'home':
        console.log('Navigate to Home');
        break;
      case 'money':
        console.log('Navigate to Money/Payments');
        break;
      case 'tenants':
        console.log('Navigate to Tenants');
        break;
      case 'property':
        console.log('Navigate to Property');
        break;
      default:
        break;
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

  const handleLocationPress = () => {
    console.log('Location pressed');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Navbar */}
      <Navbar
        userName={userName}
        propertyName={propertyName}
        onProfilePress={handleProfilePress}
        onSupportPress={handleSupportPress}
      />

      {/* Search Bar */}
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
      
      {/* Main Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
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
      contentOffset={{ x: currentSlideIndex * 341, y: 0 }}
      onMomentumScrollEnd={(event) => {
        const slideIndex = Math.round(event.nativeEvent.contentOffset.x / 341);
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
  },
  
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 17,
    marginTop: 23,
    marginBottom: 12,
    height: 44,
    borderRadius: 22,
    borderWidth: 0.5,
    borderColor: '#D8D8ED',
    backgroundColor: '#FFFFFF',
    paddingLeft: 16,
    paddingRight: 16,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 12,
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
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom:65
  },
  
  summarySection: {
    marginBottom: 24,
  },
  summaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 0,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
    fontFamily: 'Montserrat-Bold',
    lineHeight: 21,
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
    lineHeight: 15,
    marginRight: 5,
  },
  summaryDropdown: {
    width: 12,
    height: 13,
    borderRadius: 1,
  },
  summaryScrollView: {
    marginHorizontal: -20,
  },
  summaryCardsContainer: {
    paddingHorizontal: 20,
    paddingRight: 12,
  },
  summaryCardDark: {
    width: 155,
    height: 92,
    backgroundColor: '#242424',
    borderRadius: 8,
    borderWidth: 1.1,
    borderColor: '#EAE7E7',
    padding: 16,
    marginRight: 12,
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
    width: 155,
    height: 92,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1.1,
    borderColor: '#EAE7E7',
    padding: 16,
    marginRight: 12,
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
    lineHeight: 32,
    marginBottom: 4,
    width:92,
    height:32,
    top:-5
  },
  cardAmountLight: {
    fontSize: 22,
    fontWeight: '700',
    color: '#33B94D',
    fontFamily: 'Inter-Bold',
    lineHeight: 32,
    marginBottom: 4,
    width:92,
    height:32,
    top:-5
  },
  cardLabelDark: {
    fontSize: 13,
    fontWeight: '400',
    color: '#FFF',
    fontFamily: 'Montserrat-Regular',
    lineHeight: 16,
    position: 'absolute',
    bottom: 16,
    left: 16,
    width: 66,
  },
  cardLabelLight: {
    fontSize: 13,
    fontWeight: '400',
    color: '#000',
    fontFamily: 'Montserrat-Regular',
    lineHeight: 16,
    position: 'absolute',
    bottom: 16,
    left: 16,
    width: 130,
  },
  cardAmountLighta: {
    fontSize: 22,
    fontWeight: '700',
    color: '#EF1D1D',
    fontFamily: 'Inter-Bold',
    lineHeight: 32,
    marginBottom: 4,
    width:92,
    height:32,
    top:-5
  },
  rupeeIconContainer: {
    position: 'absolute',
    top: 44,
    right: 20,
    transform: [{ rotate: '-0.03deg' }],
  },
  rupeeIcon: {
    fontSize: 32,
    color: '#FFFFFF',
    fontWeight: 'bold',
    opacity: 0.2,
  },

  quickActionsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
    fontFamily: 'Montserrat-Bold',
    lineHeight: 21,
    letterSpacing:0,
    marginBottom:16,
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionButton: {
    width: '18%',
    alignItems: 'center',
    marginBottom: 16,
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#F8F9FA',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  actionIconImage: {
    width: 24,
    height: 24,
    tintColor: '#666666',
  },
  FrameIconImage: {
    width: 42,
    height: 52,
    tintColor: '#FFF',
    left:18
  },
  actionText: {
    fontSize: 10,
    color: '#333333',
    textAlign: 'center',
    fontFamily: 'Poppins',
    lineHeight: 12,
  },
rentDetailsSection: {
  marginBottom: 24,
},
rentDetailsCard: {
  width: 341,
  height: 241,
  left:-17,
  backgroundColor: '#FFF4B8',
  borderRadius: 10,
  borderWidth: 1,
  borderColor: '#606161',
  marginHorizontal: 17,
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
  marginTop: 13,
  textAlign: 'center',
},
rentDetailsInnerContainer: {
  position: 'absolute',
  top: 38,
  left: 20,
  width: 302,
  height: 141,
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
  top: 10,
  left: 57,
  width: 194,
  height: 81,
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
  paddingRight: 10,
},
rentStatLabel: {
  fontSize: 14,
  fontWeight: '400',
  color: '#000000',
  fontFamily: 'Inter',
  lineHeight: 20,
  left:-35
},
rentStatLabela: {
  fontSize: 14,
  fontWeight: '400',
  color: '#000000',
  fontFamily: 'Inter',
  lineHeight: 20,
  marginLeft:69
},
rentStatSubtext: {
  fontSize: 14,
  fontWeight: '500',
  color: '#000000',
  fontFamily: 'poppins-Medium',
  lineHeight: 20,
  position: 'absolute',
  top: 93,
  left: -20,
},
rentStatSubtexta: {
  fontSize: 14,
  fontWeight: '500',
  color: '#000000',
  fontFamily: 'Inter-Bold',
  lineHeight: 20,
  position: 'absolute',
  top: 94,
  left: 61,
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
  lineHeight: 20,
  color: '#171A1F',
  textAlign: 'center',
  width: 60,
  marginBottom: 2,
  marginRight:75

},
rentStatTopLabela: {
  fontFamily: 'Inter',
  fontWeight: '500',
  fontSize: 14,
  lineHeight: 20,
  color: '#171A1F',
  textAlign: 'center',
  width: 60,
  marginBottom: 2,
  marginLeft:69
},
rentStatNumberContainer: {
  width: 60,
  height: 36,
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: 2,
  marginRight:75
},
rentStatNumberContainera: {
  width: 60,
  height: 36,
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: 2,
  marginLeft:69
},
rentStatNumber: {
  fontSize: 25,
  fontWeight: '700',
  color: '#000000',
  fontFamily: 'Montserrat-Bold',
  textAlign: 'center',
  width: 60,
  lineHeight: 36,
},
rentStatNumberRed: {
  fontSize: 25,
  fontWeight: '700',
  color: '#E74C3C',
  fontFamily: 'Montserrat-Bold',
  textAlign: 'center',
  width: 60,
  lineHeight: 36,
},
remindButton: {
  position: 'absolute',
  top: 85,
  left: 10,
  width: 129,
  height: 35,
  backgroundColor: '#FFFFFF',
  borderRadius: 6,
  borderWidth: 1,
  borderColor: '#656272',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  paddingHorizontal: 8,
},
bellIcon: {
  width: 20,
  height: 20,
  left:-8,
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
  top: 191,
  left: 117,
  width: 108,
  height: 36,
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
  lineHeight: 26,
  textAlign: 'center',
},
otherStatsSection: {
  marginBottom: 24,
},
otherStatsCard: {
  width: 341,
  height: 203,
  left:-17,
  backgroundColor: '#FFF4B8',
  borderRadius: 10,
  borderWidth: 1,
  borderColor: '#606161',
  marginHorizontal: 17,
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
  top: 39,
  left: 19,
  width: 302,
  height: 146,
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
  paddingTop: 20,
  paddingHorizontal: 20,
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
  lineHeight: 20,
  marginBottom: 12,
  textAlign: 'center',
  bottom:4
},
otherStatTopLabelRed: {
  fontSize: 14,
  fontWeight: '600',
  color: '#000000',
  fontFamily: 'Inter',
  lineHeight: 20,
  marginBottom: 12,
  textAlign: 'center',
  bottom:4
},
otherStatNumberContainer: {
  flexDirection: 'row',
  alignItems: 'baseline',
  justifyContent: 'center',
  marginBottom: 8,
  bottom:10
},
otherStatNumber: {
  fontSize: 25,
  fontWeight: '700',
  color: '#000000',
  fontFamily: 'Montserrat',
  lineHeight: 36,
},
otherStatNumberRed: {
  fontSize: 25,
  fontWeight: '700',
  color: '#E74C3C',
  fontFamily: 'Montserrat',
  lineHeight: 36,
},
otherStatSlash: {
  fontSize: 20,
  fontWeight: '400',
  color: '#666666',
  fontFamily: 'Montserrat-Bold',
  lineHeight: 32,
  
},
otherStatTotal: {
  fontSize: 20,
  fontWeight: '400',
  color: '#666666',
  fontFamily: 'Montserrat-Bold',
  lineHeight: 32,
    
},
otherStatLabel: {
  fontSize: 14,
  fontWeight: '400',
  color: '#000000',
  fontFamily: 'Inter',
  lineHeight: 20,
  marginBottom: 12,
  bottom:16,
  textAlign: 'center',
},
otherViewButton: {
  width: 95,
  height: 33,
  bottom:20,
  backgroundColor: '#FEFEFE',
  borderRadius: 5,
  borderWidth: 1,
  borderColor: '#4F4F4F',
  alignItems: 'center',
  justifyContent: 'center',
},
otherViewButtonText: {
  fontSize: 14,
  width:37,
  fontWeight: '600',
  color: '#000000',
  fontFamily: 'Montserrat-SemiBold',
  lineHeight: 26,
  textAlign: 'center',
},
rentalNewsSection: {
  left:-17,
  marginBottom: 24,
  marginHorizontal: 17,
},
rentalNewsHeader: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 4,
  paddingHorizontal: 2,
},
rentalNewsTitle: {
  fontSize: 18,
    fontWeight: '700',
    color: '#000000',
    fontFamily: 'Montserrat-Bold',
    lineHeight: 21,
    letterSpacing:0,
    marginBottom:16,
},
rightArrowIcon: {
  width: 23,
  height: 23,
  left:25
},
sliderContainer: {
  width: 341,
  height: 200,
  position: 'relative',
},
slider: {
  width: '100%',
  height: '100%',
},
slideItem: {
  width: 341,
  height: 200,
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
  padding: 20,
},
slideContent: {
  alignItems: 'flex-start',
},
slideTitle: {
  fontSize: 20,
  fontWeight: '700',
  color: '#FFFFFF',
  fontFamily: 'Montserrat',
  lineHeight: 24,
  marginBottom: 4,
},
slideSubtitle: {
  fontSize: 14,
  fontWeight: '400',
  color: '#FFFFFF',
  fontFamily: 'Inter',
  lineHeight: 18,
  marginBottom: 12,
},
slideTag: {
  backgroundColor: '#4CAF50',
  paddingHorizontal: 12,
  paddingVertical: 6,
  borderRadius: 16,
  alignSelf: 'flex-start',
},
slideTagText: {
  fontSize: 12,
  fontWeight: '500',
  color: '#FFFFFF',
  fontFamily: 'Inter',
  lineHeight: 14,
},
slideIndicators: {
  position: 'absolute',
  bottom: 10,
  left: 0,
  right: 0,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
},
indicator: {
  width: 8,
  height: 8,
  borderRadius: 4,
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  marginHorizontal: 3,
},
activeIndicator: {
  backgroundColor: '#FFFFFF',
  width: 12,
  height: 8,
  borderRadius: 4,
},
});