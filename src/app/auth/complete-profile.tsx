import { Pressable, StyleSheet, Text, View, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from './signup'
import { router, useLocalSearchParams } from 'expo-router'
import { AntDesign, Ionicons } from '@expo/vector-icons'
import InputField from '@/src/components/InputField'
import dayjs from 'dayjs'
import { DateTimePickerAndroid, DateTimePickerEvent } from '@react-native-community/datetimepicker'
import Button from '@/src/components/Button'
import { decode } from 'base64-arraybuffer'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import { randomUUID } from 'expo-crypto'
import Colors from '@/src/constants/Colors'
import { useAuth } from '@/src/providers/AuthProvider'
import { supabase } from '@/src/lib/supabase'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Header from '@/src/components/Header'


const CompleteProfileScreen = () => {
  const [fullName, setFullName] = useState<string | null>('')
  const [nationalId, setNationalId] = useState<string | null>('')
  const [phoneNumber, setPhoneNumber] = useState<string | null>('')
  const [dob, setDob] = useState<Date|undefined>(new Date())
  const [image, setImage] = useState<string | undefined>()
  const { session } = useAuth()
  const { action } = useLocalSearchParams()
  const isUpdating = typeof action == 'string' ? action === 'update' : action[0] === 'update'
  const { profile, setProfile } = useAuth()

  useEffect(() => {
    if (isUpdating) {
      const { data: {publicUrl} } = supabase.storage
        .from('avatars')
    .getPublicUrl(profile.avatar_url ? profile.avatar_url : 'avatar.url')
      setFullName(profile?.full_name)
      setNationalId(profile.national_id)
      setPhoneNumber(profile.phone_number)
      setDob(new Date(profile.date_of_birth))
      setImage(publicUrl)
    }
  }, [isUpdating])

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

  const uploadImage = async () => {
    if (!image?.startsWith('file://')) {
      return;
    }
  
    const base64 = await FileSystem.readAsStringAsync(image, {
      encoding: 'base64',
    });

    const filePath = `${randomUUID()}.png`;
    const contentType = 'image/png';
    const { data, error } = await supabase.storage
      .from('avatars')
      .upload(filePath, decode(base64), { contentType });
  
    if (data) {
      return data.path;
    }
  };

  const onSubmit = async () => {
    const imagePath = await uploadImage()
  
    const { data, error } = await supabase
      .from("profiles")
      .update({
        full_name: fullName, 
        date_of_birth: dob, 
        phone_number: phoneNumber, 
        national_id: nationalId,
        avatar_url: imagePath
      })
      .eq('id', session?.user.id)
      .single()

      if (error) {
        return Alert.alert("Failed", error.message)
      } else if (isUpdating) {
        const { data } = await supabase
          .from('profiles')
          .select("*")
          .eq('id', profile.id)
          .single()

        setProfile(data)
        router.back()
      } else {
        router.navigate('/auth/create-pin')    
      }
  }

  return (
    <SafeAreaView style={styles2.container}>
      <KeyboardAwareScrollView>
        {
          isUpdating 
          ? <Header title='Profile Info' />
          :
          <View style={styles.header}>
            <Pressable onPress={() => router.back()}>
              <AntDesign name='arrowleft' color='white' size={24} />
            </Pressable>
            <View style={[styles.progressContainer]}>
              <View style={[styles.progressIndicator, styles2.progressIndicator]}></View>
            </View>
          </View>
        }
          <View style={styles.body}>
            {!isUpdating && <>            
              <Text style={styles.welcomeText}>Complete your profile 📋</Text>
              <Text style={styles.note}>Please enter your profile. Don't worry, only you can see your personal data. No one else will be able to see it.</Text>
            
            </>}
          <Pressable style={styles2.imagePickerContainer} onPress={pickImage}>
            <Image 
              source={image === undefined 
                ? require('@/assets/images/user-avatar.png')
                : {uri: image}
              }
              style={styles2.userAvatar}
            />
            <Ionicons name='pencil' size={18} color='white' style={styles2.pencilIcon}/>
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
          <Button title={isUpdating ? 'Update' : 'Continue'} onPress={onSubmit}/>
        </View>
      </KeyboardAwareScrollView>
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
    flexDirection: 'row',
    marginTop: 30
  },
  picker: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    marginVertical: 10,

  },
  pencilIcon: {
    marginLeft: -24,
    backgroundColor: Colors.light.tint,
    padding:4,
    borderRadius: 5
  },
  dropdownLabel: {
    fontSize: 16,
    fontWeight: 'bold'
  }
})

export default CompleteProfileScreen
