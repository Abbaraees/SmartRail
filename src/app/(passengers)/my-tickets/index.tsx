import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '@/src/components/Header'
import { Tables } from '@/src/database.types'
import { useAuth } from '@/src/providers/AuthProvider'
import { supabase } from '@/src/lib/supabase'
import TicketCard from '@/src/components/TicketCard'
import { useFocusEffect } from 'expo-router'

const MyTickets = () => {
  const [tickets, setTickets] = useState<Tables<'tickets'>[]>()
  const { profile } = useAuth()

  const fetchTickets = async () => {
    const {data, error} = await supabase
      .from('tickets')
      .select('*')
      .eq('user_id', profile.id)

    if (!error) {
      setTickets(data)
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchTickets()
    }, [profile])
  )
  


  return (
    <SafeAreaView style={styles.container}>
      <Header title='My Tickets' />
      <View style={styles.body}>
        { tickets === undefined 
          ? <ActivityIndicator />
          : tickets === null
          ? <Text>Failed to fetch tickets</Text>
          : 
          <>
            <FlatList 
            data={tickets}
            renderItem={({item}) => <TicketCard {...item}/>}
            contentContainerStyle={{gap: 18, paddingBottom: 10}}
          />
          </>
        }
      </View>
    </SafeAreaView>
  )
}

export default MyTickets

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  body: {
    padding: 10,
    paddingBottom: 80
  }
})