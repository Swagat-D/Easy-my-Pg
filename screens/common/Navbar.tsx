import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions
} from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

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
  return (
    <View style={styles.container}>
      {/* Profile Photo Container */}
      <TouchableOpacity style={styles.profilePhotoContainer} onPress={onProfilePress}>
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
    height: 85,
    top:34,
    backgroundColor: '#fff',
    position: 'relative',
  },
  
  profilePhotoContainer: {
    position: 'absolute',
    width: 50,
    height: 50,
    top: 11,
    left: 18,
  },
  
  profilePhotoCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  
  profileImageDefault: {
    width: 50,
    height: 50,
    position: 'absolute',
    top: 1.25,
    left: 0.25,
  },
  
  // Text Styles
  welcomeText: {
    position: 'absolute',
    width: 123,
    height: 17,
    top: 19,
    left: 78,
    fontFamily: 'Montserrat-Regular',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 12,
    letterSpacing: 0,
    color: '#E74D3C',
  },
  
  propertyText: {
    position: 'absolute',
    width: 106,
    height: 18,
    top: 35,
    left: 78,
    fontFamily: 'Montserrat-Medium',
    fontWeight: '500',
    fontSize: 15,
    lineHeight: 15,
    letterSpacing: 0,
    color: '#000',
  },
  dropdownButton: {
    width: 11.968,
    height: 6,
    top: 31,
    left: 178,
  },
  
  dropdownIcon: {
    width: 11.968,
    height: 24,
  },
  
  supportContainer: {
    position: 'absolute',
    width: 50,
    height: 50,
    top: 0,
    right: 0,
  },
  supportIconCircle: {
    position: 'absolute',
    width: 25.93,
    height: 26,
    top: 23,
    left: 286.23,
  },
  supportIcon: {
    width: 18,
    height: 18,
    position: 'absolute',
    top: 27,
    left: 253,
  },
  supportCircleBorder: {
    position: 'absolute',
    width: 25.93,
    height: 26,
    top: 23,
    left: 286.23,
    borderRadius: 13,
    borderWidth: 1.5,
    borderColor: '#000000',
    backgroundColor: 'transparent',
  },
  questionIcon: {
    position: 'absolute',
    width: 8.637,
    height: 14.256,
    top: 12, // 3 + 9
    left: 15, // 3 + 12
  },
  
  questionCircleBorder: {
    position: 'absolute',
    width: 26,
    height: 26,
    top: 3,
    left: 3,
    borderRadius: 13,
    borderWidth: 1.5,
    borderColor: '#000000',
    backgroundColor: 'transparent',
  },
});