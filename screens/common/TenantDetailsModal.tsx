import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Dimensions,
  Image,
  Linking
} from 'react-native';
import DocumentsModal from './DocumentsModal';
import ShiftTenantModal from './ShiftTenantModal';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface Tenant {
  id: string;
  name: string;
  profileImage?: string;
  room: string;
  underNotice: boolean;
  rentDue: boolean;
  joinedDate: string;
  mobile: string;
}

interface TenantDetailsModalProps {
  visible: boolean;
  onClose: () => void;
  tenant: Tenant | null;
  onTenantProfilePress?: (tenant: Tenant) => void;
}

const TenantDetailsModal: React.FC<TenantDetailsModalProps> = ({
  visible,
  onClose,
  tenant,
  onTenantProfilePress,
}) => {
  const [showDocumentsModal, setShowDocumentsModal] = useState(false);
  const [showShiftTenantModal, setShowShiftTenantModal] = useState(false);

  if (!tenant) return null;

  // Calculate rent and deposit (placeholder values since not in original data)
  const rent = "₹0";
  const deposit = "₹0";
  const dol = "04 Jul 2026"; // Date of Leaving (placeholder)

  const handleCall = () => {
    if (tenant.mobile) {
      Linking.openURL(`tel:${tenant.mobile}`);
    }
  };

  const handleWhatsApp = () => {
    if (tenant.mobile) {
      const phoneNumber = tenant.mobile.replace(/\+/g, '').replace(/\s/g, '');
      Linking.openURL(`whatsapp://send?phone=${phoneNumber}`);
    }
  };

  const handleViewProfile = () => {
    if (onTenantProfilePress) {
      onTenantProfilePress(tenant);
    }
    onClose();
  };

  const handleDeleteTenant = () => {
    console.log('Delete tenant:', tenant.id);
    onClose();
  };

  const handleChangeRoom = () => {
    console.log('Change room for tenant:', tenant.id);
    setShowShiftTenantModal(true);
  };

  const handleChangeProperty = () => {
    console.log('documents', tenant.id);
    setShowDocumentsModal(true);
  };

  const handlePutOnNotice = () => {
    console.log('Put tenant on notice:', tenant.id);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Close Button */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <View style={styles.closeCircle}>
              <Text style={styles.closeX}>×</Text>
            </View>
          </TouchableOpacity>

          {/* Content Container */}
          <View style={styles.contentContainer}>
            {/* Profile Section */}
            <View style={styles.profileSection}>
              <View style={styles.profileImageContainer}>
                <Image
                  source={require('../../assets/pht.png')}
                  style={styles.profileImage}
                  resizeMode="cover"
                />
              </View>
              <Text style={styles.tenantName}>{tenant.name}</Text>
              <Text style={styles.roomNumber}>Room:
              <Text style={styles.roomNumberValue}>{tenant.room}</Text>
              </Text>
            </View>

            {/* Details Section */}
            <View style={styles.detailsSection}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>
                  Rent : <Text style={styles.detailValue}>{rent}/Monthly</Text>
                </Text>
                <Text style={styles.detailLabelRight}>
                  Deposit : <Text style={styles.detailValue}>{deposit}</Text>
                </Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>
                  DOJ : <Text style={styles.detailValue}>{tenant.joinedDate}</Text>
                </Text>
                <Text style={styles.detailLabelRight}>
                  DOL : <Text style={styles.detailValue}>{dol}</Text>
                </Text>
              </View>
            </View>

            {/* Quick Actions Section */}
            <View style={styles.quickActionsSection}>
              <Text style={styles.quickActionsTitle}>Quick Action :</Text>
              
              <View style={styles.actionButtonsContainer}>
                <View style={styles.actionButtonsRow}>
                  <TouchableOpacity 
                    style={[styles.actionButton, styles.deleteButton]}
                    onPress={handleDeleteTenant}
                  >
                    <Text style={styles.actionButtonText}>Delete Tenant</Text>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={handleChangeRoom}
                  >
                    <Text style={styles.actionButtonText}>Change Room</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.actionButtonsRow}>
                  <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={handleChangeProperty}
                  >
                    <Text style={styles.actionButtonText}>Documents</Text>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={handlePutOnNotice}
                  >
                    <Text style={styles.actionButtonText}>Put on Notice</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Bottom Actions - All in one row */}
            <View style={styles.bottomActions}>
              <TouchableOpacity 
                style={styles.viewProfileButton}
                onPress={handleViewProfile}
              >
                <Text style={styles.viewProfileText}>View Profile</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.callButton}
                onPress={handleCall}
              >
                <Image
                  source={require('../../assets/call.png')}
                  style={styles.contactIcon}
                />
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.whatsappButton}
                onPress={handleWhatsApp}
              >
                <Image
                  source={require('../../assets/whatsApp.png')}
                  style={styles.contactIcon}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Documents Modal */}
        <DocumentsModal
          visible={showDocumentsModal}
          onClose={() => setShowDocumentsModal(false)}
          tenantName={tenant.name}
        />

        {/* Shift Tenant Modal */}
        <ShiftTenantModal
          visible={showShiftTenantModal}
          onClose={() => setShowShiftTenantModal(false)}
          onSelectNewProperty={() => {
            setShowShiftTenantModal(false);
            console.log('Select new property for:', tenant.name);
          }}
          onSelectNewRoom={() => {
            setShowShiftTenantModal(false);
            console.log('Select new room for:', tenant.name);
          }}
          tenantData={{
            name: tenant.name,
            room: tenant.room,
            property: 'Current Property', // You can replace this with actual property data
            profileImage: tenant.profileImage,
          }}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: Math.max(20, screenWidth * 0.05),
    borderTopRightRadius: Math.max(20, screenWidth * 0.05),
    padding: Math.max(20, screenWidth * 0.05),
    paddingBottom: Math.max(40, screenHeight * 0.05),
    minHeight: Math.max(420, screenHeight * 0.5),
    maxHeight: screenHeight * 0.85,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 10,
  },
  closeButton: {
    alignSelf: 'center',
    marginBottom: Math.max(20, screenHeight * 0.025),
  },
  closeCircle: {
    width: Math.max(36, screenWidth * 0.09),
    height: Math.max(36, screenWidth * 0.09),
    borderRadius: Math.max(18, screenWidth * 0.045),
    borderWidth: 2,
    borderColor: '#FED232',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  closeX: {
    fontSize: Math.max(24, screenWidth * 0.06),
    color: '#FED232',
    fontWeight: 'bold',
  },
  contentContainer: {
    backgroundColor: '#fff',
    borderRadius: Math.max(12, screenWidth * 0.03),
    paddingHorizontal: Math.max(16, screenWidth * 0.04),
    paddingVertical: Math.max(16, screenHeight * 0.02),
    borderWidth: 1,
    borderColor: '#EAEAEA',
    marginBottom: Math.max(20, screenHeight * 0.025),
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: Math.max(20, screenHeight * 0.025),
  },
  profileImageContainer: {
    width: Math.max(80, screenWidth * 0.2),
    height: Math.max(80, screenWidth * 0.2),
    borderRadius: Math.max(40, screenWidth * 0.1),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Math.max(10, screenHeight * 0.012),
    overflow: 'hidden',
  },
  profileImage: {
    width: Math.max(80, screenWidth * 0.2),
    height: Math.max(80, screenWidth * 0.2),
    borderRadius: Math.max(40, screenWidth * 0.1),
  },
  tenantName: {
    fontSize: Math.max(16, Math.min(22, screenWidth * 0.05)),
    fontWeight: '600',
    color: '#000000',
    fontFamily: 'Montserrat-SemiBold',
    marginBottom: Math.max(4, screenHeight * 0.005),
    textAlign: 'center',
  },
  roomNumber: {
    fontSize: Math.max(14, Math.min(18, screenWidth * 0.04)),
    color: '#353333',
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center',
    fontWeight: '400',
    
  },
  roomNumberValue: {
    fontSize: Math.max(14, Math.min(18, screenWidth * 0.04)),
    color: '#EF1D1D',
    fontFamily: 'Montserrat-Regular',
    fontWeight: '400',
    textAlign: 'center',
  },
  detailsSection: {
    marginBottom: Math.max(20, screenHeight * 0.025),
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Math.max(8, screenHeight * 0.01),
    paddingHorizontal: Math.max(4, screenWidth * 0.01),
  },
  detailLabel: {
    flex: 1,
    fontSize: Math.max(12, Math.min(16, screenWidth * 0.035)),
    color: '#000000',
    fontFamily: 'Montserrat-Regular',
  },
  detailLabelRight: {
    flex: 1,
    fontSize: Math.max(12, Math.min(16, screenWidth * 0.035)),
    color: '#000000',
    fontFamily: 'Montserrat-Regular',
    textAlign: 'right',
  },
  detailValue: {
    fontWeight: '600',
    color: '#000000',
    fontFamily: 'Montserrat-SemiBold',
  },
  quickActionsSection: {
    marginBottom: Math.max(20, screenHeight * 0.025),
  },
  quickActionsTitle: {
    fontSize: Math.max(14, Math.min(18, screenWidth * 0.04)),
    fontWeight: '600',
    color: '#000000',
    fontFamily: 'Montserrat-SemiBold',
    marginBottom: Math.max(12, screenHeight * 0.015),
  },
  actionButtonsContainer: {
    gap: Math.max(8, screenHeight * 0.01),
  },
  actionButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Math.max(8, screenWidth * 0.02),
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#FFDEDE',
    borderRadius: Math.max(6, screenWidth * 0.015),
    paddingVertical: Math.max(10, screenHeight * 0.012),
    paddingHorizontal: Math.max(8, screenWidth * 0.02),
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: Math.max(35, screenHeight * 0.04),
    borderColor: '#FF0000',
    borderWidth: 0.7
  },
  deleteButton: {
    backgroundColor: '#FFE5E5',
  },
  actionButtonText: {
    fontSize: Math.max(10, Math.min(14, screenWidth * 0.03)),
    fontWeight: '500',
    color: '#000000',
    fontFamily: 'Montserrat-Medium',
    textAlign: 'center',
    lineHeight: Math.max(12, screenHeight * 0.015),
  },
  bottomActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Math.max(12, screenWidth * 0.03),
    paddingTop: Math.max(8, screenHeight * 0.01),
  },
  viewProfileButton: {
    flex: 1,
    backgroundColor: '#FFF4B8',
    borderRadius: Math.max(6, screenWidth * 0.015),
    paddingVertical: Math.max(12, screenHeight * 0.015),
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: Math.max(40, screenHeight * 0.05),
    borderColor: '#C09700',
    borderWidth: 0.7
  },
  viewProfileText: {
    fontSize: Math.max(14, Math.min(18, screenWidth * 0.04)),
    fontWeight: '600',
    color: '#000000',
    fontFamily: 'Montserrat-SemiBold',
  },
  callButton: {
    width: Math.max(45, screenWidth * 0.11),
    height: Math.max(45, screenWidth * 0.11),
    borderRadius: Math.max(22.5, screenWidth * 0.055),
    backgroundColor: '#FFFFFF',
    borderWidth: 0.7,
    borderColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  whatsappButton: {
    width: Math.max(45, screenWidth * 0.11),
    height: Math.max(45, screenWidth * 0.11),
    borderRadius: Math.max(22.5, screenWidth * 0.055),
    backgroundColor: '#25D366',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactIcon: {
    width: Math.max(20, screenWidth * 0.05),
    height: Math.max(20, screenWidth * 0.05),
    resizeMode: 'contain',
  },
});

export default TenantDetailsModal;