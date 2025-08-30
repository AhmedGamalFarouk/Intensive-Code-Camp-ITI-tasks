import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const TabBar = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.tab}>
        <Ionicons name="home" size={24} color="#12cdd9" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.tab}>
        <Ionicons name="search" size={24} color="#8e8e8e" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.tab}>
        <Ionicons name="download-outline" size={24} color="#8e8e8e" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.tab}>
        <Ionicons name="person-outline" size={24} color="#8e8e8e" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#2a2837',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#3a3847',
  },
  tab: {
    alignItems: 'center',
  },
});

export default TabBar;
