import { View, Text, StyleSheet, Pressable, ProgressBarAndroidBase, TextInput, Alert, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Colors from '@/src/constants/Colors'
import { AntDesign } from '@expo/vector-icons'
import { router } from 'expo-router'
import InputField from '@/src/components/InputField'
import Checkbox from 'expo-checkbox'  
import Button from '@/src/components/Button'
import { supabase } from '@/src/lib/supabase'

const SigninScreen = () => {
  const [checked, setChecked] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = async () => {
    const {data, error} = await supabase.auth.signInWithPassword({email, password})
    if (error) {
      return Alert.alert("Login failed", error.message)
    } 
    else {
      router.push('/(passengers)')
    }
  }

  return ( 
    <SafeAreaView style={styles.container}>      
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <AntDesign name='arrowleft' color='white' size={24} />
        </Pressable>
      </View>
      <View style={styles.body}>
        <Text style={styles.welcomeText}>Welcome back 👋</Text>
        <Text style={styles.note}>Please enter your email & password to sign in.</Text>
        <InputField 
          value={email}
          onValueChange={setEmail}
          label='Email'
          placeholder='Enter your email address' 
          icon='mail'
          secureTextEntry={false}
        />
        <InputField 
          value={password}
          onValueChange={setPassword}
          label='Password' 
          placeholder='Enter your password' 
          icon='eye-off'
          secureTextEntry
        />
        <Pressable style={styles.checkboxContainer} onPress={() => setChecked(!checked)}>
          <Checkbox 
            style={styles.checkbox}
            value={checked}
            onValueChange={setChecked}
            color={Colors.light.tint}
          />
          <Text>Remember me</Text>
        </Pressable>
        <View style={styles.haveAcctContainer}>
            <Text>Don&apos;t have an account?</Text> 
            <Pressable onPress={() => router.push('/auth/signup')}>
              <Text style={styles.siginText}>Sign up</Text>
            </Pressable>
         </View>
      <Button title='Sign in' onPress={onSubmit} secondary={false} />
      </View>
    </SafeAreaView>
  )
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  header: {
    width: '100%',
    height: 80,
    flexDirection: 'row',
    backgroundColor: Colors.light.tint,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
    position: 'static',
    top: 0,
    left: 0
  },
  body: {
    padding: 10,
    // flex: 1
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
export default SigninScreen