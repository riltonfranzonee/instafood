import React, {useState, useEffect} from 'react'
import {Text, View, TextInput, TouchableOpacity, StyleSheet} from 'react-native'

function Profile(){
  const[data, setData] = useState('')

  return(
    <View style={styles.container}>
      <Text>Profile food</Text>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})