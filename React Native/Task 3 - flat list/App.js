import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';

const DATA = [
  {
    id: '1',
    color: 'Pastel Rose',
    hex: '#F8B195',
  },
  {
    id: '2',
    color: 'Pastel Mint',
    hex: '#F67280',
  },
  {
    id: '3',
    color: 'Pastel Blue',
    hex: '#C06C84',
  },
  {
    id: '4',
    color: 'Pastel Lilac',
    hex: '#6C5B7B',
  },
  {
    id: '5',
    color: 'Pastel Peach',
    hex: '#FFDAB9',
  },
  {
    id: '6',
    color: 'Pastel Lemon',
    hex: '#FFFACD',
  },
  {
    id: '7',
    color: 'Pastel Lavender',
    hex: '#E6E6FA',
  },
  {
    id: '8',
    color: 'Pastel Aqua',
    hex: '#B0E0E6',
  },
];

const Item = ({ color, hex }) => (
  <View style={[styles.item, { backgroundColor: hex }]}>
    <Text style={styles.title}>{color}</Text>
  </View>
);

export default function App() {
  return (
    <View style={[styles.container, { paddingTop: 70 }]}>
      <FlatList
        data={DATA}
        renderItem={({ item }) => <Item color={item.color} hex={item.hex} />}
        keyExtractor={item => item.id}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
  },
});
