import { ActivityIndicator, StyleSheet, Switch, Text, View } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'
import Header from '@/src/components/Header'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useEffect, useState } from 'react'
import { Tables } from '@/src/types'
import { supabase } from '@/src/lib/supabase'
import ScheduleCard from '@/src/components/ScheduleCard'
import InputField from '@/src/components/InputField'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import Button from '@/src/components/Button'
import Colors from '@/src/constants/Colors'

const BookingDetail = () => {
  const [contactName, setContactName] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [contactPhone, setContactPhone] = useState('')
  const [passengerName, setPassengerName] = useState('')
  const [passengerPhone, setPassengerPhone] = useState('')
  const [sameAsContact, setSameAsContact] = useState(false)

  const { id } = useLocalSearchParams()
  const idInt = typeof id === 'string' ? parseInt(id) : parseInt(id?.[0])
  const [trip, setTrip] = useState<Tables<'schedules'> | null>()

  useEffect(() => {
    const fetchTrip = async () => {
      const {data, error} = await supabase
        .from('schedules')
        .select('*')
        .eq('id', idInt)
        .single()

      if (!error) {
        setTrip(data || null)
      }

    }
    fetchTrip()
  }, [id])

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView>
        <Header title='Booking Details' />
        <View style={styles.body}>
          { trip === undefined 
          ? <ActivityIndicator />
          : trip === null
          ? <Text>Failed to fetch Trip</Text>
          : <>
            <ScheduleCard {...trip} />
            <Text style={styles.heading}>Contact Details</Text>
            <View style={[styles.section, styles.contactDetail]}>
              <InputField 
                value={contactName}
                onValueChange={setContactName}
                label='Full Name'
                placeholder='Enter Full name' icon='user' 
                />
                <InputField 
                value={contactEmail}
                onValueChange={setContactEmail}
                label='Email'
                placeholder='Enter Contact Email' icon='mail' 
                keyboardType='email-address'
                />
                <InputField 
                value={contactPhone}
                onValueChange={setContactPhone}
                label='Phone Number'
                placeholder='Enter Contact Phone Number' icon='phone' 
                />
            </View>
            <Text style={styles.heading}>Passenger Details</Text>
            <View style={[styles.section, styles.passengerDetail]}>
              <View style={styles.passengerHeader}>
                <MaterialCommunityIcons name="seat-passenger" size={32} color="black" />
                <Text style={styles.passengerHeaderTitle}>Passenger 1</Text>
              </View>
              <View style={styles.sameAsContact}>
                <Text style={styles.sameAsContactText}>Same as contact details</Text>
                <Switch 
                  value={sameAsContact} 
                  onValueChange={setSameAsContact} 
                  trackColor={{true: Colors.light.tint}}
                />
              </View>
              <InputField 
                value={passengerName}
                onValueChange={setPassengerName}
                label='Passenger Full Name'
                placeholder='Enter Passenger Full name' icon='user' 
                />
                <InputField 
                value={passengerPhone}
                onValueChange={setPassengerPhone}
                label='Phone Number'
                placeholder='Enter Passenger Phone Number' icon='phone' 
                keyboardType='phone-pad'
                />
            </View>
            <Button title='Continue' onPress={() => {router.navigate('/booking/select-payment')}} />
          </>
          }
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  body: {
    padding: 10
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  contactDetail: {
    height: 270
  },
  passengerDetail: {
    height: 320,
    marginBottom: 20
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 16
  },
  passengerHeader: {
    flexDirection: 'row', 
    alignItems: 'center',
    marginBottom: 10,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE'
  },
  passengerHeaderTitle: {
    fontSize:18,
    marginLeft: 8,
    fontWeight: 'semibold',
  },
  sameAsContact: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE'
  },
  sameAsContactText: {
    fontSize: 18,
    fontWeight: 'semibold'
  }
})

export default BookingDetail
