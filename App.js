import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import BooksListScreen from './screens/BooksListScreen';
import BorrowedScreen from './screens/BorrowedBooksScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import BookDetailScreen from './screens/BookDetailScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let icon;
          if (route.name === 'Home') {
            icon = 'home';
          } else if (route.name === 'Borrowed') {
            icon = 'library-books';
          }

          return <Icon name={icon} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#ff6347',
        tabBarInactiveTintColor: '#686D76',
      })}
    >
      <Tab.Screen
        name="Home"
        component={BooksListScreen}
        options={{
          headerShown: true,
          headerTitle: 'Home',
          headerStyle: {
            backgroundColor: '#ff6347',
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Tab.Screen
        name="Borrowed"
        component={BorrowedScreen}
        options={{
          headerShown: true,
          headerTitle: 'Borrowed',
          headerStyle: {
            backgroundColor: '#ff6347',
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [authInitialize, setAuthInitialize] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const backFromAuth = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (authInitialize) setAuthInitialize(false);
    });

    return () => backFromAuth();
  }, [authInitialize]);

  if (authInitialize) return null;

  return (
    <NavigationContainer>
      {currentUser ? (
        <Stack.Navigator>
          <Stack.Screen
            name="TabNavigator"
            component={TabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Book Detail"
            component={BookDetailScreen}
            options={{
              headerShown: true,
              headerStyle: {
                backgroundColor: '#ff6347',
              },
              headerTintColor: '#ffffff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
