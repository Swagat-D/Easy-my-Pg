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
import DashboardScreen from './Dashboard';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface MainPropertyScreenProps {
  userName?: string;
  propertyName?: string;
  onTabPress?: (tabId: string) => void;
  onHomePress?: () => void;
}

export default function MainPropertyScreen({
  userName = 'Gyana',
  propertyName = 'Kalyani Nagar',
  onTabPress,
  onHomePress
}: MainPropertyScreenProps) {
  const [activeTab, setActiveTab] = useState<'property' | 'dashboard'>('property');
  const [searchText, setSearchText] = useState('');
  const [selectedFloor, setSelectedFloor] = useState('Ground Floor');

  const floorsData = [
    'Ground Floor',
    '1st Floor', 
    '2nd Floor',
    '3rd Floor',
    '4th Floor'
  ];

  // Room data structure
  const roomsData = {
    'Ground Floor': [
      {
        id: 'room_101',
        roomNumber: 'Room 101',
        status: 'Available', // 'Available' | 'Full'
        bedCount: 6,
        rentDue: 2,
        underNotice: 1,
        activeTicket: 5,
        beds: [
          { id: 'bed1', available: true },
          { id: 'bed2', available: true },
          { id: 'bed3', available: false },
          { id: 'bed4', available: false },
          { id: 'bed5', available: true },
          { id: 'bed6', available: true }
        ]
      },
      {
        id: 'room_102',
        roomNumber: 'Room 102',
        status: 'Full',
        bedCount: 9,
        rentDue: 2,
        underNotice: 1,
        activeTicket: 5,
        beds: [
          { id: 'bed1', available: false },
          { id: 'bed2', available: false },
          { id: 'bed3', available: false },
          { id: 'bed4', available: false },
          { id: 'bed5', available: false },
          { id: 'bed6', available: false },
          { id: 'bed7', available: false },
          { id: 'bed8', available: false },
          { id: 'bed9', available: false }
        ]
      }
    ],
    '1st Floor': [
      {
        id: 'room_201',
        roomNumber: 'Room 201',
        status: 'Available',
        bedCount: 6,
        rentDue: 1,
        underNotice: 0,
        activeTicket: 3,
        beds: [
          { id: 'bed1', available: true },
          { id: 'bed2', available: true },
          { id: 'bed3', available: true },
          { id: 'bed4', available: false },
          { id: 'bed5', available: true },
          { id: 'bed6', available: true }
        ]
      }
    ],
    '2nd Floor': [
      {
        id: 'room_301',
        roomNumber: 'Room 301',
        status: 'Full',
        bedCount: 6,
        rentDue: 3,
        underNotice: 2,
        activeTicket: 4,
        beds: [
          { id: 'bed1', available: false },
          { id: 'bed2', available: false },
          { id: 'bed3', available: false },
          { id: 'bed4', available: false },
          { id: 'bed5', available: false },
          { id: 'bed6', available: false }
        ]
      }
    ],
    '3rd Floor': [
      {
        id: 'room_401',
        roomNumber: 'Room 401',
        status: 'Available',
        bedCount: 6,
        rentDue: 0,
        underNotice: 0,
        activeTicket: 1,
        beds: [
          { id: 'bed1', available: true },
          { id: 'bed2', available: true },
          { id: 'bed3', available: true },
          { id: 'bed4', available: true },
          { id: 'bed5', available: true },
          { id: 'bed6', available: true }
        ]
      }
    ],
    '4th Floor': [
      {
        id: 'room_501',
        roomNumber: 'Room 501',
        status: 'Available',
        bedCount: 6,
        rentDue: 1,
        underNotice: 1,
        activeTicket: 2,
        beds: [
          { id: 'bed1', available: true },
          { id: 'bed2', available: false },
          { id: 'bed3', available: true },
          { id: 'bed4', available: true },
          { id: 'bed5', available: false },
          { id: 'bed6', available: true }
        ]
      }
    ]
  };

  const handleFloorSelect = (floor: string) => {
    setSelectedFloor(floor);
    console.log('Selected floor:', floor);
  };

  const handleAddPress = () => {
    console.log('Add button pressed');
  };

  const handleTabPress = (tabId: string) => {
    if (onTabPress) {
      onTabPress(tabId);
    }
  };

  const handleProfilePress = () => {
    console.log('Profile pressed');
  };

  const handleSupportPress = () => {
    console.log('Support pressed');
  };

  const handleFilterPress = () => {
    console.log('Filter pressed');
  };

  const handleHomePress = () => {
      if (onHomePress) {
        onHomePress();
      } else {
        setActiveTab('dashboard');
      }
    };

  const handleAddTenant = (roomId: string) => {
    console.log('Add tenant for room:', roomId);
  };

  const handleSharePress = (roomId: string) => {
    console.log('Share room:', roomId);
  };

  const renderRoomCard = (room: any) => {
    const statusColor = room.status === 'Available' ? '#4CAF50' : '#F44336';
    const statusBgColor = room.status === 'Available' ? '#E8F5E8' : '#FFEBEE';
    
    return (
      <View key={room.id} style={roomCardStyles.container}>
        {/* Room Header */}
        <View style={roomCardStyles.header}>
          {/* Room Icon */}
          <View style={roomCardStyles.roomIcon}>
            <Image
              source={require('../assets/icons/door-open.png')}
              style={roomCardStyles.doorIcon}
              resizeMode="contain"
            />
          </View>
          
          {/* Room Number */}
          <Text style={roomCardStyles.roomNumber}>{room.roomNumber}</Text>
          
          {/* Status Badge */}
          <View style={[roomCardStyles.statusBadge, { backgroundColor: statusBgColor }]}>
            <Text style={[roomCardStyles.statusText, { color: statusColor }]}>
              {room.status}
            </Text>
          </View>
          
          {/* Share Button */}
          <TouchableOpacity 
            style={roomCardStyles.shareButton}
            onPress={() => handleSharePress(room.id)}
          >
            <Image
              source={require('../assets/icons/share.png')}
              style={roomCardStyles.shareIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        
        {/* Divider Line */}
        <View style={roomCardStyles.dividerLine} />
        
        {/* Room Details */}
        <View style={roomCardStyles.detailsContainer}>
          {/* Left Column */}
          <View style={roomCardStyles.leftColumn}>
            <View style={roomCardStyles.detailRow}>
              <Image
                source={require('../assets/icons/bed.png')}
                style={roomCardStyles.detailIcon}
                resizeMode="contain"
              />
              <Text style={roomCardStyles.detailLabel}>Bed: </Text>
              <Text style={roomCardStyles.detailValue}>{room.bedCount}</Text>
            </View>
            
            <View style={roomCardStyles.detailRow}>
              <Image
                source={require('../assets/icons/briefcase.png')}
                style={roomCardStyles.detailIcon}
                resizeMode="contain"
              />
              <Text style={roomCardStyles.detailLabel}>Under Notice: </Text>
              <Text style={roomCardStyles.detailValue}>{room.underNotice}</Text>
            </View>
          </View>
          
          {/* Right Column */}
          <View style={roomCardStyles.rightColumn}>
            <View style={roomCardStyles.detailRow}>
              <Image
                source={require('../assets/icons/wallet.png')}
                style={roomCardStyles.detailIcon}
                resizeMode="contain"
              />
              <Text style={roomCardStyles.detailLabel}>Rent Due: </Text>
              <Text style={roomCardStyles.detailValue}>{room.rentDue}</Text>
            </View>
            
            <View style={roomCardStyles.detailRow}>
              <Image
                source={require('../assets/icons/ticket.png')}
                style={roomCardStyles.detailIcon}
                resizeMode="contain"
              />
              <Text style={roomCardStyles.detailLabel}>Active Ticket: </Text>
              <Text style={roomCardStyles.detailValue}>{room.activeTicket}</Text>
            </View>
          </View>
        </View>
        
        {/* Beds Section */}
        <View style={roomCardStyles.bedsContainer}>
          {room.beds.map((bed: any, index: number) => (
            <Image
              key={bed.id}
              source={bed.available 
                ? require('../assets/icons/green.png') 
                : require('../assets/icons/red.png')
              }
              style={roomCardStyles.bedIcon}
              resizeMode="contain"
            />
          ))}
        </View>
        
        {/* Add Tenant Button */}
        <TouchableOpacity 
          style={roomCardStyles.addTenantButton}
          onPress={() => handleAddTenant(room.id)}
        >
          <Text style={roomCardStyles.addTenantText}>ADD TENANT</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
    if (activeTab === 'dashboard') {
      return (
        <DashboardScreen 
          userName="Gyana"
          propertyName="Kalyani Nagar"
        />
      );
    }

  const statsData = [
    { id: 'all', title: 'All', value: '30', isDark: true },
    { id: 'vacant', title: 'Vacant Bed', value: '30', color: '#EF5350' },
    { id: 'nodues', title: 'No Dues', value: '30', color: '#66BB6A' },
    { id: 'notice', title: 'Notice', value: '30', color: '#FFD600' },
    { id: 'floors1', title: 'Floor View', value: '15', color: '#33B94D' },
    { id: 'floors2', title: 'Ground Floor', value: '8', color: '#3574FD' },
    { id: 'floors3', title: '1st Floor', value: '12', color: '#EF5350' }
  ];

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

        <View style={styles.floorNavigationSection}>
        {/* Fixed Floor View Button */}
        <TouchableOpacity style={styles.fixedFloorButton}>
          <Text style={styles.fixedFloorButtonText}>Floor View</Text>
        </TouchableOpacity>

        {/* Vertical Divider Line */}
        <View style={styles.verticalDivider} />

        {/* Scrollable Floor Buttons Container */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.floorScrollContainer}
          contentContainerStyle={styles.floorScrollContent}
        >
          {floorsData.map((floor, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.floorScrollButton,
                selectedFloor === floor && styles.selectedFloorButton
                ]}
                onPress={() => handleFloorSelect(floor)}
              >
                <Text style={[
                  styles.floorScrollButtonText,
                  selectedFloor === floor && styles.selectedFloorButtonText
                ]}>
                  {floor}
               </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Rooms Section */}
        <View style={roomCardStyles.roomsSection}>
        {roomsData[selectedFloor as keyof typeof roomsData]?.map((room: any) => renderRoomCard(room))}
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
    top: (screenHeight*0.0177),
  },

  searchFilterContainer: {
    width: screenWidth*0.78,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: screenWidth*0.0472,
    marginTop: screenHeight*0.013,
    marginBottom: screenHeight*0.015,
    height: screenHeight*0.055,
    borderRadius: 22,
    borderWidth: 0.75,
    borderColor: '#000000',
    backgroundColor: '#FFFFFF',
  },
    searchContainer: {
    width: screenWidth*0.78,
    height: screenHeight*0.057,
    backgroundColor: '#F2F2F31A',
    borderWidth: 0.5,
    borderColor: '#D8D8ED',
    borderRadius: 22,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
    searchIconContainer: {
    width: screenWidth*0.094,
    height: screenHeight*0.0425,
    left: screenWidth*0.0167,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#000'
  },
  searchIcon: {
    width: screenWidth*0.0695,
    height: screenHeight*0.0312,
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
    width: screenWidth*0.12,
    height: screenHeight*0.055,
    left: screenWidth*0.8,
    borderWidth: 0.75,
    borderColor: '#000',
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  filterIcon: {
    width: screenWidth*0.065,
    height: screenHeight*0.025,
    tintColor: '#000',
  },
  statsSection: {
    width: screenWidth*0.916,
    height: screenHeight*0.11875,
    top: screenHeight*0.015,
    left: screenWidth*0.05,
    marginBottom: screenHeight*0.00725,
  },
  statsScrollView: {
    marginHorizontal: -(screenWidth*0.055),
  },
  statsScrollContainer: {
    paddingHorizontal: screenWidth*0.055,
  },
  statsCardDark: {
    width: screenWidth*0.233,
    height: screenHeight*0.0975,
    backgroundColor: '#242424',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#FFF',
    padding: screenHeight*0.02,
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
  statsCardLight: {
    width: screenWidth*0.233,
    height: screenHeight*0.0975,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EAE7E7',
    padding: screenHeight*0.02,
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
  statsTextDark: {
    fontFamily: 'Roboto-Medium',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: screenHeight*0.025,
    letterSpacing: 0,
    textAlign: 'center',
    color: '#FFFFFF',
    width: screenWidth*0.0472,
    height: screenHeight*0.025,
    top: screenHeight*0.02125,
    left: screenWidth*0.0916,
    position: 'absolute',
  },
  statsNumberDark: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFD600',
    fontFamily: 'Inter-Bold',
    lineHeight: screenHeight*0.04,
    width:'100%',
    height: screenHeight*0.035,
    top: screenHeight*0.025,
    textAlign: 'center',
  },
  statsTextLight: {
    fontFamily: 'Roboto-Medium',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: screenHeight*0.025,
    letterSpacing: 0,
    textAlign: 'center',
    color: '#000000',
    width: screenWidth*0.2,
    height: screenHeight*0.025,
    top: screenHeight*0.02125,
    left:screenWidth*0.0139,
    position: 'absolute',
  },
  statsNumberLight: {
    fontSize: 22,
    fontWeight: '700',
    fontFamily: 'Inter-Bold',
    lineHeight: screenHeight*0.04,
    width:'100%',
    height:screenHeight*0.035,
    top:screenHeight*0.025,
    textAlign: 'center',
  },
  contentSpacer: {
    height: screenHeight*0.2,
  },
  floorNavigationSection: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 42,
    width: screenWidth
  },
  fixedFloorButton: {
    width: 86,
    height: 28,
    backgroundColor: '#FED232',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    left: 19,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#171A1F',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 2,
    boxShadow: '0px 0px 1px 0px #171A1F0D, 0px 0px 2px 0px #171A1F14',
  },
  fixedFloorButtonText: {
    fontFamily: 'Roboto-Medium',
    fontWeight: '500',
    fontSize: 10,
    lineHeight: 20,
    letterSpacing: 0,
    textAlign: 'center',
    color: '#000000',
    width: 59,
    height: 20,
    top: 4,
    left: 13,
    position: 'absolute',
  },
  verticalDivider: {
    width: 1,
    height: 20,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 8,
    top: 6,
  },
  floorScrollContainer: {
    width: 260,
    height: 28,
    top: 6,
    left: 121,
    position: 'absolute',
  },
  floorScrollContent: {
    paddingRight: 20,
    alignItems: 'center',
  },
  floorScrollButton: {
    width: 86,
    height: 28,
    backgroundColor: '#FFF4B8',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    shadowColor: '#171A1F',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 2,
    boxShadow: '0px 0px 1px 0px #171A1F0D, 0px 0px 2px 0px #171A1F14',
  },
  selectedFloorButton: {
    backgroundColor: '#FED232',
  },
  floorScrollButtonText: {
    fontFamily: 'Roboto-Medium',
    fontWeight: '500',
    fontSize: 10,
    lineHeight: 20,
    letterSpacing: 0,
    textAlign: 'center',
    color: '#000000',
    width: 59,
    height: 20,
    top: 4,
    left: 13,
    position: 'absolute',
  },
  selectedFloorButtonText: {
    fontWeight: '600',
  },
});

// Room Card Styles
const roomCardStyles = StyleSheet.create({
  roomsSection: {
    paddingHorizontal: screenWidth * 0.046,
    paddingTop: screenHeight * 0.025,
    paddingBottom: screenHeight * 0.02,
  },
  container: {
    width: 339,
    height: 171,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#DEE1E6',
    marginBottom: screenHeight * 0.02,
    shadowColor: '#171A1F',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.07,
    shadowRadius: 1,
    elevation: 2,
    position: 'relative',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 11,
    paddingHorizontal: 22,
    height: 51,
  },
  roomIcon: {
    width: 30,
    height: 30,
    backgroundColor: '#FFD604',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  doorIcon: {
    width: 16,
    height: 16,
    tintColor: '#000000',
  },
  roomNumber: {
    fontFamily: 'Roboto-Medium',
    fontWeight: '600',
    fontSize: 16,
    color: '#000000',
    marginLeft: 12,
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginRight: 12,
  },
  statusText: {
    fontFamily: 'Roboto-Medium',
    fontWeight: '500',
    fontSize: 12,
  },
  shareButton: {
    width: 21,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareIcon: {
    width: 18,
    height: 16,
    tintColor: '#666666',
  },
  dividerLine: {
    width: 248,
    height: 1,
    backgroundColor: '#EEECEC',
    marginLeft: 45,
    marginTop: 0,
  },
  detailsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 21,
    paddingTop: 16,
    justifyContent: 'space-between',
  },
  leftColumn: {
    flex: 1,
  },
  rightColumn: {
    flex: 1,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailIcon: {
    width: 12,
    height: 12,
    tintColor: '#666666',
    marginRight: 6,
  },
  detailLabel: {
    fontFamily: 'Roboto-Regular',
    fontSize: 11,
    color: '#666666',
  },
  detailValue: {
    fontFamily: 'Roboto-Medium',
    fontWeight: '600',
    fontSize: 11,
    color: '#000000',
  },
  bedsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 21,
    paddingTop: 8,
    width: 92,
    height: 20,
  },
  bedIcon: {
    width: 12,
    height: 12,
    marginRight: 4,
  },
  emoji: {
    fontSize: 14,
    marginLeft: 4,
  },
  addTenantButton: {
    width: 123,
    height: 35,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#313030',
    borderRadius: 4,
    position: 'absolute',
    top: 121,
    right: 21,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addTenantText: {
    fontFamily: 'Roboto-Medium',
    fontWeight: '500',
    fontSize: 10,
    color: '#000000',
    letterSpacing: 0.5,
  },
});