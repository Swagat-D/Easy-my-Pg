import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import LoginScreen from './screens/LoginScreen';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    async function loadFonts() {
      try {
        await Font.loadAsync({
          'Sansita': require('./assets/fonts/Sansita-Regular.ttf'),
          'Poppins': require('./assets/fonts/Poppins-Regular.ttf'),
          'Poppins-Light': require('./assets/fonts/Poppins-Light.ttf'),
          'Montserrat': require('./assets/fonts/Montserrat-SemiBold.ttf')
        });
        setFontsLoaded(true);
      } catch (error) {
        console.log('Font loading error:', error);
        setFontsLoaded(true);
      }
    }
    loadFonts();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (!fontsLoaded || showSplash) {
  

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
      
      <View style={styles.footerContainer}>
        <View style={styles.footerContent}>
          <Text style={[styles.footerText, { fontSize: 12 }]}>Made by Owners.</Text>
          <Image 
            source={require('./assets/Protect.png')} 
            style={styles.protectIcon}
            resizeMode="contain"
          />
          <Text style={[styles.footerText, { fontSize: 12 }]}>Trusted by Owners.</Text>
        </View>
      </View>
    </View>
  );
}

  return <LoginScreen />
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
    height: 50,
    top: 347,
    left: 99, 
    fontFamily: 'Sansita',
    fontWeight: '400',
    fontSize: 40,
    lineHeight: 48, 
    letterSpacing: 0,
    color: '#000',
    textAlign: 'center', 
    includeFontPadding: false, 
  },
  subtitleContainer: {
    position: 'absolute',
    width: 250, 
    height: 30, 
    top: 394,
    left: 67, 
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subtitleText: {
    fontFamily: 'Poppins-Light',
    fontWeight: '300',
    fontSize: 16,
    lineHeight: 24, 
    letterSpacing: 0,
    color: '#000',
    textAlign: 'center',
    includeFontPadding: false,
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
    left: (screenWidth - 376) / 2,
  },
  footerText: {
    fontFamily: 'Poppins',
    fontWeight: '300',
    fontSize: 12,
    lineHeight: 24,
    color: '#000',
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  footerContainer: {
    position: 'absolute',
    top: 742,
    left: 69,
    width: 237,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
  },
  footerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  protectIcon: {
    width: 17,
    height: 17,
    marginHorizontal: 8,
  }
});