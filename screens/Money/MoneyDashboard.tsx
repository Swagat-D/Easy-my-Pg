import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import Navbar from '../common/Navbar';
import BottomTabNavigator from '../common/Tab';
import MoneyNav from './MoneyNav';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface MoneyDashboardProps {
  userName?: string;
  propertyName?: string;
  onTabPress?: (tabId: string) => void;
  onHomePress?: () => void;
  onSectionPress?: (section: string) => void;
  activeTab?: string;
  currentMoneySection?: string; // Add current section prop
}

export default function MoneyDashboard({
  userName = 'Gyana',
  propertyName = 'Kalyani Nagar',
  onTabPress,
  onHomePress,
  onSectionPress,
  activeTab = 'money',
  currentMoneySection = 'dashboard' // Default to dashboard
}: MoneyDashboardProps) {
  const [activeSection, setActiveSection] = useState(currentMoneySection);

  const handleProfilePress = () => {
    console.log('Profile pressed');
  };

  const handleSupportPress = () => {
    console.log('Support pressed');
  };

  const handleAddPress = () => {
    console.log('Add button pressed');
  };

  const handleTabPress = (tabId: string) => {
    if (onTabPress) {
      onTabPress(tabId);
    }
  };

  const handleHomePress = () => {
    if (onHomePress) {
      onHomePress();
    }
  };

  const handleSectionPress = (section: string) => {
    setActiveSection(section);
    console.log('Money section selected:', section);
    if (onSectionPress) {
      onSectionPress(section);
    }
    // For now, this will just update the active state
    // Later we can implement navigation to different screens
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Navbar */}
      <Navbar
        userName={userName}
        propertyName={propertyName}
        onProfilePress={handleProfilePress}
        onSupportPress={handleSupportPress}
        onAddPropertyPress={() => {
          if (onTabPress) {
            onTabPress('addProperty');
          }
        }}
      />

      {/* Money Navigation */}
      <MoneyNav
        activeSection={activeSection}
        onSectionPress={handleSectionPress}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Dashboard Content - Based on your provided screenshot */}
        <View style={styles.dashboardContent}>
          
          {/* Stats Cards Row */}
          <View style={styles.statsRow}>
            {/* All Dues Card */}
            <View style={styles.allDuesCard}>
              <Text style={styles.cardAmount}>₹8,99,450</Text>
              <Text style={styles.cardLabel}>All Dues</Text>
              <Text style={styles.cardCurrency}>₹</Text>
            </View>
            
            {/* Current Dues Card */}
            <View style={styles.currentDuesCard}>
              <Text style={styles.cardAmountRed}>₹6,99,670</Text>
              <Text style={styles.cardLabelSecondary}>Current Dues</Text>
            </View>
            
            {/* Advance Dues Card */}
            <View style={styles.advanceDuesCard}>
              <Text style={styles.cardAmountRed}>₹2</Text>
              <Text style={styles.cardLabelSecondary}>Advance Dues</Text>
            </View>
          </View>

          {/* Property Section */}
          <View style={styles.propertySection}>
            <View style={styles.propertyHeader}>
              <View style={styles.propertyInfo}>
                <Image
                  source={require('../../assets/building.png')}
                  style={styles.buildingIcon}
                  resizeMode="contain"
                />
                <View>
                  <Text style={styles.propertyName}>Kalyani Nagar</Text>
                  <Text style={styles.propertyId}>7561147998A</Text>
                </View>
              </View>
              <View style={styles.currentBadge}>
                <Text style={styles.currentBadgeText}>Current</Text>
              </View>
            </View>

            {/* Stats List */}
            <View style={styles.statsList}>
              <View style={styles.statsItem}>
                <Text style={styles.statsLabel}>Unpaid Dues</Text>
                <View style={styles.statsValue}>
                  <Text style={styles.statsAmountRed}>₹7,37,586</Text>
                  <View style={styles.tenantCount}>
                    <Image
                      source={require('../../assets/icons/user-plus.png')}
                      style={styles.userIcon}
                      resizeMode="contain"
                    />
                    <Text style={styles.tenantCountText}>4</Text>
                  </View>
                </View>
              </View>

              <View style={styles.statsItem}>
                <Text style={styles.statsLabel}>Today's Collection</Text>
                <View style={styles.statsValue}>
                  <Text style={styles.statsAmountGreen}>₹10,000</Text>
                  <View style={styles.tenantCount}>
                    <Image
                      source={require('../../assets/icons/user-plus.png')}
                      style={styles.userIcon}
                      resizeMode="contain"
                    />
                    <Text style={styles.tenantCountText}>2</Text>
                  </View>
                </View>
              </View>

              <View style={styles.statsItem}>
                <Text style={styles.statsLabel}>August' Collection</Text>
                <View style={styles.statsValue}>
                  <Text style={styles.statsAmountGreen}>₹47,000</Text>
                  <View style={styles.tenantCount}>
                    <Image
                      source={require('../../assets/icons/user-plus.png')}
                      style={styles.userIcon}
                      resizeMode="contain"
                    />
                    <Text style={styles.tenantCountText}>4</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.reportButton}>
                <Image
                  source={require('../../assets/icons/arrow-right.png')}
                  style={styles.downloadIcon}
                  resizeMode="contain"
                />
                <Text style={styles.reportButtonText}>Dues Report</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.reportButton}>
                <Image
                  source={require('../../assets/icons/arrow-right.png')}
                  style={styles.downloadIcon}
                  resizeMode="contain"
                />
                <Text style={styles.reportButtonText}>Collection Report</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Additional Property Section */}
          <View style={styles.propertySection}>
            <View style={styles.propertyHeader}>
              <View style={styles.propertyInfo}>
                <Image
                  source={require('../../assets/building.png')}
                  style={styles.buildingIcon}
                  resizeMode="contain"
                />
                <View>
                  <Text style={styles.propertyName}>Maruti Vihar</Text>
                  <Text style={styles.propertyId}>7561147999A</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Spacer for content */}
        <View style={styles.contentSpacer} />
      </ScrollView>

      {/* Bottom Tab Navigator */}
      <BottomTabNavigator
        activeTab={activeTab}
        onTabPress={handleTabPress}
        onAddPress={handleAddPress}
        onHomePress={handleHomePress}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  content: {
    flex: 1,
    top: screenHeight * 0.005, // Reduced top margin since MoneyNav now has margin bottom
  },
  dashboardContent: {
    paddingHorizontal: screenWidth * 0.04,
    paddingTop: screenHeight * 0.02,
  },
  statsRow: {
    flexDirection: 'row',
    marginBottom: screenHeight * 0.02,
    gap: screenWidth * 0.03,
  },
  allDuesCard: {
    flex: 1.2,
    backgroundColor: '#242424',
    borderRadius: 16,
    padding: screenWidth * 0.04,
    minHeight: screenHeight * 0.12,
    justifyContent: 'center',
    position: 'relative',
  },
  currentDuesCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: screenWidth * 0.04,
    minHeight: screenHeight * 0.12,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  advanceDuesCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: screenWidth * 0.04,
    minHeight: screenHeight * 0.12,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  cardAmount: {
    fontSize: screenWidth * 0.045,
    fontWeight: '700',
    color: '#FFD600',
    fontFamily: 'Inter-Bold',
    marginBottom: screenHeight * 0.005,
  },
  cardAmountRed: {
    fontSize: screenWidth * 0.045,
    fontWeight: '700',
    color: '#FF4444',
    fontFamily: 'Inter-Bold',
    marginBottom: screenHeight * 0.005,
  },
  cardLabel: {
    fontSize: screenWidth * 0.032,
    fontWeight: '500',
    color: '#FFFFFF',
    fontFamily: 'Roboto-Medium',
  },
  cardLabelSecondary: {
    fontSize: screenWidth * 0.032,
    fontWeight: '500',
    color: '#666666',
    fontFamily: 'Roboto-Medium',
  },
  cardCurrency: {
    position: 'absolute',
    right: screenWidth * 0.04,
    top: screenHeight * 0.02,
    fontSize: screenWidth * 0.08,
    fontWeight: '700',
    color: '#FFFFFF',
    opacity: 0.3,
    fontFamily: 'Inter-Bold',
  },
  propertySection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: screenWidth * 0.04,
    marginBottom: screenHeight * 0.02,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  propertyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: screenHeight * 0.02,
  },
  propertyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buildingIcon: {
    width: screenWidth * 0.1,
    height: screenWidth * 0.1,
    marginRight: screenWidth * 0.03,
  },
  propertyName: {
    fontSize: screenWidth * 0.04,
    fontWeight: '600',
    color: '#1A1A1A',
    fontFamily: 'Roboto-Medium',
    marginBottom: screenHeight * 0.003,
  },
  propertyId: {
    fontSize: screenWidth * 0.03,
    color: '#666666',
    fontFamily: 'Roboto-Regular',
  },
  currentBadge: {
    backgroundColor: '#FFD600',
    paddingHorizontal: screenWidth * 0.03,
    paddingVertical: screenHeight * 0.008,
    borderRadius: 12,
  },
  currentBadgeText: {
    fontSize: screenWidth * 0.028,
    fontWeight: '600',
    color: '#000000',
    fontFamily: 'Roboto-Medium',
  },
  statsList: {
    marginBottom: screenHeight * 0.02,
  },
  statsItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: screenHeight * 0.015,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  statsLabel: {
    fontSize: screenWidth * 0.035,
    fontWeight: '500',
    color: '#1A1A1A',
    fontFamily: 'Roboto-Medium',
  },
  statsValue: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statsAmountRed: {
    fontSize: screenWidth * 0.035,
    fontWeight: '600',
    color: '#FF4444',
    fontFamily: 'Roboto-Medium',
    marginRight: screenWidth * 0.02,
  },
  statsAmountGreen: {
    fontSize: screenWidth * 0.035,
    fontWeight: '600',
    color: '#4CAF50',
    fontFamily: 'Roboto-Medium',
    marginRight: screenWidth * 0.02,
  },
  tenantCount: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    paddingHorizontal: screenWidth * 0.02,
    paddingVertical: screenHeight * 0.005,
    borderRadius: 12,
  },
  userIcon: {
    width: screenWidth * 0.03,
    height: screenWidth * 0.03,
    marginRight: screenWidth * 0.01,
    tintColor: '#666666',
  },
  tenantCountText: {
    fontSize: screenWidth * 0.028,
    fontWeight: '500',
    color: '#666666',
    fontFamily: 'Roboto-Medium',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: screenWidth * 0.03,
  },
  reportButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    paddingVertical: screenHeight * 0.012,
    paddingHorizontal: screenWidth * 0.03,
  },
  downloadIcon: {
    width: screenWidth * 0.04,
    height: screenWidth * 0.04,
    marginRight: screenWidth * 0.02,
    tintColor: '#666666',
  },
  reportButtonText: {
    fontSize: screenWidth * 0.032,
    fontWeight: '500',
    color: '#666666',
    fontFamily: 'Roboto-Medium',
  },
  contentSpacer: {
    height: screenHeight * 0.1,
  },
});