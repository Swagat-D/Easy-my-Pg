import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Alert,
  Dimensions,
  Image
} from 'react-native';
import AddFloorModal from './AddFloorModal'; 
import AddUnits from './AddUnits'; 

const { width: screenWidth } = Dimensions.get('window');

interface Floor {
  id: string;
  name: string;
  units: number;
  beds: number;
  isSelected: boolean;
}

interface FloorPageProps {
  onBackPress?: () => void;
}

export default function FloorPage({ onBackPress }: FloorPageProps) {
  const [floors, setFloors] = useState<Floor[]>([
    {
      id: 'ground',
      name: 'Ground Floor',
      units: 0,
      beds: 0,
      isSelected: true
    }
  ]);
  
  const [showAddFloorModal, setShowAddFloorModal] = useState(false);
  const [showAddUnits, setShowAddUnits] = useState(false);
  const [selectedFloorForUnits, setSelectedFloorForUnits] = useState<Floor | null>(null);

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    }
    console.log('Navigate back to Add Property');
  };

  const handleAddFloor = () => {
    setShowAddFloorModal(true);
  };

  const handleCloseModal = () => {
    setShowAddFloorModal(false);
  };

  const handleFloorsUpdate = (selectedFloorIds: string[]) => {
    // Map floor IDs to proper floor names
    const floorNameMap: { [key: string]: string } = {
      'basement': 'Basement',
      'ground': 'Ground Floor',
      '1st': '1st Floor',
      '2nd': '2nd Floor',
      '3rd': '3rd Floor',
      '4th': '4th Floor',
      '5th': '5th Floor',
      '6th': '6th Floor',
      '7th': '7th Floor',
      '8th': '8th Floor',
      '9th': '9th Floor',
      '10th': '10th Floor',
    };

    // Get currently existing floor IDs
    const existingFloorIds = floors.map(floor => floor.id);
    
    // Add new floors that aren't already in the list
    const newFloors = selectedFloorIds
      .filter(id => !existingFloorIds.includes(id))
      .map(id => ({
        id,
        name: floorNameMap[id] || `${id} Floor`,
        units: 0,
        beds: 0,
        isSelected: false
      }));

    // Remove floors that are no longer selected
    const updatedExistingFloors = floors.filter(floor => 
      selectedFloorIds.includes(floor.id)
    );

    // Combine and sort floors
    const allFloors = [...updatedExistingFloors, ...newFloors];
    const sortedFloors = allFloors.sort((a, b) => {
      const floorOrder = ['basement', 'ground', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th'];
      return floorOrder.indexOf(a.id) - floorOrder.indexOf(b.id);
    });

    setFloors(sortedFloors);
  };

  const handleRoomsPress = () => {
    console.log('Navigate to rooms page');
  };

  const handleAddUnits = (floorId: string) => {
    const floor = floors.find(f => f.id === floorId);
    if (floor) {
      setSelectedFloorForUnits(floor);
      setShowAddUnits(true);
    }
  };

  const handleUnitsUpdate = (floorId: string, units: number, beds: number) => {
    setFloors(prev => prev.map(floor => 
      floor.id === floorId 
        ? { ...floor, units, beds }
        : floor
    ));
    setShowAddUnits(false);
    setSelectedFloorForUnits(null);
  };

  const handleBackFromAddUnits = () => {
    setShowAddUnits(false);
    setSelectedFloorForUnits(null);
  };

  const handleFloorSelect = (floorId: string) => {
    setFloors(floors.map(floor => ({
      ...floor,
      isSelected: floor.id === floorId
    })));
  };

  const renderFloorItem = (floor: Floor, index: number) => (
    <View key={floor.id} style={styles.floorCard}>
      <TouchableOpacity
        style={[
          styles.radioButton,
          floor.isSelected && styles.radioButtonSelected
        ]}
        onPress={() => handleFloorSelect(floor.id)}
      >
        <View style={floor.isSelected ? styles.radioButtonInner : styles.radioButtonInnerUnselected} />
      </TouchableOpacity>
      
      <View style={styles.floorInfo}>
        <Text style={styles.floorName}>{floor.name}</Text>
        <Text style={styles.floorDetails}>
          {floor.units > 0 ? `${floor.units} Units / ${floor.beds} Beds` : 'No Units Added'}
        </Text>
      </View>
      
      <TouchableOpacity
        style={[
          styles.addUnitsButton,
          floor.isSelected && styles.addUnitsButtonSelected
        ]}
        onPress={() => handleAddUnits(floor.id)}
      >
        <Text style={styles.addUnitsText}>ADD UNITS</Text>
      </TouchableOpacity>
    </View>
  );

  // Get existing floor IDs for the modal
  const existingFloorIds = floors.map(floor => floor.id);

  if (showAddUnits && selectedFloorForUnits) {
    return (
      <AddUnits
        floorId={selectedFloorForUnits.id}
        floorName={selectedFloorForUnits.name}
        onBackPress={handleBackFromAddUnits}
        onUnitsUpdate={handleUnitsUpdate}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FED232" />
      
      <View style={styles.topNavbar}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Image
            source={require('../assets/icons/arrow-right.png')}
            style={styles.backArrowImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Text style={styles.navTitle}>Add Multiple Rooms</Text>
      </View>

      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.floorsContainer}>
          {floors.map((floor, index) => renderFloorItem(floor, index))}
        </View>
      </ScrollView>

      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity style={styles.bottomButton} onPress={handleRoomsPress}>
          <Text style={styles.bottomButtonText}>Rooms</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomButton} onPress={handleAddFloor}>
          <Text style={styles.bottomButtonText}>Add Floor</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomIndicator} />

      {/* Add Floor Modal */}
      <AddFloorModal
        visible={showAddFloorModal}
        onClose={handleCloseModal}
        existingFloors={existingFloorIds}
        onFloorsUpdate={handleFloorsUpdate}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  topNavbar: {
    width: screenWidth,
    height: 97,
    backgroundColor: '#FED232',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  backArrowImage: {
    width: 24,
    height: 24,
    left: 10,
    transform: [{ rotate: '180deg' }],
  },
  navTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
    right: 70,
    fontFamily: 'Montserrat-SemiBold',
  },
  scrollContent: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  floorsContainer: {
    paddingBottom: 100,
  },
  floorCard: {
    width: 339,
    height: 98,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    alignSelf: 'center',
    position: 'relative',
    shadowColor: '#171A1F',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  radioButton: {
    position: 'absolute',
    top: 15,
    left: 16,
    width: 36,
    height: 37,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DADADA',
    borderRadius: 5,
  },
  radioButtonSelected: {
    backgroundColor: '#FFF4B8',
  },
  radioButtonInner: {
    width: 13,
    height: 13,
    borderRadius: 6.5,
    borderWidth: 0.8,
    borderColor: '#000000',
    backgroundColor: '#FED232',
  },
  radioButtonInnerUnselected: {
    width: 13,
    height: 13,
    borderRadius: 6.5,
    borderWidth: 0.8,
    backgroundColor: '#FFFFFF',
  },
  floorInfo: {
    position: 'absolute',
    top: 20,
    left: 70,
    width: 120,
  },
  floorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
    fontFamily: 'Montserrat-SemiBold',
  },
  floorDetails: {
    fontSize: 12,
    color: '#5A6066',
    fontFamily: 'Montserrat-Regular',
  },
  addUnitsButton: {
    position: 'absolute',
    top: 49,
    left: 201,
    width: 123,
    height: 35,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#AEAEAE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addUnitsButtonSelected: {
    backgroundColor: '#FFF4B8',
  },
  addUnitsText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#000',
    fontFamily: 'Inter-SemiBold',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    zIndex: 2,
  },
  bottomIndicator: {
    position: 'absolute',
    bottom: 5,
    left: '50%',
    marginLeft: -67.5,
    width: 135,
    height: 5,
    backgroundColor: '#000',
    borderRadius: 2.5,
    opacity: 0.3,
  },
  bottomButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 36,
  },
  bottomButton: {
    backgroundColor: '#FEDC15',
    borderColor: '#EAEAEA',
    borderRadius: 35,
    marginHorizontal: 15,
    width: 132,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 0,
  },
  bottomButtonText: {
    color: '#050505',
    fontWeight: '600',
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold',
    letterSpacing: 0,
  },
});