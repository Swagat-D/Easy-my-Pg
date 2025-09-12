import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Animated,
  Dimensions,
  ScrollView,
  Image,
  StatusBar,
} from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface Floor {
  id: string;
  name: string;
  isAdded: boolean;
  isSelected: boolean;
}

interface AddFloorModalProps {
  visible: boolean;
  onClose: () => void;
  existingFloors: string[]; 
  onFloorsUpdate: (selectedFloors: string[]) => void;
}

export default function AddFloorModal({ 
  visible, 
  onClose, 
  existingFloors, 
  onFloorsUpdate 
}: AddFloorModalProps) {
  const [slideAnim] = useState(new Animated.Value(screenHeight));
  const [floors, setFloors] = useState<Floor[]>([
    { id: 'basement', name: 'Basement', isAdded: false, isSelected: false },
    { id: 'ground', name: 'Ground Floor', isAdded: false, isSelected: false },
    { id: '1st', name: '1st Floor', isAdded: false, isSelected: false },
    { id: '2nd', name: '2nd Floor', isAdded: false, isSelected: false },
    { id: '3rd', name: '3rd Floor', isAdded: false, isSelected: false },
    { id: '4th', name: '4th Floor', isAdded: false, isSelected: false },
    { id: '5th', name: '5th Floor', isAdded: false, isSelected: false },
    { id: '6th', name: '6th Floor', isAdded: false, isSelected: false },
    { id: '7th', name: '7th Floor', isAdded: false, isSelected: false },
    { id: '8th', name: '8th Floor', isAdded: false, isSelected: false },
    { id: '9th', name: '9th Floor', isAdded: false, isSelected: false },
    { id: '10th', name: '10th Floor', isAdded: false, isSelected: false },
  ]);

  // Update floors when existingFloors prop changes
  useEffect(() => {
    setFloors(prevFloors => 
      prevFloors.map(floor => ({
        ...floor,
        isAdded: existingFloors.includes(floor.id),
        isSelected: existingFloors.includes(floor.id)
      }))
    );
  }, [existingFloors]);

  // Handle modal animation
  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: screenHeight,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const handleFloorToggle = (floorId: string) => {
    setFloors(prevFloors => 
      prevFloors.map(floor => 
        floor.id === floorId 
          ? { ...floor, isSelected: !floor.isSelected }
          : floor
      )
    );
  };

  const handleClose = () => {
    // Get selected floors that are not already added
    const selectedFloors = floors
      .filter(floor => floor.isSelected)
      .map(floor => floor.id);
    
    onFloorsUpdate(selectedFloors);
    onClose();
  };

  const renderFloorItem = (floor: Floor) => (
    <TouchableOpacity 
      key={floor.id}
      style={styles.floorItem}
      onPress={() => handleFloorToggle(floor.id)}
    >
      <View style={[
        styles.radioContainer,
        floor.isSelected && styles.radioContainerSelected
      ]}>
        <View style={[
          styles.radioCircle,
          floor.isSelected && styles.radioCircleSelected
        ]} />
      </View>
      
      <Text style={styles.floorText}>{floor.name}</Text>
      
      {floor.isAdded && (
        <Text style={styles.alreadyAddedText}>Already Added</Text>
      )}
    </TouchableOpacity>
  );

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="none"
      onRequestClose={handleClose}
    >
      <StatusBar barStyle="dark-content" backgroundColor="rgba(0,0,0,0.5)" />
      <View style={styles.overlay}>
        <Animated.View
          style={[
            styles.modalContainer,
            {
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={handleClose}
            >
              <Image
                source={require('../assets/icons/x-circle.png')}
                style={styles.closeIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
            
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Select Floors to Add</Text>
            </View>
          </View>

          {/* Floor List */}
          <ScrollView 
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.floorsContainer}>
              {floors.map(renderFloorItem)}
            </View>
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#F8F9FA',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    height: screenHeight * 0.8,
    paddingTop: 20,
  },
  header: {
    position: 'relative',
    alignItems: 'center',
    marginBottom: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 47 - 20, // Adjusting for paddingTop
    left: 176 - (screenWidth - 375) / 2, // Centering based on screen width
    width: 24,
    height: 24,
    zIndex: 10,
  },
  closeIcon: {
    width: 24,
    height: 24,
  },
  titleContainer: {
    width: screenWidth,
    height: 56.74,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderWidth: 1,
    borderColor: '#DEE1E6',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 89 - 20,
    marginHorizontal: 8,
    // Shadow
    shadowColor: '#171A1F',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 2,
  },
  title: {
    fontFamily: 'Montserrat-SemiBold',
    fontWeight: '600',
    fontSize: 15,
    lineHeight: 24,
    color: '#000000',
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  floorsContainer: {
    paddingBottom: 50,
  },
  floorItem: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    marginBottom: 8,
    position: 'relative',
  },
  radioContainer: {
    width: 23,
    height: 23,
    borderRadius: 5,
    borderWidth: 0.3,
    borderColor: '#BEBEBEE5',
    backgroundColor: '#DADADA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  radioContainerSelected: {
    backgroundColor: '#FFF4B8',
    borderColor: '#BEBEBEE5',
  },
  radioCircle: {
    width: 8.31,
    height: 8.08,
    borderRadius: 4,
    borderWidth: 0.8,
    borderColor: '#000000',
    backgroundColor: '#FFFFFF',
  },
  radioCircleSelected: {
    backgroundColor: '#FED232',
    borderColor: '#000000',
  },
  floorText: {
    fontFamily: 'Montserrat-Regular',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
    color: '#000000',
    flex: 1,
  },
  alreadyAddedText: {
    fontFamily: 'Montserrat-Regular',
    fontWeight: '400',
    fontSize: 15,
    lineHeight: 24,
    color: '#FF4D4F',
    position: 'absolute',
    right: 0,
  },
});