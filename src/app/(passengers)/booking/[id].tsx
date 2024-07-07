import { StyleSheet, Text, View } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import Header from '@/src/components/Header'
import { SafeAreaView } from 'react-native-safe-area-context'

const BookingDetail = () => {
  const { id } = useLocalSearchParams()

  return (
    <SafeAreaView style={styles.container}>
      <Header title='Booking Detail' />
      <Text>BookingDetail {id}</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default BookingDetail
