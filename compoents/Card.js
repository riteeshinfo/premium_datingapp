import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,ImageBackground, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import {HeartIcon} from 'react-native-heroicons/outline';
const  Card =(props)=>{
    const {name,gender,bio,image} = props.user
    const [isfav,fav] = useState(false)
    return(

        
        <View style={styles.card}>
        
         <ImageBackground source={{uri: image,}} style= {styles.image}>
         <TouchableOpacity onPress={() => fav(!isfav) } >
            <HeartIcon size="50" color={isfav ? 'red' : 'white'} />
  
          </TouchableOpacity>
          <View style={styles.details}>
            <Text style={styles.name} >{name} </Text>
            <Text style= {styles.gender}> {gender}</Text >
            <Text style={styles.bio}> {bio} </Text>
            </View>
           </ImageBackground>
          <StatusBar style="auto" />
        </View>
      
    );
}
const styles = StyleSheet.create({
    
  
    
    image:{
      width:'100%',
      height:'100%',
      borderRadius:10,
      overflow:'hidden',
      justifyContent:'flex-end'
    },
    card:{
      width:'85%',
      height:'70%',
      
      borderRadius:10,
      shadowColor: "#000",
  shadowOffset: {
      width: 0,
      height: 6,
  },
  shadowOpacity: 0.37,
  shadowRadius: 7.49,
  
  elevation: 12,
    },
    name:{
      fontSize:30,
      color:'white',
      fontWeight:'bold',
  
    },
    gender:{
      fontSize:25,
      color:'white',
      fontWeight:'bold',
    },
    bio:{
      fontSize:18,
      color:'white',
      fontWeight:'bold',
    },
    details:{
      padding:10,
    }
  
  
  });
  export default Card;