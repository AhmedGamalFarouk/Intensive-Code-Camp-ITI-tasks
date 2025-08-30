import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <View style={styles.container}>
      <Ionicons name="search" size={20} color="#8e8e8e" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder="Search a title.."
        placeholderTextColor="#8e8e8e"
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={handleSearch}
      />
      <Ionicons name="options" size={20} color="#8e8e8e" style={styles.icon} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2837',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginHorizontal: 15,
    marginVertical: 10,
  },
  icon: {
    marginHorizontal: 5,
  },
  input: {
    flex: 1,
    color: '#fff',
    paddingVertical: 10,
  },
});

export default SearchBar;
