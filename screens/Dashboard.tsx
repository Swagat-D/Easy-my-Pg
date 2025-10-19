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
import AddTenantScreen from './AddTenantScreen';
import ProfileDetailsScreen from './ProfileDetailsScreen';
import EditProfileScreen from './EditProfileScreen';
import RentalDetailsScreen from './RentalDetailsScreen';
import TenantBookingViewScreen from './TenantBookingViewScreen';
import MoneyContainer from './Money/MoneyContainer';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Responsive sizing helpers
const responsiveSize = (size: number, dimension: 'width' | 'height' = 'height') => {
  const baseWidth = 375; 
  const baseHeight = 812; 
  
  if (dimension === 'width') {
    return (size / baseWidth) * screenWidth;
  }
  return (size / baseHeight) * screenHeight;
};

const responsiveFontSize = (size: number) => {
  const scale = screenWidth / 375;
  const newSize = size * scale;
  
  // Ensure minimum and maximum font sizes
  return Math.max(12, Math.min(newSize, size * 1.3));
};

interface Tenant {
  id: string;
  name: string;
  profileImage?: string;
  room: string;
  underNotice: boolean;
  rentDue: boolean;
  joinedDate: string;
  mobile: string;
}

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
  const [currentScreen, setCurrentScreen] = useState<'property' | 'dashboard' | 'tenants' | 'addProperty' | 'money' | 'addTenant' | 'profileDetails' | 'editProfile' | 'rentalDetails' | 'tenantBookingView'>('dashboard');
  const [addTenantSource, setAddTenantSource] = useState<'property' | 'tenants' | 'dashboard'>('tenants');
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);
  const [searchText, setSearchText] = useState('');
  const [showDashboard, setShowDashboard] = useState(false);
  const [summaryExpanded, setSummaryExpanded] = useState(false);
  const [selectedSummaryTab, setSelectedSummaryTab] = useState<'collection' | 'dues' | 'expenses'>('collection');

  const getCurrentMonth = () => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[new Date().getMonth()];
  };

  const handlePropertyPress = () => {
    if (onPropertyPress) {
      onPropertyPress();
    } else {
      setActiveTab('property');
      setCurrentScreen('property');
    }
  };

  const handleTenantProfilePress = (tenant: Tenant) => {
    setSelectedTenant(tenant);
    setCurrentScreen('profileDetails');
  };

  const handleViewBookingPress = () => {
    setCurrentScreen('tenantBookingView');
  };

  const handleBackFromBookingView = () => {
    setCurrentScreen('tenants');
  };

  const handleBackFromProfile = () => {
    setSelectedTenant(null);
    setCurrentScreen('tenants');
  };

  const handleEditProfile = (profileData: any) => {
    console.log('Edit Profile pressed with data:', profileData);
    setCurrentScreen('editProfile');
  };

  const handleBackFromEditProfile = () => {
    setCurrentScreen('profileDetails');
  };

  const handleRentalDetails = (rentalData: any) => {
    console.log('Rental Details pressed with data:', rentalData);
    setCurrentScreen('rentalDetails');
  };

  const handleBackFromRentalDetails = () => {
    setCurrentScreen('profileDetails');
  };

  const handleTabPress = (tabId: string) => {
    setActiveTab(tabId);
    if (tabId === 'property') {
      setCurrentScreen('property');
    } else if (tabId === 'tenants') {
      setCurrentScreen('tenants');
    } else if (tabId === 'money') {
      setCurrentScreen('money');
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

  if (currentScreen === 'addProperty') {
    return (
      <AddPropertyScreen 
        onTabPress={(tabId) => {
          setActiveTab(tabId);
          if (tabId === 'property') {
            setCurrentScreen('property');
          } else if (tabId === 'tenants') {
            setCurrentScreen('tenants');
          } else if (tabId === 'money') {
            setCurrentScreen('money');
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
          } else if (tabId === 'money') {
            setCurrentScreen('money');
          } else if (tabId === 'addProperty') {
            setCurrentScreen('addProperty');
          }
        }}
        onHomePress={() => {
          setActiveTab('home');
          setCurrentScreen('dashboard');
        }}
        onAddTenantPress={() => {
          setCurrentScreen('dashboard');
          setAddTenantSource('property');
          setCurrentScreen('addTenant');
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
          } else if (tabId === 'money') {
            setCurrentScreen('money');
          } else if (tabId === 'addProperty') {
            setCurrentScreen('addProperty');
          }
        }}
        onHomePress={() => {
          setActiveTab('home');
          setCurrentScreen('dashboard');
        }}
        onAddTenantPress={() => {
          setAddTenantSource('tenants');
          setCurrentScreen('addTenant');
        }}
        onTenantProfilePress={handleTenantProfilePress}
        onViewBookingPress={handleViewBookingPress}
      />
    );
  }

  if (currentScreen === 'money') {
    return (
      <MoneyContainer 
        activeTab={activeTab}
        onTabPress={(tabId) => {
          setActiveTab(tabId);
          if (tabId === 'property') {
            setCurrentScreen('property');
          } else if (tabId === 'home') {
            setCurrentScreen('dashboard');
          } else if (tabId === 'tenants') {
            setCurrentScreen('tenants');
          } else if (tabId === 'money') {
            setCurrentScreen('money');
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

  if (currentScreen === 'addTenant') {
    return (
      <AddTenantScreen 
        onBackPress={() => {
          setCurrentScreen(addTenantSource);
        }}
      />
    );
  }

  if (currentScreen === 'profileDetails' && selectedTenant) {
    return (
      <ProfileDetailsScreen 
        tenantData={{
          name: selectedTenant.name,
          room: selectedTenant.room,
          rent: '₹15000',
          deposit: '₹30000',
          doj: selectedTenant.joinedDate || '04 Oct 2025',
          dol: '04 Jul 2026',
          profileImage: selectedTenant.profileImage,
        }}
        onBackPress={handleBackFromProfile}
        onEditProfile={handleEditProfile}
        onRentalDetails={handleRentalDetails}
      />
    );
  }

  if (currentScreen === 'editProfile' && selectedTenant) {
    return (
      <EditProfileScreen 
        profileData={{
          fullName: selectedTenant.name,
          gender: 'Female',
          profession: 'Student',
          phoneNumber: selectedTenant.mobile?.replace('+91', '') || '9876543210',
          email: 'soumya@example.com',
          permanentAddress: '123 Main Street, Kalyani Nagar',
          pincode: '411006',
          state: 'Maharashtra',
        }}
        onBackPress={handleBackFromEditProfile}
      />
    );
  }

  if (currentScreen === 'rentalDetails' && selectedTenant) {
    return (
      <RentalDetailsScreen 
        rentalData={{
          property: 'Kalyani Nagar',
          roomNo: selectedTenant.room,
          joiningDate: '04102025',
          moveOutDate: '04072026',
          lockInPeriod: '6 Months',
          noticePeriod: '30 Days',
          agreementPeriod: '11 Months',
          rentalType: 'Monthly',
          rentPrice: '15000',
          securityDeposit: '30000',
        }}
        onBackPress={handleBackFromRentalDetails}
      />
    );
  }

  if (currentScreen === 'tenantBookingView') {
    return (
      <TenantBookingViewScreen 
        userName={userName}
        propertyName={propertyName}
        onBackPress={handleBackFromBookingView}
        onTabPress={(tabId) => {
          setActiveTab(tabId);
          if (tabId === 'property') {
            setCurrentScreen('property');
          } else if (tabId === 'home') {
            setCurrentScreen('dashboard');
          } else if (tabId === 'tenants') {
            setCurrentScreen('tenants');
          } else if (tabId === 'money') {
            setCurrentScreen('money');
          } else if (tabId === 'addProperty') {
            setCurrentScreen('addProperty');
          }
        }}
        onHomePress={() => {
          setActiveTab('home');
          setCurrentScreen('dashboard');
        }}
        onAddTenantPress={() => {
          setAddTenantSource('tenants');
          setCurrentScreen('addTenant');
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
          
          {/* All Property Section */}
          <View style={styles.allPropertySection}>
            <TouchableOpacity style={styles.allPropertyDropdown}>
              <Text style={styles.allPropertyDropdownText}>All Property</Text>
              <Image 
                source={require('../assets/dropdown-arrow.png')} 
                style={styles.allPropertyDropdownIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          {/* Summary Section */}
          <View style={styles.summarySection}>
            {!summaryExpanded ? (
              // Collapsed View
              <View style={styles.collapsedSummaryContainer}>
                <View style={styles.collapsedNotch} />
                <Text style={styles.collapsedTitle}>Today's Collection</Text>
                <Text style={styles.collapsedAmount}>₹ 2,98,000</Text>
                <Text style={styles.collapsedPercentage}>+0.6%</Text>
                <Text style={styles.collapsedSubtext}>From last month</Text>
                
                <TouchableOpacity 
                  style={styles.expandButton}
                  onPress={() => setSummaryExpanded(true)}
                >
                  <View style={styles.expandIconCircle}>
                    <Image 
                      source={require('../assets/dropdown-arrow.png')} 
                      style={styles.expandArrow}
                      resizeMode="contain"
                    />
                  </View>
                </TouchableOpacity>
                </View>
            ) : (
              // Expanded View
              <View style={styles.expandedSummaryContainer}>
                <View style={styles.expandedNotch} />
                <Text style={styles.expandedTitle}>
                  {selectedSummaryTab === 'collection' ? 'Today\'s Collection' : 
                   selectedSummaryTab === 'dues' ? 'This Month Dues' : 'Today Expenses'}
                </Text>
                
                <Text style={styles.expandedAmount}>
                  {selectedSummaryTab === 'collection' ? '₹ 2,98,000' : 
                   selectedSummaryTab === 'dues' ? '₹ 52,365' : '₹ 6,99,670'}
                </Text>
                <Text style={styles.expandedPercentage}>+0.6%</Text>
                <Text style={styles.expandedSubtext}>From last month</Text>

                {/* Tab Navigation */}
                <View style={styles.tabContainer}>
                  <TouchableOpacity 
                    style={[styles.tabButton, selectedSummaryTab === 'dues' && styles.activeTabButton]}
                    onPress={() => setSelectedSummaryTab('dues')}
                  >
                    <Text style={[styles.tabText, selectedSummaryTab === 'dues' && styles.activeTabText]}>Dues</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.tabButton, selectedSummaryTab === 'collection' && styles.activeTabButton]}
                    onPress={() => setSelectedSummaryTab('collection')}
                  >
                    <Text style={[styles.tabText, selectedSummaryTab === 'collection' && styles.activeTabText]}>Collection</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.tabButton, selectedSummaryTab === 'expenses' && styles.activeTabButton]}
                    onPress={() => setSelectedSummaryTab('expenses')}
                  >
                    <Text style={[styles.tabText, selectedSummaryTab === 'expenses' && styles.activeTabText]}>Expenses</Text>
                  </TouchableOpacity>
                </View>

                {/* Horizontal Scrollable Cards */}
                <ScrollView 
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={styles.horizontalCardsScrollView}
                  contentContainerStyle={styles.horizontalCardsContainer}
                >
                  {selectedSummaryTab === 'collection' && [
                    { amount: '₹2,98,000', label: 'Today Collection', color: '#4CAF50' },
                    { amount: '₹6,99,670', label: 'This Month Collection', color: '#4CAF50' },
                    { amount: '₹6,99,670', label: 'Previous Month Collection', color: '#4CAF50' },
                    { amount: '₹6,99,670', label: 'This Month Electricity', color: '#4CAF50' },
                    { amount: '₹6,99,670', label: 'Total Collection', color: '#4CAF50' }
                  ].map((item, index) => (
                    <View key={index} style={styles.horizontalCard}>
                      <Text style={[styles.horizontalCardAmount, { color: item.color }]}>{item.amount}</Text>
                      <Text style={styles.horizontalCardLabel}>{item.label}</Text>
                    </View>
                  ))}

                  {selectedSummaryTab === 'dues' && [
                    { amount: '₹52,365', label: 'This Month Dues', color: '#EF4444' },
                    { amount: '₹6,99,670', label: 'Previous Month Dues', color: '#EF4444' },
                    { amount: '₹6,99,670', label: 'Total Dues', color: '#EF4444' }
                  ].map((item, index) => (
                    <View key={index} style={styles.horizontalCard}>
                      <Text style={[styles.horizontalCardAmount, { color: item.color }]}>{item.amount}</Text>
                      <Text style={styles.horizontalCardLabel}>{item.label}</Text>
                    </View>
                  ))}

                  {selectedSummaryTab === 'expenses' && [
                    { amount: '₹6,99,670', label: 'Today Expenses', color: '#F59E0B' },
                    { amount: '₹6,99,670', label: 'This Month Expenses', color: '#F59E0B' },
                    { amount: '₹6,99,670', label: 'Previous Month Expenses', color: '#F59E0B' }
                  ].map((item, index) => (
                    <View key={index} style={styles.horizontalCard}>
                      <Text style={[styles.horizontalCardAmount, { color: item.color }]}>{item.amount}</Text>
                      <Text style={styles.horizontalCardLabel}>{item.label}</Text>
                    </View>
                  ))}
                </ScrollView>

                <TouchableOpacity 
                  style={styles.collapseButton}
                  onPress={() => setSummaryExpanded(false)}
                >
                  <View style={styles.collapseIconCircle}>
                    <Image 
                      source={require('../assets/dropdown-arrow.png')} 
                      style={styles.collapseArrow}
                      resizeMode="contain"
                    />
                  </View>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Quick Actions Section */}
          <View style={styles.quickActionsSection}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <View style={styles.quickActions}>
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => {
                  setAddTenantSource('dashboard');
                  setCurrentScreen('addTenant');
                }}
                activeOpacity={0.7}
              >
                <View style={styles.actionIcon}>
                  <Image 
                    source={require('../assets/icons/user-plus.png')} 
                    style={styles.actionIconImage}
                    resizeMode="contain"
                  />
                </View>
                <Text style={styles.actionText}>Add Tenant</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => {
                  setActiveTab('money');
                  setCurrentScreen('money');
                }}
                activeOpacity={0.7}
              >
                <View style={styles.actionIcon}>
                  <Image 
                    source={require('../assets/icons/banknote.png')} 
                    style={styles.actionIconImage}
                    resizeMode="contain"
                  />
                </View>
                <Text style={styles.actionText}>Record Payments</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => {
                  console.log('Notice Board pressed');
                  // Add notice board navigation here
                }}
                activeOpacity={0.7}
              >
                <View style={styles.actionIcon}>
                  <Image 
                    source={require('../assets/icons/megaphone.png')} 
                    style={styles.actionIconImage}
                    resizeMode="contain"
                  />
                </View>
                <Text style={styles.actionText}>Notice Board</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => {
                  console.log('Add Leads pressed');
                  // Add leads navigation here
                }}
                activeOpacity={0.7}
              >
                <View style={styles.actionIcon}>
                  <Image 
                    source={require('../assets/icons/door-open.png')} 
                    style={styles.actionIconImage}
                    resizeMode="contain"
                  />
                </View>
                <Text style={styles.actionText}>Add Leads</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => {
                  console.log('Complaints pressed');
                  // Add complaints navigation here
                }}
                activeOpacity={0.7}
              >
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

          {/* Complaints Section */}
          <View style={styles.complaintsSection}>
            <View style={styles.complaintsCard}>
              <Text style={styles.rentDetailsTitle}>Complaints</Text>

              <View style={styles.complaintsInnerContainer}>
                <View style={styles.complaintsContainer}>
                  {/* Today Section */}
                  <View style={styles.complaintColumn}>
                    <Text style={styles.complaintTopLabel}>Today</Text>
                    <View style={styles.complaintNumberContainer}>
                      <Text style={styles.complaintNumberRed}>12</Text>
                    </View>
                    <Text style={styles.complaintLabel}>Complaints</Text>
                    <TouchableOpacity style={styles.complaintViewButton}>
                      <Text style={styles.complaintViewButtonText}>VIEW</Text>
                    </TouchableOpacity>
                  </View>

                  {/* Total Pending Section */}
                  <View style={styles.complaintColumn}>
                    <Text style={styles.complaintTopLabelRed}>Total Pending</Text>
                    <View style={styles.complaintNumberContainer}>
                      <Text style={styles.complaintNumberRed}>45</Text>
                    </View>
                    <Text style={styles.complaintLabel}>Complaints</Text>
                    <TouchableOpacity style={styles.complaintViewButton}>
                      <Text style={styles.complaintViewButtonText}>VIEW</Text>
                    </TouchableOpacity>
                  </View>
                </View>
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
    width: '19%',
    alignItems: 'center',
    marginBottom: screenHeight*0.02,
    paddingVertical: screenHeight*0.01,
    paddingHorizontal: screenWidth*0.005,
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
    width: screenWidth*0.067,
    height: screenHeight*0.03,
    tintColor: '#000000',
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
allPropertySection: {
  marginBottom: screenHeight * 0.015,
  alignItems: 'flex-end',
  position: 'relative',
  zIndex: 2,
},
allPropertyDropdown: {
  backgroundColor: '#FFD700',
  borderRadius: 20,
  marginBottom: -(screenHeight * 0.045),
  paddingVertical: screenHeight * 0.01,
  paddingHorizontal: screenWidth * 0.045,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  minWidth: screenWidth * 0.32,
  shadowColor: '#000000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.15,
  shadowRadius: 4,
  elevation: 4,
},
allPropertyDropdownText: {
  fontSize: 14,
  fontWeight: '600',
  color: '#000000',
  fontFamily: 'Inter-SemiBold',
  marginRight: screenWidth * 0.015,
},
allPropertyDropdownIcon: {
  width: screenWidth * 0.038,
  height: screenWidth * 0.038,
  tintColor: '#000000',
},
summarySection: {
  marginBottom: screenHeight * 0.02,
  position: 'relative',
  zIndex: 1,
},
collapsedSummaryContainer: {
  backgroundColor: '#2B2B2B',
  borderRadius: 16,
  marginTop: -(screenHeight * 0.0125),
  paddingTop: screenHeight * 0.022,
  paddingBottom: screenHeight * 0.025,
  paddingHorizontal: screenWidth * 0.045,
  minHeight: screenHeight * 0.18,
  position: 'relative',
  shadowColor: '#000000',
  shadowOffset: {
    width: 0,
    height: 4,
  },
  shadowOpacity: 0.2,
  shadowRadius: 8,
},
collapsedNotch: {
  position: 'absolute',
  top: 0,
  left: screenWidth*0.565,
  width: screenWidth * 0.4,
  height: screenHeight * 0.043,
  backgroundColor: '#FFFFFF',
  borderBottomLeftRadius: 20,
},
collapsedTitle: {
  fontSize: 16,
  fontWeight: '400',
  color: '#FFFFFF',
  fontFamily: 'Inter-Regular',
  marginBottom: screenHeight * 0.008,
  textAlign: 'left',
},
collapsedAmount: {
  fontSize: 36,
  fontWeight: '700',
  color: '#FFFFFF',
  fontFamily: 'Montserrat-Bold',
  lineHeight: screenHeight * 0.048,
  marginBottom: screenHeight * 0.008,
  letterSpacing: 0.5,
},
collapsedPercentage: {
  fontSize: 14,
  fontWeight: '600',
  color: '#4CAF50',
  fontFamily: 'Inter-SemiBold',
  lineHeight: screenHeight * 0.02,
  marginBottom: screenHeight * 0.003,
},
collapsedSubtext: {
  fontSize: 12,
  fontWeight: '400',
  color: '#9CA3AF',
  fontFamily: 'Inter-Regular',
  lineHeight: screenHeight * 0.018,
},
expandButton: {
  position: 'absolute',
  bottom: screenHeight * 0.018,
  right: screenWidth * 0.045,
  width: screenWidth * 0.072,
  height: screenWidth * 0.072,
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: -(screenHeight * 0.005),
},
expandIconCircle: {
  width: screenWidth * 0.072,
  height: screenWidth * 0.072,
  borderRadius: (screenWidth * 0.072) / 2,
  backgroundColor: '#FFD700',
  justifyContent: 'center',
  alignItems: 'center',
  shadowColor: '#000000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.15,
  shadowRadius: 3,
  elevation: 3,
},
expandArrow: {
  width: screenWidth * 0.04,
  height: screenWidth * 0.04,
  tintColor: '#000000',
},
expandedSummaryContainer: {
  backgroundColor: '#2B2B2B',
  borderRadius: 16,
  marginTop: -(screenHeight * 0.0125),
  paddingTop: screenHeight * 0.022,
  paddingHorizontal: screenWidth * 0.045,
  minHeight: screenHeight * 0.37,
  position: 'relative',
  shadowColor: '#000000',
  shadowOffset: {
    width: 0,
    height: 4,
  },
  shadowOpacity: 0.15,
  shadowRadius: 6,
  elevation: 5,
},
expandedNotch: {
  position: 'absolute',
  top: 0,
  left: screenWidth*0.565,
  width: screenWidth * 0.4,
  height: screenHeight * 0.043,
  backgroundColor: '#FFFFFF',
  borderBottomLeftRadius: 20,
},
expandedTitle: {
  fontSize: 16,
  fontWeight: '400',
  color: '#FFFFFF',
  fontFamily: 'Inter-Regular',
  marginBottom: screenHeight * 0.008,
  textAlign: 'left',
},
expandedAmount: {
  fontSize: 36,
  fontWeight: '700',
  color: '#FFFFFF',
  fontFamily: 'Montserrat-Bold',
  lineHeight: screenHeight * 0.048,
  marginBottom: screenHeight * 0.008,
  letterSpacing: 0.5,
},
expandedPercentage: {
  fontSize: 14,
  fontWeight: '600',
  color: '#4CAF50',
  fontFamily: 'Inter-SemiBold',
  lineHeight: screenHeight * 0.02,
  marginBottom: screenHeight * 0.003,
},
expandedSubtext: {
  fontSize: 12,
  fontWeight: '400',
  color: '#9CA3AF',
  fontFamily: 'Inter-Regular',
  lineHeight: screenHeight * 0.018,
  marginBottom: screenHeight * 0.02,
},
tabContainer: {
  flexDirection: 'row',
  backgroundColor: '#1A1A1A',
  borderRadius: 8,
  borderColor: '#FFFFFF',
  borderWidth: 0.5,
  padding: 1,
  marginBottom: screenHeight * 0.015,
  alignSelf: 'stretch',
},
tabButton: {
  paddingVertical: screenHeight * 0.007,
  paddingHorizontal: screenWidth * 0.018,
  borderRadius: 6,
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: screenHeight * 0.035,
},
activeTabButton: {
  backgroundColor: '#FFFFFF',
},
tabText: {
  fontSize: 13,
  fontWeight: '500',
  color: '#9CA3AF',
  fontFamily: 'Inter-Medium',
  textAlign: 'center',
},
activeTabText: {
  color: '#000000',
  fontWeight: '600',
  fontFamily: 'Inter-SemiBold',
},
horizontalCardsScrollView: {
  marginTop: 0,
  flexGrow: 0,
},
horizontalCardsContainer: {
},
horizontalCard: {
  backgroundColor: '#FFFFFF',
  borderRadius: 12,
  paddingVertical: screenHeight * 0.018,
  paddingHorizontal: screenWidth * 0.038,
  marginRight: screenWidth * 0.03,
  width: screenWidth * 0.36,
  minHeight: screenHeight * 0.105,
  shadowColor: '#000000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.08,
  shadowRadius: 4,
  elevation: 2,
  justifyContent: 'space-between',
},
horizontalCardAmount: {
  fontSize: 20,
  fontWeight: '700',
  fontFamily: 'Montserrat-Bold',
  lineHeight: screenHeight * 0.03,
  marginBottom: screenHeight * 0.006,
},
horizontalCardLabel: {
  fontSize: 12,
  fontWeight: '400',
  color: '#6B7280',
  fontFamily: 'Inter-Regular',
  lineHeight: screenHeight * 0.017,
  flexWrap: 'wrap',
},
collapseButton: {
  position: 'absolute',
  bottom: screenHeight * 0.018,
  right: screenWidth * 0.045,
  width: screenWidth * 0.092,
  height: screenWidth * 0.092,
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: -(screenHeight * 0.0115),
},
collapseIconCircle: {
  width: screenWidth * 0.072,
  height: screenWidth * 0.072,
  borderRadius: (screenWidth * 0.072) / 2,
  backgroundColor: '#FFD700',
  justifyContent: 'center',
  alignItems: 'center',
  shadowColor: '#000000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.15,
  shadowRadius: 3,
  elevation: 3,
},
collapseArrow: {
  width: screenWidth * 0.04,
  height: screenWidth * 0.04,
  tintColor: '#000000',
  transform: [{ rotate: '180deg' }],
},
complaintsSection: {
  marginBottom: screenHeight*0.03,
},
complaintsCard: {
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
complaintsInnerContainer: {
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
complaintsContainer: {
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'flex-start',
  paddingTop: screenHeight*0.025,
  paddingHorizontal: screenWidth*0.055,
},
complaintColumn: {
  alignItems: 'center',
  flex: 1,
},
complaintTopLabel: {
  fontSize: 14,
  fontWeight: '600',
  color: '#000000',
  fontFamily: 'Inter',
  lineHeight: screenHeight*0.025,
  marginBottom: screenHeight*0.015,
  textAlign: 'center',
  bottom:screenHeight*0.005
},
complaintTopLabelRed: {
  fontSize: 14,
  fontWeight: '600',
  color: '#000000',
  fontFamily: 'Inter',
  lineHeight: screenHeight*0.025,
  marginBottom: screenHeight*0.015,
  textAlign: 'center',
  bottom: screenHeight*0.005
},
complaintNumberContainer: {
  flexDirection: 'row',
  alignItems: 'baseline',
  justifyContent: 'center',
  marginBottom: screenHeight*0.01,
  bottom:screenHeight*0.0125
},
complaintNumberRed: {
  fontSize: 25,
  fontWeight: '700',
  color: '#E74C3C',
  fontFamily: 'Montserrat',
  lineHeight: screenHeight*0.045,
},
complaintLabel: {
  fontSize: 14,
  fontWeight: '400',
  color: '#000000',
  fontFamily: 'Inter',
  lineHeight: screenHeight*0.025,
  marginBottom: screenHeight*0.015,
  bottom:screenHeight*0.02,
  textAlign: 'center',
},
complaintViewButton: {
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
complaintViewButtonText: {
  fontSize: 14,
  width:screenWidth*0.1028,
  fontWeight: '600',
  color: '#000000',
  fontFamily: 'Montserrat-SemiBold',
  lineHeight: screenHeight*0.0325,
  textAlign: 'center',
},
});