import { ActivityIndicator, FlatList, StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import { supabase } from '@/src/lib/supabase';
import { Tables } from '@/src/types';
import ScheduleCard from '@/src/components/ScheduleCard';

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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    width: '100%',
    padding: 15
  },
});
