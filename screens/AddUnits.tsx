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

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

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
    height: screenHeight*0.1213,
    backgroundColor: '#FED232',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: screenWidth*0.045,
    paddingTop: screenHeight*0.05,
  },
  backButton: {
    width: screenWidth*0.11,
    height: screenHeight*0.05,
    justifyContent: 'center',
    zIndex: 2,
  },
  backArrowImage: {
    width: screenWidth*0.066,
    height: screenHeight*0.03,
    left: screenWidth*0.028,
    transform: [{ rotate: '180deg' }],
  },
  navTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: '#171A1F',
    textAlign: 'center',
    right: screenWidth*0.153,
    fontFamily: 'Montserrat-SemiBold',
  },
  scrollContent: {
    flex: 1,
    paddingHorizontal: screenWidth*0.061,
    paddingTop: screenHeight*0.025,
  },
  sectionContainer: {
    width: screenWidth*0.942,
    height: screenHeight*0.0613,
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
    minHeight: screenHeight*0.0613,
  },
  sectionHeader: {
    height: screenHeight*0.0613,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: screenWidth*0.045,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    fontFamily: 'Montserrat-SemiBold',
    width: screenWidth*0.1,
    height: screenHeight*0.03,
    textAlignVertical: 'center',
    marginLeft: screenWidth*0.025,
  },
  unitsContainer: {
    backgroundColor: '#FFF4B8',
    borderRadius: 4,
    width: screenWidth*0.3083,
    height: screenHeight*0.034,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: screenWidth*0.0611,
  },
  unitsText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#171A1F',
    fontFamily: 'Inter-SemiBold',
    width: screenWidth*0.22,
    height: screenHeight*0.0163,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  dropdownIcon: {
    width: screenWidth*0.066,
    height: screenHeight*0.03,
    marginLeft: 'auto',
    marginRight: screenWidth*0.022,
  },
  dropdownIconRotated: {
    transform: [{ rotate: '180deg' }],
  },
  expandedContent: {
    paddingBottom: screenHeight*0.02,
  },
  roomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: screenWidth*0.069,
    paddingVertical: screenHeight*0.01,
    height: screenHeight*0.05,
  },
  roomName: {
    fontSize: 14,
    fontWeight: '400',
    color: '#000',
    fontFamily: 'Montserrat-Regular',
    width: screenWidth*0.283,
    height: screenHeight*0.03,
    lineHeight: screenHeight*0.03,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterButton: {
    width: screenWidth*0.0416,
    height: screenHeight*0.019,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterIcon: {
    width: screenWidth*0.05,
    height: screenHeight*0.0225,
  },
  counterNumber: {
    fontSize: 14,
    fontWeight: '300',
    color: '#000',
    fontFamily: 'Montserrat-Light',
    width: screenWidth*0.028,
    height: screenHeight*0.027,
    lineHeight: screenHeight*0.03,
    textAlign: 'center',
    marginHorizontal: screenWidth*0.055,
  },
  bottomButtonContainer: {
    paddingHorizontal: screenWidth*0.055,
    paddingBottom: screenWidth*0.1,
    paddingTop: screenHeight*0.025,
  },
  addUnitsButton: {
    width: screenWidth*0.92,
    height: screenHeight*0.0625,
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
    width: screenWidth*0.236,
    height: screenHeight*0.02,
    lineHeight: screenHeight*0.02,
    textAlign: 'center',
  },
  bottomIndicator: {
    position: 'absolute',
    bottom: screenHeight*0.00625,
    left: '50%',
    marginLeft: -(screenWidth*0.1875),
    width: screenWidth*0.375,
    height: screenHeight*0.00625,
    backgroundColor: '#000',
    borderRadius: 2.5,
    opacity: 0.3,
  },
});