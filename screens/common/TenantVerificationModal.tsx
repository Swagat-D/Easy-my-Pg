import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Dimensions } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export interface VerificationStatus {
  rentingDetails: boolean;
  idVerification: boolean;
  rentalAgreement: boolean;
}

interface TenantVerificationModalProps {
  visible: boolean;
  onClose: () => void;
  onRemindTenant: () => void;
  onVerifyID: () => void;
  onVerifyAgreement: () => void;
  verificationStatus?: VerificationStatus;
}

const TenantVerificationModal: React.FC<TenantVerificationModalProps> = ({
  visible,
  onClose,
  onRemindTenant,
  onVerifyID,
  onVerifyAgreement,
  verificationStatus = {
    rentingDetails: true,
    idVerification: false,
    rentalAgreement: false,
  },
}) => {
  const renderStatusOrButton = (isVerified: boolean, onPress: () => void, label: string) => {
    if (isVerified) {
      return <Text style={styles.approved}>✔ Approved</Text>;
    }
    return (
      <TouchableOpacity style={styles.verifyBtn} onPress={onPress}>
        <Text style={styles.verifyText}>Verify</Text>
      </TouchableOpacity>
    );
  };

  const handleVerify = (type: 'id' | 'agreement') => {
    if (type === 'id' && !verificationStatus.idVerification) {
      onVerifyID();
    } else if (type === 'agreement' && !verificationStatus.rentalAgreement) {
      onVerifyAgreement();
    }
  };
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <View style={styles.closeCircle}>
              <Text style={styles.closeX}>×</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.contentBox}>
            <Text style={styles.title}>Tenant Verification :</Text>
            <View style={styles.row}>
              <Text style={styles.label}>Renting Details</Text>
              {renderStatusOrButton(verificationStatus.rentingDetails, () => {}, 'Renting Details')}
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>ID Verification</Text>
              {renderStatusOrButton(verificationStatus.idVerification, () => handleVerify('id'), 'ID Verification')}
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Rental Agreement</Text>
              {renderStatusOrButton(verificationStatus.rentalAgreement, () => handleVerify('agreement'), 'Rental Agreement')}
            </View>
            <TouchableOpacity style={styles.remindBtn} onPress={onRemindTenant}>
              <Text style={styles.remindText}>🔔 Remind Tenant</Text>
            </TouchableOpacity>
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
    backgroundColor: 'transparent',
  },
  container: {
    backgroundColor: '#fff',
    borderTopLeftRadius: Math.max(20, screenWidth * 0.05),
    borderTopRightRadius: Math.max(20, screenWidth * 0.05),
    padding: Math.max(20, screenWidth * 0.05),
    minHeight: Math.max(350, screenHeight * 0.4),
    maxHeight: screenHeight * 0.8,
    paddingBottom: Math.max(160, screenHeight * 0.2),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 10,
  },
  closeBtn: {
    alignSelf: 'center',
    marginBottom: Math.max(10, screenHeight * 0.015),
  },
  closeCircle: {
    width: Math.max(36, screenWidth * 0.09),
    height: Math.max(36, screenWidth * 0.09),
    borderRadius: Math.max(18, screenWidth * 0.045),
    borderWidth: 2,
    borderColor: '#F7E9A0',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  closeX: {
    fontSize: Math.max(24, screenWidth * 0.06),
    color: '#F7E9A0',
    fontWeight: 'bold',
  },
  contentBox: {
    backgroundColor: '#fff',
    borderRadius: Math.max(12, screenWidth * 0.03),
    padding: Math.max(16, screenWidth * 0.04),
    borderWidth: 1,
    borderColor: '#EAEAEA',
  },
  title: {
    fontSize: Math.max(18, Math.min(24, screenWidth * 0.045)),
    fontWeight: 'bold',
    marginBottom: Math.max(16, screenHeight * 0.02),
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Math.max(12, screenHeight * 0.015),
  },
  label: {
    fontSize: Math.max(16, Math.min(18, screenWidth * 0.04)),
    color: '#333',
    flex: 1,
    marginRight: Math.max(10, screenWidth * 0.025),
  },
  approved: {
    color: '#4BB543',
    fontWeight: 'bold',
    fontSize: Math.max(15, Math.min(17, screenWidth * 0.038)),
  },
  verifyBtn: {
    backgroundColor: '#FFE5E5',
    borderRadius: Math.max(6, screenWidth * 0.015),
    paddingHorizontal: Math.max(18, screenWidth * 0.045),
    paddingVertical: Math.max(6, screenHeight * 0.008),
    borderWidth: 1,
    borderColor: '#FFB3B3',
    minWidth: Math.max(70, screenWidth * 0.18),
    alignItems: 'center',
  },
  verifyText: {
    color: '#FF4D4D',
    fontWeight: 'bold',
    fontSize: Math.max(15, Math.min(17, screenWidth * 0.038)),
  },
  remindBtn: {
    backgroundColor: '#FFF6D1',
    borderRadius: Math.max(6, screenWidth * 0.015),
    paddingVertical: Math.max(12, screenHeight * 0.015),
    marginTop: Math.max(18, screenHeight * 0.02),
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F7E9A0',
  },
  remindText: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: Math.max(16, Math.min(18, screenWidth * 0.04)),
  },
});

export default TenantVerificationModal;
