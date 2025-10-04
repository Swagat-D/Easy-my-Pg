import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Navbar from '../common/Navbar';
import BottomTabNavigator from '../common/Tab';
import MoneyNav from './MoneyNav';

interface ExpensesScreenProps {
  userName?: string;
  propertyName?: string;
  onTabPress?: (tabId: string) => void;
  onHomePress?: () => void;
  onSectionPress?: (section: string) => void;
  activeTab?: string;
  currentMoneySection?: string; // Add current section prop
}

export default function ExpensesScreen({
  userName = 'Gyana',
  propertyName = 'Kalyani Nagar',
  onTabPress,
  onHomePress,
  onSectionPress,
  activeTab = 'money'
}: ExpensesScreenProps) {
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
    if (onSectionPress) {
      onSectionPress(section);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
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

      <MoneyNav
        activeSection="expenses"
        onSectionPress={handleSectionPress}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.pageContent}>
          <Text style={styles.pageTitle}>Expenses</Text>
          <Text style={styles.pageDescription}>Expense tracking and management page coming soon...</Text>
          <View style={styles.demoContent}>
            <Text style={styles.demoText}>💸 Track Expenses</Text>
            <Text style={styles.demoText}>📊 Expense Categories</Text>
            <Text style={styles.demoText}>📈 Monthly Reports</Text>
          </View>
        </View>
      </ScrollView>

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
    marginTop: 5, // Add small margin since MoneyNav now has margin bottom
  },
  pageContent: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 300,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 10,
  },
  pageDescription: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 30,
  },
  demoContent: {
    alignItems: 'center',
  },
  demoText: {
    fontSize: 18,
    color: '#333333',
    marginVertical: 5,
  },
});