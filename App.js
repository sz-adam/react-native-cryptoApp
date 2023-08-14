import React from 'react';
import Navigation from './src/navigation/Navigation';
import { FavoritProvider } from './src/context/FavoritesContext';

export default function App() {
  return (
    <FavoritProvider>
      <Navigation />
    </FavoritProvider>
  );
}
