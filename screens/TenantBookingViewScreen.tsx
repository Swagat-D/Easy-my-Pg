import React, { useState } from 'react';
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
} from 'react-native';
import Navbar from './common/Navbar';
import BottomTabNavigator from './common/Tab';
import MoveInModal from './common/MoveInModal';

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

interface TenantBookingViewScreenProps {
  userName?: string;
  propertyName?: string;
  onBackPress?: () => void;
  onTabPress?: (tabId: string) => void;
  onHomePress?: () => void;
  activeTab?: string;
  onAddTenantPress?: () => void;
}

export default function TenantBookingViewScreen({
  userName = 'Gyana',
  propertyName = 'Kalyani Nagar',
  onBackPress,
  onTabPress,
  onHomePress,
  activeTab,
  onAddTenantPress
}: TenantBookingViewScreenProps) {
  const [searchText, setSearchText] = useState('');
  const [showMoveInModal, setShowMoveInModal] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState<TenantBooking | null>(null);

  const tenantBookingsData: TenantBooking[] = [
    {
      id: '1',
      name: 'Rihan Kapoor',
      room: '101',
      bookingAmount: 1400,
      bookingDate: '10 Oct 2025',
      moveInDate: '23 Oct 2025',
      daysLabel: '2 Day'
    },
    {
      id: '2',
      name: 'Rihan Kapoor',
      room: '101',
      bookingAmount: 1400,
      bookingDate: '23 Sep 2022',
      moveInDate: '23 Sep 2022',
      daysLabel: '4 Day'
    },
    {
      id: '3',
      name: 'Rihan Kapoor',
      room: '101',
      bookingAmount: 1400,
      bookingDate: '23 Sep 2022',
      moveInDate: '23 Sep 2022',
      daysLabel: ''
    }
  ];

  const calculateBookingStats = () => {
    return {
      todayBooking: 5,
      last15Days: 17,
      last7Days: 10,
      last30Days: 43
    };
  };

  const bookingStats = calculateBookingStats();

  const handleProfilePress = () => {
    console.log('Profile pressed');
  };

  const handleSupportPress = () => {
    console.log('Support pressed');
  };

  const handleFilterPress = () => {
    console.log('Filter pressed');
  };

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    }
  };

  const handleTenantCardPress = (tenant: TenantBooking) => {
    setSelectedTenant(tenant);
    setShowMoveInModal(true);
  };

  const handleMoveIn = (date: string) => {
    console.log('Move in tenant:', selectedTenant?.name, 'on date:', date);
    setShowMoveInModal(false);
    setSelectedTenant(null);
  };

  const handleDeleteBooking = () => {
    console.log('Delete booking for tenant:', selectedTenant?.name);
    setShowMoveInModal(false);
    setSelectedTenant(null);
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

  const handleAddPress = () => {
    console.log('Add button pressed');
    if (onAddTenantPress) {
      onAddTenantPress();
    }
  };

  const renderBookingCard = (booking: TenantBooking) => {
    return (
      <TouchableOpacity 
        key={booking.id} 
        style={styles.tenantCard}
        onPress={() => handleTenantCardPress(booking)}
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
          {/* Name and Days Label */}
          <View style={styles.nameRow}>
            <Text style={styles.tenantName}>{booking.name}</Text>
            {booking.daysLabel && (
              <View style={styles.daysLabelContainer}>
                <Text style={styles.daysLabel}>{booking.daysLabel}</Text>
              </View>
            )}
          </View>
          
          {/* Room Info */}
          <View style={styles.detailRow}>
            <Image
              source={require('../assets/icons/door-open.png')}
              style={styles.detailIcon}
              resizeMode="contain"
            />
            <Text style={styles.detailLabel}>Room: </Text>
            <Text style={styles.detailValue}>{booking.room}</Text>
          </View>

          {/* Booking Amount */}
          <View style={styles.detailRow}>
            <Image
              source={require('../assets/icons/wallet.png')}
              style={styles.detailIcon}
              resizeMode="contain"
            />
            <Text style={styles.detailLabel}>Booking Amount : </Text>
            <Text style={[styles.detailValue, { color: '#66BB6A' }]}>
              ₹{booking.bookingAmount}
            </Text>
          </View>

          {/* Booking Date */}
          <View style={styles.detailRow}>
            <Image
              source={require('../assets/icons/briefcase.png')}
              style={styles.detailIcon}
              resizeMode="contain"
            />
            <Text style={styles.detailLabel}>Booking Date: </Text>
            <Text style={styles.detailValue}>
              {booking.bookingDate}
            </Text>
          </View>

          {/* Move-In Date */}
          <View style={styles.detailRow}>
            <Image
              source={require('../assets/icons/user-plus.png')}
              style={styles.detailIcon}
              resizeMode="contain"
            />
            <Text style={styles.detailLabel}>Move- In: </Text>
            <Text style={[styles.detailValue, { color: '#F44336' }]}>
              {booking.moveInDate}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Navbar - copied exactly from TenantsScreen */}
      <Navbar
        userName={userName}
        propertyName={propertyName}
        onProfilePress={handleProfilePress}
        onSupportPress={handleSupportPress}
        onAddPropertyPress={() => {
          console.log('Add property pressed');
        }}
      />
    
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.searchFilterContainer}>
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

        {/* Stats Section - 2 Column Layout - EXACTLY COPIED FROM TENANTSSCREEN */}
        <View style={styles.statsContainer}>
          <View style={styles.statsRow}>
            {/* Left Card */}
            <View style={styles.statCard}>
              <View style={styles.statRow}>
                <View style={styles.statItemLeft}>
                  <Text style={styles.statLabel}>Today Booking</Text>
                  <View style={styles.statValueContainer}>
                    <Text style={[styles.statValue, { color: '#66BB6A' }]}>{bookingStats.todayBooking}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.statRow}>
                <View style={styles.statItemLeft}>
                  <Text style={styles.statLabel}>Last 7 Days</Text>
                  <View style={styles.statValueContainer}>
                    <Text style={[styles.statValue, { color: '#66BB6A' }]}>{bookingStats.last7Days}</Text>
                  </View>
                </View>
              </View>
            </View>
            
            {/* Right Card */}
            <View style={styles.statCard}>
              <View style={styles.statRow}>
                <View style={styles.statItemRight}>
                  <Text style={styles.statLabel}>Last 15 Days</Text>
                  <View style={styles.statValueContainer}>
                    <Text style={[styles.statValue, { color: '#66BB6A' }]}>{bookingStats.last15Days}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.statRow}>
                <View style={styles.statItemRight}>
                  <Text style={styles.statLabel}>Last 30 Days</Text>
                  <View style={styles.statValueContainer}>
                    <Text style={[styles.statValue, { color: '#66BB6A' }]}>{bookingStats.last30Days}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Back to Tenants Page Button - exact same styling */}
        <View style={styles.waitingSection}>
          <View style={styles.waitingContainer}>
            <Text style={styles.waitingText}>Back To Tenants Page</Text>
            <Image
              source={require('../assets/right-arrow.png')}
              style={styles.arrowIcon}
              resizeMode="contain"
            />
          </View>
          <TouchableOpacity style={styles.viewButton} onPress={handleBackPress}>
            <Text style={styles.viewButtonText}>Back</Text>
          </TouchableOpacity>
        </View>

        {/* Tenants Booking List */}
        <View style={styles.tenantsSection}>
          {tenantBookingsData.map((booking) => renderBookingCard(booking))}
        </View>

        {/* Spacer for content */}
        <View style={styles.contentSpacer} />
      </ScrollView>

      {/* Bottom Tab Navigator */}
      <BottomTabNavigator
        activeTab=""
        onTabPress={handleTabPress}
        onAddPress={handleAddPress}
        onHomePress={handleHomePress}
      />

      {/* Move-In Modal */}
      <MoveInModal
        visible={showMoveInModal}
        onClose={() => setShowMoveInModal(false)}
        tenant={selectedTenant}
        onMoveIn={handleMoveIn}
        onDeleteBooking={handleDeleteBooking}
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
    marginHorizontal: screenWidth * 0.03,
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
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: screenHeight * 0.008,
  },
  tenantName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#171A1F',
    fontFamily: 'Roboto-SemiBold',
    lineHeight: 28,
    flex: 1,
  },
  daysLabelContainer: {
    backgroundColor: '#F44336',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  daysLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'Roboto-SemiBold',
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
  contentSpacer: {
    height: screenHeight * 0.2,
  },
});