import { View, Text, StyleSheet,ImageBackground,Button } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import backGroundImage from '../images/backGroundImage.jpg'

const Welcome = ({ navigation }) => {
  return (
    <View style={styles.container}>     
     <ImageBackground source={backGroundImage} style={styles.backGroundImage}>
      <View >   
     
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.contentContainer}>
          <Text style={styles.text}> Go to Crypto</Text>          
        </TouchableOpacity>
      
      </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,  
  },
  backGroundImage:{
    flex: 1,
    resizeMode: 'cover', 
    justifyContent: 'center', 
    alignItems: 'center',
  },
 
  contentContainer: {    
    backgroundColor: 'rgb(14 165 233)',
    padding: 10,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'darkblue',

  },
  text:{
    fontSize: 24, 
    color: 'rgb(229 229 229)', 
    fontWeight:'bold',
    textAlign:'center',
  }
});

export default Welcome;
