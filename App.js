import React, {useState, useEffect} from 'react'
import {Text, View, StyleSheet, FlatList, Image, Dimensions, ScrollView, TextInput} from 'react-native'
import Swiper from 'react-native-swiper'
import Constants from 'expo-constants'

let {width, height} = Dimensions.get('window')

function App (){
  const[dataBanner, setDataBanner] = useState([])
  const [isLoading, setIsLoading] = useState('')

  function fetchBanner(){
    const url = 'http://tutofox.com/foodapp/api.json'
    return fetch(url)
    .then(response => response.json())
    .then(jsonResponse => {
      setDataBanner(jsonResponse.banner),
      setIsLoading(false)
    })
    .catch(error => console.error(error))
  }

  useEffect(() => {
    fetchBanner()
  }, [])

  return(
    <ScrollView >
      <View style={styles.container}>
        <View style={styles.containerLogo}>
          <Image style={styles.logo} source={require('./images/foodapp.png')} resizeMode='contain'/>
          <Swiper style={styles.swiper} autoplay={true} autoplayTimeout={2}>
              {
                dataBanner.map(itemBan =>(
                  <Image style={styles.imageBanner} showsPagination={true} resizeMode='contain'
                  source={{uri: itemBan}}
                  />
                ))
              }
          </Swiper>
        </View>
      </View>
    </ScrollView>
  )
}

export default App

const styles = StyleSheet.create({
  logo:{
    height: 60,
    width: width/2,
    margin: 10,
    marginTop: Constants.statusBarHeight
  },
  container:{
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  containerLogo:{
    alignItems: 'center',
    width: width
  },
  swiper:{
    height: width/2
  },
  imageBanner:{
    height: width/2,
    width: width - 40,
    borderRadius: 10,
    marginHorizontal: 20
  }
})