import React from 'react';
import { View, Text, SectionList, StyleSheet } from 'react-native';

const dummyContacts = [
  { name: 'Alice Smith', id: '1' },
  { name: 'Bob Johnson', id: '2' },
  { name: 'Charlie Brown', id: '3' },
  { name: 'David Lee', id: '4' },
  { name: 'Eve Davis', id: '5' },
  { name: 'Frank White', id: '6' },
  { name: 'Grace Taylor', id: '7' },
  { name: 'Henry Wilson', id: '8' },
  { name: 'Ivy Moore', id: '9' },
  { name: 'Jack Green', id: '10' },
  { name: 'Karen Hall', id: '11' },
  { name: 'Liam King', id: '12' },
  { name: 'Mia Wright', id: '13' },
  { name: 'Noah Scott', id: '14' },
  { name: 'Olivia Adams', id: '15' },
  { name: 'Peter Baker', id: '16' },
  { name: 'Quinn Nelson', id: '17' },
  { name: 'Rachel Carter', id: '18' },
  { name: 'Sam Roberts', id: '19' },
  { name: 'Tina Evans', id: '20' },
  { name: 'Uma Phillips', id: '21' },
  { name: 'Victor Campbell', id: '22' },
  { name: 'Wendy Parker', id: '23' },
  { name: 'Xavier Collins', id: '24' },
  { name: 'Yara Edwards', id: '25' },
  { name: 'Zoe Stewart', id: '26' },
];

const getSections = (contacts) => {
  const sectionsMap = contacts.reduce((acc, contact) => {
    const firstLetter = contact.name[0].toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(contact);
    return acc;
  }, {});

  const sortedKeys = Object.keys(sectionsMap).sort();
  return sortedKeys.map((key) => ({
    title: key,
    data: sectionsMap[key].sort((a, b) => a.name.localeCompare(b.name)),
  }));
};

const ContactsScreen = () => {
  const sections = getSections(dummyContacts);

  const renderItem = ({ item }) => (
    <View style={styles.contactItem}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{item.name[0].toUpperCase()}</Text>
      </View>
      <Text style={styles.contactName}>{item.name}</Text>
    </View>
  );

  const renderSectionHeader = ({ section: { title } }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderText}>{title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        stickySectionHeadersEnabled
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    paddingTop: 50, // Adjust for status bar
  },
  sectionHeader: {
    backgroundColor: '#e0e0e0',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  sectionHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  avatarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  contactName: {
    fontSize: 16,
    color: '#333',
  },
});

export default ContactsScreen;