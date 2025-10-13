import React, { useState } from 'react';
import TenantVerificationModal, { VerificationStatus } from './common/TenantVerificationModal';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Dimensions,
  Image,
  Linking,
  Modal
} from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface ProfileDetailsScreenProps {
  onBackPress?: () => void;
  tenantData?: {
    name: string;
    room: string;
    rent: string;
    deposit: string;
    doj: string;
    dol: string;
    profileImage?: string;
  };
}

export default function ProfileDetailsScreen({ 
  onBackPress,
  tenantData = {
    name: 'Soumya',
    room: '102',
    rent: '₹0',
    deposit: '₹0',
    doj: '04 Oct 2025',
    dol: '04 Jul 2026',
  }
}: ProfileDetailsScreenProps) {
  const [verificationStatus, setVerificationStatus] = useState({
    verification: true,
    documents: false,
    rentalDetails: false,
  });

  // Modal verification status - matches the modal interface
  const [modalVerificationStatus, setModalVerificationStatus] = useState<VerificationStatus>({
    rentingDetails: true,
    idVerification: false,
    rentalAgreement: false,
  });

  const [onboardingStatus, setOnboardingStatus] = useState({
    tenantInvited: true,
    appDownloaded: false,
    idVerification: false,
    policeVerification: false,
  });

  const [isVerificationModalVisible, setIsVerificationModalVisible] = useState(false);

  const handleRentBook = () => {
    console.log('Rent Book pressed');
  };

  const handleEditProfile = () => {
    console.log('Edit Profile pressed');
  };

  const handleShiftTenant = () => {
    console.log('Shift Tenant pressed');
  };

  const handleRemoveTenant = () => {
    console.log('Remove Tenant pressed');
  };

  const handleWhatsApp = () => {
    console.log('WhatsApp pressed');
    // Open WhatsApp with tenant's number
    // Linking.openURL(`whatsapp://send?phone=${tenantPhone}`);
  };

  const handleCallTenant = () => {
    console.log('Call Tenant pressed');
    // Make a phone call to tenant
    // Linking.openURL(`tel:${tenantPhone}`);
  };

  const renderStatusIcon = (status: boolean) => {
    return (
      <View style={[styles.statusIcon, status ? styles.statusIconGreen : styles.statusIconRed]}>
        {status ? (
          <Text style={styles.checkMark}>✓</Text>
        ) : (
          <Text style={styles.crossMark}>✗</Text>
        )}
      </View>
    );
  };

  const renderCircularIcon = (iconType: 'verification' | 'documents' | 'rental', isActive: boolean) => {
    const getIconColor = () => {
      if (iconType === 'verification') return '#4CAF50';
      if (iconType === 'documents') return '#FFC107';
      if (iconType === 'rental') return '#FF9800';
      return '#4CAF50';
    };

    const getIconText = () => {
      if (iconType === 'verification') return '✓';
      if (iconType === 'documents') return '📄';
      if (iconType === 'rental') return '₹';
      return '✓';
    };

    return (
      <View style={[styles.circularIcon, { backgroundColor: getIconColor() }]}>
        <Text style={styles.circularIconText}>{getIconText()}</Text>
      </View>
    );
  };

  const handleOpenVerificationModal = () => {
    setIsVerificationModalVisible(true);
  };

  const handleCloseVerificationModal = () => {
    setIsVerificationModalVisible(false);
  };

  const handleRemindTenant = () => {
    // Add your logic for reminding tenant
    setIsVerificationModalVisible(false);
  };

  const handleVerifyID = () => {
    // Add your logic for verifying ID
    setModalVerificationStatus(prev => ({
      ...prev,
      idVerification: true
    }));
    console.log('ID Verification completed');
  };

  const handleVerifyAgreement = () => {
    // Add your logic for verifying rental agreement
    setModalVerificationStatus(prev => ({
      ...prev,
      rentalAgreement: true
    }));
    console.log('Rental Agreement verification completed');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#FED232" barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
          <Image
            source={require('../assets/icons/arrow-right.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile Details</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.profileInfo}>
            <View style={styles.profileImageContainer}>
              <Image
                source={require('../assets/profile.png')}
                style={styles.profileImage}
                resizeMode="cover"
              />
            </View>
            <View style={styles.profileTextContainer}>
              <Text style={styles.tenantName}>{tenantData.name}</Text>
              <Text style={styles.roomNumber}>Room: {tenantData.room}</Text>
            </View>
          </View>

          {/* Action Buttons Row */}
          <View style={styles.actionButtonsRow}>
            <TouchableOpacity style={styles.rentBookButton} onPress={handleRentBook}>
              <Image
                source={require('../assets/icons/briefcase.png')}
                style={styles.buttonIcon}
              />
              <Text style={styles.rentBookText}>Rent Book</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.editProfileButton} onPress={handleEditProfile}>
              <Image
                source={require('../assets/Edit.png')}
                style={styles.buttonIcon}
              />
              <Text style={styles.editProfileText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Details Section */}
        <View style={styles.detailsSection}>
          <View style={styles.detailsRow}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Rent : <Text style={styles.detailValue}>{tenantData.rent}/Monthly</Text></Text>
            </View>
            <View style={styles.detailItema}>
              <Text style={styles.detailLabel}>Deposit : <Text style={styles.detailValue}>{tenantData.deposit}</Text></Text>
            </View>
          </View>

          <View style={styles.detailsRow}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>DOJ : <Text style={styles.detailValue}>{tenantData.doj}</Text></Text>
            </View>
            <View style={styles.detailItema}>
              <Text style={styles.detailLabel}>DOL : <Text style={styles.detailValue}>{tenantData.dol}</Text></Text>
            </View>
          </View>
        </View>

        {/* Status Icons Section */}
        <View style={styles.statusSection}>
          <TouchableOpacity onPress={handleOpenVerificationModal}
             style={styles.statusItem}>
            <View>
              <Image
                source={require('../assets/check.png')}
                style={styles.checkIcon}
              />
            </View>
            <Text style={styles.statusLabel}>Verification</Text>
          </TouchableOpacity>
          <View style={styles.statusItem}>
            <Image
                source={require('../assets/Documents.png')}
                style={styles.DocumentIcon}
              />
            <Text style={styles.DocumentsLabel}>Documents</Text>
          </View>
          <View style={styles.statusItem}>
            <Image
                source={require('../assets/details.png')}
                style={styles.detailsIcon}
              />
            <Text style={styles.statusLabel}>Rental Details</Text>
          </View>
        </View>

        {/* Tenant Onboarding Flow */}
        <View style={styles.onboardingSection}>
          <Text style={styles.onboardingTitle}>Tenant Onboarding Flow</Text>
          
          <View style={styles.onboardingItem}>
            {renderStatusIcon(onboardingStatus.tenantInvited)}
            <Text style={styles.onboardingText}>Tenant Invited</Text>
          </View>

          <View style={styles.onboardingItem}>
            {renderStatusIcon(onboardingStatus.appDownloaded)}
            <Text style={styles.onboardingText}>App downloaded</Text>
          </View>

          <View style={styles.onboardingItem}>
            {renderStatusIcon(onboardingStatus.idVerification)}
            <Text style={styles.onboardingText}>ID Verification</Text>
          </View>

          <View style={styles.onboardingItem}>
            {renderStatusIcon(onboardingStatus.policeVerification)}
            <Text style={styles.onboardingText}>Police Verification</Text>
          </View>
        </View>

        {/* Bottom Action Buttons */}
        <View style={styles.bottomActions}>
          <View style={styles.bottomActionsRow}>
            <TouchableOpacity style={styles.shiftButton} onPress={handleShiftTenant}>
              <Text style={styles.shiftButtonText}>Shift Tenant</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.removeButton} onPress={handleRemoveTenant}>
              <Text style={styles.removeButtonText}>Remove Tenants</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.contactButtonsRow}>
            <TouchableOpacity style={styles.whatsappButton} onPress={handleWhatsApp}>
              <Image
                source={require('../assets/whatsApp.png')}
                style={styles.whatsappButtonIcon}
              />
              <Text style={styles.whatsappButtonText}>WhatsApp</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.callButton} onPress={handleCallTenant}>
              <Image
                source={require('../assets/call.png')}
                style={styles.contactIcon}
              />
              <Text style={styles.callButtonText}>Call Tenants</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <TenantVerificationModal
        visible={isVerificationModalVisible}
        onClose={handleCloseVerificationModal}
        onRemindTenant={handleRemindTenant}
        onVerifyID={handleVerifyID}
        onVerifyAgreement={handleVerifyAgreement}
        verificationStatus={modalVerificationStatus}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    width: '100%',
    height: Math.max(88, screenHeight * 0.11),
    backgroundColor: '#FED232',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Math.max(15, screenWidth * 0.04),
    paddingTop: Math.max(20, screenHeight * 0.04),
    minHeight: 80,
  },
  backButton: {
    width: Math.max(40, screenWidth * 0.1),
    height: Math.max(40, screenHeight * 0.05),
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  backIcon: {
    width: Math.max(20, screenWidth * 0.055),
    height: Math.max(15, screenHeight * 0.025),
    transform: [{ rotate: '180deg' }],
    tintColor: '#000',
  },
  headerTitle: {
    flex: 1,
    fontSize: Math.max(16, Math.min(22, screenWidth * 0.045)),
    fontWeight: '600',
    color: '#171A1F',
    textAlign: 'center',
    marginRight: Math.max(40, screenWidth * 0.1),
    fontFamily: 'Montserrat-SemiBold',
  },
  content: {
    flex: 1,
    paddingHorizontal: Math.max(15, screenWidth * 0.04),
    paddingTop: screenHeight * 0.01,
  },
  profileSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: Math.max(12, screenWidth * 0.03),
    padding: Math.max(15, screenWidth * 0.04),
    marginBottom: Math.max(8, screenHeight * 0.01),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Math.max(12, screenHeight * 0.015),
  },
  profileImageContainer: {
    width: Math.max(60, screenWidth * 0.15),
    height: Math.max(60, screenWidth * 0.15),
    borderRadius: Math.max(30, screenWidth * 0.075),
    overflow: 'hidden',
    marginRight: Math.max(15, screenWidth * 0.04),
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  profileTextContainer: {
    flex: 1,
  },
  tenantName: {
    fontSize: Math.max(18, Math.min(24, screenWidth * 0.04)),
    fontWeight: '600',
    color: '#171A1F',
    fontFamily: 'Montserrat-SemiBold',
    marginBottom: Math.max(4, screenHeight * 0.005),
  },
  roomNumber: {
    fontSize: Math.max(14, Math.min(18, screenWidth * 0.04)),
    color: '#C09700',
    fontFamily: 'Montserrat-Regular',
  },
  actionButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Math.max(10, screenWidth * 0.025),
  },
  rentBookButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF4B8',
    borderWidth: 1.5,
    borderColor: '#333',
    borderRadius: Math.max(8, screenWidth * 0.02),
    paddingVertical: Math.max(12, screenHeight * 0.015),
    paddingHorizontal: Math.max(15, screenWidth * 0.04),
    height: Math.max(40, screenHeight * 0.05),
  },
  editProfileButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF4B8',
    borderWidth: 1.5,
    borderColor: '#333',
    borderRadius: Math.max(8, screenWidth * 0.02),
    paddingVertical: Math.max(12, screenHeight * 0.015),
    paddingHorizontal: Math.max(15, screenWidth * 0.04),
    height: Math.max(40, screenHeight * 0.05),
  },
  buttonIcon: {
    width: Math.max(16, screenWidth * 0.04),
    height: Math.max(16, screenWidth * 0.04),
    marginRight: Math.max(8, screenWidth * 0.02),
    tintColor: '#333',
  },
  rentBookText: {
    fontSize: Math.max(14, Math.min(16, screenWidth * 0.035)),
    fontWeight: '500',
    color: '#333',
    fontFamily: 'Montserrat-Medium',
  },
  editProfileText: {
    fontSize: Math.max(14, Math.min(16, screenWidth * 0.035)),
    fontWeight: '500',
    color: '#333',
    fontFamily: 'Montserrat-Medium',
  },
  detailsSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: Math.max(12, screenWidth * 0.03),
    padding: Math.max(15, screenWidth * 0.04),
    paddingBottom: -(Math.max(15, screenHeight * 0.02)),
    paddingLeft: Math.max(20, screenWidth * 0.025),
    marginBottom: Math.max(8, screenHeight * 0.01),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Math.max(15, screenHeight * 0.015),
  },
  detailItem: {
    flex: 1,
  },
  detailItema: {
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: Math.max(12, screenWidth * 0.015),
  },
  detailLabel: {
    fontSize: Math.max(14, Math.min(16, screenWidth * 0.035)),
    color: '#333',
    fontFamily: 'Montserrat-Regular',
  },
  detailValue: {
    fontWeight: '600',
    color: '#000',
    fontFamily: 'Montserrat-SemiBold',
  },
  checkIcon: {
    width: Math.max(40, screenWidth * 0.045),
    height: Math.max(40, screenWidth * 0.045),
  },
  DocumentIcon: {
    width: Math.max(36, screenWidth * 0.045),
    height: Math.max(36, screenWidth * 0.045),
  },
  detailsIcon:{
    width: Math.max(40, screenWidth * 0.045),
    height: Math.max(40, screenWidth * 0.045),
  },
  statusSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: Math.max(12, screenWidth * 0.03),
    padding: Math.max(15, screenWidth * 0.04),
    marginBottom: Math.max(8, screenHeight * 0.01),
    flexDirection: 'row',
    justifyContent: 'space-around',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
  },
  statusItem: {
    alignItems: 'center',
    flex: 1,
  },
  circularIcon: {
    width: Math.max(50, screenWidth * 0.12),
    height: Math.max(50, screenWidth * 0.12),
    borderRadius: Math.max(25, screenWidth * 0.06),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Math.max(8, screenHeight * 0.01),
  },
  circularIconText: {
    fontSize: Math.max(20, screenWidth * 0.05),
    color: '#FFF',
    fontWeight: 'bold',
  },
  statusLabel: {
    marginTop: Math.max(4, screenHeight*0.005),
    fontSize: Math.max(12, Math.min(14, screenWidth * 0.03)),
    color: '#333',
    textAlign: 'center',
    fontFamily: 'Montserrat-Regular',
  },
  DocumentsLabel: {
    marginTop: Math.max(4, screenHeight*0.005),
    fontSize: Math.max(12, Math.min(14, screenWidth * 0.03)),
    color: '#333',
    textAlign: 'center',
    fontFamily: 'Montserrat-Regular',
    paddingTop: Math.max(4, screenWidth * 0.005)
  },
  onboardingSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: Math.max(12, screenWidth * 0.03),
    padding: Math.max(15, screenWidth * 0.04),
    marginBottom: Math.max(8, screenHeight * 0.01),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
  },
  onboardingTitle: {
    fontSize: Math.max(16, Math.min(18, screenWidth * 0.045)),
    fontWeight: '600',
    color: '#000',
    fontFamily: 'Montserrat-SemiBold',
    marginBottom: Math.max(15, screenHeight * 0.02),
  },
  onboardingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Math.max(12, screenHeight * 0.015),
    paddingLeft: Math.max(20, screenWidth * 0.025),
  },
  statusIcon: {
    width: Math.max(8, screenWidth * 0.05),
    height: Math.max(8, screenWidth * 0.05),
    borderRadius: Math.max(12, screenWidth * 0.03),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Math.max(12, screenWidth * 0.03),
  },
  statusIconGreen: {
    backgroundColor: '#4CAF50',
  },
  statusIconRed: {
    backgroundColor: '#F44336',
  },
  checkMark: {
    color: '#FFF',
    fontSize: Math.max(16, screenWidth * 0.04),
    fontWeight: 'bold',
  },
  crossMark: {
    color: '#FFF',
    fontSize: Math.max(16, screenWidth * 0.04),
    fontWeight: 'bold',
  },
  onboardingText: {
    fontSize: Math.max(14, Math.min(16, screenWidth * 0.035)),
    color: '#333',
    fontFamily: 'Montserrat-Regular',
  },
  bottomActions: {
    marginBottom: Math.max(30, screenHeight * 0.04),
  },
  bottomActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Math.max(40, screenWidth * 0.08),
    marginBottom: Math.max(15, screenHeight * 0.02),
    backgroundColor: '#FFFFFF',
    borderRadius: Math.max(12, screenWidth * 0.03),
    padding: Math.max(8, screenWidth * 0.01),
    paddingHorizontal: Math.max(30, screenWidth * 0.035),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
  },
  shiftButton: {
    flex: 1,
    backgroundColor: '#E8F5E8',
    borderRadius: Math.max(8, screenWidth * 0.02),
    paddingVertical: Math.max(8, screenHeight * 0.01),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#25D366',
  },
  removeButton: {
    flex: 1,
    backgroundColor: '#FFEBEE',
    borderRadius: Math.max(8, screenWidth * 0.02),
    paddingVertical: Math.max(8, screenHeight * 0.01),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#EF1D1D',
  },
  shiftButtonText: {
    fontSize: Math.max(12, Math.min(14, screenWidth * 0.01)),
    fontWeight: '500',
    color: '#4CAF50',
    fontFamily: 'Montserrat-Medium',
  },
  removeButtonText: {
    fontSize: Math.max(12, Math.min(14, screenWidth * 0.01)),
    fontWeight: '500',
    color: '#F44336',
    fontFamily: 'Montserrat-Medium',
  },
  contactButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Math.max(10, screenWidth * 0.025),
  },
  whatsappButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8F5E8',
    borderRadius: Math.max(8, screenWidth * 0.02),
    paddingVertical: Math.max(12, screenHeight * 0.015),
    paddingHorizontal: Math.max(15, screenWidth * 0.04),
    borderWidth: 1,
    borderColor: '#25D366',
  },
  callButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFEBEE',
    borderRadius: Math.max(8, screenWidth * 0.02),
    paddingVertical: Math.max(12, screenHeight * 0.015),
    paddingHorizontal: Math.max(15, screenWidth * 0.04),
    borderWidth: 1,
    borderColor: '#EF1D1D',
  },
  contactIcon: {
    width: Math.max(24, screenWidth * 0.03),
    height: Math.max(20, screenWidth * 0.05),
    marginRight: Math.max(8, screenWidth * 0.02),
    tintColor: '#EF1D1D',
  },
  whatsappButtonIcon: {
    width: Math.max(28, screenWidth * 0.05),
    height: Math.max(20, screenWidth * 0.05),
    marginRight: Math.max(8, screenWidth * 0.02),
  },
  whatsappButtonText: {
    fontSize: Math.max(16, Math.min(18, screenWidth * 0.035)),
    fontWeight: '500',
    color: '#000000',
    fontFamily: 'Montserrat-Medium',
  },
  callButtonText: {
    fontSize: Math.max(16, Math.min(18, screenWidth * 0.035)),
    fontWeight: '500',
    color: '#000000',
    fontFamily: 'Montserrat-Medium',
  },
});