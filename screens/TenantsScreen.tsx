import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
  PanResponder,
  Animated
} from 'react-native';
import Navbar from './common/Navbar';
import BottomTabNavigator from './common/Tab';
import TenantDetailsModal from './common/TenantDetailsModal';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

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

interface TenantsScreenProps {
  userName?: string;
  propertyName?: string;
  onTabPress?: (tabId: string) => void;
  onHomePress?: () => void;
  activeTab?: string;
  onAddTenantPress?: () => void;
  onTenantProfilePress?: (tenant: Tenant) => void;
}

export default function TenantsScreen({
  userName = 'Gyana',
  propertyName = 'Kalyani Nagar',
  onTabPress,
  onHomePress,
  activeTab = 'tenants',
  onAddTenantPress,
  onTenantProfilePress
}: TenantsScreenProps) {
  const [searchText, setSearchText] = useState('');
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  
  const floatingButtonPosition = useRef(new Animated.ValueXY({
    x: screenWidth - 80, 
    y: screenHeight - 200, 
  })).current;
  
  const [currentPosition, setCurrentPosition] = useState({
    x: screenWidth - 80,
    y: screenHeight - 200,
  });

  const tenantsData: Tenant[] = [
    {
      id: '1',
      name: 'Rihan Kapoor',
      room: '101',
      underNotice: true,
      rentDue: false,
      joinedDate: '23 Sep 2022',
      mobile: '+91 9876543210'
    },
    {
      id: '2',
      name: 'Pabitra Sundariii',
      room: '102',
      underNotice: true,
      rentDue: false,
      joinedDate: '23 Sep 2022',
      mobile: '+91 9876543211'
    },
    {
      id: '3',
      name: 'Swagat Dash',
      room: '101',
      underNotice: true,
      rentDue: false,
      joinedDate: '23 Sep 2022',
      mobile: '+91 9876543212'
    },
    {
      id: '4',
      name: 'Arjun Sharma',
      room: '102',
      underNotice: false,
      rentDue: true,
      joinedDate: '15 Aug 2022',
      mobile: '+91 9876543213'
    },
    {
      id: '5',
      name: 'Priya Singh',
      room: '103',
      underNotice: false,
      rentDue: false,
      joinedDate: '10 Jul 2022',
      mobile: '+91 9876543214'
    }
  ];

  // Calculate tenant statistics
  const calculateTenantStats = () => {
    const totalTenants = tenantsData.length;
    const pendingDue = tenantsData.filter(tenant => tenant.rentDue).length;
    const underNotice = tenantsData.filter(tenant => tenant.underNotice).length;
    const booking = totalTenants;
    
    return {
      totalTenants,
      pendingDue,
      underNotice,
      booking
    };
  };

  const tenantStats = calculateTenantStats();

  const handleProfilePress = () => {
    console.log('Profile pressed');
  };

  const handleSupportPress = () => {
    console.log('Support pressed');
  };

  const handleFilterPress = () => {
    console.log('Filter pressed');
  };

  const handleAddPress = () => {
    console.log('Add button pressed');
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

  

  const filteredTenants = tenantsData;

  const handleAddTenant = () => {
    console.log('Add tenant');
    if (onAddTenantPress) {
      onAddTenantPress();
    }
  };

  const handleTenantPress = (tenant: Tenant) => {
    setSelectedTenant(tenant);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedTenant(null);
  };

  const floatingButtonPanResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      const threshold = 10;
      return Math.abs(gestureState.dx) > threshold || Math.abs(gestureState.dy) > threshold;
    },
    onPanResponderGrant: () => {
      floatingButtonPosition.setOffset({
        x: currentPosition.x,
        y: currentPosition.y,
      });
    },
    onPanResponderMove: Animated.event(
      [null, { dx: floatingButtonPosition.x, dy: floatingButtonPosition.y }],
      { useNativeDriver: false }
    ),
    onPanResponderRelease: (evt, gestureState) => {
      floatingButtonPosition.flattenOffset();
      
      const moveThreshold = 10;
      const isTap = Math.abs(gestureState.dx) < moveThreshold && Math.abs(gestureState.dy) < moveThreshold;
      
      if (isTap) {
        handleFloatingButtonPress();
        return;
      }
      
      const buttonSize = 60;
      const margin = 10;
      
      let finalX = currentPosition.x + gestureState.dx;
      let finalY = currentPosition.y + gestureState.dy;
      
      if (finalX < margin) finalX = margin;
      if (finalX > screenWidth - buttonSize - margin) finalX = screenWidth - buttonSize - margin;
      
      if (finalY < margin + 100) finalY = margin + 100; 
      if (finalY > screenHeight - buttonSize - margin - 100) finalY = screenHeight - buttonSize - margin - 100; 
      
      setCurrentPosition({ x: finalX, y: finalY });
      
      Animated.spring(floatingButtonPosition, {
        toValue: { x: finalX, y: finalY },
        useNativeDriver: false,
      }).start();
    },
  });

  const handleFloatingButtonPress = () => {
    console.log('Floating button pressed');
    if (onAddTenantPress) {
      onAddTenantPress();
    }
  };

  const renderTenantCard = (tenant: Tenant) => {
    return (
      <TouchableOpacity 
        key={tenant.id} 
        style={styles.tenantCard}
        onPress={() => handleTenantPress(tenant)}
        activeOpacity={0.7}
      >
        {/* Profile Image */}
        <View style={styles.profileImageContainer}>
          <Image
            source={require('../assets/pht.png')}
            style={styles.profileImage}
            resizeMode="cover"
          />
        </View>

        {/* Tenant Details */}
        <View style={styles.tenantDetails}>
          <Text style={styles.tenantName}>{tenant.name}</Text>
          
          {/* Room Info */}
          <View style={styles.detailRow}>
            <Image
              source={require('../assets/icons/door-open.png')}
              style={styles.detailIcon}
              resizeMode="contain"
            />
            <Text style={styles.detailLabel}>Room: </Text>
            <Text style={styles.detailValue}>{tenant.room}</Text>
          </View>

          {/* Under Notice */}
          <View style={styles.detailRow}>
            <Image
              source={require('../assets/icons/briefcase.png')}
              style={styles.detailIcon}
              resizeMode="contain"
            />
            <Text style={styles.detailLabel}>Under Notice: </Text>
            <Text style={[
              styles.detailValuea,
            ]}>
              {tenant.underNotice ? 'Yes' : 'No'}
            </Text>
          </View>

          {/* Rent Due */}
          <View style={styles.detailRow}>
            <Image
              source={require('../assets/icons/wallet.png')}
              style={styles.detailIcon}
              resizeMode="contain"
            />
            <Text style={styles.detailLabel}>Rent Due: </Text>
            <Text style={[
              styles.detailValue,
            ]}>
              {tenant.rentDue ? 'Yes' : 'No'}
            </Text>
          </View>

          {/* Joined Date */}
          <View style={styles.detailRow}>
            <Image
              source={require('../assets/icons/user-plus.png')}
              style={styles.detailIcon}
              resizeMode="contain"
            />
            <Text style={styles.detailLabel}>Joined: </Text>
            <Text style={[styles.detailValue, { color: '#F44336' }]}>
              {tenant.joinedDate}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderEmptyState = () => {
    return (
      <View style={styles.emptyStateContainer}>
        <View style={styles.emptyStateCard}>
          {/* Empty State Icon */}
          <View style={styles.emptyIconContainer}>
            <Image
              source={require('../assets/icons/user-plus.png')}
              style={styles.emptyIcon}
              resizeMode="contain"
            />
          </View>
          
          {/* Empty State Text */}
          <Text style={styles.emptyStateTitle}>
            No Tenants Found
          </Text>
          <Text style={styles.emptyStateSubtitle}>
            No tenants in this property yet
          </Text>
          
          {/* Add Tenant Button */}
          <TouchableOpacity 
            style={styles.emptyStateButton}
            onPress={handleAddTenant}
          >
            <Text style={styles.emptyStateButtonText}>ADD TENANT</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Navbar */}
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
    
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Search and Filter Section */}
        <View style={styles.searchFilterContainer}>
          {/* Search Container */}
          <View style={styles.searchContainer}>
            <View style={styles.searchIconContainer}>
              <Image
                source={require('../assets/icons/search.png')}
                style={styles.searchIcon}
                resizeMode="contain"
              />
            </View>
            <TextInput
              style={styles.searchInput}
              placeholder="Search Tenants"
              placeholderTextColor="#9CA3AF"
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>

          {/* Filter Button */}
          <TouchableOpacity style={styles.filterContainer} onPress={handleFilterPress}>
            <Image
              source={require('../assets/icons/filter.png')}
              style={styles.filterIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        {/* Stats Section - 2 Column Layout */}
        <View style={styles.statsContainer}>
          <View style={styles.statsRow}>
            {/* Left Card */}
            <View style={styles.statCard}>
              <View style={styles.statRow}>
                <View style={styles.statItemLeft}>
                  <Text style={styles.statLabel}>Total Tenant</Text>
                  <View style={styles.statValueContainer}>
                    <Text style={[styles.statValue, { color: '#66BB6A' }]}>{tenantStats.totalTenants}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.statRow}>
                <View style={styles.statItemLeft}>
                  <Text style={styles.statLabel}>Under Notice</Text>
                  <View style={styles.statValueContainer}>
                    <Text style={[styles.statValue, { color: '#EF5350' }]}>{tenantStats.underNotice}</Text>
                  </View>
                </View>
              </View>
            </View>
            
            {/* Right Card */}
            <View style={styles.statCard}>
              <View style={styles.statRow}>
                <View style={styles.statItemRight}>
                  <Text style={styles.statLabel}>Pending Due</Text>
                  <View style={styles.statValueContainer}>
                    <Text style={[styles.statValue, { color: '#EF5350' }]}>{tenantStats.pendingDue}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.statRow}>
                <View style={styles.statItemRight}>
                  <Text style={styles.statLabel}>Booking</Text>
                  <View style={styles.statValueContainer}>
                    <Text style={[styles.statValue, { color: '#66BB6A' }]}>{tenantStats.booking}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Tenants Waiting to Move Section */}
        <View style={styles.waitingSection}>
          <View style={styles.waitingContainer}>
            <Text style={styles.waitingText}>Tenants Waiting to Move</Text>
            <Image
              source={require('../assets/right-arrow.png')}
              style={styles.arrowIcon}
              resizeMode="contain"
            />
          </View>
          <TouchableOpacity style={styles.viewButton}>
            <Text style={styles.viewButtonText}>View</Text>
          </TouchableOpacity>
        </View>

        {/* Tenants List */}
        <View style={styles.tenantsSection}>
          {filteredTenants.length > 0 ? (
            filteredTenants.map((tenant) => renderTenantCard(tenant))
          ) : (
            renderEmptyState()
          )}
        </View>

        {/* Spacer for content */}
        <View style={styles.contentSpacer} />
      </ScrollView>

      {/* Bottom Tab Navigator */}
      <BottomTabNavigator
        activeTab={activeTab}
        onTabPress={handleTabPress}
        onAddPress={handleAddPress}
        onHomePress={handleHomePress}
      />

      <Animated.View
        style={[
          styles.floatingButton,
          {
            transform: floatingButtonPosition.getTranslateTransform(),
          },
        ]}
        {...floatingButtonPanResponder.panHandlers}
      >
        <TouchableOpacity
          style={styles.floatingButtonTouchable}
          activeOpacity={0.8}
          onPress={handleFloatingButtonPress}
        >
          <Text style={styles.floatingButtonText}>+</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Tenant Details Modal */}
      <TenantDetailsModal
        visible={isModalVisible }
        onClose={handleCloseModal}
        tenant={selectedTenant}
        onTenantProfilePress={onTenantProfilePress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    top: screenHeight * 0.0177,
  },
  searchFilterContainer: {
    width: screenWidth * 0.78,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: screenWidth * 0.0472,
    marginTop: screenHeight * 0.013,
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
  statsContainer: {
    paddingHorizontal: screenWidth * 0.05,
    marginTop: screenHeight * 0.0075,
    marginBottom: screenHeight * 0.02,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    width: screenWidth * 0.43,
    height: screenHeight * 0.125,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    paddingVertical: screenHeight * 0.015,
    paddingHorizontal: screenWidth * 0.04,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 0.5,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statItemLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statItemRight: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    fontFamily: 'Roboto-Medium',
    flex: 1,
  },
  statValueContainer: {
    minWidth: screenWidth * 0.08,
    height: screenWidth * 0.08,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Roboto-Medium',
    lineHeight: 20,
  },
  waitingSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#000000',
    marginHorizontal: screenWidth * 0.05,
    borderRadius: 8,
    paddingVertical: screenHeight * 0.008,
    paddingHorizontal: screenWidth * 0.085,
  },
  waitingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  waitingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'Roboto-SemiBold',
    marginRight: screenWidth * 0.03,
  },
  arrowIcon: {
    width: screenWidth * 0.08,
    height: screenWidth * 0.05,
    tintColor: '#FFECA7',
  },
  viewButton: {
    backgroundColor: '#FFECA7',
    paddingVertical: screenHeight * 0.005,
    paddingHorizontal: screenWidth * 0.06,
    borderRadius: 6,
  },
  viewButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
    fontFamily: 'Roboto-Medium',
  },
  tenantsSection: {
    paddingHorizontal: screenWidth * 0.05,
    paddingTop: screenHeight * 0.02,
  },
  tenantCard: {
    width: screenWidth * 0.9,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: screenWidth * 0.035,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#171A1F',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.08,
    shadowRadius: 1,
    elevation: 4,
    marginBottom: screenHeight * 0.02,
  },

  profileImageContainer: {
    width: screenWidth * 0.295,
    height: screenHeight * 0.14625,
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: screenWidth * 0.035,
    backgroundColor: '#F5F5F5',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  tenantDetails: {
    flex: 1,
  },
  tenantName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#171A1F',
    marginBottom: screenHeight * 0.008,
    fontFamily: 'Roboto-SemiBold',
    lineHeight: 28,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: screenHeight * 0.006,
  },
  detailIcon: {
    width: screenWidth * 0.044,
    height: screenHeight * 0.01875,
    marginRight: screenWidth * 0.025,
  },
  detailLabel: {
    color: '#000000',
    fontFamily: 'OpenSans-Regular',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 17,
    letterSpacing: 0,
  },
  detailValue: {
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0,
    fontWeight: '500',
    color: '#CB6A00',
    fontFamily: 'Roboto-Medium',
  },
  detailValuea: {
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0,
    fontWeight: '500',
    color: '#66BB6A',
    fontFamily: 'Roboto-Medium',
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: screenHeight * 0.05,
    paddingHorizontal: screenWidth * 0.05,
  },
  emptyStateCard: {
    width: screenWidth * 0.9,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#DEE1E6',
    padding: screenWidth * 0.08,
    alignItems: 'center',
    marginHorizontal: screenWidth * 0.05,
    shadowColor: '#171A1F',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  emptyIconContainer: {
    width: screenWidth * 0.15,
    height: screenWidth * 0.15,
    backgroundColor: '#FFD600',
    borderRadius: screenWidth * 0.075,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: screenHeight * 0.025,
  },
  emptyIcon: {
    width: screenWidth * 0.07,
    height: screenWidth * 0.07,
    tintColor: '#000000',
  },
  emptyStateTitle: {
    fontFamily: 'Montserrat-Bold',
    fontWeight: '700',
    fontSize: screenWidth * 0.045,
    color: '#171A1F',
    textAlign: 'center',
    marginBottom: screenHeight * 0.008,
  },
  emptyStateSubtitle: {
    fontFamily: 'Roboto-Regular',
    fontWeight: '400',
    fontSize: screenWidth * 0.032,
    color: '#666666',
    textAlign: 'center',
    lineHeight: screenHeight * 0.022,
    marginBottom: screenHeight * 0.03,
    paddingHorizontal: screenWidth * 0.02,
  },
  emptyStateButton: {
    width: screenWidth * 0.45,
    height: screenHeight * 0.05,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#313030',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyStateButtonText: {
    fontFamily: 'Inter-Bold',
    fontWeight: '700',
    fontSize: screenWidth * 0.03,
    color: '#000000',
    letterSpacing: 0,
  },
  contentSpacer: {
    height: screenHeight * 0.2,
  },
  floatingButton: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: '#000000',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 1000,
  },
  floatingButtonTouchable: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
  },
  floatingButtonText: {
    color: '#FFFFFF',
    fontSize: 58,
    fontWeight: '300',
    lineHeight: 58,
    textAlign: 'center',
  },
});