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

const { width: screenWidth } = Dimensions.get('window');

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
}

export default function BottomTabNavigator({ 
  activeTab, 
  onTabPress,
  onAddPress 
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
    bottom: 20,
    left: (screenWidth - 343) / 2,
    width: 343,
    height: 61,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBar: {
    width: 343,
    height: 61,
    backgroundColor: '#000000',
    borderRadius: 17,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    height: '100%',
  },
  tabItemActive: {
    // Add any active state styling if needed
  },
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  tabIcon: {
  // Removed tintColor so icons show their original color
  },
  homeIcon: {
    width: 19,
    height: 19,
  },
  moneyIcon: {
    width: 25,
    height: 17,
    right: 8,
  },
  tenantsIcon: {
    width: 22,
    height: 19,
    marginTop: 1,
    marginLeft: 15,
  },
  propertyIcon: {
    width: 21,
    height: 19,
    marginTop: 3,
    marginLeft: 12,
  },
  iconWithBorder: {
  // Removed border for tenants icon
  },
  tabLabel: {
    fontFamily: 'Poppins-Light',
    fontWeight: '300',
    fontSize: 10,
    lineHeight: 16,
    letterSpacing: 0,
    color: '#FFFFFF',
    textAlign: 'center',
    width: 30,
    height: 16,
  },
  moneyLabel: {
    width: 33,
    height: 16,
    marginTop: 2,
    marginRight: 14,
  },
  homelabel:{
    width: 33,
    height: 16,
    marginTop: 0,
    marginLeft: 2,
  },
  tenantsLabel: {
    width: 40,
    height: 16,
    marginTop: 2,
    marginLeft: 14,
  },
  propertyLabel: {
    width: 42,
    height: 16,
    marginTop:2,
    marginLeft: 10,
  },
  tabLabelActive: {
    color: '#FFD700',
  },
  
  addButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    bottom:12,
    fontSize: 54,
    fontWeight: 'thin',
    color: '#ffffff',
    textAlign: 'center',
  },
});