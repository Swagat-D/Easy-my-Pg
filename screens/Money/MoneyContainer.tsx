import React, { useState } from 'react';
import MoneyDashboard from './MoneyDashboard';
import DuesScreen from './DuesScreen';
import DuesPackageScreen from './DuesPackageScreen';
import CollectionScreen from './CollectionScreen';
import ExpensesScreen from './ExpensesScreen';
import AddBankScreen from './AddBankScreen';
import ReportScreen from './ReportScreen';

interface MoneyContainerProps {
  userName?: string;
  propertyName?: string;
  onTabPress?: (tabId: string) => void;
  onHomePress?: () => void;
  activeTab?: string;
}

export default function MoneyContainer({
  userName = 'Gyana',
  propertyName = 'Kalyani Nagar',
  onTabPress,
  onHomePress,
  activeTab = 'money'
}: MoneyContainerProps) {
  const [currentMoneySection, setCurrentMoneySection] = useState('dashboard');

  const handleSectionPress = (section: string) => {
    setCurrentMoneySection(section);
    console.log('Navigating to money section:', section);
  };

  const commonProps = {
    userName,
    propertyName,
    onTabPress,
    onHomePress,
    onSectionPress: handleSectionPress,
    activeTab,
    currentMoneySection // Pass current section to child components
  };

  // Render the appropriate money section
  switch (currentMoneySection) {
    case 'dues':
      return <DuesScreen {...commonProps} />;
    case 'duesPackage':
      return <DuesPackageScreen {...commonProps} />;
    case 'collection':
      return <CollectionScreen {...commonProps} />;
    case 'expenses':
      return <ExpensesScreen {...commonProps} />;
    case 'addBank':
      return <AddBankScreen {...commonProps} />;
    case 'report':
      return <ReportScreen {...commonProps} />;
    case 'dashboard':
    default:
      return <MoneyDashboard {...commonProps} />;
  }
}