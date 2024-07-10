import { StyleSheet, Text, View, Image, FlatList, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Header from '@/src/components/Header'
import { SafeAreaView } from 'react-native-safe-area-context'
import Colors from '@/src/constants/Colors'
import Checkbox from 'expo-checkbox'
import { FontAwesome6 } from '@expo/vector-icons'
import Button from '@/src/components/Button'
import { router } from 'expo-router'


const SelectPaymentScreen = () => {
  const [selectedMethod, setSelectedMethod] = useState('')
  type renderPropTypes = {
    isSelected: boolean,
    name: string, 
    image: string,
    balance?: number,
    color?: string,
    onSelect: () => void 
  }
  
  const methods: renderPropTypes[] = [
    {
      isSelected: selectedMethod == 'wallet',
      name: 'My Wallet',
      image: 'wallet',
      balance: 578.60,
      color: Colors.light.text,
      onSelect: () => setSelectedMethod('wallet')
    },
    {
      isSelected: selectedMethod == 'paypal',
      name: 'Paypal',
      image: 'paypal',
      onSelect: () => setSelectedMethod('paypal'),
      color: '#3782D5'
    },
    {
      isSelected: selectedMethod == 'google-pay',
      name: 'Google Pay',
      image: 'google-pay',
      color: '#34A853',
      onSelect: () => setSelectedMethod('google-pay')
    },
    {
      isSelected: selectedMethod == 'apple-pay',
      name: 'Apple Pay',
      image: 'apple-pay',
      color: '#717171',
      onSelect: () => setSelectedMethod('apple-pay')
    }
  ]


  const PaymentMethod = ({isSelected, name, image, balance, onSelect, color}: renderPropTypes) => (
    <View style={styles.paymentContainer}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <FontAwesome6 name={image} size={50} color={color ? color : 'black'}/>
        <Text style={styles.paymentName}>{name}</Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {balance && <Text style={styles.balance}>${balance}</Text>}
        <Checkbox 
          value={isSelected}
          onValueChange={onSelect}
          style={styles.checkBox} 
          color={Colors.light.tabIconSelected} />
      </View>
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      <Header title='Select Payment Method' />
      <View style={styles.body}>
        <FlatList
          data={methods}
          renderItem={({item}) => <PaymentMethod {...item} /> }
          contentContainerStyle={{gap: 10}}
        />
      </View>
      <View style={styles.footer}>
        <Button title='Continue' onPress={() => {router.navigate('/booking/review-booking')}} />

      </View>
    </SafeAreaView>
  )
}

export default SelectPaymentScreen

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  body: {
    padding: 10
  },
  paymentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 16
  }, 
  paymentName: {
    marginLeft: 18,
    fontSize: 18,
    fontWeight: 'bold'
  },
  balance: {
    fontSize: 18,
    color: Colors.light.tabIconSelected,
    marginRight: 10
  },
  checkBox: {
    borderRadius: 50,
  },
  footer: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: 'white'
  }
})