import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Animal } from '../models/Animal';
import Icon from 'react-native-vector-icons/FontAwesome';

const AnimalList: React.FC = () => {
  const [animals, setAnimals] = useState<Animal[]>([]);

  useEffect(() => {
    async function loadAnimals() {
      const storedAnimals = await AsyncStorage.getItem('animals');
      if (storedAnimals) {
        setAnimals(JSON.parse(storedAnimals));
      } else {
        setAnimals([
            { id: 1, name: 'Cachorro', image: 'https://img.freepik.com/fotos-gratis/close-de-um-filhote-de-cachorro-golden-retriever-fofo-isolado-em-uma-superficie-branca_181624-40949.jpg?w=1480&t=st=1679863876~exp=1679864476~hmac=87199187ffe5f44fddf672577380ea6c813e2a0b30d091ee9ef57e272411bf1d', isFavorite: false },
            { id: 2, name: 'Gato', image: 'https://img.freepik.com/fotos-gratis/close-de-um-gatinho-ruivo-fofo-olhando-para-a-camera-isolada-em-uma-parede-branca_181624-45452.jpg?w=2000&t=st=1679863907~exp=1679864507~hmac=5ade2ceee8540b3d1210bec03dfded540ad0e9606753f78a1732d4675932e5cf', isFavorite: false },
            { id: 3, name: 'Hamster', image: 'https://img.freepik.com/fotos-gratis/porquinho-da-india-fofo-usando-oculos-escuros_23-2148865704.jpg?w=2000&t=st=1679863930~exp=1679864530~hmac=0c30d01c61102831c7bc4a399e8400fc3b0845bd3b6f7e73fbe3c692692084e1', isFavorite: false },
            { id: 4, name: 'Papagaio', image: 'https://img.freepik.com/fotos-gratis/amazona-de-frente-turquesa-amazona-aestiva-em-estado-selvagem_181624-35286.jpg?w=2000&t=st=1679863981~exp=1679864581~hmac=0983a85e326abcd6fa3e20b7bb63da7fdabcc4a89c617f6902d6898649c57443', isFavorite: false },
            { id: 5, name: 'Coelho', image: 'https://img.freepik.com/fotos-gratis/retrato-de-um-fofo-coelho-cinza-fofo-com-orelhas-em-uma-grama-verde-natural_78492-3948.jpg?w=2000&t=st=1679864032~exp=1679864632~hmac=099fc029f898563acd107ae9d849068ea42358b30fe6adb455dfb71027b34cc2', isFavorite: false },
            { id: 6, name: 'Cobra', image: 'https://img.freepik.com/fotos-gratis/boiga-cobra-dendrofila-com-aneis-amarelos_488145-196.jpg?w=2000&t=st=1679864061~exp=1679864661~hmac=43cdf4431618971330a7f52fb53bfa2fb0477d0c777c0bff6838d02ca942d946', isFavorite: false },
            { id: 7, name: 'Peixe', image: 'https://img.freepik.com/fotos-gratis/foto-seletiva-do-peixe-cichlidae-amarelo-do-aquario_181624-35618.jpg?w=2000&t=st=1679864089~exp=1679864689~hmac=5963be5ce83a02fae8d86823c8cc75959ddd49f3882959dc539011ef3e1c8f77', isFavorite: false },
            { id: 8, name: 'Cavalo', image: 'https://img.freepik.com/fotos-gratis/lindo-cavalo-castanho_144627-19417.jpg?w=1060&t=st=1679863821~exp=1679864421~hmac=ed3728656829c502092e08d82bad647fc70b95287864b62c2a739049ebf543bb', isFavorite: false },
          ]);
      }
    }
    loadAnimals();
  }, []);

  const toggleFavorite = (id: number) => {
    const updatedAnimals = animals.map((animal) =>
      animal.id === id ? { ...animal, isFavorite: !animal.isFavorite } : animal,
    );
    setAnimals(updatedAnimals);
    AsyncStorage.setItem('animals', JSON.stringify(updatedAnimals));
  };

  const renderAnimal = ({ item }: { item: Animal }) => (
    <View style={styles.animalContainer}>
      <Image source={{ uri: item.image }} style={styles.animalImage} />
      <View style={styles.animalInfoContainer}>
        <Text style={styles.animalName}>{item.name}</Text>
        <TouchableOpacity onPress={() => toggleFavorite(item.id)} style={styles.favoriteContainer}>
          <Icon name={item.isFavorite ? 'heart' : 'heart-o'} size={20} color="#2F80ED" />
          <Text style={styles.favoriteText}>{item.isFavorite ? 'Favorito' : 'Adicionar aos favoritos'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  

  return (
    <FlatList
      data={animals}
      renderItem={renderAnimal}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  animalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  favoriteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  favoriteText: {
    marginLeft: 5,
  },
  
  animalImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  animalInfoContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  animalName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  favoriteButton: {
    color: '#2F80ED',
    fontWeight: 'bold',
  },
});

export default AnimalList;
