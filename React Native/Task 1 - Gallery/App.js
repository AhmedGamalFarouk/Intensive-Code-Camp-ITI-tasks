import React, { useState, useRef } from 'react';
import { ScrollView, StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';

const images = [
  require('./assets/1.jpg'),
  require('./assets/2.jpg'),
  require('./assets/3.jpg'),
  require('./assets/4.jpg'),
  require('./assets/5.jpg'),
  require('./assets/6.jpg'),
  require('./assets/7.jpg'),
  require('./assets/8.jpg'),
  require('./assets/9.jpg'),
  require('./assets/10.jpg'),
  require('./assets/11.jpg'),
  require('./assets/12.jpg'),
  require('./assets/13.jpg'),
  require('./assets/14.jpg'),
];

const { width } = Dimensions.get('window');

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef(null);

  const handleThumbnailPress = (index) => {
    setActiveIndex(index);
    scrollViewRef.current.scrollTo({ x: index * width, animated: true });
  };

  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / width);
    setActiveIndex(index);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Image Gallery</Text>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
      >
        {images.map((image, index) => (
          <View key={index} style={styles.imageContainer}>
            <Image source={image} style={styles.image} />
          </View>
        ))}
      </ScrollView>

      <View style={styles.thumbnailContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {images.map((image, index) => (
            <TouchableOpacity key={index} onPress={() => handleThumbnailPress(index)}>
              <Image
                source={image}
                style={[
                  styles.thumbnail,
                  index === activeIndex && styles.activeThumbnail,
                ]}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  imageContainer: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width,
    height: width,
    resizeMode: 'cover',
  },
  thumbnailContainer: {
    position: 'absolute',
    bottom: 20,
    height: 80,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 5,
    marginHorizontal: 5,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  activeThumbnail: {
    borderColor: 'blue',
  },
});
