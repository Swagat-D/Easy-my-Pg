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
  TextInput,
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
  const [searchText, setSearchText] = useState('');

  const handleProfilePress = () => {
    console.log('Profile pressed');
  };

  const handleSupportPress = () => {
    console.log('Support pressed');
  };

  const handleAddPress = () => {
    console.log('Add button pressed');
  };

  const handleFilterPress = () => {
    console.log('Filter pressed');
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

  const getCurrentMonth = () => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[new Date().getMonth()];
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

        {/* Search and Filter Section */}
      <View style={styles.searchFilterContainer}>
        <View style={styles.searchContainer}>
          <View style={styles.searchIconContainer}>
            <Image
              source={require('../../assets/icons/search.png')}
              style={styles.searchIcon}
              resizeMode="contain"
            />
          </View>
          <TextInput
            style={styles.searchInput}
            placeholder="Search here"
            placeholderTextColor="#9CA3AF"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
        <TouchableOpacity style={styles.filterContainer} onPress={handleFilterPress}>
          <Image
            source={require('../../assets/icons/filter.png')}
            style={styles.filterIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>


        <View style={styles.dashboardContent}>
          
          {/* Monthly Summary Section */}
          <View style={styles.summarySection}>
            {/* Summary Cards */}
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.summaryScrollView}
              contentContainerStyle={styles.summaryCardsContainer}
            >
              {/* Today Collection Card - Dark */}
              <View style={styles.summaryCardDark}>
                <Text style={styles.cardAmountDark}>₹8,99,450</Text>
                <View style={styles.rupeeIconContainer}>
                  <Image 
                    source={require('../../assets/Frame.png')} 
                    style={styles.FrameIconImage}
                    resizeMode="contain"
                  />
                </View>
                <Text style={styles.cardLabelDark}>Today's Collection</Text>
              </View>

              {/* Collection This Month Card */}
              <View style={styles.summaryCardLight}>
                <Text style={styles.cardAmountLight}>₹6,99,670</Text>
                <Text style={styles.cardLabelLight}>Collection in {getCurrentMonth()}</Text>
              </View>

              {/* Pending Amount Card */}
              <View style={styles.summaryCardLight}>
                <Text style={styles.cardAmountLighta}>₹2,99,780</Text>
                <Text style={styles.cardLabelLight}>{getCurrentMonth()} Dues Collection</Text>
              </View>

              {/* This Week Card */}
              <View style={styles.summaryCardLight}>
                <Text style={styles.cardAmountLight}>₹1,50,230</Text>
                <Text style={styles.cardLabelLight}>{getCurrentMonth()} Electricity Collection</Text>
              </View>

              {/* Yesterday Card */}
              <View style={styles.summaryCardLight}>
                <Text style={styles.cardAmountLight}>₹45,670</Text>
                <Text style={styles.cardLabelLight}>{getCurrentMonth()} Rent Collection</Text>
              </View>

              {/* Last Month Card */}
              <View style={styles.summaryCardLight}>
                <Text style={styles.cardAmountLight}>₹3,20,450</Text>
                <Text style={styles.cardLabelLight}>{getCurrentMonth()} Deposit Collection</Text>
              </View>

              {/* Advance Paid Card */}
              <View style={styles.summaryCardLight}>
                <Text style={styles.cardAmountLight}>₹89,320</Text>
                <Text style={styles.cardLabelLight}>{getCurrentMonth()} Last Fine Collection</Text>
              </View>

              {/* Due Amount Card */}
              <View style={styles.summaryCardLight}>
                <Text style={styles.cardAmountLight}>₹67,890</Text>
                <Text style={styles.cardLabelLight}>{getCurrentMonth()} Advance Collection</Text>
              </View>
            </ScrollView>
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
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  searchFilterContainer: {
    width: screenWidth * 0.78,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: screenWidth * 0.0472,
    marginTop: screenHeight * 0.02,
    marginBottom: screenHeight * 0.015,
    height: screenHeight * 0.055,
    borderRadius: 22,
    borderWidth: 0.75,
    borderColor: '#000000',
    backgroundColor: '#FFFFFF',
  },
  searchContainer: {
    width: screenWidth * 0.78,
    height: screenHeight * 0.057,
    backgroundColor: '#F2F2F31A',
    borderWidth: 0.5,
    borderColor: '#D8D8ED',
    borderRadius: 22,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  searchIconContainer: {
    width: screenWidth * 0.094,
    height: screenHeight * 0.0425,
    left: screenWidth * 0.0167,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000'
  },
  searchIcon: {
    width: screenWidth * 0.0695,
    height: screenHeight * 0.0312,
    tintColor: '#fff',
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#000000',
    fontFamily: 'Montserrat-Regular',
    paddingVertical: 0,
    marginLeft: 8,
  },
  filterContainer: {
    width: screenWidth * 0.12,
    height: screenHeight * 0.055,
    left: screenWidth * 0.8,
    borderWidth: 0.75,
    borderColor: '#000',
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  filterIcon: {
    width: screenWidth * 0.065,
    height: screenHeight * 0.025,
    tintColor: '#000',
  },
  dashboardContent: {
    paddingHorizontal: screenWidth * 0.05,
    paddingTop: screenHeight * 0.002,
  },
  summarySection: {
    marginBottom: screenHeight*0.02,
  },
  summaryScrollView: {
    marginHorizontal: -(screenWidth*0.055),
  },
  summaryCardsContainer: {
    paddingHorizontal: screenWidth*0.055,
    paddingRight: screenWidth*0.033,
  },
  summaryCardDark: {
    width: screenWidth*0.43,
    height: screenHeight*0.115,
    backgroundColor: '#242424',
    borderRadius: 8,
    borderWidth: 1.1,
    borderColor: '#EAE7E7',
    padding: screenWidth*0.044,
    marginRight: screenWidth*0.033,
    shadowColor: '#171A1F',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.07,
    shadowRadius: 1,
    elevation: 2,
    position: 'relative',
  },
  summaryCardLight: {
    width: screenWidth*0.43,
    height: screenHeight*0.115,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1.1,
    borderColor: '#EAE7E7',
    padding: screenWidth*0.044,
    marginRight: screenWidth*0.033,
    shadowColor: '#171A1F',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.07,
    shadowRadius: 1,
    elevation: 2,
    position: 'relative',
  },
  cardAmountDark: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFD600',
    fontFamily: 'Inter-Bold',
    lineHeight: screenHeight*0.04,
    marginBottom: screenHeight*0.005,
    width:screenWidth*0.255,
    height:screenHeight*0.04,
    top:-(screenHeight*0.0063)
  },
  cardAmountLight: {
    fontSize: 22,
    fontWeight: '700',
    color: '#33B94D',
    fontFamily: 'Inter-Bold',
    lineHeight: screenHeight*0.04,
    marginBottom: screenHeight*0.005,
    width:screenWidth*0.255,
    height:screenHeight*0.04,
    top:-(screenHeight*0.0063)
  },
  cardLabelDark: {
    fontSize: 13,
    fontWeight: '400',
    color: '#FFF',
    fontFamily: 'Montserrat-Regular',
    lineHeight: screenHeight*0.02,
    position: 'absolute',
    bottom: screenHeight*0.02,
    left: screenWidth*0.044,
    width: screenWidth*0.183,
  },
  cardLabelLight: {
    fontSize: 13,
    fontWeight: '400',
    color: '#000',
    fontFamily: 'Montserrat-Regular',
    lineHeight: screenHeight*0.02,
    position: 'absolute',
    bottom: screenHeight*0.02,
    left: screenWidth*0.044,
    width: screenWidth*0.361,
  },
  cardAmountLighta: {
    fontSize: 22,
    fontWeight: '700',
    color: '#EF1D1D',
    fontFamily: 'Inter-Bold',
    lineHeight: screenHeight*0.04,
    marginBottom: screenHeight*0.005,
    width:screenWidth*0.255,
    height:screenHeight*0.04,
    top:-(screenHeight*0.0063)
  },
  rupeeIconContainer: {
    position: 'absolute',
    top: screenHeight*0.055,
    right: screenWidth*0.055,
    transform: [{ rotate: '-0.03deg' }],
  },
  rupeeIcon: {
    fontSize: 32,
    color: '#FFFFFF',
    fontWeight: 'bold',
    opacity: 0.2,
  },
  FrameIconImage: {
    width: screenWidth*0.117,
    height: screenHeight*0.065,
    tintColor: '#FFF',
    left:screenWidth*0.05
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