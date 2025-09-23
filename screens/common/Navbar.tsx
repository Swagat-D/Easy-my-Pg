import React, { use, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Alert
} from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import AddPropertyScreen from '../AddPropertyScreen';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface NavbarProps {
  userName?: string;
  propertyName?: string;
  profileImage?: string;
  onProfilePress?: () => void;
  onSupportPress?: () => void;
}

export default function Navbar({
  userName = 'Gyana',
  propertyName = 'Kalyani Nagar',
  profileImage,
  onProfilePress,
  onSupportPress
}: NavbarProps) {
  const { logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showPropertyDropdown, setShowPropertyDropdown] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(propertyName);
  const[addproperty, setAddProperty] = useState(false);

  const properties = ['Kalyani Nagar', 'Pune Station', 'Hadapsar', 'Kothrud', 'Aundh', 'Baner', 'Wakad'];

  const handlePropertyDropdownPress = () => {
    setShowPropertyDropdown(!showPropertyDropdown);
  };

  const handlePropertySelect = (property: string) => {
    setSelectedProperty(property);
    setShowPropertyDropdown(false);
    console.log('Selected property:', property);
  };

  const handleAddProperty = () => {
    setShowPropertyDropdown(false);
    setAddProperty(true);
  };

  const handleViewAllProperties = () => {
    setShowPropertyDropdown(false);
    Alert.alert(
      'All Properties',
      `You have ${properties.length} properties:\n\n${properties.join('\n')}`,
      [{ text: 'OK' }]
    );
  };

  // If Add Property screen should be shown, render it instead of the normal content
  if (addproperty) {
    return (
      <View style={styles.fullScreenContainer}>
        <AddPropertyScreen />
      </View>
    );
  }

  const displayedProperties = properties.length > 2 ? properties.slice(0, 2) : properties;
  const hasMoreProperties = properties.length > 2;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.profilePhotoContainer}
        onPress={() => setShowDropdown(!showDropdown)}
      >
        <View style={styles.profilePhotoCircle}>
          {profileImage ? (
            <Image
              source={{ uri: profileImage }}
              style={styles.profileImage}
              resizeMode="cover"
            />
          ) : (
            <Image
              source={require('../../assets/profile.png')}
              style={styles.profileImageDefault}
              resizeMode="contain"
            />
          )}
        </View>
      </TouchableOpacity>

      {showDropdown && (
        <View style={styles.dropdownMenu}>
          <TouchableOpacity onPress={logout} style={styles.dropdownItem}>
            <Text style={styles.dropdownText}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Welcome Text */}
      <Text style={styles.welcomeText}>Welcome {userName}</Text>

      {/* Property Name Text */}
      <Text style={styles.propertyText}>{selectedProperty}</Text>

      {/* Dropdown Icon */}
      <TouchableOpacity style={styles.dropdownButton} onPress={handlePropertyDropdownPress}>
        <Image
          source={require('../../assets/Vector.png')}
          style={styles.dropdownIcon}
          resizeMode="contain"
        />
      </TouchableOpacity>

      {/* Property Dropdown */}
      {showPropertyDropdown && (
        <View style={styles.propertyDropdownMenu}>
          <ScrollView showsVerticalScrollIndicator={false} style={styles.propertyScrollView}>
            {/* Display Properties */}
            {displayedProperties.map((property: string, index: number) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.propertyDropdownItem,
                  property === selectedProperty && styles.selectedPropertyItem
                ]}
                onPress={() => handlePropertySelect(property)}
              >
                <Text style={[
                  styles.propertyDropdownText,
                  property === selectedProperty && styles.selectedPropertyText
                ]}>
                  {property}
                </Text>
                {property === selectedProperty && (
                  <Image
                    source={require('../../assets/right-arrow.png')}
                    style={styles.checkIcon}
                    resizeMode="contain"
                  />
                )}
              </TouchableOpacity>
            ))}
            
            {/* View All Properties Option */}
            {hasMoreProperties && (
              <TouchableOpacity
                style={styles.viewAllItem}
                onPress={handleViewAllProperties}
              >
                <Text style={styles.viewAllText}>View All Properties</Text>
                <Text style={styles.propertyCountText}>({properties.length} total)</Text>
              </TouchableOpacity>
            )}
            
            {/* Separator */}
            <View style={styles.dropdownSeparator} />
            
            {/* Add Property Option */}
            <TouchableOpacity
              style={styles.addPropertyItem}
              onPress={handleAddProperty}
            >
              <Image
                source={require('../../assets/icons/plus.png')}
                style={styles.addPropertyIcon}
                resizeMode="contain"
              />
              <Text style={styles.addPropertyText}>Add Property</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      )}

      {/* Customer Support Container */}
      <TouchableOpacity style={styles.supportContainer} onPress={onSupportPress}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
          <TouchableOpacity style={{ width: 30, height: 30, borderRadius: 13, borderWidth: 1.5, borderColor: '#000', justifyContent: 'center', alignItems: 'center', backgroundColor: '#000',top:20, right:52 }}>
            <Image
              source={require('../../assets/support.png')}
              style={{ width: 18, height: 18 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity style={{ width: 30, height: 30, borderRadius: 13, borderWidth: 1.5, borderColor: '#000', justifyContent: 'center', alignItems: 'center', backgroundColor: '#000',top:20, right:55 }}>
            <Image
              source={require('../../assets/question.png')}
              style={{ width: 14, height: 14 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    height: screenHeight*0.106,
    top:screenHeight*0.0425,
    backgroundColor: '#fff',
    position: 'relative',
  },
  profilePhotoContainer: {
    position: 'absolute',
    width: screenHeight*0.139,
    height: screenWidth*0.0625,
    top: screenHeight*0.0138,
    left: screenWidth*0.05,
  },
  profilePhotoCircle: {
    width: screenWidth*0.139,
    height: screenHeight*0.0625,
    borderRadius: 25,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  profileImage: {
    width: screenWidth*0.139,
    height: screenHeight*0.0625,
    borderRadius: 25,
  },
  profileImageDefault: {
    width: screenWidth*0.139,
    height: screenHeight*0.0625,
    position: 'absolute',
    top: 1.25,
    left: 0.25,
  },
  welcomeText: {
    position: 'absolute',
    width: screenWidth*0.342,
    height: screenHeight*0.021,
    top: screenHeight*0.024,
    left: screenWidth*0.209,
    fontFamily: 'Montserrat-Regular',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: screenHeight*0.015,
    letterSpacing: 0,
    color: '#E74D3C',
  },
  propertyText: {
    position: 'absolute',
    width: screenWidth*0.295,
    height: screenHeight*0.0225,
    top: screenHeight*0.0438,
    left: screenWidth*0.217,
    fontFamily: 'Montserrat-Medium',
    fontWeight: '500',
    fontSize: 15,
    lineHeight: screenHeight*0.019,
    letterSpacing: 0,
    color: '#000',
  },
  dropdownButton: {
    width: screenWidth*0.033,
    height: screenHeight*0.0075,
    top: screenHeight*0.039,
    left: screenWidth*0.5,
  },
  dropdownIcon: {
    width: screenWidth*0.033,
    height: screenHeight*0.03,
  },
  supportContainer: {
    position: 'absolute',
    width: screenWidth*0.14,
    height: screenHeight*0.0625,
    top: 0,
    right: -10,
  },
  dropdownMenu: {
    position: 'absolute',
    top: screenHeight*0.0813,
    left: screenWidth*0.05,
    backgroundColor: '#fff',
    borderRadius: 6,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 10,
  },
  dropdownItem: {
    paddingVertical: screenHeight*0.01,
    paddingHorizontal: screenWidth*0.033,
  },
  dropdownText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FF4B4B',
  },
  propertyDropdownMenu: {
    position: 'absolute',
    top: screenHeight*0.08,
    left: screenWidth*0.217,
    width: screenWidth*0.65,
    maxHeight: screenHeight*0.35,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 1000,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  propertyScrollView: {
    maxHeight: screenHeight*0.3,
  },
  propertyDropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: screenHeight*0.015,
    paddingHorizontal: screenWidth*0.03,
    borderRadius: 8,
    marginVertical: 2,
  },
  selectedPropertyItem: {
    backgroundColor: '#F0F8FF',
    borderWidth: 1,
    borderColor: '#4A90E2',
  },
  propertyDropdownText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
    flex: 1,
  },
  selectedPropertyText: {
    color: '#4A90E2',
    fontWeight: '600',
  },
  checkIcon: {
    width: 16,
    height: 16,
    tintColor: '#4A90E2',
  },
  viewAllItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: screenHeight*0.012,
    paddingHorizontal: screenWidth*0.03,
    marginVertical: 2,
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  propertyCountText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#999',
  },
  dropdownSeparator: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginVertical: 8,
    marginHorizontal: 4,
  },
  addPropertyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: screenHeight*0.015,
    paddingHorizontal: screenWidth*0.03,
    borderRadius: 8,
    backgroundColor: '#F8F9FA',
    marginVertical: 2,
  },
  addPropertyIcon: {
    width: 18,
    height: 18,
    marginRight: 12,
    tintColor: '#4A90E2',
  },
  addPropertyText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#4A90E2',
  },
  fullScreenContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: screenWidth,
    height: screenHeight,
    backgroundColor: '#fff',
    zIndex: 1000,
  },
});
