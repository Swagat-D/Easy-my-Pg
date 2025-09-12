import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView,
  Alert,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
  Dimensions
} from 'react-native';
import Navbar from './common/Navbar';
import BottomTabNavigator from './common/Tab';

const { width: screenWidth } = Dimensions.get('window');

interface DashboardScreenProps {
  userName?: string;
  propertyName?: string;
}

export default function DashboardScreen({ 
  userName = 'Gyana',
  propertyName = 'Kalyani Nagar'
}: DashboardScreenProps) {
  const [activeTab, setActiveTab] = useState('home');

  const handleTabPress = (tabId: string) => {
    setActiveTab(tabId);
    
    // Handle navigation based on tab
    switch (tabId) {
      case 'home':
        console.log('Navigate to Home');
        break;
      case 'money':
        console.log('Navigate to Money/Payments');
        break;
      case 'tenants':
        console.log('Navigate to Tenants');
        break;
      case 'property':
        console.log('Navigate to Property');
        break;
      default:
        break;
    }
  };

  const handleAddPress = () => {
    Alert.alert(
      'Quick Add',
      'What would you like to add?',
      [
        { text: 'Add Tenant', onPress: () => console.log('Add Tenant') },
        { text: 'Add Payment', onPress: () => console.log('Add Payment') },
        { text: 'Add Property', onPress: () => console.log('Add Property') },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const handleProfilePress = () => {
    console.log('Profile pressed');
  };

  const handleSupportPress = () => {
    console.log('Support pressed');
  };

  const handleLocationPress = () => {
    console.log('Location pressed');
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
      />
      
      {/* Main Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Dashboard Content Container */}
        <View style={styles.dashboardContent}>
          
          {/* August Summary Section */}
          <View style={styles.summarySection}>
            <View style={styles.summaryHeader}>
              <Text style={styles.summaryTitle}>August Summary</Text>
              <TouchableOpacity style={styles.allPropertyButton}>
                <Text style={styles.allPropertyText}>All Property</Text>
                <Image 
                  source={require('../assets/dropdown-arrow.png')} 
                  style={styles.summaryDropdown}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
            
            {/* Summary Cards */}
            <View style={styles.summaryCards}>
              <View style={styles.summaryCard}>
                <Text style={styles.cardAmount}>₹8,99,450</Text>
                <Text style={styles.cardLabel}>Today Collection</Text>
              </View>
              <View style={styles.summaryCardGreen}>
                <Text style={styles.cardAmountGreen}>₹6,99,670</Text>
                <Text style={styles.cardLabelGreen}>Collection In Aug</Text>
              </View>
              <View style={styles.summaryCardRed}>
                <Text style={styles.cardAmountRed}>₹2,99,780</Text>
                <Text style={styles.cardLabelRed}>Aug Collection</Text>
              </View>
            </View>
          </View>

          {/* Quick Actions Section */}
          <View style={styles.quickActionsSection}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <View style={styles.quickActions}>
              <TouchableOpacity style={styles.actionButton}>
                <View style={styles.actionIcon}>
                  <Image 
                    source={require('../assets/icons/tenants.png')} 
                    style={styles.actionIconImage}
                    resizeMode="contain"
                  />
                </View>
                <Text style={styles.actionText}>Add Tenant</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton}>
                <View style={styles.actionIcon}>
                  <Image 
                    source={require('../assets/icons/property.png')} 
                    style={styles.actionIconImage}
                    resizeMode="contain"
                  />
                </View>
                <Text style={styles.actionText}>Record Payments</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton}>
                <View style={styles.actionIcon}>
                  <Image 
                    source={require('../assets/icons/property.png')} 
                    style={styles.actionIconImage}
                    resizeMode="contain"
                  />
                </View>
                <Text style={styles.actionText}>Notice Board</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton}>
                <View style={styles.actionIcon}>
                  <Image 
                    source={require('../assets/icons/property.png')} 
                    style={styles.actionIconImage}
                    resizeMode="contain"
                  />
                </View>
                <Text style={styles.actionText}>Add Leads</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton}>
                <View style={styles.actionIcon}>
                  <Image 
                    source={require('../assets/icons/property.png')} 
                    style={styles.actionIconImage}
                    resizeMode="contain"
                  />
                </View>
                <Text style={styles.actionText}>Complaints</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Rent Details Section */}
          <View style={styles.rentDetailsSection}>
            <View style={styles.rentDetailsCard}>
              <Text style={styles.rentDetailsTitle}>Rent Details</Text>
              
              <View style={styles.rentStats}>
                <View style={styles.rentStat}>
                  <Text style={styles.rentStatNumber}>124</Text>
                  <Text style={styles.rentStatLabel}>Paid Tenants</Text>
                  <Text style={styles.rentStatSubtext}>On-time: 56</Text>
                </View>
                
                <View style={styles.rentStat}>
                  <Text style={[styles.rentStatNumber, styles.rentStatNumberRed]}>12</Text>
                  <Text style={styles.rentStatLabel}>Not-Paid Tenants</Text>
                  <TouchableOpacity style={styles.remindButton}>
                    <Text style={styles.remindButtonText}>🔔 REMIND TO PAY</Text>
                  </TouchableOpacity>
                </View>
              </View>
              
              <TouchableOpacity style={styles.viewButton}>
                <Text style={styles.viewButtonText}>VIEW</Text>
              </TouchableOpacity>
            </View>
          </View>

        </View>
      </ScrollView>

      {/* Bottom Tab Navigator */}
      <BottomTabNavigator
        activeTab={activeTab}
        onTabPress={handleTabPress}
        onAddPress={handleAddPress}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingBottom: 100, // Space for tab navigator
  },
  dashboardContent: {
    padding: 20,
  },
  
  // August Summary Section
  summarySection: {
    marginBottom: 24,
  },
  summaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    fontFamily: 'Montserrat',
  },
  allPropertyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
  },
  allPropertyText: {
    fontSize: 14,
    color: '#666666',
    fontFamily: 'Poppins',
    marginRight: 4,
  },
  summaryDropdown: {
    width: 8,
    height: 4,
  },
  summaryCards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryCard: {
    flex: 1,
    backgroundColor: '#000000',
    borderRadius: 12,
    padding: 16,
    marginRight: 8,
  },
  summaryCardGreen: {
    flex: 1,
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 4,
  },
  summaryCardRed: {
    flex: 1,
    backgroundColor: '#F44336',
    borderRadius: 12,
    padding: 16,
    marginLeft: 8,
  },
  cardAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'Montserrat',
    marginBottom: 4,
  },
  cardAmountGreen: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'Montserrat',
    marginBottom: 4,
  },
  cardAmountRed: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'Montserrat',
    marginBottom: 4,
  },
  cardLabel: {
    fontSize: 12,
    color: '#CCCCCC',
    fontFamily: 'Poppins',
  },
  cardLabelGreen: {
    fontSize: 12,
    color: '#E8F5E8',
    fontFamily: 'Poppins',
  },
  cardLabelRed: {
    fontSize: 12,
    color: '#FFEBEE',
    fontFamily: 'Poppins',
  },

  // Quick Actions Section
  quickActionsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    fontFamily: 'Montserrat',
    marginBottom: 16,
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionButton: {
    width: '18%',
    alignItems: 'center',
    marginBottom: 16,
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#F8F9FA',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  actionIconImage: {
    width: 24,
    height: 24,
    tintColor: '#666666',
  },
  actionText: {
    fontSize: 10,
    color: '#333333',
    textAlign: 'center',
    fontFamily: 'Poppins',
    lineHeight: 12,
  },

  // Rent Details Section
  rentDetailsSection: {
    marginBottom: 24,
  },
  rentDetailsCard: {
    backgroundColor: '#FFF3CD',
    borderRadius: 12,
    padding: 20,
  },
  rentDetailsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    fontFamily: 'Montserrat',
    marginBottom: 16,
    textAlign: 'center',
  },
  rentStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  rentStat: {
    flex: 1,
    alignItems: 'center',
  },
  rentStatNumber: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#000000',
    fontFamily: 'Montserrat',
    marginBottom: 4,
  },
  rentStatNumberRed: {
    color: '#F44336',
  },
  rentStatLabel: {
    fontSize: 14,
    color: '#666666',
    fontFamily: 'Poppins',
    textAlign: 'center',
    marginBottom: 8,
  },
  rentStatSubtext: {
    fontSize: 12,
    color: '#888888',
    fontFamily: 'Poppins',
  },
  remindButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  remindButtonText: {
    fontSize: 10,
    color: '#333333',
    fontFamily: 'Poppins',
    fontWeight: '500',
  },
  viewButton: {
    backgroundColor: '#000000',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  viewButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Montserrat',
  },
});