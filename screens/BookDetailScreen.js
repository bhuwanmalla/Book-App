import { React, useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { db } from '../firebase';
import { getAuth } from 'firebase/auth';
import { doc, getDoc, setDoc, collection, query, where, getDocs } from 'firebase/firestore';

export default function BookDetailScreen() {
  const [book, setBook] = useState(null);
  const route = useRoute();
  const { bookId } = route.params;

  useEffect(() => {
    const fetchBook = async () => {
      const bookDoc = doc(db, 'books', bookId);
      const docSnap = await getDoc(bookDoc);
      if (docSnap.exists()) {
        setBook(docSnap.data());
      }
    };

    fetchBook();
  }, [bookId]);
  const handleBorrow = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const userId = user.uid;

    try {
      const borrowedBooksCollection = collection(db, 'borrowedBooks');
      const borrowedBooksQuery = query(borrowedBooksCollection, where('userId', '==', userId));
      const borrowedBooksSnapshot = await getDocs(borrowedBooksQuery);

      if (borrowedBooksSnapshot.size >= 3) {
        Alert.alert('Borrowing Limit Reached', 'You cannot borrow more than 3 books at a time. Please return the previous books to borrow other.');
        return;
      }

      const borrowedBookRef = doc(db, 'borrowedBooks', `${userId}_${bookId}`);
      const borrowedBookDoc = await getDoc(borrowedBookRef);

      if (borrowedBookDoc.exists()) {
        Alert.alert('Already Borrowed', 'You have already borrowed this book.');
        return;
      }

      await setDoc(borrowedBookRef, {
        ...book,
        userId: userId,
        borrowedAt: new Date(),
        bookID: bookId,
      });

      Alert.alert('Success', 'Book borrowed successfully!');
    } catch (error) {
      Alert.alert('Error', 'Unable to borrow book. Please try again.');
    }
  };


  return (
    <View style={styles.container}>
      <Image source={{ uri: book?.coverPage }} style={styles.coverImage} resizeMode="contain" />
      <Text style={styles.title}>{book?.name}</Text>
      <Text style={styles.author}>Author: {book?.author}</Text>
      <Text style={styles.rating}>Rating: {book?.rating}</Text>
      <Text style={styles.summary}>{book?.summary}</Text>
      <TouchableOpacity style={styles.borrowButton} onPress={handleBorrow}>
        <Text style={styles.borrowButtonText}>Borrow</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    marginVertical: 8,
  },
  coverImage: {
    width: '90%',
    height: 300,
    borderRadius: 8,
    marginBottom: 16,
  },
  author: {
    fontSize: 20,
    color: '#524C42',
    textAlign: 'center',
    marginBottom: 8,
  },
  rating: {
    fontSize: 18,
    color: '#524C42',
    textAlign: 'center',
    marginBottom: 8,
  },
  summary: {
    fontSize: 16,
    color: '#524C42',
    textAlign: 'justify',
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  borrowButton: {
    backgroundColor: '#ff6347',
    paddingVertical: 12,
    paddingHorizontal: 150,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  borrowButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
