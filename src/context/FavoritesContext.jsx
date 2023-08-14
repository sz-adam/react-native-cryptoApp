import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavoritContext = createContext();

export const useFavoritContext = () => {
  return useContext(FavoritContext);
};

export const FavoritProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const isFavorite = (coinId) => favorites.some((coin) => coin.id === coinId);


  const updateFavorites = (updatedCoins) => {
    const updatedFavorites = updatedCoins.filter((updatedCoin) =>
      favorites.some((favorite) => favorite.id === updatedCoin.id)
    );
    setFavorites(updatedFavorites);
  };

  useEffect(() => {
    // load AsyncStorage
    const fetchData = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem('favorites');
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    // save to AsyncStorage
    const saveData = async () => {
      try {
        await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
      } catch (error) {
        console.error('error:', error);
      }
    };
    saveData();
  }, [favorites]);

  const addFavorite = (coin) => {
    setFavorites((prevFavorites) => [...prevFavorites, coin]);
  };

  const removeFavorite = (coinId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((coin) => coin.id !== coinId)
    );
  };

  return (
    <FavoritContext.Provider value={{ favorites,updateFavorites, addFavorite, removeFavorite,isFavorite }}>
      {children}
    </FavoritContext.Provider>
  );
};
