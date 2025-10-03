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
          { id: 'bed1', available: false },
          { id: 'bed2', available: true },
          { id: 'bed3', available: false },
          { id: 'bed4', available: false },
          { id: 'bed5', available: true },
          { id: 'bed6', available: false }
        ]
      },
      {
        id: 'room_102',
        roomNumber: 'Room 102',
        status: 'Available',
        bedCount: 10,
        rentDue: 2,
        underNotice: 1,
        activeTicket: 5,
        beds: [
          { id: 'bed1', available: true },
          { id: 'bed2', available: true },
          { id: 'bed3', available: true },
          { id: 'bed4', available: false },
          { id: 'bed5', available: false },
          { id: 'bed6', available: false },
          { id: 'bed7', available: false },
          { id: 'bed8', available: false },
          { id: 'bed9', available: false },
          { id: 'bed10', available: false }
        ]
      },
      {
        id: 'room_103',
        roomNumber: 'Room 103',
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
    const statusBgColor = room.status === 'Available' ? '#B0DCB2' : '#FF8484';
    
    // Calculate bed display logic
    const availableBeds = room.beds.filter((bed: any) => bed.available);
    const occupiedBeds = room.beds.filter((bed: any) => !bed.available);
    const totalBeds = room.beds.length;
    
    // Show maximum 4 bed icons
    const maxDisplayBeds = 4;
    let bedsToShow = [];
    let remainingCount = 0;
    
    // First show available beds (green), then occupied beds (red)
    const availableCount = availableBeds.length;
    const occupiedCount = occupiedBeds.length;
    
    if (totalBeds <= maxDisplayBeds) {
      // Show all beds if total is 4 or less
      bedsToShow = [...availableBeds, ...occupiedBeds];
    } else {
      // Show up to 4 beds with priority to available beds
      if (availableCount >= maxDisplayBeds) {
        // If we have 4 or more available beds, show 4 available
        bedsToShow = availableBeds.slice(0, maxDisplayBeds);
        remainingCount = totalBeds - maxDisplayBeds;
      } else {
        // Show all available beds first, then fill with occupied beds
        bedsToShow = [...availableBeds];
        const remainingSlots = maxDisplayBeds - availableCount;
        const occupiedToShow = Math.min(remainingSlots, occupiedCount);
        bedsToShow = [...bedsToShow, ...occupiedBeds.slice(0, occupiedToShow)];
        remainingCount = totalBeds - bedsToShow.length;
      }
    }
    
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
            <Text style={[roomCardStyles.statusText]}>
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
              <Text style={roomCardStyles.detailValuea}>{room.underNotice}</Text>
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
          {bedsToShow.map((bed: any, index: number) => (
            <Image
              key={`${bed.id}-${index}`}
              source={bed.available 
                ? require('../assets/icons/green.png') 
                : require('../assets/icons/red.png')
              }
              style={roomCardStyles.bedIcon}
              resizeMode="contain"
            />
          ))}
          {remainingCount > 0 && (
            <View style={roomCardStyles.remainingBedContainer}>
              <Text style={roomCardStyles.remainingBedText}>+{remainingCount}</Text>
            </View>
          )}
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
          <View style={styles.fixedFloorButton}>
            <Text style={styles.fixedFloorButtonText}>Floor View</Text>
          </View>
          <View style={styles.verticalDivider} />

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
    marginTop: screenHeight * 0.005,
    marginBottom: screenHeight * 0.0225,
    height: screenHeight * 0.045,
    backgroundColor: '#FFFFFF',
    paddingLeft: screenWidth * 0.05,
    
  },
  fixedFloorButton: {
    paddingHorizontal: screenWidth * 0.04,
    paddingVertical: screenHeight * 0.008,
    backgroundColor: '#FED232',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    width: screenWidth * 0.239,
    height: screenHeight * 0.035,
    minWidth: screenWidth * 0.2,
  },
  fixedFloorButtonText: {
    fontFamily: 'Roboto-Medium',
    fontWeight: '600',
    fontSize: screenWidth * 0.028,
    color: '#000000',
    textAlign: 'center',
  },
  verticalDivider: {
    width: 1,
    height: screenHeight * 0.025,
    backgroundColor: '#E0E0E0',
    marginHorizontal: screenWidth * 0.03,
  },
  floorScrollContainer: {
    flex: 1,
  },
  floorScrollContent: {
    alignItems: 'center',
  },
  floorScrollButton: {
    paddingHorizontal: screenWidth * 0.035,
    paddingVertical: screenHeight * 0.008,
    backgroundColor: '#FFF4B8',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: screenWidth * 0.025,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    width: screenWidth * 0.239,
    height: screenHeight * 0.035,
    minWidth: screenWidth * 0.18,
  },
  selectedFloorButton: {
    backgroundColor: '#FED232',
    borderColor: '#FFC107',
  },
  floorScrollButtonText: {
    fontFamily: 'Roboto-Medium',
    fontWeight: '500',
    fontSize: screenWidth * 0.026,
    color: '#666666',
    textAlign: 'center',
  },
  selectedFloorButtonText: {
    fontWeight: '600',
    color: '#000000',
  },
});
const roomCardStyles = StyleSheet.create({
  roomsSection: {
    paddingHorizontal: screenWidth * 0.046,
  },
  container: {
    width: screenWidth * 0.9,
    height: screenHeight * 0.21375,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#DEE1E6',
    marginBottom: screenHeight * 0.02,
    shadowColor: '#171A1F',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 1,
    elevation: 1,
    position: 'relative',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: screenHeight * 0.013,
    paddingHorizontal: screenWidth * 0.055,
    height: screenHeight * 0.06,
  },
  roomIcon: {
    width: screenWidth * 0.08,
    height: screenWidth * 0.08,
    backgroundColor: '#FFD604',
    borderRadius: screenWidth * 0.04,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  doorIcon: {
    width: screenWidth * 0.042,
    height: screenWidth * 0.042,
    tintColor: '#000000',
  },
  roomNumber: {
    fontFamily: 'Montserrat-Bold',
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0,
    color: '#171A1F',
    marginLeft: screenWidth * 0.03,
    flex: 1,
    verticalAlign: "middle",
  },
  statusBadge: {
    width: screenWidth * 0.22,
    height: screenHeight * 0.03125,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    marginRight: screenWidth * 0.032,
  },
  statusText: {
    fontFamily: 'Roboto-Medium',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 14,
    verticalAlign: "middle",
    letterSpacing: 0,
    color: '#161616',
  },
  shareButton: {
    width: screenWidth * 0.0585,
    height: screenHeight * 0.0225,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareIcon: {
    width: screenWidth * 0.0585,
    height: screenHeight * 0.0225,
    tintColor: '#666666',
  },
  dividerLine: {
    width: screenWidth * 0.65,
    height: 1,
    backgroundColor: '#EEECEC',
    marginLeft: screenWidth * 0.12,
    marginTop: 0,
  },
  detailsContainer: {
    flexDirection: 'row',
    paddingHorizontal: screenWidth * 0.055,
    paddingTop: screenHeight * 0.02,
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
    width: screenWidth * 0.0585,
    height: screenHeight * 0.0225,
    tintColor: '#000000',
    borderWidth: 0,
    borderColor: '#000000',
    marginRight: screenWidth * 0.016,
  },
  detailLabel: {
    fontFamily: 'OpenSans-Regular',
    fontWeight: '400',
    lineHeight: 17,
    letterSpacing: 0,
    fontSize: 14,
    color: '#000000',
  },
  detailValue: {
    fontFamily: 'Roboto-Medium',
    fontWeight: '500',
    fontSize: 16,
    letterSpacing: 0,
    lineHeight: 20,
    color: '#EF1D1D',
  },
  detailValuea: {
    fontFamily: 'Roboto-Medium',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 0,
    color: '#66BB6A',
  },
  bedsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: screenWidth * 0.055,
    paddingTop: screenHeight * 0.01,
    height: screenHeight * 0.03,
    flexWrap: 'wrap',
    top: screenHeight * 0.003,
  },
  bedIcon: {
    width: screenWidth * 0.055,
    height: screenHeight * 0.025,
    marginRight: screenWidth * 0.01,
  },
  remainingBedContainer: {
    width: screenWidth * 0.05,
    height: screenHeight * 0.0225,
    backgroundColor: '#FFD604',
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: screenWidth * 0.01,
  },
  remainingBedText: {
    fontSize: 8,
    lineHeight: 16,
    fontWeight: '500',
    color: '#000000',
    fontFamily: 'Roboto-Medium',
  },
  addTenantButton: {
    width: screenWidth * 0.341,
    height: screenHeight * 0.04375,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#313030',
    borderRadius: 4,
    position: 'absolute',
    bottom: screenHeight * 0.02,
    right: screenWidth * 0.065,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addTenantText: {
    fontFamily: 'Inter-Bold',
    fontWeight: '700',
    fontSize: 11,
    color: '#000000',
    letterSpacing: 0,
    lineHeight: screenHeight * 0.015,
    verticalAlign: "middle",
  },
});