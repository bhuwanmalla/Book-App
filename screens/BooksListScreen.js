import { React, useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { db } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';

export default function BooksListScreen() {
  const [books, setBooks] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const booksCollection = collection(db, 'books');
    const storeData = onSnapshot(booksCollection, snapshot => {
      const booksData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBooks(booksData);
    });
    return () => storeData();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Book Detail', { bookId: item.id })}
            style={styles.item}
          >
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.author}>{item.author}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f7f7f7',
  },
  item: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000000',
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
  author: {
    fontSize: 16,
    color: '#524C42',
    marginTop: 4,
  },
});
