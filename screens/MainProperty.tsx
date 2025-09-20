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
  },

  searchFilterContainer: {
    width: screenWidth*0.78,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: screenWidth*0.0472,
    marginTop: screenHeight*0.02875,
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
    width: screenWidth*0.05,
    height: screenHeight*0.0225,
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