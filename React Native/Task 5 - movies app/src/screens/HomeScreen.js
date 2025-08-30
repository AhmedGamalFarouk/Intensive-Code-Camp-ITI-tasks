import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MovieCard from '../components/MovieCard';
import SectionHeader from '../components/SectionHeader';
import SearchBar from '../components/SearchBar';
import { getPopularMovies, getUpcomingMovies, getTopRatedMovies, searchMovies } from '../api/movieDb';

const HomeScreen = ({ navigation }) => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      const popular = await getPopularMovies();
      setPopularMovies(popular);
      const upcoming = await getUpcomingMovies();
      setUpcomingMovies(upcoming);
      const topRated = await getTopRatedMovies();
      setTopRatedMovies(topRated);
    };
    fetchMovies();
  }, []);

  const handleSearch = async (query) => {
    if (query) {
      const results = await searchMovies(query);
      setSearchResults(results);
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello, Ahmed</Text>
          <Text style={styles.subtitle}>Let's stream your favorite movie</Text>
        </View>
        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={() => navigation.navigate('Favorites')}>
            <Icon name="heart-outline" size={30} color="#fff" style={styles.icon} />
          </TouchableOpacity>
          <Image
            source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
            style={styles.avatar}
          />
        </View>
      </View>
      <SearchBar onSearch={handleSearch} />
      {isSearching ? (
        <FlatList
          data={searchResults}
          renderItem={({ item }) => <MovieCard movie={item} isSearchResult />}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.searchList}
        />
      ) : (
        <ScrollView>
          <SectionHeader title="Most popular" onSeeAll={() => {}} />
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={popularMovies}
            renderItem={({ item }) => <MovieCard movie={item} />}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.movieList}
          />
          <SectionHeader title="Upcoming" onSeeAll={() => {}} />
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={upcomingMovies}
            renderItem={({ item }) => <MovieCard movie={item} />}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.movieList}
          />
          <SectionHeader title="Top Rated" onSeeAll={() => {}} />
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={topRatedMovies}
            renderItem={({ item }) => <MovieCard movie={item} />}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.movieList}
          />
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1f1d2b',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 50,
    paddingBottom: 20,
  },
  greeting: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#8e8e8e',
    fontSize: 16,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  carouselContainer: {
    marginHorizontal: 15,
    borderRadius: 10,
    overflow: 'hidden',
    height: 200,
    marginBottom: 20,
  },
  carouselImage: {
    width: '100%',
    height: '100%',
  },
  carouselTextContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
  carouselTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  carouselSubtitle: {
    color: '#fff',
    fontSize: 14,
  },
  movieList: {
    paddingLeft: 15,
  },
  searchList: {
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
});

export default HomeScreen;
