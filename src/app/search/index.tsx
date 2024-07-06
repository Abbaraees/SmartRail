import { Pressable, StyleSheet, Text, View, FlatList, ActivityIndicator} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign } from '@expo/vector-icons'
import { router } from 'expo-router'
import { styles } from '../auth/signup'
import ScheduleCard from '@/src/components/ScheduleCard'
import { useEffect, useState } from 'react'
import { supabase } from '@/src/lib/supabase'
import { Tables } from '@/src/types'

const SearchScreen = () => {
  const [schedules, setSchedules] = useState<Tables<'schedules'>[] | null>()

  useEffect(() => {
    const fetchSchedules = async () => {
      
    let { data: schedules, error } = await supabase
    .from('schedules')
    .select('*')
        
        
        
      console.log(error)
      if (!error) {
        setSchedules(schedules)
      }
      else {
        console.log(schedules)
        setSchedules(null)
      }
    }
    fetchSchedules()
  }, [])

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <AntDesign name='arrowleft' color='white' size={24} />
        </Pressable>
        <Text style={styles2.title}>Search Results</Text>
      </View>
      <View style={[styles.body, styles2.body]}>
        { schedules === undefined 
        ? <ActivityIndicator />
        : schedules === null
        ? <Text>Failed to fetch schedules</Text>
        : 
        <>
          <FlatList 
          data={schedules}
          renderItem={({item}) => <ScheduleCard {...item}/>}
          contentContainerStyle={{gap: 18, paddingBottom: 10}}
        />
        </>
        }
        
        
      </View>
    </SafeAreaView>
  )
}

export default SearchScreen

const styles2 = StyleSheet.create({
  body: {
    padding: 5,
    marginBottom: 150
  },
  title: {
    width: '80%',
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold'
  }
})