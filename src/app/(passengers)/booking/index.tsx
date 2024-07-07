import { ActivityIndicator, FlatList, StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import { supabase } from '@/src/lib/supabase';
import { Tables } from '@/src/types';
import ScheduleCard from '@/src/components/ScheduleCard';
import Header from '@/src/components/Header';

export default function TabTwoScreen() {
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
    <SafeAreaView style={styles.container}>
      <Header title='Explore Bookings'/>
      <View style={styles.body}>
       { schedules === undefined 
        ? <ActivityIndicator />
        : schedules === null
        ? <Text>Failed to fetch schedules</Text>
        : 
        <>
          <FlatList 
          data={schedules}
          renderItem={({item}) => <ScheduleCard {...item}/>}
          contentContainerStyle={{gap: 18, paddingBottom: 85}}
        />
        </>
        }
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  body: {
    width: '100%',
    paddingHorizontal: 15,
    paddingVertical: 5,
    justifyContent: 'flex-start',
    backgroundColor: '#f3f3f3'
  }
});
