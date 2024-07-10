import { Alert, Image, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '@/src/components/Header'
import OTPTextView from 'react-native-otp-textinput'
import Button from '@/src/components/Button'
import Colors from '@/src/constants/Colors'
import { router } from 'expo-router'

const ConfirmBookingScreen = () => {
  const [pin, setPin] = useState('')
  const [pinCorrect, setPinCorrect] = useState(false)

  const onCofirm = () => {
    if (pin === '1234') {
      setPinCorrect(true)
    }else {
      return Alert.alert("Incorrect Pin", "The PIN you entered is incorrect, please try again later!!")
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      {pinCorrect && <>
        <View style={styles.blur}>
        </View>
        <View style={styles.alertContainer}>
          <View style={styles.alert}>
            <Image source={require('@/assets/images/success.png')} style={styles.successImage} />
            <Text style={styles.successTitle}>Ticket Booking Successful!</Text>
            <Text style={styles.successMessage}>You have successfully made a payment transaction and booked a ticket. You can access tickets through the My Ticket menu.</Text>
            <View style={styles.alertBtns}>
              <Button title='View Transaction' onPress={() => {router.navigate('/booking/transactions/1')}}/>
              <Button title='Back to Home' onPress={() => {router.replace('/(passengers)')}} secondary />
            </View>
          </View>
        </View>
      </>}
      <Header title='Confirm PIN' />
      <View style={styles.body}>
        <Text style={styles.note}>Enter your PIN to confirm your train ticket booking.</Text>
        <OTPTextView
          defaultValue={pin}
          tintColor={Colors.light.tint}
          handleTextChange={setPin}
        />
        <View style={{marginTop: 100}}>

          <Button title='Confirm' onPress={onCofirm}/>

        </View>
      </View>
    </SafeAreaView>
  )
}

export default ConfirmBookingScreen

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  body: {
    flex: 1,
    padding: 15,
    flexDirection: 'column',
    // alignItems: 'center',
    justifyContent: 'center'
  },
  note: {
    marginHorizontal: 'auto',
    fontSize: 16,
    textAlign: 'center',
    color: '#212121'
  },
  blur: {
    height: '100%',
    position: 'absolute',
    marginTop: StatusBar.currentHeight,
    top: 0,
    left: 0,
    flex: 1,
    zIndex: 100,
    width: '100%',
    backgroundColor: 'rgba(100, 100, 100, 0.8)',
  },
  alertContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    marginTop: StatusBar.currentHeight,
    zIndex: 200,
    // backgroundColor: 'red'
  },
  alert: {
    width: '90%',
    maxWidth: 340,
    backgroundColor: 'white',
    marginHorizontal: 'auto',
    marginVertical: 'auto',
    borderRadius: 16,
    alignItems: 'center',
    padding: 10,
    paddingBottom: -100
  },
  successImage: {
    width: 150,
    height: 150,
    marginTop: 30
  },
  successTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.light.tint,
    textAlign: 'center',
    paddingHorizontal:50,
    lineHeight: 30,
    marginTop: 20
  },
  successMessage: {
    color: '#212121',
    fontWeight: 'light',
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 10,
    lineHeight: 20,
    marginTop: 10
  },
  alertBtns: {
    width: '100%',
    marginVertical: 10
  }
})