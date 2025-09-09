import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      <Image 
        source={require('./assets/logo.png')} 
        style={styles.logo}
        resizeMode="contain"
      />
      
      <Text style={styles.appTitle}>Easy my Pg</Text>
      
      <View style={styles.subtitleContainer}>
        <Text style={styles.subtitleText}>India 1st Renting Super App </Text>
        <Image 
          source={require('./assets/india.png')} 
          style={styles.flagIcon}
          resizeMode="contain"
        />
      </View>
      
      <Image 
        source={require('./assets/building.png')} 
        style={styles.buildingsImage}
        resizeMode="contain"
      />
      
      <Text style={styles.footerText}>Made by Owners. ♥ Trusted by Owners.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative',
  },
  logo: {
    position: 'absolute',
    width: 95,
    height: 101,
    top: 240,
    left: 140,
  },
  appTitle: {
    position: 'absolute',
    width: 178,
    height: 33,
    top: 347,
    left: 99,
    fontFamily: 'Sansita',
    fontWeight: '400',
    fontSize: 40,
    lineHeight: 40, // 100% of font-size
    letterSpacing: 0,
    color: '#000',
    textAlign: 'left',
  },
  subtitleContainer: {
    position: 'absolute',
    width: 214,
    height: 24,
    top: 394,
    left: 67,
    flexDirection: 'row',
    alignItems: 'center',
  },
  subtitleText: {
    fontFamily: 'Poppins',
    fontWeight: '300',
    fontSize: 16,
    lineHeight: 16, // 100% of font-size
    letterSpacing: 0,
    color: '#000',
    textAlign: 'left',
  },
  flagIcon: {
    width: 20,
    height: 14,
    marginLeft: 4,
  },
  buildingsImage: {
    position: 'absolute',
    width: 376,
    height: 108,
    top: 634,
    left: (screenWidth - 376) / 2, // Center horizontally
  },
  footerText: {
    position: 'absolute',
    bottom: 50,
    width: screenWidth,
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontWeight: '400',
    fontSize: 14,
    color: '#666',
  },
});