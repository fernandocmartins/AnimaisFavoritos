import React from 'react';
import { SafeAreaView } from 'react-native';
import AnimalList from './src/components/AnimalList';

const App: React.FC = () => {
  return (
    <SafeAreaView>
      <AnimalList />
    </SafeAreaView>
  );
};

export default App;
