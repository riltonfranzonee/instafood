import React, {useState, useEffect} from 'react'
import {Text, View, StyleSheet, FlatList, Image, Dimensions, ScrollView, TextInput, TouchableOpacity} from 'react-native'
import Swiper from 'react-native-swiper'
import Constants from 'expo-constants'
let {width, height} = Dimensions.get('window')

function App (){
  const[dataBanner, setDataBanner] = useState([])
  const [isLoading, setIsLoading] = useState('')
  const [dataCategories, setDataCategories] = useState([])
  const [selectCategory, setSelectCategory] = useState(0)
  const [dataFood, setDataFood] = useState([])

  function fetchData(){
    const url = 'http://tutofox.com/foodapp/api.json'
    return fetch(url)
    .then(response => response.json())
    .then(jsonResponse => {
      setDataBanner(jsonResponse.banner),
      setIsLoading(false)
      setDataCategories(jsonResponse.categories)
      setDataFood(jsonResponse.food)
    })
    .catch(error => console.error(error))
  }

  function renderItemCategory(item){
    return(
      <TouchableOpacity style={[styles.itemCategory, {backgroundColor: item.color}]} onPress={() => setSelectCategory(item.id)}>
        <Image style={styles.imageCategory} resizeMode='contain' source={{uri: item.image}} />
        <Text style={styles.nameCategory}>{item.name}</Text>
      </TouchableOpacity>
    )
  }

  function renderItemFood(item){
    let catg = selectCategory
    if(catg == 0 || catg == item.categorie){
      return(
        <TouchableOpacity style={styles.itemFood}>
            <Image style={styles.imageFood} resizeMode='contain' source={{uri: item.image}}/>
            <View style={styles.spaceBreak}/>
            <Text style={styles.nameFood}>{item.name}</Text>
            <Text style={styles.priceFood}>${item.price}</Text>
        </TouchableOpacity>
      )
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return(
    <ScrollView >
      <View style={styles.container}>
        <View style={styles.containerHeader}>
          <Image style={styles.logo} source={require('./images/foodapp.png')} resizeMode='contain'/>
          <Swiper style={styles.swiper} autoplay={true} autoplayTimeout={2.5}>
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

      <View style={styles.containerCategories}>
          <Text style={styles.titleCategories}>Categories</Text>
          <FlatList horizontal={true} data={dataCategories}
          renderItem ={({item}) => renderItemCategory(item)} 
          keyExtractor = {(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          />
          <FlatList data={dataFood}
          renderItem={(({item}) => renderItemFood(item))}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          />
          <View style={{height: 20}}>
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
  containerHeader:{
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
  },
  containerCategories:{
    width: width,
    borderRadius: 20,
    paddingVertical: 20,
    backgroundColor: '#fff'
  },
  titleCategories:{
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10
  },
  itemCategory:{
    margin: 5, 
    alignItems: 'center',
    borderRadius: 10,
    padding: 10
  },
  imageCategory:{
    width: 100,
    height: 80
  },
  nameCategory:{
    fontWeight: 'bold',
    fontSize: 22
  },
  imageFood:{
    width: (width/2) - 30,
    height: (width/2) - 50,
    backgroundColor: 'transparent',
    position: 'absolute',
    top: -45,
    marginBottom: 10
  },
  itemFood:{
    width: (width/2)-20,
    padding: 10,
    borderRadius: 10,
    marginTop: 55,
    marginBottom: 5,
    marginLeft: 10,
    alignItems: 'center',
    elevation: 8,
    shadowOpacity: 0.3,
    shadowRadius: 50,
    backgroundColor: '#fff'
  },
  spaceBreak:{
    height: (width/2)-110,
    width: (width/2)-30,
    backgroundColor: 'transparent'
  },
  nameFood:{
    fontSize: 22,
    textAlign: 'center'
  },
  priceFood:{
    fontSize: 20,
    color: 'green'
  }
})