import {
    SafeAreaView,
    View,
    StatusBar,
    Text,
    TextInput,
    FlatList,
    Dimensions,
    StyleSheet,
    Image,
    Pressable,
    
    Button,
    ImageBackground,
  } from 'react-native';
  import React, { useState } from 'react';
  import { ScrollView } from 'react-native-virtualized-view';
 import COLORS from '../../const/color'
 import places from '../../const/houses'
import Icon from 'react-native-vector-icons/MaterialIcons';
//  import Icon from 'react-native-vector-icons/Fontisto';
import houseData from '../../const/houseData';
const {width} = Dimensions.get('screen');


const categoryList = ['House', 'Apartment', 'Hotel','Villa'];

const ListCategories = () => {
  
  const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState(0);
  return (
    <View style={style.categoryListContainer}>
      {categoryList.map((category, index) => (
        <Pressable
          key={index}
          onPress={() => setSelectedCategoryIndex(index)}>
          <Text
            style={[
              style.categoryListText,
              index == selectedCategoryIndex && style.activeCategoryListText,
              index === 0 && style.firstCategoryStyle,
            ]}>
            {category}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};
const HomeScreen =({navigation})=>{


const Card = ({place}) =>{
   return <ImageBackground  style={style.cardImage} source={place.image}>
    <View style={{ flex: 1, justifyContent: 'end', alignItems: 'flex-end',  }}>
     <Text style={{  paddingVertical:1, paddingHorizontal:10, backgroundColor: COLORS.grey, fontSize:11, color:COLORS.white,  borderRadius:20 }}>
       <Icon name="location-pin" size={10} style={{marginTop:15}} color={COLORS.white} />
        <Text >15 km</Text>       
     </Text>
   </View>
    <Text style={{ color:COLORS.white , fontSize:16 , marginTop:140, fontWeight:500}} >{place.name}</Text>
    <Text style={{ color:COLORS.white , fontSize:12 , fontWeight:400}} >{place.location}</Text>
   </ImageBackground>
}


const CardHouse = ({house}) =>{
  console.log(house);
  return (
    <Pressable
    activeOpacity={0.8}
    onPress={() => navigation.navigate('DetailScreen', house)}>
  <View style={style.CardHouseCont}>
     <Image source={house.im} style={style.cardImages} />
     <View >
       
            <Text style={{color: COLORS.dark, fontWeight:500, fontSize: 16, marginTop: 5}}>
              {house.location}
            </Text>
            <Text style={{color: COLORS.blue, fontSize: 14, marginTop: 5}}>
            
              {house.ref}
            </Text>


            {/* Facilities container */}
            <View style={{marginTop: 10, flexDirection: 'row'}}>
              <View style={style.facility}>
                <Icon name="hotel"  color={COLORS.backgroundtrans} size={18} />
                <Text style={style.facilityText}>2</Text>
              </View>
              <View style={style.facility}>
                <Icon name="bathtub" color={COLORS.backgroundtrans}  size={18} />
                <Text style={style.facilityText}>4 salles de bain</Text>
              </View>
              
            </View>
     </View>
  </View>
  </Pressable>

)}
    return (
        <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
        {/* Customise status bar */}
        <StatusBar
          translucent={false}
          backgroundColor={COLORS.white}
          barStyle="dark-content"
        />
        {/* Header container */}
        <View style={style.header}>
          <View>
            <Text style={{color: COLORS.grey}}>localisation</Text>
            <Text style={{color: COLORS.dark, fontSize: 20, fontWeight: 'bold'}}>
              Dakar
            </Text>
          </View>
          <Icon name="notifications-none" color={COLORS.grey} size={25} />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Input and sort button container */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 10,
            }}>
            <View style={style.searchInputContainer}>
              <Icon name="search" color={COLORS.grey} size={25} />
              <TextInput placeholder="Rechercher une adresse  " 
              
              />
            </View>
  
            <View style={style.sortBtn}>
              <Icon name="tune" color={COLORS.white} size={25} />
            </View>
          </View>
      
        {/* Render categories */}
        <ListCategories  />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems:'center',
            paddingHorizontal: 10,
            marginTop:20,
          }}> 
          <View >
          <Text style={{color: COLORS.dark, fontSize: 14, fontWeight: 'bold'}}>
          Près de toi</Text>
          </View>

          <View >
          <Text style={{color: COLORS.grey, fontSize:12}}>
          voir plus</Text>
          </View>
        </View>
        
        <View  style={{marginTop:17}}>
        <FlatList
        contentContainerStyle={{paddingLeft:10,}}
        horizontal
           showsHorizontalScrollIndicator={false}
            data={places}
            renderItem={({item}) => <Card place={item} />}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems:'center',
            paddingHorizontal: 10,
            marginTop:20,
          }}>
          <View >
          <Text style={{color: COLORS.dark, fontSize: 14, fontWeight: 'bold'}}>
          Près de toi</Text>
          </View>

          <View >
          <Text style={{color: COLORS.grey, fontSize:12}}>
          Voir plus</Text>
          </View>
        </View>
         
       <View>

             <FlatList data={houseData}  renderItem={({ item }) => <CardHouse house={item} />}
            
            />
            
            
            {/* <FlatList
        data={filteredHouses}
        renderItem={({ item }) => (
          // <View>
          //   <Text>{item.location}</Text>
            
          // </View>
          <CardHouse house={item.location} />
            
        )}
        keyExtractor={(item) => item.id.toString()}
      />  */}
                                  
       </View>
          </ScrollView>
          </SafeAreaView>
    )
}

