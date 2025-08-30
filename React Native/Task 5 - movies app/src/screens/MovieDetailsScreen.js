import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const MovieDetailsScreen = ({ route }) => {
  const { movie } = route.params;
  const navigation = useNavigation();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const checkIsFavorite = async () => {
      try {
        const favoritesJson = await AsyncStorage.getItem('favorites');
        if (favoritesJson) {
          const favorites = JSON.parse(favoritesJson);
          const isFav = favorites.some((favMovie) => favMovie.id === movie.id);
          setIsFavorite(isFav);
        }
      } catch (error) {
        console.error('Error checking favorite status:', error);
      }
    };

    checkIsFavorite();
  }, [movie.id]);

  const toggleFavorite = async () => {
    try {
      const favoritesJson = await AsyncStorage.getItem('favorites');
      let favorites = favoritesJson ? JSON.parse(favoritesJson) : [];

      if (isFavorite) {
        favorites = favorites.filter((favMovie) => favMovie.id !== movie.id);
      } else {
        favorites.push(movie);
      }

      await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Image
            source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
            style={styles.poster}
          />
          <View style={styles.headerOverlay}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Icon name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.movieTitle}>{movie.title}</Text>
            <TouchableOpacity
              style={styles.favoriteButton}
              onPress={toggleFavorite}
            >
              <Icon
                name={isFavorite ? 'heart' : 'heart-outline'}
                size={24}
                color={isFavorite ? '#fb4141' : '#fff'}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.detailsContainer}>
          <View style={styles.metaContainer}>
            <Text style={styles.metaText}>
              <Icon name="calendar" size={16} color="#8e8e8e" /> {new Date(movie.release_date).getFullYear()}
            </Text>
            <Text style={styles.metaText}>
              <Icon name="time" size={16} color="#8e8e8e" /> 148 Minutes
            </Text>
            <Text style={styles.metaText}>
              <Icon name="film" size={16} color="#8e8e8e" /> Action
            </Text>
          </View>
          <View style={styles.ratingContainer}>
            <Icon name="star" size={16} color="#ffc107" />
            <Text style={styles.ratingText}>{movie.vote_average.toFixed(1)}</Text>
          </View>
          <View style={styles.actionsContainer}>
            <TouchableOpacity style={styles.playButton}>
              <Icon name="play" size={24} color="#fff" />
              <Text style={styles.playButtonText}>Play</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Icon name="download" size={24} color="#12cdd9" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Icon name="share-social" size={24} color="#12cdd9" />
            </TouchableOpacity>
          </View>
          <View style={styles.storyLineContainer}>
            <Text style={styles.sectionTitle}>Story Line</Text>
            <Text style={styles.storyLineText}>{movie.overview}</Text>
          </View>

        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1f1d2b',
  },
  header: {
    height: 400,
  },
  poster: {
    width: '100%',
    height: '100%',
  },
  headerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'space-between',
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  favoriteButton: {
    position: 'absolute',
    top: 40,
    right: 20,
  },
  movieTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
    position: 'absolute',
    top: 40,
  },
  detailsContainer: {
    padding: 20,
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  metaText: {
    color: '#8e8e8e',
    fontSize: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  ratingText: {
    color: '#ffc107',
    fontSize: 16,
    marginLeft: 5,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  playButton: {
    flexDirection: 'row',
    backgroundColor: '#12cdd9',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 25,
    alignItems: 'center',
  },
  playButtonText: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 10,
  },
  actionButton: {
    backgroundColor: '#2a2837',
    padding: 15,
    borderRadius: 25,
  },
  storyLineContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  storyLineText: {
    color: '#8e8e8e',
    fontSize: 16,
  },
  castContainer: {},
});

export default MovieDetailsScreen;
