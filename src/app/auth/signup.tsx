import { View, Text, StyleSheet, Pressable, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Colors from '@/src/constants/Colors'
import { AntDesign } from '@expo/vector-icons'
import { router } from 'expo-router'
import InputField from '@/src/components/InputField'
import Checkbox from 'expo-checkbox'  
import Button from '@/src/components/Button'
import { supabase } from '@/src/lib/supabase'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Loading from '@/src/components/Loading'

const SignUpScreen = () => {
  const [checked, setChecked] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async () => {
    if (!checked) {
      return Alert.alert("Signup Failed", "You have to accept our Terms and Policies")
    }
    else {
      setIsLoading(true)
      const {data, error} = await supabase.auth.signUp({email, password})
      if (!error) {
        const {error} = await supabase.auth.signInWithPassword({email, password})
        if (!error)
          router.replace('/auth/complete-profile?action=signup')
      }
      else {
        setIsLoading(false)
        return Alert.alert('Auth Failed', error.message)

      }
    }
  }
  return ( 
    <SafeAreaView style={styles.container} > 
      <KeyboardAwareScrollView contentContainerStyle={{ justifyContent: 'center'}}>
        {isLoading && <Loading />}
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
            <Text>I agree to Smart Rail Terms, & Privacy Policy.</Text>
          </Pressable>
          <View style={styles.haveAcctContainer}>
              <Text>Already have an account?</Text> 
              <Pressable  onPress={() => router.push('/auth/signin')}>
                <Text style={styles.siginText}>Sign in</Text>
              </Pressable>
          </View>
        <Button title='Sign up' onPress={onSubmit} secondary={false}/>
        </View>
      </KeyboardAwareScrollView>
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
    alignItems: 'center',
    padding: 10,
    position: 'static',
    top: 0,
    left: 0
  },
  progressContainer: {
    height: 10,
    width: '80%',
    backgroundColor: '#658EFF',
    marginLeft: 40,
    borderRadius: 100
  },
  progressIndicator: {
    width: '33.3%',
    height: 10,
    backgroundColor: 'white',
    borderRadius: 100
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
export default SignUpScreen