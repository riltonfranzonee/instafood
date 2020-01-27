import React, {useState, useEffect} from 'react'
import {Text, View, TouchableOpacity, StyleSheet, Dimensions} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import Food from './components/FoodComponent'
import Address from './components/AddressComponent'
import Profile from './components/ProfileComponent'
import Cart from './components/CartComponent'
let {width} = Dimensions.get('window')


function App(){
  const[Module, setModule] = useState(1)

  return(
    <View style={styles.container}>
      {
        Module == 1 ? <Food/>
        : Module == 2 ? <Cart/>
        : Module == 3 ? <Address/>
        : Module == 4 ? <Profile/>
        : <Profile/>
      }
    
      <View style={styles.bottomNavigator}>
        <TouchableOpacity style={styles.navItem} onPress={() => setModule(1)}>
          <Icon name='md-restaurant' size={30} color={Module == 1 ? '#000' : 'gray'}/>
          <Text>Food</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => setModule(2)}>
          <Icon name='md-basket' size={30} color={Module == 2 ? '#000' : 'gray'}/>
          <Text>Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => setModule(3)}>
          <Icon name='md-map' size={30} color={Module == 3 ? '#000' : 'gray'}/>
          <Text>Address</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => setModule(4)}>
          <Icon name='md-contact' size={30} color={Module == 4 ? '#000' : 'gray'}/>
          <Text>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  bottomNavigator:{
    flexDirection: 'row',
    justifyContent: "space-around",
    height: 60,
    width: width,
    elevation: 8,
    shadowOpacity: .3,
    shadowRadius: 50
  },
  navItem:{
    justifyContent: 'center',
    alignItems: 'center'
  }
})