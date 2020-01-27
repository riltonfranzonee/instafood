import React, {useState, useEffect} from 'react'
import {Text, View, ScrollView, TouchableOpacity, StyleSheet, Dimensions, Image, AsyncStorage} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import Constants from 'expo-constants'

var {width} = Dimensions.get('window')

function Cart(){
  const[dataCart, setDataCart] = useState([])

  useEffect(() => {
    AsyncStorage.getItem('cart').then(cart => {
      if(cart !== null) {
        const cartItem = JSON.parse(cart)
        setDataCart(cartItem) 
      }
    })
    .catch(err => console.log(err))
  }, [])

  function changeQt(i, type){
    let cart = dataCart
    let count = cart[i].quantity

    if(type){
      count = count + 1
      cart[i].quantity = count
      setDataCart(cart)
    }
    else if(type == false && count >=2){
      count = count -1
      cart[i].quantity = count
      setDataCart(cart)
      }
    else if(type == false && count == 1){
      cart.splice(i, 1)
      setDataCart(cart)
    }
  }

  return(
    <View style={styles.container}>
      <Text style={styles.title}>Your Cart</Text>
      <View style={{flex: 1}}>

        <ScrollView>
          {
            dataCart.map((item,i) =>{ 
              return(
                <View style={styles.itemContainer}>
                  <Image resizeMode={'contain'} style={{width:width/3,height:width/3}} source={{uri: item.food.image}}/>
                  <View style={styles.textContent}>
                      <View>
                        <Text style={styles.foodTitle}>{item.food.name}</Text>
                        <Text>Food Description. Lorem ipsum dolor sit amet consectetur adipisicing elit</Text>
                      </View>
                      <View style={styles.foodInfo}>
                          <Text style={[styles.foodTitle, {color: '#33c37d'}]}>${item.price * item.quantity}</Text>
                          <View style={styles.buttons}>
                              <TouchableOpacity onPress={() => changeQt(i, false)}>
                                <Icon name='ios-remove-circle' size={30} color={"red"}/>
                              </TouchableOpacity>
                              <Text style={{paddingHorizontal:8, fontWeight:'bold'}}>{item.quantity}</Text>
                              <TouchableOpacity onPress={() => changeQt(i, true)}>
                                <Icon name='ios-add-circle' size={30} color={"#33c37d"}/>
                              </TouchableOpacity>
                          </View>
                      </View>
                  </View>
                </View>)})
            }
        </ScrollView>

      </View>
      <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutTitle}>Checkout</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Cart

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Constants.statusBarHeight
  },
  title:{
    marginTop: 20,
    marginBottom: 10,
    fontSize: 28,
    color: 'gray'
  },
  itemContainer:{
    width:width-20,
    margin:10,
    backgroundColor:'transparent',
    flexDirection:'row', 
    borderBottomWidth:2,
    borderColor:"#cccccc", 
    paddingBottom:10
  },
  textContent:{
    flex: 1,
    backgroundColor:'transparent',
    padding:10,
    justifyContent:"space-between"
  },
  foodTitle:{
    fontSize: 20,
    fontWeight: 'bold'
  },
  foodInfo:{
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  buttons:{
    flexDirection: 'row',
    alignItems: 'center'
  },
  checkoutButton:{
    marginVertical: 20,
    backgroundColor: '#33c37d',
    width: width - 40,
    alignItems: 'center',
    padding: 10,
    borderRadius: 5
  },
  checkoutTitle:{
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff'
  }
})