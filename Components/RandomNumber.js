import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from 'react';

export default RandomNumber = ({id, number, isSelected, onSelected}) => {

     const handlePress=()=> {
          console.info ('number',number);
          
          if (!isSelected){
               onSelected (id);
          }
     }

     return(
          <TouchableOpacity onPress={handlePress}>
               <Text style={[styles.random, isSelected && styles.selected]}>{number}</Text>
          </TouchableOpacity>
     );

}// end RandomNumber

const styles = StyleSheet.create({
     random:{
          backgroundColor: '#78D383',
          width: 100,
          minHeight: 45,
          marginHorizontal: 15,
          marginVertical: 25,
          fontSize: 35,
          textAlign: 'center',
     },
     selected:{
          opacity: 0.3,
          backgroundColor: '#B7D8BB',
     },
});