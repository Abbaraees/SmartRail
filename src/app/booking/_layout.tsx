import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import BookingProvider from '@/src/providers/BookingProvider'

const BookingLayout = () => {
  return (
    <BookingProvider>
      <Stack screenOptions={{headerShown: false}} />
    </BookingProvider>
  )
}

export default BookingLayout