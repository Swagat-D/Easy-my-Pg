import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { useAuth } from '../../contexts/AuthContext';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface NavbarProps {
  userName?: string;
  propertyName?: string;
  profileImage?: string;
  onProfilePress?: () => void;
  onSupportPress?: () => void;
  onDropdownPress?: () => void;
}

export default function Navbar({
  userName = 'Gyana',
  propertyName = 'Kalyani Nagar',
  profileImage,
  onProfilePress,
  onSupportPress,
  onDropdownPress
}: NavbarProps) {
  const { logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <View style={styles.container}>
      {/* Profile Photo Container */}
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

      {/* Dropdown for Logout */}
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
      <Text style={styles.propertyText}>{propertyName}</Text>

      {/* Dropdown Icon */}
      <TouchableOpacity style={styles.dropdownButton} onPress={onDropdownPress}>
        <Image
          source={require('../../assets/Vector.png')}
          style={styles.dropdownIcon}
          resizeMode="contain"
        />
      </TouchableOpacity>

      {/* Customer Support Container */}
      <TouchableOpacity style={styles.supportContainer} onPress={onSupportPress}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
          <TouchableOpacity style={{ width: 30, height: 30, borderRadius: 13, borderWidth: 1.5, borderColor: '#000', justifyContent: 'center', alignItems: 'center', backgroundColor: '#000',top:20, right:50 }}>
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
  
  // Text Styles
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
    right: 0,
  },
  supportIconCircle: {
    position: 'absolute',
    width: screenWidth*0.072,
    height: screenHeight*0.0325,
    top: screenHeight*0.029,
    left: screenWidth*0.795,
  },
  supportIcon: {
    width: screenWidth*0.05,
    height: screenHeight*0.0225,
    position: 'absolute',
    top: screenHeight*0.03375,
    left: screenWidth*0.703,
  },
  supportCircleBorder: {
    position: 'absolute',
    width: screenWidth*0.072,
    height: screenHeight*0.0325,
    top: screenHeight*0.029,
    left: screenWidth*0.795,
    borderRadius: 13,
    borderWidth: 1.5,
    borderColor: '#000000',
    backgroundColor: 'transparent',
  },
  questionIcon: {
    position: 'absolute',
    width: screenWidth*0.024,
    height: screenHeight*0.0179,
    top: screenHeight*0.015,
    left: screenWidth*0.42,
  },
  
  questionCircleBorder: {
    position: 'absolute',
    width: screenWidth*0.072,
    height: screenHeight*0.0325,
    top: screenHeight*0.00375,
    left: screenWidth*0.0084,
    borderRadius: 13,
    borderWidth: 1.5,
    borderColor: '#000000',
    backgroundColor: 'transparent',
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
});
