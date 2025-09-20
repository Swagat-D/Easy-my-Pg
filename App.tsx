// 1. UPDATE YOUR App.tsx (Replace your existing App.tsx with this enhanced version)
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import { AuthProvider } from './contexts/AuthContext';
import AppNavigator from './navigation/AppNavigator';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const SplashScreen = () => {
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
};

const AppContent = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    async function loadFonts() {
      try {
        await Font.loadAsync({
          'Sansita': require('./assets/fonts/Sansita-Regular.ttf'),
          'Poppins': require('./assets/fonts/Poppins-Regular.ttf'),
          'Poppins-Light': require('./assets/fonts/Poppins-Light.ttf'),
          'Montserrat': require('./assets/fonts/Montserrat-SemiBold.ttf'),
          'poppins-Medium': require('./assets/fonts/Poppins-Medium.ttf'),
          'Montserrat-Regular': require('./assets/fonts/Montserrat-Regular.ttf'),
          'Montserrat-Medium': require('./assets/fonts/Montserrat-Medium.ttf'),
          'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf'),
          'Montserrat-SemiBold': require('./assets/fonts/Montserrat-SemiBold.ttf'),
          'Inter-Bold': require('./assets/fonts/Inter-Bold.ttf'),
          'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
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
    return <SplashScreen />;
  }

  return (
  <AuthProvider>
    <AppNavigator />
  </AuthProvider>
  )
};

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
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
    width: screenWidth*0.26,
    height: screenHeight*0.126,
    top: screenHeight*0.285,
    left: screenWidth*0.38,
  },
  appTitle: {
    position: 'absolute',
    width: screenWidth*0.66, 
    height: screenHeight*0.0625,
    top: screenHeight*0.42,
    left: screenWidth*0.19,
    fontFamily: 'Sansita',
    fontWeight: '400',
    fontSize: 40,
    lineHeight: screenHeight*0.05, 
    letterSpacing: 0,
    color: '#000',
    textAlign: 'center', 
    includeFontPadding: false, 
  },
  subtitleContainer: {
    position: 'absolute',
    width: screenWidth*0.833, 
    height: screenHeight*0.0375, 
    top: screenHeight*0.485,
    left: screenWidth*0.11, 
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subtitleText: {
    fontFamily: 'Poppins-Light',
    fontWeight: '300',
    fontSize: 16,
    lineHeight: screenHeight*0.03, 
    letterSpacing: 0,
    color: '#000',
    textAlign: 'center',
    includeFontPadding: false,
  },
  flagIcon: {
    width: screenWidth*0.05,
    height: screenHeight*0.023,
    marginLeft: 4,
  },
  buildingsImage: {
    position: 'absolute',
    width: screenWidth*1.05,
    height: screenHeight*0.13,
    top: screenHeight*0.76,
    left:-15
  },
  footerText: {
    fontFamily: 'Poppins',
    fontWeight: '300',
    fontSize: 12,
    lineHeight: screenHeight*0.03,
    color: '#000',
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  footerContainer: {
    position: 'absolute',
    top: screenHeight*0.9,
    left: screenWidth*0.15,
    width: screenWidth*0.72,
    height: screenHeight*0.03,
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
    width: screenWidth*0.035,
    height: screenHeight*0.035,
    marginHorizontal: 8,
  }
});