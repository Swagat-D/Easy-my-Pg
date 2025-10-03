import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions
} from 'react-native';
import Navbar from './common/Navbar';
import BottomTabNavigator from './common/Tab';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface Tenant {
  id: string;
  name: string;
  profileImage?: string;
  room: string;
  underNotice: boolean;
  rentDue: boolean;
  joinedDate: string;
}

interface TenantsScreenProps {
  userName?: string;
  propertyName?: string;
  onTabPress?: (tabId: string) => void;
  onHomePress?: () => void;
  activeTab?: string;
}

export default function TenantsScreen({
  userName = 'Gyana',
  propertyName = 'Kalyani Nagar',
  onTabPress,
  onHomePress,
  activeTab = 'tenants'
}: TenantsScreenProps) {
  const [searchText, setSearchText] = useState('');

  // Sample tenant data
  const tenantsData: Tenant[] = [
    {
      id: '1',
      name: 'Rihan Kapoor',
      room: '101',
      underNotice: true,
      rentDue: false,
      joinedDate: '23 Sep 2022'
    },
    {
      id: '2',
      name: 'Rihan Kapoor',
      room: '101',
      underNotice: true,
      rentDue: false,
      joinedDate: '23 Sep 2022'
    },
    {
      id: '3',
      name: 'Rihan Kapoor',
      room: '101',
      underNotice: true,
      rentDue: false,
      joinedDate: '23 Sep 2022'
    },
    {
      id: '4',
      name: 'Arjun Sharma',
      room: '102',
      underNotice: false,
      rentDue: true,
      joinedDate: '15 Aug 2022'
    },
    {
      id: '5',
      name: 'Priya Singh',
      room: '103',
      underNotice: false,
      rentDue: false,
      joinedDate: '10 Jul 2022'
    }
  ];

  // Stats data for the top section
  const statsData = [
    { id: 'all', title: 'All', value: '30', isDark: true },
    { id: 'dues', title: 'Dues', value: '30', color: '#EF5350' },
    { id: 'nodues', title: 'No Dues', value: '30', color: '#66BB6A' },
    { id: 'notice', title: 'Notice', value: '30', color: '#FFD600' }
  ];

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

  const renderStatsCard = (item: any, index: number) => {
    if (item.isDark) {
      return (
        <View key={item.id} style={styles.statsCardDark}>
          <Text style={styles.statsTextDark}>All</Text>
          <Text style={styles.statsNumberDark}>{item.value}</Text>
        </View>
      );
    }

    return (
      <View key={item.id} style={styles.statsCardLight}>
        <Text style={styles.statsTextLight}>{item.title}</Text>
        <Text style={[styles.statsNumberLight, { color: item.color }]}>
          {item.value}
        </Text>
      </View>
    );
  };

  const renderTenantCard = (tenant: Tenant) => {
    return (
      <View key={tenant.id} style={styles.tenantCard}>
        {/* Profile Image */}
        <View style={styles.profileImageContainer}>
          <Image
            source={require('../assets/profile.png')}
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
              styles.detailValue,
              { color: tenant.underNotice ? '#4CAF50' : '#F44336' }
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
              { color: tenant.rentDue ? '#F44336' : '#4CAF50' }
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
      </View>
    );
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

        {/* Stats Section */}
        <View style={styles.statsSection}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.statsScrollView}
            contentContainerStyle={styles.statsScrollContainer}
          >
            {statsData.map((item, index) => renderStatsCard(item, index))}
          </ScrollView>
        </View>

        {/* Tenants List */}
        <View style={styles.tenantsSection}>
          {tenantsData.map((tenant) => renderTenantCard(tenant))}
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
  statsSection: {
    width: screenWidth * 0.916,
    height: screenHeight * 0.11875,
    top: screenHeight * 0.015,
    left: screenWidth * 0.05,
    marginBottom: screenHeight * 0.00725,
  },
  statsScrollView: {
    marginHorizontal: -(screenWidth * 0.055),
  },
  statsScrollContainer: {
    paddingHorizontal: screenWidth * 0.055,
  },
  statsCardDark: {
    width: screenWidth * 0.233,
    height: screenHeight * 0.0975,
    backgroundColor: '#242424',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#FFF',
    padding: screenHeight * 0.02,
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
  statsCardLight: {
    width: screenWidth * 0.233,
    height: screenHeight * 0.0975,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EAE7E7',
    padding: screenHeight * 0.02,
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
  statsTextDark: {
    fontFamily: 'Roboto-Medium',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: screenHeight * 0.025,
    letterSpacing: 0,
    textAlign: 'center',
    color: '#FFFFFF',
    width: screenWidth * 0.0472,
    height: screenHeight * 0.025,
    top: screenHeight * 0.02125,
    left: screenWidth * 0.0916,
    position: 'absolute',
  },
  statsNumberDark: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFD600',
    fontFamily: 'Inter-Bold',
    lineHeight: screenHeight * 0.04,
    width: '100%',
    height: screenHeight * 0.035,
    top: screenHeight * 0.025,
    textAlign: 'center',
  },
  statsTextLight: {
    fontFamily: 'Roboto-Medium',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: screenHeight * 0.025,
    letterSpacing: 0,
    textAlign: 'center',
    color: '#000000',
    width: screenWidth * 0.2,
    height: screenHeight * 0.025,
    top: screenHeight * 0.02125,
    left: screenWidth * 0.0139,
    position: 'absolute',
  },
  statsNumberLight: {
    fontSize: 22,
    fontWeight: '700',
    fontFamily: 'Inter-Bold',
    lineHeight: screenHeight * 0.04,
    width: '100%',
    height: screenHeight * 0.035,
    top: screenHeight * 0.025,
    textAlign: 'center',
  },
  tenantsSection: {
    paddingHorizontal: screenWidth * 0.05,
    paddingTop: screenHeight * 0.03,
  },
  tenantCard: {
    width: screenWidth * 0.9,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#DEE1E6',
    marginBottom: screenHeight * 0.02,
    padding: screenWidth * 0.04,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#171A1F',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileImageContainer: {
    width: screenWidth * 0.2,
    height: screenWidth * 0.2,
    borderRadius: screenWidth * 0.1,
    overflow: 'hidden',
    marginRight: screenWidth * 0.04,
    backgroundColor: '#F0F0F0',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  tenantDetails: {
    flex: 1,
  },
  tenantName: {
    fontSize: screenWidth * 0.045,
    fontWeight: '600',
    color: '#000000',
    marginBottom: screenHeight * 0.01,
    fontFamily: 'Roboto-Medium',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: screenHeight * 0.008,
  },
  detailIcon: {
    width: screenWidth * 0.035,
    height: screenWidth * 0.035,
    tintColor: '#666666',
    marginRight: screenWidth * 0.02,
  },
  detailLabel: {
    fontSize: screenWidth * 0.032,
    color: '#666666',
    fontFamily: 'Roboto-Regular',
  },
  detailValue: {
    fontSize: screenWidth * 0.032,
    fontWeight: '600',
    color: '#000000',
    fontFamily: 'Roboto-Medium',
  },
  contentSpacer: {
    height: screenHeight * 0.2,
  },
});