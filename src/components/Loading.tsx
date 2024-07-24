import { StyleSheet, Text, View, StatusBar, ActivityIndicator } from 'react-native'
import React from 'react'
import Colors from '../constants/Colors'

const Loading = ({title}: {title?: string}) => {
  return (
    <>
      <View style={styles.blur}>
      </View>
      <View style={styles.loadingContainer}>
        <ActivityIndicator
          size={100} 
          color={Colors.light.tint} 
          />
        <Text style={styles.loadingText}>{title || 'Loading'}</Text>
      </View>
    </>
  )
}


const styles = StyleSheet.create({
  blur: {
    height: '100%',
    position: 'absolute',
    marginTop: StatusBar.currentHeight,
    top: 0,
    left: 0,
    flex: 1,
    zIndex: 100,
    width: '100%',
    backgroundColor: 'rgba(100, 100, 100, 0.8)',
  },
  loadingContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    marginTop: StatusBar.currentHeight,
    zIndex: 200,
    alignItems:'center',
    justifyContent: 'center'
  },
  loadingText: {
    color: 'white',
    fontSize: 28
  }
  
})

export default Loading
