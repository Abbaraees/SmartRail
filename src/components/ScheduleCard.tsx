import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { Tables } from '../types'
import dayjs from 'dayjs'
import moment from 'moment'
import { router } from 'expo-router'


const ScheduleCard = ({id, origin, destination, departure_time, arrival_time, status, train_id, price} : Tables<'schedules'>) => {
  const [train, setTrain] = useState<Tables<'trains'> | null>()
  const date1 = moment(departure_time);
  const date2 = moment(arrival_time);

  const duration = moment.duration(date2.diff(date1));
  const hours = duration.hours();
  const minutes = duration.minutes();

  const formattedResult = `${hours}h ${minutes}m`;

  useEffect(() => {
    const fetchTrain = async () => {

      let { data: train, error } = await supabase
        .from('trains')
        .select('*')
        .eq('id', train_id)
        .single()

      if (!error) {
        setTrain(train)
      }
    }
    fetchTrain()
  }, [train_id])

  return (
    <Pressable onPress={() => router.navigate(`/booking/${id}`)}>
      <View style={styles.container}>
        <View style={styles.firstRow}>
          <View>
            <Text style={styles.trainName}>{train?.name}</Text>
            <Text style={styles.trainClass}>{train?.class}</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.status}>{status}</Text>
            <Text style={styles.price}>₦{price}</Text>
          </View>
        </View>
        <View style={styles.secondRow}>
          <View>
            <Text style={styles.stations}>{origin}</Text>
            <Text style={styles.time}>{dayjs(departure_time).format('HH:mm a')}</Text>
            <Text style={styles.date}>{dayjs(departure_time).format('DD MMMM YYYY')}</Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Image source={require('@/assets/images/one-way-icon.png')} />
            <Text style={styles.duration}>{formattedResult}</Text>
          </View>
          <View style={{alignItems:'flex-end'}}>
            <Text style={styles.stations}>{destination}</Text>
            <Text style={styles.time}>{dayjs(arrival_time).format('HH:mm a')}</Text>
            <Text style={styles.date}>{dayjs(arrival_time).format('DD MMMM YYYY')}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  )
}

export default ScheduleCard

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 10,
    borderRadius: 16,
    backgroundColor: 'white'
  },
  firstRow: {
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#EEEEEE',
    paddingBottom: 20,
    marginBottom: 20
  },
  trainName: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  trainClass: {
    fontSize: 12,
    color: '#616161'
  },
  status: {
    color: '#12D18E',
    fontSize: 10,
    fontWeight: 'semibold',
    marginRight: 10
  },
  price: {
    color: '#235DFF',
    fontSize: 18,
    fontWeight: 'semibold'
  },
  secondRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
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
  }
})