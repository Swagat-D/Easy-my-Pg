import React, { useState } from 'react';
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
} from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface RentBookScreenProps {
  onBackPress?: () => void;
}

interface Transaction {
  id: string;
  type: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  isPaid: boolean;
}

export default function RentBookScreen({ onBackPress }: RentBookScreenProps) {
  const [transactions] = useState<Transaction[]>([
    {
      id: '1',
      type: 'August Rent',
      amount: 12000,
      dueDate: '07/08/2025',
      paidDate: '12/08/2025',
      isPaid: true,
    },
    {
      id: '2',
      type: 'Electricity Bill',
      amount: 4000,
      dueDate: '12/08/2025',
      paidDate: '13/08/2025',
      isPaid: true,
    },
    {
      id: '3',
      type: 'July Rent',
      amount: 12000,
      dueDate: '07/07/2025',
      paidDate: '07/07/2025',
      isPaid: true,
    },
    {
      id: '4',
      type: 'Electricity Bill',
      amount: 2500,
      dueDate: '07/07/2025',
      paidDate: '15/07/2025',
      isPaid: true,
    },
  ]);

  const tenantsDues = 899450;
  const totalCollection = 899450;
  const depositAmount = 899450;
  const fineAmount = 899450;

  const formatAmount = (amount: number) => {
    return `₹${amount.toLocaleString()}`;
  };

  const handleShare = (transactionId: string) => {
    console.log('Share transaction:', transactionId);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FED232" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
          <Image
            source={require('../assets/icons/arrow-right.png')}
            style={[styles.backIcon, { transform: [{ rotate: '180deg' }] }]}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Rent Book</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Summary Cards */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryRow}>
            {/* Tenants Dues */}
            <View style={[styles.summaryCard, styles.duesCard]}>
              <Text style={[styles.cardLabel, { color: '#FFFFFF' }]}>Tenants{'\n'}Dues</Text>
              <Text style={styles.duesAmount}>{formatAmount(tenantsDues)}</Text>
            </View>

            {/* Total Collection */}
            <View style={[styles.summaryCard, styles.collectionCard]}>
              <Text style={styles.cardLabela}>Total{'\n'}Collection</Text>
              <Text style={styles.collectionAmount}>{formatAmount(totalCollection)}</Text>
            </View>
          </View>

          <View style={styles.summaryRow}>
            {/* Deposit Amount */}
            <View style={[styles.summaryCard, styles.depositCard]}>
              <Text style={styles.cardLabela}>Deposit{'\n'}Amount</Text>
              <Text style={styles.depositAmount}>{formatAmount(depositAmount)}</Text>
            </View>

            {/* Fine Amount */}
            <View style={[styles.summaryCard, styles.fineCard]}>
              <Text style={styles.cardLabela}>Fine{'\n'}Amount</Text>
              <Text style={styles.fineAmount}>{formatAmount(fineAmount)}</Text>
            </View>
          </View>
        </View>

        {/* Recent Transactions Section */}
        <View style={styles.transactionsSection}>
          <View style={styles.transactionsHeader}>
            <Text style={styles.transactionsTitle}>Recent Transactions</Text>
            <TouchableOpacity style={styles.filterButton}>
              <Image
                source={require('../assets/icons/filter.png')}
                style={styles.filterIcon}
              />
            </TouchableOpacity>
          </View>

          {/* Transaction List */}
          <View style={styles.transactionsList}>
            {transactions.map((transaction) => (
              <View key={transaction.id} style={styles.transactionItem}>
                <View style={styles.transactionInfo}>
                  <Text style={styles.transactionType}>{transaction.type}</Text>
                  <Text style={styles.transactionAmount}>
                    {formatAmount(transaction.amount)}
                  </Text>
                  <View style={styles.transactionDatesRow}>
                    <Text style={styles.dateLabel}>
                      Due on : <Text style={styles.dateValue}>{transaction.dueDate}</Text>
                    </Text>
                    {transaction.isPaid && transaction.paidDate && (
                      <Text style={[styles.dateLabel, { marginLeft: Math.max(24, screenWidth * 0.06) }]}>
                        Paid on : <Text style={styles.dateValue}>{transaction.paidDate}</Text>
                      </Text>
                    )}
                  </View>
                </View>
                <TouchableOpacity 
                  style={styles.shareButton}
                  onPress={() => handleShare(transaction.id)}
                >
                  <Text style={styles.shareButtonText}>Share</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    width: '100%',
    height: Math.max(96, screenHeight * 0.12),
    backgroundColor: '#FED232',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Math.max(15, screenWidth * 0.04),
    paddingTop: Math.max(20, screenHeight * 0.04),
    minHeight: 80,
  },
  backButton: {
    padding: Math.max(8, screenWidth * 0.02),
  },
  backIcon: {
    width: Math.max(20, screenWidth * 0.05),
    height: Math.max(20, screenWidth * 0.05),
    tintColor: '#000000',
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: '#171A1F',
    textAlign: 'center',
    marginRight: 40,
    fontFamily: 'Montserrat-SemiBold',
  },
  headerSpacer: {
    width: Math.max(36, screenWidth * 0.09),
  },
  scrollContainer: {
    flex: 1,
  },
  summaryContainer: {
    paddingHorizontal: Math.max(12, screenWidth * 0.03),
    paddingTop: Math.max(16, screenHeight * 0.02),
    paddingBottom: Math.max(8, screenHeight * 0.01),
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Math.max(12, screenHeight * 0.015),
  },
  summaryCard: {
    flex: 1,
    marginHorizontal: Math.max(6, screenWidth * 0.015),
    borderRadius: Math.max(16, screenWidth * 0.04),
    paddingHorizontal: Math.max(16, screenWidth * 0.04),
    paddingVertical: Math.max(16, screenHeight * 0.02),
  },
  duesCard: {
    backgroundColor: '#242424',
  },
  collectionCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(110, 108, 108, 0.9)',
  },
  depositCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(110, 108, 108, 0.9)',
  },
  fineCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(110, 108, 108, 0.9)',
  },
  cardLabel: {
    fontSize: Math.max(14, screenWidth * 0.028),
    fontFamily: 'Montserrat-Medium',
    color: '#FFFFFF',
    marginBottom: Math.max(6, screenHeight * 0.008),
    lineHeight: Math.max(14, screenWidth * 0.035),
    fontWeight: '500',
  },
  cardLabela: {
    fontSize: Math.max(14, screenWidth * 0.028),
    fontFamily: 'Montserrat-Medium',
    color: '#000000',
    marginBottom: Math.max(6, screenHeight * 0.008),
    lineHeight: Math.max(14, screenWidth * 0.035),
    fontWeight: '500',
  },
  duesAmount: {
    fontSize: Math.max(20, screenWidth * 0.05),
    fontFamily: 'Montserrat-Bold',
    color: '#FF0000',
    fontWeight: '700',
  },
  collectionAmount: {
    fontSize: Math.max(18, screenWidth * 0.045),
    fontFamily: 'Montserrat-Bold',
    color: '#33B94D',
    fontWeight: '700',
  },
  depositAmount: {
    fontSize: Math.max(18, screenWidth * 0.045),
    fontFamily: 'Montserrat-Bold',
    color: '#E3B200',
    fontWeight: '700',
  },
  fineAmount: {
    fontSize: Math.max(18, screenWidth * 0.045),
    fontFamily: 'Montserrat-Bold',
    color: '#FF0000',
    fontWeight: '700',
  },
  transactionsSection: {
    paddingHorizontal: Math.max(16, screenWidth * 0.04),
  },
  transactionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Math.max(16, screenHeight * 0.02),
  },
  transactionsTitle: {
    fontSize: Math.max(18, screenWidth * 0.045),
    fontFamily: 'Montserrat-SemiBold',
    color: '#101111',
    fontWeight: '600',
  },
  filterButton: {
    padding: Math.max(14, screenWidth * 0.02),
    borderRadius: 22,
    borderColor: '#000',
    borderWidth: 0.25,
  },
  filterIcon: {
    width: Math.max(16, screenWidth * 0.04),
    height: Math.max(16, screenWidth * 0.04),
    tintColor: '#000000',
  },
  transactionsList: {
    gap: Math.max(16, screenHeight * 0.02),
  },
  transactionItem: {
    width: screenWidth * 0.9,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: screenWidth * 0.035,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#171A1F',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.08,
    shadowRadius: 1,
    elevation: 2,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionType: {
    fontSize: Math.max(15, screenWidth * 0.038),
    fontFamily: 'Montserrat-SemiBold',
    color: '#111827',
    marginBottom: Math.max(2, screenHeight * 0.003),
    fontWeight: '600',
  },
  transactionAmount: {
    fontSize: Math.max(16, screenWidth * 0.04),
    fontFamily: 'Inter-Bold',
    color: '#10B981',
    marginBottom: Math.max(6, screenHeight * 0.008),
    fontWeight: '600',
  },
  transactionDatesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
    gap: Math.max(90, screenWidth * 0.25),
  },
  dateLabel: {
    fontSize: Math.max(11, screenWidth * 0.028),
    fontFamily: 'Montserrat-Regular',
    color: '#171A1F',
  },
  dateValue: {
    color: '#6C6969',
    fontFamily: 'Montserrat-Medium',
    fontWeight: '500',
  },
  shareButton: {
    backgroundColor: 'rgba(121, 243, 144, 0.43)',
    borderRadius: Math.max(6, screenWidth * 0.015),
    paddingHorizontal: Math.max(20, screenWidth * 0.08),
    paddingVertical: Math.max(8, screenHeight * 0.01),
    alignSelf: 'flex-start',
    borderColor: '#33B94D',
    borderWidth: 0.7,
  },
  shareButtonText: {
    fontSize: Math.max(12, screenWidth * 0.03),
    fontFamily: 'OpenSans-Regular',
    color: '#000000',
    fontWeight: '600',
  },
  bottomSpacer: {
    height: Math.max(80, screenHeight * 0.1),
  },
});