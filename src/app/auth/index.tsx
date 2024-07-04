import Button from '@/src/components/Button'
import Colors from '@/src/constants/Colors'
import { useNavigation, router } from 'expo-router'
import { View, Text, StyleSheet, Image, Pressable, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'


const WalkthroughScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Image source={require('@/assets/images/logo.png')} style={styles.logo}/>
      <Text style={styles.title}>Smart Rail</Text>
      <Text style={styles.welcomeText}>Welcome! Let's start by creating your account or sign in if you already have one.</Text>
      <Button title='Sign up' onPress={() => router.navigate('/auth/signup') } secondary={false}/>
      <Button title='Sign In' onPress={() => router.navigate('/auth/signin') } secondary/>
      
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 50
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  welcomeText: {
    width: '90%',
    textAlign: 'center',
    fontSize: 15,
    color: '#212121',
    marginBottom: 50
  }
})

export default WalkthroughScreen