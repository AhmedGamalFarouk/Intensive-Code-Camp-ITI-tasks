import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CategoryButton = ({ title, active, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.button, active && styles.activeButton]}
      onPress={onPress}
    >
      <Text style={[styles.text, active && styles.activeText]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: '#2a2837',
    marginHorizontal: 5,
  },
  activeButton: {
    backgroundColor: '#12cdd9',
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
  activeText: {
    color: '#fff',
  },
});

export default CategoryButton;
