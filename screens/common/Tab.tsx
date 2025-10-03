import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  TouchableOpacity,
  Dimensions,
  SafeAreaView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface TabItem {
  id: string;
  label: string;
  icon: any;
  isActive: boolean;
}

interface BottomTabNavigatorProps {
  activeTab: string;
  onTabPress: (tabId: string) => void;
  onAddPress?: () => void;
  onHomePress?: () => void;
  onPropertyPress?: () => void;
  onTenantsPress?: () => void;
}

export default function BottomTabNavigator({ 
  activeTab, 
  onTabPress,
  onAddPress,
  onHomePress,
  onPropertyPress,
  onTenantsPress 
}: BottomTabNavigatorProps) {

  const tabs: TabItem[] = [
    {
      id: 'home',
      label: 'Home',
      icon: activeTab === 'home'
        ? require('../../assets/icons/active-home.png')
        : require('../../assets/icons/home.png'),
      isActive: activeTab === 'home'
    },
    {
      id: 'money',
      label: 'Money',
      icon: activeTab === 'money'
        ? require('../../assets/icons/active-money.png')
        : require('../../assets/icons/money.png'),
      isActive: activeTab === 'money'
    },
    {
      id: 'add',
      label: '',
      icon: null,
      isActive: false
    },
    {
      id: 'tenants',
      label: 'Tenants',
      icon: activeTab === 'tenants'
        ? require('../../assets/icons/active-tenant.png')
        : require('../../assets/icons/tenants.png'),
      isActive: activeTab === 'tenants'
    },
    {
      id: 'property',
      label: 'Property',
      icon: activeTab === 'property'
        ? require('../../assets/icons/active-property.png')
        : require('../../assets/icons/property.png'),
      isActive: activeTab === 'property'
    }
  ];

  const handleTabPress = (tabId: string) => {
    if (tabId === 'add' && onAddPress) {
      onAddPress();
    } else if (tabId === 'home') {
      if (onHomePress) {
        onHomePress(); // This will redirect to dashboard screen
      } else {
        onTabPress(tabId); // Fallback to regular tab press
      }
    } else if (tabId === 'property') {
      if (onPropertyPress) {
        onPropertyPress();
      } else {
        onTabPress(tabId);
      }
    } else if (tabId === 'tenants') {
      if (onTenantsPress) {
        onTenantsPress();
      } else {
        onTabPress(tabId);
      }
    } else {
      onTabPress(tabId);
    }
  };

  const renderTab = (tab: TabItem, index: number) => {
    if (tab.id === 'add') {
      return (
        <TouchableOpacity 
          key={tab.id} 
          onPress={() => handleTabPress(tab.id)}
          style={styles.addButtonContainer}
        >
          <LinearGradient
            colors={['#FFECA7', 'rgba(255, 200, 0, 0.95)']}
            style={styles.addButton}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
          >
            <Text style={styles.addButtonText}>+</Text>
          </LinearGradient>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity 
        key={tab.id} 
        onPress={() => handleTabPress(tab.id)}
        style={[styles.tabItem, tab.isActive && styles.tabItemActive]}
      >
        <View style={styles.tabIconContainer}>
          {tab.icon && (
            <Image 
              source={tab.icon} 
              style={[
                styles.tabIcon,
                tab.id === 'home' && styles.homeIcon,
                tab.id === 'money' && styles.moneyIcon,
                tab.id === 'tenants' && styles.tenantsIcon,
                tab.id === 'property' && styles.propertyIcon,
                (tab.id === 'money' || tab.id === 'tenants') && styles.iconWithBorder
              ]}
              resizeMode="contain"
            />
          )}
        </View>
        <Text style={[
          styles.tabLabel,
          tab.id === 'home' && styles.homelabel,
          tab.id === 'money' && styles.moneyLabel,
          tab.id === 'tenants' && styles.tenantsLabel,
          tab.id === 'property' && styles.propertyLabel,
          tab.isActive && styles.tabLabelActive
        ]}>
          {tab.label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.tabBar}>
          {tabs.map((tab, index) => renderTab(tab, index))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: 'transparent',
  },
  container: {
    position: 'absolute',
    bottom: screenWidth*0.055,
    left: (screenWidth - (screenWidth*0.953)) / 2,
    width: screenWidth*0.953,
    height: screenHeight*0.0763,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBar: {
    width: screenWidth*0.953,
    height: screenHeight*0.0763,
    backgroundColor: '#000000',
    borderRadius: 17,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: screenWidth*0.055,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    height: '100%',
  },
  tabItemActive: {
  },
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  tabIcon: {
  },
  homeIcon: {
    width: screenWidth*0.053,
    height: screenHeight*0.024,
    right: screenWidth*0.022,
    marginTop: screenHeight*0.00375,
  },
  moneyIcon: {
    width: screenWidth*0.07,
    height: screenHeight*0.0213,
    right: screenWidth*0.022,
    marginTop: screenHeight*0.00375,
  },
  tenantsIcon: {
    width: screenWidth*0.061,
    height: screenHeight*0.024,
    marginTop: screenHeight*0.0075,
    marginLeft: 15,
  },
  propertyIcon: {
    width: screenWidth*0.0583,
    height: screenHeight*0.024,
    marginTop: screenHeight*0.0075,
    marginLeft: screenWidth*0.033,
  },
  iconWithBorder: {
  // Removed border for tenants icon
  },
  tabLabel: {
    fontFamily: 'Poppins-Light',
    fontWeight: '300',
    fontSize: 10,
    lineHeight: screenHeight*0.02,
    letterSpacing: 0,
    color: '#FFFFFF',
    textAlign: 'center',
    width: screenWidth*0.083,
    height: screenHeight*0.02,
  },
  moneyLabel: {
    width: screenWidth*0.092,
    height: screenHeight*0.02,
    marginTop: 2,
    marginRight: screenHeight*0.0175,
  },
  homelabel:{
    width: screenWidth*0.092,
    height: screenHeight*0.02,
    marginTop: 2,
    right: screenWidth*0.022,
  },
  tenantsLabel: {
    width: screenWidth*0.11,
    height: screenHeight*0.02,
    marginTop: 2,
    marginLeft: screenHeight*0.0175,
  },
  propertyLabel: {
    width: screenWidth*0.116,
    height: screenHeight*0.02,
    marginTop:2,
    marginLeft: screenWidth*0.028,
  },
  tabLabelActive: {
    color: '#FFD700',
  },
  
  addButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
    width: screenWidth*0.13,
    height: screenHeight*0.06,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    bottom: screenHeight*0.015,
    fontSize: 54,
    fontWeight: 'thin',
    color: '#ffffff',
    textAlign: 'center',
  },
});