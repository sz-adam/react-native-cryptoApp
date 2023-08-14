import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CoinDetailsScreen = ({ route }) => {
  const { coin } = route.params;
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image source={{ uri: coin.icon }} style={{ width: 100, height: 100 }} />
      <Text style={styles.name}>{coin.name}</Text>
      <Text style={styles.price}>{coin.price.toFixed(2)} $</Text>
      <View>
        <Text style={styles.priceCh}>Price change</Text>
        <View style={styles.priceChanges}>
          <View style={styles.priceChange}>
            <Text style={styles.priceText}>Change 1h: </Text>
            <Text style={[styles.price, coin.priceChange1h >= 0 ? styles.positiveChange : styles.negativeChange]}>
              {coin.priceChange1h} $
            </Text>
          </View>
          <View style={styles.priceChange}>
            <Text style={styles.priceText}>Change 1d: </Text>
            <Text style={[styles.price, coin.priceChange1d >= 0 ? styles.positiveChange : styles.negativeChange]}>
              {coin.priceChange1d} $
            </Text>
          </View>
          <View style={styles.priceChange}>
            <Text style={styles.priceText}>Change 1w: </Text>
            <Text style={[styles.price, coin.priceChange1w >= 0 ? styles.positiveChange : styles.negativeChange]}>
              {coin.priceChange1w} $
            </Text>
          </View>

        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 5,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 20,
    marginVertical: 10,
  },
  priceCh: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  priceChanges: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  priceChange: {
    flexDirection: 'column',
    marginVertical: 5,
    marginHorizontal: 10,
    alignItems: 'center',
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 5,
    marginBottom: 10,
  },
  price: {
    fontSize: 16,
    fontWeight: '500',
  },
  positiveChange: {
    color: 'green',
  },
  negativeChange: {
    color: 'red',
  },
});

export default CoinDetailsScreen;
