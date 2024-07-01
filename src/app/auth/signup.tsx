import { View, Text, StyleSheet, Pressable, ProgressBarAndroidBase, TextInput } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Colors from '@/src/constants/Colors'
import { AntDesign } from '@expo/vector-icons'
import { router } from 'expo-router'
import InputField from '@/src/components/InputField'
import Checkbox from 'expo-checkbox'  
import Button from '@/src/components/Button'

const SignUpScreen = () => {
  const [checked, setChecked] = useState(false)
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <AntDesign name='arrowleft' color='white' size={24} />
        </Pressable>
        <View style={styles.progressContainer}>
          <View style={styles.progressIndicator}></View>
        </View>
      </View>
      <View style={styles.body}>
        <Text style={styles.welcomeText}>Hello there 👋</Text>
        <Text style={styles.note}>Please enter your email & password to create an account.</Text>
        <InputField label='Email' placeholder='Enter your email address' icon='mail'/>
        <InputField label='Password' placeholder='Enter your password' icon='eye-off'/>
        <Pressable style={styles.checkboxContainer} onPress={() => setChecked(!checked)}>
          <Checkbox 
            style={styles.checkbox}
            value={checked}
            onValueChange={setChecked}
            color={Colors.light.tint}
          />
          <Text>I agree to Smart Rail Terms, & Privacy Policy.</Text>
        </Pressable>
        <View style={styles.haveAcctContainer}>
            <Text>Already have an account?</Text> 
            <Pressable>
              <Text style={styles.siginText}>Sign in</Text>
            </Pressable>
         </View>
      <Button title='Sign up' onPress={() => {}} secondary={false} />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  header: {
    width: '100%',
    height: 80,
    flexDirection: 'row',
    backgroundColor: Colors.light.tint,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  progressContainer: {
    height: 10,
    width: '80%',
    backgroundColor: '#658EFF',
    marginLeft: 40,
    borderRadius: 100
  },
  progressIndicator: {
    width: '25%',
    height: 10,
    backgroundColor: 'white',
    borderRadius: 100
  },
  body: {
    padding: 10
  },
  welcomeText: {
    fontSize: 30
  },
  note: {
    letterSpacing: 1.2,
    color: 'gray',
    marginTop: 10,
    marginBottom: 30
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  checkbox: {
    // borderColor: Colors.light.tint,
    color: Colors.light.tint,
    borderRadius: 5,
    marginRight: 10
  },
  haveAcctContainer: {
    marginVertical: 30,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  siginText: {
    marginLeft: 5,
    color: Colors.light.tint,
    fontWeight: '600'
  }
 
})
export default SignUpScreen