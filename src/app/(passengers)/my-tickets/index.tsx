import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '@/src/components/Header'

const MyTickets = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header title='My Tickets' />
      <View style={styles.body}>

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
    padding: 10
  }
})