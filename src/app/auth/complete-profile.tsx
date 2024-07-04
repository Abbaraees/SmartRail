import { Pressable, StyleSheet, Text, View, Image,ScrollView } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from './signup'
import { router } from 'expo-router'
import { AntDesign, Ionicons } from '@expo/vector-icons'
import InputField from '@/src/components/InputField'
import dayjs from 'dayjs'
import { DateTimePickerAndroid, DateTimePickerEvent } from '@react-native-community/datetimepicker'
import Button from '@/src/components/Button'
import * as ImagePicker from 'expo-image-picker'
import Colors from '@/src/constants/Colors'


const CompleteProfileScreen = () => {
  const [fullName, setFullName] = useState('')
  const [nationalId, setNationalId] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [dob, setDob] = useState<Date|undefined>(new Date())
  const [image, setImage] = useState<string | undefined>()

  const onChange = (event: DateTimePickerEvent, selectedDate: Date | undefined)=> {
    const currentDate = selectedDate;
    setDob(currentDate);
  };

  const showDate = () => DateTimePickerAndroid.open({
    value: dob,
    onChange,
    mode: 'date',
    is24Hour: true,
  });

  const pickImage = async () => {
    const {canceled, assets} = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      'mediaTypes': ImagePicker.MediaTypeOptions.Images,
      'quality': 0.8,
    })

    if (!canceled) {
      setImage(assets[0].uri)
    }

  }

  return (
    <SafeAreaView style={styles2.container}>
      <ScrollView>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <AntDesign name='arrowleft' color='white' size={24} />
        </Pressable>
        <View style={[styles.progressContainer]}>
          <View style={[styles.progressIndicator, styles2.progressIndicator]}></View>
        </View>
      </View>
        <View style={styles.body}>
          <Text style={styles.welcomeText}>Complete your profile 📋</Text>
          <Text style={styles.note}>Please enter your profile. Don't worry, only you can see your personal data. No one else will be able to see it.</Text>
        
        <Pressable style={styles2.imagePickerContainer} onPress={pickImage}>
          <Image 
            source={image === undefined 
              ? require('@/assets/images/user-avatar.png')
              : {uri: image}
            }
            style={styles2.userAvatar}
          />
          <Ionicons name='pencil' size={20} color={Colors.light.tint} style={{fontWeight: 'bold', marginLeft: -10}}/>
        </Pressable>
        <InputField
          value={fullName}
          onValueChange={setFullName}
          label='Full Name'
          placeholder='Enter your full name'
          icon='user'
          secureTextEntry={false}
        />
        <InputField
          value={nationalId}
          onValueChange={setNationalId}
          label='National ID Number (NIN)'
          placeholder='Enter your NIN'
          icon='award'
          secureTextEntry={false}

        />
        <InputField
          value={phoneNumber}
          onValueChange={setPhoneNumber}
          label='Phone Number'
          placeholder='Enter your Phone Number'
          icon='phone'
          secureTextEntry={false}

        />

        <View style={styles2.picker}>
          <Text style={styles2.dropdownLabel}>Date of birth</Text>
          <Pressable onPress={showDate} style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <Text style={{
              marginTop: 20,
              color: 'black',
              height: 30,
              fontSize: 16
            }}>{dayjs(dob).format("dddd DD MMMM YYYY")}</Text>
            <Ionicons name='calendar' color='gray' size={24} />
          </Pressable>
        </View>
        <Button title='Continue' onPress={() => {router.push('/auth/create-pin')}} secondary={false} />
      </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FCFF'
  },

  progressIndicator: {
    width: '66.6%'
  },
  userAvatar: {
    width: 100,
    height: 100,
    textAlign: 'center',
    borderColor: 'white',
    marginTop: -25,
    borderRadius: 50
  },
  imagePickerContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    flexDirection: 'row'
  },
  picker: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    marginVertical: 10,

  },
  dropdownLabel: {
    fontSize: 16,
    fontWeight: 'bold'
  }
})
export default CompleteProfileScreen

