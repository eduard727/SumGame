
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect } from "react";
import RandomNumber from './RandomNumber';
import shuffle from 'lodash.shuffle';

let intervalId;

export default Game = ({randomNumbersCount, initialSeconds}) => {
     // maneja botones seleccionados por medio de hooks.
     const [ selectedNumbers, setSelectedNumbers] = useState( [] );

     const [ randomNumbers, setRandomNumbers ] = useState ( [] );

     const [ target, setTarget ] = useState (1);// no puede iniciar en cero

     const [ remaingSeconds, setRemainingSeconds] = useState(initialSeconds);

     const [ gameStatus, setGameStatus] = useState ('Playing');

     // const randomNumbers = Array.from({ length: randomNumbersCount}).map(() => 1+ Math.floor (10* Math.random() ) );
     // // acc= acumulador
     // const target = randomNumbers.slice( 0, randomNumbersCount -2).reduce((acc,cur) => acc + cur, 0);

     let gameNumber =1;
     useEffect(() => {
          const firstRandomNumbers = Array.from({length: randomNumbersCount}).map(() => 1 + Math.floor(10 * Math.random()));
          const firstTarget = firstRandomNumbers.slice( 0, randomNumbersCount -2).reduce((acc,cur) => acc + cur, 0);

          const shuffleRandomNumbers = shuffle(firstRandomNumbers);

          setRandomNumbers(shuffleRandomNumbers);
          setTarget(firstTarget)

          intervalId = setInterval (() => setRemainingSeconds( (seconds) => seconds-1 ), 1000);

          return () => clearInterval(intervalId);
          
     }, [])

     useEffect(() => {
          setGameStatus(() => getGameStatus());
          if (remaingSeconds === 0 || gameStatus !== 'Playing'){
               clearInterval(intervalId);
          }
     }, [remaingSeconds, selectedNumbers]);

     // some() =recorre y se detiene cuando encuentra y devuelve true
     const isNumberSelected = numberIndex => selectedNumbers.some( number => number === numberIndex );

     const selectedNumber = number => setSelectedNumbers( [ ...selectedNumbers, number] );

     const getGameStatus = () => {
          const numSelected = selectedNumbers.reduce ((acc, cur) => acc + randomNumbers[cur],0);

          if (remaingSeconds===0 || numSelected > target){
               return 'Lose';
          }else if (numSelected === target) {
               return 'Won';
          }else {
               return 'Playing';
          }
     }

     //const status = gameStatus();
     return(
          
          <View>
               <Text style={[styles.target, styles[gameStatus]]}>Math Game</Text>

               <Text style={styles.infoGame}>{gameStatus}</Text>
               <Text style={styles.infoGame}>{remaingSeconds}</Text>
               <Text style={styles.target}> {target} </Text>

               <View style={styles.randomContainer}>
                    {randomNumbers.map((randomNumber, index) => (
                         <RandomNumber key={index} id={index} number={randomNumber} isSelected={isNumberSelected(index) || gameStatus !== 'Playing'} onSelected={selectedNumber} />
                    ))}
               </View>
          </View>
     
     );
};// End Game //

////////////////////////////////////////////////////// S T Y L E S ///////////////////////////////////

const styles = StyleSheet.create({
     
     target:{
          marginVertical: 30,
          fontSize: 40,
          backgroundColor: '#96CCD0',
          textAlign: 'center',
     },
     randomContainer:{
          flex:1,
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: "space-between",
     },
     Playing: {
          backgroundColor: 'yellow',
     },
     Won: {
          backgroundColor: 'green',
     },
     Lose: {
          backgroundColor: 'red',
     },
     infoGame: {
          fontSize: 30,
          textAlign: 'center',
     }
});