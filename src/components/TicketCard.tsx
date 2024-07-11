import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { Tables } from '../types'
import dayjs from 'dayjs'
import moment from 'moment'
import { router } from 'expo-router'


const TicketCard = ({id, user_id, purchase_date, qr_code, schedule_id } : Tables<'tickets'>) => {
  
  const [schedule, setSchedule] = useState<Tables<'schedules'> | null>()


  
  const [train, setTrain] = useState<Tables<'trains'> | null>()
  const date1 = moment(schedule?.departure_time);
  const date2 = moment(schedule?.arrival_time);

  const duration = moment.duration(date2.diff(date1));
  const hours = duration.hours();
  const minutes = duration.minutes();

  const formattedResult = `${hours}h ${minutes}m`;

  useEffect(() => {
    const fetchSchedule = async () => {

      if (typeof schedule_id === 'number'){
        let { data, error } = await supabase
          .from('schedules')
          .select('*')
          .eq('id', schedule_id)
          .single()

        if (!error && data) {
          setSchedule(data)

          let { data: train, error } = await supabase
            .from('trains')
            .select('*')
            .eq('id', data.train_id)
            .single()

          if (!error) {
            setTrain(train)
          }
      }}
    }
    fetchSchedule()
  }, [schedule_id])
  
  return (
    <Pressable onPress={() => router.navigate(`/(passengers)/my-tickets/transactions/${id}`)}>
      <View style={styles.container}>
        <View style={styles.firstRow}>
          <View>
            <Text style={styles.trainName}>{train?.name}</Text>
            <Text style={styles.trainClass}>{train?.class}</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.status}>{schedule?.status}</Text>
            <Text style={styles.price}>${schedule?.price}</Text>
          </View>
        </View>
        <View style={styles.secondRow}>
          <View>
            <Text style={styles.stations}>{schedule?.origin}</Text>
            <Text style={styles.time}>{dayjs(schedule?.departure_time).format('HH:mm a')}</Text>
            <Text style={styles.date}>{dayjs(schedule?.departure_time).format('DD MMMM YYYY')}</Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Image source={require('@/assets/images/one-way-icon.png')} />
            <Text style={styles.duration}>{formattedResult}</Text>
          </View>
          <View style={{alignItems:'flex-end'}}>
            <Text style={styles.stations}>{schedule?.destination}</Text>
            <Text style={styles.time}>{dayjs(schedule?.arrival_time).format('HH:mm a')}</Text>
            <Text style={styles.date}>{dayjs(schedule?.arrival_time).format('DD MMMM YYYY')}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  )
}

export default TicketCard

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