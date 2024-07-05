import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React, { FunctionComponent, FunctionComponentElement } from 'react'
import Colors from '../constants/Colors'

interface ButtonPropTypes {
  title: string,
  onPress: () => void,
  secondary?: boolean,
  disabled?: boolean
}



const Button = ({ title, onPress, secondary, disabled }: ButtonPropTypes) => {
  return (
    <TouchableOpacity style={[styles.button, secondary && {backgroundColor: '#E9EFFF'}]} onPress={onPress} disabled={disabled}>
      <Text style={[styles.buttonText, secondary && {color: Colors.light.tint}]}>{title}</Text>
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  button: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: Colors.light.tint,
    padding: 15,
    alignItems: 'center',
    borderRadius: 12,
    marginBottom: 20
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14
  }
})

export default Button