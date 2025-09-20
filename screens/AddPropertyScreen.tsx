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
    paddingHorizontal: screenWidth*0.05,
    paddingTop: screenHeight*0.0425,
  },
  card: {
    width: screenWidth*0.941,
    height: screenHeight*0.237,
    top:screenHeight*0.141,
    left:screenWidth*0.011,
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
    top: screenHeight*0.029,
    left: screenWidth*0.055,
    width: screenWidth*0.65,
    height: screenHeight*0.292,
    fontFamily: 'Montserrat-SemiBold',
    fontWeight: '600',
    fontSize: 18,
    lineHeight: screenHeight*0.03,
    letterSpacing: 0,
    color: '#000',
  },
  subtitle: {
    position: 'absolute',
    top: screenWidth*0.075,
    left: screenWidth*0.055,
    width: screenWidth*0.655,
    height: screenHeight*0.0625,
    fontFamily: 'Montserrat-Regular',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: screenHeight*0.031,
    letterSpacing: 0,
    color: '#5A6066',
  },
  floorsButton: {
    position: 'absolute',
    top: screenHeight*0.157,
    left: screenWidth*0.055,
    width: screenWidth*0.441,
    height: screenHeight*0.0375,
    backgroundColor: '#FFF4B8',
    borderRadius: 6,
    borderWidth: 0.4,
    borderColor: '#E0DBDB',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: screenHeight*0.05,
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
    width: screenWidth*0.053,
    height: screenHeight*0.024,
  },
  buildingImageContainer: {
    position: 'absolute',
    top: screenHeight*0.085,
    left: screenWidth*0.633,
    width: screenWidth*0.259,
    height: screenHeight*0.11,
  },
  buildingImage: {
    width: '100%',
    height: '100%',
  },
});