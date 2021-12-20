import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Game from './Components/Game';

export default function App() {
  return (
    <>
      <View style={styles.container}>
        <Game randomNumbersCount={6}
          initialSeconds={15}/>
        <StatusBar style="auto" />

      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 50,
    maxHeight: 600,
  },
  newGame:{
    alignSelf:'center',
    paddingHorizontal:19,
    paddingVertical: 27,
    height:100,
    width:200,
    maxWidth:600,
    backgroundColor: '#02E446',
    borderRadius: 10,
  },
  fontButton:{
    fontSize: 30,
    fontWeight:'bold',
    color: '#fff',
    alignContent:'center',
  }
});
