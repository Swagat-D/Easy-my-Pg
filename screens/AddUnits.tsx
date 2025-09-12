import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Dimensions,
  Image
} from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

interface RoomType {
  id: string;
  name: string;
  count: number;
}

interface AddUnitsProps {
  floorId: string;
  floorName: string;
  onBackPress?: () => void;
  onUnitsUpdate?: (floorId: string, units: number, beds: number) => void;
}

export default function AddUnits({ 
  floorId, 
  floorName, 
  onBackPress, 
  onUnitsUpdate 
}: AddUnitsProps) {
  const [roomTypes, setRoomTypes] = useState<RoomType[]>([
    { id: 'single', name: 'Single Sharing', count: 0 },
    { id: 'double', name: 'Double Sharing', count: 0 },
    { id: '3sharing', name: '3 Sharing', count: 0 },
    { id: '4sharing', name: '4 Sharing', count: 0 },
    { id: '5sharing', name: '5 Sharing', count: 0 },
    { id: '6sharing', name: '6 Sharing', count: 0 },
    { id: '7sharing', name: '7 Sharing', count: 0 },
    { id: '8sharing', name: '8 Sharing', count: 0 },
    { id: '9sharing', name: '9 Sharing', count: 0 },
  ]);

  const [rkCount, setRkCount] = useState(0);
  const [bhkCount, setBhkCount] = useState(0);
  const [isRoomExpanded, setIsRoomExpanded] = useState(true);
  const [isRkExpanded, setIsRkExpanded] = useState(false);
  const [isBhkExpanded, setIsBhkExpanded] = useState(false);

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    }
  };

  const updateRoomCount = (roomId: string, increment: boolean) => {
    setRoomTypes(prev => 
      prev.map(room => 
        room.id === roomId 
          ? { ...room, count: Math.max(0, room.count + (increment ? 1 : -1)) }
          : room
      )
    );
  };

  const updateRkCount = (increment: boolean) => {
    setRkCount(prev => Math.max(0, prev + (increment ? 1 : -1)));
  };

  const updateBhkCount = (increment: boolean) => {
    setBhkCount(prev => Math.max(0, prev + (increment ? 1 : -1)));
  };

  const calculateTotalUnitsAndBeds = () => {
    const roomUnits = roomTypes.reduce((sum, room) => sum + room.count, 0);
    const totalUnits = roomUnits + rkCount + bhkCount;
    
    const roomBeds = roomTypes.reduce((sum, room) => {
      const sharing = parseInt(room.name.split(' ')[0]) || 1;
      return sum + (room.count * sharing);
    }, 0);
    
    const totalBeds = roomBeds + rkCount + bhkCount;
    
    return { totalUnits, totalBeds };
  };

  const handleAddUnits = () => {
    const { totalUnits, totalBeds } = calculateTotalUnitsAndBeds();
    if (onUnitsUpdate) {
      onUnitsUpdate(floorId, totalUnits, totalBeds);
    }
    handleBackPress();
  };

  const renderRoomCounter = (room: RoomType) => (
    <View key={room.id} style={styles.roomRow}>
      <Text style={styles.roomName}>{room.name}</Text>
      <View style={styles.counterContainer}>
        <TouchableOpacity 
          style={styles.counterButton}
          onPress={() => updateRoomCount(room.id, false)}
        >
          <Image
            source={require('../assets/icons/minus.png')}
            style={styles.counterIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Text style={styles.counterNumber}>{room.count}</Text>
        <TouchableOpacity 
          style={styles.counterButton}
          onPress={() => updateRoomCount(room.id, true)}
        >
          <Image
            source={require('../assets/icons/plus.png')}
            style={styles.counterIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  const { totalUnits, totalBeds } = calculateTotalUnitsAndBeds();

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
        <Text style={styles.navTitle}>{`Add Units to ${floorName}`}</Text>
      </View>

      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Room Section */}
        <View style={[styles.sectionContainer, isRoomExpanded && styles.expandedContainer]}>
          <TouchableOpacity 
            style={styles.sectionHeader}
            onPress={() => setIsRoomExpanded(!isRoomExpanded)}
          >
            <Text style={styles.sectionTitle}>Room</Text>
            <View style={styles.unitsContainer}>
              <Text style={styles.unitsText}>{`${roomTypes.reduce((sum, room) => sum + room.count, 0)} Units / ${roomTypes.reduce((sum, room) => sum + (room.count * (parseInt(room.name.split(' ')[0]) || 1)), 0)} Bed`}</Text>
            </View>
            <Image
              source={require('../assets/dropdown-arrow.png')}
              style={[styles.dropdownIcon, isRoomExpanded && styles.dropdownIconRotated]}
              resizeMode="contain"
            />
          </TouchableOpacity>
          
          {isRoomExpanded && (
            <View style={styles.expandedContent}>
              {roomTypes.map(room => renderRoomCounter(room))}
            </View>
          )}
        </View>

        {/* RK Section */}
        <View style={[styles.sectionContainer, isRkExpanded && styles.expandedContainer]}>
          <TouchableOpacity 
            style={styles.sectionHeader}
            onPress={() => setIsRkExpanded(!isRkExpanded)}
          >
            <Text style={styles.sectionTitle}>RK</Text>
            <View style={styles.unitsContainer}>
              <Text style={styles.unitsText}>{`${rkCount} Units / ${rkCount} Bed`}</Text>
            </View>
            <Image
              source={require('../assets/dropdown-arrow.png')}
              style={[styles.dropdownIcon, isRkExpanded && styles.dropdownIconRotated]}
              resizeMode="contain"
            />
          </TouchableOpacity>
          
          {isRkExpanded && (
            <View style={styles.expandedContent}>
              <View style={styles.roomRow}>
                <Text style={styles.roomName}>RK</Text>
                <View style={styles.counterContainer}>
                  <TouchableOpacity 
                    style={styles.counterButton}
                    onPress={() => updateRkCount(false)}
                  >
                    <Image
                      source={require('../assets/icons/minus.png')}
                      style={styles.counterIcon}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                  <Text style={styles.counterNumber}>{rkCount}</Text>
                  <TouchableOpacity 
                    style={styles.counterButton}
                    onPress={() => updateRkCount(true)}
                  >
                    <Image
                      source={require('../assets/icons/plus.png')}
                      style={styles.counterIcon}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        </View>

        {/* BHK Section */}
        <View style={[styles.sectionContainer, isBhkExpanded && styles.expandedContainer]}>
          <TouchableOpacity 
            style={styles.sectionHeader}
            onPress={() => setIsBhkExpanded(!isBhkExpanded)}
          >
            <Text style={styles.sectionTitle}>BHK</Text>
            <View style={styles.unitsContainer}>
              <Text style={styles.unitsText}>{`${bhkCount} Units / ${bhkCount} Bed`}</Text>
            </View>
            <Image
              source={require('../assets/dropdown-arrow.png')}
              style={[styles.dropdownIcon, isBhkExpanded && styles.dropdownIconRotated]}
              resizeMode="contain"
            />
          </TouchableOpacity>
          
          {isBhkExpanded && (
            <View style={styles.expandedContent}>
              <View style={styles.roomRow}>
                <Text style={styles.roomName}>BHK</Text>
                <View style={styles.counterContainer}>
                  <TouchableOpacity 
                    style={styles.counterButton}
                    onPress={() => updateBhkCount(false)}
                  >
                    <Image
                      source={require('../assets/icons/minus.png')}
                      style={styles.counterIcon}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                  <Text style={styles.counterNumber}>{bhkCount}</Text>
                  <TouchableOpacity 
                    style={styles.counterButton}
                    onPress={() => updateBhkCount(true)}
                  >
                    <Image
                      source={require('../assets/icons/plus.png')}
                      style={styles.counterIcon}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity style={styles.addUnitsButton} onPress={handleAddUnits}>
          <Text style={styles.addUnitsButtonText}>Add Units</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomIndicator} />
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
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    zIndex: 2,
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
    color: '#171A1F',
    textAlign: 'center',
    right: 55,
    fontFamily: 'Montserrat-SemiBold',
  },
  scrollContent: {
    flex: 1,
    paddingHorizontal: 22,
    paddingTop: 20,
  },
  sectionContainer: {
    width: 339,
    height: 49,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#DEE1E6',
    marginBottom: 16,
    alignSelf: 'center',
    shadowColor: '#171A1F',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  expandedContainer: {
    height: 'auto',
    minHeight: 49,
  },
  sectionHeader: {
    height: 49,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    fontFamily: 'Montserrat-SemiBold',
    width: 36,
    height: 24,
    textAlignVertical: 'center',
    marginLeft: 9,
  },
  unitsContainer: {
    backgroundColor: '#FFF4B8',
    borderRadius: 4,
    width: 111,
    height: 27,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 22,
  },
  unitsText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#171A1F',
    fontFamily: 'Inter-SemiBold',
    width: 79,
    height: 13,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  dropdownIcon: {
    width: 24,
    height: 24,
    marginLeft: 'auto',
    marginRight: 8,
  },
  dropdownIconRotated: {
    transform: [{ rotate: '180deg' }],
  },
  expandedContent: {
    paddingBottom: 16,
  },
  roomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    paddingVertical: 8,
    height: 40,
  },
  roomName: {
    fontSize: 14,
    fontWeight: '400',
    color: '#000',
    fontFamily: 'Montserrat-Regular',
    width: 102,
    height: 24,
    lineHeight: 24,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterButton: {
    width: 15,
    height: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterIcon: {
    width: 18,
    height: 18,
  },
  counterNumber: {
    fontSize: 14,
    fontWeight: '300',
    color: '#000',
    fontFamily: 'Montserrat-Light',
    width: 10,
    height: 21,
    lineHeight: 24,
    textAlign: 'center',
    marginHorizontal: 20,
  },
  bottomButtonContainer: {
    paddingHorizontal: 22,
    paddingBottom: 36,
    paddingTop: 20,
  },
  addUnitsButton: {
    width: 332,
    height: 50,
    backgroundColor: '#FEDC15',
    borderRadius: 35,
    borderWidth: 1,
    borderColor: '#EAEAEA',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  addUnitsButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    fontFamily: 'Montserrat-SemiBold',
    width: 85,
    height: 16,
    lineHeight: 16,
    textAlign: 'center',
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
});