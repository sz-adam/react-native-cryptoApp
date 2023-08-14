import { View, StyleSheet, TextInput, Image, SafeAreaView,ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CryptoTitle from './CryptoTitle';
import { ScrollView } from 'react-native-gesture-handler';
import { useFavoritContext } from '../context/FavoritesContext'; 


const Crypto = () => {
    const { updateFavorites } = useFavoritContext();
    const [coins, setCoins] = useState([])
    const [filteredCoins, setFilteredCoins] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    function updateCurrency() {
        axios.get("api")
            .then(res => {
                setCoins(res.data.coins)
                setFilteredCoins(res.data.coins)       
                updateFavorites(res.data.coins)   
                setIsLoading(false);
            });
    }

    useEffect(() => {
        let intervalHandler = setInterval(updateCurrency, 20000);
        return () => {
          clearInterval(intervalHandler);
        }
      });

    
    const handleSearch = (text) => {
        if (text === '') {
            setFilteredCoins(coins); 
        } else {
            const filtered = coins.filter(coin =>
                coin.name.toLowerCase().includes(text.toLowerCase())
            );
            setFilteredCoins(filtered);
        }
    };

    

    return (

        <SafeAreaView style={styles.container}>
        <ScrollView>
            <View style={styles.cryptoContainer}>
                <Image
                    source={require('../images/crypto.jpg')}
                    style={{
                        width: '100%',
                        height: 200,
                        resizeMode: 'cover',
                    }}
                />
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Crypto Name"
                        onChangeText={text => {
                            handleSearch(text);
                          }}
                    />
                </View>
                {isLoading ? ( 
                        <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />
                    ) : (
                        <View style={styles.cardContainer}>
                            <CryptoTitle coins={filteredCoins} style={styles.crypto} />
                        </View>
                    )}
            </View>
        </ScrollView>
    </SafeAreaView>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    cryptoContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 20, 
        paddingBottom: 20,
    },
    inputContainer: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 15,
        padding: 10,
        width: '80%',
        marginVertical:10,
   
    },
    textInput: {
        textAlign: 'center',
    },
    cardContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
});




export default Crypto