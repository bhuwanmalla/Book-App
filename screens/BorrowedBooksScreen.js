import { React, useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { db } from '../firebase';
import { collection, onSnapshot, doc, deleteDoc } from 'firebase/firestore';

export default function BorrowedScreen() {
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  useEffect(() => {
    const borrowedBooksCollection = collection(db, 'borrowedBooks');
    const unsubscribe = onSnapshot(borrowedBooksCollection, snapshot => {
      const books = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBorrowedBooks(books);
    });
    return () => unsubscribe();
  }, []);

  const returnBook = async (bookId) => {
    await deleteDoc(doc(db, 'borrowedBooks', bookId));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={borrowedBooks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image
              source={{ uri: item.coverPage }}
              style={styles.bookImage}
            />
            <View style={styles.cardContent}>
              <Text style={styles.bookName}>{item.name}</Text>
              <Text style={styles.bookAuthor}>{item.author}</Text>
              <TouchableOpacity
                style={styles.returnButton}
                onPress={() => returnBook(item.id)}
              >
                <Text style={styles.returnButtonText}>Return</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyMessage}>No borrowed books</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f2f2f2',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
    flexDirection: 'row',
  },
  bookImage: {
    width: 100,
    height: 150,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  cardContent: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  bookName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 8,
  },
  bookAuthor: {
    fontSize: 16,
    color: '#888',
    marginBottom: 16,
  },
  returnButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ff6347',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  returnButtonText: {
    color: '#ffffff',
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyMessage: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: '#000000',
  },
});
