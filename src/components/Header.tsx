import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'
import Colors from '../constants/Colors'
import { router } from 'expo-router'

const Header = ({title}: {title: string}) => {
  return (
    <View style={styles.header}>
      <Pressable onPress={() => router.back()} style={styles.backBtn}>
        <AntDesign name='arrowleft' color='white' size={24} />
      </Pressable>
      <Text style={styles.title}>{title}</Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
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
  backBtn: {
    width: '30%',
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600'
  }
  
})