const style = StyleSheet.create({
    header: {
      paddingVertical: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
    },
    profileImage: {
      height: 50,
      width: 50,
      borderRadius: 25,
    },
    searchInputContainer: {
      height: 50,
      backgroundColor: COLORS.light,
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 10,
      borderRadius: 12,
    },
    buttonContainer1:{
      backgroundColor:COLORS.blue,
      borderRadius: 30,
      margin: 10,
    },
    sortBtn: {
      backgroundColor: COLORS.blue,
      height: 50,
      width: 50,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 10,
    },
    cardImage:{
    height:220,
     width:width/2,
     borderColor: COLORS.blue,
     marginRight:20,
     padding:10,
     borderRadius:10,
     overflow:'hidden',
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        justifyContent: 'center',
       
        borderColor:COLORS.red
      },
      buttonContainer: {
        marginVertical: 20,
      },
    optionsCard: {
      height: 210,
      width: width / 2 - 30,
     elevation: 15,
      alignItems: 'center',
      backgroundColor: COLORS.white,
      borderRadius: 20,
      paddingTop: 10,
      paddingHorizontal: 10,
    },
    optionsCardImage: {
      height: 140,
      borderRadius: 10,
      width: '100%',
    },
    optionListsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
      paddingHorizontal: 10,
    },
    categoryListText: {
      fontSize: 16,
     
      color: COLORS.grey,
     padding:12,

    },
    activeCategoryListText: {
      backgroundColor:COLORS.blue,
     paddingHorizontal:12,
      textDecorationLine:'none',
      borderRadius: 12,
      color: COLORS.white,
      
      
    },
    categoryListContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 15,
      paddingHorizontal: 10,
    },
    CardHouseCont: {
      height: 110,
      flexDirection:'row',
      gap:10,
      justifyContent:'space-between',
      backgroundColor: COLORS.white,
      // elevation: 10,
      width: '95%',
      marginRight: 20,
      padding: 15,
      borderRadius: 20, 
      padding:10,
      
    },
    cardImages:{
       width:120,
       height:90,
       borderRadius:10,
    },
   
    facility: {flexDirection: 'row', marginRight: 15},
    facilityText: {marginLeft: 5, color: COLORS.grey},
  });
  export default HomeScreen;
  
  
    