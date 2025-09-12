import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  StatusBar
} from 'react-native';
import Navbar from './common/Navbar';
import BottomTabNavigator from './common/Tab';
import DashboardScreen from './Dashboard';
import FloorPage from './FloorPage';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface AddPropertyScreenProps {
  onFloorsPress?: () => void;
  onTabPress?: (tabId: string) => void;
  onAddPress?: () => void;
  onHomePress?: () => void;
}

export default function AddPropertyScreen({
  onFloorsPress,
  onTabPress,
  onAddPress,
  onHomePress
}: AddPropertyScreenProps) {
  const [currentScreen, setCurrentScreen] = useState<'property' | 'dashboard'>('property');
  const [showFloorPage, setShowFloorPage] = useState(false);

  const handleFloorsPress = () => {
    setShowFloorPage(true);
    if (onFloorsPress) {
      onFloorsPress();
    }
    console.log('Navigate to floors selection');
  };

  const handleBackFromFloors = () => {
  setShowFloorPage(false);
};

if (showFloorPage) {
  return (
    <FloorPage onBackPress={handleBackFromFloors} />
  );
}

  const handleTabPress = (tabId: string) => {
    if (onTabPress) {
      onTabPress(tabId);
    }
  };

  const handleAddPress = () => {
    if (onAddPress) {
      onAddPress();
    }
  };

  const handleHomePress = () => {
    if (onHomePress) {
      onHomePress();
    } else {
      setCurrentScreen('dashboard');
    }
  };

  if (currentScreen === 'dashboard') {
    return (
      <DashboardScreen 
        userName="Gyana"
        propertyName="Kalyani Nagar"
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      <Navbar
        userName="Gyana"
        propertyName="Kalyani Nagar"
        onProfilePress={() => console.log('Profile pressed')}
        onSupportPress={() => console.log('Support pressed')}
        onDropdownPress={() => console.log('Dropdown pressed')}
      />

      <View style={styles.content}>
        <View style={styles.card}>
          {/* Title */}
          <Text style={styles.title}>Add Rooms In your Property</Text>
          
          {/* Subtitle */}
          <Text style={styles.subtitle}>
            How many floors do you have{'\n'}in your property?
          </Text>
          
          {/* Total No Of Floors Button */}
          <TouchableOpacity style={styles.floorsButton} onPress={handleFloorsPress}>
            <Text style={styles.floorsButtonText}>Total No Of Floors ?</Text>
            <Image
              source={require('../assets/icons/arrow-right.png')}
              style={styles.arrowIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
          
          {/* Building Image */}
          <View style={styles.buildingImageContainer}>
            <Image
              source={require('../assets/add-property.png')}
              style={styles.buildingImage}
              resizeMode="contain"
            />
          </View>
        </View>
      </View>

      {/* Bottom Tab Navigator */}
      <BottomTabNavigator
        activeTab="property"
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
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 34, 
  },
  card: {
    width: 339,
    height: 190,
    top:113,
    left:4,
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#DEE1E6',
    position: 'relative',
    // Shadow for iOS
    shadowColor: '#171A1F',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    // Shadow for Android
    elevation: 3,
  },
  title: {
    position: 'absolute',
    top: 23,
    left: 20,
    width: 234,
    height: 24,
    fontFamily: 'Montserrat-SemiBold',
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: 0,
    color: '#000',
  },
  subtitle: {
    position: 'absolute',
    top: 60,
    left: 20,
    width: 236,
    height: 50,
    fontFamily: 'Montserrat-Regular',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 25,
    letterSpacing: 0,
    color: '#5A6066',
  },
  floorsButton: {
    position: 'absolute',
    top: 126,
    left: 20,
    width: 159,
    height: 30,
    backgroundColor: '#FFF4B8',
    borderRadius: 6,
    borderWidth: 0.4,
    borderColor: '#E0DBDB',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    // Shadow for iOS
    shadowColor: '#171A1F',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    // Shadow for Android
    elevation: 2,
  },
  floorsButtonText: {
    fontFamily: 'Montserrat-Medium',
    fontWeight: '500',
    fontSize: 12,
    color: '#000',
    flex: 1,
  },
  arrowIcon: {
    width: 19,
    height: 19,
  },
  buildingImageContainer: {
    position: 'absolute',
    top: 68,
    left: 228,
    width: 93,
    height: 88,
  },
  buildingImage: {
    width: '100%',
    height: '100%',
  },
});