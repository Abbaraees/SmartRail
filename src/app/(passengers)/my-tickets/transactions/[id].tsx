import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '@/src/components/Header'
import Barcode from '@kichiyaki/react-native-barcode-generator'
import ScheduleCard from '@/src/components/ScheduleCard'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import Button from '@/src/components/Button'
import { router, useLocalSearchParams } from 'expo-router'
import { supabase } from '@/src/lib/supabase'
import { Tables } from '@/src/types'

const TransactionDetail = () => {
  const [ticket, setTicket] = useState<Tables<'tickets'>>()
  const [schedule, setSchedule] = useState()

  const { id } = useLocalSearchParams()

  if (id)
  useEffect(() => {
    const fetchTicket = async () => {
      const { data, error } = await supabase
        .from('tickets')
        .select('*')
        .eq('id', id)
        .single()

      console.log(data)

      if (!error) {
        setTicket(data)
      }
    }
    fetchTicket()
  }, [id])

  return (
    <SafeAreaView style={styles.container}>
      <Header title='Transaction Detail' />
      <ScrollView style={styles.body}>
        <View>
          <View style={styles.barcodeHeader}>
            <Text style={{fontSize: 16, fontWeight: 'semibold'}}>Booking ID:</Text>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>{id}</Text>
          </View>
          <Barcode value='123' format='CODE128' maxWidth={400}/>
          <Text style={styles.barcodeNote}>You are obligated to present your e-boarding pass when boarding a train trip or during inspecting train passengers.</Text>
        </View>
        
        <Text style={styles.sectionTitle}>Trip Details</Text>
        <ScheduleCard
            origin='Kano'
            destination='Katsina'
            price={150}
            train_id={1}
            status='Available'
          />

        <Text style={styles.sectionTitle}>Payment Details</Text>
        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.label}>Price</Text>
            <Text style={styles.value}>$40</Text>
          </View>
          <View style={[styles.row, styles.tax]}>
            <Text style={styles.label}>Tax</Text>
            <Text style={styles.value}>$2</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Total</Text>
            <Text style={styles.value}>$42</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.label}>Status</Text>
            <Text style={styles.value}>Paid</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Booking ID</Text>
            <Text style={styles.value}>EY893GH</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Transaction ID</Text>
            <Text style={styles.value}>2023122908000930</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Payment Method</Text>
            <Text style={styles.value}>My Wallet</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Passenger(s)</Text>
        <View style={styles.section}>
          <View style={styles.passengersHeading}>
            <MaterialCommunityIcons name='seat-passenger' size={32} color={'black'} />
            <Text style={styles.passengersHeadingText}>Passenger</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Full Name</Text>
            <Text style={styles.value}>Muhammad Lawal</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Phone Number</Text>
            <Text style={styles.value}>+23481271637</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Passenger Type</Text>
            <Text style={styles.value}>Adult</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Seat</Text>
            <Text style={styles.value}>Carriage 2 1 / B2</Text>
          </View>
          <Button title='Show E-Ticket' onPress={() => {router.replace('/(passengers)/my-tickets/1')}} />
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

export default TransactionDetail

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  body: {
    paddingHorizontal: 10,
    paddingBottom: 20
  },
  barcodeHeader: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    marginBottom: 5
  },
  barcodeNote: {
    lineHeight: 20,
    color: '#616161',
    marginTop: 5
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 15
  },
  section: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    borderRadius: 16,
    marginBottom: 20
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
  tax: {
    borderBottomWidth: 2,
    borderBottomColor: '#eee',
    paddingBottom: 15
  },
  passengersHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#eee',
    paddingVertical: 10
  },
  passengersHeadingText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10
  }
})