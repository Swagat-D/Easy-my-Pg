import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  TouchableOpacity,
  Dimensions,
  ScrollView 
} from 'react-native';
import AddPropertyScreen from './AddPropertyScreen';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface PropertyTypeScreenProps {
  onNextStep?: (selectedPropertyType: string) => void;
  onBack?: () => void;
}

export default function PropertyTypeScreen({ onNextStep, onBack }: PropertyTypeScreenProps) {
  const [selectedPropertyType, setSelectedPropertyType] = useState<string>('');
  const [showAddProperty, setShowAddProperty] = useState(false);

  const propertyTypes = [
    { id: 'pgrooms', name: 'PG Rooms', icon: require('../assets/image1.png') },
    { id: 'hostel', name: 'Hostel', icon: require('../assets/image13.png') },
    { id: 'colivings', name: 'Co-Livings', icon: require('../assets/image9.png') },
    { id: 'flats', name: 'Flats', icon: require('../assets/image5.png') },
    { id: 'rks', name: 'RKs', icon: require('../assets/image16.png') },
    { id: 'studioapt', name: 'Studio Appt.', icon: require('../assets/image12.png') },
    { id: 'coworking', name: 'Co- Working', icon: require('../assets/image8.png') },
    { id: 'homestay', name: 'Homestay', icon: require('../assets/image4.png') },
    { id: 'library', name: 'Library', icon: require('../assets/image15.png') },
    { id: 'shops', name: 'Shops', icon: require('../assets/image11.png') },
    { id: 'hotel', name: 'Hotel', icon: require('../assets/image7.png') },
    { id: 'kothi', name: 'Kothi', icon: require('../assets/image3.png') },
    { id: 'independent', name: 'Independent Floors', icon: require('../assets/image14.png') },
    { id: 'villa', name: 'Villa', icon: require('../assets/image10.png') },
    { id: 'penthouse', name: 'PentHouse', icon: require('../assets/image6.png') },
    { id: 'warehouse', name: 'Warehouse', icon: require('../assets/image2.png') },
  ];

  const handlePropertyTypeSelect = (propertyType: string) => {
    setSelectedPropertyType(propertyType);
  };

  const handleSubmit = () => {
    if (selectedPropertyType) {
      setShowAddProperty(true);
    }
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    }
  };

  if (showAddProperty) {
    return <AddPropertyScreen />;
  }

  return (
    <ScrollView 
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Image 
        source={require('../assets/logo.png')} 
        style={styles.logo}
        resizeMode="contain"
      />
      
      <View style={styles.subtitleContainer}>
        <Text style={styles.subtitleText}>India 1st Renting Super App </Text>
        <Image 
          source={require('../assets/india.png')} 
          style={styles.flagIcon}
          resizeMode="contain"
        />
      </View>
      
      <Text style={styles.mainTitle}>Select Property Type</Text>
      
      <View style={styles.iconsContainer}>
        {propertyTypes.map((property, index) => {
          const row = Math.floor(index / 4);
          const col = index % 4;
          const isSelected = selectedPropertyType === property.id;
          
          return (
            <TouchableOpacity
              key={property.id}
              style={[
                styles.iconButton,
                {
                  top: row * (62 + 22 + 15), // icon height + text height + spacing
                  left: col * (62 + 17.33), // icon width + spacing
                },
                // Removed iconButtonSelected as it does not exist
              ]}
              onPress={() => handlePropertyTypeSelect(property.id)}
            >
              <View style={[styles.iconWrapper, isSelected && styles.iconWrapperSelected]}>
                <Image 
                  source={property.icon} 
                  style={styles.iconImage}
                  resizeMode="contain"
                />
              </View>
              <Text style={[styles.iconText, isSelected && styles.iconTextSelected]}>
                {property.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      
      <TouchableOpacity 
        style={[
          styles.submitButton,
          selectedPropertyType && styles.submitButtonActive
        ]}
        onPress={handleSubmit}
        disabled={!selectedPropertyType}
      >
        <Text style={[
          styles.submitButtonText,
          selectedPropertyType && styles.submitButtonTextActive
        ]}>
          Submit
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.backButton}
        onPress={handleBack}
      >
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  logo: {
    width: screenWidth * 0.264,
    height: screenHeight * 0.126,
    alignSelf: 'center',
    marginTop: screenHeight * 0.091,
    marginBottom: screenHeight * 0.02,
  },
  subtitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: screenHeight * 0.015,
  },
  subtitleText: {
    fontFamily: 'Poppins-Light',
    fontWeight: '300',
    fontSize: 16,
    lineHeight: screenHeight * 0.03,
    letterSpacing: 0,
    color: '#000',
    textAlign: 'center',
    includeFontPadding: false,
  },
  flagIcon: {
    width: screenWidth * 0.067,
    height: screenHeight * 0.03,
    marginLeft: 4,
  },
  mainTitle: {
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
    fontSize: 20,
    lineHeight: screenHeight * 0.035,
    color: '#000',
    textAlign: 'center',
    marginBottom: screenHeight * 0.025,
  },
  iconsContainer: {
    position: 'relative',
    width: 299,
    height: 343,
    alignSelf: 'center',
    marginBottom: screenHeight * 0.075,
  },
  iconButton: {
    position: 'absolute',
    alignItems: 'center',
    width: 62,
  },
  iconWrapper: {
    width: 62,
    height: 62,
    borderRadius: 12,
    borderWidth: 0.1,
    borderColor: '#00000066',
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconWrapperSelected: {
    backgroundColor: '#FFF7CE',
    borderColor: '#FFF7CE',
    borderWidth: 2,
  },
  iconImage: {
    width: 46,
    height: 46,
  },
  iconText: {
    fontFamily: 'Montserrat-Regular',
    fontWeight: '400',
    fontSize: 8,
    color: '#666',
    textAlign: 'center',
    lineHeight: 10,
  },
  iconTextSelected: {
    color: '#000',
    fontWeight: '500',
  },
  submitButton: {
    width: screenWidth * 0.89,
    height: screenHeight * 0.0625,
    backgroundColor: '#E0E0E0',
    borderRadius: 35,
    borderWidth: 1,
    borderColor: '#AEAEAE',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: screenHeight * 0.01,
  },
  submitButtonActive: {
    backgroundColor: '#FFD700',
    borderColor: '#FFD700',
  },
  submitButtonText: {
    fontFamily: 'Montserrat-SemiBold',
    fontWeight: '600',
    fontSize: 16,
    color: '#999',
    lineHeight: screenHeight * 0.02,
  },
  submitButtonTextActive: {
    color: '#000',
  },
  backButton: {
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: screenHeight * 0.05,
  },
  backButtonText: {
    fontFamily: 'Poppins',
    fontWeight: '400',
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
  },
});