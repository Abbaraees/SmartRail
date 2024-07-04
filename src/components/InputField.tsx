import { View, Text, TextInput, StyleSheet, KeyboardTypeOptions } from 'react-native'
import React from 'react'
import { AntDesign, Feather } from '@expo/vector-icons'
import { IconProps } from '@expo/vector-icons/build/createIconSet'

type InputFieldPropTypes = {
  value: string,
  onValueChange: (value: string) => void,
  label: string,
  placeholder: string,
  icon: string | undefined,
  secureTextEntry: boolean | undefined
}

const InputField = ({value, onValueChange, label, placeholder, icon, secureTextEntry = false}: InputFieldPropTypes) => {
  return (
    <View style={styles.container}>
      <Text>{label}</Text>
      <View style={styles.inputField}>
        <TextInput style={{width: '90%'}} placeholder={placeholder}
          enterKeyHint='next'
          secureTextEntry={secureTextEntry ? true : false}
          value={value}
          onChangeText={onValueChange}
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
    height: 35

  }
})
export default InputField