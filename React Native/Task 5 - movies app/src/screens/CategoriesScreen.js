import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getGenres, getMoviesByGenre } from '../api/movieDb';
import CategoryCard from '../components/CategoryCard';
import MovieCard from '../components/MovieCard';

const CategoriesScreen = ({ navigation }) => {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      const genresData = await getGenres();
      setGenres(genresData);
    };
    fetchGenres();
  }, []);

  const handleSelectGenre = async (genreId) => {
    setSelectedGenre(genreId);
    const moviesData = await getMoviesByGenre(genreId);
    setMovies(moviesData);
  };

  return (
    <View style={styles.container}>
      <FlatList
        key={selectedGenre ? 'movies' : 'genres'}
        data={selectedGenre ? movies : genres}
        renderItem={({ item }) =>
          selectedGenre ? (
            <MovieCard movie={item} isSearchResult />
          ) : (
            <CategoryCard
              category={item}
              onPress={() => handleSelectGenre(item.id)}
            />
          )
        }
        keyExtractor={(item) => item.id.toString()}
        numColumns={selectedGenre ? 2 : 1}
        contentContainerStyle={selectedGenre ? styles.movieList : {}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1f1d2b',
    padding: 10,
  },
  movieList: {
    paddingHorizontal: 5,
  },
});

export default CategoriesScreen;
