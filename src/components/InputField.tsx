import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'
import { AntDesign, Feather } from '@expo/vector-icons'
import { IconProps } from '@expo/vector-icons/build/createIconSet'

type InputFieldPropTypes = {
  label: string,
  placeholder: string,
  icon: string
}

const InputField = ({label, placeholder, icon}: InputFieldPropTypes) => {
  return (
    <View style={styles.container}>
      <Text>{label}</Text>
      <View style={styles.inputField}>
        <TextInput style={{width: '90%'}} placeholder={placeholder}
          enterKeyHint='next'
          keyboardType='email-address'
        />
        <Feather name={icon} color='darkgray' size={24} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 40
  },
  inputField: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: 'gray',

  }
})
export default InputField