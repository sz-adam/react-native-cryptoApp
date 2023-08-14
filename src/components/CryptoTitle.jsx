import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useFavoritContext } from '../context/FavoritesContext'; 

const CryptoTitle = ({ coins }) => {
  const navigation = useNavigation();
  const { addFavorite, removeFavorite,isFavorite } = useFavoritContext(); 



  return (
    <View style={styles.container}>
      <ScrollView showsHorizontalScrollIndicator={false}>
        <View style={styles.cardContainer}>
          {coins.map((coin) => (
            <TouchableOpacity
              key={coin.id}
              style={styles.card}
              onPress={() =>
                navigation.navigate('CoinDetails', { coin, coinName: coin.name })
              }
            >
              <Text style={styles.name}>{coin.name}</Text>
              <Icon
                name={isFavorite(coin.id) ? 'heart' : 'heart-outline'}
                size={36}
                style={styles.icon}
                onPress={() => {
                  if (isFavorite(coin.id)) {
                    removeFavorite(coin.id);
                  } else {
                    addFavorite(coin);
                  }
                }}
              />
              <Image source={{ uri: coin.icon }} style={{ width: 50, height: 50 }} />
              <Text style={styles.name}>{coin.price.toFixed(2)}</Text>
              <Text style={[coin.priceChange1h >= 0 ? styles.positiveChange : styles.negativeChange]}>
              {coin.priceChange1h} $
            </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '45%',
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
  },

  icon: {
    position: 'absolute',
    right: 5,
    top: 5,
    color:'red',
  },
  name: {
    fontWeight: 'bold',
    paddingVertical: 5,
  },
  positiveChange: {
    color: 'green', 
  },
  negativeChange: {
    color: 'red',
  },
});

export default CryptoTitle;
