import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface MoneyNavProps {
  activeSection: string;
  onSectionPress: (section: string) => void;
}

const moneyNavSections = [
  { id: 'dashboard', title: 'Dashboard' },
  { id: 'dues', title: 'Dues' },
  { id: 'duesPackage', title: 'Dues Package' },
  { id: 'collection', title: 'Collection' },
  { id: 'expenses', title: 'Expenses' },
  { id: 'addBank', title: 'Add Bank' },
  { id: 'report', title: 'Report' },
];

export default function MoneyNav({ activeSection, onSectionPress }: MoneyNavProps) {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {moneyNavSections.map((section, index) => (
          <TouchableOpacity
            key={section.id}
            style={[
              styles.navButton,
              activeSection === section.id && styles.activeNavButton,
              index === 0 && styles.firstButton,
              index === moneyNavSections.length - 1 && styles.lastButton,
            ]}
            onPress={() => onSectionPress(section.id)}
          >
            <Text
              style={[
                styles.navButtonText,
                activeSection === section.id && styles.activeNavButtonText,
              ]}
            >
              {section.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF9E4',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    paddingBottom: screenHeight * 0.002,
    marginTop: (screenHeight * 0.0175),
  },
  scrollView: {
    flexGrow: 0,
  },
  scrollContent: {
    paddingHorizontal: screenWidth * 0.0175,
    alignItems: 'center',
  },
  navButton: {
    paddingHorizontal: screenWidth * 0.0175,
    paddingTop: screenHeight * 0.01,
    paddingBottom: screenHeight * 0.005,
    marginRight: screenWidth * 0.0175,
    backgroundColor: 'transparent',
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 0,
  },
  activeNavButton: {
    backgroundColor: 'transparent',
    borderBottomColor: '#FFD600',
    borderBottomWidth: 3,
  },
  firstButton: {
    marginLeft: screenWidth * 0.04,
  },
  lastButton: {
    marginRight: screenWidth * 0.04,
  },
  navButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666666',
    fontFamily: 'Roboto-Medium',
    textAlign: 'center',
  },
  activeNavButtonText: {
    color: '#1A1A1A',
    fontWeight: '600',
  },
});