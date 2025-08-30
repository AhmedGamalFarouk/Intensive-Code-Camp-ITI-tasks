import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MovieCard = ({ movie, isSearchResult }) => {
  const navigation = useNavigation();
  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  return (
    <TouchableOpacity
      style={[styles.container, isSearchResult && styles.searchResultContainer]}
      onPress={() => navigation.navigate('MovieDetails', { movie })}
    >
      <Image source={{ uri: posterUrl }} style={styles.poster} />
      <View style={styles.ratingContainer}>
        <Text style={styles.rating}>{movie.vote_average.toFixed(1)}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.releaseDate}>{new Date(movie.release_date).getFullYear()}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 150,
    marginRight: 15,
    marginBottom: 15,
  },
  searchResultContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
  poster: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  ratingContainer: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 5,
  },
  rating: {
    color: '#12cdd9',
    fontSize: 12,
  },
  infoContainer: {
    marginTop: 10,
  },
  title: {
    color: '#fff',
    fontSize: 16,
  },
  releaseDate: {
    color: '#8e8e8e',
    fontSize: 12,
    marginTop: 5,
  },
});

export default MovieCard;
