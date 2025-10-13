import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Dimensions, Image } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export interface TenantData {
  name: string;
  room: string;
  property: string;
  profileImage?: string;
}

interface ShiftTenantModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectNewProperty: () => void;
  onSelectNewRoom: () => void;
  tenantData?: TenantData;
}

const ShiftTenantModal: React.FC<ShiftTenantModalProps> = ({
  visible,
  onClose,
  onSelectNewProperty,
  onSelectNewRoom,
  tenantData = {
    name: 'Soumya sagar',
    room: '102',
    property: 'Kalyani Nagar',
  },
}) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Close Button */}
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <View style={styles.closeCircle}>
              <Text style={styles.closeX}>×</Text>
            </View>
          </TouchableOpacity>

          {/* Tenant Profile Section */}
          <View style={styles.tenantProfileSection}>
            <View style={styles.tenantInfo}>
              <View style={styles.tenantTextContainer}>
                <Text style={styles.tenantName}>{tenantData.name}</Text>
                <Text style={styles.roomInfo}>
                  Room: <Text style={styles.roomName}>{tenantData.room}</Text>
                </Text>
                <Text style={styles.propertyInfo}>
                  Property: <Text style={styles.propertyName}>{tenantData.property}</Text>
                </Text>
              </View>
              <View style={styles.profileImageContainer}>
                <Image
                  source={require('../../assets/profile.png')}
                  style={styles.profileImage}
                  resizeMode="cover"
                />
              </View>
            </View>
          </View>

          {/* Down Arrow */}
          <View style={styles.arrowContainer}>
              <Image
                source={require('../../assets/arrow-down.png')}
                style={styles.arrowImage}
                resizeMode="contain"
              />
          </View>

          {/* Options Section */}
          <View style={styles.optionsSection}>
            {/* New Property Option */}
            <View style={styles.optionItem}>
              <View style={styles.optionIcon}>
                <Image
                  source={require('../../assets/build.png')}
                  style={styles.propertyIcon}
                />
              </View>
              <View style={styles.optionTextContainer}>
                <Text style={styles.optionTitle}>New Property</Text>
                <Text style={styles.optionSubtitle}>Select Property</Text>
              </View>
              <TouchableOpacity style={styles.editButton}  onPress={onSelectNewProperty}>
                <Image
                  source={require('../../assets/Edit.png')}
                  style={styles.editIcon}
                />
              </TouchableOpacity>
            </View>

            {/* New Room Option */}
            <View style={[styles.optionItem, styles.lastOptionItem]}>
              <View style={styles.optionIcon}>
                <Image
                  source={require('../../assets/Double-bed.png')}
                  style={styles.roomIcon}
                />
              </View>
              <View style={styles.optionTextContainer}>
                <Text style={styles.optionTitle}>New Room</Text>
                <Text style={styles.optionSubtitle}>Select Room</Text>
              </View>
              <TouchableOpacity style={styles.editButton}  onPress={onSelectNewRoom}>
                <Image
                  source={require('../../assets/Edit.png')}
                  style={styles.editIcon}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  container: {
    backgroundColor: '#fff',
    borderTopLeftRadius: Math.max(20, screenWidth * 0.05),
    borderTopRightRadius: Math.max(20, screenWidth * 0.05),
    padding: Math.max(20, screenWidth * 0.05),
    paddingBottom: Math.max(40, screenHeight * 0.05),
    minHeight: Math.max(400, screenHeight * 0.45),
    maxHeight: screenHeight * 0.8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 10,
  },
  closeBtn: {
    alignSelf: 'center',
    marginBottom: Math.max(15, screenHeight * 0.02),
  },
  closeCircle: {
    width: Math.max(36, screenWidth * 0.09),
    height: Math.max(36, screenWidth * 0.09),
    borderRadius: Math.max(18, screenWidth * 0.045),
    borderWidth: 2,
    borderColor: '#f5d11dff',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  closeX: {
    fontSize: Math.max(24, screenWidth * 0.06),
    color: '#f5d11dff',
    fontWeight: 'bold',
  },
  tenantProfileSection: {
    backgroundColor: '#fff',
    borderRadius: Math.max(12, screenWidth * 0.03),
    padding: Math.max(16, screenWidth * 0.04),
    marginBottom: Math.max(15, screenHeight * 0.02),
    borderWidth: 1,
    borderColor: '#EAEAEA',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  tenantInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tenantTextContainer: {
    flex: 1,
    marginRight: Math.max(15, screenWidth * 0.04),
  },
  tenantName: {
    fontSize: Math.max(18, Math.min(22, screenWidth * 0.045)),
    fontFamily: 'Monserrat-SemiBold',
    fontWeight: '600',
    color: '#171A1F',
    marginBottom: Math.max(4, screenHeight * 0.005),
  },
  roomInfo: {
    fontSize: Math.max(14, Math.min(16, screenWidth * 0.035)),
    color: '#6E6C6C',
    marginBottom: Math.max(2, screenHeight * 0.003),
    fontFamily: 'Monserrat-Regular',
    fontWeight: '400',
  },
  propertyInfo: {
    fontSize: Math.max(14, Math.min(16, screenWidth * 0.035)),
    color: '#6E6C6C',
    fontFamily: 'Monserrat-Regular',
    fontWeight: '400',
  },
  propertyName: {
    color: '#EF1D1D',
    fontWeight: '400',
    fontFamily: 'Monserrat-Regular',
  },
  roomName: {
    color: '#EF1D1D',
    fontWeight: '400',
    fontFamily: 'Monserrat-Regular',
  },
  profileImageContainer: {
    width: Math.max(50, screenWidth * 0.12),
    height: Math.max(50, screenWidth * 0.12),
    borderRadius: Math.max(25, screenWidth * 0.06),
    overflow: 'hidden',
    backgroundColor: '#F0F0F0',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  arrowContainer: {
    alignItems: 'center',
    marginBottom: Math.max(15, screenHeight * 0.02),
  },
  arrowImage: {
    width: Math.max(48, screenWidth * 0.1),
    height: Math.max(48, screenWidth * 0.1),
  },
  optionsSection: {
    backgroundColor: '#fff',
    borderRadius: Math.max(12, screenWidth * 0.03),
    paddingHorizontal: Math.max(16, screenWidth * 0.04),
    marginBottom: Math.max(120, screenHeight * 0.015),
    borderWidth: 1,
    borderColor: '#EAEAEA',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Math.max(12, screenHeight * 0.015),
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  lastOptionItem: {
    borderBottomWidth: 0,
  },
  optionIcon: {
    width: Math.max(55, screenWidth * 0.14),
    height: Math.max(55, screenWidth * 0.14),
    borderRadius: Math.max(12, screenWidth * 0.03),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Math.max(15, screenWidth * 0.04),
  },
  propertyIcon: {
    width: Math.max(30, screenWidth * 0.075),
    height: Math.max(30, screenWidth * 0.075),
  },
  roomIcon: {
    width: Math.max(30, screenWidth * 0.075),
    height: Math.max(30, screenWidth * 0.075),
  },
  optionTextContainer: {
    flex: 1,
  },
  optionTitle: {
    fontSize: Math.max(12, Math.min(14, screenWidth * 0.035)),
    fontWeight: '600',
    fontFamily: 'Monserrat-SemiBold',
    verticalAlign: 'middle',
    color: '#171A1F',
    marginBottom: Math.max(2, screenHeight * 0.003),
  },
  optionSubtitle: {
    fontSize: Math.max(14, Math.min(16, screenWidth * 0.035)),
    color: '#6E6C6C',
    fontFamily: 'Monserrat-Regular',
    fontWeight: '400',
    verticalAlign: 'middle',
  },
  editButton: {
    padding: Math.max(8, screenWidth * 0.02),
  },
  editIcon: {
    width: Math.max(20, screenWidth * 0.05),
    height: Math.max(20, screenWidth * 0.05),
    tintColor: '#000000',
  },
});

export default ShiftTenantModal;