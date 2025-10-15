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
  TextInput,
  Dimensions,
  PanResponder,
  Animated,
  Linking
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
  const [selectedRoom, setSelectedRoom] = useState<string>('All Rooms');
  
  const animatedValues = useRef<{[key: string]: Animated.Value}>({});
  
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

  const roomsData = [
    '101',
    '102', 
    '103',
    '104',
    '105'
  ];

  const getAnimatedValue = (tenantId: string) => {
    if (!animatedValues.current[tenantId]) {
      animatedValues.current[tenantId] = new Animated.Value(0);
    }
    return animatedValues.current[tenantId];
  };

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

  const handleRoomSelect = (room: string) => {
    setSelectedRoom(room);
    console.log('Selected room:', room);
  };

  const filteredTenants = selectedRoom === 'All Rooms' 
    ? tenantsData 
    : tenantsData.filter(tenant => tenant.room === selectedRoom);

  const handleAddTenant = () => {
    console.log('Add tenant for room:', selectedRoom);
    if (onAddTenantPress) {
      onAddTenantPress();
    }
  };

  const resetCardPosition = (tenantId: string) => {
    Animated.timing(getAnimatedValue(tenantId), {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const handleDeleteTenant = (tenantId: string) => {
    console.log('Delete tenant:', tenantId);
    resetCardPosition(tenantId);
  };

  const handleChangeRoom = (tenantId: string) => {
    console.log('Change room for tenant:', tenantId);
    resetCardPosition(tenantId);
  };

  const handleChangeProperty = (tenantId: string) => {
    console.log('Change property for tenant:', tenantId);
    resetCardPosition(tenantId);
  };

  const handlePutOnNotice = (tenantId: string) => {
    console.log('Put tenant on notice:', tenantId);
    resetCardPosition(tenantId);
  };

  const handleCall = (tenantId: string) => {
    const tenant = tenantsData.find(t => t.id === tenantId);
    if (tenant) {
      Linking.openURL(`tel:${tenant.mobile}`);
    }
    resetCardPosition(tenantId);
  };

  const handleWhatsApp = (tenantId: string) => {
    const tenant = tenantsData.find(t => t.id === tenantId);
    if (tenant) {
      const phoneNumber = tenant.mobile.replace(/\+/g, '').replace(/\s/g, '');
      Linking.openURL(`whatsapp://send?phone=${phoneNumber}`);
    }
    resetCardPosition(tenantId);
  };

  const createPanResponder = (tenant: Tenant) => {
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
          if (onTenantProfilePress) {
            onTenantProfilePress(tenant);
          }
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
    const panResponder = createPanResponder(tenant);
    
    return (
      <View key={tenant.id} style={styles.tenantCardContainer}>
        {/* Action Panel (Always rendered behind card) */}
        <View style={styles.actionPanel}>
          <View style={styles.actionColumn}>
            <TouchableOpacity 
              style={[styles.actionButton, styles.deleteButton]}
              onPress={() => handleDeleteTenant(tenant.id)}
            >
              <Text style={styles.deleteButtonText}>Delete Tenant</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.actionButton, styles.changeRoomButton]}
              onPress={() => handleChangeRoom(tenant.id)}
            >
              <Text style={styles.actionButtonText}>Change Room</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.actionButton, styles.changePropertyButton]}
              onPress={() => handleChangeProperty(tenant.id)}
            >
              <Text style={styles.actionButtonText}>Change Property</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.actionButton, styles.noticeButton]}
              onPress={() => handlePutOnNotice(tenant.id)}
            >
              <Text style={styles.actionButtonText}>Put On Notice</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.contactColumn}>
            <TouchableOpacity 
              style={[styles.contactButton, styles.callButton]}
              onPress={() => handleCall(tenant.id)}
            >
              <Image
                source={require('../assets/call.png')}
                style={styles.contactIcon}
              />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.contactButton, styles.whatsappButton]}
              onPress={() => handleWhatsApp(tenant.id)}
            >
              <Image
                source={require('../assets/whatsApp.png')}
                style={styles.contactIcon}
              />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.contactButton, styles.moreButton]}
              onPress={() => console.log('More options')}
            >
              <Text style={styles.moreText}>•••</Text>
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
        </Animated.View>
      </View>
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
            {selectedRoom === 'All Rooms' 
              ? 'No tenants in this property yet'
              : `No tenants in Room: ${selectedRoom} yet`
            }
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

        <View style={styles.roomNavigationSection}>
          <TouchableOpacity 
            style={[
              styles.fixedRoomButton,
              selectedRoom === 'All Rooms' && styles.selectedRoomButton
            ]}
            onPress={() => handleRoomSelect('All Rooms')}
          >
            <Image
              source={require('../assets/icons/door-open.png')}
              style={styles.roomIcon}
              resizeMode="contain"
            />
            <Text style={[
              styles.fixedRoomButtonText,
              selectedRoom === 'All Rooms' && styles.selectedRoomButtonText
            ]}>All Rooms</Text>
          </TouchableOpacity>
          <View style={styles.verticalDivider} />

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.roomScrollContainer}
            contentContainerStyle={styles.roomScrollContent}
          >
            {roomsData.map((room, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.roomScrollButton,
                  selectedRoom === room && styles.selectedRoomButton
                ]}
                onPress={() => handleRoomSelect(room)}
              >
                <Image
                  source={require('../assets/icons/door-open.png')}
                  style={styles.roomIcon}
                  resizeMode="contain"
                />
                <Text style={[
                  styles.roomScrollButtonText,
                  selectedRoom === room && styles.selectedRoomButtonText
                ]}>
                  Room: {room}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
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
    zIndex: 10,
    position: 'relative',
  },
  tenantCardContainer: {
    position: 'relative',
    marginBottom: screenHeight * 0.02,
    overflow: 'hidden', 
    borderRadius: 12, 
    backgroundColor: '#FFFFFF',
    shadowColor: '#171A1F',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.08,
    shadowRadius: 1,
    elevation: 1,
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
  deleteButton: {
    backgroundColor: 'transparent',
  },
  deleteButtonText: {
    fontFamily: 'Roboto-Medium',
    fontWeight: '600',
    fontSize: screenWidth * 0.032,
    color: '#FF4444',
    textAlign: 'left',
    lineHeight: screenHeight * 0.02,
  },
  changeRoomButton: {
    backgroundColor: 'transparent',
  },
  changePropertyButton: {
    backgroundColor: 'transparent',
  },
  noticeButton: {
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
    marginTop: -(screenHeight * 0.005),
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
  roomNavigationSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: screenHeight * 0.005,
    height: screenHeight * 0.045,
    backgroundColor: '#FFFFFF',
    paddingLeft: screenWidth * 0.05,
  },
  fixedRoomButton: {
    paddingHorizontal: screenWidth * 0.03,
    paddingVertical: screenHeight * 0.008,
    backgroundColor: '#FFF4B8',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: screenWidth * 0.27,
    height: screenHeight * 0.035,
    minWidth: screenWidth * 0.25,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  selectedRoomButton: {
    backgroundColor: '#FED232',
    borderColor: '#FFC107',
  },
  fixedRoomButtonText: {
    fontFamily: 'Roboto-Medium',
    fontWeight: '500',
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
    marginLeft: screenWidth * 0.01,
  },
  selectedRoomButtonText: {
    fontWeight: '600',
    color: '#000000',
  },
  roomIcon: {
    width: screenWidth * 0.035,
    height: screenWidth * 0.035,
    tintColor: '#000000',
  },
  verticalDivider: {
    width: 1,
    height: screenHeight * 0.025,
    backgroundColor: '#E0E0E0',
    marginHorizontal: screenWidth * 0.03,
  },
  roomScrollContainer: {
    flex: 1,
  },
  roomScrollContent: {
    alignItems: 'center',
  },
  roomScrollButton: {
    paddingHorizontal: screenWidth * 0.03,
    paddingVertical: screenHeight * 0.008,
    backgroundColor: '#FFF4B8',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginRight: screenWidth * 0.025,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    width: screenWidth * 0.27,
    height: screenHeight * 0.035,
    minWidth: screenWidth * 0.25,
  },
  roomScrollButtonText: {
    fontFamily: 'Roboto-Medium',
    fontWeight: '500',
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
    marginLeft: screenWidth * 0.01,
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