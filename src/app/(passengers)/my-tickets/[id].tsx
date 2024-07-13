import Header from '@/src/components/Header'
import Colors from '@/src/constants/Colors'
import { supabase } from '@/src/lib/supabase'
import { Tables } from '@/src/types'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import dayjs from 'dayjs'
import { useLocalSearchParams } from 'expo-router'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { StatusBar, StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import QRCode from 'react-qr-code'

const TicketDetail = () => {
  const [ticket, setTicket] = useState<Tables<'tickets'>>()
  const [schedule, setSchedule] = useState<Tables<'schedules'> | null>()
  const [passengers, setPassengers] = useState<Tables<'passengers'>[] | null>()
  const [payment, setPayment] = useState<Tables<'payments'> | null>()
  const [durations, setDurations] = useState('')

  const { id } = useLocalSearchParams()

  if (id)
  useEffect(() => {
    const fetchTicket = async () => {
      const { data, error } = await supabase
        .from('tickets')
        .select('*')
        .eq('id', id)
        .single()
      if (!error) {
        setTicket(data)
        const { data: schedule, error: scheduleError } = await supabase
          .from('schedules')
          .select('*')
          .eq('id', data.schedule_id ? data.schedule_id : -1)
          .single()

          console.log(schedule)
        if (!scheduleError) {
          setSchedule(schedule)
        }

        const { data: passengers, error: passengersError } = await supabase
          .from('passengers')
          .select('*')
          .eq('ticket_id', data.id ? data.id : -1)

        if (!passengersError) {
          setPassengers(passengers)
        }

        const { data: payment, error: paymentError } = await supabase
          .from('payments')
          .select('*')
          .eq('ticket_id', data.id ? data.id : -1)
          .single()

        if (!paymentError) {
          setPayment(payment)
        }
          

      }
    }
    fetchTicket()
  }, [id])

  // Compute the duration to arrive from the origin to the destination 
  useEffect(() => {
    const date1 = moment(schedule?.departure_time);
    const date2 = moment(schedule?.arrival_time);
    const duration = moment.duration(date2.diff(date1));
    const hours = duration.hours();
    const minutes = duration.minutes();

    const formattedResult = `${hours}h ${minutes}m`;
    setDurations(formattedResult)

  }, [schedule])

  return (
    <SafeAreaView style={styles.container}>
      <Header title='E-Ticket' />
      <ScrollView style={styles.body} contentContainerStyle={{alignItems: 'center'}}>
        <View style={styles.qrcodeContainer}>
          <QRCode value={ticket?.qr_code ? ticket?.qr_code : ''} />
          <Text style={styles.scancodeTxt}>Scan this QR Code at the gate before boarding pass</Text>
        </View>
        <View style={styles.bookingDetail}>
          <View style={styles.firstRow}>
            <View>
              <Text style={{fontWeight: 'bold'}}>Amtrak</Text>
              <Text style={{color: '#616161'}}>Economy</Text>
            </View>
            <View>
              <Text style={{fontWeight: 'bold'}}>{ticket?.id}</Text>
              <Text style={{color: '#616161'}}>Booking ID</Text>
            </View>
          </View>
          <View style={styles.secondRow}>
          <View>
            <Text style={styles.stations}>{schedule?.origin}</Text>
            <Text style={styles.time}>{dayjs(schedule?.departure_time).format("hh:mm A")}</Text>
            <Text style={styles.date}>{dayjs(schedule?.departure_time).format('DD MMMM YYYY')}</Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Image source={require('@/assets/images/one-way-icon.png')} />
            <Text style={styles.duration}>{durations}</Text>
          </View>
          <View style={{alignItems:'flex-end'}}>
          <Text style={styles.stations}>{schedule?.destination}</Text>
            <Text style={styles.time}>{dayjs(schedule?.arrival_time).format("hh:mm A")}</Text>
            <Text style={styles.date}>{dayjs(schedule?.arrival_time).format('DD MMMM YYYY')}</Text>
          </View>
        </View>
        <View style={styles.passengerDetail}>
        {passengers && 
          <>
              {passengers.map(passenger => 
              <View key={passenger.id}>
                <View style={styles.row}>
                  <Text style={styles.label}>Full Name</Text>
                  <Text style={styles.value}>{passenger.full_name}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Phone Number</Text>
                  <Text style={styles.value}>{passenger.phone_number}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Passenger Type</Text>
                  <Text style={styles.value}>{passenger.type}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Seat</Text>
                  <Text style={styles.value}>{passenger.seat}</Text>
                </View>
              </View>)}
            </>}
        </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default TicketDetail

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    width: '100%',
    flex: 1,
    borderTopWidth: 1, 
    borderTopColor: '#EEE',
    padding: 10,
    backgroundColor: Colors.light.tint,
  },
  qrcodeContainer: {
    backgroundColor: '#FFF',
    padding: 15, 
    borderRadius: 16,
    borderBottomLeftRadius: -10,
    alignItems: 'center'
  },
  bookingDetail: {
    backgroundColor: '#FFF',
    padding: 15,
    marginTop: 5,
    borderRadius: 16,
    marginBottom: 20
  },
  scancodeTxt: {
    fontSize: 12, 
    marginTop: 10,
    color: '#757575'
  },
  firstRow: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomColor: '#EEE',
    borderBottomWidth: 1
  },
  secondRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
    paddingBottom: 20,
    borderBottomColor: '#EEE',
    borderBottomWidth: 1
  },
  stations: {
    // fontSize: 16,
    fontWeight: 'semibold',
    color: '#424242'
  },
  time: {
    color: '#235DFF',
    fontSize: 15,
    fontWeight: 'bold',
    marginVertical: 10
  },
  date: {
    color: '#616161'
  },
  duration: {
    fontSize: 12,
    color: '#616161',
    marginTop: 8
  },
  passengerDetail: {
    
  },
  row: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    marginVertical: 8
  },
  label: {
    fontSize: 16,
    color: '#616161'
  },
  value: {
    fontSize: 16,
    color: '#424242',
    fontWeight: '700'
  },
})