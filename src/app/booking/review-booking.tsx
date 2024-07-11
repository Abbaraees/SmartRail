import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native'
import React from 'react'
import Header from '@/src/components/Header'
import { SafeAreaView } from 'react-native-safe-area-context'
import ScheduleCard from '@/src/components/ScheduleCard'
import Colors from '@/src/constants/Colors'
import { FontAwesome5 } from '@expo/vector-icons'
import { Link, router } from 'expo-router'
import Button from '@/src/components/Button'
import { useBooking } from '@/src/providers/BookingProvider'
import { useAuth } from '@/src/providers/AuthProvider'

const ReviewBookingScreen = () => {
  const { schedule, passenger, paymentMethod } = useBooking()
  const { profile, session } = useAuth()
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>

        <Header title='Review Summary' />
        <View style={styles.body}>
          <Text style={styles.title}>Departure Train</Text>
          {schedule && 
            <ScheduleCard
              {...schedule}
            />
          }
          <Text style={[styles.title, {marginTop: 20}]}>Contact Details</Text>
          <View style={styles.contactDetail}>
            <View style={styles.row}>
              <Text style={styles.label}>First Name</Text>
              <Text style={styles.value}>{profile.full_name}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Email</Text>
              <Text style={styles.value}>{session?.user.email}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Phone Number</Text>
              <Text style={styles.value}>{profile.phone_number}</Text>
            </View>
          </View>

          <Text style={[styles.title, {marginTop: 20, color: Colors.light.tint, fontWeight: '700'}]}>Passenger(s)</Text>
          <View style={styles.passengers}>
            <View style={styles.passengersHeading}>
              <Text style={styles.heading}>No.</Text>
              <Text style={styles.heading}>Name</Text>
            </View>
            <View style={styles.passengersEntry}>
              <Text style={{marginRight: 20}}>1</Text>
              <Text>{passenger?.full_name}</Text>
            </View>
          </View>

          <Text style={styles.title}>Payment Method</Text>
          <View style={styles.paymentMethod}>
            {paymentMethod  == 'My Wallet' 
            ? <>
                <FontAwesome5 name='wallet' size={50} color={Colors.light.tint} />
                <Text style={styles.paymentMethodName}>My Wallet</Text>
              </>
            : paymentMethod == 'Paypal'
            ? <>
                <FontAwesome5 name='paypal' size={50} color={Colors.light.tint} />
                <Text style={styles.paymentMethodName}>Paypal</Text>
              </>
            : paymentMethod == 'Google Pay'
            ?
             <>
                <FontAwesome5 name='google-pay' size={50} color={Colors.light.tint} />
                <Text style={styles.paymentMethodName}>Google Pay</Text>
              </>
            :
              <>
                <FontAwesome5 name='apple-pay' size={50} color={Colors.light.tint} />
                <Text style={styles.paymentMethodName}>Apple Pay</Text>
              </>
          }
            
            <Pressable onPress={() => router.back()} style={{marginLeft: 'auto'}}>
              <Text style={styles.changeBtn}>Change</Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.footer}>
        <Button title='Confirm Booking' onPress={() => {router.navigate('/booking/confirm-booking')}} />
      </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ReviewBookingScreen

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  body: {
    padding: 10
  },
  title: {
    fontSize: 18,
    fontWeight: 'semibold',
    marginVertical: 10
  },
  contactDetail: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 10,
    height: 120,
    justifyContent: 'space-between'
  },
  row: {
    flexDirection: 'row', 
    justifyContent: 'space-between'
  },
  label: {
    fontSize: 16,
    color: '#616161'
  },
  value: {
    fontSize: 16,
    color: '#424242',
    fontWeight: '600'
  },
  passengers: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 10
  },
  passengersHeading: {
    flexDirection: 'row', 
    borderBottomWidth: 1, 
    borderBottomColor: '#EEE', 
    paddingBottom: 10
  },  
  heading: {
    marginRight: 20,
    fontWeight: 'bold'
  },
  passengersEntry: {
    flexDirection: 'row',
    marginVertical: 10
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 16
  },
  paymentMethodName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10
  },
  changeBtn: {
    color: Colors.light.tint,
    fontSize: 18,
    fontWeight: 'bold'
  },
  footer: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: 'white'
  }
})