import React, {useState, useEffect} from 'react'
import {Text, View, TextInput, TouchableOpacity, StyleSheet} from 'react-native'

function Address(){
    const[data, setData] = useState('')

    return(
      <View style={styles.container}>
          <Text>Address</Text>
      </View>
    )
}

export default Address

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})