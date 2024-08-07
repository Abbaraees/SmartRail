import { Alert, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { styles } from './signup'
import { AntDesign } from '@expo/vector-icons'
import { router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import OTPTextView from 'react-native-otp-textinput'
import Colors from '@/src/constants/Colors'
import Button from '@/src/components/Button'
import * as Crypto from "expo-crypto"
import { supabase } from '@/src/lib/supabase'
import { useAuth } from '@/src/providers/AuthProvider'

const CreatePinScreen = () => {
  const { session, setProfile } = useAuth()
  const [pin, setPin] = useState<string>('')
  const onConfirm = async () => {
    if (pin.length < 4) {
      Alert.alert("Failed", "Pin most be 4 digits")
    }
    else if (session) {
      const digest = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA512, pin)
      const {data, error} = await supabase
        .from('profiles')
        .update({encrypted_pin: digest})
        .eq('id', session?.user.id)
        .single()



      if (!error) {
        const { data } = await  supabase
          .from('profiles')
          .select('*')
          .eq('id', session?.user.id)
          .single()
        setProfile(data)
        
        return Alert.alert("Success", "Profile Created successfully, proceed to Dashboard", 
          [{'text': 'Continue', onPress: () => {router.replace('/(passengers)')}}]
        )
      }

      else {
        return Alert.alert("Failed", "An error occured, please try again later!!")
      }
    }
  }

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <AntDesign name='arrowleft' color='white' size={24} />
        </Pressable>
        <View style={[styles.progressContainer]}>
          <View style={[styles.progressIndicator, styles2.progressIndicator]}></View>
        </View>
      </View>
      <View style={styles.body}>
        <Text style={styles.welcomeText}>Create new PIN 🔐</Text>
        <Text style={styles.note}>Add a PIN number to make your account
        more secure. You will also need this PIN to make ticket booking transactions.</Text>
        <OTPTextView 
          defaultValue={pin}
          tintColor={Colors.light.tint}
          handleTextChange={setPin}
          containerStyle={styles2.otp}
        />
        <Button
          title='Confirm'
          onPress={onConfirm}
          secondary={false}
        />
      </View>
    </SafeAreaView>
  )
}

export default CreatePinScreen

const styles2 = StyleSheet.create({
  progressIndicator: {
    width: '100%'
  },
  otp: {
    marginBottom: 40
  }
})