import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyD7hM1n965kzlQiE0LT0ChBTO7kX6XH91Y",
  authDomain: "advanced-react-book-app.firebaseapp.com",
  projectId: "advanced-react-book-app",
  storageBucket: "advanced-react-book-app.appspot.com",
  messagingSenderId: "691194894863",
  appId: "1:691194894863:web:702648c97d5c4df788e17a"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };